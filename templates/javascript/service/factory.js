'use strict';

angular.module('<%= scriptAppName %>Internal')
  .factory('<%= cameledName %>', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
