'use strict';

/**
 * @ngdoc service
 * @name prototipoApp.token
 * @description
 * # token
 * Factory in the prototipoApp.
 */


// First, parse the query string
var params = {},
  queryString = location.hash.substring(1),
  regex = /([^&=]+)=([^&]*)/g,
  m;
while (m = regex.exec(queryString)) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
//console.log(params);
//console.log(location.hash.substring(1));
// And send the token over to the server
var req = new XMLHttpRequest();
// consider using POST so query isn't logged
var query = 'https://' + window.location.host + '?' + queryString;
//console.log(query);
req.open('GET',query , true);

req.onreadystatechange = function(e) {
  if (req.readyState == 4) {
    if (req.status == 200) {
      window.location = params['state']
    } else if (req.status == 400) {
      alert('There was an error processing the token.')
    } else {

      //alert('something else other than 200 was returned')
      //console.log(req);
    }
  }
};
/*
req.send(null);
*/

angular.module('<%= scriptAppName %>')
  .factory('token_service', function($location, $http, $localStorage) {
    var service = {
      local: $localStorage.$default(params),
      //session: $sessionStorage.default(params),
      header: null,
      token: null,
      //Configuracion de parametros identificacion unica oas-wso2
      /*
      config: {

        AUTORIZATION_URL: "https://wso2.intranetoas.udistrital.edu.co:9443/oauth2/authorize",
        CLIENTE_ID: "mEEMLpePonJ91jKYB_s8sbE8slQa",
        REDIRECT_URL:  "http://10.20.2.52/prototipo/app",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid profile email",
        BUTTON_CLASS: "btn btn-outline btn-primary btn-sm"
      },*/
      //Configuracion de parametros oidc unica google
      /*
      config: {
        AUTORIZATION_URL: "https://accounts.google.com/o/oauth2/v2/auth",
        CLIENTE_ID: "794841744026-6p2i7lmiho204r4li2bb1ektd7j9dbd4.apps.googleusercontent.com",
        REDIRECT_URL: "https://fabianleon.github.io/app",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid profile email",
        BUTTON_CLASS: "btn btn-outline btn-primary btn-sm"
      },*/

      live_token: function() {
        if (typeof service.local.id_token === 'undefined' || service.local.id_token === null) {
          return false;
        } else {
          service.header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(service.local.id_token.split(".")[0]));
          service.token = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(service.local.id_token.split(".")[1]));
          return true;
        }
      },
      logout: function(){
        service.token = null;
        $localStorage.$reset();
        //$sessionStorage.$reset();
        window.location = $location.absUrl();
      }
    };
    return service;
  });
