/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');


describe('Angular generator route mechanism', function () {

  var folderName = 'routeTests';
  var angular;

  beforeEach(function (done) {
    var deps = [
      '../../app',
      '../../common',
      '../../controller',
      '../../route',
      '../../view',
      '../../main', [
        helpers.createDummyGenerator(),
        'karma:app'
      ]
    ];
    helpers.testDirectory(path.join(__dirname, folderName), function (err) {
      if (err) {
        done(err);
      }
      angular = helpers.createGenerator('angular:app', deps);
      angular.options['skip-install'] = true;

      helpers.mockPrompt(angular, {
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: ['routeModule']
      });

      angular.run({}, function(){
        done();
      });
    });
  });


  it('should generate routes, controllers and views', function(done){
    var route = 'simpleroute';
    var expected = [
      'app/scripts/controllers/' + route + '.js',
      'test/spec/controllers/' + route + '.js',
      'app/views/' + route + '.html'
    ];
    var deps = [
      '../../app',
      '../../common',
      '../../controller',
      '../../route',
      '../../view'
    ];

    var angularRouteGenerator = helpers.createGenerator('angular:route', deps, [route]);

    angularRouteGenerator.run({}, function(){

      // Check if new files are created for the route
      helpers.assertFiles(expected);

      var app_js = fs.readFileSync('app/scripts/app.js', 'utf8');
      var route_regex = new RegExp('when\\(\'/' + route + '\'');

      assert.ok(route_regex.test(app_js), 'app.js does not have the route ' + route + ' added');

      done();
    });
  });


  // Test with URI specified explicitly
  it('should generate routes, controllers and views with the route uri given', function(done){
    var route = 'complexroute';
    var uri = 'segment1/segment2/:parameter'
    var expected = [
      'app/scripts/controllers/' + route + '.js',
      'test/spec/controllers/' + route + '.js',
      'app/views/' + route + '.html'
    ];
    var deps = [
      '../../app',
      '../../common',
      '../../controller',
      '../../route',
      '../../view'
    ];

    var angularRouteGenerator = helpers.createGenerator('angular:route', deps, [route], { uri: uri });

    angularRouteGenerator.run({}, function(){

      // Check if new files are created for the route
      helpers.assertFiles(expected);

      var app_js = fs.readFileSync('app/scripts/app.js', 'utf8');
      var route_regex = new RegExp('when\\(\'/' + uri + '\'');

      assert.ok(route_regex.test(app_js), 'app.js does not have the route ' + uri + ' added');

      done();
    });
  });
});
