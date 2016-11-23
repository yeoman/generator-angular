/// <reference path="../../typings/angularjs/angular.d.ts" /><% if (ngCookies) { %>
/// <reference path="../../typings/angularjs/angular-cookies.d.ts" /><% } %><% if (ngResource) { %>
/// <reference path="../../typings/angularjs/angular-resource.d.ts" /><% } %><% if (ngSanitize) { %>
/// <reference path="../../typings/angularjs/angular-sanitize.d.ts" /><% } %><% if (ngRoute) { %>
/// <reference path="../../typings/angularjs/angular-route.d.ts" /><% } %>

'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })<% } %>;
