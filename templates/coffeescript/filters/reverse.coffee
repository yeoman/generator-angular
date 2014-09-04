"use strict"
angular.module("<%= scriptAppName %>").filter "reverse", ->
  (items) ->
    if angular.isArray(items) then items.slice().reverse() else []