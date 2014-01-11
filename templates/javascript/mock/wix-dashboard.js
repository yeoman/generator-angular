'use strict';

angular.module('wixDashboardFramework', [])
  .factory('wixDashboard', function () { return {}; })
  .provider('wixDashboardWidgetConfig', function () {
    this.setWidgetName = function () {};
    this.$get = function () { return {}; };
  });
