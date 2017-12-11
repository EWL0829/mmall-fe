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
            name : 'user-pass-update'
        });

    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', handler);
        $(document).on('keyup', '.input', keyUpHandler);

        function handler(e){
            e.stopPropagation();
            var userInfo = {               
                passwordOld      : $.trim($('#password').val()),
                passwordNew      : $.trim($('#password-new').val()),          
                passwordConfirm  : $.trim($('#password-confirm').val())       
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword(userInfo, function(res){
                    _mm.successTips(validateResult.msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        }
        function keyUpHandler(e){
            e.stopPropagation();
            if(13 === e.keyCode){
                var userInfo = {               
                    passwordOld    : $.trim($('#password').val()),
                    passwordNew    : $.trim($('#password-new').val()),         
                    passwordConfirm: $.trim($('#password-confirm').val())       
                },
                validateResult = _this.validateForm(userInfo);
                if(validateResult.status){
                    _user.updatePassword({
                        passwordOld : userInfo.passwordOld,
                        passwordNew : userInfo.passwordNew,                        
                    }, function(res){
                        _mm.successTips(validateResult.msg);
                    }, function(errMsg){
                        _mm.errorTips(errMsg);
                    });
                }
                else{
                    _mm.errorTips(validateResult.msg);
                }
            }
        }
    },
    validateForm : function(userInfo){
        var result = {
            status : false,
            msg : ''
        };
        
        if(!_mm.validate(userInfo.passwordOld, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        if(!userInfo.passwordNew || (userInfo.passwordNew.length < 6)){
            result.msg = '新密码格式错误';
            return result;
        }
        if(userInfo.passwordNew !== userInfo.passwordConfirm){
            result.msg = '两次密码不一致';
            return result;
        }
        
        result.status = true;
        result.msg = '更新密码成功';
        return result;
    }
};
$(function(){
    page.init();
})
