module.exports = function($scope, $rootScope){
	var self = this;
	$scope.themes = ['indie', 'titillium', 'montserrat', 'josefin', 'architects'];
	$rootScope.currentTheme = "titillium";
	$scope.message = "Welkom op de Majong website van Paul Mulders en Quinn van Haastrecht";
}