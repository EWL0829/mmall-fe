/*
* @Author: liyue
* @Date:   2017-12-03 14:40:10
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-03 14:46:24
*/
var _mm = require('util/mm.js');
var _cart = {
    // 获得购物车的数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _cart;