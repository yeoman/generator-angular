'use strict';

describe('<%= _.camelize(appname) %>App', function() {

  it('should redirect to index.html#/ by default', function() {
    browser().navigateTo('/index.html#/testDefault');
    expect(browser().location().url()).toBe('/');
  });
  
});
