/**
 * @ngdoc function
 * @name <%= scriptAppName %>.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for simpleLogin
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('<%= scriptAppName %>')
  .directive('ngShowAuth', ['simpleLogin', '$timeout', function (simpleLogin, $timeout) {
    'use strict';
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      console.log('ngShowAuth', user); //debug
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          console.log('update ngShowAuth'); //debug
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !isLoggedIn);
          }, 0);
        }

        simpleLogin.watch(update, scope);
        simpleLogin.getUser(update);
      }
    };
  }]);
