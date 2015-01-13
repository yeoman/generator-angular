"use strict"

###
@ngdoc function
@name muck2App.controller:AccountCtrl
@description
# AccountCtrl
Provides rudimentary account management functions.
###
angular.module("<%= scriptAppName %>").controller "AccountCtrl", ($scope, user, simpleLogin, fbutil, $timeout) ->
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

  <% } %>loadProfile = (user) ->
    profile.$destroy()  if profile
    profile = fbutil.syncObject("users/" + user.uid);
    profile.$bindTo $scope, "profile"
    return

  $scope.user = user
  $scope.logout = simpleLogin.logout
  $scope.messages = []
  profile = null
  loadProfile user
  <% if( hasPasswordProvider ) { %>
  $scope.changePassword = (oldPass, newPass, confirm) ->
    $scope.err = null
    if not oldPass or not newPass
      error "Please enter all fields"
    else if newPass isnt confirm
      error "Passwords do not match"
    else
      simpleLogin.changePassword(profile.email, oldPass, newPass).then (->
        success "Password changed"
        return
      ), error
    return

  $scope.changeEmail = (pass, newEmail) ->
    $scope.err = null
    simpleLogin.changeEmail(pass, newEmail).then ((user) ->
      loadProfile user
      success "Email changed"
      return
    ), error
    return

  <% } %>
  return
