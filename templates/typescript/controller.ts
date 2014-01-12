/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {
  export interface I<%= classedName %>Scope extends ng.IScope {
    awesomeThings: any[];
  }

  export class <%= classedName %>Ctrl {

    constructor (private $scope: I<%= classedName %>Scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }
  }
}

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', <%= scriptAppName %>.<%= classedName %>Ctrl);
