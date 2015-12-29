'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');


describe('Angular generator template', function () {
  var angular;
  var appName = 'upperCaseBug';

  beforeEach(function (done) {
    var deps = [
      '../../../app',
      '../../../common',
      '../../../controller',
      '../../../main',
      [ helpers.createDummyGenerator(), 'karma:app' ]
    ];
    helpers.testDirectory(path.join(__dirname, 'tmp', appName), function (err) {
      if (err) {
        done(err);
      }

      angular = helpers.createGenerator('angular:app', deps, [appName], {
        'appPath': 'app',
        'skip-welcome-message': true,
        'skip-install': true,
        'skip-message': true
      });

      helpers.mockPrompt(angular, {
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: []
      });

      done();
    });
  });

  it('should generate the same appName in every file', function (done) {
    angular.run({}, function () {
      assert.file([
        'app/scripts/app.js',
        'app/scripts/controllers/main.js',
        'app/index.html',
        'test/spec/controllers/main.js'
      ]);

      assert.fileContent(
        'app/scripts/app.js',
        new RegExp('module\\(\'' + appName + 'App\'')
      );
      assert.fileContent(
        'app/scripts/controllers/main.js',
        new RegExp('module\\(\'' + appName + 'App\'')
      );
      assert.fileContent(
        'test/spec/controllers/main.js',
        new RegExp('module\\(\'' + appName + 'App\'')
      );

      assert.fileContent(
        'app/index.html',
        new RegExp('ng-app=\"' + appName + 'App\"')
      );
      done();
    });
  });
});
