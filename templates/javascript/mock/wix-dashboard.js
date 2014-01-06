'use strict';

angular.module('wixDashboardFramework', [])
  .factory('wixDashboard', function () { return {}; })
  .provider('wixPluginTopology', function () {
    this.setPluginProvider = function () {};
    this.$get = function () { return {}; };
  });
