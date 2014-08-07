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
        var isMatch = !!classes.match('(^|\\s)' + expected + '(\\s|$)');
        deferred.fulfill(isMatch);
      });

      return deferred.promise;
    }
  });
});
