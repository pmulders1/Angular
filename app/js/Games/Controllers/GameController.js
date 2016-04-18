module.exports = function($scope, GameFactory){
	$scope.games;
	$scope.status;
	$scope.message = "test"
	getGames();

	function getGames(){
		GameFactory.getGames('?state=open').then(function (response) {
		    $scope.games = response.data;
		}, function (error) {
		    $scope.status = 'Unable to load customer data: ' + error.message;
		});
	}
}