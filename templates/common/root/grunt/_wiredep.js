// Automatically inject Bower components into the app
module.exports = {
  options: {
    cwd: '<%%= yeoman.app %>'
  },
  app: {
    src: ['<%%= yeoman.app %>/index.html'],
    ignorePath:  /..\//
  }<% if (compass) { %>,
  sass: {
    src: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
    ignorePath: /(\.\.\/){1,2}bower_components\//
  }<% } %>
};
