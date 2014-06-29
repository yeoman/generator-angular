'use strict';

beforeEach(function () {
  this.addMatchers({
    toHaveClass: function (expected) {
      var self = this;
      var deferred = protractor.promise.defer();

      self.actual.getAttribute('class').then(function (classes) {
        var result = classes && classes.match(new RegExp('\\b' + expected + '\\b'));

        if (result) {
          deferred.fulfill(true);
        } else {
          deferred.reject('\'' + classes + '\' did not contain class \'' + expected + '\'');
        }
      });

      return deferred.promise;
    }
  });
});
