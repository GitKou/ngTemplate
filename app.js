var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index1', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpl/container.html'
                },
                'topbar@index1': {
                    templateUrl: 'tpl/topbar.html'
                },
                'main@index1': {
                    templateUrl: 'tpl/main.html'
                }
            }
        })
        .state('index1.usermng', {
            url: '/usermng',
            views: {
                'main@index1': {
                    templateUrl: 'tpl/usermng.html',
                    controller: 'newMngCtrl'
                }
            }
        })
        .state('index1.usermng.newuser', {
            url: '/newuser',
            templateUrl: 'tpl/newuser.html'
        })
        .state('index1.usermng.userinfo', {
            url: '/userinfo',
            templateUrl: 'tpl/userinfo.html'
        })
        .state('index1.usermng.useranla', {
            url: '/useranla',
            templateUrl: 'tpl/useranla.html',
            params: { 'rnd': 213 }
        })
        .state('index1.permission', {
            url: '/permission',
            views: {
                'main@index1': {
                    templateUrl: 'tpl/permission.html'
                }
            }
        })
});
