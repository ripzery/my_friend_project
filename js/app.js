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

myApp.controller('homeController',function($scope,$state){
    $scope.login = function(){
        console.log("/login");
        $state.go('admin');
    };

});

myApp.controller('adminController',function($scope,$state){
    $scope.logout = function(){
        console.log("/logout");
        $state.go('index');
    };
});