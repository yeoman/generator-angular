"use strict"
angular.module("<%= scriptAppName %>").filter "reverse", ->
  (items) ->
    items.slice().reverse()