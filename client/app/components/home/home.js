import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import ngSanitize from 'angular-sanitize';
import ngQuill from 'ng-quill';

let homeModule = angular.module('home', [
	uiRouter, 'ngSanitize', 'ngQuill'
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
