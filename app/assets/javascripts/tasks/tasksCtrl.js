app.controller('TaskCtrl', [
    '$scope',
    'projects',
    'project',
    function($scope, projects, project){
        $scope.project = project;


        $scope.addTask = function(){
            if($scope.body === '') { return; }
            projects.addTask(project.id, {
                body: $scope.body
            }).success(function(task) {
                $scope.project.tasks.push(task);
            });
            $scope.body = '';
        };
        $scope.incrementPriority = function(task) {
            projects.uprateTask(project, task);
        };
        $scope.decrementPriority = function(task) {
            if (task.priority <= 0) {return;}
            projects.derateTask(project, task);
        };
        $scope.markAsDone = function(task) {
            projects.markTaskAsDone(project, task);
        };
        $scope.deleteTask = function(task) {
            projects.deleteTask(project, task);
            var index = $scope.project.tasks.indexOf(task);
            $scope.project.tasks.splice(index, 1);
        };
        $scope.addCurrent = function(task) {
            $scope.curTask = task;
        };
        $scope.updateTask = function(task){
            if($scope.newBody === '') { return; }
            projects.updateTask(project, task, {
                body: $scope.newBody
            }).success(function(task) {

            });
            $scope.newBody = '';
        };
        $scope.updateDate = function(task){
            console.log($scope.taskDeadline);
            if($scope.taskDeadline === '') { return; }
            projects.updateDate(project, task, {
                deadline: $scope.taskDeadline
            }).success(function(task) {

            });
            $scope.taskDeadline = '';
        };
    }]);