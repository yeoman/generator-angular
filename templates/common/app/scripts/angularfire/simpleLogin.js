(function() {
  'use strict';
  angular.module('simpleLogin', ['firebase', 'firebase.utils', 'firebase.config'])

    // a simple wrapper on simpleLogin.getUser() that rejects the promise
    // if the user does not exists (i.e. makes user required), useful for
    // setting up secure routes that require authentication
    .factory('authRequired', function(simpleLogin, $q) {
      return function() {
        return simpleLogin.getUser().then(function (user) {
          return user ? user : $q.reject({ authRequired: true });
        });
      };
    })

    .factory('simpleLogin', function($firebaseSimpleLogin, fbutil, $q, $rootScope<% if( hasPasswordProvider ) { %>, createProfile, changeEmail<% } %>) {
      var auth = $firebaseSimpleLogin(fbutil.ref());
      var listeners = [];

      function statusChange() {
        fns.initialized = true;
        fns.user = auth.user || null;
        console.log('simpleLogin sattus change', fns.user, listeners.length); //debug
        angular.forEach(listeners, function(fn) {
          fn(fns.user);
        });
      }

      var fns = {
        user: null,

        initialized: false,

        getUser: function() {
          return auth.$getCurrentUser();
        },

        login: function(provider, opts) {
          return auth.$login(provider, opts);
        },

        logout: function() {
          auth.$logout();
        },<% if( hasPasswordProvider ) { %>

        createAccount: function(email, pass, name) {
          return auth.$createUser(email, pass)
            .then(function() {
              // authenticate so we have permission to write to Firebase
              return fns.login('password', {email: email, pass: pass});
            })
            .then(function(user) {
              // store user data in Firebase after creating account
              return createProfile(user.uid, email, name).then(function() {
                return user;
              });
            });
        },

        changePassword: function(email, oldpass, newpass) {
          return auth.$changePassword(email, oldpass, newpass);
        },

        changeEmail: function(password, newEmail) {
          return changeEmail(password, fns.user.email, newEmail, this);
        },

        removeUser: function(email, pass) {
          return auth.$removeUser(email, pass);
        },<% } %>

        watch: function(cb, $scope) {
          listeners.push(cb);
          fns.getUser().then(function(user) {
            cb(user);
          });
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      $rootScope.$on('$firebaseSimpleLogin:login', statusChange);
      $rootScope.$on('$firebaseSimpleLogin:logout', statusChange);
      $rootScope.$on('$firebaseSimpleLogin:error', statusChange);
      auth.$getCurrentUser(statusChange);

      return fns;
    })<% if( hasPasswordProvider ) { %>

    .factory('createProfile', function(fbutil, $q, $timeout) {
      return function(id, email, name) {
        var ref = fbutil.ref('users', id), def = $q.defer();
        ref.set({email: email, name: name||firstPartOfEmail(email)}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });

        function firstPartOfEmail(email) {
          return ucfirst(email.substr(0, email.indexOf('@'))||'');
        }

        function ucfirst (str) {
          // credits: http://kevin.vanzonneveld.net
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        }

        return def.promise;
      };
    })

    .factory('changeEmail', function(fbutil, $q) {
      return function(password, oldEmail, newEmail, simpleLogin) {
        var ctx = { old: { email: oldEmail }, curr: { email: newEmail } };

        // execute activities in order; first we authenticate the user
        return authOldAccount()
          // then we fetch old account details
          .then( loadOldProfile )
          // then we create a new account
          .then( createNewAccount )
          // then we copy old account info
          .then( copyProfile )
          // and once they safely exist, then we can delete the old ones
          // we have to authenticate as the old user again
          .then( authOldAccount )
          .then( removeOldProfile )
          .then( removeOldLogin )
          // and now authenticate as the new user
          .then( authNewAccount )
          .catch(function(err) { console.error(err); return $q.reject(err); });

        function authOldAccount() {
          return simpleLogin.login(ctx.old.email, password).then(function(user) {
            ctx.old.uid = user.uid;
          });
        }

        function loadOldProfile() {
          var def = $q.defer();
          ctx.old.ref = fbutil.ref('users', ctx.old.uid);
          ctx.old.ref.once('value',
            function(snap){
              var dat = snap.val();
              if( dat === null ) {
                def.reject(oldEmail + ' not found');
              }
              else {
                ctx.old.name = dat.name;
                def.resolve();
              }
            },
            function(err){
              def.reject(err);
            });
          return def.promise;
        }

        function createNewAccount() {
          return simpleLogin.createAccount(ctx.curr.email, password, ctx.old.name).then(function(user) {
            ctx.curr.uid = user.uid;
          });
        }

        function copyProfile() {
          var d = $q.defer();
          ctx.curr.ref = fbutil.ref('users', ctx.curr.uid);
          var profile = {email: ctx.curr.email, name: ctx.old.name||''};
          ctx.curr.ref.set(profile, function(err) {
            if (err) {
              d.reject(err);
            } else {
              d.resolve();
            }
          });
          return d.promise;
        }

        function removeOldProfile() {
          var d = $q.defer();
          ctx.old.ref.remove(function(err) {
            if (err) {
              d.reject(err);
            } else {
              d.resolve();
            }
          });
          return d.promise;
        }

        function removeOldLogin() {
          var def = $q.defer();
          simpleLogin.removeUser(ctx.old.email, password).then(function() {
            def.resolve();
          }, function(err) {
            def.reject(err);
          });
          return def.promise;
        }

        function authNewAccount() {
          return simpleLogin.login(ctx.curr.email, password);
        }
      };
    })<% } %>;
})();