'use strict';

describe('<%= _.camelize(appname) %>App', function () {

  it('should load successfully', function () {
    browser.get('/');
    expect(element(by.css('h3')).getText()).toEqual('Enjoy coding! - Yeoman');
  });

});
