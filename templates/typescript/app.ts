/// <reference path="../bower_components/dt-angular/angular.d.ts" /><% if (ngCookies) { %>
/// <reference path="../bower_components/dt-angular/angular-cookies.d.ts" /><% } %><% if (ngResource) { %>
/// <reference path="../bower_components/dt-angular/angular-resource.d.ts" /><% } %><% if (ngSanitize) { %>
/// <reference path="../bower_components/dt-angular/angular-sanitize.d.ts" /><% } %><% if (ngRoute) { %>
/// <reference path="../bower_components/dt-angular/angular-route.d.ts" /><% } %>

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
