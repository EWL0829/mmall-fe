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
require('util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');



$(function() {
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
        dots: true,
        speed: 500,
        delay: 3000,    
        keys: true
    });
    // 事件绑定
    // 前一张后一张
    $('.banner-con .banner-arrow').click(function(){
        var direction = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[direction]();
    });
});
