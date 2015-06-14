var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', "xeditable"]);

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
        }).state('graph', {
            url: '/graph',
            views: {
                "navbar":{
                    templateUrl: "header.html",
                    controller: 'homeController'
                },
                "content":{
                    templateUrl: "graph.html"
                }
            }
        }).state('doctor_add', {
            url: '/add',
            views: {
                "navbar":{
                    templateUrl: "doctor/doctor_header.html",
                    controller: 'doctorController'
                },
                "content":{
                    templateUrl: "doctor/add.html",
                    controller: 'doctorAddController'
                }
            }
        })
        .state('doctor_view', {
            url: '/view',
            views: {
                "navbar": {
                    templateUrl: "doctor/doctor_header.html",
                    controller: 'doctorController'
                },
                "content": {
                    templateUrl: "doctor/view.html",
                    controller: 'doctorViewController'
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

// set theme for x-editable
myApp.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
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
                    $state.go('doctor_add');
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

    $scope.removeUser = function (index) {
        $http.post('database/remove_user.php', {
            id: $scope.users[index].id
        })
            .success(function (data, status, headers, config) {
                alert(data);
            });
        $scope.users.splice(index, 1);
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

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadPatients();
    });

    $scope.loadPatients = function(){
        $http.post('database/load_patient.php')
            .success(function(data){
                $scope.patients = data;
            });
    };

    $scope.savePatient = function (data, patient_id) {
        angular.extend(data, {patient_id: patient_id});
        $http.post('database/save_patient.php', data)
            .success(function(result){
                console.log(result);
                if (result == patient_id) {
                    console.log("Change Patient successful");
                } else {
                    console.log("Save failed");
                }
            })
    };

    //$scope.addPatient = function(){
    //    $http.post('database/add_patient.php',{id:$scope.id,name:$scope.name,surname:$scope.surname,telno:$scope.telephone_num,sex:$scope.selectedItem,congi_disease:$scope.congi_disease,age:$scope.age})
    //        .success(function(result){
    //            console.log(result);
    //            $scope.patients.push(result[0]);
    //        })
    //};

    $scope.removePatient = function (index) {
        $http.post('database/remove_patient.php', {
            id: $scope.patients[index].id
        })
            .success(function (data, status, headers, config) {
                alert(data);
            });
        $scope.patients.splice(index, 1);
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
});

myApp.controller('configController',function($scope){
    $scope.item = "age";

    $scope.presetHB = function(){
        //$http.post('database/preset.php')
        //    .success(function(data){
        //        console.log(data);
        //    });
        switch($scope.item){
            case "a" :
                $scope.min = 120;
                $scope.max = 160;
                break;
            case "b" :
                $scope.min = 80;
                $scope.max = 140;
                break;
            case "c" :
                $scope.min = 80;
                $scope.max = 130;
                break;
            case "d" :
                $scope.min = 75;
                $scope.max = 120;
                break;
            case "e" :
                $scope.min = 75;
                $scope.max = 110;
                break;
            case "f" :
                $scope.min = 60;
                $scope.max = 100;
                break;
            default :

        }
    }
});

myApp.controller('doctorAddController', function ($scope) {
    $scope.selectedItem = "Male";

    $scope.sex = ["Male", "Female"];

    $scope.addPatient = function () {
        $http.post('database/add_patient.php', {
            id: $scope.id,
            name: $scope.name,
            surname: $scope.surname,
            telno: $scope.telephone_num,
            sex: $scope.selectedItem,
            congi_disease: $scope.congi_disease,
            age: $scope.age
        })
            .success(function (result) {
                console.log(result);
                $scope.patients.push(result[0]);
            })
    };
});

myApp.directive('showTab',
    function(){
        return {
            link : function(scope,element,attrs){
                element.click(function(e){
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        }
    });