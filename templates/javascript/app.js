'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])
  .config(function ($sceDelegateProvider, clientConfig) {
    $sceDelegateProvider.resourceUrlWhitelist([clientConfig.staticsUrl+'**', 'self']);
  })
  .run(function ($rootScope, clientConfig) {
    $rootScope.clientConfig = clientConfig;
  });
