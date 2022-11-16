'use strict';

const fs = require('fs');
const _ = require('lodash');
const JsonUtils = require('../json/jsonUtils.js');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");



module.exports = class XmlVarSub {
    constructor() {
        
    }

    substitute(filePath, vars, delimiter, outputFile, writeToFile){
        let rawData = fs.readFileSync(filePath);
        const options = {
            ignoreAttributes: false,
            attributeNamePrefix : "@_",
            allowBooleanAttributes: true
        };

        const parser = new XMLParser(options)
        let xmlObj = parser.parse(rawData)
        
        let jsonObj = JSON.parse(JSON.stringify(xmlObj))

        let jUtils = new JsonUtils()
        let modifiedJson = '';
        let variables = JSON.parse(vars)

        for(let i = 0; i < variables.length; i++ ){
            modifiedJson = jUtils.printObjectReplace(jsonObj, '', variables[i]['key'], variables[i]['value'], delimiter);
        }
        console.log(JSON.stringify(modifiedJson))
        

        const xmlOptions = {
            ignoreAttributes : false,
            format: true,
            processEntities: true,
            suppressUnpairedNode: false,
            alwaysCreateTextNode: true,
            unpairedTags: ["unpaired"],
            suppressEmptyNode: true,
            allowBooleanAttributes: true,
            suppressBooleanAttributes: false
        };
        
        const xmlBuilder = new XMLBuilder(xmlOptions);
        let xmlDataStr = xmlBuilder.build(modifiedJson);

        if(writeToFile) {
            fs.appendFileSync(outputFile, xmlDataStr);
        }
        
        return JSON.stringify(xmlDataStr)
    }

}

   