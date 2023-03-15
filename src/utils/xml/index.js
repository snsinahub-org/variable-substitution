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
        // console.log("JSON: ", JSON.stringify(jsonObj, null, 2))
        console.log("VARIABLES: ", JSON.stringify(variables, null, 2))

        for(let i = 0; i < variables.length; i++ ){
            modifiedJson = jUtils.printObjectReplaceKeyBased(jsonObj, '', variables[i]['element'], variables[i]['key'], variables[i]['value'], delimiter);
        }
        

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
            fs.writeFileSync(outputFile, xmlDataStr);
        }

        const xmlOptionsOutput = {
            ignoreAttributes : false,
            processEntities: true,
            suppressUnpairedNode: false,
            alwaysCreateTextNode: true,
            unpairedTags: ["unpaired"],
            suppressEmptyNode: true,
            allowBooleanAttributes: true,
            suppressBooleanAttributes: false
        };
        
        const xmlBuilderOutput = new XMLBuilder(xmlOptionsOutput);
        let xmlDataStrOutput = xmlBuilder.build(modifiedJson);
        
        return xmlDataStrOutput
    }

}

   