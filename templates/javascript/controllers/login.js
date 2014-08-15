'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('<%= scriptAppName %>')
  .controller('LoginCtrl', function ($scope, simpleLogin) {
    //todo
    //todo
    //todo
    //todo
    //todo
    //todo
    $scope.login = function(provider) {
      simpleLogin.login(provider);
    };
  });