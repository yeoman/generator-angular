'use strict';

angular.module('<%= scriptAppName %>')
  .controller('menuCtrl', function($location, $http, $scope, token_service) {
    var ctrl = this;
    ctrl.actual = $location.path();
    $scope.token_service = token_service;


    //Pendiente por definir json del menu
    (function($) {
      $(document).ready(function() {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().siblings().removeClass('open');
          $(this).parent().toggleClass('open');
        });
      });
    })(jQuery);
  });
