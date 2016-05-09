module.exports = function($scope, GameService, $routeParams) {
    var game = GameService.getGameById($routeParams.gameId);
    $scope.game = game;
}