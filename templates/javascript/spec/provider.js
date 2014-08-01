'use strict';

describe('Service: <%= cameledName %>', function () {

  // load the service's module
  beforeEach(function () {
    module('<%= scriptAppName %>Internal');
    module(function (<%= cameledName %>Provider) {
      <%= cameledName %>Provider.setSalutation('Servus');
    });
    //add your mocks here
  });

  // instantiate service
  var <%= cameledName %>;
  beforeEach(inject(function (_<%= cameledName %>_) {
    <%= cameledName %> = _<%= cameledName %>_;
  }));

  it('should do something', function () {
    expect(<%= cameledName %>.greet()).toBe('Servus');
  });

});
