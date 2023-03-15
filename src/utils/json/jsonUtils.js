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

    printObjectReplaceKeyBased(jsonObject, element = '', theKey = '', keyValue = '', delimiter = '/') {
        let self = this;
        _.forEach(jsonObject, function(value, key){
            if(typeof jsonObject[key] === "object") {       
                console.log("KEY -- OBJECT", JSON.stringify(jsonObject[key]))              
                self.printObjectReplaceKeyBased(jsonObject[key], self._createKeyName(element, key, delimiter), theKey, keyValue, delimiter);
            } else {                 
                console.log("KEY -- ELSE", JSON.stringify(jsonObject[key]))                             
                if(element == '') {
                    if(theKey == `${key}`) {
                        jsonObject[key] = keyValue;
                    }
                } else {      
                    if(theKey == `${element}${delimiter}${key}`) {
                        jsonObject[key] = keyValue;
                    }
                }
            }
        }); 
        return jsonObject;       
    }

}
