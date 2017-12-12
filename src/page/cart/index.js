/*
* @Author: liyue
* @Date:   2017-12-11 16:01:40
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-12 20:20:44
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/footer/index.js');
var _mm             = require('util/mm.js');
var nav             = require('page/common/nav/index.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        
        // 如果成功传入，就进行detail的渲染
        this.loadCart();

    },
    bindEvent : function(){
        var _this = this;
        // 选中商品与取消选中
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 判断是否已经选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });
            }else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });
            }
        });
        // 全选和非全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            // 判断是否已经选中
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });
            }else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });
            }
        });
        // 商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this = $(this),
                // 如果直接$('.count-input')
                // 那么选中的输入框为紊乱，并不知道应该选择哪一个
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = ($this.hasClass('plus') ? 'plus' : 'minus'),
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;

            if('plus' === type){
                if(currCount >= maxCount){
                    _mm.errorTips('数量已达上限');
                    return;
                }
                newCount = currCount + 1;
            }else if('minus' === type){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId   : productId,
                count       : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });

        });
        // 删除商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table').data('product-id');
                // delete_product接口支持单个删除
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中商品？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                for(var i = 0, iLength = $selectedItem.length;
                 i < iLength; i++){
                    arrProductIds.push($($selectedItem[i]).
                        parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    // delete_product接口支持单个删除
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // renderCart中已经存储了相应的cartInfo
            if(_this.data.cartInfo && (_this.data.cartInfo.cartTotalPrice > 0)){
                window.location.href = './confirm.html';
            }else{
                _mm.errorTips('您还未未选中任何商品');
            }
        });

    },
    loadCart : function(){
        var _this = this;
        // 请求数据渲染页面
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    renderCart : function(data){
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        // 生成html
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 注意让头部的导航条的购物车数量同步变化
        nav.loadCartCount();
    },
    // 删除指定商品
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds,function(res){
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError();
        });
    },
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError : function(){
        $('.page-wrap').html('<p class="err-tips">哪里不对了</p>');        
    }
};
$(function(){
    page.init();
})