"use strict"

###
@ngdoc overview
@name <%= scriptAppName %>:routes
@description
# routes.js

Configure routes for use with Angular, and apply authentication security
Add new routes using `yo angularfire:route` with the optional --auth-required flag.

Any controller can be secured so that it will only load if user is logged in by
using `whenAuthenticated()` in place of `when()`. This requires the user to
be logged in to view this route, and adds the current user into the dependencies
which can be injected into the controller. If user is not logged in, the promise is
rejected, which is handled below by $routeChangeError

Any controller can be forced to wait for authentication to resolve, without necessarily
requiring the user to be logged in, by adding a `resolve` block similar to the one below.
It would then inject `user` as a dependency. This could also be done in the controller,
but abstracting it makes things cleaner (controllers don't need to worry about auth state
or timing of displaying its UI components; it can assume it is taken care of when it runs)

resolve: {
user: ['simpleLogin', function(simpleLogin) {
return simpleLogin.getUser();
}]
}
###

###
Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
when called, invokes the authRequired() service (see simpleLogin.js).

The promise either resolves to the authenticated user object and makes it available to
dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
forcing a redirect to the /login page
###

# credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
# unfortunately, a decorator cannot be use here because they are not applied until after
# the .config calls resolve, so they can't be used during route configuration, so we have
# to hack it directly onto the $routeProvider object

# configure views; the authRequired parameter is used for specifying pages
# which should only be available while logged in

###
Apply some route security. Any route's resolve method can reject the promise with
{ authRequired: true } to force a redirect. This method enforces that and also watches
for changes in auth status which might require us to navigate away from a path
that we can no longer view.
###

# watch for login status changes and redirect if appropriate

# some of our routes may reject resolve promises with the special {authRequired: true} error
# this redirects to the login page whenever that is encountered

# used by route security
angular.module("<%= scriptAppName %>").config([
  "$routeProvider"
  "SECURED_ROUTES"
  ($routeProvider, SECURED_ROUTES) ->
    $routeProvider.whenAuthenticated = (path, route) ->
      route.resolve = route.resolve or {}
      route.resolve.user = [
        "authRequired"
        (authRequired) ->
          return authRequired()
      ]
      $routeProvider.when path, route
      SECURED_ROUTES[path] = true
      $routeProvider
]).config([
  "$routeProvider"
  ($routeProvider) ->

    $routeProvider.when("/",
      templateUrl: "views/main.html"
      controller: "MainCtrl"
    )

    .when("/login",
      templateUrl: "views/login.html"
      controller: "LoginCtrl"
    )

    .when("/chat",
      templateUrl: "views/chat.html"
      controller: "ChatCtrl"
    )

    .whenAuthenticated("/account",
      templateUrl: "views/account.html"
      controller: "AccountCtrl"
    )

    .otherwise redirectTo: "/"

]).run([
  "$rootScope"
  "$location"
  "simpleLogin"
  "SECURED_ROUTES"
  "loginRedirectPath"
  ($rootScope, $location, simpleLogin, SECURED_ROUTES, loginRedirectPath) ->
    check = (user) ->
      $location.path loginRedirectPath  if not user and authRequired($location.path())
      return
    authRequired = (path) ->
      SECURED_ROUTES.hasOwnProperty path
    simpleLogin.watch check, $rootScope
    $rootScope.$on "$routeChangeError", (e, next, prev, err) ->
      $location.path loginRedirectPath  if angular.isObject(err) and err.authRequired
      return

]).constant "SECURED_ROUTES", {}
