'use strict';

(function () {

  /* @ngInject */
  function <%= cameledName %>() {
    return function (input) {
      return '<%= cameledName %> filter: ' + input;
    };
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .filter('<%= cameledName %>', <%= cameledName %>);

})();
