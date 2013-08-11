///<reference path='../bower_components/DefinitelyTyped/angularjs/angular.d.ts'/>

/*
 * tsc seems to have a new bug where .d.ts files listed in the list of files to
 * compile do not actually get loaded, unless they are ///<reference'd by a .ts file.
 * So, to work around the problem, we now have a .ts file that lists all the references,
 * instead of listing them in the src list in the configuration of the typescript task.
 */
