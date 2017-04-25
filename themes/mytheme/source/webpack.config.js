var webpack = require('webpack')
var path = require('path');
//分离 CSS 文件 插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true });
const extractLESS = new ExtractTextPlugin({ filename: 'css/[name]-LESS.css', allChunks: true });
const extractSASS = new ExtractTextPlugin({ filename: 'css/[name]-SCSS.css', allChunks: true });
require("babel-polyfill");
//html插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//代码压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        //单文件
        //app: "./app.js",
        //多文件 打包之后文件名字为
        // entry: ["babel-polyfill", "./src/entry.js"],
        // test: ["babel-polyfill", "./src/test.js"],
        // svg: ["./src/svg.js"],
        // gsap: ["./src/gsap.js"],
        index: ['webpack-hot-middleware/client?reload=true', "./_src/blog/js/index.js"],
        layout: ['webpack-hot-middleware/client?reload=true', "./_src/blog/js/layout.js"],
        // weixinDemo:["src/weixin/weixinDemo.js"],
        //transSourceSearch:["src/weixin/transSourceSearch.js"]
        /*vendor: ['jquery', 'lodash']*/
    },
    output: {
        path: path.join(__dirname, "./"),
        filename: 'js/[name].js'
    },

    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                /*exclude: /node_modules/,*/
                loader: "eslint-loader",
            }, {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ["es2015"] }
                }]

            },
            //load trial.js
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            },

            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }, {
                test: /\.less$/i,
                use: extractLESS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }, {
                test: /\.(sass|scss)$/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                }),
            },
            //ejs loader
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    ejsLoader: {
                        variable: 'data',
                        interpolate: /\{\{(.+?)\}\}/g,
                        evaluate: /\[\[(.+?)\]\]/g
                    },
                }
            },
            //html loader
            { test: /\.(jpe?g)$/, use: ["file-loader?limit=10240&mimetype=image/png&name=../img/[name].[ext]"] },
            //路径为相对于css路径的上一级目录下的img目录下，10以下转换为base64 
            { test: /\.(png|gif|svg|woff|woff2|ttf|otf|eot)$/, use: ["url-loader?limit=10240&mimetype=image/png&name=img/[name].[ext]"] },
             {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }]
            },


        ]
    },

    resolve: {
        modules: [__dirname, "node_modules"],
        //别名
        alias: {
            "modules": path.resolve(__dirname, "node_modules/"),
            'jquery-ui-js': path.resolve(__dirname, "_static/jquery-ui/js/"),
            'jquery-ui-css': path.resolve(__dirname, "_static/jquery-ui/themes/"),
        }

    },
    plugins: [
        //new UglifyJSPlugin(),
        extractCSS,
        extractLESS,
        extractSASS,
        //Automatically loads modules 自动加载模块
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            //_: "lodash",
        }),
        // 重复代码抽取为公共部分 插件
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // (the commons chunk name)
            filename: "js/common.js",
            // (the filename of the commons chunk)

            minChunks: 2,
            // (Modules must be shared between 2 entries) 公共模块必须出现在至少两个文件里才进行抽离

            chunks: ["index", "layout"],
            // (Only use these entries)
        }),

        /**
         * 
         * blog
         */
        // new HtmlWebpackPlugin({
        //     filename: '../../mytheme/layout/index.ejs',
        //     template: path.resolve(__dirname, 'src/blog/index.html'),
        //     inject: "head",
        //     xhtml: true,
        //     chunks: [],

        // }),
        // new HtmlWebpackPlugin({
        //     filename: '../../mytheme/layout/archive.ejs',
        //     template: path.resolve(__dirname, 'src/blog/archive.html'),
        //     inject: "head",
        //     xhtml: true,
        //     chunks: [],

        // }),

        //全局变量定义插件
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        }),
        // OccurenceOrderPlugin is needed for webpack 1.x only
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()

        // 复制高度静态资源
        // new CopyWebpackPlugin([{
        //     context: path.resolve(__dirname, "static/"),
        //     from: '**/*',
        //     ignore: ['*.md']
        // }]),


    ],
    //devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}
