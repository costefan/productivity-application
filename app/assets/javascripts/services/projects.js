app.factory('projects', [
    '$http',
    function ($http) {
        var o = {
            projects: []
        };
        o.getAll = function () {
            return $http.get('/projects.json').success(function (data) {
                angular.copy(data, o.projects);
            });
        };
        o.create = function(project) {
            return $http.post('/projects.json', project).success(function(data){
                o.projects.push(data);
            });
        };
        o.get = function(id) {
            return $http.get('/projects/' + id + '.json').then(function(res){
                return res.data;
            });
        };
        o.addTask = function(id, task) {
            return $http.post('/projects/' + id + '/tasks.json', task);
        };
        o.uprateTask = function(project, task) {
            return $http.put('/projects/' + project.id + '/tasks/'+ task.id + '/uprate.json')
                .success(function(data){
                    task.priority += 1;
                });
        };
        o.derateTask = function(project, task) {
            return $http.put('/projects/' + project.id + '/tasks/'+ task.id + '/derate.json')
                .success(function(data){
                    task.priority -= 1;
                });
        };
        o.markTaskAsDone = function(project, task) {
            return $http.put('/projects/' + project.id + '/tasks/'+ task.id + '/done.json')
                .success(function(data){
                    task.done = true;
                });
        };
        o.deleteTask = function(project, task) {
            return $http.delete('/projects/' + project.id + '/tasks/'+ task.id + '.json')
                .success(function(data){
                    task = undefined;
                });
        };
        o.updateTask = function(project, task, newBody) {
            return $http.patch('/projects/' + project.id + '/tasks/'+ task.id + '.json', newBody)
                .success(function(data){
                    task.body = newBody.body;
                });
        };
        o.updateProject = function(project, newTitle) {
            return $http.patch('/projects/' + project.id + '.json', newTitle)
                .success(function(data){
                    project.title = newTitle.title;
                });
        };
        o.updateDate = function(project, task, newDate) {
            return $http.patch('/projects/' + project.id + '/tasks/'+ task.id + '/date.json', newDate)
                .success(function(data){
                    task.deadline = newDate.deadline;
                });
        };
        o.deleteProject = function(project) {
            return $http.delete('/projects/' + project.id + '.json')
                .success(function(data){
                    project = undefined;
                });
        };
        return o;
    }]);
