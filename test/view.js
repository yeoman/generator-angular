'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:constant', function () {
  beforeEach(function () {
    this.angularView = helpers
      .run(require.resolve('../view'))
      .withArguments('foo/bar');
  });

  describe('default settings', function () {
    beforeEach(function (done) {
      this.angularView.on('end', done);
    });

    it('generates a new view', function () {
      assert.file('app/views/foo/bar.html');
    });
  });

  describe('--appPath', function () {
    beforeEach(function (done) {
      this.angularView
        .withOptions({
          appPath: 'alternative'
        })
        .on('end', done);
    });

    it('generates a new view', function () {
      assert.file('alternative/views/foo/bar.html');
    });
  });
});
