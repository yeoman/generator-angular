'use strict';

module.exports = {
  '${debug}': 'true',
  '${enableMocks}': 'true',
  '${experiments}': '{}',
  '${locale}': 'en',<% if (dashboardApp) { %>
  '${metaSiteId}': 'c853c829-503e-48b1-892f-28d8c22a887c',<% } %>

  '${clientTopology.frogUrl}': 'http://www.frog.wixpress.com/',
  '${clientTopology.publicUrl}': 'http://www.pizza.wixpress.com/',
  '${clientTopology.dashboardFrameworkStaticsUrl}': 'http://static.pizza.wixpress.com/services/wix-dashboard-framework-statics/current/',

  '${staticBaseUrl}': 'http://static.pizza.wixpress.com/',
  '${staticsUrl}': 'http://localhost:9000/'<% if (dashboardApp) { %>,

  '#parse(\'views/my-account/embeds_head.vm\')': '',
  '#parse(\'views/my-account/embeds_body_top.vm\')': '',
  '#parse(\'views/my-account/embeds_body_bottom.vm\')': ''<% } %>
};
