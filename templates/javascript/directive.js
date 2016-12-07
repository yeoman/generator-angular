'use strict';

/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.directive:<%= cameledName %>
 * @description
 * # <%= cameledName %>
 */
angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', function () {
    return {
      restrict: 'E',
      /*scope{
          var:'='
        },
      */
      templateUrl: 'add-view.html',
      controller:function(){
        var ctrl = this;
      },
      controllerAs:'<%= "d_"+ cameledName %>'
    };
  });
