angular.module('firebase.config', [])
  .constant('FBURL', 'https://<%= firebaseName %>.firebaseio.com')<%
    if( loginModule ) {
  %>
  .constant('SIMPLE_LOGIN_PROVIDERS', ['<%= _.map(authProviders, function(p) {
          return p.value;
        }).join("','") %>'])

  .constant('loginRedirectPath', '/login')<% }
  %>;
