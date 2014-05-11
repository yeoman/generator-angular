'use strict';

angular.module('<%= scriptAppName %>Internal')
    .config(function ($provide) {
        $provide.decorator('<%= cameledName %>', function ($delegate) {
            // decorate the $delegate
            return $delegate;
        });
    });
