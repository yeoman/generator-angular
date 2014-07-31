'use strict';
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this.appname.replace(/-statics?$/, '');
  this.simplename = this.appname.replace(/^wix-/, '');
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  this.simplename = this._.camelize(this._.slugify(this._.humanize(this.simplename)));
  this.basename = path.basename(process.cwd());

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });
  this.scriptAppName = this.simplename + angularUtils.appName(this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
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

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe', {
      desc: 'Generate AngularJS minification safe code'
    });
    this.env.options.minsafe = this.options.minsafe;
    args.push('--minsafe');
  }

  this.hookFor('wix-angular:common', {
    args: args,
    options: {}
  });

  this.hookFor('wix-angular:main', {
    args: args,
    options: {}
  });

  this.hookFor('wix-angular:controller', {
    args: args,
    options: {}
  });

  this.hookFor('wix-angular:dashboard-widget', {
    args: [this._.slugify(this._.humanize(this.simplename))+'-widget'],
    options: {}
  });

  this.on('end', function () {
    if (this.options['skip-install']) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
      if (!this.options['skip-install']) {
        this.runInstall('bundle', '--deployment');
      }
    } else {
      this.prompt({
        type: 'confirm',
        name: 'install',
        message: 'Would you like me to run '+chalk.yellow.bold('bower/npm/bundle install?'),
        default: true
      }, function (props) {
        this.installDependencies({ skipInstall: !props.install });
        if (props.install) {
          this.runInstall('bundle', '--deployment');
        }
      }.bind(this));
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForBootstrap = function askForBootstrap() {
  this.bootstrap = false;
  this.compassBootstrap = true;
  /*
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Twitter Bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use the SCSS version of Twitter Bootstrap with the Compass CSS Authoring Framework?',
    default: true,
    when: function (props) {
      return props.bootstrap;
    }
  }], function (props) {
    this.bootstrap = props.bootstrap;
    this.compassBootstrap = props.compassBootstrap;

    cb();
  }.bind(this));
  */
};

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'list',
    name: 'modules',
    default: 'none',
    message: 'Which super powers would you like?',
    choices: [{
      value: 'none',
      name: 'none',
    }, {
      value: 'bowerComponent',
      name: 'bower component',
    }, {
      value: 'dashboardApp',
      name: 'wix-dashboard application',
    }, {
      value: 'dashboardWidget',
      name: 'wix-dashboard widget',
    }]
  }];

  this.prompt(prompts, function (props) {
    this.bowerComponent = (props.modules === 'bowerComponent');
    this.dashboardApp = (props.modules === 'dashboardApp');
    this.dashboardWidget = (props.modules === 'dashboardWidget');

    var angMods = [this.simplename + 'Translations', 'wixAngular'];

    if (this.dashboardApp || this.dashboardWidget) {
      angMods.push('wixDashboardFramework');
    }

    if (this.dashboardApp) {
      this.env.options.dashboardApp = true;
    }

    if (this.dashboardWidget) {
      this.env.options.dashboardWidget = true;
    } else {
      this._hooks.splice(-1);
    }

    if (this.bowerComponent) {
      this.env.options.bowerComponent = true;
    }

    if (angMods.length) {
      this.env.options.angularDeps = "\n  '" + angMods.join("',\n  '") +"'\n";
    }

    cb();
  }.bind(this));
};

Generator.prototype.readIndex = function readIndex() {
  this.indexFile = this.engine(this.read('../../templates/common/index.html').replace(/\$\{/g, '(;$};)'),
      this).replace(/\(;\$\};\)/g, '${');
};

// Waiting a more flexible solution for #138
Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var sass = this.compassBootstrap;
  var files = [];
  var source = 'styles/' + ( sass ? 's' : '' ) + 'css/';

  if (this.bootstrap && !sass) {
    files.push('bootstrap.css');
    this.copy('fonts/glyphicons-halflings-regular.eot', 'app/fonts/glyphicons-halflings-regular.eot');
    this.copy('fonts/glyphicons-halflings-regular.ttf', 'app/fonts/glyphicons-halflings-regular.ttf');
    this.copy('fonts/glyphicons-halflings-regular.svg', 'app/fonts/glyphicons-halflings-regular.svg');
    this.copy('fonts/glyphicons-halflings-regular.woff', 'app/fonts/glyphicons-halflings-regular.woff');
  }

  if (this.dashboardApp || !this.dashboardWidget) {
    files.push('main.' + (sass ? 's' : '') + 'css');
  }

  files.forEach(function (file) {
    this.copy(source + file, 'app/styles/' + file);
  }.bind(this));
  /*
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'styles/main.css',
    sourceFileList: files.map(function (file) {
      return 'styles/' + file.replace('.scss', '.css');
    }),
    searchPath: ['.tmp', 'app']
  });
  */
};

