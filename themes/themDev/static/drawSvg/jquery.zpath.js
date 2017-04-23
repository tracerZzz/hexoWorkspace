/**
 * zPath 1.0
 * https://github.com/Zet-Tools/zPath.js
 * 
 *********************************************
 *********************************************
 *** A project by Seviciu Cosmin / ZetCoby ***
 *********************************************
 *********************************************
 **************** MIT licensed ***************
 *********************************************
 *********************************************
 *
 * A simple svg drawing plugin
 */

(function($) {
  var id = 1;
  var g = "g";
  var path = "path";
  var rect = "rect";
  var circle = "circle";
  var line = "line";
  var polygon = "polygon";
  var elements = [];
  var defaults = {
    action: 'start',
    drawTime: 3000,
    draw: 'all',
    delay: 20,
    id: 1,
    shuffle: false
  };

  // var selector = $(this.selector);

  $.fn.zPath = function(options) {
    var that = this; + (function() {
      var opts = $.extend({}, defaults, options);

      return $(that).each(function() {

        var $this = $(this);
        opts.id = id;

        if (opts.action == 'start') {
          clearSVG($this, opts);
          $this.attr('data-id', id);
          drawSVG($this, opts);
          id++;
        } else if (opts.action == 'destroy') {
          resetSVG($this, $this.attr('data-id'));
        }
      });
    }());
  };

  var drawSVG = function(el, opts) {
    var drawTime = opts.drawTime;
    var mode = opts.draw;
    var id = opts.id;
    var delay = opts.delay;
    var delayIncrement = opts.delay;
    if (opts.shuffle == true)
      tools.arrayShuffle(elements);
    if (mode == 'all') {
      el.children().each(function() {

        if ($(this).is(g)) {
          drawSVG($(this), opts);
        } else if ($(this).is(path)) {
          draw.path($(this), drawTime);
        } else if ($(this).is(rect)) {
          draw.rect($(this), drawTime);
        } else if ($(this).is(circle)) {
          draw.circle($(this), drawTime);
        } else if ($(this).is(line)) {
          draw.line($(this), drawTime);
        } else if ($(this).is(polygon)) {
          draw.polygon($(this), drawTime);
        }
      });
    } else if (mode == "delayed" || mode == '1by1') {
      if (mode == '1by1') {
        delayIncrement = drawTime;
      }
      for (i = 0; i <= elements.length - 1; i++) {
        if (tools.idCompare(elements[i], id)) {
          setTimeout(
            (function(element) {
              return function() {
                if ($('.' + element).is(path)) {
                  draw.path($('.' + element), drawTime);
                } else if ($('.' + element).is(rect)) {
                  draw.rect($('.' + element), drawTime);
                } else if ($('.' + element).is(circle)) {
                  draw.circle($('.' + element), drawTime);
                } else if ($('.' + element).is(line)) {
                  draw.line($('.' + element), drawTime);
                } else if ($('.' + element).is(polygon)) {
                  draw.polygon($('.' + element), drawTime);
                }
              }
            })(elements[i]), delay);

          delay += delayIncrement;
        }

      }

    } else if (mode == 'terminus' || mode == 'terminusDelayed') {
      for (var i = 0, j = elements.length - 1; i <= elements.length / 2 && j >= elements.length / 2; i++, j--) {
        if (tools.idCompare(elements[i], id)) {
	          setTimeout(
	            (function(element1, element2) {
	              return function() {
	                if ($('.' + element1).is(path)) {
	                  draw.path($('.' + element1), drawTime);
	                } else if ($('.' + element1).is(rect)) {
	                  draw.rect($('.' + element1), drawTime);
	                } else if ($('.' + element1).is(circle)) {
	                  draw.circle($('.' + element1), drawTime);
	                } else if ($('.' + element1).is(line)) {
	                  draw.line($('.' + element1), drawTime);
	                } else if ($('.' + element1).is(polygon)) {
	                  draw.polygon($('.' + element1), drawTime);
	                }

	                if ($('.' + element2).is(path)) {
	                  draw.path($('.' + element2), drawTime);
	                } else if ($('.' + element2).is(rect)) {
	                  draw.rect($('.' + element2), drawTime);
	                } else if ($('.' + element2).is(circle)) {
	                  draw.circle($('.' + element2), drawTime);
	                } else if ($('.' + element2).is(line)) {
	                  draw.line($('.' + element2), drawTime);
	                } else if ($('.' + element2).is(polygon)) {
	                  draw.polygon($('.' + element2), drawTime);
	                }
	              }
	            })(elements[i], elements[j]), delay);
	        

	        if (mode != 'terminusDelayed') {
	          delay += drawTime;
	        } else {
	          delay += delayIncrement;
	        }
    	}
      }

    } else {
      var modeArray = [];
      var elementsArray = [];
      var n1;
      var n2;
      if (mode.indexOf("by") >= 0) {
        modeArray = mode.split('by');
        n1 = Number(modeArray[0]);
        n2 = modeArray[1];
        for (i = 0; i <= elements.length - 1; i += n1) {
          if (tools.idCompare(elements[i], id)) {
            for (var j = 0; j < n1; j++) {
              elementsArray.push(elements[i + j])
            }

            setTimeout(
              (function(element) {
                return function() {
                  for (var j = 0; j < n1; j++) {
                    if ($('.' + element[j]).is(path)) {
                      draw.path($('.' + element[j]), drawTime);
                    } else if ($('.' + element[j]).is(rect)) {
                      draw.rect($('.' + element[j]), drawTime);
                    } else if ($('.' + element[j]).is(circle)) {
                      draw.circle($('.' + element[j]), drawTime);
                    } else if ($('.' + element[j]).is(line)) {
                      draw.line($('.' + element[j]), drawTime);
                    } else if ($('.' + element[j]).is(polygon)) {
                      draw.polygon($('.' + element[j]), drawTime);
                    }
                  }

                }
              })(elementsArray), delay);
            elementsArray = [];

            if (n2.indexOf("Delayed") >= 0) {
              delay += delayIncrement;
            } else {
              delay += drawTime;
            }
          }

        }
      }
    }

  }

  var clearSVG = function(el, opts) {
    el.children().each(function() {
      var cls = tools.randomClass();
      $(this).attr('class', cls + "_" + id);
      elements.push(cls + "_" + id);
      if ($(this).is(g)) {
        clearSVG($(this));
      } else if ($(this).is(path)) {
        clear.path($(this));
      } else if ($(this).is(rect)) {
        clear.rect($(this));
      } else if ($(this).is(circle)) {
        clear.circle($(this));
      } else if ($(this).is(line)) {
        clear.line($(this));
      } else if ($(this).is(polygon)) {
        clear.polygon($(this));
      }
    });

  }

  var resetSVG = function(el, id) {
    var tokens = [];
    for (i = 0; i <= elements.length - 1; i++) {
      tokens = elements[i].split('_');
      if (id == Number(tokens[tokens.length - 1])) {
        tools.destroy($('.' + elements[i]));
      }
    }
    elements = [];
    /*el.children().each(function() {
      if ($(this).is(g)) {
        resetSVG($(this));
      } else{
        tools.destroy($(this));
      }
    });*/
  }

  var draw = {
    path: function(el, drawTime) {
      tools.dashDraw(el, drawTime);
      //tools.drawFill(el, drawTime);

    },
    rect: function(el, drawTime) {
      tools.dashDraw(el, drawTime);
      //tools.drawFill(el, drawTime);

    },
    circle: function(el, drawTime) {
      tools.dashDraw(el, drawTime);
      //tools.drawFill(el, drawTime);

    },
    line: function(el, drawTime) {
      tools.dashDraw(el, drawTime);
      //tools.drawFill(el, drawTime);

    },
    polygon: function(el, drawTime) {
      tools.dashDraw(el, drawTime);
      //tools.drawFill(el, drawTime);

    }
  };

  var clear = {
    path: function(el) {
      var pathLength = tools.getPathLength(el);
      tools.dashClear(el, pathLength);
      //tools.clearFill(el);
    },
    rect: function(el) {
      tools.dashClear(el, tools.getRectLength(el));
      //tools.clearFill(el);
    },
    circle: function(el) {
      tools.dashClear(el, tools.getCircleLength(el));
      //tools.clearFill(el);
    },
    line: function(el) {
      tools.dashClear(el, tools.getLineLength(el));
      //tools.clearFill(el);
    },
    polygon: function(el) {
      tools.dashClear(el, tools.getPolygonLength(el));
      //tools.clearFill(el);
    }
  };

  var tools = {

    /**
     *
     * Used to get the length of a rect
     *
     * @param el is the rect element ex $('.rect')
     * @return the length of the rect in px
     */
    getRectLength: function(el) {
      var w = el.attr('width');
      var h = el.attr('height');

      return (w * 2) + (h * 2);
    },

    /**
     *
     * Used to get the length of a Polygon
     *
     * @param el is the Polygon element ex $('.polygon')
     * @return the length of the Polygon in px
     */
    getPolygonLength: function(el) {
      var points = el.attr('points');
      points = points.split(" ");
      var x1 = null,
        x2, y1 = null,
        y2, lineLength = 0,
        x3, y3;
      for (var i = 0; i < points.length; i++) {
        var coords = points[i].split(",");
        if (x1 == null && y1 == null) {

          if (/(\r\n|\n|\r)/gm.test(coords[0])) {
            coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm, "");
            coords[0] = coords[0].replace(/\s+/g, "");
          }

          if (/(\r\n|\n|\r)/gm.test(coords[1])) {
            coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm, "");
            coords[0] = coords[1].replace(/\s+/g, "");
          }

          x1 = coords[0];
          y1 = coords[1];
          x3 = coords[0];
          y3 = coords[1];

        } else {

          if (coords[0] != "" && coords[1] != "" && isNaN(coords)) {

            if (/(\r\n|\n|\r)/gm.test(coords[0])) {
              coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm, "");
              coords[0] = coords[0].replace(/\s+/g, "");
            }

            if (/(\r\n|\n|\r)/gm.test(coords[1])) {
              coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm, "");
              coords[0] = coords[1].replace(/\s+/g, "");
            }

            x2 = coords[0];
            y2 = coords[1];

            lineLength += Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

            x1 = x2;
            y1 = y2;
            if (i == points.length - 2) {
              lineLength += Math.sqrt(Math.pow((x3 - x1), 2) + Math.pow((y3 - y1), 2));
            }

          }
        }

      }
      return lineLength;

    },

    /**
     *
     * Used to get the length of a line
     *
     * @param el is the line element ex $('.line')
     * @return the length of the line in px
     */
    getLineLength: function(el) {
      var x1 = el.attr('x1');
      var x2 = el.attr('x2');
      var y1 = el.attr('y1');
      var y2 = el.attr('y2');
      var lineLength = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
      return lineLength;

    },

    /**
     *
     * Used to get the length of a circle
     *
     * @param el is the circle element
     * @return the length of the circle in px
     */
    getCircleLength: function(el) {
      var r = el.attr('r');
      var circleLength = 2 * Math.PI * r;
      return circleLength;
    },

    ///// fix this to remember the fill color

    clearFill: function(el) {
      el.css({
        // "fill" : "none"
        "fill-opacity": "0"
      });
    },

    drawFill: function(el, drawTime) {
      el.animate({
        "fill-opacity": 1
      }, {
        duration: drawTime
      });
    },

    /**
     *
     * Used to clear the path
     *
     * @param el is the path element
     * @param v is the value of the dash
     */
    dashClear: function(el, v) {
      el.css({
        "stroke-dasharray": v + "px",
        "stroke-dashoffset": v + "px"
      });
    },

    destroy: function(el) {
      el.stop().css({
        "stroke-dashoffset": "0px"
      });
    },

    /**
     *
     * Used to clear the path
     *
     * @param el is the path element
     */
    dashDraw: function(el, drawTime) {
      el.animate({
        // "stroke-dasharray":0,
        "stroke-dashoffset": 0
      }, {
        queue: false,
        duration: drawTime
      });
    },

    /**
     *
     * Used to get the length of the path
     *
     * @param el is the path element
     * @return the length of the path in px
     */
    getPathLength: function(el) {
      var pathCoords = el.get(0);
      var pathLength = pathCoords.getTotalLength();
      return pathLength;
    },

    /**
     *
     * Used to generate random class names
     *
     * @return a random class string
     */
    randomClass: function() {
      return 'z-' + Math.random().toString(36).substr(2, 6);
    },

    idCompare: function(cls, id) {
      var clsArray = [];
      clsArray = cls.split('_');
      if (Number(clsArray[1]) == id) {
        return true;
      }
      return false;
    },

    arrayShuffle: function(o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    },

    randomColor: function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

  }

})(jQuery);
