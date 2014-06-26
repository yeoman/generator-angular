// Compiles Sass to CSS and generates necessary files if requested
module.exports = {
  options: {
    sassDir: '<%%= yeoman.app %>/styles',
    cssDir: '.tmp/styles',
    generatedImagesDir: '.tmp/images/generated',
    imagesDir: '<%%= yeoman.app %>/images',
    javascriptsDir: '<%%= yeoman.app %>/scripts',
    fontsDir: '<%%= yeoman.app %>/styles/fonts',
    importPath: './bower_components',
    httpImagesPath: '/images',
    httpGeneratedImagesPath: '/images/generated',
    httpFontsPath: '/styles/fonts',
    relativeAssets: false,
    assetCacheBuster: false,
    raw: 'Sass::Script::Number.precision = 10\n'
  },
  dist: {
    options: {
      generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
    }
  },
  server: {
    options: {
      debugInfo: true
    }
  }
};
