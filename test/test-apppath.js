// /*global describe, before, it, beforeEach */
// 'use strict';
//
// var fs = require('fs');
// var assert = require('assert');
// var path = require('path');
// var util = require('util');
// var generators = require('yeoman-generator');
// var helpers = require('yeoman-generator').test;
// var _ = require('underscore.string');
//
// describe('Angular generator appPath option', function () {
//   var angular;
//   var appPath = 'customAppPath';
//   var expected = [
//     appPath + '/.htaccess',
//     appPath + '/404.html',
//     appPath + '/favicon.ico',
//     appPath + '/robots.txt',
//     appPath + '/styles/main.scss',
//     appPath + '/views/main.html',
//     appPath + '/index.html',
//     '.bowerrc',
//     '.editorconfig',
//     '.gitignore',
//     '.jshintrc',
//     'Gruntfile.js',
//     'package.json',
//     'bower.json'
//   ];
//   var mockPrompts = {
//     compass: true,
//     bootstrap: true,
//     compassBootstrap: true,
//     modules: []
//   };
//   var genOptions = {
//     'app-path': appPath,
//     'skip-install': true,
//     'skip-welcome-message': true,
//     'skip-message': true
//   };
//
//   beforeEach(function (done) {
//     var deps = [
//       '../../app',
//       '../../common',
//       '../../controller',
//       '../../main', [
//         helpers.createDummyGenerator(),
//         'karma:app'
//       ]
//     ];
//     helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
//       if (err) {
//         done(err);
//       }
//       angular = helpers.createGenerator('angular:app', deps, false, genOptions);
//       done();
//     });
//   });
//
//   it('should generate dotfiles', function (done) {
//     helpers.mockPrompt(angular, mockPrompts);
//
//     angular.run({}, function () {
//       helpers.assertFile(expected);
//       done();
//     });
//   });
//
//   it.only('creates expected JS files', function (done) {
//     helpers.mockPrompt(angular, mockPrompts);
//
//     angular.run({}, function() {
//       helpers.assertFile([].concat(expected, [
//         appPath + '/scripts/app.js',
//         appPath + '/scripts/controllers/main.js',
//         'test/spec/controllers/main.js'
//       ]));
//       done();
//     });
//   });
//
//   it('creates CoffeeScript files', function (done) {
//     helpers.mockPrompt(angular, mockPrompts);
//
//     angular.env.options.coffee = true;
//     angular.run([], function () {
//       helpers.assertFile([].concat(expected, [
//         appPath + '/scripts/app.coffee',
//         appPath + '/scripts/controllers/main.coffee',
//         'test/spec/controllers/main.coffee'
//       ]));
//       done();
//     });
//   });
//
//   /**
//    * Generic test function that can be used to cover the scenarios where a generator is creating both a source file
//    * and a test file. The function will run the respective generator, and then check for the existence of the two
//    * generated files. A RegExp check is done on each file, checking for the generated content with a pattern.
//    *
//    * The number of parameters is quite huge due to the many options in which the generated files differ,
//    * e.g. Services start with an upper case letter, whereas filters, directives or constants start with a lower case
//    * letter.
//    *
//    * The generated items all use the dummy name 'foo'.
//    *
//    * @param generatorType The type of generator to run, e.g. 'filter'.
//    * @param specType The type of the generated spec file, e.g. 'service' - all service types (constant, value, ...)
//    *    use the same Service spec template.
//    * @param targetDirectory The directory into which the files are generated, e.g. 'directives' - this will be
//    *    located under 'customAppPath/scripts' for the sources and 'test/spec' for the tests.
//    * @param scriptNameFn The function used to create the name of the created item, e.g. _.classify to generate 'Foo',
//    *    or _.camelize to generate 'foo'.
//    * @param specNameFn Same as scriptNameFn, but for the describe text used in the Spec file. Some generators use
//    *    _.classify, others use _.camelize.
//    * @param suffix An optional suffix to be appended to the generated item name, e.g. 'Ctrl' for controllers, which
//    *    will generate 'FooCtrl'.
//    * @param done The done function.
//    */
//   function generatorTest(generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {
//     var angularGenerator;
//     var name = 'foo';
//     var deps = [path.join('../..', generatorType)];
//     angularGenerator = helpers.createGenerator('angular:' + generatorType, deps, [name], genOptions);
//
//     helpers.mockPrompt(angular, mockPrompts);
//     angular.run([], function () {
//       angularGenerator.run([], function () {
//         assert.fileContent([
//           [
//             path.join(appPath + '/scripts', targetDirectory, name + '.js'),
//             new RegExp(
//               generatorType + '\\(\'' + scriptNameFn(name) + suffix + '\'',
//               'g'
//             )
//           ]
//         ]);
//         done();
//       });
//     });
//   }
//
//   describe('Controller', function () {
//     it('should generate a new controller', function (done) {
//       generatorTest('controller', 'controller', 'controllers', _.classify, _.classify, 'Ctrl', done);
//     });
//   });
//
//   describe('Directive', function () {
//     it('should generate a new directive', function (done) {
//       generatorTest('directive', 'directive', 'directives', _.camelize, _.camelize, '', done);
//     });
//   });
//
//   describe('Filter', function () {
//     it('should generate a new filter', function (done) {
//       generatorTest('filter', 'filter', 'filters', _.camelize, _.camelize, '', done);
//     });
//   });
//
//   describe('Service', function () {
//     function serviceTest (generatorType, nameFn, done) {
//       generatorTest(generatorType, 'service', 'services', nameFn, nameFn, '', done);
//     }
//
//     ['constant', 'factory', 'provider', 'value'].forEach(function(t) {
//       it('should generate a new ' + t, function (done) {
//         serviceTest(t, _.camelize, done);
//       });
//     });
//
//
//     it('should generate a new service', function (done) {
//       serviceTest('service', _.capitalize, done);
//     });
//   });
//
//   describe('View', function () {
//     it('should generate a new view', function (done) {
//       var angularView;
//       var deps = ['../../view'];
//       angularView = helpers.createGenerator('angular:view', deps, ['foo'], genOptions);
//
//       helpers.mockPrompt(angular, mockPrompts);
//       angular.run([], function () {
//         angularView.run([], function () {
//           helpers.assertFile([appPath + '/views/foo.html']);
//           done();
//         });
//       });
//     });
//
//     it('should generate a new view in subdirectories', function (done) {
//       var angularView;
//       var deps = ['../../view'];
//       angularView = helpers.createGenerator('angular:view', deps, ['foo/bar'], genOptions);
//
//       helpers.mockPrompt(angular, mockPrompts);
//       angular.run([], function () {
//         angularView.run([], function () {
//           helpers.assertFile([appPath + '/views/foo/bar.html']);
//           done();
//         });
//       });
//     });
//   });
// });
