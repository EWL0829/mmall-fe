/*
* @Author: liyue
* @Date:   2017-12-11 16:01:40
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-11 21:02:59
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.js');
var templateIndex   = require('./index.string');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '',

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 判断是否已经将productId传进来
        // 如果尚未传入该参数
        if(!this.data.productId){
            _mm.goHome();
        }
        // 如果成功传入，就进行detail的渲染
        this.loadDetail();

    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count事件
        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount    = $('.p-count'),
                currCount  = parseInt($pCount.val()),
                minCount   = 1,
                maxCount   = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val((currCount < maxCount) ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val((currCount > minCount) ? currCount - 1 : minCount);
            }
        });
        // 添加购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    loadDetail : function(){
        var html        = '',
            $pageWrap   = $('.page-wrap'),
            _this       = this;
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了~</p>');
        });
    },
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})