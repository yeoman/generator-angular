"use strict"

###
@ngdoc function
@name <%= scriptAppName %>.controller:LoginCtrl
@description
# LoginCtrl
Manages authentication to any active providers.
###
angular.module("<%= scriptAppName %>").controller "LoginCtrl", ($scope, Auth, $location<% if( hasPasswordProvider ) { %>, $q, Ref, $timeout<% } %>) ->
  redirect = ->
    $location.path "/account"
    return
  showError = (err) ->
    $scope.err = err
    return

  <% if( hasOauthProviders ) { %>$scope.oauthLogin = (provider) ->
    $scope.err = null
    Auth.$authWithOAuthPopup(provider,
      rememberMe: true
    ).then redirect, showError
    return

  $scope.anonymousLogin = ->
    Auth.$authAnonymously(rememberMe: true).then redirect, showError
    return
  <% } %><% if( hasPasswordProvider ) { %>
  $scope.passwordLogin = (email, pass) ->
    $scope.err = null
    Auth.$authWithPassword(
      email: email
      password: pass
    ,
      rememberMe: true
    ).then redirect, showError
    return

  firstPartOfEmail = (email) ->
    ucfirst email.substr(0, email.indexOf('@')) or ''

  ucfirst = (str) ->
    # inspired by: http://kevin.vanzonneveld.net
    str += ''
    f = str.charAt(0).toUpperCase()
    f + str.substr(1)

  $scope.createAccount = (email, pass, confirm) ->

    createProfile = (user) ->
      ref = Ref.child('users', user.uid)
      def = $q.defer()
      ref.set {
        email: email
        name: firstPartOfEmail(email)
      }, (err) ->
        $timeout ->
          if err
            def.reject err
          else
            def.resolve ref
          return
        return
      def.promise

    $scope.err = null
    if !pass
      $scope.err = 'Please enter a password'
    else if pass != confirm
      $scope.err = 'Passwords do not match'
    else
      Auth.$createUser(
        email: email
        password: pass).then(->
        # authenticate so we have permission to write to Firebase
        Auth.$authWithPassword {
          email: email
          password: pass
        }, rememberMe: true
      ).then(createProfile).then redirect, showError
    return
  <% } %>
  return
