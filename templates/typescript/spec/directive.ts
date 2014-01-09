/// <reference path="../../../app/bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../../app/bower_components/dt-angular/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/dt-jasmine/jasmine.d.ts" />

/// <reference path="../../../app/scripts/directives/<%= cameledName.toLowerCase() %>.ts" />

'use strict';

describe('Directive: <%= cameledName %>', () => {

  // load the directive's module
  beforeEach(module('<%= scriptAppName %>'));

  var element,
    scope;

  beforeEach(inject(($rootScope) => {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(($compile) => {
    element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <%= cameledName %> directive');
  }));
});
