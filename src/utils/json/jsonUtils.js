'use strict';

const fs = require('fs');
const _ = require('lodash')

module.exports = class JsonUtils {

    constructor() {
            
    }

    _createKeyName(keyName, key, delimiter = '/'){
        let parentKey = key
        if (keyName != '') {
            parentKey = `${keyName}${delimiter}${key}`
        }
        
        return parentKey;
    }  
    
    printObjectReplace(jsonObject, keyName = '', theKey = '', keyValue = '', delimiter = '/') {
        let self = this;
        _.forEach(jsonObject, function(value, key){
            if(typeof jsonObject[key] === "object") {                     
                self.printObjectReplace(jsonObject[key], self._createKeyName(keyName, key, delimiter), theKey, keyValue, delimiter);
            } else {                                              
                if(keyName == '') {
                    if(theKey == `${key}`) {
                        jsonObject[key] = keyValue;
                    }
                } else {      
                    if(theKey == `${keyName}${delimiter}${key}`) {
                        jsonObject[key] = keyValue;
                    }
                }
            }
        }); 
        return jsonObject;       
    }

    printObjectReplaceKeyBased(jsonObject, keyName = '', element = '', matchingKey = '', matchingValue = '', updatingKey = '', keyValue = '', delimiter = '/') {
        console.log("ARGS == ", keyName, element, matchingKey, matchingValue, updatingKey, keyValue, delimiter)
        let self = this;
        _.forEach(jsonObject, function(value, key){
            
            if(typeof jsonObject[key] === "object") { 
                if(keyName == element) {
                    // for(let k in jsonObject[key]) {
                    //     console.log("ELEMENT KEY == ", k, matchingKey, matchingValue, updatingKey, value, jsonObject[key][k])
                    // }
                    // console.log("ELEMENT KEY == ", k, matchingKey, matchingValue, updatingKey, value, jsonObject[key][k])
                    console.log("ELEMENT OBJECT == ", key, keyName, matchingKey, matchingValue, updatingKey, value, JSON.stringify(jsonObject[key]))
                } 
                console.log("KEY -- OBJECT", key, element, matchingKey, keyValue, keyName)                   
                self.printObjectReplaceKeyBased(jsonObject[key], self._createKeyName(keyName, key, delimiter), element, matchingKey, matchingValue, updatingKey, keyValue, delimiter);
            } else {              
                                                
                if(keyName == '') {
                    // console.log("KEY -- ELSE MATCHED >>>>>>>>>>", key, element, theKey, keyValue, keyName)
                    if(element == `${key}`) {
                        jsonObject[key] = keyValue;
                    }
                } else {      
                    // console.log("KEY -- ELSE ", key, element, theKey, keyValue, keyName)
                    if(element == `${keyName}${delimiter}${key}`) {
                        jsonObject[key] = keyValue;
                    }
                }
            }
        }); 
        
        return jsonObject;       
    }

}
