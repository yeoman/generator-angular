/**
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %>
 * @description
 * # <%= classedName %>
 * Decorator of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
  .config(function ($provide) {
    'use strict';

    $provide.decorator('<%= cameledName %>', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });
