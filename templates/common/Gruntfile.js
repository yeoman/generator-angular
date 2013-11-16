// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt, 'grunt-!(cli)');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var url = require('url');

  var proxyMiddleware = require('proxy-middleware');

  var proxyFolder = function(src, dest) {
    var proxyOptions = url.parse(grunt.template.process(dest));
    proxyOptions.route = src;
    return proxyMiddleware(proxyOptions);
  };

  var mountFolder = function (connect, dir, maxage) {
    return connect.static(require('path').resolve(grunt.template.process(dir)), { maxAge: maxage||0 });
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      api: 'http://www.pizza.wixpress.com/_api/',
      local: 'http://localhost:<%%= connect.options.port %>'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        livereload: '<%%= connect.options.livereload %>',
        nospawn: true
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
        tasks: ['newer:coffee:dist', 'jshint', 'karma:unit:run']
      },
      coffeeTest: {
        files: ['test/**/*.coffee'],
        tasks: ['newer:coffee:test', 'jshint', 'karma:unit:run']
      },
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to 'localhost' to block access to the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: '<%%= yeoman.local %>',
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, '<%%= yeoman.app %>'),
              proxyFolder('/_api/', '<%%= yeoman.api %>')
            ];
          }
        }
      },
      dist: {
        options: {
          open: '<%= yeoman.local %>',
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test', 86400000),
              mountFolder(connect, '<%%= yeoman.dist %>', 86400000),
              proxyFolder('/_api/', '<%%= yeoman.api %>')
            ];
          }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        force: true,
        reporter: require('jshint-stylish')
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

    // Empties folders to start fresh
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

    // Add vendor prefixed styles
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

    // Compiles CoffeeScript to JavaScript
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

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        bundleExec: true,
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/fonts',
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

    // Renames files for browser caching purposes
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

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.{html,vm}',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepage configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.{html,vm}'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      },
      generated: {
        files: [{
          expand: true,
          cwd: '.tmp/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
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
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
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

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html', '<%%= yeoman.dist %>/*.vm']
      }
    },

    // Copies remaining files to places other tasks can use
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
            'images/{,*/}*.{webp}',
            'fonts/*'
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

    // Run some tasks in parallel to speed up the build process
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

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      locale: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>/scripts',
          src: 'locale/*.js',
          dest: '<%%= yeoman.dist %>/scripts'
        }]
      }
    },
    // concat: {
    //   dist: {}
    // },

    // Test settings
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

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['connect:dist:keepalive']);
    }

    grunt.task.run([
      'karma:unit',
      'pre-build',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? 'serve:'+target : 'serve']);
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

      grunt.task.run([
        'clean:dist',
        'pre-build',
        'karma:teamcity',
        'package'
      ]);
    } else {
      grunt.task.run([
        'clean:dist',
        'test',
        'package',
        'connect:dist',
        'karma:e2e'
      ]);
    }
  });

  grunt.registerTask('default', ['build']);

};
