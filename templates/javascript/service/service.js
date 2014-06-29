'use strict';

angular.module('<%= scriptAppName %>Internal')
  .service('<%= cameledName %>', function <%= cameledName %>() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var meaningOfLife = 42;

    // Public API here
    this.someMethod = function () {
      return meaningOfLife;
    };
  });
