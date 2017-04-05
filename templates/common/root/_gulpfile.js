// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist',
  temp: '.tmp',
  test: 'test'
};

var jsx = '<% if (coffee) { %>coffee<% } else { %>js<% } %>';
var cssx = '<% if (sass) { %>scss<% } else { %>css<% } %>';

var paths = {
  scripts: [yeoman.app + '/scripts/**/*.' + jsx],
  styles: [yeoman.app + '/styles/**/*.' + cssx],
  test: ['test/spec/**/*.' + jsx],
  testRequire: [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-touch/angular-touch.js',
    'bower_components/angular-ui-sortable/sortable.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'test/mock/**/*.' + jsx,
    'test/spec/**/*.' + jsx
  ],
  karma: yeoman.test + '/karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    bowermain: yeoman.temp + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()<% if (coffee) { %>
  .pipe($.coffeelint)
  .pipe($.coffeelint.reporter);<% } else { %>
  .pipe($.jshint/*, '.jshintrc'*/)
  .pipe($.jshint.reporter, 'jshint-stylish');<% } %>

var styles = lazypipe()<% if (sass) { %>
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })<% } %>
  .pipe($.autoprefixer, {browsers: ['last 2 version']})
  .pipe(gulp.dest, yeoman.temp + '/styles');

///////////
// Tasks //
///////////

// get arguments
var argv = {};
process.argv.forEach(function(arg, index, all){
    if (arg[0] == '-' && (index + 1 < all.length)) {
        argv[arg.substr(1)] = all[index+1];
    }
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});<% if (coffee) { %>

gulp.task('coffee', function() {
  return gulp.src(paths.scripts)
    .pipe(lintScripts())
    .pipe($.coffee({bare: true}).on('error', $.util.log))
    .pipe(gulp.dest(yeoman.temp + '/scripts'));
});<% } %>

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf(yeoman.temp, cb);
});

gulp.task('start:client', ['start:server', <% if (coffee) { %>'coffee', <% } else {%> 'lint:scripts', <%} %>'styles'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.temp, yeoman.app],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000,
    middleware: serveStaticBower
  });
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: [yeoman.temp, yeoman.test, yeoman.app],
    livereload: true,
    port: 9001,
    middleware: serveStaticBower
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    <% if (coffee) { %>
    .pipe($.coffee({bare: true}).on('error', $.util.log))
    .pipe(gulp.dest(yeoman.temp + '/scripts'))
    <% } %>
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['bower'],
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});

// gulp serve:prod -port 8080
gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: argv.port || 80,
    middleware: serveStaticBower
  });
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: /*yeoman.app + */'./bower_components',
      ignorePath: '..'
    }))
  // .pipe(gulp.dest(yeoman.app + '/views'));
  .pipe(gulp.dest(yeoman.temp));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf(yeoman.dist, cb);
});

gulp.task('client:build', ['bower', 'html', 'styles'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.bowermain)
    .pipe($.useref({searchPath: [yeoman.app, yeoman.temp]}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function () {
  return gulp.src(yeoman.app + '/views/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src(yeoman.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:favicon', function () {
  return gulp.src(yeoman.app + '/favicon.ico')
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src('./bower_components/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('build', ['clean:dist', 'bower'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'copy:favicon', 'client:build']);
});

gulp.task('wiredep', ['bower']);
gulp.task('default', ['build']);


function serveStaticBower(connect, opt){
  return [['/bower_components', connect.static('./bower_components')]
]}
