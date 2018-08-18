
import * as formatr from './';

const val1 = 'Hello my name is %s';
const args1 = ['Milton Waddams'];

const val2 = 'My name is {{ name|titlecase|wrap}} I am {{age}} years old.';

const obj = {
  name: 'milton waddams',
  age: 47
};

const err = new Error('some new error');

// const result1 = formatr.format(val1, obj);
// console.log('result1', result1);

// const result2 = formatr.format(obj);
// console.log('result2', result2);

// formatr.setOption('transforms.wrap', (val) => {
//   return `[${val}]`;
// });


const result3 = formatr.format('error message: {{ message }}', err);
console.log('result3', result3);
