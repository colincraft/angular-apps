var app = angular.module("myApp", []);

app.controller("myController", function($scope){


$scope.items = [
];
var todoId = 0;

$scope.submitTodo = function(){
  $scope.items.push({
      id: todoId,
      todo: $scope.todo
    });
  $scope.todo = "";
  todoId++;
  }
});