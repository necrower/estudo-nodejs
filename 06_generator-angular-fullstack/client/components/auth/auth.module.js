'use strict';

angular.module('fullstackAApp.auth', ['fullstackAApp.constants', 'fullstackAApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
