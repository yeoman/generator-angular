'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:app appName', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../app'))
      .withGenerators([
        require.resolve('../common'),
        require.resolve('../controller'),
        require.resolve('../main'),
        [helpers.createDummyGenerator(), 'karma:app']
      ])
      .withOptions({
        'appPath': 'app',
        'skip-welcome-message': true,
        'skip-message': true
      })
      .withArguments(['upperCaseBug'])
      .withPrompts({
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: []
      })
      .on('end', done);
  });

  it('generates the same appName in every file', function () {
    assert.file([
      'app/scripts/app.js',
      'app/scripts/controllers/main.js',
      'app/index.html',
      'test/spec/controllers/main.js'
    ]);

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
