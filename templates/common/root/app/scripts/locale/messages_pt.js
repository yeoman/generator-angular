/* jshint -W109 */
'use strict';
try {
  angular.module('wixTranslations');
} catch (e) {
  angular.module('wixTranslations', ['pascalprecht.translate']);
}
angular.module('wixTranslations').config(function($translateProvider) {
  $translateProvider.translations({
    "general": {
      "YO": "Olá"
    }
  });
});
