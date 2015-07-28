'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('Angular generator appPath option', function () {
  var angular;
  var appPath = 'customAppPath';
  var expected = [
    appPath + '/404.html',
    appPath + '/favicon.ico',
    appPath + '/robots.txt',
    appPath + '/styles/main.scss',
    appPath + '/views/main.html',
    appPath + '/index.html',
    '.bowerrc',
    '.editorconfig',
    '.gitignore',
    '.jshintrc',
    'Gruntfile.js',
    'package.json',
    'bower.json'
  ];
  var mockPrompts = {
    compass: true,
    bootstrap: true,
    compassBootstrap: true,
    modules: []
  };
  var genOptions = {
    'appPath': appPath,
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'tmp', 'app'), function (err) {
      if (err) {
        done(err);
      }

      angular = helpers.createGenerator(
        'angular:app',
        [
          '../../../app',
          '../../../common',
          '../../../controller',
          '../../../main',
          [ helpers.createDummyGenerator(), 'karma:app' ]
        ],
        false,
        genOptions
      );
      helpers.mockPrompt(angular, mockPrompts);

      done();
    });
  });

  describe('App files', function () {
    it('should generate dotfiles for apppath', function (done) {
      angular.run({}, function () {
        helpers.assertFile(expected);
        done();
      });
    });

    it('creates expected JS files', function (done) {
      angular.run({}, function() {
        helpers.assertFile([].concat(expected, [
          '.jscsrc',
          appPath + '/scripts/app.js',
          appPath + '/scripts/controllers/main.js',
          'test/spec/controllers/main.js'
        ]));
        done();
      });
    });

    it('creates CoffeeScript files', function (done) {
      angular.env.options.coffee = true;
      angular.run([], function () {
        helpers.assertFile([].concat(expected, [
          appPath + '/scripts/app.coffee',
          appPath + '/scripts/controllers/main.coffee',
          'test/spec/controllers/main.coffee'
        ]));
        done();
      });
    });
  });

  describe('Service Subgenerators', function () {
    var generatorTest = function (generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {
      var angularGenerator;
      var name = 'foo';
      var deps = [path.join('../../..', generatorType)];
      angularGenerator = helpers.createGenerator('angular:' + generatorType, deps, [name], genOptions);

      angular.run([], function () {
        angularGenerator.run([], function () {
          helpers.assertFileContent([
            [
              path.join(appPath + '/scripts', targetDirectory, name + '.js'),
              new RegExp(
                generatorType + '\\(\'' + scriptNameFn(name) + suffix + '\'',
                'g'
              )
            ]
          ]);
          done();
        });
      });
    };

    it('should generate a new controller', function (done) {
      generatorTest('controller', 'controller', 'controllers', _.classify, _.classify, 'Ctrl', done);
    });

    it('should generate a new directive', function (done) {
      generatorTest('directive', 'directive', 'directives', _.camelize, _.camelize, '', done);
    });

    it('should generate a new filter', function (done) {
      generatorTest('filter', 'filter', 'filters', _.camelize, _.camelize, '', done);
    });

    ['constant', 'factory', 'provider', 'value'].forEach(function(t) {
      it('should generate a new ' + t, function (done) {
        generatorTest(t, 'service', 'services', _.camelize, _.camelize, '', done);
      });
    });

    it('should generate a new service', function (done) {
      generatorTest('service', 'service', 'services', _.capitalize, _.capitalize, '', done);
    });
  });

  describe('View', function () {
    it('should generate a new view', function (done) {
      var angularView;
      var deps = [ '../../../view' ];
      angularView = helpers.createGenerator('angular:view', deps, ['foo'], genOptions);

      helpers.mockPrompt(angular, mockPrompts);
      angular.run([], function () {
        angularView.run([], function () {
          helpers.assertFile([appPath + '/views/foo.html']);
          done();
        });
      });
    });

    it('should generate a new view in subdirectories', function (done) {
      var angularView;
      var deps = [ '../../../view' ];
      angularView = helpers.createGenerator('angular:view', deps, ['foo/bar'], genOptions);

      helpers.mockPrompt(angular, mockPrompts);
      angular.run([], function () {
        angularView.run([], function () {
          helpers.assertFile([appPath + '/views/foo/bar.html']);
          done();
        });
      });
    });
  });
});
