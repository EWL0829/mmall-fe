/**
 * @Author : EWL
 * @Time   : 2017/12/2 13:19
 * @Last Modified By : EWL
 */
'use strict';

require('./index.css');
require('page/common/footer/index.js');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
        $('.user-content').keyup(function(e){
            if(13 === e.keyCode){
                // console.log('hello');
                _this.submit();
            }
        });
    },
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.login(formData, function(res){
                // 跳转回原来来的地方
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }

    },
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '用户密码不能为空';
            return result;
        }
        result.status = true;
        result.msg    = '检验通过';
        return result;

    }
}; 
$(function(){
    page.init();
})
