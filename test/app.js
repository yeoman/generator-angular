'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

var getDefaultFilesForAppPath = function (appPath) {
  return [
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
};

describe('angular:app', function () {
  var appPath = 'customAppPath';

  beforeEach(function () {
    this.angular = helpers
      .run(require.resolve('../app'))
      .withGenerators([
        require.resolve('../common'),
        require.resolve('../controller'),
        require.resolve('../main'),
        [helpers.createDummyGenerator(), 'karma:app']
      ])
      .withOptions({
        'skip-welcome-message': true,
        'skip-message': true
      })
      .withArguments(['upperCaseBug'])
      .withPrompts({
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: []
      });
  });

  describe('default settings', function () {
    beforeEach(function (done) {
      this.angular.on('end', done);
    });

    it('generates base files', function () {
      assert.file(getDefaultFilesForAppPath('app'));
      assert.file([
        '.jscsrc',
        'app/index.html',
        'app/scripts/app.js',
        'app/scripts/controllers/main.js',
        'test/spec/controllers/main.js'
      ]);
    });
  });

  describe('--coffee', function () {
    beforeEach(function (done) {
      this.angular.withOptions({
        coffee: true
      }).on('end', done);
    });

    it('generates CoffeeScript files', function () {
      assert.file([].concat(getDefaultFilesForAppPath('app'), [
        'app/scripts/app.coffee',
        'app/scripts/controllers/main.coffee',
        'test/spec/controllers/main.coffee'
      ]));
    });
  });

  describe('--typescript', function () {
    beforeEach(function (done) {
      this.angular.withOptions({
        typescript: true
      }).on('end', done);
    });

    it('generates TypeScript files', function () {
      assert.file([].concat(getDefaultFilesForAppPath('app'), [
        'app/scripts/app.ts',
        'app/scripts/controllers/main.ts',
        'test/spec/controllers/main.ts'
      ]));
    });
  });

  describe('--appPath', function () {
    beforeEach(function (done) {
      this.angular.withOptions({
        appPath: 'alternative'
      }).on('end', done);
    });

    it('generates base files inside the appPath', function () {
      assert.file(getDefaultFilesForAppPath('alternative'));
      assert.file([
        '.jscsrc',
        'alternative/scripts/app.js',
        'alternative/scripts/controllers/main.js',
        'test/spec/controllers/main.js'
      ]);
    });
  });

  describe('--appName', function () {
    beforeEach(function (done) {
      this.angular
        .withArguments(['upperCaseBug'])
        .on('end', done);
    });

    it('generates the same appName in every file', function () {
      assert.fileContent(
        'app/scripts/app.js',
        /module\('upperCaseBugApp'/
      );
      assert.fileContent(
        'app/scripts/controllers/main.js',
        /module\('upperCaseBugApp'/
      );
      assert.fileContent(
        'test/spec/controllers/main.js',
        /module\('upperCaseBugApp'/
      );

      assert.fileContent(
        'app/index.html',
        /ng-app="upperCaseBugApp"/
      );
    });
  });
});
