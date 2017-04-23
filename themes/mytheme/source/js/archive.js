webpackJsonp([1],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

(function (window) {

  'use strict';

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ('classList' in document.documentElement) {
    hasClass = function hasClass(elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function addClass(elem, c) {
      elem.classList.add(c);
    };
    removeClass = function removeClass(elem, c) {
      elem.classList.remove(c);
    };
  } else {
    hasClass = function hasClass(elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function addClass(elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function removeClass(elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  window.classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
})(window);

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _gsap = __webpack_require__(2);

var _randomColor = __webpack_require__(4);

var _randomColor2 = _interopRequireDefault(_randomColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(27);

// require("../../../static/bootstrap/js/tether.min.js")
// require("../../../static/bootstrap/js/bootstrap.min.js")
__webpack_require__(31);

__webpack_require__(29);
__webpack_require__(28);
__webpack_require__(21);

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
			_gsap.TweenMax.to("#menu", 0.2, { x: -190 });
			thisPage.menuState = "open";
			//TweenMax.to("#line1",0.2,{css:{width:"50%",rationX:45}transformOrigin:"right bottom"})
		}
		classie.toggle(body, 'cbp-spmenu-push-toleft');
		//classie.toggle( showRightPush, 'cbp-spmenu-push-toleft' );
		classie.toggle(menuRight, 'cbp-spmenu-open');
	};
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[35]);