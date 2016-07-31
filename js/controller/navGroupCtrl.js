'use strict';

/**
 * @ngdoc directive
 * @author gmm
 * @name adminApp.directive:navgroup
 * @description
 * # navgroup
 */
angular.module('routerApp')
    .controller('GlobalNavCtrl', ['$scope', '$rootScope', '$state', 'routerConfig', 'logInfo', function($scope, $rootScope, $state, RouterConfig, LogInfo) {
        /*路由切换，也可以在html中用sref*/
        $scope.go = function(state, params) {
            // if ($scope.currentState === state) {
            //     return;
            // };
            var dParams = { rnd: new Date().getTime() };
            if (params) {
                $.extend(dParams, params);
            }
            $state.go(state, dParams);
        };

        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        //     $scope.currentState = toState.name;
        // });
    }])
    .directive('nav', ['$state', '$rootScope', '$timeout', 'logInfo', 'routerConfig', function($state, $rootScope, $timeout, LogInfo, RouterConfig) {
        return {
            restrict: 'A',
            // controller: 'GlobalNavCtrl',
            template: '<div ng-repeat="group in groups">\
                    <a class="nav-item nav-title nav-level1 js-group-title" href="javascript:void(0);" ng-click="showNavWrap($event)">{{group.name}}</a>\
                    <div class="nav-wrap js-group-wrap">\
                        <a ng-repeat="item in group.children" nav-module="demo-navbar" ng-click="go(item.url, item.params);" class="nav-item nav-link nav-level1" href="javascript:void(0);">{{item.name}}</a>\
                    </div>\
                </div>',
            link: function($scope, tElem, tAttrs, ctrl) {
                /*收展动画*/
                $scope.showNavWrap = function(e) {
                    var ele = $(e.target).next('.js-group-wrap');
                    ele.slideToggle(200);
                };
                /*获取logInfo.do中可以访问的导航页面*/
                function getLogInfo() {
                    LogInfo.getLogInfo().then(function(data) {
                        $scope.groups = RouterConfig.getNavList([].concat(data.permList));
                    });
                }
                getLogInfo();

            }
        };
    }]);
