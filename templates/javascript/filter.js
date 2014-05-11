'use strict';

angular.module('<%= scriptAppName %>Internal')
  .filter('<%= cameledName %>', function () {
    return function (input) {
      return '<%= cameledName %> filter: ' + input;
    };
  });
