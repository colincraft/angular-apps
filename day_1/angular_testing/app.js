var app = angular.module("myApp", ["ngRoute", "ngAnimate", "ngResource"]);

// ROUTE CONFIG
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/page1", {
            templateUrl: "templates/page1.html",
            controller: "testCtrl"
        })
        .when("/page2/:name", {
            templateUrl: "templates/page2.html",
            controller: "page2Ctrl",
        })
        .otherwise({
            redirectTo: "/page1"
        });
}]);

app.directive("testDirective", function(){
    return {
        templateUrl: "templates/directives/test-dir.html",
        controller: "directiveCtrl",
        // restrict: "AE"
    }
});

// SAMPLE FACTORIES
// app.factory("testFactory", function(){
//     var factory = {};
//     factory.helloWorld = function(){
//         alert("Hello World!")
//     }
//     return factory;
// });

// MODEL
// app.factory("User", function($http){
//     var factory = {}
//     factory.getAll = function(){
//         // returns a promise, needs resolve or reject from the controller
//         return  $http.get("http://daretodiscover.herokuapp.com/users");
//     }
//     factory.save = function(data){
//         return $http.post("http://daretodiscover.herokuapp.com/users", data);
//     }
//     return factory;
// })
app.factory("User", function($resource){
        return $resource("http://daretodiscover.herokuapp.com/users/:id", {
            id: "@id"
        }, {
            update: {
                method: "PUT"
            }
        });
});

// CONTROLLERS

app.controller("directiveCtrl", function($scope){
    $scope.sayHello = function(){
        alert("Hello!")
    }
});


app.controller("page2Ctrl", function($scope, $routeParams){
    $scope.name = $routeParams.name;
});

// Attach controller to the module
app.controller("testCtrl", function($scope, $http, User){
$scope.userText = "Hello World!";

// calling the factory function helloWorld
// testFactory.helloWorld();

function userGet(){
//     User.getAll()
//         .success(function(users){
//             $scope.users = users
//         })
//         .error(function(){
//             alert("Error getting users")
//         });
// }
    User.query(function(users){
        // first parameter is success, second parameter is failure
        $scope.users = users
        }, function(){
            alert("error");
        });
    }
userGet();



$scope.submitUser = function(){
    // User.save($scope.userData)
    //     .success(function(userData){
    //         userGet();
    //     })
    //     .error(function(){
    //         alert("Error getting users")
    //     });

// first parameter is the data to save, second is success callback , third is failure callback function
    User.save($scope.userData, 
        function(){
             userGet();
         },function(){
            alert("error");
        });
    }
});