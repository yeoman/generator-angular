'use strict';

/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */
angular
  .module('<%= scriptAppName %>', [<%= angularModules %>])
  <% if (ngRoute) { %>
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
  <% } else if (uiRouter) { %>
    .config(function ($urlRouterProvider, $stateProvider) {
      $stateProvider
      .state('main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      $urlRouterProvider.otherwise('/');
    })
  <% } %>;
