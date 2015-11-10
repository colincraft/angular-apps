var app = angular.module("myApp", ["ngRoute", "ngAnimate", "ngResource"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/wines", {
        templateUrl: "templates/wines.html",
        controller: "showCtrl"
    })
    .when("/edit/:id", {
        templateUrl: "templates/edit.html",
        controller: "editCtrl",
    })
    .otherwise({
        redirectTo: "/wines"
    });
}]);


// app.factory("Wine", function($http){
//     var factory = {}
//     factory.getAll = function(){
//         return $http.get("http://daretodiscover.herokuapp.com/wines/")
//     }
//     factory.thisWine = function(id){
//         return $http.get("http://daretodiscover.herokuapp.com/wines/" + id)
//     };
//     factory.edit = function(id, data){
//         return $http.put("http://daretodiscover.herokuapp.com/wines/" + id, data)
//     };
//     factory.add = function(data){
//         return $http.post("http://daretodiscover.herokuapp.com/wines", data)
//     }


//     return factory;
// })
app.factory("Winez", function($resource){
    return $resource("http://daretodiscover.herokuapp.com/wines/:id", {
            id: "@id"
        }, {
            update: {
                method: "PUT"
            }
        });
})

app.controller("showCtrl", function($scope, $http, Winez){
    function getWines(){
    //     Wine.getAll()
    //     .success(function(wines){
    //         $scope.wines = wines
    //     })
    //     .error(function(){
    //         alert("Error getting wine!");
    //     })
    // }
    Winez.query(function(wines){
            $scope.wines = wines
        }, function(){
            alert("Error Getting Wine D:")
        });
    }

    getWines();

    $scope.submitWine = function(){
    //     Wine.add($scope.wineData)
    //     .success(function(){
    //         getWines();
    //     })
    //     .error(function(){
    //         alert("wrong")
    //     })
    //     $scope.wineData = ""
    // }
    Winez.save($scope.wineData,
        function(){
            getWines();
            $scope.wineData = ""
        }, function(){
            alert("Error adding a Wine!");
        });
    }
});


app.controller("editCtrl", function($scope, $routeParams, $http, $location, Winez){
    function getWine(){
        // Wine.thisWine($routeParams.id)
        // .success(function(wine){
        //     $scope.wine = wine;
        // })
        // .error(function(){
        //     alert("Error getting wine!");
        // })
    Winez.get({id: $routeParams.id},
        function(wine){
            $scope.wine = wine;
        }, function(){
            alert("Error getting your Wine!");
        }
        )
    };
    getWine();

    $scope.editWine = function(){
        // Wine.edit($routeParams.id, $scope.wine)
        // .success(function(){
        //     getWine();
        //     $location.path("/")
        // })
        // .error(function(){
        //     alert("fail");
        // })
        Winez.update({id: $routeParams.id},
            $scope.wine,
            function(){
                $location.path("/")
        }, function(){
            alert("Failed to update Wine.");
        })
            
        
    };
});