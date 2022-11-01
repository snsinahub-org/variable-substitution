const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const JsonVarSub = require('./utils//json/index.js')

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
    }


    
    const octokit = github.getOctokit(myToken)
    
    
    fs.appendFileSync(process.env.GITHUB_OUTPUT, "subbed=" + JSON.stringify(subbed));
}

run();