/**
 * @Author : EWL
 * @Time   : 2017/12/2 10:22
 * @Last Modified By : EWL
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _user = require('service/user-service.js');

var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();

    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(e){
            e.stopPropagation();
            var userInfo = {               
                email       : $.trim($('#email').val()),
                phone       : $.trim($('#phone').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res){
                    _mm.successTips(validateResult.msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    validateForm : function(userInfo){
        var result = {
            status : false,
            msg : ''
        };
        
        if(!_mm.validate(userInfo.phone, 'phone')){
            result.msg = '手机格式错误';
            return result;
        }
        if(!_mm.validate(userInfo.email, 'email')){
            result.msg = '邮箱格式错误';
            return result;
        }
        if(!_mm.validate(userInfo.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validate(userInfo.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '更新个人信息成功';
        return result;


    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
})
