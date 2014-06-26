module.exports = {
  dist: {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    },
    files: [{
      expand: true,
      cwd: '<%%= yeoman.dist %>',
      src: ['*.html', 'views/{,*/}*.html'],
      dest: '<%%= yeoman.dist %>'
    }]
  }
};
