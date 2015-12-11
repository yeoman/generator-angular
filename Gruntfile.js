'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: {
        options: {
          jshintrc: './.jshintrc'
        },
        src: [
          '**/index.js',
          '*.js',
          '!test/**/*.js',
          '!node_modules/**/*.js'
        ]
      }
    },
    conventionalGithubReleaser: {
      release: {
        options: {
          auth: {
            type: 'oauth',
            token: process.env.GITHUB_AUTHTOKEN
          },
          changelogOpts: {
            preset: 'angular',
            releaseCount: 1
          }
        },
      }
    },
    bump: {
      options: {
        commitMessage: 'chore(release): Release version <%= version %>'
      }
    }
  });

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('npmPublish', 'Publish to npm', function () {
    grunt.util.spawn({
      cmd: 'npm',
      args: ['publish']
    }, grunt.task.current.async());
  });


  // grunt-release will only commit the package.json file by default. Until
  // https://github.com/geddski/grunt-release/pull/43/files lands, it should
  // be patched to do the same so it commits the changelog as well.
  grunt.registerTask('publish', function (type) {
    grunt.task.run([
      'default',
      'bump' + (type ? ':' + type : ''),
      'npmPublish',
      'conventionalGithubReleaser'
    ]);
  });
};
