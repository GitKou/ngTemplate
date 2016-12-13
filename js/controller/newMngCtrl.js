angular.module('routerApp')
    .controller('newMngCtrl', ['$scope', 'modalServ', function ($scope, $modalServ) {
        //弹窗
        $scope.addItem = function () {
            $modalServ.open({
                templateUrl: './tpl/addLabelModal.html',
                controller: 'DemoModalCtrl'
            });
        }
        //标签
        $scope.usedTags = ['聪明', '勤奋', '好学'];
        $scope.tags = [];


        // 生成tbody

        $scope.datalist = [{ name: 'gmm', age: 1 }, { name: 'fyc', age: 2 }];
        $scope.theadData = ['name'];

        var tbody = null;
        $scope.initTbody = function (ele) {
            // 通过指令的回调获取指令中初始化的table示例
            tbody = ele;
            tbody.initData({
                datalist: $scope.datalist,
                theadData:  $scope.theadData,
                isCheckable: true
            });
        }

        $scope.selectAllProducts = function () {
            tbody.selectAllItems();
        }

        $scope.reverseProducts = function () {
            tbody.reverseItems();
        }
        $scope.unSelectAllProducts = function () {
            tbody.unselectAllItems();
        }
        $scope.getSelectedItems = function () {
            $scope.selectedItems = tbody.getSelectedItems();

        }
        $scope.changData = function () {
            $scope.datalist = [{ name: 'dsd', age: 1 }, { name: 'fxcyc', age: 2 }, { name: 'ds', age: 3 }];
            tbody.initData({
                datalist: $scope.datalist,
                theadData: ['name', 'age']
            });
        }



    }]);
