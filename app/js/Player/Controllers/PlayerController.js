module.exports = function($scope, $routeParams){
	var self = this;

	console.log($routeParams);

	self.init = function () {
        console.log($routeParams)
    };
}