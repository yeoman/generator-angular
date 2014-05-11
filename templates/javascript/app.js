'use strict';

angular.module('<%= scriptAppName %>Internal', []);

angular.module('<%= scriptAppName %>', ['<%= scriptAppName %>Internal',<%= angularModules %>])<% if (name !== 'main') { %>
  .config(function (wixDashboardWidgetConfigProvider) {
    wixDashboardWidgetConfigProvider.setWidgetName('<%= name.replace(/-widget$/, '') %>');
  });<% } else { %>
  .config(function () {
    return;
  });<% } %>
