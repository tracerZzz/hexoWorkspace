---
title: js指南-闭包  
author: tracerZzz 
excerpt: <img width="60%" height="200" class="lazy" data-original="http://og3vj3jrj.bkt.clouddn.com/js/mdn.png"></br>javascript 闭包，原型链，作用域链。
tags: 
- js
---

闭包是JavaScript中最强大的特性之一。JavaScript允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数，以及外部函数能访问的所有变量和函数。但是，外部函数却不能够访问定义在内部函数中的变量和函数。这给内部函数的变量提供了一定的安全性。而且，当内部函数生存周期大于外部函数时，由于内部函数可以访问外部函数的作用域，定义在外部函数的变量和函数的生存周期就会大于外部函数本身。当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了
