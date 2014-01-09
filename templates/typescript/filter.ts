/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {
  export function <%= cameledName %>FilterFactory(): Function {
    return <%= cameledName %>Filter;
  }

  function <%= cameledName %>Filter(input, param) {
  //usage {{"text" | <%= cameledName %>: "suffix"}}
  //returns '<%= cameledName %> filter: text suffix'
    return '<%= cameledName %> filter: ' + input + (param ? ' ' + param: '');
  }
}

angular.module('<%= scriptAppName %>')
  .filter('<%= cameledName %>', <%= scriptAppName %>.<%= cameledName %>FilterFactory);