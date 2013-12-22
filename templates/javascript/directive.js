'use strict';

/**
 * See more: http://docs.angularjs.org/guide/directive
 */

angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', function () {
    return {
      /**
      * 
      * Angular uses a normalized naming scheme for directives and will
      * make camel-cased directive names available in templates in the five different validator-
      * friendly varieties. For example, if you`ve picked your prefix as super- and you’re writing
      * a date-picker component, you might name it superDatePicker. In templates, you could
      * then use it as super-date-picker, super:date-picker, data-super-date-picker, or another
      * variant.
      * 
      * Example: directive 'MyMenu'
      *  Char  Declaration style   Example
      *  'E'   element             <my-menu></my-menu>
      *  'A'   attribute           <div my-menu></div>
      *  'C'   class               <div class=my-menu></div>
      *  'M'   comment             <!-- directive: my-menu -->
      * 
      * @restrict {String} Declare how directive can be used in a template as an element, attribute, class, comment, or any combination.
      * 
      */
      restrict: 'AE',

      /**
      * 
      * In cases where you have multiple directives on a single DOM element and where the
      * order in which they’re applied matters, you can use the priority property to order their
      * application. Higher numbers run first. The default priority is 0 if you don’t specify one.
      * 
      * @priority {Number} Set the order of execution in the template relative to other directives on the element. 
      * 
      */
      priority: 0,

      /** 
      * 
      * The template property is usually only useful for very small templates.
      * 
      * @template {String} Specify an inline template as a string. Not used if you’re specifying your template as a URL. 
      * 
      */
      template: '<div></div>',

      /** 
      * 
      * @template {String} Specify the template to be loaded by URL. This is not used if you’ve specified an inline template as a string. 
      * 
      */
      // templateUrl: 'views/my-menu.html',

      /** 
      * 
      * @replace {Boolean} If true, replace the current element. If false or unspecified, append this directive to the current element.
      * 
      */
      replace: true,

      /** 
      * 
      * In addition to replacing or appending the content, you can also move the original content
      * within the new template through the transclude property. When set to true, the
      * directive will delete the original content, but make it available for reinsertion within
      * your template through a directive called ng-transclude.
      *   
      * @transclude {Boolean} Lets you move the original children of a directive to a location inside the new template.
      * 
      * We could change our example to use transclusion:
      * Example:
      *
      *   appModule.directive('hello', function() {
      *       return {
      *           template: '<div>Hi there <span ng-transclude></span></div>',
      *           transclude: true
      *           };
      *       });
      *
      * applying it as:
      *   <div hello>Bob</div>
      *
      * We would see: "Hi there Bob."
      * 
      * See more: http://docs.angularjs.org/api/ng.directive:ngTransclude
      *
      */
      transclude: false,

      /**
      *
      * @param {Object} or {Boolean} Create a new scope for this directive rather than inheriting the parent scope.
      * 
      */
      scope: false,

      /**
      *
      * @controller {Function} Create a controller which publishes an API for communicating across directives.
      *
      * Example:
      *   controller: function($scope, $element, $attrs, $transclude) { ... },
      *
      */
      controller: function controllerConstructor($scope, $element, $attrs, $transclude) { 
      },

      /**
      * 
      * @require {String} or {Array} Require that another directive be present for this directive to function correctly.
      * 
      * Example:
      *   'otherDirective' or ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent']
      * 
      */
      require: '',


      /**
      *
      * Link phase:
      *    To make the view dynamic, Angular then runs a link function for each directive.
      *   The link functions typically creates listeners on the DOM or the model. These
      *   listeners keep the view and the model in sync at all times.
      *
      * @link {Function} Programmatically modify resulting DOM element instances, add event listeners, and set up data binding.
      *
      * See more: http://docs.angularjs.org/api/ng.$compile
      *
      */
      link: function postLink(scope, element, attrs) {
          element.text('this is the <%= cameledName %> directive');
      },

      /**
      * 
      * Compile phase:
      *    In this phase, Angular walks the DOM to identify all the registered directives in the
      *   template. For each directive, it then transforms the DOM based on the directive`s
      *   rules ( template, replace, transclude, and so on), and calls the compile function
      *   if it exists. The result is a compiled template function, which will invoke the link
      *   functions collected from all of the directives.
      *   
      * @compile {Function}
      *   @tElement - template element - The element where the directive has been declared. It is safe to do template transformation on the element and child elements only.
      *   @tAttrs - template attributes - Normalized list of attributes declared on this element shared between all directive compile functions.
      *   @transclude - [DEPRECATED!] A transclude linking function: function(scope, cloneLinkingFn)
      * 
      * See more: http://docs.angularjs.org/guide/compiler
      *
      */
      // compile: function compile(tElement, tAttrs, transclude) {
      //  return {
      //      /** @preLink {Function} Executed before the child elements are linked. Not safe to do DOM transformation since the compiler linking function will fail to locate the correct elements for linking. */
      //      pre: function preLink(scope, iElement, iAttrs, controller) { },

      //      /** @postLink {Function} Executed after the child elements are linked. It is safe to do DOM transformation in the post-linking function. */
      //      post: function postLink(scope, iElement, iAttrs, controller) { }
      //  }
      // }
    };
  });
