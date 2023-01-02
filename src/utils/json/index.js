'use strict';

const fs = require('fs');
const _ = require('lodash')
const JsonUtils = require('./jsonUtils.js')
const TextDecoder = require('node:util');


module.exports = class JsonVarSub {
    constructor() {
        
    }

    substitute(filePath, vars, delimiter, outputFile, writeToFile){
        let rawData = fs.readFileSync(filePath);
        let jsonObject = JSON.parse(new TextDecoder('utf-8', { ignoreBOM: false}).decode(rawData));
        let jUtils = new JsonUtils()
        let modifiedJson = jsonObject;
        let variables = JSON.parse(vars)

        for(let i = 0; i < variables.length; i++ ){
            console.log("Variables: ", variables[i], variables[i]['key'], variables[i]['value'])
            modifiedJson = jUtils.printObjectReplace(modifiedJson, '', variables[i]['key'], variables[i]['value'], delimiter);
        }

        if(writeToFile) {
            fs.writeFileSync(outputFile, JSON.stringify(modifiedJson));
        }
        
        return modifiedJson
    }

}

   