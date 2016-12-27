'use strict'

/**
 * @ngdoc directive
 * @name adminApp.directive:shark-tbody
 * @author gmm
 * @description Instead of using ng-repeat, we use the jquery pluging 'shark-tbody' to create a sharkTbody when the amount of data is huge 
 * # chart
 */
angular.module('routerApp')
    .directive('sharkTbody', function () {
        return {
            restrict: 'AE',
            scope: {
                initTbody: '&'
            },
            link: function ($scope, ele, attr) {
                // ele.sharkTbody(ele);
                // 向父scope返回该tbody对象
                // $scope.initTbody = $scope.initTbody();
                // $scope.initTbody(ele);

                var tbody = ele.sharkTbody();
                $scope.$parent.initTbody(tbody);

            }
        };
    });
