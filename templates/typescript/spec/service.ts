/// <reference path="../../../app/bower_components/DefinitivelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../../app/bower_components/DefinitivelyTyped/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/DefinitivelyTyped/jasmine/jasmine.d.ts" />

/// <reference path="../../../app/scripts/services/<%= cameledName.toLowerCase() %>.ts" />

'use strict';

describe('Service: <%= cameledName %>', function () {

  // load the service's module
  beforeEach(module('<%= scriptAppName %>'));

  // instantiate service
  var <%= cameledName %>;
  beforeEach(inject(function (_<%= cameledName %>_) {
    <%= cameledName %> = _<%= cameledName %>_;
  }));

  it('should do something', function () {
    expect(!!<%= cameledName %>).toBe(true);
  });

});
