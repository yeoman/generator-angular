'use strict';

describe('<%= _.camelize(appname) %>App', function () {

  beforeEach(function () {
    browser.addMockModule('<%= scriptAppName %>Mocks', function () {});
  });

  afterEach(function () {
    browser.removeMockModule();
  });

  it('should load successfully', function () {
    browser.get('/');
    expect(element(by.css('h3')).getText()).toEqual('Enjoy coding! - Yeoman');
  });

});
