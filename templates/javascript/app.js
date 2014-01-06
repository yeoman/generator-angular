'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (name === 'main' && !dashboardApp && !dashboardPlugin) { %>
  .config(function ($sceDelegateProvider, clientConfig) {
    $sceDelegateProvider.resourceUrlWhitelist([clientConfig.staticsUrl+'**', 'self']);
  })
  .run(function ($rootScope, clientConfig) {
    $rootScope.clientConfig = clientConfig;
  });<% } else if (name !== 'main') { %>
  .config (function (wixPluginTopologyProvider) {
    wixPluginTopologyProvider.setPluginProvider('<%= name.replace(/-plugin$/, '') %>');
  });<% } else { %>
  .config (function () {
    return;
  });<% } %>
