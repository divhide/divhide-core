'use strict';

var _    = require("lodash"),
    Coerce = require("../Coerce"),
    Type = require("../Type"),
    ChainFunction   = require("./ChainFunction");


/**
 *
 * A chain context keeps track of the current chainable state
 *
 * @param {Object} options
 *
 * @example
 *
 * new ChainContext({
 *
 *     pipe:
 * })
 */
var ChainContext = function Divhide_Chain_ChainContext(options){

    options = Coerce.object(options);

    /**
     * The context registered functions
     *
     * @type {Array}
     *
     */
    this.fns = [];

    /**
     *
     * The shared fn context
     *
     * @type {Object}
     *
     */
    this.scope = this.setScope(options.scope);

    /**
     *
     * Pipe mode context
     *
     * @type {Boolean}
     *
     */
    this.pipe = Coerce.boolean(options.pipe);

};

/**
 *
 * Sets the scope of this context.
 *
 * @param  {Object|Function} scope
 * @return {Object}
 */
ChainContext.prototype.setScope = function Divhide_Chain_ChainContext_setScope(scope){

    if(Type.isDefined(scope)){
        scope = Type.isFunction(scope) ? scope() : scope;
    }

    /// Maintain the current context if not defined
    scope = scope || this.scope;

    /// set the context
    this.scope = Coerce.object(scope, {});

    return this.scope;

};

/**
 *
 * Chain the given function
 *
 * @param  {Function|Object}   fn
 * @param  {Array}  args
 *
 * @return {Internal.Chain}
 *
 */
ChainContext.prototype.add = function Divhide_Chain_ChainContext_add(fn, args){

    if(Type.isFunction(fn)) {

        fn = new ChainFunction({ fn: fn, args: args });

        this.fns.push( fn );

    }

};

/**
 *
 * Execute the context using the given argument as parameter
 *
 * @param  {*}          args
 * @param  {Array}      extraArgs
 * @param  {Funcion}    errCallback
 *
 * @return {*}
 **
 */
ChainContext.prototype.exec = function Divhide_Chain_ChainContext_exec(args, extraArgs, errCallback){

    extraArgs   = Coerce.value(extraArgs);
    errCallback = Coerce.function(errCallback, function(err){ throw err; });

    var self    = this,
        result  = args,
        error   = null;

    /// execute the functions
    _.each(
        this.fns,
        function(fn, index){

            try {

                /// really execute the function
                var value = fn.apply(self.scope, result, extraArgs);

                /// if chain return values between the functions
                if(self.pipe) {
                    result = value;
                }

            } catch(e){
                error = e;
            }

            /// stop iterating
            if(error !== null){
                return false;
            }

        });

    /// if an error exists
    if(error){
        errCallback(error);
        return null;
    }

    /// returns
    return result;

};

module.exports = ChainContext;
