// Watches files for changes and runs tasks based on the changed files
module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },<% if (coffee) { %>
  coffee: {
    files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
    tasks: ['newer:coffee:dist']
  },
  coffeeTest: {
    files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
    tasks: ['newer:coffee:test', 'karma']
  },<% } else { %>
  js: {
    files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
    tasks: ['newer:jshint:all'],
    options: {
      livereload: '<%%= connect.options.livereload %>'
    }
  },
  jsTest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['newer:jshint:test', 'karma']
  },<% } %><% if (compass) { %>
  compass: {
    files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
    tasks: ['compass:server', 'autoprefixer']
  },<% } else { %>
  styles: {
    files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
    tasks: ['newer:copy:styles', 'autoprefixer']
  },<% } %>
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    options: {
      livereload: '<%%= connect.options.livereload %>'
    },
    files: [
      '<%%= yeoman.app %>/{,*/}*.html',
      '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
      '.tmp/scripts/{,*/}*.js',<% } %>
      '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  }
};
