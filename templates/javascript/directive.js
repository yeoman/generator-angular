'use strict';

/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.directive:<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Directive to replace content with custom text.
 */
angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the <%= cameledName %> directive');
      }
    };
  });
