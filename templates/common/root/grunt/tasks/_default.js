module.exports = function (grunt) {
  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
