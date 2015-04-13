"use strict"

###
@ngdoc function
@name muck2App.controller:AccountCtrl
@description
# AccountCtrl
Provides rudimentary account management functions.
###
angular.module("<%= scriptAppName %>").controller "AccountCtrl", ($scope, user, Auth, Ref, $firebaseObject<% if( hasPasswordProvider ) { %>, $timeout<% } %>) ->
  <% if( hasPasswordProvider ) { %>error = (err) ->
    alert err, "danger"
    return
  success = (msg) ->
    alert msg, "success"
    return
  alert = (msg, type) ->
    obj =
      text: msg
      type: type

    $scope.messages.unshift obj
    $timeout (->
      $scope.messages.splice $scope.messages.indexOf(obj), 1
      return
    ), 10000
    return

  <% } %>

  profile = $firebaseObject(Ref.child("users").child(user.uid))
  profile.$bindTo $scope, "profile"
  $scope.user = user
  $scope.logout = () -> Auth.$unauth()
  $scope.messages = []

  <% if( hasPasswordProvider ) { %>
  $scope.changePassword = (oldPass, newPass, confirm) ->
    $scope.err = null
    if not oldPass or not newPass
      error "Please enter all fields"
    else if newPass isnt confirm
      error "Passwords do not match"
    else
      Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass}).then (->
        success "Password changed"
        return
      ), error
    return

  $scope.changeEmail = (pass, newEmail) ->
    $scope.err = null
    Auth.$changeEmail({password: pass, oldEmail: profile.email, newEmail: newEmail}).then ((user) ->
      profile.email = newEmail
      profile.$save()
      success "Email changed"
      return
    ), error
    return

  <% } %>
  return
