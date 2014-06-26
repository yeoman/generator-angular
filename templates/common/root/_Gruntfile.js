// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // load all grunt config
  require('load-grunt-config')(grunt, {
    data: {
      // Project settings
      yeoman: appConfig
    }
  });
  grunt.loadTasks('grunt/tasks');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
};
