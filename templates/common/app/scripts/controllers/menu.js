'use strict';

angular.module('<%= scriptAppName %>')
  .controller('menuCtrl', function($location, $http, $scope, token_service) {
    var ctrl = this;
    $scope.actual = "";
    $scope.token_service = token_service;
    $scope.breadcrumb = [];
    $scope.menu_service = [{ //aqui va el servicio de el app de configuracion
      "Id": 2,
      "Nombre": "nivel 1",
      "Url": "url_nivel_1",
      "Opciones": [{
        "Id": 3,
        "Nombre": "nivel 2",
        "Url": "url_nivel_2",
        "Opciones": [{
          "Id": 7,
          "Nombre": "nivel 3",
          "Url": "url_nivel_3",
          "Opciones": [{
            "Id": 8,
            "Nombre": "nivel 4 about",
            "Url": "about",
            "Opciones": null
          }]
        }]
      }]
    }];

    var recorrerArbol = function(item, padre) {
      var padres = "";
      for (var i = 0; i < item.length; i++) {
        if (item[i].Opciones === null) {
          padres = padre + " , " + item[i].Nombre;
          paths.push({
            'path': item[i].Url,
            'padre': padres.split(",")
          });
        } else {
          recorrerArbol(item[i].Opciones, padre + "," + item[i].Nombre);
        }
      }
      return padres;
    };

    var paths = [];

    var update_url = function() {
      $scope.breadcrumb = [''];
      for (var i = 0; i < paths.length; i++) {
        if ($scope.actual === "/" + paths[i].path) {
          $scope.breadcrumb = paths[i].padre;
        } else if ('/' === $scope.actual) {
          $scope.breadcrumb = [''];
        }
      }
    }
    recorrerArbol($scope.menu_service, "");

    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.actual = $location.path();
      update_url();
    });


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
