'use strict';

angular.module('<%= scriptAppName %>Internal')
  .controller('<%= classedName %>Ctrl', function ($scope) {
    $scope.awesomeThings = [
      'Bower',
      'Grunt',
      'Haml',
      'Compass',
      'AngularJS',
      'Karma'
    ];
  });
