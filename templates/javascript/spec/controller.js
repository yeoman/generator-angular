'use strict';

describe('Controller: <%= classedName %>Controller', function () {

  // load the controller's module
  beforeEach(function () {
    module('<%= scriptAppName %>Internal');

    //add your mocks here
  });

  var <%= classedName %>Controller, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= classedName %>Controller = $controller('<%= classedName %>Controller', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the controller', function () {
    expect(<%= classedName %>Controller.awesomeThings.length).toBe(6);
  });
});
