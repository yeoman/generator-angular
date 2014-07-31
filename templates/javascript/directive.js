'use strict';

(function () {

  /* @ngInject */
  function <%= cameledName %>() {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.text('this is the <%= cameledName %> directive');
      }
    };
  }

  angular
    .module('<%= scriptAppName %>Internal')
    .directive('<%= cameledName %>', <%= cameledName %>);

})();
