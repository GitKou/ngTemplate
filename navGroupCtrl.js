'use strict';

/**
 * @ngdoc directive
 * @author gmm
 * @name adminApp.directive:navgroup
 * @description
 * # navgroup
 */
angular.module('routerApp')
    .controller('GlobalNavCtrl', ['$scope', '$state', 'routerConfig', 'logInfo', function($scope, $state, RouterConfig, LogInfo) {
        $scope.go = function(state, params) {
            if ($scope.currentState === state) {
                return;
            };
            var dParams = { rnd: new Date().getTime() };
            if (params) {
                $.extend(dParams, params);
            }
            $state.go(state, dParams);
        };
    }])
    .directive('nav', ['$state', '$rootScope', '$timeout', 'logInfo', 'routerConfig', function($state, $rootScope, $timeout, LogInfo, RouterConfig) {
        return {
            restrict: 'A',
            // controller: 'GlobalNavCtrl',
            template: '<div ng-repeat="group in groups">\
                    <a class="nav-item nav-title nav-level1 js-group-title" href="javascript:void(0);" ng-click="showNavWrap($event)">{{group.name}}</a>\
                    <div class="nav-wrap js-group-wrap">\
                        <a ng-repeat="item in group.children" nav-module="demo-navbar" ng-click="go(item.url);" class="nav-item nav-link nav-level1" href="javascript:void(0);">{{item.name}}</a>\
                    </div>\
                </div>',
            link: function($scope, tElem, tAttrs,ctrl) {
                $scope.showNavWrap = function(e) {
                    var ele = $(e.target).next('.js-group-wrap');
                    ele.slideToggle(200);
                };
                function getLogInfo() {
                    LogInfo.getLogInfo().then(function(data) {
                        $scope.groups = RouterConfig.getNavList([].concat(data.permList));
                    });
                }
                getLogInfo();

            }
        };
    }]);
