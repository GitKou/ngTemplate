/**
*表格生成插件
*author gmm
*2016/12/10
*/
(function ($) {

    function Tbody(ele) {
        this.ele = ele;
    }

    Tbody.prototype = {
        ele: '',
        options: {
            theadData: [],
            datalist: [],
            isCheckable: false
        },
        initData: function (options) {
            this.options = options;
            _createElements(this.ele, options.theadData, options.datalist, options.isCheckable);
        },
        selectAllItems: function (data) {
            this.ele.find('.js-checkbox').each(function (i, e) {
                if (!$(this).is(':checked')) {
                    $(this).prop('checked', true);
                }
            });
        },
        unselectAllItems: function () {
            this.ele.find('.js-checkbox').each(function (i, e) {
                if ($(this).is(':checked')) {
                    $(this).prop('checked', false);
                }
            });
        },
        reverseItems: function () {
            this.ele.find('.js-checkbox').each(function (i, e) {
                $(this).prop('checked', !$(this).is(':checked'));
            });
        },
        getSelectedItems: function () {
            var selectedItems = [];
            var that = this;
            this.ele.find('.js-checkbox').each(function (i, e) {
                if ($(this).is(':checked')) {
                    selectedItems.push(that.options.datalist[i]);
                }
            });
            return selectedItems;
        }
    };
    /* 初始化表单数据
      * @params datalist {array} 对象数组
      * @params theadData {string} 逗号分隔的字符串 
      * @params isCheckable {boolean} 是否可勾选 
     */
    function _createElements(ele, theadData, datalist, isCheckable) {
        var tbody = $('<tbody/>');
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
        sharkTbody: function (ele, options) {
            return new Tbody(ele, options);
        }
    });
})(jQuery);