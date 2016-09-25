angular.module('recordsApp', [])
	.controller('recordsController', function($scope) {
		$scope.sortQuery = 'name';
		$scope.reverse = false;

		$scope.records = localStorage.getItem('Records');
		$scope.records = $scope.records ? JSON.parse($scope.records) : [];

		$scope.addRecord = function() {
			if ($scope.newName == undefined || $scope.newSurname == undefined || $scope.newAge == undefined) {
				return;
			}

			$scope.records.push({name: $scope.newName, surname: $scope.newSurname, age: +$scope.newAge});
			localStorage.setItem('Records', JSON.stringify($scope.records));

			$scope.newName = $scope.newSurname = $scope.newAge = undefined;
		};

		$scope.removeRecord = function(record) {
			var index = $scope.records.indexOf(record);
  		$scope.records.splice(index, 1);
  		localStorage.setItem('Records', JSON.stringify($scope.records));
		};
		
		$scope.sort = function(query) {
			if ($scope.sortQuery !== query) {
				$scope.reverse = false;
			} else {
				$scope.reverse = !$scope.reverse;
			}

			$scope.sortQuery = query;
		};
	});