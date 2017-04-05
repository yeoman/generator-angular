describe('Controller: <%= classedName %>Ctrl', function () {
  'use strict';

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var <%= classedName %>Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(<%= classedName %>Ctrl.awesomeThings.length).toBe(3);
  });
});
