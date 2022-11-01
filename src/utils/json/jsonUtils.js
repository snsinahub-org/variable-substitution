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
        // console.log(`PARENT KEY ${parentKey} -- ${key} -- ${delimiter}`)
        return parentKey;
    }  
    
    printObjectReplace(jsonObject, keyName = '', theKey = '', keyValue = '', delimiter = '/') {
        let self = this;
        _.forEach(jsonObject, function(value, key){
            if(typeof jsonObject[key] === "object") {                     
                self.printObjectReplace(jsonObject[key], self._createKeyName(keyName, key, delimiter), theKey, keyValue, delimiter);
            } else {        
                // console.log(`${keyName}${delimiter}${key}`, `${delimiter}`, theKey, keyName)                        
                if(theKey == `${keyName}${delimiter}${key}`) {
                    jsonObject[key] = keyValue;
                }

            }
        }); 
        return jsonObject;       
    }

}
