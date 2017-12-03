/**
 * @Author : EWL
 * @Time   : 2017/12/1 23:13
 * @Last Modified By : EWL
 */
'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV || "";
//获取html模板的方法
var getHtmlConfig = function (name, title) {
    return {
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        title    : title,
        inject   : true,
        chunks   : [name, 'common'],
        hash     : true
    };
};
var config = {
    entry : {
        'common'  : ['./src/page/common/index.js'],
        'index'   : ['./src/page/index/index.js'],
        'login'   : ['./src/page/login/index.js'],
        'result'  : ['./src/page/result/index.js']
    },
    output : {
        path: './dist',
        publicPath : '/dist/',
        filename: 'js/[name].js'
    },
    externals :{
        'jquery' : 'window.jQuery'
    },
    resolve:{
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            image           : __dirname + '/src/image',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service'
        }
    },
    plugins : [
        //处理js文件
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // ( 公共chunk(commnons chunk) 的名称)

            filename: "js/base.js",
            // ( 公共chunk 的文件名)

            chunks: ["index", "login"],
            // (只使用这些 入口chunk)
        }),
        //处理css文件
        new ExtractTextPlugin("css/[name].css"),
        //处理html文件
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作提示')),

    ],
    module : {
        loaders : [
            {test : /\.css$/, loader : ExtractTextPlugin.extract("style-loader","css-loader")},
            {test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader : "url-loader?limit=100&name=resource/[name].[ext]"},
            {test : /\.string$/, loader : "html-loader"}
        ]
    }

};
// 在开发环境下可以这么做
if('dev' == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:9090');
}
module.exports = config;


