'use strict';

(function () {

  // Private variables
  var salutation = 'Hello';

  // Private constructor
  function Greeter() {
    this.greet = function () {
      return salutation;
    };
  }

  /* @ngInject */
  function <%= classedName %>() {

    // Public API for configuration
    this.setSalutation = function (s) {
      salutation = s;
    };

    /* @ngInject */
    this.$get = function () {
      return new Greeter();
    };
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .provider('<%= cameledName %>', <%= classedName %>);

})();
