
<a name="1.0.0"></a>
### 1.0.0 (2015-03-27)

### Features

* **app**
   * Upgraded AngularFire to 1.0.0
   * Upgraded Firebase SDK to 2.2.3
* **auth**
   * renamed `simpleLogin` service to `Auth` and the module is now `firebase.auth`
   * removed `authRequired` service (part of `$firebaseAuth` now)
   * removed `createProfile` service (part of `Auth` now)
   * 
* **release** merged latest changes from generator-angular upstream branch

### Breaking Changes

* Requires Firebase SDK 2.x
* Requires AngularFire 1.x

<a name="0.9.4"></a>
### 0.9.4 (2015-01-15)

### Features

* merge latest changes to generator-angular
* upgraded Firebase SDK to 2.1.0
* upgraded AngularFire to 0.9.1

<a name="0.8.2"></a>
### 0.8.2 (2014-09-04)

#### Features

* Upgraded to AngularFire 0.8.2 (versions will now be in sync)
* Now forked from generator-angularfire for easier upgrade path
* No longer necessary to do `yo angular` before `yo angulafire`
* CoffeeScript support
* Better use of resolve method in routers
* More streamlined auth process (simpler simpleLogin service)
* Added Google auth provider
* Added anonymous auth provider
