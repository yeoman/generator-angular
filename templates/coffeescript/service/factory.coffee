'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .factory '<%= _.camelize(name) %>', () ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    {
      someMethod: () ->
        return meaningOfLife;
    }
