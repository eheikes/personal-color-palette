describe('capitalize spec', function() {
  'use strict';

  var capitalize;

  beforeEach(module('app'));

  beforeEach(inject(function($filter) {
    capitalize = $filter('capitalize');
  }));

  it('should return an empty string when given a non-string', function() {
    expect(capitalize(null)).toBe('');
    expect(capitalize(true)).toBe('');
    expect(capitalize(undefined)).toBe('');
    expect(capitalize(NaN)).toBe('');
  });

  it('should return an empty string when given an empty string', function() {
    expect(capitalize('')).toBe('');
  });

  it('should capitalize the first letter', function() {
    expect(capitalize('abc')).toBe('Abc');
  });

  it('should not change a capitalized string', function() {
    expect(capitalize('Abc')).toBe('Abc');
  });

  it('should leave the rest of the string unchanged', function() {
    expect(capitalize('aBcDe')).toBe('ABcDe');
  });

});
