'use strict';
var path = require('path');
var util = require('util');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.appPath = this.env.options.appPath;

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee');

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe');
    this.env.options.minsafe = this.options.minsafe;
    args.push('--minsafe');
  }

  // there's a problem with the hooks below running in this constructor,
  // while useful data about what we want to generate is available only later,
  // after we've asked the user. So we make an object here, push the user specified
  // data in there, and make the object available by reference to the hooked subgenerators.
  this.userChoices = {};

  this.hookFor('angular:common', {
    args: args,
    options: {
      options: {
        userChoices: this.userChoices
      }
    }
  });

  this.hookFor('angular:main', {
    args: args,
    options: {
      options: {
        userChoices: this.userChoices
      }
    }
  });

  this.hookFor('angular:controller', {
    args: args,
    options: {
      options: {
        userChoices: this.userChoices
      }
    }
  });

  this.hookFor('karma', {
    as: 'app',
    options: {
      options: {
        coffee: this.options.coffee,
        travis: true,
        'skip-install': this.options['skip-install'],
        typescript: this.options.typescript,
        userChoices: this.userChoices
       }
    }
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });

  // FIXME I'm pretty sure this is never used, so it shouldn't be here. It ends up reading
  // the generator-angular's package.json instead of the one for the generated app anyway
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype._userMadeChoices = function _userMadeChoices(names) {
  this._.extend(
    this.userChoices,
    this._.pick(this, names)
  );
}

Generator.prototype.askForLanguage = function askForLanguage() {
  var cb = this.async();

  this.prompt([{
    type:    'confirm',
    name:    'coffee',
    message: 'Would you like to use CoffeeScript?',
    default: false
  }, {
    type:    'confirm',
    name:    'typescript',
    message: 'Would you like to use TypeScript?',
    default: false
  }], function (props) {
    this.coffee     = props.coffee;
    this.typescript = props.typescript;
    this.jquery = true; // default

    if (this.typescript) {
      this.jquery = true;
      this.typescriptAppName = this._.camelize(this.appname) + "App";
      this.typescriptAppType = this._.classify(this.appname) + "App";
    }

    this._userMadeChoices(['coffee', 'typescript', 'jquery', 'typescriptAppName', 'typescriptAppType']);

    cb();
  }.bind(this));
};

Generator.prototype.askForTypescriptFeatures = function askForTypescriptFeatures() {
  if (!this.typescript) {
    // default values, lest the variables are undefined inside the templates
    this.typescriptConfig        = false;
    this.typescriptPartialsCache = false;
    return;
  }

  var cb = this.async();

  this.prompt([{
    type:    'confirm',
    name:    'typescriptConfig',
    message: 'Would you like app configs? (convenient way to configure backend URLs, etc)',
    default: true
  }, {
    type:    'confirm',
    name:    'typescriptPartialsCache',
    message: 'Would you like partials caching enabled? (bundles all .html partials in one file and seeds the ng cache)',
    default: true
  }], function (props) {
    this.typescriptConfig        = props.typescriptConfig;
    this.typescriptPartialsCache = props.typescriptPartialsCache;

    if (this.typescriptConfig) {
      this.typescriptConfigName = this._.camelize(this.appname) + "Config";
    }

    if (this.typescriptPartialsCache) {
      this.typescriptTemplatesModuleName = this._.camelize(this.appname) + "Templates";
    }

    this._userMadeChoices(['typescriptConfig', 'typescriptConfigName', 'typescriptPartialsCache', 'typescriptTemplatesModuleName']);

    cb();
  }.bind(this));
};

Generator.prototype.askForBootstrap = function askForBootstrap() {
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

    if (this.bootstrap) {
      this.jquery = true;
    }

    cb();
  }.bind(this));
};

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [{
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: true
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: true
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');

    cb();
  }.bind(this));
};

/**
 * This is a rather annoying order of execution dependency, but the index file needs
 * to be initialized before we call appendFiles on it in some of the functions below,
 * yet after all the user choices that may alter the index.html file have been made
 */
Generator.prototype.initializeIndexFile = function initializeIndexFile() {
  this.indexFile = this.engine(this.read('../../templates/common/index.html'),
      this);
}

// Waiting a more flexible solution for #138
Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var sass = this.compassBootstrap;
  var files = [];
  var source = 'styles/' + ( sass ? 'scss/' : 'css/' );

  if (sass) {
    files.push('main.scss');
    this.copy('images/glyphicons-halflings.png', 'app/images/glyphicons-halflings.png');
    this.copy('images/glyphicons-halflings-white.png', 'app/images/glyphicons-halflings-white.png');
  } else {
    if (this.bootstrap) {
      files.push('bootstrap.css');
    }
    files.push('main.css');
  }

  files.forEach(function (file) {
    this.copy(source + file, 'app/styles/' + file);
  }.bind(this));

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'styles/main.css',
    sourceFileList: files.map(function (file) {
      return 'styles/' + file.replace('.scss', '.css');
    }),
    searchPath: ['.tmp', 'app']
  });
};

Generator.prototype.bootstrapJs = function bootstrapJs() {
  if (!this.bootstrap) {
    return;  // Skip if disabled.
  }

  // Wire Twitter Bootstrap plugins
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
    'bower_components/bootstrap-sass/js/bootstrap-affix.js',
    'bower_components/bootstrap-sass/js/bootstrap-alert.js',
    'bower_components/bootstrap-sass/js/bootstrap-dropdown.js',
    'bower_components/bootstrap-sass/js/bootstrap-tooltip.js',
    'bower_components/bootstrap-sass/js/bootstrap-modal.js',
    'bower_components/bootstrap-sass/js/bootstrap-transition.js',
    'bower_components/bootstrap-sass/js/bootstrap-button.js',
    'bower_components/bootstrap-sass/js/bootstrap-popover.js',
    'bower_components/bootstrap-sass/js/bootstrap-typeahead.js',
    'bower_components/bootstrap-sass/js/bootstrap-carousel.js',
    'bower_components/bootstrap-sass/js/bootstrap-scrollspy.js',
    'bower_components/bootstrap-sass/js/bootstrap-collapse.js',
    'bower_components/bootstrap-sass/js/bootstrap-tab.js'
  ]);
};

Generator.prototype.extraModules = function extraModules() {
  var modules = [];
  if (this.resourceModule) {
    modules.push('bower_components/angular-resource/angular-resource.js');
  }

  if (this.cookiesModule) {
    modules.push('bower_components/angular-cookies/angular-cookies.js');
  }

  if (this.sanitizeModule) {
    modules.push('bower_components/angular-sanitize/angular-sanitize.js');
  }

  if (modules.length) {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/modules.js',
        modules);
  }
};

Generator.prototype.appJs = function appJs() {
  if (this.typescript) return;

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', 'app']
  });
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function () {
  this.template('../../templates/common/_bower.json', 'bower.json');
  this.template('../../templates/common/_package.json', 'package.json');
  this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
};
