'use strict'

angular.module('<%= scriptAppName %>', ['wixTranslations', <%= angularModules %>])
  .config ['$routeProvider', ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .otherwise
        redirectTo: '/'
  ]
