const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const JsonVarSub = require('./utils/json/index.js')
const XmlVarSub = require('./utils/xml/index.js')

async function run() {
    const myToken = core.getInput('token');
    const fileFormat = core.getInput('fileFormat')
    const repoFull = core.getInput('repo').split('/');    
    const variables = core.getInput('variables');
    const delimiter = core.getInput('delimiter');
    const filePath = core.getInput('filePath');
    const outputFile = core.getInput('outputFile');
    const writeToFile = core.getInput('writeToFile');
    
    let subbed = ''
    if(fileFormat.toLowerCase() == 'json') {
        let jvs = new JsonVarSub();
        subbed = jvs.substitute(filePath, variables, delimiter, outputFile, writeToFile);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, "subbed=" + encodeURIComponent(JSON.stringify(subbed)));
    }

    if(fileFormat.toLowerCase() == 'xml') {
        let xvs = new XmlVarSub();
        subbed = xvs.substitute(filePath, variables, delimiter, outputFile, writeToFile);
        console.log("SUBBED --> ", JSON.stringify(subbed))
        fs.appendFileSync(process.env.GITHUB_OUTPUT, "subbed=" + JSON.stringify(subbed));
    }


    
    const octokit = github.getOctokit(myToken)
    
    
    
}

run();