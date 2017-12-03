/*
* @Author: liyue
* @Date:   2017-12-03 14:57:49
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-03 15:33:01
*/
require('./index.css');

var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
// 导航条
var header   = {
    init : function(){
        this.onLoad();
        this.bindEvent();        
    },
    onLoad : function(){
        // 做关键词的回填
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
       // 提交表单验证并跳转
       $('#search-btn').click(function(){
            _this.searchSubmit();
       });
       $('#search-input').keyup(function(e){
            if(13 === e.keyCode){
                _this.searchSubmit();
            }
       });

    },
    // 搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 跳转至目标页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 提交的时候没有keyword
        else{
            _mm.goHome();
        }
    } 
};
header.init();