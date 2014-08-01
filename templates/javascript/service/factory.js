'use strict';

(function () {

  /* @ngInject */
  function <%= cameledName %>Factory() {
    var <%= cameledName %> = {};

    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    <%= cameledName %>.someMethod = function () {
      return meaningOfLife;
    };

    return <%= cameledName %>;
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .factory('<%= cameledName %>', <%= cameledName %>Factory);

})();
