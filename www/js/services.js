angular.module('chartService', [])


.factory('chart', function($http) {


	var uploadFactory = {};

	

	uploadFactory.create = function() {
		return $http.get('http://localhost:8000/api/info');
	}





	return uploadFactory;



})