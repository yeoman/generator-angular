/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {
  export function <%= cameledName %>Factory() {
    return new <%= classedName %>(42);
  }

  export class <%= classedName %> {

    constructor (private meaningOfLife) {
    }

    someMethod() {
      return this.meaningOfLife;
    }
  }
}

angular.module('<%= scriptAppName %>')
  .factory('<%= cameledName %>', <%= scriptAppName %>.<%= cameledName %>Factory);
