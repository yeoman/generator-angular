'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .controller('<%= _.classify(name) %>Ctrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'Bower',
      'Grunt',
      'AngularJS',
      'Karma'
    ];
  }]);
