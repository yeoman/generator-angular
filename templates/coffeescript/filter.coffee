'use strict'

###*
 * @ngdoc filter
 * @name <%= scriptAppName %>.filter:<%= cameledName %>
 * @function
 * @description
 * # <%= cameledName %>
 * Filter to change your value.
###
angular.module('<%= scriptAppName %>')
  .filter '<%= cameledName %>', ->
    (input) ->
      '<%= cameledName %> filter: ' + input
