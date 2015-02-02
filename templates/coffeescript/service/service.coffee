'use strict'

###*
 # @ngdoc service
 # @name <%= scriptAppName %>.<%= cameledName %>
 # @description
 # # <%= cameledName %>
 # Service in the <%= scriptAppName %>.
###
angular.module '<%= scriptAppName %>'
  .service '<%= cameledName %>', ->
    # AngularJS will instantiate a singleton by calling "new" on this function
