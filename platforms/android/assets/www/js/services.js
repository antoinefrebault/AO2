angular.module('uploadService', [])


.factory('upload', function($http) {


	var uploadFactory = {};

	

	uploadFactory.create = function(adData) {
		return $http.post('http://162.243.19.27:8000/api/systems', adData);
	}





	return uploadFactory;



})