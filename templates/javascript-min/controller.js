'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .controller('<%= _.camelize(name) %>Ctrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
