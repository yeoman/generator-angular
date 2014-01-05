'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (name === 'main') { %>
  .constant('clientConfig', {})
  .config(function ($sceDelegateProvider, clientConfig) {
    $sceDelegateProvider.resourceUrlWhitelist([clientConfig.staticsUrl+'**', 'self']);
  })
  .run(function ($rootScope, clientConfig) {
    $rootScope.clientConfig = clientConfig;
  })<% } %>;
