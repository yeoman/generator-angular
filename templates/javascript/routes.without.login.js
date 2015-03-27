'use strict';
/**
 * @ngdoc overview
 * @name <%= scriptAppName %>:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 */
angular.module('<%= scriptAppName %>')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .otherwise({redirectTo: '/'});
  }]);
