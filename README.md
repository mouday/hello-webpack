webpack

相关文章
[https://webpack.js.org/](https://webpack.js.org/)

(一步步从零开始用 webpack 搭建一个大型项目)[https://mp.weixin.qq.com/s/a0QFhcbwkhXStBfMOe7exA]

## 基本使用
1、安装
```
$ mkdir webpack-demo && cd webpack-demo

$ npm init -y

$ cnpm i webpack-cli webpack -D

$ npx webpack -v
4.42.1
```

2、打包
（1）打包单文件
文件demo.js

```js

function hello() {
    console.log("hello world");
}

hello()

```

打包命令
```
$ npx webpack demo.js
```

（2）打包依赖

world.js
```js
function world() {
    console.log("world");
}

module.exports = world
```

demo.js
```js
// 引入js
const world = require('./world.js')

function hello() {
    console.log("hello world");
}

hello()
world()
```

打包命令
```
$ npx webpack demo.js
```

3、引用css
安装依赖的loader
```
$ cnpm i css-loader style-loader -D
```
css-loader处理css文件 
style-loader将处理后的css文件插入html

style.css
```css
.demo {
    width: 100px;
    height: 100px;
    background-color: #EFEFEF;
}
```

demo.js
```js
// 引入css 
// 方式一 在加载css文件处指定loader
// require('style-loader!css-loader!./style.css')

// 方式二 在打包参数中指定loader(单引号)
// --module-bind 'css=style-loader!css-loader'
require('./style.css')

function hello() {
    console.log("hello world");
}

hello()

```

打包命令
```bash
# 方式一打包
$ npx webpack demo.js

# 方式二打包
$ npx webpack demo.js --module-bind 'css=style-loader!css-loader'

```

4、常用参数
--module-bind 'css=style-loader!css-loader' 指定loader
--watch / -w 自动更新
--progress 打印编译过程
--display-modules 显示用到的模块
--display-reasons 显示引入原因
--colors 字体彩色

## 配置文件
```
dist/ 打包后的文件
src/  原文件 
    script/
    style/
webpack.config.js 配置文件

```

webpack.config.js
```js
const path = require('path')

module.exports = {
    // 入口文件
    entry: './src/main.js',

    // 输出目录和文件名
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
```
打包命令
```
$npx webpack
```

可以通过package.json指定打包参数
```js
"scripts": {
    "webpack": "webpack --config webpack.config.js --progress"
  }
```

## entry 和 output
1、entry
单入口 string
多入口 Array/Object
```js
// string
entry: './main.js'

// Array
entry: ['./main1.js', './main2.js']

// Object name/entry
entry: {
    page1: './main.js',
    page2: ['./main1.js', './mian2.js']
}

```

2、output
单个打包文件
```js
output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }
```

多个打包文件
```js
output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle-[name]-[hash].js',
        publicPath: 'http://cdn.demo.com/'
    }
```

## plugin

自动生成html页面 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)

```
cnpm i html-webpack-plugin -D
```

```js
const htmlWebpackPlugin = require('html-webpack-plugin')


// 自动生成html
plugins: [
        new htmlWebpackPlugin()
    ]


// 添加自定义模板
plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        })
    ]


// 添加更多参数
plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            // inject: 'head',
            inject: false,
            title: 'hello webpack',
            minify: false,
            // 可以添加自定义字段
            date: new Date()
        })
    ]
```

index.html
```html
<!-- 获取传入的变量 -->
<title><%= htmlWebpackPlugin.options.title %></title>
```

可以配置多个页面

## loader

1、(babel-loader转换ES6)[https://webpack.js.org/loaders/babel-loader/#install]


```
npm install babel-loader @babel/core @babel/preset-env -D
```

配置
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

2、css

```
npm i css-loader postcss-loader style-loader less-loader sass-loader -D
```

3、html
html-loader

4、处理模板文件ejs
ejs-loader

5、处理静态文件
file-loader
url-loader 可以将图片转为base64编码
image-webpack-loader 图片压缩
