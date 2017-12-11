/*
* @Author: Rosen
* @Date:   2017-05-28 11:58:08
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-07 22:20:07
*/

'use strict';
require('./index.css');
var _mm                 = require('util/mm.js');
var templatePagination  = require('./index.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    });

    // 跳转
    $(document).on('click', '.pg-goto', function(){
        var $this = $(this),
            $pgNum = $('.pg-pgNum'),
            pageNum = $pgNum.val();
        if(pageNum >= _this.option.firstPage && 
            pageNum <= _this.option.lastPage){
            typeof _this.option.onSelectPage === 'function' ? 
        _this.option.onSelectPage(pageNum) : null;
        }
        else{
            _mm.errorTips('输入的数字大于总页数，请重新输入');
            $pgNum.val(1);

        }
    });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        start       = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
        end         = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;


    // 首页
    pageArray.push({
        name : '首页',
        value : option.firstPage,
        disabled : option.isFirstPage
    });
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : option.prePage,
        disabled : !option.hasPreviousPage
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : option.nextPage,
        disabled : !option.hasNextPage
    });
    // 尾页
    pageArray.push({
        name : '尾页',
        value : option.lastPage,
        disabled : option.isLastPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;