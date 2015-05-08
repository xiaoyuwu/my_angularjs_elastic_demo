var elasticDemo= angular.module('elasticDemo', [
	'ngRoute',
	'elasticDemoControllers',
	'elasticsearch'
]);

elasticDemo.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	  when('/lines', {
	  	templateUrl: 'partials/lines.html',
	  	controller: 'LinesCtrl'
	  }).
	  otherwise({
	  	redirectTo: '/lines'
	  });	
}]);
