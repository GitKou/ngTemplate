'use strict';

angular.module('routerApp')
    .service('common', ['$q', '$http',
        function($q, $http) {
            var service = {
                contextPath: '/ui-router',
                get: function() {
                    var argArr = arguments;
                    var defer = $q.defer();
                    defer.promise.success = function(fn) {
                        defer.promise.then(function(response) {
                            if (response[0].code == 401) {
                                //登录过期
                                window.location.href = "/";
                                return;
                            }

                            if (response[0].code != 200) {
                                alter(response[0].message || '操作失败');
                                return;
                            }
                            fn(response[0], response[1], response[2], response[3]);
                        });
                        return defer.promise;
                    };
                    defer.promise.error = function(fn) {
                        defer.promise.then(null, function(response) {
                            var curTime = new Date().getTime();
                            //1s以内的连续网络错误不提示
                            if ((curTime - lastNetErrorTime) >= 1000) {
                                alter("请求失败！");
                                lastNetErrorTime = curTime;
                            }
                            fn(response[0], response[1], response[2], response[3]);
                        });
                        return defer.promise;
                    };
                    var url = argArr[0];
                    var params = argArr[1] || {};
                    var cache = params.cache;
                    if (cache && cache.get(url)) {
                        //如果已缓存，则取缓存的数据
                        defer.resolve(cache.get(url));
                    } else {
                        //禁用ie下缓存
                        if (url.indexOf("?") > -1)
                            var url2 = url + "&__searchtime=" + new Date().getTime();
                        else
                            var url2 = url + "?__searchtime=" + new Date().getTime();
                        $http.get(url2, { params: params }).success(function() {
                            defer.resolve(arguments);
                            //如果用户主动缓存，则加入缓存
                            if (params.cache)
                                params.cache.put(url, arguments);
                        }).error(function() {
                            defer.reject(arguments);
                        });
                    }
                    return defer.promise;
                },
                post: function() {
                    var argArr = arguments;
                    var defer = $q.defer();
                    defer.promise.success = function(fn) {
                        defer.promise.then(function(response) {
                            if (response[0].code == 401) {
                                //登录过期:页面跳转
                                location.href = "/CMS/web/login.do";
                                return;
                            }
                            if (response[0].code != 200) {
                                alter(response[0].message || '操作失败');
                                return;
                            }

                            fn(response[0], response[1], response[2], response[3]);
                        });
                        return defer.promise;
                    };
                    defer.promise.error = function(fn) {
                        defer.promise.then(null, function(response) {
                            var curTime = new Date().getTime();
                            //1s以内的连续网络错误不提示
                            if ((curTime - lastNetErrorTime) >= 1000) {
                                alter("请求失败！");
                                lastNetErrorTime = curTime;
                            }
                            fn(response[0], response[1], response[2], response[3]);
                        });
                        return defer.promise;
                    };
                    $http.post(argArr[0], argArr[1] || {}).success(function() {
                        defer.resolve(arguments);
                    }).error(function() {
                        defer.reject(arguments);
                    });
                    return defer.promise;
                }
            };
            return service;
        }
    ]);
