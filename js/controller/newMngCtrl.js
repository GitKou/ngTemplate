angular.module('routerApp')
    .controller('newMngCtrl', ['$scope', 'modalServ', function($scope, $modalServ) {
        //弹窗
        $scope.addItem = function() {
            $modalServ.open({
                templateUrl: './tpl/addLabelModal.html',
                controller: 'DemoModalCtrl'
            });
        }
        //标签
        $scope.usedTags = ['聪明', '勤奋', '好学'];
        $scope.tags = [];

    }]);
