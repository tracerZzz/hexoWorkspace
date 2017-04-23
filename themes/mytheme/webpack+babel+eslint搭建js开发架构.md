---
title: webpack+babel+eslint
author: tracerZzz 
excerpt: <img src="url" class="describeImg"></br><span class="articleDescribe">describe</span>
tags: 
- tag1
- tag2
---

### webpack简介
webpack是一个在应用程序中构建js模块化的工具。可以将js，css,图片等文件进行打包管理，热加载代码等功能。是目前前端开发中的利器，非常有利于开发人员有序的管理项目文件。合理分配开发和生产环境。同时，webpack可以继承babel等js转码工具，总之，webpack的整个生态环境对js开发非常有帮助。

### webpack安装
受限安装nodejs环境和npm，一般安装node之后都会自带了npm。
新建一个文件夹叫作jsDev ，npm构建项目；npm init -y
安装webpack :npm install --save-dev webpack
创建webpack配置文件：vim webpack.config.js

在开始进行配置文件编写之前，我们先来看一下webpack的官方文档，自webpack升级到version2以后，有了很多新的特性，所以，我们还是遵循读一手资料的原则，根据官方文档，进行一步步的配置；
