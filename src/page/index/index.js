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
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');


navSide.init({
    name : 'order-list'
});
