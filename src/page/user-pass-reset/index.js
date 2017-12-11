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
    data : {
        username    : '',
        question    : '',
        token       : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    // 加载用户名
    loadStepUsername : function(){
        $('.step-username').show();
    },
    loadStepQuestion : function(){
        // 将之前的错误信息隐藏掉
        formError.hide();
        var _this = this;
        $('.step-username').hide().siblings('.step-question').show();
        $('.question').text(this.data.question);
        $('#submit-answer').click(function(){
            submitAnswer();
        });
        $('#answer').keyup(function(e){
            if(13 === e.keyCode){
                submitAnswer();                
            }
        });
        function submitAnswer(){
            var answer = $.trim($('#answer').val());
            if(answer){
                _this.data.answer = answer;
                _user.checkAnswer(_this.data, function(res){                    
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('密码提示问题不能为空');
            }
        }
    },
    loadStepPassword : function(){
        var _this = this;
        $('.step-question').hide().siblings('.step-password').show();
        $('#submit-password').click(function(){
            submitPassword();
        });
        $('#password').keyup(function(e){
            if(13 === e.keyCode){
                submitPassword();
            }
        });

        function submitPassword(){
            var password = $.trim($('#password').val());            
            if(password && (password.length >= 6)){
                
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                }, function(res){                
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('新密码不能为空');
            }
        }
    },
    bindEvent : function(){
        var _this = this;
        $('#submit-username').click(function(){
            submitUsername();
        });
        $('#username').keyup(function(e){
            if(13 === e.keyCode){
                submitUsername();
            }
        })
        function submitUsername(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('用户名不能为空');                
            }
        }
    },
}; 
$(function(){
    page.init();
})
