'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

//angularfire
var angularUtils = require('../util.js');
var afconfig = require('../angularfire/config.json');
var colors = require('../angularfire/colors.js');
var FIREBASE_PROMPTS = [
  {
    name: 'firebaseName',
    message: colors('Firebase instance ' +
      '(https://%yellow<your instance>%/yellow.firebaseio.com)'),
    required: true,
    validate: function (input) {
      if( !input ) { return false; }
      if( input.match('http') || input.match('firebaseio.com') ) {
        return chalk.red('Just include the Firebase name, not the entire URL');
      }
      if (!input.match(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)) {
        return chalk.red('Your Firebase name may only contain [a-z], [0-9], and hyphen (-). ' +
          'It may not start or end with a hyphen.');
      }
      return true;
    }
  }, {
    name: 'loginModule',
    message: 'Use FirebaseSimpleLogin?',
    type: 'confirm'
  }, {
    type: 'checkbox',
    name: 'providers',
    message: 'Which providers shall I install?',
    choices: afconfig.simpleLoginProviders,
    when: function(answers) {
      return answers.loginModule;
    },
    validate: function(picks) {
      return picks.length > 0? true : 'Must pick at least one provider';
    },
    default: ['password']
  }
];

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  //angularfire
  this.afconfig = afconfig;
  this.angularFireSourceFiles = [];

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
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

  this.hookFor('angularfire:common', {
    args: args
  });

  this.hookFor('angularfire:main', {
    args: args
  });

  this.hookFor('angularfire:controller', {
    args: args
  });

  this.on('end', function () {
    var enabledComponents = [];

    if (this.animateModule) {
      enabledComponents.push('angular-animate/angular-animate.js');
    }

    if (this.ariaModule) {
      enabledComponents.push('angular-aria/angular-aria.js');
    }

    if (this.cookiesModule) {
      enabledComponents.push('angular-cookies/angular-cookies.js');
    }

    if (this.messagesModule) {
      enabledComponents.push('angular-messages/angular-messages.js');
    }

    if (this.resourceModule) {
      enabledComponents.push('angular-resource/angular-resource.js');
    }

    if (this.routeModule) {
      enabledComponents.push('angular-route/angular-route.js');
    }

    if (this.sanitizeModule) {
      enabledComponents.push('angular-sanitize/angular-sanitize.js');
    }

    if (this.touchModule) {
      enabledComponents.push('angular-touch/angular-touch.js');
    }

    //angularfire
    if (this.loginModule) {
      enabledComponents.push('firebase-simple-login/firebase-simple-login.js');
    }

    enabledComponents = [
      'angular/angular.js',
      'angular-mocks/angular-mocks.js',
      //angularfire
      'firebase/firebase.js',
      'angularfire/dist/angularfire.js'
    ].concat(enabledComponents).join(',');

    var jsExt = this.options.coffee ? 'coffee' : 'js';

    var appFiles = ['app/scripts/**/*.' + jsExt ];
    if( this.options.coffee ) {
      //todo add these into coffeescript so we don't need this extra step
      appFiles.push('app/scripts/angularFire/*.js');
      appFiles.push('app/scripts/directives/ngHideAuth.js');
      appFiles.push('app/scripts/directives/ngShowAuth.js');
    }

    this.invoke('karma:app', {
      options: {
        'skip-install': this.options['skip-install'],
        'base-path': '../',
        'coffee': this.options.coffee,
        'travis': true,
        'bower-components': enabledComponents,
//        'app-files': 'app/scripts/**/*.' + jsExt,
        'app-files': appFiles.join(','), //angularfire
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
      this.invoke('angularfire:route', {
        //angularfire
        args: ['chat', true]
      });
    }

    //angularfire
    if(this.env.options.loginModule) {
      if( this.env.options.ngRoute ) {
        this.invoke('angularfire:route', {
          args: ['login', true]
        });
      }
      else {
        this.invoke('angularfire:controller', {
          args: ['login', true]
        });
        this.invoke('angularfire.view', {
          args: ['login', true]
        });
      }
    }
  });

  this.pkg = require('../package.json');
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
    this.log(
      chalk.magenta(
        'Out of the box I include Bootstrap and some AngularJS recommended modules, AngularFire, and Firebase Simple Login.' +
        '\n'
      )
    );
  }

  if (this.options.minsafe) {
    this.log.error(
      'The --minsafe flag has been removed. For more information, see' +
      '\nhttps://github.com/yeoman/generator-angular#minification-safe.' +
      '\n'
    );
  }
};

//angularfire
Generator.prototype.askFirebaseQuestions = function askForCompass() {
  this.firebaseName = null;
  this.loginModule = false;
  this.simpleLoginProviders = [];
  this.hasOauthProviders = false;
  this.hasPasswordProvider = false;

  // allow firebase instance to be set on command line
  this._defaultNamespace(this.options['instance'], FIREBASE_PROMPTS);

  var cb = this.async();
  this.prompt(FIREBASE_PROMPTS, function (props) {
    FIREBASE_PROMPTS.forEach(function(prompt) {
      if( prompt.name === 'providers' && props.loginModule ) {
        this._processProviders(props[prompt.name]);
      }
      else {
        this[prompt.name] = props[prompt.name];
      }
    }, this);
    cb();
  }.bind(this));
};

