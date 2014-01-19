'use strict'

###*
 # @ngdoc directive
 # @name <%= scriptAppName %>.directive:<%= cameledName %>
 # @description
 # # <%= cameledName %>
###
angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the <%= cameledName %> directive'
  )
