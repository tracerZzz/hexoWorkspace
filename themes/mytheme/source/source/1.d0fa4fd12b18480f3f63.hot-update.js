webpackHotUpdate(1,{

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _gsap = __webpack_require__(2);

var _randomColor = __webpack_require__(4);

var _randomColor2 = _interopRequireDefault(_randomColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(28);

// require("../../../static/bootstrap/js/tether.min.js")
// require("../../../static/bootstrap/js/bootstrap.min.js")
__webpack_require__(32);

__webpack_require__(30);
__webpack_require__(29);
__webpack_require__(22);
__webpack_require__(13);

//require("../../../static/font-awesome-4.7.0/css/font-awesome.min.css");


$(function () {
	//debugger;
	//require("./modernizr.custom.js")


	var thisPage = {};
	var menuRight = document.getElementById('cbp-spmenu-s2'),
	    showRightPush = document.getElementById('menu'),
	    body = document.body;

	showRightPush.onclick = function () {
		if (thisPage.menuState == "open") {
			_gsap.TweenMax.to("#menu", 0.2, { x: 0 });
			thisPage.menuState = "close";
		} else {
			_gsap.TweenMax.to("#menu", 0.2, { x: -240 });
			thisPage.menuState = "open";
			//TweenMax.to("#line1",0.2,{css:{width:"50%",rationX:45}transformOrigin:"right bottom"})
		}
		classie.toggle(body, 'cbp-spmenu-push-toleft');
		//classie.toggle( showRightPush, 'cbp-spmenu-push-toleft' );
		classie.toggle(menuRight, 'cbp-spmenu-open');
	};

	_gsap.TweenMax.staggerFrom(".blog-post", 1, { y: 40, opacity: 0 }, 0);
	//延迟加载图片
	$("img.lazy").lazyload({ effect: "fadeIn" });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

})