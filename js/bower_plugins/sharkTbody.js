/**
*表格生成插件
*author gmm
*2016/12/10
*/
(function ($) {

    /* 初始化表单数据
      * @params datalist {array} 对象数组
      * @params theadData {array} 筛选用数组
      * @params isCheckable {boolean} 是否可勾选 
     */
    function _createElements(ele, theadData, datalist, isCheckable) {
        var tbody = $('<tbody></tbody>');
        for (var i = 0; i < datalist.length; i++) {
            var tr = $('<tr/>');
            for (var j = 0; j < theadData.length; j++) {
                var td = $('<td/>');
                if (j == 0 && isCheckable) {
                    var checkbox = $('<input type="checkbox"  class="js-checkbox"/>');
                    var checkTd = $('<td/>');
                    checkTd.append(checkbox);
                    tr.append(checkTd);
                }
                td.text(datalist[i][theadData[j]]);
                tr.append(td);
            }
            tbody.append(tr);
        }
        ele.html('').append(tbody);
    }

    $.fn.extend({
        sharkTbody: function () {
            var tbody = $(this);
            var defaults = {
                datalist: [],
                theadData: [],
                isCheckable: false
            };
            var args = {};
            
            tbody.initData = function (options) {
                args = $.extend(defaults, options);
                _createElements(tbody, args.theadData, args.datalist, args.isCheckable);
            }
            tbody.selectAllItems = function (data) {
                tbody.find('.js-checkbox:not(:checked)').prop('checked', true);

            }
            tbody.unselectAllItems = function () {
                tbody.find('.js-checkbox:checked').prop('checked', false);
            }
            tbody.reverseItems = function () {
                tbody.find('.js-checkbox').each(function (i, e) {
                    $(this).prop('checked', !$(this).is(':checked'));
                });
            }
            tbody.getSelectedItems = function () {
                var selectedItems = [];
                tbody.find('.js-checkbox').each(function (i, e) {
                    if ($(this).is(':checked')) {
                        selectedItems.push(args.datalist[i]);
                    }
                });
                return selectedItems;
            }

            return tbody;
        }
    });
})(jQuery);