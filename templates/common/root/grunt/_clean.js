// Empties folders to start fresh
module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%%= yeoman.dist %>/{,*/}*',
        '!<%%= yeoman.dist %>/.git*'
      ]
    }]
  },
  server: '.tmp'
};
