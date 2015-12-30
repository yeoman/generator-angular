'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

function generateFullProject(cb) {
  helpers.run(require.resolve('../app'))
    .withGenerators([
      require.resolve('../common'),
      require.resolve('../controller'),
      require.resolve('../main'),
      require.resolve('../route'),
      require.resolve('../view'),
      [ helpers.createDummyGenerator(), 'karma:app']
    ])
    .withOptions({
      'appPath': 'app',
      'skip-welcome-message': true,
      'skip-message': true
    })
    .withPrompts({
      compass: true,
      bootstrap: true,
      compassBootstrap: true,
      modules: ['routeModule']
    })
    .on('end', cb);
}

describe('angular:route', function () {
  beforeEach(function (done) {
    generateFullProject(function () {
      this.angularRoute = helpers.run(require.resolve('../route'))
        .withGenerators([
          require.resolve('../controller'),
          require.resolve('../view')
        ])
        .withOptions({
          appPath: 'app'
        })
        .withArguments(['simpleroute']);

      // Hack to not clear the directory
      this.angularRoute.inDirSet = true;

      done();
    }.bind(this));
  });

  it('generates default route items', function (done) {
    this.angularRoute.on('end', function () {
      assert.file([
        'app/scripts/controllers/simpleroute.js',
        'test/spec/controllers/simpleroute.js',
        'app/views/simpleroute.html'
      ]);
      assert.fileContent(
        'app/scripts/app.js',
        /when\('\/simpleroute'/
      );
      done();
    });
  });

  it('generates route items with the route uri given', function (done) {
    this.angularRoute
      .withOptions({
        uri: 'segment1/segment2/:parameter'
      })
      .on('end', function () {
        assert.file([
          'app/scripts/controllers/simpleroute.js',
          'test/spec/controllers/simpleroute.js',
          'app/views/simpleroute.html'
        ]);
        assert.fileContent(
          'app/scripts/app.js',
          /when\('\/segment1\/segment2\/\:parameter'/
        );
        done();
      });
  });
});
