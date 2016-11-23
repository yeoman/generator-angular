'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:factory', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../factory'))
      .withArguments('foo')
      .on('end', done);
  });

  it('generates a new factory', function () {
    assert.file('test/spec/services/foo.js');
    assert.fileContent(
      path.join('app/scripts/services/foo.js'),
      /factory\('foo'/
    );
  });
});
