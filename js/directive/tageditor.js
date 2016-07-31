'use strict';

/**
 * @ngdoc directive
 * 
 * @author gmm
 * @name adminApp.directive:tageditor
 * @description
 * # tageditor
 */
angular.module('routerApp')
    .directive('tageditor', function() {
        return {
            restrict: 'AE',
            template: '<div class="tag-editor">\
						    <div class="tokens clearfix" ng-click="focusOnInput()">\
						        <span class="token" ng-repeat="tag in tagArr" ng-click="delTag(tag)" ng-mousedown="notMoveFoucs($event)">{{tag}}</span>\
						        <div class="ipt-wrap clearfix">\
						            <input type="text" class="tag-input" ng-model="tagInput" ng-keyup="addTag($event)" ng-blur="hideTagWrap()" ng-focus="showTagWrap()" ng-style="iptLength" maxlength="6">\
						            <label ng-show="isTipValid()">添加相关标签，用逗号或回车分隔</label>\
						            <span class="hide-calc-len"></span>\
						        </div>\
						    </div>\
						    <div class="used-tag-wrap clearfix" ng-show="isValidWrap && usedTags" ng-mousedown="notMoveFoucs($event)">\
						        <span class="used-token" ng-repeat="usedTag in usedTags" ng-click="useTag(usedTag)">{{usedTag}}</span>\
						    </div>\
						</div>',
            scope: {
                usedTags: "=",
                tagArr: "=tags"
            },
            link: function($scope) {
                $scope.tagInput = "";
                $scope.isValidWrap = false;
                $scope.iptLength = {};

                /**点击tokens时聚焦到input**/
                $scope.focusOnInput = function() {
                    $(".tag-input").focus();
                    $scope.isValidWrap = true;
                };


                $scope.addTag = function($event) {
                    /**回车时，往标签数组tagArr中新增当前标签，并清空当前input的值tagInput**/
                    if ($event.keyCode == 13) {
                        /**不可输输入重复内容或空字符串，负责repeat时index会出错**/
                        if ($scope.tagInput != "" && $scope.tagArr.indexOf($scope.tagInput) == -1) {
                            $scope.tagArr.push($scope.tagInput);
                        }
                        /**ng-model默认去首尾空格，原生保平安**/
                        $(".tag-input").val("");
                        $scope.tagInput = "";
                    }
                    /**删除时，input无内容时，从标签数组tagArr中删除最后一项标签**/
                    if ($event.keyCode == 8) {
                        if ($scope.tagInput == "") {
                            $scope.tagArr.pop();
                        }
                    }
                    /**输入时，自适应input宽度**/
                    $(".hide-calc-len").text($(".tag-input").val());
                    $scope.iptLength = { "width": $(".hide-calc-len").width() + "px" };

                };
                /**点击删除tag**/
                $scope.delTag = function(tag) {
                    $scope.tagArr.splice($scope.tagArr.indexOf(tag), 1);
                };

                /**是否显示提示文字，有标签或input有文字的时候不显示**/
                $scope.isTipValid = function() {
                    /**中文输入还在输入法时，ng-model还没被赋值，原生保平安**/
                    if ($scope.tagArr.length != 0 || $(".tag-input").val() != "") {
                        return false;

                    } else {
                        return true;
                    }
                };

                /**input聚焦时显示使用过的标签usedTagWrap**/
                $scope.showTagWrap = function() {
                    $scope.isValidWrap = true;
                };
                $scope.hideTagWrap = function() {
                    $scope.isValidWrap = false;
                };

                /**点击选中使用的tag**/
                $scope.useTag = function(usedTag) {
                    if ($scope.tagArr.indexOf(usedTag) == -1) {
                        $scope.tagArr.push(usedTag);
                    }
                };

                /**当点击input之外的tagwrap和token的时候，阻止默认行为，防止input失去焦点**/
                $scope.notMoveFoucs = function($event) {
                    $event.preventDefault();
                };
            }
        };
    });
