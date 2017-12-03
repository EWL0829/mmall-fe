/*
* @Author: liyue
* @Date:   2017-12-03 16:48:15
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-03 17:16:34
*/
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/footer/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    $element.show();
})