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

  this.hookFor('angular:common', {
    args: args
  });

  this.hookFor('angular:main', {
    args: args
  });

  this.hookFor('angular:controller', {
    args: args
  });

  this.hookFor('karma', {
    as: 'app',
    options: {
      options: {
        coffee: this.options.coffee,
        travis: true,
        'skip-install': this.options['skip-install']
       }
    }
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

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

    cb();
  }.bind(this));
};

Generator.prototype.askForJade = function askForJade() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'jade',
    message: 'Would you like to include Jade template engine?',
    default: true
  }], function (props) {
    this.jade = props.jade;
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

Generator.prototype.readIndex = function readIndex() {
  var extension = (this.jade ? "jade" : "html");
  this.indexFile = this.engine(this.read('../../templates/common/index.' + extension), this);
};

// Waiting a more flexible solution for #138
Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var filesToAppend;
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

  filesToAppend = {
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'styles/main.css',
    sourceFileList: files.map(function (file) {
      return 'styles/' + file.replace('.scss', '.css');
    }),
    searchPath: '.tmp'
  };

  if (this.jade) {
    this.indexFile = appendFilesToJade(filesToAppend);
  } else {
    this.indexFile = this.appendFiles(filesToAppend);
  }
};

function appendScriptsJade(jade, optimizedPath, sourceFileList, attrs) {
  return appendFilesToJade(jade, 'js', optimizedPath, sourceFileList, attrs);
};

Generator.prototype.bootstrapJS = function bootstrapJS() {
  var list;
  if (!this.bootstrap) {
    return;  // Skip if disabled.
  }

  // Wire Twitter Bootstrap plugins
  list = [
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
  ];
  // Wire Twitter Bootstrap plugins
  if (this.jade) {
    this.indexFile = appendScriptsJade(this.indexFile, 'scripts/plugins.js', list);
  } else {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', list);
  }
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
    if (this.jade) {

    } else {
      this.indexFile = this.appendScripts(this.indexFile, 'scripts/modules.js',
          modules);
    }
  }
};

function spacePrefix(jade, block){
  var prefix;
  jade.split("\n").forEach( function (line) { if( line.indexOf(block)> -1 ) {
    prefix = line.split("/")[0];
  }});
  return prefix;
}

function generateJadeBlock(blockType, optimizedPath, filesBlock, searchPath, prefix) {
  var blockStart, blockEnd;
  var blockSearchPath = '';

  if (searchPath !== undefined) {
    if (util.isArray(searchPath)) {
      searchPath = '{' + searchPath.join(',') + '}';
    }
    blockSearchPath = '(' + searchPath +  ')';
  }

  blockStart = '\n' + prefix + '// build:' + blockType + blockSearchPath + ' ' + optimizedPath + ' \n';
  blockEnd = prefix + '// endbuild\n' + prefix;
  return blockStart + filesBlock + blockEnd;
};

function appendJade(jade, tag, blocks){
  var mark = "//- build:" + tag,
      position = jade.indexOf(mark);
  return [jade.slice(0, position), blocks, jade.slice(position)].join('');
}

function appendFilesToJade(jadeOrOptions, fileType, optimizedPath, sourceFileList, attrs, searchPath) {
  var blocks, updatedContent, prefix, jade, files = '';
  jade = jadeOrOptions;
  if (typeof jadeOrOptions === 'object') {
    jade = jadeOrOptions.html;
    fileType = jadeOrOptions.fileType;
    optimizedPath = jadeOrOptions.optimizedPath;
    sourceFileList = jadeOrOptions.sourceFileList;
    attrs = jadeOrOptions.attrs;
    searchPath = jadeOrOptions.searchPath;
  }
  if (fileType === 'js') {
    prefix = spacePrefix(jade, "build:body");
    sourceFileList.forEach(function (el) {
      files += prefix + 'script(' + (attrs||'') + 'src="' + el + '")\n';
    });
    blocks = generateJadeBlock('js', optimizedPath, files, searchPath, prefix);
    updatedContent = appendJade(jade, 'body', blocks);
  } else if (fileType === 'css') {
    prefix = spacePrefix(jade, "build:head");
    sourceFileList.forEach(function (el) {
      files += prefix + 'link(' + (attrs||'') + 'rel="stylesheet", href="' + el  + '")\n';
    });
    blocks = generateJadeBlock('css', optimizedPath, files, searchPath, prefix);
    updatedContent = appendJade(jade, 'head', blocks);
  }
  return updatedContent;
}

Generator.prototype.appJs = function appJs() {
  if (this.jade) {
    this.indexFile = appendFilesToJade({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'scripts/scripts.js',
      sourceFileList: ['scripts/app.js'],
      searchPath: ['.tmp', 'app']
    });
  } else {
    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'scripts/scripts.js',
      sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
      searchPath: ['.tmp', 'app']
    });
  }
};



Generator.prototype.createIndexJade = function createIndexJade() {
  if(this.jade) {
    this.write(path.join(this.appPath, 'jade/index.jade'), this.indexFile);
  }
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  if(!this.jade) {
    this.write(path.join(this.appPath, 'index.html'), this.indexFile);
  }
};

Generator.prototype.packageFiles = function () {
  this.template('../../templates/common/_bower.json', 'bower.json');
  this.template('../../templates/common/_package.json', 'package.json');
  this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.addMainView = function addMainView() {
  if(this.jade) {
    this.copy('../../templates/common/jade/views/main.jade', 'app/jade/views/main.jade');
  } else {
    this.copy('../../templates/common/views/main.html', 'app/views/main.html');
  }
};
