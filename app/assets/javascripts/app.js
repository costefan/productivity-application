var app = angular.module('productivityApp', ['ui.router', 'templates', 'Devise']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/_home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['projects', function(projects){
                        return projects.getAll();
                    }]
                }
            })
            .state('project', {
                url: '/projects/{id}',
                templateUrl: 'tasks/_tasks.html',
                controller: 'TaskCtrl',
                resolve: {
                    project: ['$stateParams', 'projects', function($stateParams, projects) {
                        return projects.get($stateParams.id);
                    }]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'auth/_login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function (){
                        $state.go('home');
                    })
                }]
                })
            .state('register', {
                url: '/register',
                templateUrl: 'auth/_register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function (){
                        $state.go('home');
                    })
                }]
            });

        $urlRouterProvider.otherwise('home');
    }]);
