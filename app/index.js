'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String
  });
  this.env.options['app-suffix'] = this.options['app-suffix'];
  this.scriptAppName = this.appname + angularUtils.appName(this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    this.option('appPath', {
      desc: 'Allow to choose where to write the files'
    });

    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }
    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }

  this.appPath = this.env.options.appPath;

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee', {
      desc: 'Generate CoffeeScript instead of JavaScript'
    });

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  if (typeof this.env.options.typescript === 'undefined') {
    this.option('typescript', {
      desc: 'Generate TypeScript instead of JavaScript'
    });

    // attempt to detect if user is using TS or not
    // if cml arg provided, use that; else look for the existence of ts
    if (!this.options.typescript &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.ts'), {}).length > 0) {
      this.options.typescript = true;
    }

    this.env.options.typescript = this.options.typescript;
  }

  this.hookFor('oas:common', {
    args: args
  });

  this.hookFor('oas:main', {
    args: args
  });

  this.hookFor('oas:controller', {
    args: args
  });

  this.on('end', function () {
    var jsExt = this.options.coffee ? 'coffee' : 'js';

    var bowerComments = [
      'bower:js',
      'endbower'
    ];
    if (this.options.coffee) {
      bowerComments.push('bower:coffee');
      bowerComments.push('endbower');
    }

    this.invoke('karma:app', {
      options: {
        'skip-install': this.options['skip-install'],
        'base-path': '../',
        'coffee': this.options.coffee,
        'travis': true,
        'files-comments': bowerComments.join(','),
        'app-files': 'app/scripts/**/*.' + jsExt,
        'test-files': [
          'test/mock/**/*.' + jsExt,
          'test/spec/**/*.' + jsExt
        ].join(','),
        'bower-components-path': 'bower_components'
      }
    });

    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message'],
      callback: this._injectDependencies.bind(this)
    });

    if (this.env.options.ngRoute) {
      this.invoke('oas:route', {
        args: ['about']
      });
    }
  });

  this.pkg = require('../package.json');
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  if (!this.options['skip-welcome-message']) {
    var oas =
    "\n    ╔══════════════════════════════════════════════════════════╗" +"\n" +
    "    ║                                                          ║" +"\n" +
    "    ║             ██████╗      █████╗     ███████╗             ║" +"\n" +
    "    ║            ██╔═══██╗    ██╔══██╗    ██╔════╝             ║" +"\n" +
    "    ║            ██║   ██║    ███████║    ███████╗             ║" +"\n" +
    "    ║            ██║   ██║    ██╔══██║    ╚════██║             ║" +"\n" +
    "    ║            ╚██████╔╝    ██║  ██║    ███████║             ║" +"\n" +
    "    ║             ╚═════╝     ╚═╝  ╚═╝    ╚══════╝             ║" +"\n" +
    "    ║              𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 𝕥𝕙𝕖 𝕘𝕖𝕟𝕖𝕣𝕒𝕥𝕠𝕣-𝕠𝕒𝕤                ║"+"\n" +
    "    ║                                                          ║"+"\n" +
    "    ╚══════════════════════════════════════════════════════════╝"+"\n" ;
    this.log(oas);
  }

  if (this.options.minsafe) {
    this.log.error(
      'The --minsafe flag has been removed. For more information, see' +
      '\nhttps://github.com/yeoman/generator-angular#minification-safe.' +
      '\n'
    );
  }
};

Generator.prototype.askForGulp = function askForGulp() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'gulp',
    message: 'Would you like to use Gulp (experimental) instead of Grunt?',
    default: false
  }], function (props) {
    this.gulp = props.gulp;

    cb();
  }.bind(this));
};

Generator.prototype.askForStyles = function askForStyles() {
  var gulp = this.gulp;
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'sass',
    message: 'Would you like to use Sass?',
    default: false,
    when: function () {
      return gulp;
    }
  }, {
    type: 'confirm',
    name: 'compass',
    message: 'Would you like to use Sass (with Compass)?',
    default: false,
    when: function () {
      return !gulp;
    }
  }], function (props) {
    this.sass = props.sass;
    this.compass = props.compass;

    cb();
  }.bind(this));
};

