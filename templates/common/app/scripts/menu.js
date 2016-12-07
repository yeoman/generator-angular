angular.module('<%= scriptAppName %>')
.controller('menuCtrl', function ($location,$http, $scope) {
  var ctrl = this;
  ctrl.actual = $location.path();
  //Configuracion de parametros identificacion unica
  $scope.AUTORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth";
  $scope.CLIENTE_ID       = "794841744026-6p2i7lmiho204r4li2bb1ektd7j9dbd4.apps.googleusercontent.com";
  $scope.REDIRECT_URL     = "https://oauth2-login-demo.example.com/code";
  $scope.RESPONSE_TYPE    = "code";
  $scope.SCOPE            = "openid email";

  var memoryToken;
    $scope.memoryTokenHandler = {
        get: function() { return memoryToken; },
        set: function($window, token) { memoryToken = token; },
        clear: function() { memoryToken = undefined; }
    };



  //Pendiente por definir json del menu
  (function($){
    $(document).ready(function(){
      $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass('open');
        $(this).parent().toggleClass('open');
      });
    });
  })(jQuery);
});
