/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {
  export function <%= cameledName %>DecoratorProvider($provide: ng.auto.IProvideService): void {
    //decorate <%= cameledName %>
    $provide.decorator('<%= cameledName %>', <%= cameledName %>Decorator);
  }

  export function <%= cameledName %>Decorator($delegate: any) {
    // decorate the $delegate
    return $delegate;
  }
}

angular.module('<%= scriptAppName %>')
  .config(<%= scriptAppName %>.<%= cameledName %>DecoratorProvider);
