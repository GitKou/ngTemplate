angular.module('routerApp')
    .controller('newMngCtrl', ['$scope', 'modalServ', 'logInfo', function ($scope, $modalServ, LogInfo) {
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


        var tbody = null;
        $scope.initTbody = function (ele) {
            // 通过指令的回调获取指令中初始化的table示例
            tbody = ele;
            // tbody.initData({
            //     datalist: datalist,
            //     theadData: theadData,
            //     isCheckable: true
            // });
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

        function getDatalist() {
            LogInfo.getDatalist().then(function (datalist) {
                console.log(datalist.result.length);
                // $scope.datalist = datalist.result;
                tbody.initData({
                    datalist: datalist.result,
                    theadData: ['purchaseOrder', 'supplierCode', 'supplierName', 'orderType'],
                    isCheckable: true
                });
            }, function () {

            });


        }

        getDatalist();

    }]);
