import { format, inspect } from 'util';
import { get, set, lowerCase, upperCase, startCase, camelCase, capitalize } from 'lodash';

import { IFormatrOptions } from './interfaces';

const DEFAULTS: IFormatrOptions = {
  default: '',
  colorize: false,
  hidden: null,
  depth: null,
  exp: /{{([\s\S]+?)}}/g,
  strip: /[{}]+/g,
  split: '|',
  transform: undefined,
  transforms: {
    capitalize: capitalize,
    lowercase: lowerCase,
    uppercase: upperCase,
    camelcase: camelCase,
    titlecase: (str: string) => startCase(str.toLowerCase())
  }
};

// This does a shallow copy of objects.
// This is needed for objects such as Errors
// Otherwise some properties may not be available.
function copy(obj: any) {
  return Object.getOwnPropertyNames(obj || {}).reduce((a, c) => {
    a[c] = obj[c];
    return a;
  }, {});
}

function formatr() {

  let _options = Object.assign({}, DEFAULTS);

  function _formatter(options: IFormatrOptions, message: any, ...args: any[]) {

    options = options || _options;

    // OBJECT PASSED USE INSPECT //

    if (typeof message !== 'string')
      return inspect(message, options.hidden, options.depth, options.colorize);

    // STRING HAS FORMAT TOKENS //

    if (/(%s|%d|%j|%%)/g.test(message)) {
      args = args.map(v => {
        if (typeof v === 'object')
          return inspect(v, options.hidden, options.depth, options.colorize);
        return v;
      });
      return format(message, ...args);
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
      let val = get(config, key);

      // If the value is an object run through inspect.
      if (typeof val === 'object')
        val = inspect(val, options.hidden, options.depth, options.colorize);

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

  /**
   * Updates the complete options object.
   *
   * @param options a format options object.
   */
  function setOption(options: IFormatrOptions): IFormatrOptions;

  /**
   * Sets an option for a specific key.
   *
   * @param key an option key.
   * @param val the value for the key.
   */
  function setOption(key: string, val: any): IFormatrOptions;

  function setOption(key: string | IFormatrOptions, val?: any) {

    // If object extend options.
    if (typeof key === 'object')
      _options = Object.assign({}, DEFAULTS, key);

    else
      set(_options, key, val);

    return _options;

  }

  /**
   * Format a message using string formatting, custom formatting or inspect for objects.
   *
   * @param message a string or object to be formatted.
   * @param args arguments used for formatting above message.
   */
  function fmt(message: any, ...args: any[]) {
    return _formatter(null, message, ...args);
  }

  /**
   * Formats a message using the specified options.
   *
   * @param options pass options for this instance of formatting.
   */
  function formatWith(options: IFormatrOptions) {
    options = Object.assign({}, DEFAULTS, options);
    return (message: any, ...args: any[]) => {
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

export = instance;