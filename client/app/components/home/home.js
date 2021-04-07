import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import * as Quill from 'quill';

let homeModule = angular.module('home', [
  uiRouter, Quill
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.component('home', homeComponent)
  
.name;

export default homeModule;
