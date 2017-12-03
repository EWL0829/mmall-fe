/*
* @Author: liyue
* @Date:   2017-12-03 14:30:38
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-03 14:45:58
*/

var _mm = require('util/mm.js');
var _user = {
    // 退出
    logout      : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin  : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _user;