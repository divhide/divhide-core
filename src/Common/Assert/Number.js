'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 *
 * Test if value is a number
 *
 * @throws {Exception}
 *
 * @param {*} val
 * @return {Number}
 *
 */
var Numb = function(val){

    var v = Type.isNumber(val);

    if(!v){
        throw new Exception("VALIDATION_TYPE", { value: Type.of(val), expected: Type.of(0) });
    }

    return val;

};

module.exports = Numb;
