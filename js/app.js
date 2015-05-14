var myApp = angular.module('myApp', ['ui.router']);

// define route and controller for each view
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                "navbar":{
                    templateUrl: "header.html",
                    controller: 'homeController'
                },
                "content":{
                    templateUrl: "home.html"
                }
            }

        })
        .state('admin', {
            url: '/admin',
            views: {
                "navbar":{
                    templateUrl: "admin/admin_header.html",
                    controller: 'adminController'
                },
                "content":{
                    templateUrl: "admin/admin.html"
                }
            }
        });
});

myApp.controller('homeController',function($scope,$state,$http){
    $scope.login = function(){
        console.log("/login");

    $http.post('database/login.php',{username: $scope.username, password: $scope.password })
        .success(function (result) {
            switch (result){
                case "admin":
                    console.log("Logged in as admin");
                    $state.go('admin');
                    break;
                case "doctor":
                    console.log("Logged in as doctor");
                    break;
                default:
                    console.log("Logged in failed");
                    break;
            }
        });
    };

});

myApp.controller('adminController',function($scope,$state,$http){
    // logging out and redirect to login page
    $scope.logout = function () {
        $http.post('database/logout.php')
            .success(function (data) {
                if (data == "success") {
                    $state.go('index');
                }
            });
    };
});