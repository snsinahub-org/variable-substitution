'use strict';

const fs = require('fs');
const _ = require('lodash')


module.exports = class JsonVarSub {
    constructor() {
        
    }

    substitute(filePath, variables, delimeter){
        let rawData = fs.readFileSync(filePath);
        let jsonObject = JSON.parse(rawData);

        console.log(jsonObject)
        console.log(`VARS ${variables}`)

        return jsonObject
    }

}

   