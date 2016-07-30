'use strict';

/**
 * @ngdoc directive
 * @name adminApp.directive:chart
 * @author gmm
 * @description
 * # chart
 */
angular.module('routerApp')
    .directive('modal', [function() {
        return {
            restrict: 'AE',
            scope: {},
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || 'some/path/default.html'
            },
            link: function($scope, element, attrs) {
            	// 点击遮罩层消失
                $('.modal-window').on('click', function(){
                	$(this).remove();
                });
                $('.modal-window :first-child').on('click', function(event) {
                    event.stopPropagation();
                });
            },
            controller: '@',
            name: 'myCtrl'
        };
    }]);
