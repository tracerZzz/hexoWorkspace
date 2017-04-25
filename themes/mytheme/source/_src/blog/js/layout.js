import { TweenMax } from "gsap";
import randomColor from "modules/randomcolor/randomColor.js";

require("modules/gsap/ScrollToPlugin.js");
// require("../../../_static/bootstrap/js/tether.min.js")
// require("../../../_static/bootstrap/js/bootstrap.min.js")
require("../../../_static/bootstrap/css/bootstrap.min.css")
require('./classie.js');
require("../../style/archive/default.css")
require("../../style/archive/component.css")
require("../../style/layout.css")

require("jquery-lazyload")

//require("../../../_static/font-awesome-4.7.0/css/font-awesome.min.css");


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
            TweenMax.staggerTo(["#menu","#goTop"], 0.2, { x: 0 },0);
            thisPage.menuState = "close";
        } else {
            TweenMax.staggerTo(["#menu","#goTop"], 0.2, { x: -230 },0);
            thisPage.menuState = "open";
            //TweenMax.to("#line1",0.2,{css:{width:"50%",rationX:45}transformOrigin:"right bottom"})
        }
        classie.toggle(body, 'cbp-spmenu-push-toleft');
        //classie.toggle( showRightPush, 'cbp-spmenu-push-toleft' );
        classie.toggle(menuRight, 'cbp-spmenu-open');
    };

    //文章渐进显示
    TweenMax.staggerFrom(".blog-post", 1, { y: 40, opacity: 0 }, 0)
    //延迟加载图片
    $("img.lazy").lazyload({ effect: "fadeIn" });

    

    //
    (function goTop(){

    $(window).scroll(function(e) {
    //若滚动条离顶部大于100元素
    if ($(window).scrollTop() > 150)
        $("#goTop").fadeIn(500); //以0.5秒的间隔渐显id=goTop的元素
    else
        $("#goTop").fadeOut(500); //以0.5秒的间隔渐隐id=goTop的元素
	    $("#goTop").click(function(){
	    	TweenMax.to(window, 1, { scrollTo: { y: 0 }, ease: Power2.easeInOut });
	    })
		});

    }());

})
