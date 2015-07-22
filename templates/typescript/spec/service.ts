/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/services/<%= cameledName.toLowerCase() %>.ts" />

'use strict';

describe('Service: <%= cameledName %>', () => {

  // load the service's module
  beforeEach(module('<%= scriptAppName %>'));

  // instantiate service
  var <%= cameledName %>;
  beforeEach(inject(_<%= cameledName %>_ => {
    <%= cameledName %> = _<%= cameledName %>_;
  }));

  it('should do something', () => {
    expect(!!<%= cameledName %>).toBe(true);
  });

});
