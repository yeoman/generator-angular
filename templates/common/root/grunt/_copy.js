// Copies remaining files to places other tasks can use
module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%%= yeoman.app %>',
      dest: '<%%= yeoman.dist %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        '*.html',
        'views/{,*/}*.html',
        'images/{,*/}*.{webp}',
        'fonts/*'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%%= yeoman.dist %>/images',
      src: ['generated/*']
    }<% if (bootstrap) { %>, {
      expand: true,
      cwd: '<% if (!compassBootstrap) {
          %>bower_components/bootstrap/dist<%
        } else {
          %>.<%
        } %>',
      src: '<% if (compassBootstrap) {
          %>bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap<%
        } else { %>fonts<% }
        %>/*',
      dest: '<%%= yeoman.dist %>'
    }<% } %>]
  },
  styles: {
    expand: true,
    cwd: '<%%= yeoman.app %>/styles',
    dest: '.tmp/styles/',
    src: '{,*/}*.css'
  }
};
