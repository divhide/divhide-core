'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 *
 * Test if value is a string
 *
 * @throws {Exception}
 *
 * @param {*} val
 * @return {String}
 *
 */
var Str = function(val){

    var v = Type.isString(val);

    if(!v){
        throw new Exception("VALIDATION_TYPE", { value: Type.of(val), expected: Type.of("") });
    }

    return val;

};

module.exports = Str;
