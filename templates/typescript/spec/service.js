'use strict';

describe('Service: <%= tsAngularName %>', function () {

  // load the service's module
  beforeEach(module('<%= typescriptAppName %>'));

  // instantiate service
  var <%= tsAngularName %>;
  beforeEach(inject(function (_<%= tsAngularName %>_) {
    <%= tsAngularName %> = _<%= tsAngularName %>_;
  }));

  it('should do something', function () {
    expect(!!<%= tsAngularName %>).toBe(true);
  });

});
