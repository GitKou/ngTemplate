angular.module('routerApp')
    .controller('newUserCtrl', ['$scope', 'modalServ', function($scope, $modalServ) {
        $scope.addItem = function() {
            $modalServ.open({
                templateUrl: './tpl/addLabelModal.html',
                controller: 'DemoModalCtrl'
            });
        }

    }]);
