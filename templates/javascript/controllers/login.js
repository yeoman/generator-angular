'use strict';
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('<%= scriptAppName %>')
  .controller('LoginCtrl', function ($scope, simpleLogin, $location) {
    <% if( hasOauthProviders ) { %>$scope.oauthLogin = function(provider) {
      $scope.err = null;
      simpleLogin.login(provider, {rememberMe: true}).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      simpleLogin.anonymousLogin({rememberMe: true}).then(redirect, showError);
    };

    <% } %><% if( hasPasswordProvider ) { %>$scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(redirect, showError);
      }
    };
    <% } %>

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
