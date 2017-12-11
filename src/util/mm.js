/*
* @Author: liyue
* @Date:   2017-12-02 20:06:53
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-04 12:24:04
*/
var conf = {
    // 与静态资源的地址是一样的
    serverHost : ''
};
var Hogan = require('hogan');
var _mm = {
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 后端文档中设定返回值res:0为成功，1为失败，10为未登录
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                else if(10 === res.status){
                    // 强制登录
                    _this.doLogin();
                }
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            // 这一类的错误对应使用到404以及503等上面
            error       : function(res){
                typeof param.error === 'function' && param.error(res.statusText);
            }
        });
    },
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    getUrlParam : function(name){
        // bili.com/anim/list?k=xxx&page=1        
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        // search部分就是?开始的那一段文本，substr(1)是为了截取掉?
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml : function(template, data){
        var template = Hogan.compile(template),
            result   = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '恭喜您，操作成功');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '噫~哪里出问题了？');
    },
    // 字段验证，支持是否非空判断、手机、邮箱
    validate : function(value, type){
        var value = $.trim(value);//去除字段中的空格
        if('require' === type){
            return !!value;
        }
        // 手机验证
        if('phone' === type){
            
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if('email' === type){
            return /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/.test(value);
        }
    },
    // 统一登录
    doLogin : function(){
        // 在强制登录结束后还需要跳转回原来的界面
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
         window.location.href = './index.html';
    }
};

module.exports = _mm;