Generator.prototype.askForBootstrap = function askForBootstrap() {
  var compass = this.compass;
  var gulp = this.gulp;
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use the Sass version of Bootstrap?',
    default: true,
    when: function (props) {
      return !gulp && (props.bootstrap && compass);
    }
  }], function (props) {
    this.bootstrap = props.bootstrap;
    this.compassBootstrap = props.compassBootstrap;

    cb();
  }.bind(this));
};

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [
    {
      value: 'animateModule',
      name: 'angular-animate.js',
      checked: true
    }, {
      value: 'ariaModule',
      name: 'angular-aria.js',
      checked: false
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: true
    }, {
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: true
    }, {
      value: 'messagesModule',
      name: 'angular-messages.js',
      checked: false
    }, {
      value: 'routeModule',
      name: 'angular-route.js',
      checked: true
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: true
    }, {
      value: 'touchModule',
      name: 'angular-touch.js',
      checked: true
    }, {
      value: 'afOAuth2',
      name: 'angularjs-oauth.js',
      checked: true
    }, {
      value: 'treeControl',
      name: 'angular-tree-control.js',
      checked: true
    }
    ]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.animateModule = hasMod('animateModule');
    this.ariaModule = hasMod('ariaModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.messagesModule = hasMod('messagesModule');
    this.resourceModule = hasMod('resourceModule');
    this.routeModule = hasMod('routeModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.touchModule = hasMod('touchModule');
    this.afOAuth2 = hasMod('afOAuth2');
    this.treeControl = hasMod('treeControl');

    var angMods = [];


    if (this.animateModule) {
      angMods.push("'ngAnimate'");
    }

    if (this.ariaModule) {
      angMods.push("'ngAria'");
    }

    if (this.cookiesModule) {
      angMods.push("'ngCookies'");
    }

    if (this.messagesModule) {
      angMods.push("'ngMessages'");
    }

    if (this.resourceModule) {
      angMods.push("'ngResource'");
    }

    if (this.routeModule) {
      angMods.push("'ngRoute'");
      this.env.options.ngRoute = true;
    }

    if (this.sanitizeModule) {
      angMods.push("'ngSanitize'");
    }

    if (this.touchModule) {
      angMods.push("'ngTouch'");
    }

    if (this.afOAuth2) {
      angMods.push("'afOAuth2'");
    }

    if (this.treeControl) {
      angMods.push("'treeControl'");
    }

    angMods.push("'ngMaterial'");
  //  angMods.push("'material.svgAssetsCache'");
    angMods.push("'ui.grid'");
    angMods.push("'ui.grid.edit'");
    angMods.push("'ui.grid.rowEdit'");
    angMods.push("'ui.grid.cellNav'");
    angMods.push("'ui.grid.treeView'");
    angMods.push("'ui.grid.selection'");
    angMods.push("'ui.grid.exporter'")



    if (angMods.length) {
      this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
    }

    cb();
  }.bind(this));
};

Generator.prototype.readIndex = function readIndex() {
  this.ngRoute = this.env.options.ngRoute;
  this.indexFile = this.engine(this.read('app/index.html'), this);
};

Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var sass = this.compass || this.sass;
  var cssFile1 = 'styles/oas-style.css';
   this.copy(
    path.join('app', cssFile1),
    path.join(this.appPath, cssFile1)
  );
   var cssFile2 = 'styles/table-demo.css';
   this.copy(
    path.join('app', cssFile2),
    path.join(this.appPath, cssFile2)
  );
  var cssFile3 = 'styles/sb-admin-2.css';
  this.copy(
   path.join('app', cssFile3),
   path.join(this.appPath, cssFile3)
 );
 var cssFile4 = 'styles/timeline.css';
 this.copy(
  path.join('app', cssFile4),
  path.join(this.appPath, cssFile4)
);
var htmlFile1 = 'views/menu.html';
this.copy(
 path.join('app', htmlFile1),
 path.join(this.appPath, htmlFile1)
);
var htmlFile2 = 'views/main.html';
this.copy(
 path.join('app', htmlFile2),
 path.join(this.appPath, htmlFile2)
);
var jsFile1 = 'scripts/menu.js';
this.copy(
 path.join('app', jsFile1),
 path.join(this.appPath, jsFile1)
);
var jsFont1 = 'fonts/roboto-light-webfont.eot';
this.copy(
 path.join('app', jsFont1),
 path.join(this.appPath, jsFont1)
);
var jsFont2 = 'fonts/roboto-light-webfont.woff2';
this.copy(
 path.join('app', jsFont2),
 path.join(this.appPath, jsFont2)
);
var jsFont3 = 'fonts/roboto-light-webfont.woff';
this.copy(
 path.join('app', jsFont3),
 path.join(this.appPath, jsFont3)
);

};

Generator.prototype.appJs = function appJs() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', this.appPath]
  });
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles() {
  this.coffee = this.env.options.coffee;
  this.typescript = this.env.options.typescript;
  this.template('root/_bower.json', 'bower.json');
  this.template('root/_bowerrc', '.bowerrc');
  this.template('root/_package.json', 'package.json');
  if (this.gulp) {
    this.template('root/_gulpfile.js', 'gulpfile.js');
  } else {
    this.template('root/_Gruntfile.js', 'Gruntfile.js');
  }
  if (this.typescript) {
    this.template('root/_tsd.json', 'tsd.json');
  }
  this.template('root/README.md', 'README.md');
};

Generator.prototype._injectDependencies = function _injectDependencies() {
  var taskRunner = this.gulp ? 'gulp' : 'grunt';
  if (this.options['skip-install']) {
    this.log(
      'After running `npm install & bower install`, inject your front end dependencies' +
      '\ninto your source code by running:' +
      '\n' +
      '\n' + chalk.yellow.bold(taskRunner + ' wiredep')
    );
  } else {
    this.spawnCommand(taskRunner, ['wiredep']);
  }
};
