// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    //frameworks: ['ng-scenario'], //comment out since it uses angular-scenario 1.1.5 which has memory leaks in IE10

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular-scenario/angular-scenario.js', //remove once framework is back
      'node_modules/karma-ng-scenario/lib/adapter.js', //remove once framework is back
      'app/bower_components/es5-shim/es5-shim.js',
      '{,.tmp/}test/spec/e2e/**/*.js'
    ],

    urlRoot: '/__e2e/',
    
    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9999,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: (process.env.SAUCE_BROWSERS ? 
      process.env.SAUCE_BROWSERS.split(' ').map(function(value){ return 'SauceLabs'+value; }) : 
      ['SauceLabsChrome', 'SauceLabsFF', 'SauceLabsSafari6', 'SauceLabsIE11']
    ),

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    sauceLabs: {
      testName: 'e2e tests',
      startConnect: false,
      tunnelIdentifier: process.env.BUILD_NUMBER
    },
    customLaunchers: {
      SauceLabsChrome: {
        base: 'SauceLabs',
        browserName: 'Chrome',
        platform: 'Windows 7'
      },
      SauceLabsFF: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 7'
      },
      SauceLabsIE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11',
        platform: 'Windows 8.1'
      },
      SauceLabsIE10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '10',
        platform: 'Windows 8'
      },
      SauceLabsIE9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '9',
        platform: 'Windows 7'
      },
      SauceLabsIE8: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '8',
        platform: 'Windows 7'
      },
      SauceLabsSafari6: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '6',
        platform: 'OS X 10.8'
      },
      SauceLabsSafari5: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '5',
        platform: 'OS X 10.6'
      }
    }
  });
};
