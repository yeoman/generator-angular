// Test settings
module.exports = {
  unit: {
    configFile: 'test/karma.conf.<% if (coffee) {
      %>coffee<% } else {
      %>js<% }
      %>',
    singleRun: true
  }
};
