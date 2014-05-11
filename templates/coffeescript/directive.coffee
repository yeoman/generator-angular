'use strict'

###*
 * @ngdoc directive
 * @name <%= scriptAppName %>.directive:<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Directive to replace content with custom text.
###
angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the <%= cameledName %> directive'
  )
