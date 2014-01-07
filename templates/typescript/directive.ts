/// <reference path="../app.ts" />

'use strict';

module <%= scriptAppName %> {

	export class <%= classedName %> implements ng.IDirective {
		template = '<div></div>';
		restrict = 'E';
		link = function (scope, element: JQuery, attrs: ng.IAttributes):void {
			element.text('this is the <%= cameledName %> directive');
		}
	}
  
	export function <%= cameledName %>Factory() {
		return new <%= scriptAppName %>.<%= classedName %>();
	}
  
}

angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', <%= scriptAppName %>.<%= cameledName %>Factory);
