/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {

  var salutation: string;

  export class Greeter {
    greet = () => salutation;
  }

  export class <%= classedName %>Provider {
    $get = () => new Greeter();

    // Public API for configuration
    setSalutation = (s: string) => salutation = s;
  }

}


angular.module('<%= scriptAppName %>')
  .provider('<%= cameledName %>', <%= scriptAppName %>.<%= classedName %>Provider);
