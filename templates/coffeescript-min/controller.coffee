'use strict'

angular.module('<%= _.camelize(appname) %>App')
  .controller '<%= _.classify(name) %>Ctrl', ['$scope', ($scope) ->
    $scope.awesomeThings = [
      'Bower'
      'Grunt'
      'Haml'
      'Compass'
      'AngularJS'
      'Karma'
    ]
  ]
