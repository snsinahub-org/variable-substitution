'use strict';

const fs = require('fs');
const _ = require('lodash');
const JsonUtils = require('../json/jsonUtils.js');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

module.exports = class XmlVarSub {
    constructor() {
        
    }

    substitute(filePath, vars, delimiter, outputFile, writeToFile, skipeEmpty){
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

        console.log("VARIABLES: ", variables)
        

        for(let i = 0; i < variables.length; i++ ){
            if(variables[i]['value'] == '' && skipeEmpty) {
                modifiedJson = variables[i];
                console.log("INNER modifiedJson: >>>>> ", modifiedJson)
                console.log("INNER VARIABLE: >>>>> ", variables[i])
            } else {
                modifiedJson = jUtils.printObjectReplaceKeyBased(jsonObj, '', variables[i]['element'], variables[i]['matchingKey'], variables[i]['matchingValue'], variables[i]['updatingKey'] ,variables[i]['value'], delimiter);
            }
            console.log("modifiedJson: ", modifiedJson)
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

   