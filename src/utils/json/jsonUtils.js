'use strict';

const { Console } = require('console');
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

    printObjectReplaceKeyBased(jsonObject, keyName = '', element = '', matchingKey = '', matchingValue = '', updatingKey = '', keyValue = '', delimiter = '/', skipeEmpty = true) {
        let self = this;
        console.log("jsonObject: ", jsonObject)
        console.log("keyName: ========> ", keyName)
        if(skipeEmpty && keyValue == '') {
            console.log("skipping empty value |||||||||", updatingKey, keyName)
        } else {
            console.log("<|> -- non empty value ", updatingKey, keyName)
            _.forEach(jsonObject, function(value, key){
                
                
                if(typeof jsonObject[key] === "object") { 
                    if(keyName == element) {
                        if(value.hasOwnProperty(matchingKey) && value.hasOwnProperty(updatingKey) && jsonObject[key][matchingKey] == matchingValue) {
                            jsonObject[key][updatingKey] = keyValue
                            
                        }                    
                    } else {
                        if(typeof key == 'number') {
                            _.forEach(value, function(v, k) {                            
                                if(!k.startsWith('@_')) {
                                    self.printObjectReplaceKeyBased(value, self._createKeyName(keyName, k, delimiter), element, matchingKey, matchingValue, updatingKey, keyValue, delimiter);
                                }
                            })
                        }
                        self.printObjectReplaceKeyBased(jsonObject[key], self._createKeyName(keyName, key, delimiter), element, matchingKey, matchingValue, updatingKey, keyValue, delimiter);
                    }
                    
                } else {              
                    
                    if(keyName == element && jsonObject.hasOwnProperty(matchingKey) && jsonObject.hasOwnProperty(updatingKey) && jsonObject[matchingKey] == matchingValue) { 
                        jsonObject[updatingKey] = keyValue;
                    } else if(keyName == '') {
                        if(element == `${key}`) {
                            jsonObject[key] = keyValue;
                        }
                    } else {      
                        if(element == `${keyName}${delimiter}${key}`) {
                            jsonObject[key] = keyValue;
                        }
                    }
                }
            }); 
        }   
        return jsonObject;       
    }

}
