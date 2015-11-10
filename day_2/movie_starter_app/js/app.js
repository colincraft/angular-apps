var app = angular.module("movieApp", []);

app.directive("movieSearch",function(){
    return{
        templateUrl: "templates/search.html",
        controller: "searchCtrl"
    }
});

app.factory("movieFactory", function($http){
    var factory = {}
    factory.query = function(movie){
        return $http.get("http://www.omdbapi.com/?t=" + movie)
    }
    return factory;
});

app.controller("searchCtrl",function($scope, movieFactory){
    $scope.movieSearch = function(){
        movieFactory.query($scope.movieQuery)
        .success(function(movie){
            $scope.movie = movie;
            $scope.toggle = true;
        })
        .error(function(){
            alert("nope.")
        })
    }
});