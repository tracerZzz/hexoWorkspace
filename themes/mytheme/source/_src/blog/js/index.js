/**
 * gsap
 */
//require("gsap");
import { TweenMax } from "gsap";


/**
 * jquery plugins
 */
require("../../../_static/drawSvg/jquery.drawsvg.js");

/**
 *  引入jquery.ui.slider
 *  依赖如下 注意顺序
 *  jquery.ui.core.js
 *  jquery.ui.mouse.js
 *  jquery.ui.widget.js
 */
require("jquery-ui-js/jquery.ui.core.min.js");
require("jquery-ui-js/jquery.ui.widget.min.js");
require("jquery-ui-js/jquery.ui.mouse.min.js");
require("jquery-ui-js/jquery.ui.slider.min.js");
// 样式  (可以按需引入必要的css文件)
require("jquery-ui-css/base/jquery.ui.theme.css");
require("jquery-ui-css/base/minified/jquery.ui.slider.min.css");
//customer style
import style from "../../style/index.css"
//加入jqueryui 移动端插件
require("modules/jquery-ui-touch-punch-c/jquery.ui.touch-punch.min.js")
    //鼠标位置监控
    /*require('script-loader!trial-js')*/
    //随机颜色
    //import {randomColor} from "randomColor";

import randomColor from "modules/randomcolor/randomColor.js";


//定义页面对象，辅助存取数据
var thisPage = {
    menustate: "close"
};

/**
 * 画path集合，并添加到时间线上
 * [drawToTimeline description]
 * @param  {[type]} target [description]
 * @param  {[type]} opt    [{duration 时间，stagger:间隔时间}}]
 * @return {[type]}        [description]
 */
