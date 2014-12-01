// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
  var unitTestFiles = [];
  require('./karma.conf.js')({set: function (karmaConf) {
    unitTestFiles = karmaConf.files.filter(function (value) {
      return value.indexOf('bower_component') !== -1;
    });
  }});
  require('wix-gruntfile')(grunt, {
    staging: 'pizza', //modify to your staging environment
    subdomain: 'www', //modify to your sub-domain
    cdnify: 'vm',
    port: 9000,
    preloadModule: '<%= scriptAppName %>Internal',
    translationsModule: '<%= simplename %>Translations',
    svgFontName: '<%= _.slugify(_.humanize(simplename)) %>',
    unitTestFiles: unitTestFiles,
    protractor: true<% if (bowerComponent) { %>,
    bowerComponent: true<% } %>
  });

  //Follow this URL for instructions on how to override built-in definitions:
  //https://github.com/wix/wix-gruntfile/blob/master/README.md
};
