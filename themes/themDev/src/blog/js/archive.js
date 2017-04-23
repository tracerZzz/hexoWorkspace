import { TweenMax, AttrPlugin, TweenLite, Power2 } from "gsap";
import randomColor from "modules/randomcolor/randomColor.js";
require("../../style/archive.css")

// require("../../../static/bootstrap/js/tether.min.js")
// require("../../../static/bootstrap/js/bootstrap.min.js")
require("../../../static/bootstrap/css/bootstrap.min.css")

require("../../style/archive/default.css")
require("../../style/archive/component.css")
require('./classie.js');
require("jquery-lazyload")

//require("../../../static/font-awesome-4.7.0/css/font-awesome.min.css");


$(function () {
	//debugger;
	//require("./modernizr.custom.js")
	
	
		var thisPage={};
		var 	menuRight = document.getElementById( 'cbp-spmenu-s2' ),
				
				showRightPush = document.getElementById( 'menu' ),
				body = document.body;
				
			showRightPush.onclick = function() {
				if(thisPage.menuState =="open"){
					TweenMax.to("#menu",0.2,{x:0});
					thisPage.menuState="close";
				}else{
					TweenMax.to("#menu",0.2,{x:-190});
					thisPage.menuState="open";
					//TweenMax.to("#line1",0.2,{css:{width:"50%",rationX:45}transformOrigin:"right bottom"})
				}
				classie.toggle( body, 'cbp-spmenu-push-toleft' );
				//classie.toggle( showRightPush, 'cbp-spmenu-push-toleft' );
				classie.toggle( menuRight, 'cbp-spmenu-open' );
			};


	TweenMax.staggerFrom(".blog-post", 1, {y:40,opacity:0},0)
	//延迟加载图片
	$("img.lazy").lazyload({effect: "fadeIn"});


			

})

		