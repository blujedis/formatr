"use strict";
const util_1 = require("util");
const lodash_1 = require("lodash");
const DEFAULTS = {
    default: '',
    colorize: false,
    hidden: null,
    depth: null,
    exp: /{{([\s\S]+?)}}/g,
    strip: /[{}]+/g,
    split: '|',
    transform: undefined,
    transforms: {
        capitalize: lodash_1.capitalize,
        lowercase: lodash_1.lowerCase,
        uppercase: lodash_1.upperCase,
        camelcase: lodash_1.camelCase,
        titlecase: (str) => lodash_1.startCase(str.toLowerCase())
    }
};
// This does a shallow copy of objects.
// This is needed for objects such as Errors
// Otherwise some properties may not be available.
function copy(obj) {
    return Object.getOwnPropertyNames(obj || {}).reduce((a, c) => {
        a[c] = obj[c];
        return a;
    }, {});
}
function formatr() {
    let _options = Object.assign({}, DEFAULTS);
    function _formatter(options, message, ...args) {
        options = options || _options;
        // OBJECT PASSED USE INSPECT //
        if (typeof message !== 'string')
            return util_1.inspect(message, options.hidden, options.depth, options.colorize);
        // STRING HAS FORMAT TOKENS //
        if (/(%s|%d|%j|%%)/g.test(message)) {
            args = args.map(v => {
                if (typeof v === 'object')
                    return util_1.inspect(v, options.hidden, options.depth, options.colorize);
                return v;
            });
            return util_1.format(message, ...args);
        }
        // USE TEMPLATE FORMATTING //
        // Nothing to format.
        if (!options.exp.test(message) || typeof args[0] !== 'object')
            return message;
        const config = args.reduce((a, c) => {
            return Object.assign({}, a, copy(c));
        }, {});
        return message.replace(options.exp, (key) => {
            // Remove templating expressions.
            key = key.replace(options.strip, '');
            // split the key in to transform parts.
            const trans = key.trim().split(options.split);
            // First is the key.
            key = trans.shift();
            // Get the value from object
            let val = lodash_1.get(config, key);
            // If the value is an object run through inspect.
            if (typeof val === 'object')
                val = util_1.inspect(val, options.hidden, options.depth, options.colorize);
            if (typeof val === 'undefined')
                val = options.default;
            // Check for value transforms.
            trans.forEach(k => {
                if (options.transforms[k])
                    val = options.transforms[k](val, key, config);
            });
            if (options.transform)
                return options.transform(val, key, config);
            return val;
        });
    }
    function setOption(key, val) {
        // If object extend options.
        if (typeof key === 'object')
            _options = Object.assign({}, DEFAULTS, key);
        else
            lodash_1.set(_options, key, val);
        return _options;
    }
    /**
     * Format a message using string formatting, custom formatting or inspect for objects.
     *
     * @param message a string or object to be formatted.
     * @param args arguments used for formatting above message.
     */
    function fmt(message, ...args) {
        return _formatter(null, message, ...args);
    }
    /**
     * Formats a message using the specified options.
     *
     * @param options pass options for this instance of formatting.
     */
    function formatWith(options) {
        options = Object.assign({}, DEFAULTS, options);
        return (message, ...args) => {
            return _formatter(options, message, ...args);
        };
    }
    return {
        setOption,
        format: fmt,
        formatWith
    };
}
const instance = formatr();
module.exports = instance;
//# sourceMappingURL=index.js.map