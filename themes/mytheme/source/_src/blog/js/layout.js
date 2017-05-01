import { TweenMax } from "gsap";
import randomColor from "modules/randomcolor/randomColor.js";

require("modules/gsap/ScrollToPlugin.js");


require("../../../_static/bootstrap/css/bootstrap.min.css")
require('./classie.js');
require("../../style/archive/default.css")
require("../../style/archive/component.css")
require("../../style/layout.css")

require("jquery-lazyload")

//require("../../../_static/font-awesome-4.7.0/css/font-awesome.min.css");
import 'bootstrap/dist/js/bootstrap';

$(function() {

    //debugger;
    //require("./modernizr.custom.js")
    // var c=randomColor({ luminosity: 'light', count:1});
    //TweenMax.to("#blogtitle",0.5,{backgroundColor:c[0]});

    var thisPage = {};
    var menuRight = document.getElementById('cbp-spmenu-s2'),

        showRightPush = document.getElementById('menu'),
        body = document.body;


    showRightPush.onclick = function() {

        if (thisPage.menuState == "open") {
            TweenMax.staggerTo(["#menu", "#goTop"], 0.2, { x: 0 }, 0);
            thisPage.menuState = "close";
            $("#mask").hide();
            TweenMax.to("#line1", 0.3, { rotation: 0, y: 0, transformOrigin: "right right", delay: 0.1 })
            TweenMax.to("#line2", 0.3, { opacity: 1 })
            TweenMax.to("#line3", 0.3, { rotation: 0, y: 0, transformOrigin: "right right", delay: 0.1 })

        } else {
            TweenMax.staggerTo(["#menu", "#goTop"], 0.2, { x: -200 }, 0);
            TweenMax.staggerFrom(".menuItem", 0.2, { x: 200, delay: 0.15 }, 0.1);
            $("#mask").show();
             
            thisPage.menuState = "open";
            TweenMax.to("#line1", 0.3, { rotation: 45, y: 8, transformOrigin: "right right", delay: 0.1 })
            TweenMax.to("#line2", 0.3, { opacity: 0 })
            TweenMax.to("#line3", 0.3, { rotation: -45, y: -8, transformOrigin: "right right", delay: 0.1 })
        }
        classie.toggle(body, 'cbp-spmenu-push-toleft');
        // //classie.toggle( showRightPush, 'cbp-spmenu-push-toleft' );
        classie.toggle(menuRight, 'cbp-spmenu-open');
    };

    /**
     * 蒙版点击事件
     * @return {[type]} [description]
     */
 $("#mask").click(function(){
   $("#menu").trigger("click");
 })

    //文章渐进显示
    TweenMax.staggerFrom(".blog-post", 1, { y: 40, opacity: 0 }, 0.2)
    TweenMax.fromTo("#page-nav", 1, { y: 40, }, { y: 0, opacity: 1 }, 0)
        //延迟加载图片
    $("img.lazy").lazyload({ effect: "fadeIn" });



    //
    (function goTop() {

        $(window).scroll(function(e) {
            //若滚动条离顶部大于100元素
            if ($(window).scrollTop() > 150)
                $("#goTop").fadeIn(500); //以0.5秒的间隔渐显id=goTop的元素
            else
                $("#goTop").fadeOut(500); //以0.5秒的间隔渐隐id=goTop的元素

            $("#goTop").click(function() {
                TweenMax.to(window, 1, { scrollTo: { y: 0 }, ease: Power2.easeInOut });
            })
        });

    }());

    /**
     * 解决浏览器尺寸变动时菜单显示的bug
     * @param  {[type]} ) {                   var docEl [description]
     * @return {[type]}   [description]
     */
    window.addEventListener('resize', function() {
        var docEl = window.document.documentElement;
        var width = docEl.getBoundingClientRect().width + 15;
        if (width > 992 && thisPage.menuState == "open") {
            $("#menu").trigger("click");
        }
    });



    /**
     * logo hover
     */
    $("#logo").hover(function() {
        TweenMax.to($(this), 0.5, { borderRadius: "50%" })

    }, function() {
        TweenMax.to($(this), 0.5, { borderRadius: "5px" })
    })

    /**
     * fastclick
     */
    var FastClick = require('fastclick');
    FastClick.attach(document.body, {});


    /**
     * categoriesIndex
     */

    $(".category-list").addClass("row col-12");
    $(".category-list-item").addClass("col-sm-6");

})
