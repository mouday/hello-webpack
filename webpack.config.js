const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry: {
        main: './src/main.js',
    },

    // 输出目录和文件名
    output: {
        path: path.resolve(__dirname, './dist'),
        // 将js文件输出到统一的文件夹
        filename: 'js/bundle-[name]-[hash].js',

    },

    module: {
        rules: [
            // 处理ES6语法
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 处理css
            {
                test: /\.css$/,
                // 多个loader，从下到上处理
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                ]
            },
            // 处理less
            {
                test: /\.less$/,
                // 多个loader，从下到上处理
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            // 处理less
            {
                test: /\.scss$/,
                // 多个loader，从下到上处理
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            // 处理html 会和 htmlWebpackPlugin 冲突
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // }

            // 处理ejs模板文件
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },

            // 处理图片文件
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images',
                            limit: 10,
                        },
                    },
                    // 图片压缩
                    {
                        loader: 'image-webpack-loader'
                    }
                ],

            },
        ]
    },
    // 引入插件
    plugins: [
        // 使用模板生成首页
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: false,
            title: "hello webpack"
        })
    ]
}