// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var url = require('url');
var proxyMiddleware = require('proxy-middleware');
var proxyFolder = function(src, dest) {
  var proxyOptions = url.parse(dest);
  proxyOptions.route = src;
  return proxyMiddleware(proxyOptions);
};
var mountFolder = function (connect, dir, maxage) {
  return connect.static(require('path').resolve(dir), { maxAge: maxage||0 });
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, 'grunt-!(cli)');
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    api: 'http://www.pizza.wixpress.com/_api/',
    local: 'http://localhost:<%%= connect.options.port %>'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      haml: {
        files: ['<%%= yeoman.app %>/{,views/}*.haml'],
        tasks: ['haml']
      },
      replace: {
        files: ['<%%= yeoman.app %>/index.vm'],
        tasks: ['replace:server']
      },
      test: {
        files: [
          '<%%= yeoman.app %>/scripts/{,*/}*.js',
          'test/**/*.js'
        ],
        tasks: ['jshint', 'karma:unit:run']
      },
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist', 'jshint', 'karma:unit:run']
      },
      coffeeTest: {
        files: ['test/**/*.coffee'],
        tasks: ['coffee:test', 'jshint', 'karma:unit:run']
      },
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to 'localhost' to block access to the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app),
              proxyFolder('/_api/', yeomanConfig.api)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test', 86400000),
              mountFolder(connect, yeomanConfig.dist, 86400000),
              proxyFolder('/_api/', yeomanConfig.api)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: yeomanConfig.local
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        force: true
      },
      scripts: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            'Gruntfile.js',
            '<%%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        files: {
          src: ['test/{spec,mock}/{,*/}*.js']
        }
      }
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        bundleExec: true,
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '../images',
        httpGeneratedImagesPath: '../images/generated',
        httpFontsPath: 'fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.{html,vm}',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.{html,vm}'],
      options: {
        dirs: ['<%%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      },
      generated: {
        files: [{
          expand: true,
          cwd: '.tmp/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: ['*.vm', '*.html', 'views/*.html'],
          dest: '<%%= yeoman.dist %>'
        },{
          expand: true,
          cwd: '.tmp',
          src: ['*.vm', '*.html', 'views/*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            'scripts/locale/*.js',
            '*.{ico,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'haml',
        'coffee',
        'compass:dist',
        'replace:server',
        'copy:styles'
      ],
      dist: [
        'imagemin',
        'svgmin',
        'htmlmin',
        'copy:dist'
      ]
    },
    karma: {
      teamcity: {
        configFile: 'karma.conf.js',
        reporters: ['teamcity']
      },
      single: {
        configFile: 'karma.conf.js'
      },
      e2e: {
        proxies: {'/': 'http://localhost:<%%= connect.options.port %>/'},
        configFile: 'karma-e2e.conf.js',
        browsers: ['Chrome']
      },
      e2eTeamcity: {
        proxies: {'/': 'http://localhost:<%%= connect.options.port %>/'},
        configFile: 'karma-e2e.conf.js',
        transports: ['xhr-polling'],
        reporters: ['dots', 'teamcity']
      },
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: false,
        background: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html', '<%%= yeoman.dist %>/*.vm']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      locale: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: 'locale/*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    replace: {
      server: {
        src: ['<%%= yeoman.app %>/index.vm'],
        dest: '.tmp/index.html',
        replacements: require('./replace.conf').server
      },
      dist: {
        src: ['<%%= yeoman.dist %>/index.vm'],
        dest: '.tmp/index.html',
        replacements: require('./replace.conf').server
      }
    },
    haml: {
      dist: {
        options: {
          bundleExec: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '{,views/}*.haml',
          dest: '.tmp',
          ext: '.html'
        }]
      }
    }
  });

  grunt.registerTask('pre-build', [
    'clean:server',
    'jshint',
    'concurrent:server',
    'autoprefixer'
  ]);

  grunt.registerTask('package', [
    'useminPrepare',
    'concat',
    'cssmin',
    'ngmin',
    'uglify',
    'concurrent:dist',
    'cdnify',
    'usemin',
    'replace:dist'
  ]);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'karma:unit',
      'pre-build',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (target) {
    if (target === 'ci') {
      return grunt.task.run(['connect:dist', 'karma:e2eTeamcity']);
    }
    grunt.task.run(['pre-build', 'karma:single']);
  });

  grunt.registerTask('build', function (target) {
    if (target === 'ci') {
      var jshint = grunt.config('jshint');
      jshint.options.force = false;
      grunt.config('jshint', jshint);

      return grunt.task.run([
        'clean:dist',
        'pre-build',
        'karma:teamcity',
        'package'
      ]);
    }
    grunt.task.run([
      'clean:dist',
      'test',
      'package',
      'connect:dist',
      'karma:e2e'
    ]);
  });

  grunt.registerTask('default', ['build']);
};
