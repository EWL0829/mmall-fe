/*
* @Author: liyue
* @Date:   2017-12-03 14:12:04
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-03 14:45:30
*/
require('./index.css');

var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
// 导航条
var nav   = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 点击注册事件
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        // 退出点击事件（涉及到后端，让后端将我们的点击事件删除就可以完成
        // 退出）
        $('.js-logout').click(function(){
            _user.logout(function(res){
                // 后端接口logout会删除我们在后端里的登录状态，
                // reload会重新载入删除后的数据，此时就是退出状态
                window.location.reload();
            },function(errorMsg){
                _mm.errorTips(errorMsg);
            })
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        },function(errorMsg){
            // do nothing
        });
    },
    // 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errorMsg){
            $('.nav .cart-count').text(0);            
        });
    }
};
module.exports = nav.init();