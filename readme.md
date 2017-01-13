# generator-oas

## Componentes

 - Hojas de estilo de la oficina asesora de sistemas publicado en la dirección: http://10.20.0.254/assets-oas/pages/index.html
 - generator-angular: https://github.com/yeoman/generator-angular
 - La libreria ui-grud: http://ui-grid.info/
 - La libreria angular-material: https://material.angularjs.org/latest/
 - El generador se encuentra en: https://www.npmjs.com/package/generator-oas

## Instalación

```
npm install -g grunt-cli bower yo generator-karma generator-oas
```

## Uso

Para crear un aplicación con este componente es necesario crear el directorio donde se desea crear y luego:

```
yo oas "Nombre de la aplicacion"
     ╔══════════════════════════════════════════════════════════╗
     ║                                                          ║
     ║             ██████╗      █████╗     ███████╗             ║
     ║            ██╔═══██╗    ██╔══██╗    ██╔════╝             ║
     ║            ██║   ██║    ███████║    ███████╗             ║
     ║            ██║   ██║    ██╔══██║    ╚════██║             ║
     ║            ╚██████╔╝    ██║  ██║    ███████║             ║
     ║             ╚═════╝     ╚═╝  ╚═╝    ╚══════╝             ║
     ║              𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 𝕥𝕙𝕖 𝕘𝕖𝕟𝕖𝕣𝕒𝕥𝕠𝕣-𝕠𝕒𝕤                ║
     ║                                                          ║
     ╚══════════════════════════════════════════════════════════╝

? Would you like to use Gulp (experimental) instead of Grunt? (y/N)


 Welcome to the generator system

 ? Would you like to use Gulp (experimental) instead of Grunt? No
 ? Would you like to use Sass (with Compass)? No
 ? Would you like to include Bootstrap? Yes
```

Se recomienda dejar los componentes de angular predefinidos (Enter)

Luego solicitará que version de angular se desea instalar, se recomienda seleccionar la opcion # 3 que instala la version de angular 1.6.1

Finalmente para lanzar el proyecto

```
grunt serve
```

# Documentación original

# AngularJS generator (generator-oas) [![Build Status](https://secure.travis-ci.org/yeoman/generator-angular.svg?branch=master)](http://travis-ci.org/yeoman/generator-angular) [![Gitter](https://img.shields.io/badge/Gitter-Join_the_Yeoman_chat_%E2%86%92-00d06f.svg)](https://gitter.im/yeoman/yeoman)

## Usage

Install `yo`, `grunt-cli`, `bower`, `generator-oas` and `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-oas
```

## Generators

Available generators:

