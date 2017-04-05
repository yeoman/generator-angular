/**
 * @ngdoc filter
 * @name <%= scriptAppName %>.filter:<%= cameledName %>
 * @function
 * @description
 * # <%= cameledName %>
 * Filter in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
  .filter('<%= cameledName %>', function () {
    'use strict';

    return function (input) {
      return '<%= cameledName %> filter: ' + input;
    };
  });