function drawToTimeline(tar, tl, opt) {
    if (!opt) {
        return;
    } else {
        TweenMax.to((tar), 0, { opacity: 1, ease: Power3.easeInOut });
        var target = $(tar).find("path");
        var totelLength = 0;
        for (let i of target) {
            var length = i.getTotalLength();
            i.setAttribute("stroke-dasharray", "0 " + length);
            i.setAttribute("fill", opt.fill || "black");
            i.setAttribute("stroke", opt.stroke || "white");
            i.setAttribute("stroke-width", opt.strokeWidth || 1);
            i.setAttribute("opacity", "1");
            totelLength = totelLength + length;
        }
        if (!tl.__proto__ == "TimelineLite") {
            console.error("没有timeline参数");
            for (let i of target) {
                var length = i.getTotalLength();
                TweenMax.to(i, duratiion || 1, { strokeDasharray: length + " 0" });
            }
        } else {
            for (let i of target) {
                var length = i.getTotalLength();
                var duratiion = opt.duration || 5;
                /*              if(opt.stagger&&opt.stagger!=0){
                                    duratiion=opt.duratiion?(opt.duratiion-(target.length-1)*opt.stagger)/target.length:5/(target.length-1);
                                }else{
                                    duratiion=duratiion/target.length;
                                }*/
                var timedelay = tar + "+=0";
                var defaultChange = { strokeDasharray: length + " 0" };
                tl.to(i, duratiion, $.extend({}, defaultChange, opt, { fill: opt.fillTo }), opt.position || timedelay);
            }

        }
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

$(function() {
    //解决jquery 3.0 bug
    $.fn.andSelf = function() {
        return this.addBack.apply(this, arguments);
    }

    //下面背景
    function setBg() {
        var obj = $(".bgcircle")

        var backgrounds = randomColor({ luminosity: 'dark', count: $.makeArray(obj).length });
        $.each(obj, function(i, val) {
            let tl = new TimelineMax();
            //val.setAttribute("transform-origin",Math.random()*200+"% "+Math.random()*200+"%");
            tl.to(val, 5, { opacity: 1, attr: { x: 100, y: getRandomInt(-100, 100) }, css: { scale: Math.random() * 3, backgroundColor: backgrounds[i] }, ease: Power2.easeOut, });
            //val.style.backgroundColor=backgrounds[i];
        })

    }
    setBg();
    var t1 = window.setInterval(setBg, 10000);


    /*  Trial("#menubg").within({ distance: 500, cord: 'center' },
        function(distance, ele, event) {
            $.each($("#menubg").find(".bgcircle"),function(i,val){
                    console.log($(val).position());
            })
        }
        
    ).leave(
             {distance: 500, cord: 'center'},
                        function (distance, ele, event) {
                            console.log("leave");
                        }
                    )
*/


    /**
     * [kute description]
     * @type {[type]}
     * 由于打包时将js打包在了head中，所以 在html加载之前引入kute会导致document.body为null
     */
    // var KUTE = require("kute.js"); //grab the core
    // require("kute.js/kute-svg"); // Add SVG Plugin
    // require("kute.js/kute-css"); // Add CSS Plugin
    // require("kute.js/kute-attr"); // Add Attributes Plugin
    // require("kute.js/kute-text"); // Add Text Plugin

    /**
     * 鼠标移动动画实现
     *             
     *       
     */
    var mouseAni = {};
    mouseAni.points = new Array(5);
    $("body").mousemove(function(e) {
        /*  if(mouseAni.points.length>5){
                mouseAni.points.shift();
            }
            mouseAni.points.push([e.pageX, e.pageY])

            console.log(mouseAni.points)*/
        // console.log(e.pageX + ", " + e.pageY + mouseAni);
    })


    /**
     * 菜单点击跳转
     */


    // $("#lefttop").click(function() {
    //     window.location.href = "https://tracerzzz.github.io/"

    // })
    $("#righttop").click(function() {

       // alert("profile");
    })
    $("#leftbottom").click(function() {
        window.location.href = "https://github.com/tracerZzz"
    })
    $("#rightbottom").click(function() {
        window.location.href = "http://music.163.com/#/user/home?id=91916193"
    })

    /**
     * 动画开始
     * 
     */
    //定义 时间线对象用来管理动画的顺序，播放暂停等操作
    var tl = new TimelineMax({ onUpdate: updateSlider, delay: 1, repeat: -1, onRepeat: repeat });

    function repeat() {

    }
   
    tl.fromTo("#gflower", 9, { opacity: 0 }, { opacity: 1 });
    tl.to("#grightcircle", 2, { opacity: 1, scale: 1 }, 0);
    drawToTimeline("#flower", tl, { duration: 38, strokeWidth: 1, position: 5 });
    tl.to("#gflower", 9, { fill: "black", stroke: "black", delay: 0 }, 0);
    tl.to("#gflower", 9, { fill: "#c9b83c", stroke: "black", delay: 0 }, 9);
    drawToTimeline("#grightcenter", tl, { duration: 7, stroke: "white", strokeWidth: 3, fill: "black", fillTo: "#a31b66", position: 7 });
    tl.fromTo("#grightcenter", 5, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut, }, 10);
    drawToTimeline("#rightcircle", tl, { duration: 15, strokeWidth: 3, stroke: "black", fill: "lightgray", fillTo: "gray", position: 1.5 });
    tl.fromTo("#grightcircle", 3, { transformOrigin: "50% 50%", scale: 1 }, { transformOrigin: "50% 50%", rotation: 720, opacity: 0.5, scale: 0.5, ease: Power3.easeInOut, delay: 0 }, 18);
    tl.staggerTo(["#grightcircle", "#grightcenter"], 5, { transformOrigin: "50% 50%", x: "270", scale: 0.7, opacity: 0.8, ease: Power3.easeIn, delay: 0 }, 0, 21);
    tl.to("#gflower", 5, { transformOrigin: "50% 50%", x: "-100", opacity: 0.8, fill: "green", scale: 0.7, ease: Power3.easeIn, delay: 0 }, 21);
    //  tl.to("#pathLeft", 3, { opacity: 1 }, 23);
    // tl.to("#pathRight", 3, { opacity: 1 }, 23);
    // tl.to("#pathLeft", 5, { opacity: 0 }, 26);
    // tl.to("#pathRight", 5, { opacity: 0 }, 26);
    tl.staggerFromTo((".describeleft"), 2, { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, 4.5, 29);
    tl.staggerFromTo((".describeright"),2, { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, 4.5, 31);
    tl.to("#grightcircle", 5, { rotation: -720, ease: Power3.easeInOut, delay: 0 }, 48);
    tl.to("#grightcenter", 5, { fill: "#1e7bcc", ease: Power3.easeInOut, delay: 0 }, 48);
    tl.to("#gflower", 5, { fill: "#65107c", delay: 0 }, 48);
    tl.staggerTo([".describeleft", ".describeright","#pathLeft", "#pathRight", "#gflower", "#grightcircle", "#grightcenter"], 3, { opacity: 0 }, 0, 54);


    /**
     * 时间线绑定
     * @param  {[type]} event [description]
     * @param  {[type]} ui)   {                       tl.pause();                        tl.progress(ui.value / 100);        }    } [description]
     * @return {[type]}       [description]
     */
    $("#slider").slider({
        range: false,
        min: 0,
        max: 100,
        step: .1,
        slide: function(event, ui) {
            //tl.pause();
            //adjust the timeline's progress() based on slider value
            tl.progress(ui.value / 100);
        }
    });

    function updateSlider() {
        $("#slider").slider("value", tl.progress() * 100);
        $("#time").val(parseFloat(tl.time()).toFixed(2) + "s");
    }



    /**
     * 画圆和矩形
     */
    //延迟 和循环动画



    /*    var rightCirclePath = $("#rightcircle").find("path");
        for (let i of rightCirclePath) {
            i.setAttribute("stroke", "black");
            i.setAttribute("stroke-width", 2); 
            i.setAttribute("fill", "none");
        }*/



    // var rightcircle = $("#rightcircle").drawsvg({
    //     duration: 10000,
    //     stagger:0
    // });
    // rightcircle.drawsvg('animate');
    //    TweenMax.to(("#grightcenter"), 20, { opacity:1, ease: Power3.easeInOut}); 
    // TweenMax.to(("#gflower"), 10, { x:"-200",opacity:0, ease: Power3.easeInOut,delay:15});
    // TweenMax.to(("#grabit"), 10, {opacity:1, ease: Power3.easeInOut,delay:20});
    // TweenLite.to(("#grightcircle"), 10, {transformOrigin: "50% 50%", rotation: 720,opacity:0.2, ease: Power3.easeInOut,delay:0});
    //    TweenMax.to(("#grightcenter"), 10, { opacity:0.1, ease: Power3.easeInOut,delay:15}); 
    /* for(let i of x){

        var tweensCollection = KUTE.fromTo(i, { draw: '0% 0%' }, { draw: '0% 100%', duration: 700 });
        tweensCollection.start();
     }*/




    /**
     * jquery drawSvg
     * 
     * 
     */
    /*   debugger;
       var x=$("#svg1");
       var y=$("#svg1").find("path");*/
    /*   var welcome = $("#svg1").drawsvg({
           duration: 3000,


       });

       welcome.drawsvg('animate');*/

    //菜单中心按钮horver效果
    $(".hoversvg").hover(function() {
        TweenLite.to("#menurect", 0.5, { transformOrigin: "50% 50%", scale: 1.1, fill: "none" });
        TweenLite.to(".menuline", 0.5, { transformOrigin: "50% 50%", scale: 1.2, stroke: "white" });

    }, function() {
        TweenLite.to("#menurect", 0.5, { scale: 1, fill: "black" });
        //如果当前menu打开，显示红色
        TweenLite.to(".menuline", 0.5, { scale: 1, stroke: "#d3d3d3" });
    });

    //子菜单hover效果
    $(".gmenulist").hover(function(e) {
        TweenMax.staggerTo([$(this).find(".menulist"), $(this).find(".testlist")], 0.5, { ease: Back.easeInOut.config(1.5), attr: { rx: "100", ry: "100" }, transformOrigin: "50% 50%", scale: 1.4, stroke: "#d3d3d3" });

    }, function(e) {
        TweenMax.staggerTo([$(this).find(".menulist"), $(this).find(".testlist")], 0.5, { ease: Back.easeInOut.config(1.4), attr: { rx: "15", ry: "15" }, transformOrigin: "50% 50%", scale: 1, stroke: "gray" });
    })


    //菜单按钮点击效果
    $(".hoversvg").click(function() {
        if (thisPage.menustate && thisPage.menustate == 'close') {
            //子菜单draw
            let profilesvg = $("#profilesvg").drawsvg({
                duration: 2000,
            });
            profilesvg.drawsvg('animate');
            let musicsvg = $("#musicsvg").drawsvg({
                duration: 5000,
            });
            musicsvg.drawsvg('animate');
            let gitsvg = $("#gitsvg").drawsvg({
                duration: 5000,
            });
            gitsvg.drawsvg('animate');
            let notesvg = $("#notesvg").drawsvg({
                duration: 5000,
            });
            notesvg.drawsvg('animate');
            //头发
            //TweenMax.to("#path4816", 3, { fill: "#edd67b", delay: 2 });
            TweenMax.to("#path4816", 3, { fill: "#3a3939", delay: 2 });

            //带单中心按钮变换
            TweenLite.to("#menurect", 0.5, { transformOrigin: "50% 50%", rotation: 720, fill: "none" });
            TweenLite.to("#menutop", 0.5, { rotation: 45, y: 15 });
            TweenLite.to("#menumid", 0.5, { opacity: 0 });
            TweenLite.to("#menubottom", 0.5, { rotation: -45, y: -15 });
            thisPage.menustate = "open";
            //子菜单运动变换

            TweenMax.to("#lefttop", 1, { transformOrigin: "50% 50%", rotation: 360, opacity: 1, x: -400, y: -200 });
            TweenMax.to("#leftbottom", 1, { transformOrigin: "50% 50%", rotation: 360, opacity: 1, x: -400, y: 200 });
            TweenMax.to("#righttop", 1, { transformOrigin: "50% 50%", rotation: 360, opacity: 1, x: 400, y: -200 });
            TweenMax.to("#rightbottom", 1, { transformOrigin: "50% 50%", rotation: 360, opacity: 1, x: 400, y: 200 });

        } else {
            TweenMax.to("#path4816", 0.5, { fill: "white", delay: 0 });
            TweenLite.to("#menurect", 0.5, { transformOrigin: "50% 50%", rotation: -720, fill: "none" });
            TweenLite.to("#menutop", 0.5, { stroke: 'white', rotation: 0, y: 0 });
            TweenLite.to("#menumid", 0.5, { opacity: 1 });
            TweenLite.to("#menubottom", 0.5, { stroke: 'white', rotation: 0, y: 0 });
            thisPage.menustate = "close";

            //子菜单运动变换
            TweenMax.to("#lefttop", 1, { transformOrigin: "50% 50%", rotation: -360, opacity: 0, x: 200, y: 100 });
            TweenMax.to("#leftbottom", 1, { transformOrigin: "50% 50%", rotation: -360, opacity: 0, x: 200, y: -100 });
            TweenMax.to("#righttop", 1, { transformOrigin: "50% 50%", rotation: -360, opacity: 0, x: -200, y: 100 });
            TweenMax.to("#rightbottom", 1, { transformOrigin: "50% 50%", rotation: -360, opacity: 0, x: -200, y: -100 });

        }
    })

    //底部字体颜色变换





    //遮罩层
    $("#mask").hover(
        function() {
            // TweenLite.to("#rect", 0.5, { scale: 1, fill: "red" });
        },

        function() {
            // TweenLite.to("#rect", 0.5, { scale: 1, fill: "black" });
            // TweenLite.to($(this), 0.5, { scale: 1, borderRadius: "15px", backgroundColor: "#D23B3B", borderColor: "green", backgroundPosition: "0 200px", color: 'blue' });
        }
    );

})
