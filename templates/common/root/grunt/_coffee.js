// Compiles CoffeeScript to JavaScript
module.exports = {
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
};
