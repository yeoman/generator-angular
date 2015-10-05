/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {
  export class <%= classedName %>Ctrl {
    public awesomeThings: string[] = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
  }
}

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', <%= scriptAppName %>.<%= classedName %>Ctrl);
