'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (name !== 'main') { %>
  .config(function (wixDashboardWidgetConfigProvider) {
    wixDashboardWidgetConfigProvider.setWidgetName('<%= name.replace(/-widget$/, '') %>');
  });<% } else { %>
  .config(function () {
    return;
  });<% } %>
