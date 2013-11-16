'use strict';

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'Bower',
      'Grunt',
      'Haml',
      'Compass',
      'AngularJS',
      'Karma'
    ];
  }]);
