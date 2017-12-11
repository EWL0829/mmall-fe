/*
* @Author: liyue
* @Date:   2017-12-06 21:19:57
* @Last Modified by:   EWL
* @Last Modified time: 2017-12-11 20:40:58
*/
var _mm = require('util/mm.js');
var _product = {
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    getProductDetail : function(productId, resolve, reject){
         _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _product;