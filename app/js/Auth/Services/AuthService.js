angular.module('webs6').factory('AuthService', function ($location) {
    return function () {
        console.log("test");
        $location.path('/');
    }
});