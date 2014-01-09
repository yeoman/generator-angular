/// <reference path="../bower_components/dt-angular/angular.d.ts" />
<% if (ngRoute) { %>/// <reference path="../bower_components/dt-angular/angular-route.d.ts" /><% } %>
/// <reference path="../bower_components/dt-angular/angular-resource.d.ts" />
/// <reference path="../bower_components/dt-angular/angular-sanitize.d.ts" />
/// <reference path="../bower_components/dt-angular/angular-resource.d.ts" />

'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config(function ($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })<% } %>;
