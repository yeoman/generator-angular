'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
