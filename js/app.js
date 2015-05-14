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

        }).state('doctor', {
            url: '/doctor',
            views: {
                "navbar":{
                    templateUrl: "doctor/doctor_header.html",
                    controller: 'doctorController'
                },
                "content":{
                    templateUrl: "doctor/doctor.html",
                    controller: 'doctorController'
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
                    templateUrl: "admin/admin.html",
                    controller: 'adminController'
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
                    $state.go('doctor');
                    break;
                default:
                    console.log("Logged in failed");
                    break;
            }
        });
    };

});

myApp.controller('adminController',function($scope,$state,$http){
    $scope.selectedItem = "admin";
    $scope.status = ["admin","doctor"];

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadUsers();
    });

    $scope.loadUsers = function(){
        $http.post('database/load_users.php')
            .success(function(data){
                $scope.users = data;
            });
    };

    // logging out and redirect to login page
    $scope.logout = function () {
        $http.post('database/logout.php')
            .success(function (data) {
                if (data == "success") {
                    $state.go('index');
                }else{
                    console.log("fail");
                    $state.go('index');
                }
            });
    };

    $scope.addDoctor = function(){
        $http.post('database/add_doctor.php',{username:$scope.username,password:$scope.password,status:$scope.selectedItem})
            .success(function(result){
                console.log(result);
                $scope.users.push(result[0]);
            })
    }
});

myApp.controller('doctorController',function($scope,$state,$http){

});