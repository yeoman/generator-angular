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
      simpleLogin.login(provider, {rememberMe: true}).then(
        function() {
          $location.path('/account');
        },
        function(err) {
          $scope.err = err;
        }
      );
    };

    <% } %><% if( hasPasswordProvider ) { %>$scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        function() {
          $location.path('/account');
        },
        function(err) {
          $scope.err = err;
        }
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
          .then(function() {
            $location.path('/account');
          }, function(err) {
            $scope.err = err;
          });
      }
    };
    <% } %>

  });
