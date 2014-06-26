// The actual grunt server settings
module.exports = {
  options: {
    port: 9000,
    // Change this to '0.0.0.0' to access the server from outside.
    hostname: 'localhost',
    livereload: 35729
  },
  livereload: {
    appPath: '<%%= yeoman.app %>',
    options: {
      open: true,
      middleware: function (connect) {
        return [
          connect.static('.tmp'),
          connect().use(
            '/bower_components',
            connect.static('./bower_components')
          ),
          connect.static(this.data.appPath)
        ];
      }
    }
  },
  test: {
    appPath: '<%%= yeoman.app %>',
    options: {
      port: 9001,
      middleware: function (connect) {
        return [
          connect.static('.tmp'),
          connect.static('test'),
          connect().use(
            '/bower_components',
            connect.static('./bower_components')
          ),
          connect.static(this.data.appPath)
        ];
      }
    }
  },
  dist: {
    options: {
      open: true,
      base: '<%%= yeoman.dist %>'
    }
  }
};
