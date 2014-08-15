'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('<%= scriptAppName %>')
  .controller('ChatCtrl', function ($scope, fbutil) {
    $scope.messages = fbutil.syncArray('messages');
    $scope.messages.$loaded().catch(function(err) {
      $scope.err = err;
    });
  });