* [oas](#app) (aka [oas:app](#app))
* [oas:controller](#controller)
* [oas:directive](#directive)
* [oas:filter](#filter)
* [oas:route](#route)
* [oas:service](#service)
* [oas:provider](#service)
* [oas:factory](#service)
* [oas:value](#service)
* [oas:constant](#service)
* [oas:decorator](#decorator)
* [oas:view](#view)

### App
Sets up a new oasJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Bootstrap and additional oasJS modules, such as oas-resource (installed by default).

Example:
```bash
yo oas
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo oas:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
oas.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `app/views/myroute.html`:
```html
  <div class="panel panel-default">
      <div class="panel-heading">
          <%= name %>.
      </div>
      <div class="panel-body">
          <p>
            Ahora puede empezar a construir la vista de <%= name %>.
          </p>
      </div>
      <div class="panel-footer">
          Panel Footer
      </div>
  </div>
```

**Explicitly provide route URI**

Example:
```bash
yo oas:route myRoute --uri=my/route
```

Produces controller and view as above and adds a route to `app/scripts/app.js`
with URI `my/route`

### Controller
Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo oas:controller user
```

Produces `app/scripts/controllers/user.js`:
```javascript
oas.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo oas:directive myDirective
```

Produces `app/scripts/directives/myDirective.js`:
```javascript
oas.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo oas:filter myFilter
```

Produces `app/scripts/filters/myFilter.js`:
```javascript
oas.module('myMod').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo oas:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an oasJS service.

Example:
```bash
yo oas:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
oas.module('myMod').service('myService', function () {
  // ...
});
```

You can also do `yo oas:factory`, `yo oas:provider`, `yo oas:value`, and `yo oas:constant` for other types of services.

### Decorator
Generates an oasJS service decorator.

Example:
```bash
yo oas:decorator serviceName
```

Produces `app/scripts/decorators/serviceNameDecorator.js`:
```javascript
oas.module('myMod').config(function ($provide) {
    $provide.decorator('serviceName', function ($delegate) {
      // ...
      return $delegate;
    });
  });
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### CoffeeScript and TypeScript
For generators that output scripts, the `--coffee` option will output CoffeeScript instead of JavaScript, and `--typescript` will output TypeScript instead of JavaScript.

For example:
```bash
yo oas:controller user --coffee
```

Produces `app/scripts/controller/user.coffee`:
```coffeescript
oas.module('myMod')
  .controller 'UserCtrl', ($scope) ->
```

For example:
```bash
yo oas:controller user --typescript
```

Produces `app/scripts/controller/user.ts`:
```typescript
/// <reference path="../app.ts" />

'use strict';

module demoApp {
    export interface IUserScope extends ng.IScope {
        awesomeThings: any[];
    }
    export class UserCtrl {

        constructor (private $scope:IUserScope) {
	        $scope.awesomeThings = [
              'HTML5 Boilerplate',
              'oasJS',
              'Karma'
            ];
        }
    }
}

oas.module('demoApp')
  .controller('UserCtrl', demoApp.UserCtrl);
```

### Minification Safe

**tl;dr**: You don't need to write annotated code as the build step will
handle it for you.

By default, generators produce unannotated code. Without annotations, oasJS's DI system will break when minified. Typically, these annotations that make minification safe are added automatically at build-time, after application files are concatenated, but before they are minified. The annotations are important because minified code will rename variables, making it impossible for oasJS to infer module names based solely on function parameters.

The recommended build process uses `ng-annotate`, a tool that automatically adds these annotations. However, if you'd rather not use it, you have to add these annotations manually yourself. Why would you do that though? If you find a bug
in the annotated code, please file an issue at [ng-annotate](https://github.com/olov/ng-annotate/issues).


### Add to Index
By default, new scripts are added to the index.html file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo oas:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* oas
* oas-mocks


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-animate
* angular-aria
* angular-cookies
* angular-messages
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

`json3` and `es5-shim` have been removed as Angular 1.3 has dropped IE8 support and that is the last version that needed these shims. If you still require these, you can include them with: `bower install --save json3 es5-shim`. `wiredep` should add them to your index.html file but if not you can manually add them.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

### Output
You can change the `app` directory by adding an `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

Note that you can also achieve the same results by adding an `--appPath` option when starting generator:
```bash
yo angular [app-name] --appPath=public
```

## Testing

Running `grunt test` will run the unit tests with karma.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/yeoman/generator-angular/releases)

## Sponsors
Love Yeoman work and community? Help us keep it alive by donating funds to cover project expenses! <br />
[[Become a sponsor](https://opencollective.com/yeoman#support)]

  <a href="https://opencollective.com/yeoman/backers/0/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/0/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/1/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/1/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/2/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/2/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/3/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/3/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/4/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/4/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/5/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/5/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/6/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/6/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/7/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/7/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/8/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/8/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/9/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/9/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/10/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/10/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/11/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/11/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/12/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/12/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/13/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/13/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/14/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/14/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/15/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/15/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/16/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/16/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/17/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/17/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/18/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/18/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/19/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/19/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/20/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/20/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/21/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/21/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/22/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/22/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/23/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/23/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/24/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/24/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/25/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/25/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/26/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/26/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/27/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/27/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/28/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/28/avatar">
  </a>
  <a href="https://opencollective.com/yeoman/backers/29/website" target="_blank">
    <img src="https://opencollective.com/yeoman/backers/29/avatar">
  </a>

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
