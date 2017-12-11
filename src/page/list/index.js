/*
* @Author: liyue
* @Date:   2017-12-06 21:17:17
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-11 16:09:43
*/
// require('./index.css');
// require('page/common/nav/index.js');
// require('page/common/header/index.js');
// require('page/common/footer/index.js');
// var _mm = require('util/mm.js');
// var templateIndex = require('./index.string');
// var _product = require('service/product-service.js');
// var Pagination = require('util/pagination/index.js');

// var page = {
//     data : {
//         listParam : {
//             keyword : _mm.getUrlParam('keyword') || '',
//             categoryId  : _mm.getUrlParam('categoryId') || '',
//             // 默认排序
//             orderBy     : _mm.getUrlParam('orderBy') || 'default',
//             pageNum     : _mm.getUrlParam('pageNum') || 1,
//             pageSize     : _mm.getUrlParam('pageSize') || 3
//         }
//     },
//     init : function(){
//         this.onLoad();
//         this.bindEvent();
//     },
//     onLoad : function(){
//         this.loadList();
//     },
//     bindEvent : function(){
//         var _this = this;
//         $('.sort-item').click(function(){
//             var $this = $(this);
//             _this.data.listParam.pageNum = 1;
//             if($this.data('type') === 'default'){
//                 // 如果已经是active的样式那就直接return 
//                 if($this.hasClass('active')){
//                     return;
//                 }
//                 // 没有就添加
//                 else{
//                     // 移除多个class的时候可以在单词之间加上空格进行
//                     // 区分
//                     $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
//                     // 并且将data中的数据更新
//                     _this.data.listParam.orderBy = 'default';
//                 }
//             }
//             // 如果点击的是price
//             else if($this.data('type') === 'price'){
//                 $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
//                 if(!$this.hasClass('asc')){
//                     $this.addClass('asc').removeClass('desc');
//                     _this.data.listParam.orderBy = 'price_asc';
//                 }
//                 else{
//                     $this.addClass('desc').removeClass('asc');
//                     _this.data.listParam.orderBy = 'price_desc';
//                 }
//             }
//             _this.loadList();
//         });
//     },
//     // 加载list，可以加载出商品和分页
//     loadList : function(){
//         var _this = this,
//             listHtml = '',
//             listParam = this.data.listParam,
//             $pListCon  = $('.p-list-con');
            
//         $pListCon.html('<div class="loading"></div>');
//         // 搜索的时候只需要一个keyword或者一个categoryId即可，不用
//         // 两个都传
//         _this.data.listParam.keyword ? (delete _this.data.listParam.categoryId) : (delete _this.data.listParam.keyword);
//         _product.getProductList(listParam, function(res){
//             listHtml = _mm.renderHtml(templateIndex, {
//                 list : res.list
//             });
//         $pListCon.html(listHtml);
//         _this.loadPagination({
//             hasPreviousPage  : res.hasPreviousPage,
//             prePage          : res.prePage,
//             hasNextPage      : res.hasNextPage,
//             nextPage         : res.nextPage,
//             pageNum          : res.pageNum,
//             pages            : res.pages,
//             firstPage        : res.firstPage,
//             lastPage         : res.lastPage,
//             isLastPage       : res.isLastPage,
//             isFirstPage      : res.isFirstPage
//         });
//         }, function(errMsg){
//             _mm.errorTips(errMsg);
//         });
//     },
//     // 加载分页
//     loadPagination : function(pageInfo){
//         var _this = this;
//         this.pagination ? '' : (this.pagination = new Pagination);
//         this.pagination.render($.extend({},pageInfo, {
//             container : $('.pagination'),
//             onSelectPage : function(pageNum){
//                 _this.data.listParam.pageNum = pageNum;
//                 _this.loadList();
//             }
//         }));

//     }
// };
// $(function(){
//     page.init();
// })

/*
* @Author: mmall
* @Date:   2017-05-27 17:57:49
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-28 19:48:16
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        // $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
                firstPage       : res.firstPage,
                lastPage        : res.lastPage,
                isFirstPage     : res.isFirstPage,
                isLastPage      : res.isLastPage
            });
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})