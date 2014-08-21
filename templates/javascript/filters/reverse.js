'use strict';

angular.module('<%= scriptAppName %>')
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
