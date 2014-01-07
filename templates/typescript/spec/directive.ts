/// <reference path="../../../app/bower_components/DefinitivelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../app/bower_components/DefinitivelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/DefinitivelyTyped/jasmine/jasmine.d.ts" />

/// <reference path="../../../app/scripts/directives/<%= cameledName.toLowerCase() %>.ts" />

'use strict';

describe('Directive: <%= cameledName %>', function () {

  // load the directive's module
  beforeEach(module('<%= scriptAppName %>'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <%= cameledName %> directive');
  }));
});
