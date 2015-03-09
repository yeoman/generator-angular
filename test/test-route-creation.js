'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Angular generator route', function () {
  var angular;
  var route = 'simpleroute';
  var expected = [
    'app/scripts/controllers/' + route + '.js',
    'test/spec/controllers/' + route + '.js',
    'app/views/' + route + '.html'
  ];
  var genOptions = {
    'appPath': 'app',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };
  var mockPrompts = {
    compass: true,
    bootstrap: true,
    compassBootstrap: true,
    modules: ['routeModule']
  };

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'tmp', route), function (err) {
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
          '../../../route',
          '../../../view',
          [ helpers.createDummyGenerator(), 'karma:app']
        ],
        false,
        genOptions
      );
      helpers.mockPrompt(angular, mockPrompts);
      angular.run({}, function () {
        angular = helpers.createGenerator(
          'angular:route',
          [
            '../../../controller',
            '../../../route',
            '../../../view'
          ],
          [route],
          genOptions
        );
        helpers.mockPrompt(angular, mockPrompts);
        done();
      });
    });
  });

  describe('create routes', function () {
    it('should generate default route items', function(done){
      angular.run({}, function(e) {
        helpers.assertFile(expected);
        helpers.assertFileContent(
          'app/scripts/app.js',
          new RegExp('when\\(\'/' + route + '\'')
        );

        done();
      });
    });

    // Test with URI specified explicitly
    it('should generate route items with the route uri given', function(done){
      var uri = 'segment1/segment2/:parameter';

      angular.options.uri = uri;
      angular.run({}, function() {
        helpers.assertFile(expected);
        helpers.assertFileContent(
          'app/scripts/app.js',
          new RegExp('when\\(\'/' + uri + '\'')
        );

        done();
      });
    });
  });
});
