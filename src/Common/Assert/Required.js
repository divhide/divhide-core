'use strict';

var Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 *
 * IsRequired
 *
 * @throws {Exception}
 *
 * @param {*} val
 * @return {*}
 *
 */
var Required = function(val){

    var v = Type.isDefined(val);

    if(!v) {
        throw new Exception("VALIDATION_REQUIRED");
    }

    return val;

};

module.exports = Required;
