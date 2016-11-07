'use strict'

###*
 # @ngdoc overview
 # @name <%= scriptAppName %>
 # @description
 # # <%= scriptAppName %>
 #
 # Main module of the application.
###
angular
  .module '<%= scriptAppName %>', [<%= angularModules %>]<% if (ngRoute) { %>
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
        controllerAs: 'main'
      .otherwise
        redirectTo: '/'
<% } %>
