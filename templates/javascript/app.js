'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (name === 'main' && !dashboardApp && !dashboardWidget) { %>
  .config(function ($sceDelegateProvider, clientConfig) {
    $sceDelegateProvider.resourceUrlWhitelist([clientConfig.staticsUrl + '**', 'self']);
  })
  .run(function ($rootScope, clientConfig) {
    $rootScope.clientConfig = clientConfig;
  });<% } else if (name !== 'main') { %>
  .config(function (wixDashboardWidgetConfigProvider) {
    wixDashboardWidgetConfigProvider.setWidgetName('<%= name.replace(/-widget$/, '') %>');
  });<% } else { %>
  .config(function () {
    return;
  });<% } %>
