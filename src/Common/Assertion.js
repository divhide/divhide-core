'use strict';

var _               = require("lodash"),
    Safe            = require("./Safe"),
    Chain           = require("./Chain"),
    ChainContext    = require("./Chain/ChainContext");


/**
 *
 * The Chainable functions
 *
 * @type {Object}
 *
 */
var ChainableFns = {};

ChainableFns.required   = require("./Assert/Required");
ChainableFns.string     = require("./Assert/String");
ChainableFns.object     = require("./Assert/Object");
ChainableFns.array      = require("./Assert/Array");
ChainableFns.number     = require("./Assert/Number");
ChainableFns.max        = require("./Assert/Max");
ChainableFns.min        = require("./Assert/Min");
ChainableFns.regex      = require("./Assert/Regex");
ChainableFns.instanceOf = require("./Assert/InstanceOf");

/**
 *
 * The Assertion functions
 *
 * @type {Object}
 *
 */
var AssertionFns = {};

/**
 *
 * Tests if the combination of rules are valid
 *
 * @param  {*}          result
 * @param  {Error}      err
 * @return {Boolean}
 */
AssertionFns.isValid = function(result, err){
    return !err;
};

/**
 *
 * Assert
 *
 * @param  {*}      result
 * @param  {Error}  err
 * @return {}
 *
 */
AssertionFns.assert = function(result, err){

    if(err){
        throw err;
    }

    return result;

};

/**
 *
 * Construct a new Assertion provider. This can have some custom actions.
 * @class
 *
 * @param {Object} fns
 *
 * @return {Object}
 *
 * @example
 *
 * Assertion({})
 *     .required()
 *     .string()
 *     .max(10)
 *     .min(5)
 *     [ .isValid("aaaa") | .assert("aaaa") ]
 *
 */
var Assertion = function(fns){

    fns = Safe.object(fns);
    fns = _.assign({}, fns, ChainableFns);

    /// Get the current ChainContext of the assertion, in order
    /// to keep the assertion state.
    var context = null;
    _.each(arguments, function(arg){

        if(arg instanceof ChainContext){
            context = arg;
            return false;
        }

    });

    /// Apply Cahin to the same context
    /// this is important because we can invoke "instaceof Assertion"
    Chain.apply(this, [fns, AssertionFns, { pipe: false, type: Assertion }, context]);

};

module.exports = Assertion;

