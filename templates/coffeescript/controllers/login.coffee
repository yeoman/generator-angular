"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:LoginCtrl
@description
# LoginCtrl
Manages authentication to any active providers.
###
angular.module("<%= scriptAppName %>").controller "LoginCtrl", ($scope, simpleLogin, $location) ->
  login = (provider, opts) ->
    $scope.err = null
    simpleLogin.login(provider, opts).then (->
      $location.path "/account"
      return
    ), (err) ->
      $scope.err = err
      return

    return
  <% if( hasOauthProviders ) { %>$scope.oauthlogin = (provider) ->
    login provider,
      rememberMe: true

    return
  <% } %><% if( hasPasswordProvider ) { %>
  $scope.passwordLogin = (email, pass) ->
    login "password",
      email: email
      password: pass
      rememberMe: true

    return

  $scope.createAccount = (email, pass, confirm) ->
    $scope.err = null
    unless pass
      $scope.err = "Please enter a password"
    else if pass isnt confirm
      $scope.err = "Passwords do not match"
    else
      simpleLogin.createAccount(email, pass).then (->
        $location.path "/account"
        return
      ), (err) ->
        $scope.err = err
        return

    return
  <% } %>
  return
