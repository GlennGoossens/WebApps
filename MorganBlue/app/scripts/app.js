'use strict';

/**
 * @ngdoc overview
 * @name morganBlueApp
 * @description
 * # morganBlueApp
 *
 * Main module of the application.
 */
angular
  .module('morganBlueApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MainCtrl',
        controllerAs: 'index'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
