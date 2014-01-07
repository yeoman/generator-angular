/// <reference path="../../../app/bower_components/DefinitivelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../app/bower_components/DefinitivelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/DefinitivelyTyped/jasmine/jasmine.d.ts" />

/// <reference path="../../../app/scripts/filters/<%= cameledName.toLowerCase() %>.ts" />

'use strict';

describe('Filter: <%= cameledName %>', function () {

  // load the filter's module
  beforeEach(module('<%= scriptAppName %>'));

  // initialize a new instance of the filter before each test
  var <%= cameledName %>;
  beforeEach(inject(function ($filter) {
    <%= cameledName %> = $filter('<%= cameledName %>');
  }));

  it('should return the input prefixed with "<%= cameledName %> filter:"', function () {
    var text = 'angularjs';
    expect(<%= cameledName %>(text)).toBe('<%= cameledName %> filter: ' + text);
  });

});
