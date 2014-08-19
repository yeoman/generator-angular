
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.directive:ngHideAuth
 * @description
 * # ngHideAuthDirective
 * A directive that shows elements only when user is logged out. It also waits for simpleLogin
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('<%= scriptAppName %>')
  .directive('ngHideAuth', ['simpleLogin', '$timeout', function (simpleLogin, $timeout) {
    'use strict';
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      console.log('ngHideAuth', user); //debug
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          console.log('update ngHideAuth'); //debug
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', isLoggedIn !== false);
          }, 0);
        }

        simpleLogin.watch(update, scope);
        simpleLogin.getUser(update);
      }
    };
  }]);
