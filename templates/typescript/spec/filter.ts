/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/filters/<%= cameledName.toLowerCase() %>.ts" />

'use strict';

describe('Filter: <%= cameledName %>', () => {

  // load the filter's module
  beforeEach(module('<%= scriptAppName %>'));

  // initialize a new instance of the filter before each test
  var <%= cameledName %>;
  beforeEach(inject($filter => {
    <%= cameledName %> = $filter('<%= cameledName %>');
  }));

  it('should return the input prefixed with "<%= cameledName %> filter:"', () => {
    var text = 'angularjs';
    expect(<%= cameledName %>(text)).toBe('<%= cameledName %> filter: ' + text);
  });

});