Generator.prototype.askForCompass = function askForCompass() {
  var cb = this.async();
  this.prompt([{
    type: 'confirm',
    name: 'compass',
    message: 'Would you like to use Sass (with Compass)?',
    default: true
  }], function (props) {
    this.compass = props.compass;

    cb();
  }.bind(this));
};

Generator.prototype.askForBootstrap = function askForBootstrap() {
  var compass = this.compass;
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
      return props.bootstrap && compass;
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

    //angularfire
    angMods.push("'firebase'");
    angMods.push("'firebase.utils'");
    if( this.loginModule ) {
      this.env.options.simpleLogin = true;
      angMods.push("'simpleLogin'");
    }

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
  var cssFile = 'styles/main.' + (this.compass ? 's' : '') + 'css';
  this.copy(
    path.join('app', cssFile),
    path.join(this.appPath, cssFile)
  );
};

//todo make this its own subgenerator separate from Angular.js gen
//angularfire
Generator.prototype.copyAngularFireFiles = function() {
  this._common('scripts/angularfire/config.js');
  this._common('scripts/angularfire/firebase.utils.js');
  this._tpl('controllers/chat');
  this._htmlTpl('views/chat.html');
  this._tpl('filters/reverse');

  if( this.loginModule ) {
    this._common('scripts/angularfire/simpleLogin.js');
    this._tpl('controllers/login');
    this._tpl('controllers/account');
    this._htmlTpl('views/login.html');
    this._htmlTpl('views/account.html');
    this._common('scripts/directives/ngShowAuth.js');
    this._common('scripts/directives/ngHideAuth.js');
  }

  if( this.routeModule ) {
    var withOrWithout = this.loginModule? 'with' : 'without';
    this._tpl('routes.' + withOrWithout + '.login', 'routes');
  }
};

Generator.prototype.appJs = function appJs() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js']
      //angularfire
      .concat(this.angularFireSourceFiles),
    searchPath: ['.tmp', this.appPath]
  });
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles() {
  this.coffee = this.env.options.coffee;
  this.template('root/_bower.json', 'bower.json');
  this.template('root/_bowerrc', '.bowerrc');
  this.template('root/_package.json', 'package.json');
  this.template('root/_Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype._injectDependencies = function _injectDependencies() {
  if (this.options['skip-install']) {
    this.log(
      'After running `npm install & bower install`, inject your front end dependencies' +
      '\ninto your source code by running:' +
      '\n' +
      '\n' + chalk.yellow.bold('grunt wiredep')
    );
  } else {
    wiredep({
      directory: 'bower_components',
      bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
      ignorePath: new RegExp('^(' + this.appPath + '|..)/'),
      src: 'app/index.html',
      fileTypes: {
        html: {
          replace: {
            css: '<link rel="stylesheet" href="{{filePath}}">'
          }
        }
      }
    });
  }
};

//angularfire
Generator.prototype._common = function(dest) {
  this.angularFireSourceFiles.push(dest);
  var appPath = this.options.appPath;
  this.template(path.join('app', dest), path.join(appPath, dest));
};

//angularfire
Generator.prototype._htmlTpl = function(dest) {
  var join = path.join;
  var appPath = this.options.appPath;
  this.template(join('app', dest), join(appPath, dest));
};

//angularfire
Generator.prototype._tpl = function(src, dest) {
  if( !dest ) { dest = src; }
  var suff = this.options.coffee? '.coffee' : '.js';
  var destFileName = path.join('scripts', dest+suff);
  this.angularFireSourceFiles.push(path.join('scripts', dest+'.js'));
  this.template(
    // haaaaaack
    path.join('..', this.options.coffee? 'coffeescript' : 'javascript', src+suff),
    path.join(this.appPath, destFileName)
  );
};

//angularfire
Generator.prototype._processProviders = function(list) {
  var providerMap = {}, i = afconfig.simpleLoginProviders.length, p;
  while(i--) {
    p = afconfig.simpleLoginProviders[i];
    providerMap[p.value] = {name: p.name, value: p.value};
  }
  list.forEach(function(p) {
    if( p === 'password' ) { this.hasPasswordProvider = true; }
    else { this.hasOauthProviders = true; }
    this.simpleLoginProviders.push(providerMap[p]);
  }, this);
};

//angularfire
Generator.prototype._defaultNamespace = function(envValue, prompts) {
  if( envValue ) {
    prompts.forEach(function(p) {
      if(p.name === 'firebaseName' ) {
        p.default = envValue;
        return false;
      }
      return true;
    });
  }
};
