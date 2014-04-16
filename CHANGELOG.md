<a name="0.8.0"></a>
## 0.8.0 (2014-03-27)


#### Bug Fixes

* **app:**
  * correct adding scripts path to index.html ([5533ad86](http://github.com/yeoman/generator-angular/commit/5533ad86676dab3e165c4a298f7e6428759e7c18))
  * change "Twitter Bootstrap" to "Bootstrap" ([55a79718](http://github.com/yeoman/generator-angular/commit/55a797182cea37501bcdb1622ebb3cf4b578534b))
  * change the script src to lowercase ([c884c91d](http://github.com/yeoman/generator-angular/commit/c884c91d1dba8e47d27a80857ad33bdd33ca7a7f), closes [#557](http://github.com/yeoman/generator-angular/issues/557))
* **build:**
  * don't copy the bower_components folder in build ([4c53ea97](http://github.com/yeoman/generator-angular/commit/4c53ea975d3a776c416e078389a2657ec4e56ac0), closes [#590](http://github.com/yeoman/generator-angular/issues/590))
  * rewrite relative CSS URLs ([996eff82](http://github.com/yeoman/generator-angular/commit/996eff82b0bd11976daf997c69e12dcdcd643683))
* **generator:**
  * require compass only when enabled ([d4630c33](http://github.com/yeoman/generator-angular/commit/d4630c3307df2f55d21753c3e8ed1fe6d232b44b))
  * list coffee dep only when selected ([c9a69807](http://github.com/yeoman/generator-angular/commit/c9a69807ee18517f973161d3902421b2bee4782e))
  * add closing template tag ([3522514f](http://github.com/yeoman/generator-angular/commit/3522514f999c791e2114483cd8a39a172c794a74))
  * add closing template tag ([0f57d2c4](http://github.com/yeoman/generator-angular/commit/0f57d2c4b8a9686d836faeee08ee7caa7f05a507))
* **template:** remove IE edge header ([01738116](http://github.com/yeoman/generator-angular/commit/017381168132c8d560a3976c0b97b15a4f120727))
* **test:** update assertFile syntax ([51e46455](http://github.com/yeoman/generator-angular/commit/51e4645524684e7220ccece1800899d2b87a45e6), closes [#554](http://github.com/yeoman/generator-angular/issues/554))


#### Features

* **app:**
  * add glyphicon to test bootstrap fonts ([953a93b6](http://github.com/yeoman/generator-angular/commit/953a93b6dbbfc25f1b5f536e5ddaeeb8b1a24759))
  * remove minsafe options ([c24e2509](http://github.com/yeoman/generator-angular/commit/c24e25097acb109240f687ace7c214b095d3ee77), closes [#452](http://github.com/yeoman/generator-angular/issues/452))
* **build:** use bowerInstall on `watch` task ([6fbebb05](http://github.com/yeoman/generator-angular/commit/6fbebb057962edc8daf421c858f82f33abe66125))
* **deps:**
  * upgrade AngularJS version ([6c540961](http://github.com/yeoman/generator-angular/commit/6c5409613b30dc37d845cb8aa040760f885f34af))
  * use official Sass version of Bootstrap ([66829f45](http://github.com/yeoman/generator-angular/commit/66829f453ec5fe48dbf4e75f5bc312bb06bc9ace), closes [#607](http://github.com/yeoman/generator-angular/issues/607))
  * upgrade AngularJS + addons to 1.2.14 ([b4d026f3](http://github.com/yeoman/generator-angular/commit/b4d026f350ba1e8ce087fff66d476c72dd505b60))
  * upgrade to grunt-bower-install 1.0 ([6a167895](http://github.com/yeoman/generator-angular/commit/6a1678953bce069b4ac79f68e0959e80cbdbaa3f))
  * upgrade to Angular 1.2.10 ([023da9d2](http://github.com/yeoman/generator-angular/commit/023da9d2327f90e3128e1e7aecf73d0bc1e2660d))


#### Breaking Changes

* bower_components is no longer copied into the /dist
folder.
 ([4c53ea97](http://github.com/yeoman/generator-angular/commit/4c53ea975d3a776c416e078389a2657ec4e56ac0))
* Removes the --minsafe from the generator. See the
readme for more information about this change
 ([c24e2509](http://github.com/yeoman/generator-angular/commit/c24e25097acb109240f687ace7c214b095d3ee77))


<a name="v0.7.1"></a>
### v0.7.1 (2013-12-22)


#### Bug Fixes

* **Gruntfile:** correct attribute quoting ([ca765509](http://github.com/yeoman/generator-angular/commit/ca765509b4bf3d827ac40206ea9bb84936b806cc), closes [#521](http://github.com/yeoman/generator-angular/issues/521))


#### Features

* **app:** upgrade to AngularJS 1.2.6 ([2f7fa90c](http://github.com/yeoman/generator-angular/commit/2f7fa90cc698edb565926fcf6cce77c52f5785ae))

<a name="v0.7.0"></a>
## v0.7.0 (2013-12-20)


#### Bug Fixes

* **app:**
  * copy view files to dist folder ([8a52a265](http://github.com/yeoman/generator-angular/commit/8a52a265aa15a0f589109d6cd1dac4ae7dc5a3e9))
  * only copy CSS if Compass is not installed ([7e586745](http://github.com/yeoman/generator-angular/commit/7e58674585e138c0f2eb81f46ef2cc4f1b9a3bf8))
  * services use classified names ([56a71a83](http://github.com/yeoman/generator-angular/commit/56a71a83cdf90f81bb37b422ba4d40e75d28e1fe), closes [#484](http://github.com/yeoman/generator-angular/issues/484))
  * reload JS files in watch ([d20f5bd2](http://github.com/yeoman/generator-angular/commit/d20f5bd20ba95d47447f8acceee491a0a0ba9724))
* **build:** deselecting ngRoute does remove route stuff ([a358c1ae](http://github.com/yeoman/generator-angular/commit/a358c1ae69bff6a7708ea0a77248698f931f2e4d), closes [#486](http://github.com/yeoman/generator-angular/issues/486))
* **deps:** hard-pin angular 1.2.5 ([49c7f980](http://github.com/yeoman/generator-angular/commit/49c7f9802c6d7e9347c73ffe018c36b750342cb1))
* **gen:** fix bower install prompt during project gen ([706f1336](http://github.com/yeoman/generator-angular/commit/706f1336852923e409d669ae6fc6faeda7bbb017), closes [#505](http://github.com/yeoman/generator-angular/issues/505))


#### Features

* **app:**
  * add jasmine browser global to test jshintrc ([11b6ed42](http://github.com/yeoman/generator-angular/commit/11b6ed42b5e941f25cc305eb5c4e8ba49586cf64))
  * use lowercase file names ([23e5d772](http://github.com/yeoman/generator-angular/commit/23e5d7724e7e02e4b974f4e804f35eca33a53aea), closes [#463](http://github.com/yeoman/generator-angular/issues/463))
  * use htmlmin for smaller HTML files ([2b85a52a](http://github.com/yeoman/generator-angular/commit/2b85a52a054ac8cf1ab86ce1cd3de7819d30ea52), closes [#469](http://github.com/yeoman/generator-angular/issues/469))
  * use grunt-bower-install for dep management ([ba7b5051](http://github.com/yeoman/generator-angular/commit/ba7b505117307059a6d013d838c8aeff6db0e452), closes [#497](http://github.com/yeoman/generator-angular/issues/497))
* **gen:**
  * additional work for compass support ([11cb9943](http://github.com/yeoman/generator-angular/commit/11cb99437271b6e8f6cdaee8fd5fc9cda7a20d1d))
  * add Compass support to the initialization process ([7fac1194](http://github.com/yeoman/generator-angular/commit/7fac1194179df3181f52258b0aa7333799fec253))


#### Breaking Changes

* Deselecting ngRoute adds controller and ng-include to index.html
 ([a358c1ae](http://github.com/yeoman/generator-angular/commit/a358c1ae69bff6a7708ea0a77248698f931f2e4d))
* `--minsafe` flag is now deprecated. ([f0bb8da2](http://github.com/yeoman/generator-angular/commit/f0bb8da2d67c3f627bf775e2d4f53340b5c980c4), closes [#452](http://github.com/yeoman/generator-angular/issues/452))
* `grunt server` is now deprecated. Use `grunt serve` instead
 ([ef056319](http://github.com/yeoman/generator-angular/commit/ef0563192a9e3fc834ae97e7ec68470bcfdf56eb))

<a name="v0.6.0"></a>
## v0.6.0 (2013-12-05)

#### Breaking Changes

* `grunt server` is being deprecated
 ([ef056319](http://github.com/yeoman/generator-angular/commit/ef0563192a9e3fc834ae97e7ec68470bcfdf56eb))

#### Bug Fixes

* **app:**
  * use test-specifc jshintrc ([c00c091b](http://github.com/yeoman/generator-angular/commit/c00c091bdca2b55685d81a2b84b002d73aacbdcc))
  * add webapp upstream features and better coffee ([c23acebb](http://github.com/yeoman/generator-angular/commit/c23acebbd8fabd391bfeee0d424f26e59f756a03))
  * use grunt-newer for styles and jshint ([b1eeb68a](http://github.com/yeoman/generator-angular/commit/b1eeb68a8290aee930887fc473034ee7f8e2ccc3))
  * standardize comments and comment out uglify:dist ([d5d3e458](http://github.com/yeoman/generator-angular/commit/d5d3e458e70d054707c70d058454fdd3d94070fe), closes [#455](http://github.com/yeoman/generator-angular/issues/455))
  * only include sass if sass is selected ([597b8b5c](http://github.com/yeoman/generator-angular/commit/597b8b5cfab77b78e7f6091140beda2eeee0ed54), closes [#449](http://github.com/yeoman/generator-angular/issues/449))

* **deps:** upgrade dependencies ([3a57216f](http://github.com/yeoman/generator-angular/commit/3a57216ff9e3192db3804634f360253e9fcce69d))

* **gen:**
  * script paths use forward slashes ([40aa61dc](http://github.com/yeoman/generator-angular/commit/40aa61dcc1bf31918bea3d2ce9a84c93554aa64a), closes [#410](http://github.com/yeoman/generator-angular/issues/410))
  * remove extra "App" from service spec files ([4053f11f](http://github.com/yeoman/generator-angular/commit/4053f11f800280569f5b7396ad015f0a6bcc7b49))
  * options should have descriptions ([da001832](http://github.com/yeoman/generator-angular/commit/da001832dbdb268b3bf38f359c72b40c401273e4))

* **template:** remove redundant closing tag ([d1e560e0](http://github.com/yeoman/generator-angular/commit/d1e560e0675ecb70e6c4b59cf4de9df461434a31), closes [#441](http://github.com/yeoman/generator-angular/issues/441))
* **bootstrap:** some plugins have ordering dependencies ([3da4a130](http://github.com/yeoman/generator-angular/commit/3da4a1301e0b744c7a6054fafff26fff16b6442b))
* **docs:** Add coffeescript=false to readme ([abd7dc38](http://github.com/yeoman/generator-angular/commit/abd7dc38be0cf511307c784f30d59c9fdcaea3e2))
* **styles:** update path to icon images ([8daad4f2](http://github.com/yeoman/generator-angular/commit/8daad4f2de9dbde4fcc810527da7c9607e1db8d4))

#### Features

* **app:**
  * imagemin handles gifs ([9341eb9b](http://github.com/yeoman/generator-angular/commit/9341eb9b710b95c95407dc54ed4af6aa4a496426))
  * run unit tests when test scripts are changed ([94af0b51](http://github.com/yeoman/generator-angular/commit/94af0b510982b05c5a1939966e96aeccce087500))
  * reload grunt server when gruntfile is updated ([50c6abb9](http://github.com/yeoman/generator-angular/commit/50c6abb9cce09a149253ceb8496feca813a71136))
  * update to angular 1.2.0 ([77082c6b](http://github.com/yeoman/generator-angular/commit/77082c6b8d1dda76579f1970a270dffc359f027f))
  * upgrade to Bootstrap 3.0.1 ([59f4b1ba](http://github.com/yeoman/generator-angular/commit/59f4b1ba73842b758174ad44a7da60af4f4db63f))

* **build:**
  * compile only changed coffeescript files in watch task ([4196e379](http://github.com/yeoman/generator-angular/commit/4196e37912993ae37812fa19d9378d8b8d2cc9da), closes [#425](http://github.com/yeoman/generator-angular/issues/425))
  * deprecate server in favor of serve ([ef056319](http://github.com/yeoman/generator-angular/commit/ef0563192a9e3fc834ae97e7ec68470bcfdf56eb))

* **gen:**
  * add image file as example ([b161c298](http://github.com/yeoman/generator-angular/commit/b161c2982d86df1bb3de44cd9fa8aee05fc66ff3))
  * allow app names to have custom suffix ([09f0f7b3](http://github.com/yeoman/generator-angular/commit/09f0f7b3a8c3264b7527bc9fed8c709becec99eb))
  * add option to not add to index ([486ee146](http://github.com/yeoman/generator-angular/commit/486ee14660ac51b7cfcb4b7de50135833954f193))


<a name="v0.5.1"></a>
### v0.5.1 (2013-10-22)


#### Bug Fixes

* **app:** test setup in default configuration ([2bebccbd](http://github.com/yeoman/generator-angular/commit/2bebccbdd15d177805440b6d1ec84cc38a2b4678))

<a name="v0.5.0"></a>
## v0.5.0 (2013-10-17)


#### Bug Fixes

* **app:**
  * serve files from correct place ([fe2bad04](http://github.com/yeoman/generator-angular/commit/fe2bad0417b3138fa2788c17abcf7eb5be5f3e91))
  * include bootstrap images for css/scss ([e88dba43](http://github.com/yeoman/generator-angular/commit/e88dba43f2e714d69bca366cade453f49a24b62c), closes [#196](http://github.com/yeoman/generator-angular/issues/196))
  * allow normal javascript to be created ([c8190b55](http://github.com/yeoman/generator-angular/commit/c8190b55284e8c1570cc8fafdc8723250f43829b), closes [#329](http://github.com/yeoman/generator-angular/issues/329), [#316](http://github.com/yeoman/generator-angular/issues/316))
  * conditional include of jquery ([bc1e68e3](http://github.com/yeoman/generator-angular/commit/bc1e68e30450edc16145b934487f6df5eaaddcd8), closes [#362](http://github.com/yeoman/generator-angular/issues/362))
* **build:**
  * remove references to global yeomanConfig ([a0f16e26](http://github.com/yeoman/generator-angular/commit/a0f16e265729586802121c0fe3111f974e5145ec))
  * update to grunt-contrib-connect 0.5.0 ([67c0ebf0](http://github.com/yeoman/generator-angular/commit/67c0ebf081889658a33bc690c530c3c8bc8a2c12))
  * update to grunt-contrib-connect 0.4.0 ([368ad7f9](http://github.com/yeoman/generator-angular/commit/368ad7f9a16be0ee67e5182be581669017788f16))
* **docs:** fixed typo in readme ([a967907c](http://github.com/yeoman/generator-angular/commit/a967907cf523bac752b3fa9ea6363767d8855162))
* **generator:** add app modules dependency to app ([a45b71c9](http://github.com/yeoman/generator-angular/commit/a45b71c95c18deb85ff7a1538c0b0744e4faa508), closes [#230](http://github.com/yeoman/generator-angular/issues/230))
* **templates:**
  * Gruntfile indentation ([6f7d17e2](http://github.com/yeoman/generator-angular/commit/6f7d17e2a0f1f7f9f8cac3157beb07b82e8cf400))
  * take out semicolons in coffeescript ([e38124ee](http://github.com/yeoman/generator-angular/commit/e38124eeb369b7741adc263f1763c618a918ee65))
  * correct coffee provider template ([86aefe5d](http://github.com/yeoman/generator-angular/commit/86aefe5da49abe82e054666641f8ee4bdc8d555e))
  * value generator should use value template ([67d0c5ad](http://github.com/yeoman/generator-angular/commit/67d0c5ad5cbc58a2dfcfd8f3db1f45be21afe357))
* **test:** update tests to match service files ([c30464c3](http://github.com/yeoman/generator-angular/commit/c30464c3a5216169026c23a6fea23d273bd0b948), closes [#338](http://github.com/yeoman/generator-angular/issues/338), [#354](http://github.com/yeoman/generator-angular/issues/354))
* **views:** correct path for sub views ([0568e744](http://github.com/yeoman/generator-angular/commit/0568e74446c5a8e28d2cea1a9a9a5886be190d7d), closes [#359](http://github.com/yeoman/generator-angular/issues/359))

<a name="v0.4.0"></a>
## v0.4.0 (2013-08-21)


#### Bug Fixes

* **cli:** fix typo in angular:view generator usage ([d62c2e34](http://github.com/yeoman/generator-angular/commit/d62c2e348bcc61a6794ca23df02b6cce3c79d993))
* **coffee:**
  * remove extraneous commas and returns ([6df875cd](http://github.com/yeoman/generator-angular/commit/6df875cd7167aa4a4e9f98a82d2f7fba98a20b0b))
  * remove the semi-colon from the coffee script templates ([cd46aa88](http://github.com/yeoman/generator-angular/commit/cd46aa88953e60d81dfef64b999f751dc4468ab7))
* **docs:**
  * add decorator generator description ([85f07648](http://github.com/yeoman/generator-angular/commit/85f076485ffabf790fe0b7d55b7e3def3a041a6d))
  * add contributing info to contributing file ([2461aad0](http://github.com/yeoman/generator-angular/commit/2461aad08afe186995d737a1d3dd595c20ec3fb3))
* **readme:** Remove `yo` installation step ([21f00e50](http://github.com/yeoman/generator-angular/commit/21f00e50571d272d19aea1431177f2d7157ee7be))
* **templates:**
  * removed grunt-karma from deps ([19a796f7](http://github.com/yeoman/generator-angular/commit/19a796f71925b6b33232d8a9a8b4f712de80ec40))
  * classify services registered with .service ([8e1d6fdf](http://github.com/yeoman/generator-angular/commit/8e1d6fdf0d3ef23cf0670512295e03cc0f4516d6))
  * new scope for directive spec ([2753c990](http://github.com/yeoman/generator-angular/commit/2753c990dbdc8efc7a5f245868cd10f15080c140))
* **test:** Add correct paths to generated files ([1d6f3fbf](http://github.com/yeoman/generator-angular/commit/1d6f3fbfcc315316a44b468418918afaad871f57))
* **wording:** clarify compass/scss feature prompt ([5521fd73](http://github.com/yeoman/generator-angular/commit/5521fd73d396763568b5e7c08043a82a4e8864a9))


#### Features

* **build:**
  * generate karma 0.10 config ([e1cb2067](http://github.com/yeoman/generator-angular/commit/e1cb206710f54c8bea6ed8870566ac4c3e248b40))
  * add autoprefixer support ([c4dfd61d](http://github.com/yeoman/generator-angular/commit/c4dfd61d860f86a97026d1e5188ab78a87f4e6a1), closes [#317](http://github.com/yeoman/generator-angular/issues/317))
  * switch to use load-grunt-tasks ([4e030c78](http://github.com/yeoman/generator-angular/commit/4e030c78387ec2a60581ff6346b707c98ddb2508))
  * show elapsed time for grunt tasks ([cacdd0fb](http://github.com/yeoman/generator-angular/commit/cacdd0fb5815355f6e35343c53e876352e622180))
* **coffee:** generate source maps for coffeescript ([38a872b3](http://github.com/yeoman/generator-angular/commit/38a872b31e9ccef1aac76bec330c3490303abdac))
* **gen:** Change ga.js to analytics.js ([17ae9e63](http://github.com/yeoman/generator-angular/commit/17ae9e63b2d11d271b36282bb34567b716099cb9))

<a name="v0.3.1"></a>
## v0.3.1 (2013-07-24)


#* **Bug Fixes:**

* **app:**
  * order of script inclusions ([9919b2d0](http://github.com/yeoman/generator-angular/commit/9919b2d0bb749cbe5e795608c2b93c3504e3298b), closes [#278](http://github.com/yeoman/generator-angular/issues/278))
  * copy glyphicons for sass ([2c458009](http://github.com/yeoman/generator-angular/commit/2c4580096572678de6212c8592fb553c10b3a4c0), closes [#269](http://github.com/yeoman/generator-angular/issues/269))
  * add jQuery \<script\> into index.html template ([3766b4ff](http://github.com/yeoman/generator-angular/commit/3766b4ffe1b91a647a34577ae529d11c994e3a1d))
* **docs:**
  * fix section explaining generating services ([8b4787c6](http://github.com/yeoman/generator-angular/commit/8b4787c649b918cb2baf78369e86c86156bca2ec))
  * Add explicit instructions for installing yo ([8404c068](http://github.com/yeoman/generator-angular/commit/8404c0687ab582e15b1f46f96da4f7812d641912))


#* **Features:**

* **app:**
  * generate Travis config ([38a4ce9b](http://github.com/yeoman/generator-angular/commit/38a4ce9baa207c49c79b2f3128c2c3637164c011))
  * use checkboxes for module selection ([65fe9d25](http://github.com/yeoman/generator-angular/commit/65fe9d25fdc1f9fa9c24c4858915c2b63b4531cb))
  * add jshintrc for testing folder ([8727288b](http://github.com/yeoman/generator-angular/commit/8727288bcefdb255f3c24cf80ab1c7868b86d044))
* **build:** add support for svg optimization ([03d63c69](http://github.com/yeoman/generator-angular/commit/03d63c69e8006e563baee0cc4a4ba459e7c13ccd))

<a name="v0.3.1"></a>
## 0.3.0 (2013-06-26)

#* **Features:**

* **decorator:**
  * Add decorator template files ([c9f80b3d](http://github.com/yeoman/generator-angular/commit/c9f80b3d))
  * Define creation of decorator at decorator/index.js and added USAGE File ([4c53c1ad](http://github.com/yeoman/generator-angular/commit/4c53c1ad))
  * Add prompt if file already exists ([7d9b862c](http://github.com/yeoman/generator-angular/commit/7d9b862c))

* **build:**
  * Replace regard with contrib-watch ([edf00565](http://github.com/yeoman/generator-angular/commit/edf00565))

#* **Bug Fixes:**

* **build:**
  * bad concatenation of main.css ([4c7e4b29](http://github.com/yeoman/generator-angular/commit/4c7e4b29))
  * Bumped yeoman-generator version for new prompt ([9e899bb2](http://github.com/yeoman/generator-angular/commit/9e899bb2))
  * don't override generated css files ([dd6a0cb1](http://github.com/yeoman/generator-angular/commit/dd6a0cb1))
  * use Usemin for all CSS. ([e6c2fa52](http://github.com/yeoman/generator-angular/commit/e6c2fa52))
  * dropped nospawn option from watch ([02f61f82](http://github.com/yeoman/generator-angular/commit/02f61f82))
  * add svg files to the copy task ([4b897ac8](http://github.com/yeoman/generator-angular/commit/4b897ac8))
  * updated generated dependencies ([cab7c423](http://github.com/yeoman/generator-angular/commit/cab7c423))
  * add httpFontsPath to Gruntfile ([b00deb1a](http://github.com/yeoman/generator-angular/commit/b00deb1a))
  * coffeescript build was empty ([54edc9de](http://github.com/yeoman/generator-angular/commit/54edc9de))
  * add compass task only if compass-flavored bootstrap is selected ([4408413e](http://github.com/yeoman/generator-angular/commit/4408413e))

* **app:**
  * Bootstrap Compass no prompt on Bootstrap no ([e73ffc49](http://github.com/yeoman/generator-angular/commit/e73ffc49))
  * Use boolean prompts ([da89e70d](http://github.com/yeoman/generator-angular/commit/da89e70d))
  * components to bower_components ([01cee4ba](http://github.com/yeoman/generator-angular/commit/01cee4ba))

* **coffee:** syntax for minsafe directives ([62677ec0](http://github.com/yeoman/generator-angular/commit/62677ec0))

* **decorator:**

  * removed second dot in warning message ([6a89f8e5](http://github.com/yeoman/generator-angular/commit/6a89f8e5))
  * use [] instead of new Array() to initialize prompts (jsHint) ([360222a6](http://github.com/yeoman/generator-angular/commit/360222a6))

* **test:** Updated tests for new prompt ([64e57571](http://github.com/yeoman/generator-angular/commit/64e57571))

* **cli:** fix typo in angular:constant generator usage ([6cbb80fd](http://github.com/yeoman/generator-angular/commit/6cbb80fd))

<a name="v0.2.2"></a>
## v0.2.2 (2013-04-20)

#* **Features:**
* **build:** Integrate grunt-rev into build process (87bab71)

* **app:**

  * automatically install dependencies (9f95630)
  * add coffee option to Karma generator (e81b624)

* **misc:** add Grunt support to automate releases and changelogs (9daa50a)

#* **Bug Fixes:**
* **build:**

  * remove all files except git related on clean (21a0f43)

  * fix Bower error caused by incorrect templates. (0ab5448)

  * Moved duplicate grunt options into own section (3869ca8)

  * grunt-bower-hooks was renamed (3bbaacd)

  * Watch SVG files. Fixes generator-webapp#41 (45fe8ab)

  * display correct message when running npm/bower (3498aa1)

  * add Bootstrap reference when not using Compass (d123897)

  * add SVG files to Grunt rev task. (3c8daab)

  * Changed to shallow copy fonts (1f6b864)

  * Ignore test subfolder (a07627b)

  * finify bootstrap img (263ce61)

* **coffee:**

  * Fix compiling coffeescript files (71daa7f)

  * fix loading coffeescript tests (9692a21)

  * fix coffeescript directive test (aa2a9c0)

  * rewrite app.coffee file when called with --coffee (0f5256d)

* **app:**

  * Remove `process.cwd()` from CS detection (3a707f4)

  * use this.env.options.appPath (404c752)

  * use `installDependencies()` method (8369d9a)

  * invoke karma:app with `skip-install` option if defined (7e47dc2)

  * tag closing inconsistency (ref #177) (51bd8d8)

* **test:**

  * Use $scope in tests instead of {} (58603bd)

  * add Node 0.10 to travis file (60b1ea7)

* **gen:**

  * Fix controller spec generation (3bb58eb)

  * remove trailing comma in gruntfile. (32afa5a)

* **readme:**

  * add note to readme about making a node_modules dir until global generators are supported (73a2450)

  * add a note about running commands from the root app folder (f986c77)

  * switched to global generators (18ef336)

  * add note to readme about commit message conventions (d125dd2)

  * Improve readme (8262b93)

  * added documentation of route adding (7c5e03c)

  * Corrected file extension in example (a1149ea)

* **tests:** skip install on tests (5035d94)

<a name="v0.2.1"></a>
## v0.2.1 (2013-04-07)

#* **Features:**
* **build:** Integrate grunt-rev into build process (87bab71)

* **app:** automatically install dependencies (9f95630)

* **misc:** add Grunt support to automate releases and changelogs (9daa50a)



#* **Bug Fixes:**
* **build:**

  * remove all files except git related on clean (21a0f43)

  * fix Bower error caused by incorrect templates. (0ab5448)

  * Moved duplicate grunt options into own section (3869ca8)

  * grunt-bower-hooks was renamed (3bbaacd)

  * Watch SVG files. Fixes generator-webapp#41 (45fe8ab)

* **coffee:**

  * Fix compiling coffeescript files (71daa7f)

  * fix loading coffeescript tests (9692a21)

  * fix coffeescript directive test (aa2a9c0)

  * rewrite app.coffee file when called with --coffee (0f5256d)

* **app:**

  * Remove `process.cwd()` from CS detection (3a707f4)

* **test:**

  * Use $scope in tests instead of {} (58603bd)

* **gen:**

  * Fix controller spec generation (3bb58eb)

* **readme:**

  * add note to readme about making a node_modules dir until global generators are supported (73a2450)

  * add a note about running commands from the root app folder (f986c77)
