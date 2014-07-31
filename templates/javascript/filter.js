'use strict';

(function () {

  /* @ngInject */
  function <%= classedName %>() {
    return function (input) {
      return '<%= classedName %> filter: ' + input;
    };
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .filter('<%= classedName %>', <%= classedName %>);

})();
