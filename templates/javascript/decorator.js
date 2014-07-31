'use strict';

(function () {

  /* @ngInject */
  function <%= classedName %>($delegate) {
    // decorate the $delegate
    return $delegate;
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .config(function ($provide) {
      // replace $http with whatever you want to decorate
      $provide.decorator('$http', <%= classedName %>);
    });

})();
