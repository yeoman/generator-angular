'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:component', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../component'))
      .withArguments('foo')
      .on('end', done);
  });

  it('generates a new component', function () {
    assert.file('test/spec/components/foo.js');
    assert.fileContent(
      path.join('app/scripts/components/foo.js'),
      /component\('foo'/
    );
  });
});
