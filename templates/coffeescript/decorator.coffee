'use strict'

###*
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %>
 * @description
 * # <%= classedName %>Ctrl
 * Decorator of the <%= scriptAppName %>
###
angular.module("<%= scriptAppName %>").config ($provide) ->
  $provide.decorator "<%= cameledName %>", ($delegate) ->
    # decorate the $delegate
    $delegate
