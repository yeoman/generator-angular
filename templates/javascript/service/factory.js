'use strict';

(function () {

  /* @ngInject */
  function <%= classedName %>Factory() {
    var <%= classedName %> = {};

    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    <%= classedName %>.someMethod = function () {
      return meaningOfLife;
    };

    return <%= classedName %>;
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .factory('<%= classedName %>', <%= classedName %>Factory);

})();
