// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: {
    src: [
      'Gruntfile.js'<% if (!coffee) { %>,
      '<%%= yeoman.app %>/scripts/{,*/}*.js'<% } %>
    ]
  }<% if (!coffee) { %>,
  test: {
    options: {
      jshintrc: 'test/.jshintrc'
    },
    src: ['test/spec/{,*/}*.js']
  }<% } %>
};
