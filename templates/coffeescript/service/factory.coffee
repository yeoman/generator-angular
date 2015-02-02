'use strict'

###*
 # @ngdoc service
 # @name <%= scriptAppName %>.<%= cameledName %>
 # @description
 # # <%= cameledName %>
 # Factory in the <%= scriptAppName %>.
###
angular.module '<%= scriptAppName %>'
  .factory '<%= cameledName %>', ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    someMethod: ->
      meaningOfLife
