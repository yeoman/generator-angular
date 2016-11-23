'use strict'

###*
 # @ngdoc directive
 # @name <%= scriptAppName %>.directive:<%= cameledName %>
 # @description
 # # <%= cameledName %>
###
angular.module '<%= scriptAppName %>'
  .directive '<%= cameledName %>', ->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      element.text 'this is the <%= cameledName %> directive'
