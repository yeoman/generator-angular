'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:controller', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../controller'))
      .withArguments('foo')
      .on('end', done);
  });

  it('generates a new controller', function () {
    assert.file('test/spec/controllers/foo.js');
    assert.fileContent(
      path.join('app/scripts/controllers/foo.js'),
      /controller\('FooCtrl'/
    );
  });
});
