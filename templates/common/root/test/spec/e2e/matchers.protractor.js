'use strict';

beforeEach(function () {
  this.addMatchers({
    toHaveClass: function (expected) {
      var deferred = protractor.promise.defer();
      var self = this;

      this.actual.getAttribute('class').then(function (classes) {
        classes = classes || '';
        self.message = function () {
          var positiveMessage = '\'' + classes + '\' did not contain class \'' + expected + '\'';
          var invertedMessage = '\'' + classes + '\' contained class \'' + expected + '\'';
          return [positiveMessage, invertedMessage];
        };
        if (classes.match(new RegExp('\\b' + expected + '\\b'))) {
          deferred.fulfill(true);
        } else {
          deferred.fulfill(false);
        }
      });

      return deferred.promise;
    }
  });
});
