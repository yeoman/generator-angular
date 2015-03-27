"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:ChatCtrl
@description
# ChatCtrl
A demo of using AngularFire to manage a synchronized list.
###
angular.module("<%= scriptAppName %>").controller "ChatCtrl", ($scope, Ref, $firebaseArray, $timeout) ->
  alert = (msg) ->
    $scope.err = msg
    $timeout (->
      $scope.err = null
    ), 5000

  # synchronize a read-only, synchronized array of messages, limit to most recent 10
  $scope.messages = $firebaseArray(Ref.child("messages").limitToLast(10));

  # display any errors
  $scope.messages.$loaded().then null, alert

  # provide a method for adding a message
  $scope.addMessage = (newMessage) ->
    if newMessage

      # push a message to the end of the array
      $scope.messages.$add(text: newMessage).then null, alert
