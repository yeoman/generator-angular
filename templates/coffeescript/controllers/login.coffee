"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:LoginCtrl
@description
# LoginCtrl
Manages authentication to any active providers.
###
angular.module("<%= scriptAppName %>").controller "LoginCtrl", ($scope, simpleLogin, $location) ->
  redirect = ->
    $location.path "/account"
    return
  showError = (err) ->
    $scope.err = err
    return

  <% if( hasOauthProviders ) { %>$scope.oauthLogin = (provider) ->
    $scope.err = null
    simpleLogin.login(provider,
      rememberMe: true
    ).then redirect, showError
    return

  $scope.anonymousLogin = ->
    simpleLogin.anonymousLogin(rememberMe: true).then redirect, showError
    return
  <% } %><% if( hasPasswordProvider ) { %>
  $scope.passwordLogin = (email, pass) ->
    $scope.err = null
    simpleLogin.passwordLogin(
      email: email
      password: pass
    ,
      rememberMe: true
    ).then redirect, showError
    return

  $scope.createAccount = (email, pass, confirm) ->
    $scope.err = null
    unless pass
      $scope.err = "Please enter a password"
    else if pass isnt confirm
      $scope.err = "Passwords do not match"
    else
      simpleLogin.createAccount(email, pass,
        rememberMe: true
      ).then redirect, showError

    return
  <% } %>
  return
