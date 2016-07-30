'use strict';

/**
 * @ngdoc service
 * @name routerApp.module
 * @author gmm
 * @description
 * # module
 * Service in the adminApp.
 */
angular.module('routerApp')
    .service('routerConfig', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        var navList = [{
            "name": "用户",
            "children": [{
                "name": "新建用户",
                "url": "index1.usermng.newuser",
                "permId": 1
            }, {
                "name": "用户列表",
                "url": "index1.usermng.userinfo",
                "permId": 2
            }]
        }, {
            "name": "数据统计",
            "children": [{
                "name": "用户分析",
                "url": "index1.usermng.useranla",
                "permId": 3
            }]
        }];

        var service = {
            getNavList: function(permList) {
                var temp_navList = [].concat(navList),
                    navLength = navList.length;

                for (var i = 0; i < navLength; i++) {
                    for (var j = 0; j < navList[i].children.length; j++) {
                        var indexOfPermId = permList.indexOf(navList[i].children[j].permId);
                        if (indexOfPermId == -1) {
                            temp_navList[i].children.splice(indexOfPermId, 1);
                        }
                    }
                }
                return temp_navList;
            }
        };

        return service;
    }])
    .service('logInfo', ['$http', '$q', '$rootScope', 'common', function($http, $q, $rootScope, Common) {

        var logInfoUrl = '/xhr/logInfo.do'

        var servie = {
            /**
             *获取用户登录信息
             *@param name
             *@param permList
             * @return {[defer]}
             **/
            getLogInfo: function(params) {
                var defer = $q.defer();
                Common.post(Common.contextPath + logInfoUrl, params).success(function(res) {
                    if (res.code == 200) {
                        defer.resolve(res.data);
                    }
                }).error(function() {
                    defer.reject();
                });
                return defer.promise;
            }
        };
        return servie;
    }]);
