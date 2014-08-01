'use strict';

describe('Service: <%= cameledName %>', function () {

  // load the service's module
  beforeEach(function () {
    module('<%= scriptAppName %>Internal');

    //add your mocks here
  });

  // instantiate service
  var <%= cameledName %>;
  beforeEach(inject(function (_<%= cameledName %>_) {
    <%= cameledName %> = _<%= cameledName %>_;
  }));

  it('should do something', function () {
    expect(<%= cameledName %>.someMethod()).toBe(42);
  });

});
