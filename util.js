'use strict';
var path = require('path');
var fs = require('fs');


module.exports = {
  rewrite: rewrite,
  rewriteFile: rewriteFile,
  appName: appName
};

function rewriteFile (args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
}

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  }).join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  var otherwiseLineIndex = 0;
  var needles = (Array.isArray(args.needle) ? args.needle : [args.needle]);
  needles.every(function (needle) {
    lines.forEach(function (line, i) {
      if (line.indexOf(needle) !== -1) {
        otherwiseLineIndex = i;
      }
    });
    return otherwiseLineIndex === 0;
  });

  var spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  var spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
    return spaceStr + line;
  }).join('\n'));

  return lines.join('\n');
}

function appName (self) {
  var counter = 0, suffix = self.options['app-suffix'];
  // Have to check this because of generator bug #386
  process.argv.forEach(function(val) {
    if (val.indexOf('--app-suffix') > -1) {
      counter++;
    }
  });
  if (typeof suffix === 'string') {
    counter++;
  }
  if (counter === 0 || (typeof suffix === 'boolean' && suffix)) {
    suffix = 'App';
  }
  return suffix ? self._.classify(suffix) : '';
}
