import * as chai from 'chai';
import * as mocha from 'mocha';
import * as formatr from './';

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;


describe('Formatr', () => {

  before((done) => {
    done();
  });

  it('should format an object using inspect', () => {
    const expected = "{ category: 'Movies', title: 'Office Space' }";
    const result = formatr.format({ category: 'Movies', title: 'Office Space' });
    assert.equal(result, expected);
  });

  it('should format a string using string format tokens.', () => {
    const expected = 'The movie Office Space was released in 1999';
    const result = formatr.format('The movie %s was released in %d', 'Office Space', 1999);
    assert.equal(result, expected);
  });

  it('should format a string using templating.', () => {
    const expected = 'My name is Milton Waddams and I want my Swingline stapler.';
    const result = formatr.format('My name is {{ name }} and I want my {{ stapler }} stapler.', { name: 'Milton Waddams', stapler: 'Swingline' });
    assert.equal(result, expected);
  });

  it('should format a string using templating with transforms.', () => {
    formatr.setOption('transforms.quote', (v) => `"${v}"`);
    const expected = 'My name is "Milton Waddams" and I want my Swingline stapler.';
    const result = formatr.format('My name is {{ name|titlecase|quote }} and I want my {{ stapler|capitalize }} stapler.', { name: 'milton waddams', stapler: 'swingline' });
    assert.equal(result, expected);
  });

});