'use strict'

angular.module('<%= _.camelize(appname) %>App', ['wixTranslations'])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .otherwise
        redirectTo: '/'
