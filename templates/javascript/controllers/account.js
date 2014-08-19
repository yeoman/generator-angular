'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('<%= scriptAppName %>')
  .controller('AccountCtrl', function ($scope, user, simpleLogin, fbutil) {
    $scope.profile = fbutil.syncObject('users/'+user.uid);
    $scope.user = user;
    $scope.logout = simpleLogin.logout;
  });