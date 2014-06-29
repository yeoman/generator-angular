'use strict';

describe('Service: <%= classedName %>', function () {

  // load the service's module
  beforeEach(function () {
    module('<%= scriptAppName %>Internal');
  });

  // instantiate service
  var <%= classedName %>;
  beforeEach(inject(function (_<%= classedName %>_) {
    <%= classedName %> = _<%= classedName %>_;
  }));

  it('should do something', function () {
    expect(<%= classedName %>.someMethod()).toBe(42);
  });

});
