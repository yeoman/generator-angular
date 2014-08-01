'use strict';

(function () {

  /* @ngInject */
  function <%= cameledName %>($delegate) {
    // decorate the $delegate
    return $delegate;
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .config(function ($provide) {
      // replace $http with whatever you want to decorate
      $provide.decorator('$http', <%= cameledName %>);
    });

})();
