# Formatr

Simple utility for formatting string messages. If a single object is passed it is converted to string using node's util.inspect. When string format tokens are present e.g. %s, %d, %j and so on the string is formatted using node's util.format. For more advanced formatting you can use templating which allows piping values in order through custom transform handlers. Kind of similar to Angular's early pipes.

## Install

```sh
$ npm install formatr
```

## Usage

Import the module.

```ts
import * as formatr from 'formatr';
// OR
const formatr = require('formatr');
```

#### Format an object.

```ts
let result = formatr.format({ category: 'Movies', title: 'Office Space' });
// util.inspect converts object to string.
result = "{ category: 'Movies', title: 'Office Space' }"
```

#### Format using string format tokens.

```ts
let result = formatr.format('The movie %s was released in %d', 'Office Space', 1999);
// util.format maps args to tokens.
result = 'The movie Office Space was released in 1999'
```

#### Format using templating.

```ts
const obj = { name: 'Milton Waddams', stapler: 'Swingline' };
let result = formatr.format('My name is {{ name }} and I want my {{ stapler }} stapler.', obj);
// template formatter maps object values.
result = 'My name is Milton Waddams and I want my Swingline stapler.'
```

#### Format using templating and transforms.

```ts
// Add custom transform for quotes.
formatr.setOption('transforms.quote', (v) => `"${v}"`);
const obj = { name: 'milton waddams', stapler: 'swingline' };
let result = formatr.format('My name is {{ name|titlecase|quote }} and I want my {{ stapler|capitalize }} stapler.', obj);
// values are mapped from object name is titlecased and wrapped in quotes.
result = 'My name is "Milton Waddams" and I want my Swingline stapler.'
```

## Options

Please refer to docs for more details but here are the basics.

### Default

When using templating ONLY this is the default value when undefined is returned.

<table>
  <tr><td>Name</td><td>default</td></tr>
  <tr><td>Type</td><td>string</td></tr>
  <tr><td>Default</td><td>''</td></tr>
</table>


### Colorize

This property is passed to util.inspect when formatting objects.

<table>
  <tr><td>Name</td><td>colorize</td></tr>
  <tr><td>Type</td><td>boolean</td></tr>
  <tr><td>Default</td><td>false</td></tr>
</table>


### Hidden

This property is passed to util.inspect when formatting objects.

<table>
  <tr><td>Name</td><td>hidden</td></tr>
  <tr><td>Type</td><td>boolean</td></tr>
  <tr><td>Default</td><td>null</td></tr>
</table>


### Depth

This property is passed to util.inspect when formatting objects.

<table>
  <tr><td>Name</td><td>depth</td></tr>
  <tr><td>Type</td><td>number</td></tr>
  <tr><td>Default</td><td>null</td></tr>
</table>


### Exp

When using template formatting this is the RegExp for parsing templates.

<table>
  <tr><td>Name</td><td>exp</td></tr>
  <tr><td>Type</td><td>RegExp</td></tr>
  <tr><td>Default</td><td>/{{([\s\S]+?)}}/g</td></tr>
</table>


### Strip

When using template formatting this is the RegExp for stripping parsed templates.

<table>
  <tr><td>Name</td><td>strip</td></tr>
  <tr><td>Type</td><td>RegExp</td></tr>
  <tr><td>Default</td><td>/[{}]+/g</td></tr>
</table>


### Split

When using template formatting this character used to split transforms.

<table>
  <tr><td>Name</td><td>split</td></tr>
  <tr><td>Type</td><td>string</td></tr>
  <tr><td>Default</td><td>|</td></tr>
</table>


### Transform

When using template formatting this is a handler run on each value after getting from format object.

<table>
  <tr><td>Name</td><td>transform</td></tr>
  <tr><td>Type</td><td>function</td></tr>
  <tr><td>Signature</td><td>(val?: any, key?: string, obj?: object)</td></tr>
  <tr><td>Default</td><td>undefined</td></tr>
</table>


### Transforms

When using template formatting this an object of built in transforms.

<table>
  <tr><td>Name</td><td>transforms</td></tr>
  <tr><td>Type</td><td>object</td></tr>
  <tr><td>Default</td><td>capitalize, lowercase, uppercase, camelcase, titlecase</td></tr>
</table>


## Docs

See [https://blujedis.github.io/formatr/](https://blujedis.github.io/formatr/)

## Change

See [CHANGE.md](CHANGE.md)

## License

See [LICENSE.md](LICENSE)