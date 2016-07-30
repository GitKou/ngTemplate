angular.module('routerApp')
    .controller('DemoModalCtrl', ['$scope', 'modalServ', function($scope, $modalServ) {
    	$scope.userName = "高淼淼";
    	$scope.close = function(){
    		$modalServ.dismiss();
    	}
    }]);