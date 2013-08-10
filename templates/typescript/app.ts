interface <%= typescriptAppType %> extends ng.IModule {}

var <%= typescriptAppName %>: <%= typescriptAppType %> = angular.module("<%= typescriptAppName %>", [<% if (typescriptPartialsCache) { %>"<%= typescriptTemplatesModuleName %>"<% } %>])
.config(($routeProvider: ng.IRouteProvider) => {
  $routeProvider
  .when("/", {
    templateUrl: "views/main.html",
    controller: "MainCtrl"
  })
  .otherwise({
    redirectTo: "/"
  });
});

<% if (typescriptConfig) { %>
declare var <%= typescriptConfigName %>: Config;
<%= typescriptAppName %>.constant("config", <%= typescriptConfigName %>);
<% } %>
