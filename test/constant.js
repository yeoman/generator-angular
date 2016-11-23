'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:constant', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../constant'))
      .withArguments('foo')
      .on('end', done);
  });

  it('generates a new constant', function () {
    assert.file('test/spec/services/foo.js');
    assert.fileContent(
      path.join('app/scripts/services/foo.js'),
      /constant\('foo'/
    );
  });
});
