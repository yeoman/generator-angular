/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {
  export class <%= classedName %> {
    awesomeThings:any[] = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
}

angular.module('<%= scriptAppName %>')
  .service('<%= cameledName %>', <%= scriptAppName %>.<%= classedName %>);