Generator.prototype.bootstrapJS = function bootstrapJS() {
  if (!this.bootstrap) {
    return;  // Skip if disabled.
  }

  // Wire Twitter Bootstrap plugins
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
    'bower_components/sass-bootstrap/js/affix.js',
    'bower_components/sass-bootstrap/js/alert.js',
    'bower_components/sass-bootstrap/js/button.js',
    'bower_components/sass-bootstrap/js/carousel.js',
    'bower_components/sass-bootstrap/js/transition.js',
    'bower_components/sass-bootstrap/js/collapse.js',
    'bower_components/sass-bootstrap/js/dropdown.js',
    'bower_components/sass-bootstrap/js/modal.js',
    'bower_components/sass-bootstrap/js/scrollspy.js',
    'bower_components/sass-bootstrap/js/tab.js',
    'bower_components/sass-bootstrap/js/tooltip.js',
    'bower_components/sass-bootstrap/js/popover.js'
  ]);
};

/*Generator.prototype.extraModules = function extraModules() {
  var modules = ['bower_components/angular-translate/angular-translate.js'];
  if (this.resourceModule) {
    modules.push('bower_components/angular-resource/angular-resource.js');
  }

  if (this.cookiesModule) {
    modules.push('bower_components/angular-cookies/angular-cookies.js');
  }

  if (this.sanitizeModule) {
    modules.push('bower_components/angular-sanitize/angular-sanitize.js');
  }

  if (this.routeModule) {
    modules.push('bower_components/angular-route/angular-route.js');
  }

  if (modules.length) {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/modules.js',
        modules);
  }
};

Generator.prototype.appJs = function appJs() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', 'app']
  });
};*/

Generator.prototype.createIndexHtml = function createIndexHtml() {
  if (this.dashboardApp || !this.dashboardWidget) {
    this.write(path.join(this.appPath, 'index.vm'), this.indexFile);
  }
};

Generator.prototype.packageFiles = function () {
  var pom = this.read('../../templates/common/pom.xml', 'utf8').replace(/\$\{/g, '(;$};)');
  this.write('pom.xml', this.engine(pom, this).replace(/\(;\$\};\)/g, '${'));

  var replace = this.read('../../templates/common/replace.conf.js', 'utf8').replace(/\$\{/g, '(;$};)');
  this.write('replace.conf.js', this.engine(replace, this).replace(/\(;\$\};\)/g, '${'));

  replace = this.read('../../templates/common/replace.private.conf.js', 'utf8').replace(/\$\{/g, '(;$};)');
  this.write('replace.private.conf.js', this.engine(replace, this).replace(/\(;\$\};\)/g, '${'));

  if (this.dashboardApp || !this.dashboardWidget) {
    this.classedName = 'Main';
    this.cameledName = 'main';
    this.template('../../templates/common/main.haml', 'app/views/main.haml');
  }

  this.template('../../templates/common/gitignore', '.gitignore');
  this.template('../../templates/common/_bower.json', 'bower.json');
  this.template('../../templates/common/_package.json', 'package.json');
  this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
  this.template('../../templates/common/karma.conf.js', 'karma.conf.js');
  this.template('../../templates/common/scenarios.js', 'test/e2e/spec/main-page.spec.js');
  this.copy('../../templates/common/project.sublime-project', this._.slugify(this._.humanize(this.simplename))+'.sublime-project');
  this.template('../../templates/javascript/mock/server-api.js', 'test/mock/server-api.js');
};

Generator.prototype.imageFiles = function () {
  this.sourceRoot(path.join(__dirname, 'templates'));
  this.directory('images', 'app/images', true);
};
