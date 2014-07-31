'use strict';

function MainPage() {
  this.navigate = function () {
    browser.get('/');
  };

  this.getTitle = function () {
    return $('h3');
  };
}

module.exports = MainPage;
