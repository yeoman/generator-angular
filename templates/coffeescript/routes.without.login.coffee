"use strict"

###
@ngdoc overview
@name <%= scriptAppName %>:routes
@description
# routes.js

Configure routes for use with Angular, and apply authentication security
###

# configure views; the authRequired parameter is used for specifying pages
# which should only be available while logged in
angular.module("<%= scriptAppName %>").config [
  "$routeProvider"
  ($routeProvider) ->
    $routeProvider

    .when("/",
      templateUrl: "views/main.html"
      controller: "MainCtrl"
    )

    .otherwise redirectTo: "/"
]
