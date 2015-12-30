'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:directive', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../directive'))
      .withArguments('foo')
      .on('end', done);
  });

  it('generates a new directive', function () {
    assert.file('test/spec/directives/foo.js');
    assert.fileContent(
      path.join('app/scripts/directives/foo.js'),
      /directive\('foo'/
    );
  });
});
