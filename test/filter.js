'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:filter', function () {
  beforeEach(function (done) {
    helpers
      .run(require.resolve('../filter'))
      .withArguments('foo')
      .inTmpDir(function (dir) {
        fs.writeFileSync(
          path.join(dir, 'bower.json'),
          '{"appPath": "app"}'
        );
      })
      .on('end', done);
  });

  it('generates a new filter', function () {
    assert.file('test/spec/filters/foo.js');
    assert.fileContent(
      path.join('app/scripts/filters/foo.js'),
      /filter\('foo'/
    );
  });
});
