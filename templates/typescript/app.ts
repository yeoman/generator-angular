/// <reference path="../bower_components/definitivelyTyped/angularjs/angular.d.ts" />
<% if (ngRoute) { %>/// <reference path="../bower_components/definitivelyTyped/angularjs/angular-route.d.ts" /><% } %>
/// <reference path="../bower_components/definitivelyTyped/angularjs/angular-resource.d.ts" />
/// <reference path="../bower_components/definitivelyTyped/angularjs/angular-sanitize.d.ts" />
/// <reference path="../bower_components/definitivelyTyped/angularjs/angular-resource.d.ts" />

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
