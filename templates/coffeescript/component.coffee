'use strict'

###*
 # @ngdoc component
 # @name <%= scriptAppName %>.component:<%= cameledName %>
 # @description
 # # <%= cameledName %>
###
angular.module '<%= scriptAppName %>'
  .component '<%= cameledName %>',
    template: '<div>{{$ctrl.message}}</div>'
    controller: ->
      this.message = 'this is the <%= cameledName %> component'
      return
