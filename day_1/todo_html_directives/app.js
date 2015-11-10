var app = angular.module("myApp", []);



app.directive("toDo", function(){
  return {
    templateUrl: "templates/directives/todo.html",
    controller: "toDoCtrl",
    restrict: "E"
  }
});


app.controller("toDoCtrl", function($scope){
  $scope.items = [];
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