app.controller('MainCtrl', [
    '$scope',
    'projects',
    function($scope, projects){
        $scope.projects = projects.projects;
        $scope.addProject = function(){
            if(!$scope.title || $scope.title === '') { return; }
            projects.create({
                title: $scope.title
            });
            $scope.title = '';
        };
        $scope.addCurrentProject = function(project) {
            $scope.curProject = project;
        };
        $scope.updateProject = function(project){
            if($scope.newTitle === '') { return; }
            projects.updateProject(project, {
                title: $scope.newTitle
            }).success(function(project) {

            });
            $scope.newTitle = '';
        };
        $scope.deleteProject = function(project) {
            projects.deleteProject(project);
            var index = $scope.projects.indexOf(project);
            $scope.projects.splice(index, 1);
        };
    }]);
