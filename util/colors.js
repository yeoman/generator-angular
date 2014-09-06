var chalk = require('chalk');
var util = require('util');

var CHALK_LIST = ['bold' ,'italic', 'underline', 'inverse', 'strikethrough', 'black', 'red', 'green', 'yellow',
  'blue', 'magenta', 'cyan', 'white', 'gray', 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagent', 'bgCyan', 'bgWhite'];
var _LIST = '(?:'+CHALK_LIST.join('|')+')';
var EXP_FIND = new RegExp('%('+_LIST+'(?:[:]'+_LIST+')*)(.+?)(%\\/\\1)', 'g');
var EXP_END = new RegExp('%('+_LIST+'(?:[:]'+_LIST+')*)(.+?)$');
var EXP_COL = new RegExp(_LIST+'(?:[:]'+_LIST+')*');

function colors(args) {
  var out = [];
  if( !Array.isArray(args) ) {
    args = Array.prototype.slice.call(arguments,0);
  }
  args.forEach(function(txt) {
    if( typeof(txt) === 'string' ) {
      txt = txt.replace(EXP_FIND, chalkIt.bind(null));
      txt = txt.replace(EXP_END, chalkIt.bind(null));
    }
    out.push(txt);
  });
  return util.format.apply(util, out);
}

function chalkIt(match, color, str) {
  var picks = color.split(':');
  var ref = chalk;
  picks.forEach(function(c) {
    ref = ref[c];
  });
  var out = '', parts = str.split(EXP_FIND);
  for(var i= 0, len = parts.length; i < len; i++) {
    if( EXP_COL.test(parts[i]) ) {
      out += colors('%'+parts.slice(i, i+3).join(''));
      i += 2;
    }
    else {
      out += ref(parts[i]);
    }
  }
  return out;
}

module.exports = colors;