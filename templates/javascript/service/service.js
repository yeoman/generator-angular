'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .service('<%= name %>', function <%= name %>() {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
