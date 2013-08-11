<%= typescriptAppName %>.controller('<%= tsAngularName %>', function ($scope) {
  return new <%= tsClassName %>($scope);
});

interface <%= tsScopeInterfaceName %> extends ng.IScope {
  awesomeThings: string[];
}

class <%= tsClassName %> {
  constructor($scope: <%= tsScopeInterfaceName %>) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Typescript'
    ];
  }
}
