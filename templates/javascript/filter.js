(function() {
  'use strict';

  /**
   * @ngdoc filter
   * @name <%= scriptAppName %>.filter:<%= cameledName %>
   * @function
   * @description
   * # <%= cameledName %>
   * Filter in the <%= scriptAppName %>.
   */
  angular
    .module('<%= scriptAppName %>')
    .filter('<%= cameledName %>', <%= cameledName %>);

  function <%= cameledName %>() {
    return function (input) {
      return '<%= cameledName %> filter: ' + input;
    };
  }
})();