/* */ 
(function(process) {
  (function(root, factory) {
    if (typeof module === 'object' && module.exports) {
      module.exports = root.document ? factory(root) : factory;
    } else {
      root.Highcharts = factory(root);
    }
  }(typeof window !== 'undefined' ? window : this, function(win) {
    var UNDEFINED,
        doc = win.document,
        math = Math,
        mathRound = math.round,
        mathFloor = math.floor,
        mathCeil = math.ceil,
        mathMax = math.max,
        mathMin = math.min,
        mathAbs = math.abs,
        mathCos = math.cos,
        mathSin = math.sin,
        mathPI = math.PI,
        deg2rad = mathPI * 2 / 360,
        userAgent = (win.navigator && win.navigator.userAgent) || '',
        isOpera = win.opera,
        isMS = /(msie|trident|edge)/i.test(userAgent) && !isOpera,
        docMode8 = doc && doc.documentMode === 8,
        isWebKit = !isMS && /AppleWebKit/.test(userAgent),
        isFirefox = /Firefox/.test(userAgent),
        isTouchDevice = /(Mobile|Android|Windows Phone)/.test(userAgent),
        SVG_NS = 'http://www.w3.org/2000/svg',
        hasSVG = doc && doc.createElementNS && !!doc.createElementNS(SVG_NS, 'svg').createSVGRect,
        hasBidiBug = isFirefox && parseInt(userAgent.split('Firefox/')[1], 10) < 4,
        useCanVG = doc && !hasSVG && !isMS && !!doc.createElement('canvas').getContext,
        Renderer,
        hasTouch,
        symbolSizes = {},
        idCounter = 0,
        garbageBin,
        defaultOptions,
        dateFormat,
        pathAnim,
        timeUnits,
        noop = function() {},
        charts = [],
        chartCount = 0,
        PRODUCT = 'Highcharts',
        VERSION = '4.2.5',
        DIV = 'div',
        ABSOLUTE = 'absolute',
        RELATIVE = 'relative',
        HIDDEN = 'hidden',
        PREFIX = 'highcharts-',
        VISIBLE = 'visible',
        PX = 'px',
        NONE = 'none',
        M = 'M',
        L = 'L',
        numRegex = /^[0-9]+$/,
        NORMAL_STATE = '',
        HOVER_STATE = 'hover',
        SELECT_STATE = 'select',
        marginNames = ['plotTop', 'marginRight', 'marginBottom', 'plotLeft'],
        AxisPlotLineOrBandExtension,
        STROKE_WIDTH = 'stroke-width',
        Date,
        makeTime,
        timezoneOffset,
        getTimezoneOffset,
        getMinutes,
        getHours,
        getDay,
        getDate,
        getMonth,
        getFullYear,
        setMilliseconds,
        setSeconds,
        setMinutes,
        setHours,
        setDate,
        setMonth,
        setFullYear,
        seriesTypes = {},
        Highcharts;
    function error(code, stop) {
      var msg = 'Highcharts error #' + code + ': www.highcharts.com/errors/' + code;
      if (stop) {
        throw new Error(msg);
      }
      if (win.console) {
        console.log(msg);
      }
    }
    Highcharts = win.Highcharts ? error(16, true) : {win: win};
    Highcharts.seriesTypes = seriesTypes;
    var timers = [],
        getStyle,
        inArray,
        each,
        grep,
        offset,
        map,
        addEvent,
        removeEvent,
        fireEvent,
        animate,
        stop;
    function Fx(elem, options, prop) {
      this.options = options;
      this.elem = elem;
      this.prop = prop;
    }
    Fx.prototype = {
      dSetter: function() {
        var start = this.paths[0],
            end = this.paths[1],
            ret = [],
            now = this.now,
            i = start.length,
            startVal;
        if (now === 1) {
          ret = this.toD;
        } else if (i === end.length && now < 1) {
          while (i--) {
            startVal = parseFloat(start[i]);
            ret[i] = isNaN(startVal) ? start[i] : now * (parseFloat(end[i] - startVal)) + startVal;
          }
        } else {
          ret = end;
        }
        this.elem.attr('d', ret);
      },
      update: function() {
        var elem = this.elem,
            prop = this.prop,
            now = this.now,
            step = this.options.step;
        if (this[prop + 'Setter']) {
          this[prop + 'Setter']();
        } else if (elem.attr) {
          if (elem.element) {
            elem.attr(prop, now);
          }
        } else {
          elem.style[prop] = now + this.unit;
        }
        if (step) {
          step.call(elem, now, this);
        }
      },
      run: function(from, to, unit) {
        var self = this,
            timer = function(gotoEnd) {
              return timer.stopped ? false : self.step(gotoEnd);
            },
            i;
        this.startTime = +new Date();
        this.start = from;
        this.end = to;
        this.unit = unit;
        this.now = this.start;
        this.pos = 0;
        timer.elem = this.elem;
        if (timer() && timers.push(timer) === 1) {
          timer.timerId = setInterval(function() {
            for (i = 0; i < timers.length; i++) {
              if (!timers[i]()) {
                timers.splice(i--, 1);
              }
            }
            if (!timers.length) {
              clearInterval(timer.timerId);
            }
          }, 13);
        }
      },
      step: function(gotoEnd) {
        var t = +new Date(),
            ret,
            done,
            options = this.options,
            elem = this.elem,
            complete = options.complete,
            duration = options.duration,
            curAnim = options.curAnim,
            i;
        if (elem.attr && !elem.element) {
          ret = false;
        } else if (gotoEnd || t >= duration + this.startTime) {
          this.now = this.end;
          this.pos = 1;
          this.update();
          curAnim[this.prop] = true;
          done = true;
          for (i in curAnim) {
            if (curAnim[i] !== true) {
              done = false;
            }
          }
          if (done && complete) {
            complete.call(elem);
          }
          ret = false;
        } else {
          this.pos = options.easing((t - this.startTime) / duration);
          this.now = this.start + ((this.end - this.start) * this.pos);
          this.update();
          ret = true;
        }
        return ret;
      },
      initPath: function(elem, fromD, toD) {
        fromD = fromD || '';
        var shift = elem.shift,
            bezier = fromD.indexOf('C') > -1,
            numParams = bezier ? 7 : 3,
            endLength,
            slice,
            i,
            start = fromD.split(' '),
            end = [].concat(toD),
            isArea = elem.isArea,
            positionFactor = isArea ? 2 : 1,
            sixify = function(arr) {
              i = arr.length;
              while (i--) {
                if (arr[i] === M || arr[i] === L) {
                  arr.splice(i + 1, 0, arr[i + 1], arr[i + 2], arr[i + 1], arr[i + 2]);
                }
              }
            };
        if (bezier) {
          sixify(start);
          sixify(end);
        }
        if (shift <= end.length / numParams && start.length === end.length) {
          while (shift--) {
            end = end.slice(0, numParams).concat(end);
            if (isArea) {
              end = end.concat(end.slice(end.length - numParams));
            }
          }
        }
        elem.shift = 0;
        if (start.length) {
          endLength = end.length;
          while (start.length < endLength) {
            slice = start.slice().splice((start.length / positionFactor) - numParams, numParams * positionFactor);
            if (bezier) {
              slice[numParams - 6] = slice[numParams - 2];
              slice[numParams - 5] = slice[numParams - 1];
            }
            [].splice.apply(start, [(start.length / positionFactor), 0].concat(slice));
          }
        }
        return [start, end];
      }
    };
    var extend = Highcharts.extend = function(a, b) {
      var n;
      if (!a) {
        a = {};
      }
      for (n in b) {
        a[n] = b[n];
      }
      return a;
    };
    function merge() {
      var i,
          args = arguments,
          len,
          ret = {},
          doCopy = function(copy, original) {
            var value,
                key;
            if (typeof copy !== 'object') {
              copy = {};
            }
            for (key in original) {
              if (original.hasOwnProperty(key)) {
                value = original[key];
                if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]' && key !== 'renderTo' && typeof value.nodeType !== 'number') {
                  copy[key] = doCopy(copy[key] || {}, value);
                } else {
                  copy[key] = original[key];
                }
              }
            }
            return copy;
          };
      if (args[0] === true) {
        ret = args[1];
        args = Array.prototype.slice.call(args, 2);
      }
      len = args.length;
      for (i = 0; i < len; i++) {
        ret = doCopy(ret, args[i]);
      }
      return ret;
    }
    function pInt(s, mag) {
      return parseInt(s, mag || 10);
    }
    function isString(s) {
      return typeof s === 'string';
    }
    function isObject(obj) {
      return obj && typeof obj === 'object';
    }
    function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    var isNumber = Highcharts.isNumber = function isNumber(n) {
      return typeof n === 'number' && !isNaN(n);
    };
    function erase(arr, item) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === item) {
          arr.splice(i, 1);
          break;
        }
      }
    }
    function defined(obj) {
      return obj !== UNDEFINED && obj !== null;
    }
    function attr(elem, prop, value) {
      var key,
          ret;
      if (isString(prop)) {
        if (defined(value)) {
          elem.setAttribute(prop, value);
        } else if (elem && elem.getAttribute) {
          ret = elem.getAttribute(prop);
        }
      } else if (defined(prop) && isObject(prop)) {
        for (key in prop) {
          elem.setAttribute(key, prop[key]);
        }
      }
      return ret;
    }
    function splat(obj) {
      return isArray(obj) ? obj : [obj];
    }
    function syncTimeout(fn, delay, context) {
      if (delay) {
        return setTimeout(fn, delay, context);
      }
      fn.call(0, context);
    }
    var pick = Highcharts.pick = function() {
      var args = arguments,
          i,
          arg,
          length = args.length;
      for (i = 0; i < length; i++) {
        arg = args[i];
        if (arg !== UNDEFINED && arg !== null) {
          return arg;
        }
      }
    };
    function css(el, styles) {
      if (isMS && !hasSVG) {
        if (styles && styles.opacity !== UNDEFINED) {
          styles.filter = 'alpha(opacity=' + (styles.opacity * 100) + ')';
        }
      }
      extend(el.style, styles);
    }
    function createElement(tag, attribs, styles, parent, nopad) {
      var el = doc.createElement(tag);
      if (attribs) {
        extend(el, attribs);
      }
      if (nopad) {
        css(el, {
          padding: 0,
          border: 'none',
          margin: 0
        });
      }
      if (styles) {
        css(el, styles);
      }
      if (parent) {
        parent.appendChild(el);
      }
      return el;
    }
    function extendClass(Parent, members) {
      var object = function() {};
      object.prototype = new Parent();
      extend(object.prototype, members);
      return object;
    }
    function pad(number, length, padder) {
      return new Array((length || 2) + 1 - String(number).length).join(padder || 0) + number;
    }
    function relativeLength(value, base) {
      return (/%$/).test(value) ? base * parseFloat(value) / 100 : parseFloat(value);
    }
    var wrap = Highcharts.wrap = function(obj, method, func) {
      var proceed = obj[method];
      obj[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(proceed);
        return func.apply(this, args);
      };
    };
    function getTZOffset(timestamp) {
      return ((getTimezoneOffset && getTimezoneOffset(timestamp)) || timezoneOffset || 0) * 60000;
    }
    dateFormat = function(format, timestamp, capitalize) {
      if (!isNumber(timestamp)) {
        return defaultOptions.lang.invalidDate || '';
      }
      format = pick(format, '%Y-%m-%d %H:%M:%S');
      var date = new Date(timestamp - getTZOffset(timestamp)),
          key,
          hours = date[getHours](),
          day = date[getDay](),
          dayOfMonth = date[getDate](),
          month = date[getMonth](),
          fullYear = date[getFullYear](),
          lang = defaultOptions.lang,
          langWeekdays = lang.weekdays,
          shortWeekdays = lang.shortWeekdays,
          replacements = extend({
            'a': shortWeekdays ? shortWeekdays[day] : langWeekdays[day].substr(0, 3),
            'A': langWeekdays[day],
            'd': pad(dayOfMonth),
            'e': pad(dayOfMonth, 2, ' '),
            'w': day,
            'b': lang.shortMonths[month],
            'B': lang.months[month],
            'm': pad(month + 1),
            'y': fullYear.toString().substr(2, 2),
            'Y': fullYear,
            'H': pad(hours),
            'k': hours,
            'I': pad((hours % 12) || 12),
            'l': (hours % 12) || 12,
            'M': pad(date[getMinutes]()),
            'p': hours < 12 ? 'AM' : 'PM',
            'P': hours < 12 ? 'am' : 'pm',
            'S': pad(date.getSeconds()),
            'L': pad(mathRound(timestamp % 1000), 3)
          }, Highcharts.dateFormats);
      for (key in replacements) {
        while (format.indexOf('%' + key) !== -1) {
          format = format.replace('%' + key, typeof replacements[key] === 'function' ? replacements[key](timestamp) : replacements[key]);
        }
      }
      return capitalize ? format.substr(0, 1).toUpperCase() + format.substr(1) : format;
    };
    function formatSingle(format, val) {
      var floatRegex = /f$/,
          decRegex = /\.([0-9])/,
          lang = defaultOptions.lang,
          decimals;
      if (floatRegex.test(format)) {
        decimals = format.match(decRegex);
        decimals = decimals ? decimals[1] : -1;
        if (val !== null) {
          val = Highcharts.numberFormat(val, decimals, lang.decimalPoint, format.indexOf(',') > -1 ? lang.thousandsSep : '');
        }
      } else {
        val = dateFormat(format, val);
      }
      return val;
    }
    function format(str, ctx) {
      var splitter = '{',
          isInside = false,
          segment,
          valueAndFormat,
          path,
          i,
          len,
          ret = [],
          val,
          index;
      while ((index = str.indexOf(splitter)) !== -1) {
        segment = str.slice(0, index);
        if (isInside) {
          valueAndFormat = segment.split(':');
          path = valueAndFormat.shift().split('.');
          len = path.length;
          val = ctx;
          for (i = 0; i < len; i++) {
            val = val[path[i]];
          }
          if (valueAndFormat.length) {
            val = formatSingle(valueAndFormat.join(':'), val);
          }
          ret.push(val);
        } else {
          ret.push(segment);
        }
        str = str.slice(index + 1);
        isInside = !isInside;
        splitter = isInside ? '}' : '{';
      }
      ret.push(str);
      return ret.join('');
    }
    function getMagnitude(num) {
      return math.pow(10, mathFloor(math.log(num) / math.LN10));
    }
    function normalizeTickInterval(interval, multiples, magnitude, allowDecimals, preventExceed) {
      var normalized,
          i,
          retInterval = interval;
      magnitude = pick(magnitude, 1);
      normalized = interval / magnitude;
      if (!multiples) {
        multiples = [1, 2, 2.5, 5, 10];
        if (allowDecimals === false) {
          if (magnitude === 1) {
            multiples = [1, 2, 5, 10];
          } else if (magnitude <= 0.1) {
            multiples = [1 / magnitude];
          }
        }
      }
      for (i = 0; i < multiples.length; i++) {
        retInterval = multiples[i];
        if ((preventExceed && retInterval * magnitude >= interval) || (!preventExceed && (normalized <= (multiples[i] + (multiples[i + 1] || multiples[i])) / 2))) {
          break;
        }
      }
      retInterval *= magnitude;
      return retInterval;
    }
    function stableSort(arr, sortFunction) {
      var length = arr.length,
          sortValue,
          i;
      for (i = 0; i < length; i++) {
        arr[i].safeI = i;
      }
      arr.sort(function(a, b) {
        sortValue = sortFunction(a, b);
        return sortValue === 0 ? a.safeI - b.safeI : sortValue;
      });
      for (i = 0; i < length; i++) {
        delete arr[i].safeI;
      }
    }
    function arrayMin(data) {
      var i = data.length,
          min = data[0];
      while (i--) {
        if (data[i] < min) {
          min = data[i];
        }
      }
      return min;
    }
    function arrayMax(data) {
      var i = data.length,
          max = data[0];
      while (i--) {
        if (data[i] > max) {
          max = data[i];
        }
      }
      return max;
    }
    function destroyObjectProperties(obj, except) {
      var n;
      for (n in obj) {
        if (obj[n] && obj[n] !== except && obj[n].destroy) {
          obj[n].destroy();
        }
        delete obj[n];
      }
    }
    function discardElement(element) {
      if (!garbageBin) {
        garbageBin = createElement(DIV);
      }
      if (element) {
        garbageBin.appendChild(element);
      }
      garbageBin.innerHTML = '';
    }
    function correctFloat(num, prec) {
      return parseFloat(num.toPrecision(prec || 14));
    }
    function setAnimation(animation, chart) {
      chart.renderer.globalAnimation = pick(animation, chart.animation);
    }
    function animObject(animation) {
      return isObject(animation) ? merge(animation) : {duration: animation ? 500 : 0};
    }
    timeUnits = {
      millisecond: 1,
      second: 1000,
      minute: 60000,
      hour: 3600000,
      day: 24 * 3600000,
      week: 7 * 24 * 3600000,
      month: 28 * 24 * 3600000,
      year: 364 * 24 * 3600000
    };
    Highcharts.numberFormat = function(number, decimals, decimalPoint, thousandsSep) {
      number = +number || 0;
      decimals = +decimals;
      var lang = defaultOptions.lang,
          origDec = (number.toString().split('.')[1] || '').length,
          decimalComponent,
          strinteger,
          thousands,
          absNumber = Math.abs(number),
          ret;
      if (decimals === -1) {
        decimals = Math.min(origDec, 20);
      } else if (!isNumber(decimals)) {
        decimals = 2;
      }
      strinteger = String(pInt(absNumber.toFixed(decimals)));
      thousands = strinteger.length > 3 ? strinteger.length % 3 : 0;
      decimalPoint = pick(decimalPoint, lang.decimalPoint);
      thousandsSep = pick(thousandsSep, lang.thousandsSep);
      ret = number < 0 ? '-' : '';
      ret += thousands ? strinteger.substr(0, thousands) + thousandsSep : '';
      ret += strinteger.substr(thousands).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep);
      if (decimals) {
        decimalComponent = Math.abs(absNumber - strinteger + Math.pow(10, -Math.max(decimals, origDec) - 1));
        ret += decimalPoint + decimalComponent.toFixed(decimals).slice(2);
      }
      return ret;
    };
    Math.easeInOutSine = function(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    };
    getStyle = function(el, prop) {
      var style;
      if (prop === 'width') {
        return Math.min(el.offsetWidth, el.scrollWidth) - getStyle(el, 'padding-left') - getStyle(el, 'padding-right');
      } else if (prop === 'height') {
        return Math.min(el.offsetHeight, el.scrollHeight) - getStyle(el, 'padding-top') - getStyle(el, 'padding-bottom');
      }
      style = win.getComputedStyle(el, undefined);
      return style && pInt(style.getPropertyValue(prop));
    };
    inArray = function(item, arr) {
      return arr.indexOf ? arr.indexOf(item) : [].indexOf.call(arr, item);
    };
    grep = function(elements, callback) {
      return [].filter.call(elements, callback);
    };
    map = function(arr, fn) {
      var results = [],
          i = 0,
          len = arr.length;
      for (; i < len; i++) {
        results[i] = fn.call(arr[i], arr[i], i, arr);
      }
      return results;
    };
    offset = function(el) {
      var docElem = doc.documentElement,
          box = el.getBoundingClientRect();
      return {
        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
      };
    };
    stop = function(el) {
      var i = timers.length;
      while (i--) {
        if (timers[i].elem === el) {
          timers[i].stopped = true;
        }
      }
    };
    each = function(arr, fn) {
      return Array.prototype.forEach.call(arr, fn);
    };
    addEvent = function(el, type, fn) {
      var events = el.hcEvents = el.hcEvents || {};
      function wrappedFn(e) {
        e.target = e.srcElement || win;
        fn.call(el, e);
      }
      if (el.addEventListener) {
        el.addEventListener(type, fn, false);
      } else if (el.attachEvent) {
        if (!el.hcEventsIE) {
          el.hcEventsIE = {};
        }
        el.hcEventsIE[fn.toString()] = wrappedFn;
        el.attachEvent('on' + type, wrappedFn);
      }
      if (!events[type]) {
        events[type] = [];
      }
      events[type].push(fn);
    };
    removeEvent = function(el, type, fn) {
      var events,
          hcEvents = el.hcEvents,
          index;
      function removeOneEvent(type, fn) {
        if (el.removeEventListener) {
          el.removeEventListener(type, fn, false);
        } else if (el.attachEvent) {
          fn = el.hcEventsIE[fn.toString()];
          el.detachEvent('on' + type, fn);
        }
      }
      function removeAllEvents() {
        var types,
            len,
            n;
        if (!el.nodeName) {
          return;
        }
        if (type) {
          types = {};
          types[type] = true;
        } else {
          types = hcEvents;
        }
        for (n in types) {
          if (hcEvents[n]) {
            len = hcEvents[n].length;
            while (len--) {
              removeOneEvent(n, hcEvents[n][len]);
            }
          }
        }
      }
      if (hcEvents) {
        if (type) {
          events = hcEvents[type] || [];
          if (fn) {
            index = inArray(fn, events);
            if (index > -1) {
              events.splice(index, 1);
              hcEvents[type] = events;
            }
            removeOneEvent(type, fn);
          } else {
            removeAllEvents();
            hcEvents[type] = [];
          }
        } else {
          removeAllEvents();
          el.hcEvents = {};
        }
      }
    };
    fireEvent = function(el, type, eventArguments, defaultFunction) {
      var e,
          hcEvents = el.hcEvents,
          events,
          len,
          i,
          fn;
      eventArguments = eventArguments || {};
      if (doc.createEvent && (el.dispatchEvent || el.fireEvent)) {
        e = doc.createEvent('Events');
        e.initEvent(type, true, true);
        e.target = el;
        extend(e, eventArguments);
        if (el.dispatchEvent) {
          el.dispatchEvent(e);
        } else {
          el.fireEvent(type, e);
        }
      } else if (hcEvents) {
        events = hcEvents[type] || [];
        len = events.length;
        if (!eventArguments.preventDefault) {
          eventArguments.preventDefault = function() {
            eventArguments.defaultPrevented = true;
          };
        }
        eventArguments.target = el;
        if (!eventArguments.type) {
          eventArguments.type = type;
        }
        for (i = 0; i < len; i++) {
          fn = events[i];
          if (fn.call(el, eventArguments) === false) {
            eventArguments.preventDefault();
          }
        }
      }
      if (defaultFunction && !eventArguments.defaultPrevented) {
        defaultFunction(eventArguments);
      }
    };
    animate = function(el, params, opt) {
      var start,
          unit = '',
          end,
          fx,
          args,
          prop;
      if (!isObject(opt)) {
        args = arguments;
        opt = {
          duration: args[2],
          easing: args[3],
          complete: args[4]
        };
      }
      if (!isNumber(opt.duration)) {
        opt.duration = 400;
      }
      opt.easing = typeof opt.easing === 'function' ? opt.easing : (Math[opt.easing] || Math.easeInOutSine);
      opt.curAnim = merge(params);
      for (prop in params) {
        fx = new Fx(el, opt, prop);
        end = null;
        if (prop === 'd') {
          fx.paths = fx.initPath(el, el.d, params.d);
          fx.toD = params.d;
          start = 0;
          end = 1;
        } else if (el.attr) {
          start = el.attr(prop);
        } else {
          start = parseFloat(getStyle(el, prop)) || 0;
          if (prop !== 'opacity') {
            unit = 'px';
          }
        }
        if (!end) {
          end = params[prop];
        }
        if (end.match && end.match('px')) {
          end = end.replace(/px/g, '');
        }
        fx.run(start, end, unit);
      }
    };
    if (win.jQuery) {
      win.jQuery.fn.highcharts = function() {
        var args = [].slice.call(arguments);
        if (this[0]) {
          if (args[0]) {
            new Highcharts[isString(args[0]) ? args.shift() : 'Chart'](this[0], args[0], args[1]);
            return this;
          }
          return charts[attr(this[0], 'data-highcharts-chart')];
        }
      };
    }
    if (doc && !doc.defaultView) {
      getStyle = function(el, prop) {
        var val,
            alias = {
              width: 'clientWidth',
              height: 'clientHeight'
            }[prop];
        if (el.style[prop]) {
          return pInt(el.style[prop]);
        }
        if (prop === 'opacity') {
          prop = 'filter';
        }
        if (alias) {
          el.style.zoom = 1;
          return Math.max(el[alias] - 2 * getStyle(el, 'padding'), 0);
        }
        val = el.currentStyle[prop.replace(/\-(\w)/g, function(a, b) {
          return b.toUpperCase();
        })];
        if (prop === 'filter') {
          val = val.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
            return b / 100;
          });
        }
        return val === '' ? 1 : pInt(val);
      };
    }
    if (!Array.prototype.forEach) {
      each = function(arr, fn) {
        var i = 0,
            len = arr.length;
        for (; i < len; i++) {
          if (fn.call(arr[i], arr[i], i, arr) === false) {
            return i;
          }
        }
      };
    }
    if (!Array.prototype.indexOf) {
      inArray = function(item, arr) {
        var len,
            i = 0;
        if (arr) {
          len = arr.length;
          for (; i < len; i++) {
            if (arr[i] === item) {
              return i;
            }
          }
        }
        return -1;
      };
    }
    if (!Array.prototype.filter) {
      grep = function(elements, fn) {
        var ret = [],
            i = 0,
            length = elements.length;
        for (; i < length; i++) {
          if (fn(elements[i], i)) {
            ret.push(elements[i]);
          }
        }
        return ret;
      };
    }
    Highcharts.Fx = Fx;
    Highcharts.inArray = inArray;
    Highcharts.each = each;
    Highcharts.grep = grep;
    Highcharts.offset = offset;
    Highcharts.map = map;
    Highcharts.addEvent = addEvent;
    Highcharts.removeEvent = removeEvent;
    Highcharts.fireEvent = fireEvent;
    Highcharts.animate = animate;
    Highcharts.animObject = animObject;
    Highcharts.stop = stop;
    defaultOptions = {
      colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
      symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
      lang: {
        loading: 'Loading...',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        decimalPoint: '.',
        numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
        resetZoom: 'Reset zoom',
        resetZoomTitle: 'Reset zoom level 1:1',
        thousandsSep: ' '
      },
      global: {
        useUTC: true,
        canvasToolsURL: 'http://code.highcharts.com/modules/canvas-tools.js',
        VMLRadialGradientURL: 'http://code.highcharts.com/4.2.5/gfx/vml-radial-gradient.png'
      },
      chart: {
        borderColor: '#4572A7',
        borderRadius: 0,
        defaultSeriesType: 'line',
        ignoreHiddenSeries: true,
        spacing: [10, 10, 15, 10],
        backgroundColor: '#FFFFFF',
        plotBorderColor: '#C0C0C0',
        resetZoomButton: {
          theme: {zIndex: 20},
          position: {
            align: 'right',
            x: -10,
            y: 10
          }
        }
      },
      title: {
        text: 'Chart title',
        align: 'center',
        margin: 15,
        style: {
          color: '#333333',
          fontSize: '18px'
        },
        widthAdjust: -44
      },
      subtitle: {
        text: '',
        align: 'center',
        style: {color: '#555555'},
        widthAdjust: -44
      },
      plotOptions: {line: {
          allowPointSelect: false,
          showCheckbox: false,
          animation: {duration: 1000},
          events: {},
          lineWidth: 2,
          marker: {
            lineWidth: 0,
            radius: 4,
            lineColor: '#FFFFFF',
            states: {
              hover: {
                enabled: true,
                lineWidthPlus: 1,
                radiusPlus: 2
              },
              select: {
                fillColor: '#FFFFFF',
                lineColor: '#000000',
                lineWidth: 2
              }
            }
          },
          point: {events: {}},
          dataLabels: {
            align: 'center',
            formatter: function() {
              return this.y === null ? '' : Highcharts.numberFormat(this.y, -1);
            },
            style: {
              color: 'contrast',
              fontSize: '11px',
              fontWeight: 'bold',
              textShadow: '0 0 6px contrast, 0 0 3px contrast'
            },
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
            padding: 5
          },
          cropThreshold: 300,
          pointRange: 0,
          softThreshold: true,
          states: {
            hover: {
              lineWidthPlus: 1,
              marker: {},
              halo: {
                size: 10,
                opacity: 0.25
              }
            },
            select: {marker: {}}
          },
          stickyTracking: true,
          turboThreshold: 1000
        }},
      labels: {style: {
          position: ABSOLUTE,
          color: '#3E576F'
        }},
      legend: {
        enabled: true,
        align: 'center',
        layout: 'horizontal',
        labelFormatter: function() {
          return this.name;
        },
        borderColor: '#909090',
        borderRadius: 0,
        navigation: {
          activeColor: '#274b6d',
          inactiveColor: '#CCC'
        },
        shadow: false,
        itemStyle: {
          color: '#333333',
          fontSize: '12px',
          fontWeight: 'bold'
        },
        itemHoverStyle: {color: '#000'},
        itemHiddenStyle: {color: '#CCC'},
        itemCheckboxStyle: {
          position: ABSOLUTE,
          width: '13px',
          height: '13px'
        },
        symbolPadding: 5,
        verticalAlign: 'bottom',
        x: 0,
        y: 0,
        title: {style: {fontWeight: 'bold'}}
      },
      loading: {
        labelStyle: {
          fontWeight: 'bold',
          position: RELATIVE,
          top: '45%'
        },
        style: {
          position: ABSOLUTE,
          backgroundColor: 'white',
          opacity: 0.5,
          textAlign: 'center'
        }
      },
      tooltip: {
        enabled: true,
        animation: hasSVG,
        backgroundColor: 'rgba(249, 249, 249, .85)',
        borderWidth: 1,
        borderRadius: 3,
        dateTimeLabelFormats: {
          millisecond: '%A, %b %e, %H:%M:%S.%L',
          second: '%A, %b %e, %H:%M:%S',
          minute: '%A, %b %e, %H:%M',
          hour: '%A, %b %e, %H:%M',
          day: '%A, %b %e, %Y',
          week: 'Week from %A, %b %e, %Y',
          month: '%B %Y',
          year: '%Y'
        },
        footerFormat: '',
        headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
        shadow: true,
        snap: isTouchDevice ? 25 : 10,
        style: {
          color: '#333333',
          cursor: 'default',
          fontSize: '12px',
          padding: '8px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }
      },
      credits: {
        enabled: true,
        text: 'Highcharts.com',
        href: 'http://www.highcharts.com',
        position: {
          align: 'right',
          x: -10,
          verticalAlign: 'bottom',
          y: -5
        },
        style: {
          cursor: 'pointer',
          color: '#909090',
          fontSize: '9px'
        }
      }
    };
    function setTimeMethods() {
      var globalOptions = defaultOptions.global,
          useUTC = globalOptions.useUTC,
          GET = useUTC ? 'getUTC' : 'get',
          SET = useUTC ? 'setUTC' : 'set';
      Date = globalOptions.Date || win.Date;
      timezoneOffset = useUTC && globalOptions.timezoneOffset;
      getTimezoneOffset = useUTC && globalOptions.getTimezoneOffset;
      makeTime = function(year, month, date, hours, minutes, seconds) {
        var d;
        if (useUTC) {
          d = Date.UTC.apply(0, arguments);
          d += getTZOffset(d);
        } else {
          d = new Date(year, month, pick(date, 1), pick(hours, 0), pick(minutes, 0), pick(seconds, 0)).getTime();
        }
        return d;
      };
      getMinutes = GET + 'Minutes';
      getHours = GET + 'Hours';
      getDay = GET + 'Day';
      getDate = GET + 'Date';
      getMonth = GET + 'Month';
      getFullYear = GET + 'FullYear';
      setMilliseconds = SET + 'Milliseconds';
      setSeconds = SET + 'Seconds';
      setMinutes = SET + 'Minutes';
      setHours = SET + 'Hours';
      setDate = SET + 'Date';
      setMonth = SET + 'Month';
      setFullYear = SET + 'FullYear';
    }
    function setOptions(options) {
      defaultOptions = merge(true, defaultOptions, options);
      setTimeMethods();
      return defaultOptions;
    }
    function getOptions() {
      return defaultOptions;
    }
    var defaultPlotOptions = defaultOptions.plotOptions,
        defaultSeriesOptions = defaultPlotOptions.line;
    setTimeMethods();
    function Color(input) {
      if (!(this instanceof Color)) {
        return new Color(input);
      }
      this.init(input);
    }
    Color.prototype = {
      parsers: [{
        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        parse: function(result) {
          return [pInt(result[1]), pInt(result[2]), pInt(result[3]), parseFloat(result[4], 10)];
        }
      }, {
        regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        parse: function(result) {
          return [pInt(result[1], 16), pInt(result[2], 16), pInt(result[3], 16), 1];
        }
      }, {
        regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        parse: function(result) {
          return [pInt(result[1]), pInt(result[2]), pInt(result[3]), 1];
        }
      }],
      init: function(input) {
        var result,
            rgba,
            i,
            parser;
        this.input = input;
        if (input && input.stops) {
          this.stops = map(input.stops, function(stop) {
            return new Color(stop[1]);
          });
        } else {
          i = this.parsers.length;
          while (i-- && !rgba) {
            parser = this.parsers[i];
            result = parser.regex.exec(input);
            if (result) {
              rgba = parser.parse(result);
            }
          }
        }
        this.rgba = rgba || [];
      },
      get: function(format) {
        var input = this.input,
            rgba = this.rgba,
            ret;
        if (this.stops) {
          ret = merge(input);
          ret.stops = [].concat(ret.stops);
          each(this.stops, function(stop, i) {
            ret.stops[i] = [ret.stops[i][0], stop.get(format)];
          });
        } else if (rgba && isNumber(rgba[0])) {
          if (format === 'rgb' || (!format && rgba[3] === 1)) {
            ret = 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
          } else if (format === 'a') {
            ret = rgba[3];
          } else {
            ret = 'rgba(' + rgba.join(',') + ')';
          }
        } else {
          ret = input;
        }
        return ret;
      },
      brighten: function(alpha) {
        var i,
            rgba = this.rgba;
        if (this.stops) {
          each(this.stops, function(stop) {
            stop.brighten(alpha);
          });
        } else if (isNumber(alpha) && alpha !== 0) {
          for (i = 0; i < 3; i++) {
            rgba[i] += pInt(alpha * 255);
            if (rgba[i] < 0) {
              rgba[i] = 0;
            }
            if (rgba[i] > 255) {
              rgba[i] = 255;
            }
          }
        }
        return this;
      },
      setOpacity: function(alpha) {
        this.rgba[3] = alpha;
        return this;
      }
    };
    function SVGElement() {}
    SVGElement.prototype = {
      opacity: 1,
      textProps: ['direction', 'fontSize', 'fontWeight', 'fontFamily', 'fontStyle', 'color', 'lineHeight', 'width', 'textDecoration', 'textOverflow', 'textShadow'],
      init: function(renderer, nodeName) {
        var wrapper = this;
        wrapper.element = nodeName === 'span' ? createElement(nodeName) : doc.createElementNS(SVG_NS, nodeName);
        wrapper.renderer = renderer;
      },
      animate: function(params, options, complete) {
        var animOptions = pick(options, this.renderer.globalAnimation, true);
        stop(this);
        if (animOptions) {
          if (complete) {
            animOptions.complete = complete;
          }
          animate(this, params, animOptions);
        } else {
          this.attr(params, null, complete);
        }
        return this;
      },
      colorGradient: function(color, prop, elem) {
        var renderer = this.renderer,
            colorObject,
            gradName,
            gradAttr,
            radAttr,
            gradients,
            gradientObject,
            stops,
            stopColor,
            stopOpacity,
            radialReference,
            n,
            id,
            key = [],
            value;
        if (color.linearGradient) {
          gradName = 'linearGradient';
        } else if (color.radialGradient) {
          gradName = 'radialGradient';
        }
        if (gradName) {
          gradAttr = color[gradName];
          gradients = renderer.gradients;
          stops = color.stops;
          radialReference = elem.radialReference;
          if (isArray(gradAttr)) {
            color[gradName] = gradAttr = {
              x1: gradAttr[0],
              y1: gradAttr[1],
              x2: gradAttr[2],
              y2: gradAttr[3],
              gradientUnits: 'userSpaceOnUse'
            };
          }
          if (gradName === 'radialGradient' && radialReference && !defined(gradAttr.gradientUnits)) {
            radAttr = gradAttr;
            gradAttr = merge(gradAttr, renderer.getRadialAttr(radialReference, radAttr), {gradientUnits: 'userSpaceOnUse'});
          }
          for (n in gradAttr) {
            if (n !== 'id') {
              key.push(n, gradAttr[n]);
            }
          }
          for (n in stops) {
            key.push(stops[n]);
          }
          key = key.join(',');
          if (gradients[key]) {
            id = gradients[key].attr('id');
          } else {
            gradAttr.id = id = PREFIX + idCounter++;
            gradients[key] = gradientObject = renderer.createElement(gradName).attr(gradAttr).add(renderer.defs);
            gradientObject.radAttr = radAttr;
            gradientObject.stops = [];
            each(stops, function(stop) {
              var stopObject;
              if (stop[1].indexOf('rgba') === 0) {
                colorObject = Color(stop[1]);
                stopColor = colorObject.get('rgb');
                stopOpacity = colorObject.get('a');
              } else {
                stopColor = stop[1];
                stopOpacity = 1;
              }
              stopObject = renderer.createElement('stop').attr({
                offset: stop[0],
                'stop-color': stopColor,
                'stop-opacity': stopOpacity
              }).add(gradientObject);
              gradientObject.stops.push(stopObject);
            });
          }
          value = 'url(' + renderer.url + '#' + id + ')';
          elem.setAttribute(prop, value);
          elem.gradient = key;
          color.toString = function() {
            return value;
          };
        }
      },
      applyTextShadow: function(textShadow) {
        var elem = this.element,
            tspans,
            hasContrast = textShadow.indexOf('contrast') !== -1,
            styles = {},
            forExport = this.renderer.forExport,
            supports = forExport || (elem.style.textShadow !== UNDEFINED && !isMS);
        if (hasContrast) {
          styles.textShadow = textShadow = textShadow.replace(/contrast/g, this.renderer.getContrast(elem.style.fill));
        }
        if (isWebKit || forExport) {
          styles.textRendering = 'geometricPrecision';
        }
        if (supports) {
          this.css(styles);
        } else {
          this.fakeTS = true;
          this.ySetter = this.xSetter;
          tspans = [].slice.call(elem.getElementsByTagName('tspan'));
          each(textShadow.split(/\s?,\s?/g), function(textShadow) {
            var firstChild = elem.firstChild,
                color,
                strokeWidth;
            textShadow = textShadow.split(' ');
            color = textShadow[textShadow.length - 1];
            strokeWidth = textShadow[textShadow.length - 2];
            if (strokeWidth) {
              each(tspans, function(tspan, y) {
                var clone;
                if (y === 0) {
                  tspan.setAttribute('x', elem.getAttribute('x'));
                  y = elem.getAttribute('y');
                  tspan.setAttribute('y', y || 0);
                  if (y === null) {
                    elem.setAttribute('y', 0);
                  }
                }
                clone = tspan.cloneNode(1);
                attr(clone, {
                  'class': PREFIX + 'text-shadow',
                  'fill': color,
                  'stroke': color,
                  'stroke-opacity': 1 / mathMax(pInt(strokeWidth), 3),
                  'stroke-width': strokeWidth,
                  'stroke-linejoin': 'round'
                });
                elem.insertBefore(clone, firstChild);
              });
            }
          });
        }
      },
      attr: function(hash, val, complete) {
        var key,
            value,
            element = this.element,
            hasSetSymbolSize,
            ret = this,
            skipAttr,
            setter;
        if (typeof hash === 'string' && val !== UNDEFINED) {
          key = hash;
          hash = {};
          hash[key] = val;
        }
        if (typeof hash === 'string') {
          ret = (this[hash + 'Getter'] || this._defaultGetter).call(this, hash, element);
        } else {
          for (key in hash) {
            value = hash[key];
            skipAttr = false;
            if (this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(key)) {
              if (!hasSetSymbolSize) {
                this.symbolAttr(hash);
                hasSetSymbolSize = true;
              }
              skipAttr = true;
            }
            if (this.rotation && (key === 'x' || key === 'y')) {
              this.doTransform = true;
            }
            if (!skipAttr) {
              setter = this[key + 'Setter'] || this._defaultSetter;
              setter.call(this, value, key, element);
              if (this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(key)) {
                this.updateShadows(key, value, setter);
              }
            }
          }
          if (this.doTransform) {
            this.updateTransform();
            this.doTransform = false;
          }
        }
        if (complete) {
          complete();
        }
        return ret;
      },
      updateShadows: function(key, value, setter) {
        var shadows = this.shadows,
            i = shadows.length;
        while (i--) {
          setter.call(shadows[i], key === 'height' ? Math.max(value - (shadows[i].cutHeight || 0), 0) : key === 'd' ? this.d : value, key, shadows[i]);
        }
      },
      addClass: function(className) {
        var element = this.element,
            currentClassName = attr(element, 'class') || '';
        if (currentClassName.indexOf(className) === -1) {
          attr(element, 'class', currentClassName + ' ' + className);
        }
        return this;
      },
      symbolAttr: function(hash) {
        var wrapper = this;
        each(['x', 'y', 'r', 'start', 'end', 'width', 'height', 'innerR', 'anchorX', 'anchorY'], function(key) {
          wrapper[key] = pick(hash[key], wrapper[key]);
        });
        wrapper.attr({d: wrapper.renderer.symbols[wrapper.symbolName](wrapper.x, wrapper.y, wrapper.width, wrapper.height, wrapper)});
      },
      clip: function(clipRect) {
        return this.attr('clip-path', clipRect ? 'url(' + this.renderer.url + '#' + clipRect.id + ')' : NONE);
      },
      crisp: function(rect) {
        var wrapper = this,
            key,
            attribs = {},
            normalizer,
            strokeWidth = wrapper.strokeWidth || 0;
        normalizer = mathRound(strokeWidth) % 2 / 2;
        rect.x = mathFloor(rect.x || wrapper.x || 0) + normalizer;
        rect.y = mathFloor(rect.y || wrapper.y || 0) + normalizer;
        rect.width = mathFloor((rect.width || wrapper.width || 0) - 2 * normalizer);
        rect.height = mathFloor((rect.height || wrapper.height || 0) - 2 * normalizer);
        rect.strokeWidth = strokeWidth;
        for (key in rect) {
          if (wrapper[key] !== rect[key]) {
            wrapper[key] = attribs[key] = rect[key];
          }
        }
        return attribs;
      },
      css: function(styles) {
        var elemWrapper = this,
            oldStyles = elemWrapper.styles,
            newStyles = {},
            elem = elemWrapper.element,
            textWidth,
            n,
            serializedCss = '',
            hyphenate,
            hasNew = !oldStyles;
        if (styles && styles.color) {
          styles.fill = styles.color;
        }
        if (oldStyles) {
          for (n in styles) {
            if (styles[n] !== oldStyles[n]) {
              newStyles[n] = styles[n];
              hasNew = true;
            }
          }
        }
        if (hasNew) {
          textWidth = elemWrapper.textWidth = (styles && styles.width && elem.nodeName.toLowerCase() === 'text' && pInt(styles.width)) || elemWrapper.textWidth;
          if (oldStyles) {
            styles = extend(oldStyles, newStyles);
          }
          elemWrapper.styles = styles;
          if (textWidth && (useCanVG || (!hasSVG && elemWrapper.renderer.forExport))) {
            delete styles.width;
          }
          if (isMS && !hasSVG) {
            css(elemWrapper.element, styles);
          } else {
            hyphenate = function(a, b) {
              return '-' + b.toLowerCase();
            };
            for (n in styles) {
              serializedCss += n.replace(/([A-Z])/g, hyphenate) + ':' + styles[n] + ';';
            }
            attr(elem, 'style', serializedCss);
          }
          if (textWidth && elemWrapper.added) {
            elemWrapper.renderer.buildText(elemWrapper);
          }
        }
        return elemWrapper;
      },
      on: function(eventType, handler) {
        var svgElement = this,
            element = svgElement.element;
        if (hasTouch && eventType === 'click') {
          element.ontouchstart = function(e) {
            svgElement.touchEventFired = Date.now();
            e.preventDefault();
            handler.call(element, e);
          };
          element.onclick = function(e) {
            if (userAgent.indexOf('Android') === -1 || Date.now() - (svgElement.touchEventFired || 0) > 1100) {
              handler.call(element, e);
            }
          };
        } else {
          element['on' + eventType] = handler;
        }
        return this;
      },
      setRadialReference: function(coordinates) {
        var existingGradient = this.renderer.gradients[this.element.gradient];
        this.element.radialReference = coordinates;
        if (existingGradient && existingGradient.radAttr) {
          existingGradient.animate(this.renderer.getRadialAttr(coordinates, existingGradient.radAttr));
        }
        return this;
      },
      translate: function(x, y) {
        return this.attr({
          translateX: x,
          translateY: y
        });
      },
      invert: function() {
        var wrapper = this;
        wrapper.inverted = true;
        wrapper.updateTransform();
        return wrapper;
      },
      updateTransform: function() {
        var wrapper = this,
            translateX = wrapper.translateX || 0,
            translateY = wrapper.translateY || 0,
            scaleX = wrapper.scaleX,
            scaleY = wrapper.scaleY,
            inverted = wrapper.inverted,
            rotation = wrapper.rotation,
            element = wrapper.element,
            transform;
        if (inverted) {
          translateX += wrapper.attr('width');
          translateY += wrapper.attr('height');
        }
        transform = ['translate(' + translateX + ',' + translateY + ')'];
        if (inverted) {
          transform.push('rotate(90) scale(-1,1)');
        } else if (rotation) {
          transform.push('rotate(' + rotation + ' ' + (element.getAttribute('x') || 0) + ' ' + (element.getAttribute('y') || 0) + ')');
        }
        if (defined(scaleX) || defined(scaleY)) {
          transform.push('scale(' + pick(scaleX, 1) + ' ' + pick(scaleY, 1) + ')');
        }
        if (transform.length) {
          element.setAttribute('transform', transform.join(' '));
        }
      },
      toFront: function() {
        var element = this.element;
        element.parentNode.appendChild(element);
        return this;
      },
      align: function(alignOptions, alignByTranslate, box) {
        var align,
            vAlign,
            x,
            y,
            attribs = {},
            alignTo,
            renderer = this.renderer,
            alignedObjects = renderer.alignedObjects;
        if (alignOptions) {
          this.alignOptions = alignOptions;
          this.alignByTranslate = alignByTranslate;
          if (!box || isString(box)) {
            this.alignTo = alignTo = box || 'renderer';
            erase(alignedObjects, this);
            alignedObjects.push(this);
            box = null;
          }
        } else {
          alignOptions = this.alignOptions;
          alignByTranslate = this.alignByTranslate;
          alignTo = this.alignTo;
        }
        box = pick(box, renderer[alignTo], renderer);
        align = alignOptions.align;
        vAlign = alignOptions.verticalAlign;
        x = (box.x || 0) + (alignOptions.x || 0);
        y = (box.y || 0) + (alignOptions.y || 0);
        if (align === 'right' || align === 'center') {
          x += (box.width - (alignOptions.width || 0)) / {
            right: 1,
            center: 2
          }[align];
        }
        attribs[alignByTranslate ? 'translateX' : 'x'] = mathRound(x);
        if (vAlign === 'bottom' || vAlign === 'middle') {
          y += (box.height - (alignOptions.height || 0)) / ({
            bottom: 1,
            middle: 2
          }[vAlign] || 1);
        }
        attribs[alignByTranslate ? 'translateY' : 'y'] = mathRound(y);
        this[this.placed ? 'animate' : 'attr'](attribs);
        this.placed = true;
        this.alignAttr = attribs;
        return this;
      },
      getBBox: function(reload, rot) {
        var wrapper = this,
            bBox,
            renderer = wrapper.renderer,
            width,
            height,
            rotation,
            rad,
            element = wrapper.element,
            styles = wrapper.styles,
            textStr = wrapper.textStr,
            textShadow,
            elemStyle = element.style,
            toggleTextShadowShim,
            cache = renderer.cache,
            cacheKeys = renderer.cacheKeys,
            cacheKey;
        rotation = pick(rot, wrapper.rotation);
        rad = rotation * deg2rad;
        if (textStr !== UNDEFINED) {
          cacheKey = ['', rotation || 0, styles && styles.fontSize, element.style.width].join(',');
          if (textStr === '' || numRegex.test(textStr)) {
            cacheKey = 'num:' + textStr.toString().length + cacheKey;
          } else {
            cacheKey = textStr + cacheKey;
          }
        }
        if (cacheKey && !reload) {
          bBox = cache[cacheKey];
        }
        if (!bBox) {
          if (element.namespaceURI === SVG_NS || renderer.forExport) {
            try {
              toggleTextShadowShim = this.fakeTS && function(display) {
                each(element.querySelectorAll('.' + PREFIX + 'text-shadow'), function(tspan) {
                  tspan.style.display = display;
                });
              };
              if (isFirefox && elemStyle.textShadow) {
                textShadow = elemStyle.textShadow;
                elemStyle.textShadow = '';
              } else if (toggleTextShadowShim) {
                toggleTextShadowShim(NONE);
              }
              bBox = element.getBBox ? extend({}, element.getBBox()) : {
                width: element.offsetWidth,
                height: element.offsetHeight
              };
              if (textShadow) {
                elemStyle.textShadow = textShadow;
              } else if (toggleTextShadowShim) {
                toggleTextShadowShim('');
              }
            } catch (e) {}
            if (!bBox || bBox.width < 0) {
              bBox = {
                width: 0,
                height: 0
              };
            }
          } else {
            bBox = wrapper.htmlGetBBox();
          }
          if (renderer.isSVG) {
            width = bBox.width;
            height = bBox.height;
            if (isMS && styles && styles.fontSize === '11px' && height.toPrecision(3) === '16.9') {
              bBox.height = height = 14;
            }
            if (rotation) {
              bBox.width = mathAbs(height * mathSin(rad)) + mathAbs(width * mathCos(rad));
              bBox.height = mathAbs(height * mathCos(rad)) + mathAbs(width * mathSin(rad));
            }
          }
          if (cacheKey) {
            while (cacheKeys.length > 250) {
              delete cache[cacheKeys.shift()];
            }
            if (!cache[cacheKey]) {
              cacheKeys.push(cacheKey);
            }
            cache[cacheKey] = bBox;
          }
        }
        return bBox;
      },
      show: function(inherit) {
        return this.attr({visibility: inherit ? 'inherit' : VISIBLE});
      },
      hide: function() {
        return this.attr({visibility: HIDDEN});
      },
      fadeOut: function(duration) {
        var elemWrapper = this;
        elemWrapper.animate({opacity: 0}, {
          duration: duration || 150,
          complete: function() {
            elemWrapper.attr({y: -9999});
          }
        });
      },
      add: function(parent) {
        var renderer = this.renderer,
            element = this.element,
            inserted;
        if (parent) {
          this.parentGroup = parent;
        }
        this.parentInverted = parent && parent.inverted;
        if (this.textStr !== undefined) {
          renderer.buildText(this);
        }
        this.added = true;
        if (!parent || parent.handleZ || this.zIndex) {
          inserted = this.zIndexSetter();
        }
        if (!inserted) {
          (parent ? parent.element : renderer.box).appendChild(element);
        }
        if (this.onAdd) {
          this.onAdd();
        }
        return this;
      },
      safeRemoveChild: function(element) {
        var parentNode = element.parentNode;
        if (parentNode) {
          parentNode.removeChild(element);
        }
      },
      destroy: function() {
        var wrapper = this,
            element = wrapper.element || {},
            shadows = wrapper.shadows,
            parentToClean = wrapper.renderer.isSVG && element.nodeName === 'SPAN' && wrapper.parentGroup,
            grandParent,
            key,
            i;
        element.onclick = element.onmouseout = element.onmouseover = element.onmousemove = element.point = null;
        stop(wrapper);
        if (wrapper.clipPath) {
          wrapper.clipPath = wrapper.clipPath.destroy();
        }
        if (wrapper.stops) {
          for (i = 0; i < wrapper.stops.length; i++) {
            wrapper.stops[i] = wrapper.stops[i].destroy();
          }
          wrapper.stops = null;
        }
        wrapper.safeRemoveChild(element);
        if (shadows) {
          each(shadows, function(shadow) {
            wrapper.safeRemoveChild(shadow);
          });
        }
        while (parentToClean && parentToClean.div && parentToClean.div.childNodes.length === 0) {
          grandParent = parentToClean.parentGroup;
          wrapper.safeRemoveChild(parentToClean.div);
          delete parentToClean.div;
          parentToClean = grandParent;
        }
        if (wrapper.alignTo) {
          erase(wrapper.renderer.alignedObjects, wrapper);
        }
        for (key in wrapper) {
          delete wrapper[key];
        }
        return null;
      },
      shadow: function(shadowOptions, group, cutOff) {
        var shadows = [],
            i,
            shadow,
            element = this.element,
            strokeWidth,
            shadowWidth,
            shadowElementOpacity,
            transform;
        if (shadowOptions) {
          shadowWidth = pick(shadowOptions.width, 3);
          shadowElementOpacity = (shadowOptions.opacity || 0.15) / shadowWidth;
          transform = this.parentInverted ? '(-1,-1)' : '(' + pick(shadowOptions.offsetX, 1) + ', ' + pick(shadowOptions.offsetY, 1) + ')';
          for (i = 1; i <= shadowWidth; i++) {
            shadow = element.cloneNode(0);
            strokeWidth = (shadowWidth * 2) + 1 - (2 * i);
            attr(shadow, {
              'isShadow': 'true',
              'stroke': shadowOptions.color || 'black',
              'stroke-opacity': shadowElementOpacity * i,
              'stroke-width': strokeWidth,
              'transform': 'translate' + transform,
              'fill': NONE
            });
            if (cutOff) {
              attr(shadow, 'height', mathMax(attr(shadow, 'height') - strokeWidth, 0));
              shadow.cutHeight = strokeWidth;
            }
            if (group) {
              group.element.appendChild(shadow);
            } else {
              element.parentNode.insertBefore(shadow, element);
            }
            shadows.push(shadow);
          }
          this.shadows = shadows;
        }
        return this;
      },
      xGetter: function(key) {
        if (this.element.nodeName === 'circle') {
          key = {
            x: 'cx',
            y: 'cy'
          }[key] || key;
        }
        return this._defaultGetter(key);
      },
      _defaultGetter: function(key) {
        var ret = pick(this[key], this.element ? this.element.getAttribute(key) : null, 0);
        if (/^[\-0-9\.]+$/.test(ret)) {
          ret = parseFloat(ret);
        }
        return ret;
      },
      dSetter: function(value, key, element) {
        if (value && value.join) {
          value = value.join(' ');
        }
        if (/(NaN| {2}|^$)/.test(value)) {
          value = 'M 0 0';
        }
        element.setAttribute(key, value);
        this[key] = value;
      },
      dashstyleSetter: function(value) {
        var i,
            strokeWidth = this['stroke-width'];
        if (strokeWidth === 'inherit') {
          strokeWidth = 1;
        }
        value = value && value.toLowerCase();
        if (value) {
          value = value.replace('shortdashdotdot', '3,1,1,1,1,1,').replace('shortdashdot', '3,1,1,1').replace('shortdot', '1,1,').replace('shortdash', '3,1,').replace('longdash', '8,3,').replace(/dot/g, '1,3,').replace('dash', '4,3,').replace(/,$/, '').split(',');
          i = value.length;
          while (i--) {
            value[i] = pInt(value[i]) * strokeWidth;
          }
          value = value.join(',').replace(/NaN/g, 'none');
          this.element.setAttribute('stroke-dasharray', value);
        }
      },
      alignSetter: function(value) {
        this.element.setAttribute('text-anchor', {
          left: 'start',
          center: 'middle',
          right: 'end'
        }[value]);
      },
      opacitySetter: function(value, key, element) {
        this[key] = value;
        element.setAttribute(key, value);
      },
      titleSetter: function(value) {
        var titleNode = this.element.getElementsByTagName('title')[0];
        if (!titleNode) {
          titleNode = doc.createElementNS(SVG_NS, 'title');
          this.element.appendChild(titleNode);
        }
        if (titleNode.firstChild) {
          titleNode.removeChild(titleNode.firstChild);
        }
        titleNode.appendChild(doc.createTextNode((String(pick(value), '')).replace(/<[^>]*>/g, '')));
      },
      textSetter: function(value) {
        if (value !== this.textStr) {
          delete this.bBox;
          this.textStr = value;
          if (this.added) {
            this.renderer.buildText(this);
          }
        }
      },
      fillSetter: function(value, key, element) {
        if (typeof value === 'string') {
          element.setAttribute(key, value);
        } else if (value) {
          this.colorGradient(value, key, element);
        }
      },
      visibilitySetter: function(value, key, element) {
        if (value === 'inherit') {
          element.removeAttribute(key);
        } else {
          element.setAttribute(key, value);
        }
      },
      zIndexSetter: function(value, key) {
        var renderer = this.renderer,
            parentGroup = this.parentGroup,
            parentWrapper = parentGroup || renderer,
            parentNode = parentWrapper.element || renderer.box,
            childNodes,
            otherElement,
            otherZIndex,
            element = this.element,
            inserted,
            run = this.added,
            i;
        if (defined(value)) {
          element.zIndex = value;
          value = +value;
          if (this[key] === value) {
            run = false;
          }
          this[key] = value;
        }
        if (run) {
          value = this.zIndex;
          if (value && parentGroup) {
            parentGroup.handleZ = true;
          }
          childNodes = parentNode.childNodes;
          for (i = 0; i < childNodes.length && !inserted; i++) {
            otherElement = childNodes[i];
            otherZIndex = otherElement.zIndex;
            if (otherElement !== element && (pInt(otherZIndex) > value || (!defined(value) && defined(otherZIndex)))) {
              parentNode.insertBefore(element, otherElement);
              inserted = true;
            }
          }
          if (!inserted) {
            parentNode.appendChild(element);
          }
        }
        return inserted;
      },
      _defaultSetter: function(value, key, element) {
        element.setAttribute(key, value);
      }
    };
    SVGElement.prototype.yGetter = SVGElement.prototype.xGetter;
    SVGElement.prototype.translateXSetter = SVGElement.prototype.translateYSetter = SVGElement.prototype.rotationSetter = SVGElement.prototype.verticalAlignSetter = SVGElement.prototype.scaleXSetter = SVGElement.prototype.scaleYSetter = function(value, key) {
      this[key] = value;
      this.doTransform = true;
    };
    SVGElement.prototype['stroke-widthSetter'] = SVGElement.prototype.strokeSetter = function(value, key, element) {
      this[key] = value;
      if (this.stroke && this['stroke-width']) {
        this.strokeWidth = this['stroke-width'];
        SVGElement.prototype.fillSetter.call(this, this.stroke, 'stroke', element);
        element.setAttribute('stroke-width', this['stroke-width']);
        this.hasStroke = true;
      } else if (key === 'stroke-width' && value === 0 && this.hasStroke) {
        element.removeAttribute('stroke');
        this.hasStroke = false;
      }
    };
    var SVGRenderer = function() {
      this.init.apply(this, arguments);
    };
    SVGRenderer.prototype = {
      Element: SVGElement,
      init: function(container, width, height, style, forExport, allowHTML) {
        var renderer = this,
            boxWrapper,
            element,
            desc;
        boxWrapper = renderer.createElement('svg').attr({version: '1.1'}).css(this.getStyle(style));
        element = boxWrapper.element;
        container.appendChild(element);
        if (container.innerHTML.indexOf('xmlns') === -1) {
          attr(element, 'xmlns', SVG_NS);
        }
        renderer.isSVG = true;
        renderer.box = element;
        renderer.boxWrapper = boxWrapper;
        renderer.alignedObjects = [];
        renderer.url = (isFirefox || isWebKit) && doc.getElementsByTagName('base').length ? win.location.href.replace(/#.*?$/, '').replace(/([\('\)])/g, '\\$1').replace(/ /g, '%20') : '';
        desc = this.createElement('desc').add();
        desc.element.appendChild(doc.createTextNode('Created with ' + PRODUCT + ' ' + VERSION));
        renderer.defs = this.createElement('defs').add();
        renderer.allowHTML = allowHTML;
        renderer.forExport = forExport;
        renderer.gradients = {};
        renderer.cache = {};
        renderer.cacheKeys = [];
        renderer.imgCount = 0;
        renderer.setSize(width, height, false);
        var subPixelFix,
            rect;
        if (isFirefox && container.getBoundingClientRect) {
          renderer.subPixelFix = subPixelFix = function() {
            css(container, {
              left: 0,
              top: 0
            });
            rect = container.getBoundingClientRect();
            css(container, {
              left: (mathCeil(rect.left) - rect.left) + PX,
              top: (mathCeil(rect.top) - rect.top) + PX
            });
          };
          subPixelFix();
          addEvent(win, 'resize', subPixelFix);
        }
      },
      getStyle: function(style) {
        this.style = extend({
          fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
          fontSize: '12px'
        }, style);
        return this.style;
      },
      isHidden: function() {
        return !this.boxWrapper.getBBox().width;
      },
      destroy: function() {
        var renderer = this,
            rendererDefs = renderer.defs;
        renderer.box = null;
        renderer.boxWrapper = renderer.boxWrapper.destroy();
        destroyObjectProperties(renderer.gradients || {});
        renderer.gradients = null;
        if (rendererDefs) {
          renderer.defs = rendererDefs.destroy();
        }
        if (renderer.subPixelFix) {
          removeEvent(win, 'resize', renderer.subPixelFix);
        }
        renderer.alignedObjects = null;
        return null;
      },
      createElement: function(nodeName) {
        var wrapper = new this.Element();
        wrapper.init(this, nodeName);
        return wrapper;
      },
      draw: function() {},
      getRadialAttr: function(radialReference, gradAttr) {
        return {
          cx: (radialReference[0] - radialReference[2] / 2) + gradAttr.cx * radialReference[2],
          cy: (radialReference[1] - radialReference[2] / 2) + gradAttr.cy * radialReference[2],
          r: gradAttr.r * radialReference[2]
        };
      },
      buildText: function(wrapper) {
        var textNode = wrapper.element,
            renderer = this,
            forExport = renderer.forExport,
            textStr = pick(wrapper.textStr, '').toString(),
            hasMarkup = textStr.indexOf('<') !== -1,
            lines,
            childNodes = textNode.childNodes,
            styleRegex,
            hrefRegex,
            wasTooLong,
            parentX = attr(textNode, 'x'),
            textStyles = wrapper.styles,
            width = wrapper.textWidth,
            textLineHeight = textStyles && textStyles.lineHeight,
            textShadow = textStyles && textStyles.textShadow,
            ellipsis = textStyles && textStyles.textOverflow === 'ellipsis',
            i = childNodes.length,
            tempParent = width && !wrapper.added && this.box,
            getLineHeight = function(tspan) {
              return textLineHeight ? pInt(textLineHeight) : renderer.fontMetrics(/(px|em)$/.test(tspan && tspan.style.fontSize) ? tspan.style.fontSize : ((textStyles && textStyles.fontSize) || renderer.style.fontSize || 12), tspan).h;
            },
            unescapeAngleBrackets = function(inputStr) {
              return inputStr.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            };
        while (i--) {
          textNode.removeChild(childNodes[i]);
        }
        if (!hasMarkup && !textShadow && !ellipsis && textStr.indexOf(' ') === -1) {
          textNode.appendChild(doc.createTextNode(unescapeAngleBrackets(textStr)));
        } else {
          styleRegex = /<.*style="([^"]+)".*>/;
          hrefRegex = /<.*href="(http[^"]+)".*>/;
          if (tempParent) {
            tempParent.appendChild(textNode);
          }
          if (hasMarkup) {
            lines = textStr.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, '<span').replace(/<\/(b|strong|i|em|a)>/g, '</span>').split(/<br.*?>/g);
          } else {
            lines = [textStr];
          }
          lines = grep(lines, function(line) {
            return line !== '';
          });
          each(lines, function buildTextLines(line, lineNo) {
            var spans,
                spanNo = 0;
            line = line.replace(/^\s+|\s+$/g, '').replace(/<span/g, '|||<span').replace(/<\/span>/g, '</span>|||');
            spans = line.split('|||');
            each(spans, function buildTextSpans(span) {
              if (span !== '' || spans.length === 1) {
                var attributes = {},
                    tspan = doc.createElementNS(SVG_NS, 'tspan'),
                    spanStyle;
                if (styleRegex.test(span)) {
                  spanStyle = span.match(styleRegex)[1].replace(/(;| |^)color([ :])/, '$1fill$2');
                  attr(tspan, 'style', spanStyle);
                }
                if (hrefRegex.test(span) && !forExport) {
                  attr(tspan, 'onclick', 'location.href=\"' + span.match(hrefRegex)[1] + '\"');
                  css(tspan, {cursor: 'pointer'});
                }
                span = unescapeAngleBrackets(span.replace(/<(.|\n)*?>/g, '') || ' ');
                if (span !== ' ') {
                  tspan.appendChild(doc.createTextNode(span));
                  if (!spanNo) {
                    if (lineNo && parentX !== null) {
                      attributes.x = parentX;
                    }
                  } else {
                    attributes.dx = 0;
                  }
                  attr(tspan, attributes);
                  textNode.appendChild(tspan);
                  if (!spanNo && lineNo) {
                    if (!hasSVG && forExport) {
                      css(tspan, {display: 'block'});
                    }
                    attr(tspan, 'dy', getLineHeight(tspan));
                  }
                  if (width) {
                    var words = span.replace(/([^\^])-/g, '$1- ').split(' '),
                        hasWhiteSpace = spans.length > 1 || lineNo || (words.length > 1 && textStyles.whiteSpace !== 'nowrap'),
                        tooLong,
                        actualWidth,
                        rest = [],
                        dy = getLineHeight(tspan),
                        softLineNo = 1,
                        rotation = wrapper.rotation,
                        wordStr = span,
                        cursor = wordStr.length,
                        bBox;
                    while ((hasWhiteSpace || ellipsis) && (words.length || rest.length)) {
                      wrapper.rotation = 0;
                      bBox = wrapper.getBBox(true);
                      actualWidth = bBox.width;
                      if (!hasSVG && renderer.forExport) {
                        actualWidth = renderer.measureSpanWidth(tspan.firstChild.data, wrapper.styles);
                      }
                      tooLong = actualWidth > width;
                      if (wasTooLong === undefined) {
                        wasTooLong = tooLong;
                      }
                      if (ellipsis && wasTooLong) {
                        cursor /= 2;
                        if (wordStr === '' || (!tooLong && cursor < 0.5)) {
                          words = [];
                        } else {
                          wordStr = span.substring(0, wordStr.length + (tooLong ? -1 : 1) * mathCeil(cursor));
                          words = [wordStr + (width > 3 ? '\u2026' : '')];
                          tspan.removeChild(tspan.firstChild);
                        }
                      } else if (!tooLong || words.length === 1) {
                        words = rest;
                        rest = [];
                        if (words.length) {
                          softLineNo++;
                          tspan = doc.createElementNS(SVG_NS, 'tspan');
                          attr(tspan, {
                            dy: dy,
                            x: parentX
                          });
                          if (spanStyle) {
                            attr(tspan, 'style', spanStyle);
                          }
                          textNode.appendChild(tspan);
                        }
                        if (actualWidth > width) {
                          width = actualWidth;
                        }
                      } else {
                        tspan.removeChild(tspan.firstChild);
                        rest.unshift(words.pop());
                      }
                      if (words.length) {
                        tspan.appendChild(doc.createTextNode(words.join(' ').replace(/- /g, '-')));
                      }
                    }
                    wrapper.rotation = rotation;
                  }
                  spanNo++;
                }
              }
            });
          });
          if (wasTooLong) {
            wrapper.attr('title', wrapper.textStr);
          }
          if (tempParent) {
            tempParent.removeChild(textNode);
          }
          if (textShadow && wrapper.applyTextShadow) {
            wrapper.applyTextShadow(textShadow);
          }
        }
      },
      getContrast: function(color) {
        color = Color(color).rgba;
        return color[0] + color[1] + color[2] > 384 ? '#000000' : '#FFFFFF';
      },
      button: function(text, x, y, callback, normalState, hoverState, pressedState, disabledState, shape) {
        var label = this.label(text, x, y, shape, null, null, null, null, 'button'),
            curState = 0,
            stateOptions,
            stateStyle,
            normalStyle,
            hoverStyle,
            pressedStyle,
            disabledStyle,
            verticalGradient = {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            };
        normalState = merge({
          'stroke-width': 1,
          stroke: '#CCCCCC',
          fill: {
            linearGradient: verticalGradient,
            stops: [[0, '#FEFEFE'], [1, '#F6F6F6']]
          },
          r: 2,
          padding: 5,
          style: {color: 'black'}
        }, normalState);
        normalStyle = normalState.style;
        delete normalState.style;
        hoverState = merge(normalState, {
          stroke: '#68A',
          fill: {
            linearGradient: verticalGradient,
            stops: [[0, '#FFF'], [1, '#ACF']]
          }
        }, hoverState);
        hoverStyle = hoverState.style;
        delete hoverState.style;
        pressedState = merge(normalState, {
          stroke: '#68A',
          fill: {
            linearGradient: verticalGradient,
            stops: [[0, '#9BD'], [1, '#CDF']]
          }
        }, pressedState);
        pressedStyle = pressedState.style;
        delete pressedState.style;
        disabledState = merge(normalState, {style: {color: '#CCC'}}, disabledState);
        disabledStyle = disabledState.style;
        delete disabledState.style;
        addEvent(label.element, isMS ? 'mouseover' : 'mouseenter', function() {
          if (curState !== 3) {
            label.attr(hoverState).css(hoverStyle);
          }
        });
        addEvent(label.element, isMS ? 'mouseout' : 'mouseleave', function() {
          if (curState !== 3) {
            stateOptions = [normalState, hoverState, pressedState][curState];
            stateStyle = [normalStyle, hoverStyle, pressedStyle][curState];
            label.attr(stateOptions).css(stateStyle);
          }
        });
        label.setState = function(state) {
          label.state = curState = state;
          if (!state) {
            label.attr(normalState).css(normalStyle);
          } else if (state === 2) {
            label.attr(pressedState).css(pressedStyle);
          } else if (state === 3) {
            label.attr(disabledState).css(disabledStyle);
          }
        };
        return label.on('click', function(e) {
          if (curState !== 3) {
            callback.call(label, e);
          }
        }).attr(normalState).css(extend({cursor: 'default'}, normalStyle));
      },
      crispLine: function(points, width) {
        if (points[1] === points[4]) {
          points[1] = points[4] = mathRound(points[1]) - (width % 2 / 2);
        }
        if (points[2] === points[5]) {
          points[2] = points[5] = mathRound(points[2]) + (width % 2 / 2);
        }
        return points;
      },
      path: function(path) {
        var attr = {fill: NONE};
        if (isArray(path)) {
          attr.d = path;
        } else if (isObject(path)) {
          extend(attr, path);
        }
        return this.createElement('path').attr(attr);
      },
      circle: function(x, y, r) {
        var attr = isObject(x) ? x : {
          x: x,
          y: y,
          r: r
        },
            wrapper = this.createElement('circle');
        wrapper.xSetter = wrapper.ySetter = function(value, key, element) {
          element.setAttribute('c' + key, value);
        };
        return wrapper.attr(attr);
      },
      arc: function(x, y, r, innerR, start, end) {
        var arc;
        if (isObject(x)) {
          y = x.y;
          r = x.r;
          innerR = x.innerR;
          start = x.start;
          end = x.end;
          x = x.x;
        }
        arc = this.symbol('arc', x || 0, y || 0, r || 0, r || 0, {
          innerR: innerR || 0,
          start: start || 0,
          end: end || 0
        });
        arc.r = r;
        return arc;
      },
      rect: function(x, y, width, height, r, strokeWidth) {
        r = isObject(x) ? x.r : r;
        var wrapper = this.createElement('rect'),
            attribs = isObject(x) ? x : x === UNDEFINED ? {} : {
              x: x,
              y: y,
              width: mathMax(width, 0),
              height: mathMax(height, 0)
            };
        if (strokeWidth !== UNDEFINED) {
          wrapper.strokeWidth = strokeWidth;
          attribs = wrapper.crisp(attribs);
        }
        if (r) {
          attribs.r = r;
        }
        wrapper.rSetter = function(value, key, element) {
          attr(element, {
            rx: value,
            ry: value
          });
        };
        return wrapper.attr(attribs);
      },
      setSize: function(width, height, animate) {
        var renderer = this,
            alignedObjects = renderer.alignedObjects,
            i = alignedObjects.length;
        renderer.width = width;
        renderer.height = height;
        renderer.boxWrapper[pick(animate, true) ? 'animate' : 'attr']({
          width: width,
          height: height
        });
        while (i--) {
          alignedObjects[i].align();
        }
      },
      g: function(name) {
        var elem = this.createElement('g');
        return defined(name) ? elem.attr({'class': PREFIX + name}) : elem;
      },
      image: function(src, x, y, width, height) {
        var attribs = {preserveAspectRatio: NONE},
            elemWrapper;
        if (arguments.length > 1) {
          extend(attribs, {
            x: x,
            y: y,
            width: width,
            height: height
          });
        }
        elemWrapper = this.createElement('image').attr(attribs);
        if (elemWrapper.element.setAttributeNS) {
          elemWrapper.element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', src);
        } else {
          elemWrapper.element.setAttribute('hc-svg-href', src);
        }
        return elemWrapper;
      },
      symbol: function(symbol, x, y, width, height, options) {
        var ren = this,
            obj,
            symbolFn = this.symbols[symbol],
            path = symbolFn && symbolFn(mathRound(x), mathRound(y), width, height, options),
            imageRegex = /^url\((.*?)\)$/,
            imageSrc,
            imageSize,
            centerImage;
        if (path) {
          obj = this.path(path);
          extend(obj, {
            symbolName: symbol,
            x: x,
            y: y,
            width: width,
            height: height
          });
          if (options) {
            extend(obj, options);
          }
        } else if (imageRegex.test(symbol)) {
          centerImage = function(img, size) {
            if (img.element) {
              img.attr({
                width: size[0],
                height: size[1]
              });
              if (!img.alignByTranslate) {
                img.translate(mathRound((width - size[0]) / 2), mathRound((height - size[1]) / 2));
              }
            }
          };
          imageSrc = symbol.match(imageRegex)[1];
          imageSize = symbolSizes[imageSrc] || (options && options.width && options.height && [options.width, options.height]);
          obj = this.image(imageSrc).attr({
            x: x,
            y: y
          });
          obj.isImg = true;
          if (imageSize) {
            centerImage(obj, imageSize);
          } else {
            obj.attr({
              width: 0,
              height: 0
            });
            createElement('img', {
              onload: function() {
                if (this.width === 0) {
                  css(this, {
                    position: ABSOLUTE,
                    top: '-999em'
                  });
                  doc.body.appendChild(this);
                }
                centerImage(obj, symbolSizes[imageSrc] = [this.width, this.height]);
                if (this.parentNode) {
                  this.parentNode.removeChild(this);
                }
                ren.imgCount--;
                if (!ren.imgCount && charts[ren.chartIndex].onload) {
                  charts[ren.chartIndex].onload();
                }
              },
              src: imageSrc
            });
            this.imgCount++;
          }
        }
        return obj;
      },
      symbols: {
        'circle': function(x, y, w, h) {
          var cpw = 0.166 * w;
          return [M, x + w / 2, y, 'C', x + w + cpw, y, x + w + cpw, y + h, x + w / 2, y + h, 'C', x - cpw, y + h, x - cpw, y, x + w / 2, y, 'Z'];
        },
        'square': function(x, y, w, h) {
          return [M, x, y, L, x + w, y, x + w, y + h, x, y + h, 'Z'];
        },
        'triangle': function(x, y, w, h) {
          return [M, x + w / 2, y, L, x + w, y + h, x, y + h, 'Z'];
        },
        'triangle-down': function(x, y, w, h) {
          return [M, x, y, L, x + w, y, x + w / 2, y + h, 'Z'];
        },
        'diamond': function(x, y, w, h) {
          return [M, x + w / 2, y, L, x + w, y + h / 2, x + w / 2, y + h, x, y + h / 2, 'Z'];
        },
        'arc': function(x, y, w, h, options) {
          var start = options.start,
              radius = options.r || w || h,
              end = options.end - 0.001,
              innerRadius = options.innerR,
              open = options.open,
              cosStart = mathCos(start),
              sinStart = mathSin(start),
              cosEnd = mathCos(end),
              sinEnd = mathSin(end),
              longArc = options.end - start < mathPI ? 0 : 1;
          return [M, x + radius * cosStart, y + radius * sinStart, 'A', radius, radius, 0, longArc, 1, x + radius * cosEnd, y + radius * sinEnd, open ? M : L, x + innerRadius * cosEnd, y + innerRadius * sinEnd, 'A', innerRadius, innerRadius, 0, longArc, 0, x + innerRadius * cosStart, y + innerRadius * sinStart, open ? '' : 'Z'];
        },
        callout: function(x, y, w, h, options) {
          var arrowLength = 6,
              halfDistance = 6,
              r = mathMin((options && options.r) || 0, w, h),
              safeDistance = r + halfDistance,
              anchorX = options && options.anchorX,
              anchorY = options && options.anchorY,
              path;
          path = ['M', x + r, y, 'L', x + w - r, y, 'C', x + w, y, x + w, y, x + w, y + r, 'L', x + w, y + h - r, 'C', x + w, y + h, x + w, y + h, x + w - r, y + h, 'L', x + r, y + h, 'C', x, y + h, x, y + h, x, y + h - r, 'L', x, y + r, 'C', x, y, x, y, x + r, y];
          if (anchorX && anchorX > w && anchorY > y + safeDistance && anchorY < y + h - safeDistance) {
            path.splice(13, 3, 'L', x + w, anchorY - halfDistance, x + w + arrowLength, anchorY, x + w, anchorY + halfDistance, x + w, y + h - r);
          } else if (anchorX && anchorX < 0 && anchorY > y + safeDistance && anchorY < y + h - safeDistance) {
            path.splice(33, 3, 'L', x, anchorY + halfDistance, x - arrowLength, anchorY, x, anchorY - halfDistance, x, y + r);
          } else if (anchorY && anchorY > h && anchorX > x + safeDistance && anchorX < x + w - safeDistance) {
            path.splice(23, 3, 'L', anchorX + halfDistance, y + h, anchorX, y + h + arrowLength, anchorX - halfDistance, y + h, x + r, y + h);
          } else if (anchorY && anchorY < 0 && anchorX > x + safeDistance && anchorX < x + w - safeDistance) {
            path.splice(3, 3, 'L', anchorX - halfDistance, y, anchorX, y - arrowLength, anchorX + halfDistance, y, w - r, y);
          }
          return path;
        }
      },
      clipRect: function(x, y, width, height) {
        var wrapper,
            id = PREFIX + idCounter++,
            clipPath = this.createElement('clipPath').attr({id: id}).add(this.defs);
        wrapper = this.rect(x, y, width, height, 0).add(clipPath);
        wrapper.id = id;
        wrapper.clipPath = clipPath;
        wrapper.count = 0;
        return wrapper;
      },
      text: function(str, x, y, useHTML) {
        var renderer = this,
            fakeSVG = useCanVG || (!hasSVG && renderer.forExport),
            wrapper,
            attr = {};
        if (useHTML && (renderer.allowHTML || !renderer.forExport)) {
          return renderer.html(str, x, y);
        }
        attr.x = Math.round(x || 0);
        if (y) {
          attr.y = Math.round(y);
        }
        if (str || str === 0) {
          attr.text = str;
        }
        wrapper = renderer.createElement('text').attr(attr);
        if (fakeSVG) {
          wrapper.css({position: ABSOLUTE});
        }
        if (!useHTML) {
          wrapper.xSetter = function(value, key, element) {
            var tspans = element.getElementsByTagName('tspan'),
                tspan,
                parentVal = element.getAttribute(key),
                i;
            for (i = 0; i < tspans.length; i++) {
              tspan = tspans[i];
              if (tspan.getAttribute(key) === parentVal) {
                tspan.setAttribute(key, value);
              }
            }
            element.setAttribute(key, value);
          };
        }
        return wrapper;
      },
      fontMetrics: function(fontSize, elem) {
        var lineHeight,
            baseline,
            style;
        fontSize = fontSize || this.style.fontSize;
        if (!fontSize && elem && win.getComputedStyle) {
          elem = elem.element || elem;
          style = win.getComputedStyle(elem, '');
          fontSize = style && style.fontSize;
        }
        fontSize = /px/.test(fontSize) ? pInt(fontSize) : /em/.test(fontSize) ? parseFloat(fontSize) * 12 : 12;
        lineHeight = fontSize < 24 ? fontSize + 3 : mathRound(fontSize * 1.2);
        baseline = mathRound(lineHeight * 0.8);
        return {
          h: lineHeight,
          b: baseline,
          f: fontSize
        };
      },
      rotCorr: function(baseline, rotation, alterY) {
        var y = baseline;
        if (rotation && alterY) {
          y = mathMax(y * mathCos(rotation * deg2rad), 4);
        }
        return {
          x: (-baseline / 3) * mathSin(rotation * deg2rad),
          y: y
        };
      },
      label: function(str, x, y, shape, anchorX, anchorY, useHTML, baseline, className) {
        var renderer = this,
            wrapper = renderer.g(className),
            text = renderer.text('', 0, 0, useHTML).attr({zIndex: 1}),
            box,
            bBox,
            alignFactor = 0,
            padding = 3,
            paddingLeft = 0,
            width,
            height,
            wrapperX,
            wrapperY,
            crispAdjust = 0,
            deferredAttr = {},
            baselineOffset,
            needsBox,
            updateBoxSize,
            updateTextPadding,
            boxAttr;
        updateBoxSize = function() {
          var boxX,
              boxY,
              style = text.element.style;
          bBox = (width === undefined || height === undefined || wrapper.styles.textAlign) && defined(text.textStr) && text.getBBox();
          wrapper.width = (width || bBox.width || 0) + 2 * padding + paddingLeft;
          wrapper.height = (height || bBox.height || 0) + 2 * padding;
          baselineOffset = padding + renderer.fontMetrics(style && style.fontSize, text).b;
          if (needsBox) {
            if (!box) {
              boxX = crispAdjust;
              boxY = (baseline ? -baselineOffset : 0) + crispAdjust;
              wrapper.box = box = shape ? renderer.symbol(shape, boxX, boxY, wrapper.width, wrapper.height, deferredAttr) : renderer.rect(boxX, boxY, wrapper.width, wrapper.height, 0, deferredAttr[STROKE_WIDTH]);
              if (!box.isImg) {
                box.attr('fill', NONE);
              }
              box.add(wrapper);
            }
            if (!box.isImg) {
              box.attr(extend({
                width: mathRound(wrapper.width),
                height: mathRound(wrapper.height)
              }, deferredAttr));
            }
            deferredAttr = null;
          }
        };
        updateTextPadding = function() {
          var styles = wrapper.styles,
              textAlign = styles && styles.textAlign,
              x = paddingLeft + padding,
              y;
          y = baseline ? 0 : baselineOffset;
          if (defined(width) && bBox && (textAlign === 'center' || textAlign === 'right')) {
            x += {
              center: 0.5,
              right: 1
            }[textAlign] * (width - bBox.width);
          }
          if (x !== text.x || y !== text.y) {
            text.attr('x', x);
            if (y !== UNDEFINED) {
              text.attr('y', y);
            }
          }
          text.x = x;
          text.y = y;
        };
        boxAttr = function(key, value) {
          if (box) {
            box.attr(key, value);
          } else {
            deferredAttr[key] = value;
          }
        };
        wrapper.onAdd = function() {
          text.add(wrapper);
          wrapper.attr({
            text: (str || str === 0) ? str : '',
            x: x,
            y: y
          });
          if (box && defined(anchorX)) {
            wrapper.attr({
              anchorX: anchorX,
              anchorY: anchorY
            });
          }
        };
        wrapper.widthSetter = function(value) {
          width = value;
        };
        wrapper.heightSetter = function(value) {
          height = value;
        };
        wrapper.paddingSetter = function(value) {
          if (defined(value) && value !== padding) {
            padding = wrapper.padding = value;
            updateTextPadding();
          }
        };
        wrapper.paddingLeftSetter = function(value) {
          if (defined(value) && value !== paddingLeft) {
            paddingLeft = value;
            updateTextPadding();
          }
        };
        wrapper.alignSetter = function(value) {
          value = {
            left: 0,
            center: 0.5,
            right: 1
          }[value];
          if (value !== alignFactor) {
            alignFactor = value;
            if (bBox) {
              wrapper.attr({x: wrapperX});
            }
          }
        };
        wrapper.textSetter = function(value) {
          if (value !== UNDEFINED) {
            text.textSetter(value);
          }
          updateBoxSize();
          updateTextPadding();
        };
        wrapper['stroke-widthSetter'] = function(value, key) {
          if (value) {
            needsBox = true;
          }
          crispAdjust = value % 2 / 2;
          boxAttr(key, value);
        };
        wrapper.strokeSetter = wrapper.fillSetter = wrapper.rSetter = function(value, key) {
          if (key === 'fill' && value) {
            needsBox = true;
          }
          boxAttr(key, value);
        };
        wrapper.anchorXSetter = function(value, key) {
          anchorX = value;
          boxAttr(key, mathRound(value) - crispAdjust - wrapperX);
        };
        wrapper.anchorYSetter = function(value, key) {
          anchorY = value;
          boxAttr(key, value - wrapperY);
        };
        wrapper.xSetter = function(value) {
          wrapper.x = value;
          if (alignFactor) {
            value -= alignFactor * ((width || bBox.width) + 2 * padding);
          }
          wrapperX = mathRound(value);
          wrapper.attr('translateX', wrapperX);
        };
        wrapper.ySetter = function(value) {
          wrapperY = wrapper.y = mathRound(value);
          wrapper.attr('translateY', wrapperY);
        };
        var baseCss = wrapper.css;
        return extend(wrapper, {
          css: function(styles) {
            if (styles) {
              var textStyles = {};
              styles = merge(styles);
              each(wrapper.textProps, function(prop) {
                if (styles[prop] !== UNDEFINED) {
                  textStyles[prop] = styles[prop];
                  delete styles[prop];
                }
              });
              text.css(textStyles);
            }
            return baseCss.call(wrapper, styles);
          },
          getBBox: function() {
            return {
              width: bBox.width + 2 * padding,
              height: bBox.height + 2 * padding,
              x: bBox.x - padding,
              y: bBox.y - padding
            };
          },
          shadow: function(b) {
            if (box) {
              box.shadow(b);
            }
            return wrapper;
          },
          destroy: function() {
            removeEvent(wrapper.element, 'mouseenter');
            removeEvent(wrapper.element, 'mouseleave');
            if (text) {
              text = text.destroy();
            }
            if (box) {
              box = box.destroy();
            }
            SVGElement.prototype.destroy.call(wrapper);
            wrapper = renderer = updateBoxSize = updateTextPadding = boxAttr = null;
          }
        });
      }
    };
    Renderer = SVGRenderer;
    extend(SVGElement.prototype, {
      htmlCss: function(styles) {
        var wrapper = this,
            element = wrapper.element,
            textWidth = styles && element.tagName === 'SPAN' && styles.width;
        if (textWidth) {
          delete styles.width;
          wrapper.textWidth = textWidth;
          wrapper.updateTransform();
        }
        if (styles && styles.textOverflow === 'ellipsis') {
          styles.whiteSpace = 'nowrap';
          styles.overflow = 'hidden';
        }
        wrapper.styles = extend(wrapper.styles, styles);
        css(wrapper.element, styles);
        return wrapper;
      },
      htmlGetBBox: function() {
        var wrapper = this,
            element = wrapper.element;
        if (element.nodeName === 'text') {
          element.style.position = ABSOLUTE;
        }
        return {
          x: element.offsetLeft,
          y: element.offsetTop,
          width: element.offsetWidth,
          height: element.offsetHeight
        };
      },
      htmlUpdateTransform: function() {
        if (!this.added) {
          this.alignOnAdd = true;
          return;
        }
        var wrapper = this,
            renderer = wrapper.renderer,
            elem = wrapper.element,
            translateX = wrapper.translateX || 0,
            translateY = wrapper.translateY || 0,
            x = wrapper.x || 0,
            y = wrapper.y || 0,
            align = wrapper.textAlign || 'left',
            alignCorrection = {
              left: 0,
              center: 0.5,
              right: 1
            }[align],
            shadows = wrapper.shadows,
            styles = wrapper.styles;
        css(elem, {
          marginLeft: translateX,
          marginTop: translateY
        });
        if (shadows) {
          each(shadows, function(shadow) {
            css(shadow, {
              marginLeft: translateX + 1,
              marginTop: translateY + 1
            });
          });
        }
        if (wrapper.inverted) {
          each(elem.childNodes, function(child) {
            renderer.invertChild(child, elem);
          });
        }
        if (elem.tagName === 'SPAN') {
          var rotation = wrapper.rotation,
              baseline,
              textWidth = pInt(wrapper.textWidth),
              whiteSpace = styles && styles.whiteSpace,
              currentTextTransform = [rotation, align, elem.innerHTML, wrapper.textWidth, wrapper.textAlign].join(',');
          if (currentTextTransform !== wrapper.cTT) {
            baseline = renderer.fontMetrics(elem.style.fontSize).b;
            if (defined(rotation)) {
              wrapper.setSpanRotation(rotation, alignCorrection, baseline);
            }
            if (elem.offsetWidth > textWidth && /[ \-]/.test(elem.textContent || elem.innerText)) {
              css(elem, {
                width: textWidth + PX,
                display: 'block',
                whiteSpace: whiteSpace || 'normal'
              });
              wrapper.hasTextWidth = true;
            } else if (wrapper.hasTextWidth) {
              css(elem, {
                width: '',
                display: '',
                whiteSpace: whiteSpace || 'nowrap'
              });
              wrapper.hasTextWidth = false;
            }
            wrapper.getSpanCorrection(wrapper.hasTextWidth ? textWidth : elem.offsetWidth, baseline, alignCorrection, rotation, align);
          }
          css(elem, {
            left: (x + (wrapper.xCorr || 0)) + PX,
            top: (y + (wrapper.yCorr || 0)) + PX
          });
          if (isWebKit) {
            baseline = elem.offsetHeight;
          }
          wrapper.cTT = currentTextTransform;
        }
      },
      setSpanRotation: function(rotation, alignCorrection, baseline) {
        var rotationStyle = {},
            cssTransformKey = isMS ? '-ms-transform' : isWebKit ? '-webkit-transform' : isFirefox ? 'MozTransform' : isOpera ? '-o-transform' : '';
        rotationStyle[cssTransformKey] = rotationStyle.transform = 'rotate(' + rotation + 'deg)';
        rotationStyle[cssTransformKey + (isFirefox ? 'Origin' : '-origin')] = rotationStyle.transformOrigin = (alignCorrection * 100) + '% ' + baseline + 'px';
        css(this.element, rotationStyle);
      },
      getSpanCorrection: function(width, baseline, alignCorrection) {
        this.xCorr = -width * alignCorrection;
        this.yCorr = -baseline;
      }
    });
    extend(SVGRenderer.prototype, {html: function(str, x, y) {
        var wrapper = this.createElement('span'),
            element = wrapper.element,
            renderer = wrapper.renderer,
            isSVG = renderer.isSVG,
            addSetters = function(element, style) {
              each(['opacity', 'visibility'], function(prop) {
                wrap(element, prop + 'Setter', function(proceed, value, key, elem) {
                  proceed.call(this, value, key, elem);
                  style[key] = value;
                });
              });
            };
        wrapper.textSetter = function(value) {
          if (value !== element.innerHTML) {
            delete this.bBox;
          }
          element.innerHTML = this.textStr = value;
          wrapper.htmlUpdateTransform();
        };
        if (isSVG) {
          addSetters(wrapper, wrapper.element.style);
        }
        wrapper.xSetter = wrapper.ySetter = wrapper.alignSetter = wrapper.rotationSetter = function(value, key) {
          if (key === 'align') {
            key = 'textAlign';
          }
          wrapper[key] = value;
          wrapper.htmlUpdateTransform();
        };
        wrapper.attr({
          text: str,
          x: mathRound(x),
          y: mathRound(y)
        }).css({
          position: ABSOLUTE,
          fontFamily: this.style.fontFamily,
          fontSize: this.style.fontSize
        });
        element.style.whiteSpace = 'nowrap';
        wrapper.css = wrapper.htmlCss;
        if (isSVG) {
          wrapper.add = function(svgGroupWrapper) {
            var htmlGroup,
                container = renderer.box.parentNode,
                parentGroup,
                parents = [];
            this.parentGroup = svgGroupWrapper;
            if (svgGroupWrapper) {
              htmlGroup = svgGroupWrapper.div;
              if (!htmlGroup) {
                parentGroup = svgGroupWrapper;
                while (parentGroup) {
                  parents.push(parentGroup);
                  parentGroup = parentGroup.parentGroup;
                }
                each(parents.reverse(), function(parentGroup) {
                  var htmlGroupStyle,
                      cls = attr(parentGroup.element, 'class');
                  if (cls) {
                    cls = {className: cls};
                  }
                  htmlGroup = parentGroup.div = parentGroup.div || createElement(DIV, cls, {
                    position: ABSOLUTE,
                    left: (parentGroup.translateX || 0) + PX,
                    top: (parentGroup.translateY || 0) + PX,
                    opacity: parentGroup.opacity
                  }, htmlGroup || container);
                  htmlGroupStyle = htmlGroup.style;
                  extend(parentGroup, {
                    translateXSetter: function(value, key) {
                      htmlGroupStyle.left = value + PX;
                      parentGroup[key] = value;
                      parentGroup.doTransform = true;
                    },
                    translateYSetter: function(value, key) {
                      htmlGroupStyle.top = value + PX;
                      parentGroup[key] = value;
                      parentGroup.doTransform = true;
                    }
                  });
                  addSetters(parentGroup, htmlGroupStyle);
                });
              }
            } else {
              htmlGroup = container;
            }
            htmlGroup.appendChild(element);
            wrapper.added = true;
            if (wrapper.alignOnAdd) {
              wrapper.htmlUpdateTransform();
            }
            return wrapper;
          };
        }
        return wrapper;
      }});
    var VMLRenderer,
        VMLElement;
    if (!hasSVG && !useCanVG) {
      VMLElement = {
        init: function(renderer, nodeName) {
          var wrapper = this,
              markup = ['<', nodeName, ' filled="f" stroked="f"'],
              style = ['position: ', ABSOLUTE, ';'],
              isDiv = nodeName === DIV;
          if (nodeName === 'shape' || isDiv) {
            style.push('left:0;top:0;width:1px;height:1px;');
          }
          style.push('visibility: ', isDiv ? HIDDEN : VISIBLE);
          markup.push(' style="', style.join(''), '"/>');
          if (nodeName) {
            markup = isDiv || nodeName === 'span' || nodeName === 'img' ? markup.join('') : renderer.prepVML(markup);
            wrapper.element = createElement(markup);
          }
          wrapper.renderer = renderer;
        },
        add: function(parent) {
          var wrapper = this,
              renderer = wrapper.renderer,
              element = wrapper.element,
              box = renderer.box,
              inverted = parent && parent.inverted,
              parentNode = parent ? parent.element || parent : box;
          if (parent) {
            this.parentGroup = parent;
          }
          if (inverted) {
            renderer.invertChild(element, parentNode);
          }
          parentNode.appendChild(element);
          wrapper.added = true;
          if (wrapper.alignOnAdd && !wrapper.deferUpdateTransform) {
            wrapper.updateTransform();
          }
          if (wrapper.onAdd) {
            wrapper.onAdd();
          }
          return wrapper;
        },
        updateTransform: SVGElement.prototype.htmlUpdateTransform,
        setSpanRotation: function() {
          var rotation = this.rotation,
              costheta = mathCos(rotation * deg2rad),
              sintheta = mathSin(rotation * deg2rad);
          css(this.element, {filter: rotation ? ['progid:DXImageTransform.Microsoft.Matrix(M11=', costheta, ', M12=', -sintheta, ', M21=', sintheta, ', M22=', costheta, ', sizingMethod=\'auto expand\')'].join('') : NONE});
        },
        getSpanCorrection: function(width, baseline, alignCorrection, rotation, align) {
          var costheta = rotation ? mathCos(rotation * deg2rad) : 1,
              sintheta = rotation ? mathSin(rotation * deg2rad) : 0,
              height = pick(this.elemHeight, this.element.offsetHeight),
              quad,
              nonLeft = align && align !== 'left';
          this.xCorr = costheta < 0 && -width;
          this.yCorr = sintheta < 0 && -height;
          quad = costheta * sintheta < 0;
          this.xCorr += sintheta * baseline * (quad ? 1 - alignCorrection : alignCorrection);
          this.yCorr -= costheta * baseline * (rotation ? (quad ? alignCorrection : 1 - alignCorrection) : 1);
          if (nonLeft) {
            this.xCorr -= width * alignCorrection * (costheta < 0 ? -1 : 1);
            if (rotation) {
              this.yCorr -= height * alignCorrection * (sintheta < 0 ? -1 : 1);
            }
            css(this.element, {textAlign: align});
          }
        },
        pathToVML: function(value) {
          var i = value.length,
              path = [];
          while (i--) {
            if (isNumber(value[i])) {
              path[i] = mathRound(value[i] * 10) - 5;
            } else if (value[i] === 'Z') {
              path[i] = 'x';
            } else {
              path[i] = value[i];
              if (value.isArc && (value[i] === 'wa' || value[i] === 'at')) {
                if (path[i + 5] === path[i + 7]) {
                  path[i + 7] += value[i + 7] > value[i + 5] ? 1 : -1;
                }
                if (path[i + 6] === path[i + 8]) {
                  path[i + 8] += value[i + 8] > value[i + 6] ? 1 : -1;
                }
              }
            }
          }
          return path.join(' ') || 'x';
        },
        clip: function(clipRect) {
          var wrapper = this,
              clipMembers,
              cssRet;
          if (clipRect) {
            clipMembers = clipRect.members;
            erase(clipMembers, wrapper);
            clipMembers.push(wrapper);
            wrapper.destroyClip = function() {
              erase(clipMembers, wrapper);
            };
            cssRet = clipRect.getCSS(wrapper);
          } else {
            if (wrapper.destroyClip) {
              wrapper.destroyClip();
            }
            cssRet = {clip: docMode8 ? 'inherit' : 'rect(auto)'};
          }
          return wrapper.css(cssRet);
        },
        css: SVGElement.prototype.htmlCss,
        safeRemoveChild: function(element) {
          if (element.parentNode) {
            discardElement(element);
          }
        },
        destroy: function() {
          if (this.destroyClip) {
            this.destroyClip();
          }
          return SVGElement.prototype.destroy.apply(this);
        },
        on: function(eventType, handler) {
          this.element['on' + eventType] = function() {
            var evt = win.event;
            evt.target = evt.srcElement;
            handler(evt);
          };
          return this;
        },
        cutOffPath: function(path, length) {
          var len;
          path = path.split(/[ ,]/);
          len = path.length;
          if (len === 9 || len === 11) {
            path[len - 4] = path[len - 2] = pInt(path[len - 2]) - 10 * length;
          }
          return path.join(' ');
        },
        shadow: function(shadowOptions, group, cutOff) {
          var shadows = [],
              i,
              element = this.element,
              renderer = this.renderer,
              shadow,
              elemStyle = element.style,
              markup,
              path = element.path,
              strokeWidth,
              modifiedPath,
              shadowWidth,
              shadowElementOpacity;
          if (path && typeof path.value !== 'string') {
            path = 'x';
          }
          modifiedPath = path;
          if (shadowOptions) {
            shadowWidth = pick(shadowOptions.width, 3);
            shadowElementOpacity = (shadowOptions.opacity || 0.15) / shadowWidth;
            for (i = 1; i <= 3; i++) {
              strokeWidth = (shadowWidth * 2) + 1 - (2 * i);
              if (cutOff) {
                modifiedPath = this.cutOffPath(path.value, strokeWidth + 0.5);
              }
              markup = ['<shape isShadow="true" strokeweight="', strokeWidth, '" filled="false" path="', modifiedPath, '" coordsize="10 10" style="', element.style.cssText, '" />'];
              shadow = createElement(renderer.prepVML(markup), null, {
                left: pInt(elemStyle.left) + pick(shadowOptions.offsetX, 1),
                top: pInt(elemStyle.top) + pick(shadowOptions.offsetY, 1)
              });
              if (cutOff) {
                shadow.cutOff = strokeWidth + 1;
              }
              markup = ['<stroke color="', shadowOptions.color || 'black', '" opacity="', shadowElementOpacity * i, '"/>'];
              createElement(renderer.prepVML(markup), null, null, shadow);
              if (group) {
                group.element.appendChild(shadow);
              } else {
                element.parentNode.insertBefore(shadow, element);
              }
              shadows.push(shadow);
            }
            this.shadows = shadows;
          }
          return this;
        },
        updateShadows: noop,
        setAttr: function(key, value) {
          if (docMode8) {
            this.element[key] = value;
          } else {
            this.element.setAttribute(key, value);
          }
        },
        classSetter: function(value) {
          this.element.className = value;
        },
        dashstyleSetter: function(value, key, element) {
          var strokeElem = element.getElementsByTagName('stroke')[0] || createElement(this.renderer.prepVML(['<stroke/>']), null, null, element);
          strokeElem[key] = value || 'solid';
          this[key] = value;
        },
        dSetter: function(value, key, element) {
          var i,
              shadows = this.shadows;
          value = value || [];
          this.d = value.join && value.join(' ');
          element.path = value = this.pathToVML(value);
          if (shadows) {
            i = shadows.length;
            while (i--) {
              shadows[i].path = shadows[i].cutOff ? this.cutOffPath(value, shadows[i].cutOff) : value;
            }
          }
          this.setAttr(key, value);
        },
        fillSetter: function(value, key, element) {
          var nodeName = element.nodeName;
          if (nodeName === 'SPAN') {
            element.style.color = value;
          } else if (nodeName !== 'IMG') {
            element.filled = value !== NONE;
            this.setAttr('fillcolor', this.renderer.color(value, element, key, this));
          }
        },
        'fill-opacitySetter': function(value, key, element) {
          createElement(this.renderer.prepVML(['<', key.split('-')[0], ' opacity="', value, '"/>']), null, null, element);
        },
        opacitySetter: noop,
        rotationSetter: function(value, key, element) {
          var style = element.style;
          this[key] = style[key] = value;
          style.left = -mathRound(mathSin(value * deg2rad) + 1) + PX;
          style.top = mathRound(mathCos(value * deg2rad)) + PX;
        },
        strokeSetter: function(value, key, element) {
          this.setAttr('strokecolor', this.renderer.color(value, element, key, this));
        },
        'stroke-widthSetter': function(value, key, element) {
          element.stroked = !!value;
          this[key] = value;
          if (isNumber(value)) {
            value += PX;
          }
          this.setAttr('strokeweight', value);
        },
        titleSetter: function(value, key) {
          this.setAttr(key, value);
        },
        visibilitySetter: function(value, key, element) {
          if (value === 'inherit') {
            value = VISIBLE;
          }
          if (this.shadows) {
            each(this.shadows, function(shadow) {
              shadow.style[key] = value;
            });
          }
          if (element.nodeName === 'DIV') {
            value = value === HIDDEN ? '-999em' : 0;
            if (!docMode8) {
              element.style[key] = value ? VISIBLE : HIDDEN;
            }
            key = 'top';
          }
          element.style[key] = value;
        },
        xSetter: function(value, key, element) {
          this[key] = value;
          if (key === 'x') {
            key = 'left';
          } else if (key === 'y') {
            key = 'top';
          }
          if (this.updateClipping) {
            this[key] = value;
            this.updateClipping();
          } else {
            element.style[key] = value;
          }
        },
        zIndexSetter: function(value, key, element) {
          element.style[key] = value;
        }
      };
      VMLElement['stroke-opacitySetter'] = VMLElement['fill-opacitySetter'];
      Highcharts.VMLElement = VMLElement = extendClass(SVGElement, VMLElement);
      VMLElement.prototype.ySetter = VMLElement.prototype.widthSetter = VMLElement.prototype.heightSetter = VMLElement.prototype.xSetter;
      var VMLRendererExtension = {
        Element: VMLElement,
        isIE8: userAgent.indexOf('MSIE 8.0') > -1,
        init: function(container, width, height, style) {
          var renderer = this,
              boxWrapper,
              box,
              css;
          renderer.alignedObjects = [];
          boxWrapper = renderer.createElement(DIV).css(extend(this.getStyle(style), {position: 'relative'}));
          box = boxWrapper.element;
          container.appendChild(boxWrapper.element);
          renderer.isVML = true;
          renderer.box = box;
          renderer.boxWrapper = boxWrapper;
          renderer.gradients = {};
          renderer.cache = {};
          renderer.cacheKeys = [];
          renderer.imgCount = 0;
          renderer.setSize(width, height, false);
          if (!doc.namespaces.hcv) {
            doc.namespaces.add('hcv', 'urn:schemas-microsoft-com:vml');
            css = 'hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke' + '{ behavior:url(#default#VML); display: inline-block; } ';
            try {
              doc.createStyleSheet().cssText = css;
            } catch (e) {
              doc.styleSheets[0].cssText += css;
            }
          }
        },
        isHidden: function() {
          return !this.box.offsetWidth;
        },
        clipRect: function(x, y, width, height) {
          var clipRect = this.createElement(),
              isObj = isObject(x);
          return extend(clipRect, {
            members: [],
            count: 0,
            left: (isObj ? x.x : x) + 1,
            top: (isObj ? x.y : y) + 1,
            width: (isObj ? x.width : width) - 1,
            height: (isObj ? x.height : height) - 1,
            getCSS: function(wrapper) {
              var element = wrapper.element,
                  nodeName = element.nodeName,
                  isShape = nodeName === 'shape',
                  inverted = wrapper.inverted,
                  rect = this,
                  top = rect.top - (isShape ? element.offsetTop : 0),
                  left = rect.left,
                  right = left + rect.width,
                  bottom = top + rect.height,
                  ret = {clip: 'rect(' + mathRound(inverted ? left : top) + 'px,' + mathRound(inverted ? bottom : right) + 'px,' + mathRound(inverted ? right : bottom) + 'px,' + mathRound(inverted ? top : left) + 'px)'};
              if (!inverted && docMode8 && nodeName === 'DIV') {
                extend(ret, {
                  width: right + PX,
                  height: bottom + PX
                });
              }
              return ret;
            },
            updateClipping: function() {
              each(clipRect.members, function(member) {
                if (member.element) {
                  member.css(clipRect.getCSS(member));
                }
              });
            }
          });
        },
        color: function(color, elem, prop, wrapper) {
          var renderer = this,
              colorObject,
              regexRgba = /^rgba/,
              markup,
              fillType,
              ret = NONE;
          if (color && color.linearGradient) {
            fillType = 'gradient';
          } else if (color && color.radialGradient) {
            fillType = 'pattern';
          }
          if (fillType) {
            var stopColor,
                stopOpacity,
                gradient = color.linearGradient || color.radialGradient,
                x1,
                y1,
                x2,
                y2,
                opacity1,
                opacity2,
                color1,
                color2,
                fillAttr = '',
                stops = color.stops,
                firstStop,
                lastStop,
                colors = [],
                addFillNode = function() {
                  markup = ['<fill colors="' + colors.join(',') + '" opacity="', opacity2, '" o:opacity2="', opacity1, '" type="', fillType, '" ', fillAttr, 'focus="100%" method="any" />'];
                  createElement(renderer.prepVML(markup), null, null, elem);
                };
            firstStop = stops[0];
            lastStop = stops[stops.length - 1];
            if (firstStop[0] > 0) {
              stops.unshift([0, firstStop[1]]);
            }
            if (lastStop[0] < 1) {
              stops.push([1, lastStop[1]]);
            }
            each(stops, function(stop, i) {
              if (regexRgba.test(stop[1])) {
                colorObject = Color(stop[1]);
                stopColor = colorObject.get('rgb');
                stopOpacity = colorObject.get('a');
              } else {
                stopColor = stop[1];
                stopOpacity = 1;
              }
              colors.push((stop[0] * 100) + '% ' + stopColor);
              if (!i) {
                opacity1 = stopOpacity;
                color2 = stopColor;
              } else {
                opacity2 = stopOpacity;
                color1 = stopColor;
              }
            });
            if (prop === 'fill') {
              if (fillType === 'gradient') {
                x1 = gradient.x1 || gradient[0] || 0;
                y1 = gradient.y1 || gradient[1] || 0;
                x2 = gradient.x2 || gradient[2] || 0;
                y2 = gradient.y2 || gradient[3] || 0;
                fillAttr = 'angle="' + (90 - math.atan((y2 - y1) / (x2 - x1)) * 180 / mathPI) + '"';
                addFillNode();
              } else {
                var r = gradient.r,
                    sizex = r * 2,
                    sizey = r * 2,
                    cx = gradient.cx,
                    cy = gradient.cy,
                    radialReference = elem.radialReference,
                    bBox,
                    applyRadialGradient = function() {
                      if (radialReference) {
                        bBox = wrapper.getBBox();
                        cx += (radialReference[0] - bBox.x) / bBox.width - 0.5;
                        cy += (radialReference[1] - bBox.y) / bBox.height - 0.5;
                        sizex *= radialReference[2] / bBox.width;
                        sizey *= radialReference[2] / bBox.height;
                      }
                      fillAttr = 'src="' + defaultOptions.global.VMLRadialGradientURL + '" ' + 'size="' + sizex + ',' + sizey + '" ' + 'origin="0.5,0.5" ' + 'position="' + cx + ',' + cy + '" ' + 'color2="' + color2 + '" ';
                      addFillNode();
                    };
                if (wrapper.added) {
                  applyRadialGradient();
                } else {
                  wrapper.onAdd = applyRadialGradient;
                }
                ret = color1;
              }
            } else {
              ret = stopColor;
            }
          } else if (regexRgba.test(color) && elem.tagName !== 'IMG') {
            colorObject = Color(color);
            wrapper[prop + '-opacitySetter'](colorObject.get('a'), prop, elem);
            ret = colorObject.get('rgb');
          } else {
            var propNodes = elem.getElementsByTagName(prop);
            if (propNodes.length) {
              propNodes[0].opacity = 1;
              propNodes[0].type = 'solid';
            }
            ret = color;
          }
          return ret;
        },
        prepVML: function(markup) {
          var vmlStyle = 'display:inline-block;behavior:url(#default#VML);',
              isIE8 = this.isIE8;
          markup = markup.join('');
          if (isIE8) {
            markup = markup.replace('/>', ' xmlns="urn:schemas-microsoft-com:vml" />');
            if (markup.indexOf('style="') === -1) {
              markup = markup.replace('/>', ' style="' + vmlStyle + '" />');
            } else {
              markup = markup.replace('style="', 'style="' + vmlStyle);
            }
          } else {
            markup = markup.replace('<', '<hcv:');
          }
          return markup;
        },
        text: SVGRenderer.prototype.html,
        path: function(path) {
          var attr = {coordsize: '10 10'};
          if (isArray(path)) {
            attr.d = path;
          } else if (isObject(path)) {
            extend(attr, path);
          }
          return this.createElement('shape').attr(attr);
        },
        circle: function(x, y, r) {
          var circle = this.symbol('circle');
          if (isObject(x)) {
            r = x.r;
            y = x.y;
            x = x.x;
          }
          circle.isCircle = true;
          circle.r = r;
          return circle.attr({
            x: x,
            y: y
          });
        },
        g: function(name) {
          var wrapper,
              attribs;
          if (name) {
            attribs = {
              'className': PREFIX + name,
              'class': PREFIX + name
            };
          }
          wrapper = this.createElement(DIV).attr(attribs);
          return wrapper;
        },
        image: function(src, x, y, width, height) {
          var obj = this.createElement('img').attr({src: src});
          if (arguments.length > 1) {
            obj.attr({
              x: x,
              y: y,
              width: width,
              height: height
            });
          }
          return obj;
        },
        createElement: function(nodeName) {
          return nodeName === 'rect' ? this.symbol(nodeName) : SVGRenderer.prototype.createElement.call(this, nodeName);
        },
        invertChild: function(element, parentNode) {
          var ren = this,
              parentStyle = parentNode.style,
              imgStyle = element.tagName === 'IMG' && element.style;
          css(element, {
            flip: 'x',
            left: pInt(parentStyle.width) - (imgStyle ? pInt(imgStyle.top) : 1),
            top: pInt(parentStyle.height) - (imgStyle ? pInt(imgStyle.left) : 1),
            rotation: -90
          });
          each(element.childNodes, function(child) {
            ren.invertChild(child, element);
          });
        },
        symbols: {
          arc: function(x, y, w, h, options) {
            var start = options.start,
                end = options.end,
                radius = options.r || w || h,
                innerRadius = options.innerR,
                cosStart = mathCos(start),
                sinStart = mathSin(start),
                cosEnd = mathCos(end),
                sinEnd = mathSin(end),
                ret;
            if (end - start === 0) {
              return ['x'];
            }
            ret = ['wa', x - radius, y - radius, x + radius, y + radius, x + radius * cosStart, y + radius * sinStart, x + radius * cosEnd, y + radius * sinEnd];
            if (options.open && !innerRadius) {
              ret.push('e', M, x, y);
            }
            ret.push('at', x - innerRadius, y - innerRadius, x + innerRadius, y + innerRadius, x + innerRadius * cosEnd, y + innerRadius * sinEnd, x + innerRadius * cosStart, y + innerRadius * sinStart, 'x', 'e');
            ret.isArc = true;
            return ret;
          },
          circle: function(x, y, w, h, wrapper) {
            if (wrapper) {
              w = h = 2 * wrapper.r;
            }
            if (wrapper && wrapper.isCircle) {
              x -= w / 2;
              y -= h / 2;
            }
            return ['wa', x, y, x + w, y + h, x + w, y + h / 2, x + w, y + h / 2, 'e'];
          },
          rect: function(x, y, w, h, options) {
            return SVGRenderer.prototype.symbols[!defined(options) || !options.r ? 'square' : 'callout'].call(0, x, y, w, h, options);
          }
        }
      };
      Highcharts.VMLRenderer = VMLRenderer = function() {
        this.init.apply(this, arguments);
      };
      VMLRenderer.prototype = merge(SVGRenderer.prototype, VMLRendererExtension);
      Renderer = VMLRenderer;
    }
    SVGRenderer.prototype.measureSpanWidth = function(text, styles) {
      var measuringSpan = doc.createElement('span'),
          offsetWidth,
          textNode = doc.createTextNode(text);
      measuringSpan.appendChild(textNode);
      css(measuringSpan, styles);
      this.box.appendChild(measuringSpan);
      offsetWidth = measuringSpan.offsetWidth;
      discardElement(measuringSpan);
      return offsetWidth;
    };
    var CanVGRenderer,
        CanVGController;
    function getScript(scriptLocation, callback) {
      var head = doc.getElementsByTagName('head')[0],
          script = doc.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptLocation;
      script.onload = callback;
      head.appendChild(script);
    }
    if (useCanVG) {
      Highcharts.CanVGRenderer = CanVGRenderer = function() {
        SVG_NS = 'http://www.w3.org/1999/xhtml';
      };
      CanVGRenderer.prototype.symbols = {};
      CanVGController = (function() {
        var deferredRenderCalls = [];
        function drawDeferred() {
          var callLength = deferredRenderCalls.length,
              callIndex;
          for (callIndex = 0; callIndex < callLength; callIndex++) {
            deferredRenderCalls[callIndex]();
          }
          deferredRenderCalls = [];
        }
        return {push: function(func, scriptLocation) {
            if (deferredRenderCalls.length === 0) {
              getScript(scriptLocation, drawDeferred);
            }
            deferredRenderCalls.push(func);
          }};
      }());
      Renderer = CanVGRenderer;
    }
    function Tick(axis, pos, type, noLabel) {
      this.axis = axis;
      this.pos = pos;
      this.type = type || '';
      this.isNew = true;
      if (!type && !noLabel) {
        this.addLabel();
      }
    }
    Tick.prototype = {
      addLabel: function() {
        var tick = this,
            axis = tick.axis,
            options = axis.options,
            chart = axis.chart,
            categories = axis.categories,
            names = axis.names,
            pos = tick.pos,
            labelOptions = options.labels,
            str,
            tickPositions = axis.tickPositions,
            isFirst = pos === tickPositions[0],
            isLast = pos === tickPositions[tickPositions.length - 1],
            value = categories ? pick(categories[pos], names[pos], pos) : pos,
            label = tick.label,
            tickPositionInfo = tickPositions.info,
            dateTimeLabelFormat;
        if (axis.isDatetimeAxis && tickPositionInfo) {
          dateTimeLabelFormat = options.dateTimeLabelFormats[tickPositionInfo.higherRanks[pos] || tickPositionInfo.unitName];
        }
        tick.isFirst = isFirst;
        tick.isLast = isLast;
        str = axis.labelFormatter.call({
          axis: axis,
          chart: chart,
          isFirst: isFirst,
          isLast: isLast,
          dateTimeLabelFormat: dateTimeLabelFormat,
          value: axis.isLog ? correctFloat(axis.lin2log(value)) : value
        });
        if (!defined(label)) {
          tick.label = label = defined(str) && labelOptions.enabled ? chart.renderer.text(str, 0, 0, labelOptions.useHTML).css(merge(labelOptions.style)).add(axis.labelGroup) : null;
          tick.labelLength = label && label.getBBox().width;
          tick.rotation = 0;
        } else if (label) {
          label.attr({text: str});
        }
      },
      getLabelSize: function() {
        return this.label ? this.label.getBBox()[this.axis.horiz ? 'height' : 'width'] : 0;
      },
      handleOverflow: function(xy) {
        var axis = this.axis,
            pxPos = xy.x,
            chartWidth = axis.chart.chartWidth,
            spacing = axis.chart.spacing,
            leftBound = pick(axis.labelLeft, mathMin(axis.pos, spacing[3])),
            rightBound = pick(axis.labelRight, mathMax(axis.pos + axis.len, chartWidth - spacing[1])),
            label = this.label,
            rotation = this.rotation,
            factor = {
              left: 0,
              center: 0.5,
              right: 1
            }[axis.labelAlign],
            labelWidth = label.getBBox().width,
            slotWidth = axis.getSlotWidth(),
            modifiedSlotWidth = slotWidth,
            xCorrection = factor,
            goRight = 1,
            leftPos,
            rightPos,
            textWidth,
            css = {};
        if (!rotation) {
          leftPos = pxPos - factor * labelWidth;
          rightPos = pxPos + (1 - factor) * labelWidth;
          if (leftPos < leftBound) {
            modifiedSlotWidth = xy.x + modifiedSlotWidth * (1 - factor) - leftBound;
          } else if (rightPos > rightBound) {
            modifiedSlotWidth = rightBound - xy.x + modifiedSlotWidth * factor;
            goRight = -1;
          }
          modifiedSlotWidth = mathMin(slotWidth, modifiedSlotWidth);
          if (modifiedSlotWidth < slotWidth && axis.labelAlign === 'center') {
            xy.x += goRight * (slotWidth - modifiedSlotWidth - xCorrection * (slotWidth - mathMin(labelWidth, modifiedSlotWidth)));
          }
          if (labelWidth > modifiedSlotWidth || (axis.autoRotation && label.styles.width)) {
            textWidth = modifiedSlotWidth;
          }
        } else if (rotation < 0 && pxPos - factor * labelWidth < leftBound) {
          textWidth = mathRound(pxPos / mathCos(rotation * deg2rad) - leftBound);
        } else if (rotation > 0 && pxPos + factor * labelWidth > rightBound) {
          textWidth = mathRound((chartWidth - pxPos) / mathCos(rotation * deg2rad));
        }
        if (textWidth) {
          css.width = textWidth;
          if (!axis.options.labels.style.textOverflow) {
            css.textOverflow = 'ellipsis';
          }
          label.css(css);
        }
      },
      getPosition: function(horiz, pos, tickmarkOffset, old) {
        var axis = this.axis,
            chart = axis.chart,
            cHeight = (old && chart.oldChartHeight) || chart.chartHeight;
        return {
          x: horiz ? axis.translate(pos + tickmarkOffset, null, null, old) + axis.transB : axis.left + axis.offset + (axis.opposite ? ((old && chart.oldChartWidth) || chart.chartWidth) - axis.right - axis.left : 0),
          y: horiz ? cHeight - axis.bottom + axis.offset - (axis.opposite ? axis.height : 0) : cHeight - axis.translate(pos + tickmarkOffset, null, null, old) - axis.transB
        };
      },
      getLabelPosition: function(x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
        var axis = this.axis,
            transA = axis.transA,
            reversed = axis.reversed,
            staggerLines = axis.staggerLines,
            rotCorr = axis.tickRotCorr || {
              x: 0,
              y: 0
            },
            yOffset = labelOptions.y,
            line;
        if (!defined(yOffset)) {
          if (axis.side === 0) {
            yOffset = label.rotation ? -8 : -label.getBBox().height;
          } else if (axis.side === 2) {
            yOffset = rotCorr.y + 8;
          } else {
            yOffset = mathCos(label.rotation * deg2rad) * (rotCorr.y - label.getBBox(false, 0).height / 2);
          }
        }
        x = x + labelOptions.x + rotCorr.x - (tickmarkOffset && horiz ? tickmarkOffset * transA * (reversed ? -1 : 1) : 0);
        y = y + yOffset - (tickmarkOffset && !horiz ? tickmarkOffset * transA * (reversed ? 1 : -1) : 0);
        if (staggerLines) {
          line = (index / (step || 1) % staggerLines);
          if (axis.opposite) {
            line = staggerLines - line - 1;
          }
          y += line * (axis.labelOffset / staggerLines);
        }
        return {
          x: x,
          y: mathRound(y)
        };
      },
      getMarkPath: function(x, y, tickLength, tickWidth, horiz, renderer) {
        return renderer.crispLine([M, x, y, L, x + (horiz ? 0 : -tickLength), y + (horiz ? tickLength : 0)], tickWidth);
      },
      render: function(index, old, opacity) {
        var tick = this,
            axis = tick.axis,
            options = axis.options,
            chart = axis.chart,
            renderer = chart.renderer,
            horiz = axis.horiz,
            type = tick.type,
            label = tick.label,
            pos = tick.pos,
            labelOptions = options.labels,
            gridLine = tick.gridLine,
            gridPrefix = type ? type + 'Grid' : 'grid',
            tickPrefix = type ? type + 'Tick' : 'tick',
            gridLineWidth = options[gridPrefix + 'LineWidth'],
            gridLineColor = options[gridPrefix + 'LineColor'],
            dashStyle = options[gridPrefix + 'LineDashStyle'],
            tickSize = axis.tickSize(tickPrefix),
            tickColor = options[tickPrefix + 'Color'],
            gridLinePath,
            mark = tick.mark,
            markPath,
            step = labelOptions.step,
            attribs,
            show = true,
            tickmarkOffset = axis.tickmarkOffset,
            xy = tick.getPosition(horiz, pos, tickmarkOffset, old),
            x = xy.x,
            y = xy.y,
            reverseCrisp = ((horiz && x === axis.pos + axis.len) || (!horiz && y === axis.pos)) ? -1 : 1;
        opacity = pick(opacity, 1);
        this.isActive = true;
        if (gridLineWidth) {
          gridLinePath = axis.getPlotLinePath(pos + tickmarkOffset, gridLineWidth * reverseCrisp, old, true);
          if (gridLine === UNDEFINED) {
            attribs = {
              stroke: gridLineColor,
              'stroke-width': gridLineWidth
            };
            if (dashStyle) {
              attribs.dashstyle = dashStyle;
            }
            if (!type) {
              attribs.zIndex = 1;
            }
            if (old) {
              attribs.opacity = 0;
            }
            tick.gridLine = gridLine = gridLineWidth ? renderer.path(gridLinePath).attr(attribs).add(axis.gridGroup) : null;
          }
          if (!old && gridLine && gridLinePath) {
            gridLine[tick.isNew ? 'attr' : 'animate']({
              d: gridLinePath,
              opacity: opacity
            });
          }
        }
        if (tickSize) {
          if (axis.opposite) {
            tickSize[0] = -tickSize[0];
          }
          markPath = tick.getMarkPath(x, y, tickSize[0], tickSize[1] * reverseCrisp, horiz, renderer);
          if (mark) {
            mark.animate({
              d: markPath,
              opacity: opacity
            });
          } else {
            tick.mark = renderer.path(markPath).attr({
              stroke: tickColor,
              'stroke-width': tickSize[1],
              opacity: opacity
            }).add(axis.axisGroup);
          }
        }
        if (label && isNumber(x)) {
          label.xy = xy = tick.getLabelPosition(x, y, label, horiz, labelOptions, tickmarkOffset, index, step);
          if ((tick.isFirst && !tick.isLast && !pick(options.showFirstLabel, 1)) || (tick.isLast && !tick.isFirst && !pick(options.showLastLabel, 1))) {
            show = false;
          } else if (horiz && !axis.isRadial && !labelOptions.step && !labelOptions.rotation && !old && opacity !== 0) {
            tick.handleOverflow(xy);
          }
          if (step && index % step) {
            show = false;
          }
          if (show && isNumber(xy.y)) {
            xy.opacity = opacity;
            label[tick.isNew ? 'attr' : 'animate'](xy);
            tick.isNew = false;
          } else {
            label.attr('y', -9999);
          }
        }
      },
      destroy: function() {
        destroyObjectProperties(this, this.axis);
      }
    };
    Highcharts.PlotLineOrBand = function(axis, options) {
      this.axis = axis;
      if (options) {
        this.options = options;
        this.id = options.id;
      }
    };
    Highcharts.PlotLineOrBand.prototype = {
      render: function() {
        var plotLine = this,
            axis = plotLine.axis,
            horiz = axis.horiz,
            options = plotLine.options,
            optionsLabel = options.label,
            label = plotLine.label,
            width = options.width,
            to = options.to,
            from = options.from,
            isBand = defined(from) && defined(to),
            value = options.value,
            dashStyle = options.dashStyle,
            svgElem = plotLine.svgElem,
            path = [],
            addEvent,
            eventType,
            color = options.color,
            zIndex = pick(options.zIndex, 0),
            events = options.events,
            attribs = {},
            renderer = axis.chart.renderer,
            log2lin = axis.log2lin;
        if (axis.isLog) {
          from = log2lin(from);
          to = log2lin(to);
          value = log2lin(value);
        }
        if (width) {
          path = axis.getPlotLinePath(value, width);
          attribs = {
            stroke: color,
            'stroke-width': width
          };
          if (dashStyle) {
            attribs.dashstyle = dashStyle;
          }
        } else if (isBand) {
          path = axis.getPlotBandPath(from, to, options);
          if (color) {
            attribs.fill = color;
          }
          if (options.borderWidth) {
            attribs.stroke = options.borderColor;
            attribs['stroke-width'] = options.borderWidth;
          }
        } else {
          return;
        }
        attribs.zIndex = zIndex;
        if (svgElem) {
          if (path) {
            svgElem.show();
            svgElem.animate({d: path});
          } else {
            svgElem.hide();
            if (label) {
              plotLine.label = label = label.destroy();
            }
          }
        } else if (path && path.length) {
          plotLine.svgElem = svgElem = renderer.path(path).attr(attribs).add();
          if (events) {
            addEvent = function(eventType) {
              svgElem.on(eventType, function(e) {
                events[eventType].apply(plotLine, [e]);
              });
            };
            for (eventType in events) {
              addEvent(eventType);
            }
          }
        }
        if (optionsLabel && defined(optionsLabel.text) && path && path.length && axis.width > 0 && axis.height > 0 && !path.flat) {
          optionsLabel = merge({
            align: horiz && isBand && 'center',
            x: horiz ? !isBand && 4 : 10,
            verticalAlign: !horiz && isBand && 'middle',
            y: horiz ? isBand ? 16 : 10 : isBand ? 6 : -4,
            rotation: horiz && !isBand && 90
          }, optionsLabel);
          this.renderLabel(optionsLabel, path, isBand, zIndex);
        } else if (label) {
          label.hide();
        }
        return plotLine;
      },
      renderLabel: function(optionsLabel, path, isBand, zIndex) {
        var plotLine = this,
            label = plotLine.label,
            renderer = plotLine.axis.chart.renderer,
            attribs,
            xs,
            ys,
            x,
            y;
        if (!label) {
          attribs = {
            align: optionsLabel.textAlign || optionsLabel.align,
            rotation: optionsLabel.rotation
          };
          attribs.zIndex = zIndex;
          plotLine.label = label = renderer.text(optionsLabel.text, 0, 0, optionsLabel.useHTML).attr(attribs).css(optionsLabel.style).add();
        }
        xs = [path[1], path[4], (isBand ? path[6] : path[1])];
        ys = [path[2], path[5], (isBand ? path[7] : path[2])];
        x = arrayMin(xs);
        y = arrayMin(ys);
        label.align(optionsLabel, false, {
          x: x,
          y: y,
          width: arrayMax(xs) - x,
          height: arrayMax(ys) - y
        });
        label.show();
      },
      destroy: function() {
        erase(this.axis.plotLinesAndBands, this);
        delete this.axis;
        destroyObjectProperties(this);
      }
    };
    AxisPlotLineOrBandExtension = {
      getPlotBandPath: function(from, to) {
        var toPath = this.getPlotLinePath(to, null, null, true),
            path = this.getPlotLinePath(from, null, null, true);
        if (path && toPath) {
          path.flat = path.toString() === toPath.toString();
          path.push(toPath[4], toPath[5], toPath[1], toPath[2]);
        } else {
          path = null;
        }
        return path;
      },
      addPlotBand: function(options) {
        return this.addPlotBandOrLine(options, 'plotBands');
      },
      addPlotLine: function(options) {
        return this.addPlotBandOrLine(options, 'plotLines');
      },
      addPlotBandOrLine: function(options, coll) {
        var obj = new Highcharts.PlotLineOrBand(this, options).render(),
            userOptions = this.userOptions;
        if (obj) {
          if (coll) {
            userOptions[coll] = userOptions[coll] || [];
            userOptions[coll].push(options);
          }
          this.plotLinesAndBands.push(obj);
        }
        return obj;
      },
      removePlotBandOrLine: function(id) {
        var plotLinesAndBands = this.plotLinesAndBands,
            options = this.options,
            userOptions = this.userOptions,
            i = plotLinesAndBands.length;
        while (i--) {
          if (plotLinesAndBands[i].id === id) {
            plotLinesAndBands[i].destroy();
          }
        }
        each([options.plotLines || [], userOptions.plotLines || [], options.plotBands || [], userOptions.plotBands || []], function(arr) {
          i = arr.length;
          while (i--) {
            if (arr[i].id === id) {
              erase(arr, arr[i]);
            }
          }
        });
      }
    };
    var Axis = Highcharts.Axis = function() {
      this.init.apply(this, arguments);
    };
    Axis.prototype = {
      defaultOptions: {
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%e. %b',
          week: '%e. %b',
          month: '%b \'%y',
          year: '%Y'
        },
        endOnTick: false,
        gridLineColor: '#D8D8D8',
        labels: {
          enabled: true,
          style: {
            color: '#606060',
            cursor: 'default',
            fontSize: '11px'
          },
          x: 0
        },
        lineColor: '#C0D0E0',
        lineWidth: 1,
        minPadding: 0.01,
        maxPadding: 0.01,
        minorGridLineColor: '#E0E0E0',
        minorGridLineWidth: 1,
        minorTickColor: '#A0A0A0',
        minorTickLength: 2,
        minorTickPosition: 'outside',
        startOfWeek: 1,
        startOnTick: false,
        tickColor: '#C0D0E0',
        tickLength: 10,
        tickmarkPlacement: 'between',
        tickPixelInterval: 100,
        tickPosition: 'outside',
        title: {
          align: 'middle',
          style: {color: '#707070'}
        },
        type: 'linear'
      },
      defaultYAxisOptions: {
        endOnTick: true,
        gridLineWidth: 1,
        tickPixelInterval: 72,
        showLastLabel: true,
        labels: {x: -8},
        lineWidth: 0,
        maxPadding: 0.05,
        minPadding: 0.05,
        startOnTick: true,
        title: {
          rotation: 270,
          text: 'Values'
        },
        stackLabels: {
          enabled: false,
          formatter: function() {
            return Highcharts.numberFormat(this.total, -1);
          },
          style: merge(defaultPlotOptions.line.dataLabels.style, {color: '#000000'})
        }
      },
      defaultLeftAxisOptions: {
        labels: {x: -15},
        title: {rotation: 270}
      },
      defaultRightAxisOptions: {
        labels: {x: 15},
        title: {rotation: 90}
      },
      defaultBottomAxisOptions: {
        labels: {
          autoRotation: [-45],
          x: 0
        },
        title: {rotation: 0}
      },
      defaultTopAxisOptions: {
        labels: {
          autoRotation: [-45],
          x: 0
        },
        title: {rotation: 0}
      },
      init: function(chart, userOptions) {
        var isXAxis = userOptions.isX,
            axis = this;
        axis.chart = chart;
        axis.horiz = chart.inverted ? !isXAxis : isXAxis;
        axis.isXAxis = isXAxis;
        axis.coll = isXAxis ? 'xAxis' : 'yAxis';
        axis.opposite = userOptions.opposite;
        axis.side = userOptions.side || (axis.horiz ? (axis.opposite ? 0 : 2) : (axis.opposite ? 1 : 3));
        axis.setOptions(userOptions);
        var options = this.options,
            type = options.type,
            isDatetimeAxis = type === 'datetime';
        axis.labelFormatter = options.labels.formatter || axis.defaultLabelFormatter;
        axis.userOptions = userOptions;
        axis.minPixelPadding = 0;
        axis.reversed = options.reversed;
        axis.visible = options.visible !== false;
        axis.zoomEnabled = options.zoomEnabled !== false;
        axis.categories = options.categories || type === 'category';
        axis.names = axis.names || [];
        axis.isLog = type === 'logarithmic';
        axis.isDatetimeAxis = isDatetimeAxis;
        axis.isLinked = defined(options.linkedTo);
        axis.ticks = {};
        axis.labelEdge = [];
        axis.minorTicks = {};
        axis.plotLinesAndBands = [];
        axis.alternateBands = {};
        axis.len = 0;
        axis.minRange = axis.userMinRange = options.minRange || options.maxZoom;
        axis.range = options.range;
        axis.offset = options.offset || 0;
        axis.stacks = {};
        axis.oldStacks = {};
        axis.stacksTouched = 0;
        axis.max = null;
        axis.min = null;
        axis.crosshair = pick(options.crosshair, splat(chart.options.tooltip.crosshairs)[isXAxis ? 0 : 1], false);
        var eventType,
            events = axis.options.events;
        if (inArray(axis, chart.axes) === -1) {
          if (isXAxis && !this.isColorAxis) {
            chart.axes.splice(chart.xAxis.length, 0, axis);
          } else {
            chart.axes.push(axis);
          }
          chart[axis.coll].push(axis);
        }
        axis.series = axis.series || [];
        if (chart.inverted && isXAxis && axis.reversed === UNDEFINED) {
          axis.reversed = true;
        }
        axis.removePlotBand = axis.removePlotBandOrLine;
        axis.removePlotLine = axis.removePlotBandOrLine;
        for (eventType in events) {
          addEvent(axis, eventType, events[eventType]);
        }
        if (axis.isLog) {
          axis.val2lin = axis.log2lin;
          axis.lin2val = axis.lin2log;
        }
      },
      setOptions: function(userOptions) {
        this.options = merge(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], merge(defaultOptions[this.coll], userOptions));
      },
      defaultLabelFormatter: function() {
        var axis = this.axis,
            value = this.value,
            categories = axis.categories,
            dateTimeLabelFormat = this.dateTimeLabelFormat,
            numericSymbols = defaultOptions.lang.numericSymbols,
            i = numericSymbols && numericSymbols.length,
            multi,
            ret,
            formatOption = axis.options.labels.format,
            numericSymbolDetector = axis.isLog ? value : axis.tickInterval;
        if (formatOption) {
          ret = format(formatOption, this);
        } else if (categories) {
          ret = value;
        } else if (dateTimeLabelFormat) {
          ret = dateFormat(dateTimeLabelFormat, value);
        } else if (i && numericSymbolDetector >= 1000) {
          while (i-- && ret === UNDEFINED) {
            multi = Math.pow(1000, i + 1);
            if (numericSymbolDetector >= multi && (value * 10) % multi === 0 && numericSymbols[i] !== null) {
              ret = Highcharts.numberFormat(value / multi, -1) + numericSymbols[i];
            }
          }
        }
        if (ret === UNDEFINED) {
          if (mathAbs(value) >= 10000) {
            ret = Highcharts.numberFormat(value, -1);
          } else {
            ret = Highcharts.numberFormat(value, -1, UNDEFINED, '');
          }
        }
        return ret;
      },
      getSeriesExtremes: function() {
        var axis = this,
            chart = axis.chart;
        axis.hasVisibleSeries = false;
        axis.dataMin = axis.dataMax = axis.threshold = null;
        axis.softThreshold = !axis.isXAxis;
        if (axis.buildStacks) {
          axis.buildStacks();
        }
        each(axis.series, function(series) {
          if (series.visible || !chart.options.chart.ignoreHiddenSeries) {
            var seriesOptions = series.options,
                xData,
                threshold = seriesOptions.threshold,
                seriesDataMin,
                seriesDataMax;
            axis.hasVisibleSeries = true;
            if (axis.isLog && threshold <= 0) {
              threshold = null;
            }
            if (axis.isXAxis) {
              xData = series.xData;
              if (xData.length) {
                seriesDataMin = arrayMin(xData);
                if (!isNumber(seriesDataMin) && !(seriesDataMin instanceof Date)) {
                  xData = grep(xData, function(x) {
                    return isNumber(x);
                  });
                  seriesDataMin = arrayMin(xData);
                }
                axis.dataMin = mathMin(pick(axis.dataMin, xData[0]), seriesDataMin);
                axis.dataMax = mathMax(pick(axis.dataMax, xData[0]), arrayMax(xData));
              }
            } else {
              series.getExtremes();
              seriesDataMax = series.dataMax;
              seriesDataMin = series.dataMin;
              if (defined(seriesDataMin) && defined(seriesDataMax)) {
                axis.dataMin = mathMin(pick(axis.dataMin, seriesDataMin), seriesDataMin);
                axis.dataMax = mathMax(pick(axis.dataMax, seriesDataMax), seriesDataMax);
              }
              if (defined(threshold)) {
                axis.threshold = threshold;
              }
              if (!seriesOptions.softThreshold || axis.isLog) {
                axis.softThreshold = false;
              }
            }
          }
        });
      },
      translate: function(val, backwards, cvsCoord, old, handleLog, pointPlacement) {
        var axis = this.linkedParent || this,
            sign = 1,
            cvsOffset = 0,
            localA = old ? axis.oldTransA : axis.transA,
            localMin = old ? axis.oldMin : axis.min,
            returnValue,
            minPixelPadding = axis.minPixelPadding,
            doPostTranslate = (axis.isOrdinal || axis.isBroken || (axis.isLog && handleLog)) && axis.lin2val;
        if (!localA) {
          localA = axis.transA;
        }
        if (cvsCoord) {
          sign *= -1;
          cvsOffset = axis.len;
        }
        if (axis.reversed) {
          sign *= -1;
          cvsOffset -= sign * (axis.sector || axis.len);
        }
        if (backwards) {
          val = val * sign + cvsOffset;
          val -= minPixelPadding;
          returnValue = val / localA + localMin;
          if (doPostTranslate) {
            returnValue = axis.lin2val(returnValue);
          }
        } else {
          if (doPostTranslate) {
            val = axis.val2lin(val);
          }
          if (pointPlacement === 'between') {
            pointPlacement = 0.5;
          }
          returnValue = sign * (val - localMin) * localA + cvsOffset + (sign * minPixelPadding) + (isNumber(pointPlacement) ? localA * pointPlacement * axis.pointRange : 0);
        }
        return returnValue;
      },
      toPixels: function(value, paneCoordinates) {
        return this.translate(value, false, !this.horiz, null, true) + (paneCoordinates ? 0 : this.pos);
      },
      toValue: function(pixel, paneCoordinates) {
        return this.translate(pixel - (paneCoordinates ? 0 : this.pos), true, !this.horiz, null, true);
      },
      getPlotLinePath: function(value, lineWidth, old, force, translatedValue) {
        var axis = this,
            chart = axis.chart,
            axisLeft = axis.left,
            axisTop = axis.top,
            x1,
            y1,
            x2,
            y2,
            cHeight = (old && chart.oldChartHeight) || chart.chartHeight,
            cWidth = (old && chart.oldChartWidth) || chart.chartWidth,
            skip,
            transB = axis.transB,
            between = function(x, a, b) {
              if (x < a || x > b) {
                if (force) {
                  x = mathMin(mathMax(a, x), b);
                } else {
                  skip = true;
                }
              }
              return x;
            };
        translatedValue = pick(translatedValue, axis.translate(value, null, null, old));
        x1 = x2 = mathRound(translatedValue + transB);
        y1 = y2 = mathRound(cHeight - translatedValue - transB);
        if (!isNumber(translatedValue)) {
          skip = true;
        } else if (axis.horiz) {
          y1 = axisTop;
          y2 = cHeight - axis.bottom;
          x1 = x2 = between(x1, axisLeft, axisLeft + axis.width);
        } else {
          x1 = axisLeft;
          x2 = cWidth - axis.right;
          y1 = y2 = between(y1, axisTop, axisTop + axis.height);
        }
        return skip && !force ? null : chart.renderer.crispLine([M, x1, y1, L, x2, y2], lineWidth || 1);
      },
      getLinearTickPositions: function(tickInterval, min, max) {
        var pos,
            lastPos,
            roundedMin = correctFloat(mathFloor(min / tickInterval) * tickInterval),
            roundedMax = correctFloat(mathCeil(max / tickInterval) * tickInterval),
            tickPositions = [];
        if (min === max && isNumber(min)) {
          return [min];
        }
        pos = roundedMin;
        while (pos <= roundedMax) {
          tickPositions.push(pos);
          pos = correctFloat(pos + tickInterval);
          if (pos === lastPos) {
            break;
          }
          lastPos = pos;
        }
        return tickPositions;
      },
      getMinorTickPositions: function() {
        var axis = this,
            options = axis.options,
            tickPositions = axis.tickPositions,
            minorTickInterval = axis.minorTickInterval,
            minorTickPositions = [],
            pos,
            i,
            pointRangePadding = axis.pointRangePadding || 0,
            min = axis.min - pointRangePadding,
            max = axis.max + pointRangePadding,
            range = max - min,
            len;
        if (range && range / minorTickInterval < axis.len / 3) {
          if (axis.isLog) {
            len = tickPositions.length;
            for (i = 1; i < len; i++) {
              minorTickPositions = minorTickPositions.concat(axis.getLogTickPositions(minorTickInterval, tickPositions[i - 1], tickPositions[i], true));
            }
          } else if (axis.isDatetimeAxis && options.minorTickInterval === 'auto') {
            minorTickPositions = minorTickPositions.concat(axis.getTimeTicks(axis.normalizeTimeTickInterval(minorTickInterval), min, max, options.startOfWeek));
          } else {
            for (pos = min + (tickPositions[0] - min) % minorTickInterval; pos <= max; pos += minorTickInterval) {
              minorTickPositions.push(pos);
            }
          }
        }
        if (minorTickPositions.length !== 0) {
          axis.trimTicks(minorTickPositions, options.startOnTick, options.endOnTick);
        }
        return minorTickPositions;
      },
      adjustForMinRange: function() {
        var axis = this,
            options = axis.options,
            min = axis.min,
            max = axis.max,
            zoomOffset,
            spaceAvailable = axis.dataMax - axis.dataMin >= axis.minRange,
            closestDataRange,
            i,
            distance,
            xData,
            loopLength,
            minArgs,
            maxArgs,
            minRange;
        if (axis.isXAxis && axis.minRange === UNDEFINED && !axis.isLog) {
          if (defined(options.min) || defined(options.max)) {
            axis.minRange = null;
          } else {
            each(axis.series, function(series) {
              xData = series.xData;
              loopLength = series.xIncrement ? 1 : xData.length - 1;
              for (i = loopLength; i > 0; i--) {
                distance = xData[i] - xData[i - 1];
                if (closestDataRange === UNDEFINED || distance < closestDataRange) {
                  closestDataRange = distance;
                }
              }
            });
            axis.minRange = mathMin(closestDataRange * 5, axis.dataMax - axis.dataMin);
          }
        }
        if (max - min < axis.minRange) {
          minRange = axis.minRange;
          zoomOffset = (minRange - max + min) / 2;
          minArgs = [min - zoomOffset, pick(options.min, min - zoomOffset)];
          if (spaceAvailable) {
            minArgs[2] = axis.dataMin;
          }
          min = arrayMax(minArgs);
          maxArgs = [min + minRange, pick(options.max, min + minRange)];
          if (spaceAvailable) {
            maxArgs[2] = axis.dataMax;
          }
          max = arrayMin(maxArgs);
          if (max - min < minRange) {
            minArgs[0] = max - minRange;
            minArgs[1] = pick(options.min, max - minRange);
            min = arrayMax(minArgs);
          }
        }
        axis.min = min;
        axis.max = max;
      },
      getClosest: function() {
        var ret;
        each(this.series, function(series) {
          var seriesClosest = series.closestPointRange;
          if (!series.noSharedTooltip && defined(seriesClosest)) {
            ret = defined(ret) ? mathMin(ret, seriesClosest) : seriesClosest;
          }
        });
        return ret;
      },
      setAxisTranslation: function(saveOld) {
        var axis = this,
            range = axis.max - axis.min,
            pointRange = axis.axisPointRange || 0,
            closestPointRange,
            minPointOffset = 0,
            pointRangePadding = 0,
            linkedParent = axis.linkedParent,
            ordinalCorrection,
            hasCategories = !!axis.categories,
            transA = axis.transA,
            isXAxis = axis.isXAxis;
        if (isXAxis || hasCategories || pointRange) {
          if (linkedParent) {
            minPointOffset = linkedParent.minPointOffset;
            pointRangePadding = linkedParent.pointRangePadding;
          } else {
            closestPointRange = axis.getClosest();
            each(axis.series, function(series) {
              var seriesPointRange = hasCategories ? 1 : (isXAxis ? pick(series.options.pointRange, closestPointRange, 0) : (axis.axisPointRange || 0)),
                  pointPlacement = series.options.pointPlacement;
              pointRange = mathMax(pointRange, seriesPointRange);
              if (!axis.single) {
                minPointOffset = mathMax(minPointOffset, isString(pointPlacement) ? 0 : seriesPointRange / 2);
                pointRangePadding = mathMax(pointRangePadding, pointPlacement === 'on' ? 0 : seriesPointRange);
              }
            });
          }
          ordinalCorrection = axis.ordinalSlope && closestPointRange ? axis.ordinalSlope / closestPointRange : 1;
          axis.minPointOffset = minPointOffset = minPointOffset * ordinalCorrection;
          axis.pointRangePadding = pointRangePadding = pointRangePadding * ordinalCorrection;
          axis.pointRange = mathMin(pointRange, range);
          if (isXAxis) {
            axis.closestPointRange = closestPointRange;
          }
        }
        if (saveOld) {
          axis.oldTransA = transA;
        }
        axis.translationSlope = axis.transA = transA = axis.len / ((range + pointRangePadding) || 1);
        axis.transB = axis.horiz ? axis.left : axis.bottom;
        axis.minPixelPadding = transA * minPointOffset;
      },
      minFromRange: function() {
        return this.max - this.range;
      },
      setTickInterval: function(secondPass) {
        var axis = this,
            chart = axis.chart,
            options = axis.options,
            isLog = axis.isLog,
            log2lin = axis.log2lin,
            isDatetimeAxis = axis.isDatetimeAxis,
            isXAxis = axis.isXAxis,
            isLinked = axis.isLinked,
            maxPadding = options.maxPadding,
            minPadding = options.minPadding,
            length,
            linkedParentExtremes,
            tickIntervalOption = options.tickInterval,
            minTickInterval,
            tickPixelIntervalOption = options.tickPixelInterval,
            categories = axis.categories,
            threshold = axis.threshold,
            softThreshold = axis.softThreshold,
            thresholdMin,
            thresholdMax,
            hardMin,
            hardMax;
        if (!isDatetimeAxis && !categories && !isLinked) {
          this.getTickAmount();
        }
        hardMin = pick(axis.userMin, options.min);
        hardMax = pick(axis.userMax, options.max);
        if (isLinked) {
          axis.linkedParent = chart[axis.coll][options.linkedTo];
          linkedParentExtremes = axis.linkedParent.getExtremes();
          axis.min = pick(linkedParentExtremes.min, linkedParentExtremes.dataMin);
          axis.max = pick(linkedParentExtremes.max, linkedParentExtremes.dataMax);
          if (options.type !== axis.linkedParent.options.type) {
            error(11, 1);
          }
        } else {
          if (!softThreshold && defined(threshold)) {
            if (axis.dataMin >= threshold) {
              thresholdMin = threshold;
              minPadding = 0;
            } else if (axis.dataMax <= threshold) {
              thresholdMax = threshold;
              maxPadding = 0;
            }
          }
          axis.min = pick(hardMin, thresholdMin, axis.dataMin);
          axis.max = pick(hardMax, thresholdMax, axis.dataMax);
        }
        if (isLog) {
          if (!secondPass && mathMin(axis.min, pick(axis.dataMin, axis.min)) <= 0) {
            error(10, 1);
          }
          axis.min = correctFloat(log2lin(axis.min), 15);
          axis.max = correctFloat(log2lin(axis.max), 15);
        }
        if (axis.range && defined(axis.max)) {
          axis.userMin = axis.min = hardMin = mathMax(axis.min, axis.minFromRange());
          axis.userMax = hardMax = axis.max;
          axis.range = null;
        }
        fireEvent(axis, 'foundExtremes');
        if (axis.beforePadding) {
          axis.beforePadding();
        }
        axis.adjustForMinRange();
        if (!categories && !axis.axisPointRange && !axis.usePercentage && !isLinked && defined(axis.min) && defined(axis.max)) {
          length = axis.max - axis.min;
          if (length) {
            if (!defined(hardMin) && minPadding) {
              axis.min -= length * minPadding;
            }
            if (!defined(hardMax) && maxPadding) {
              axis.max += length * maxPadding;
            }
          }
        }
        if (isNumber(options.floor)) {
          axis.min = mathMax(axis.min, options.floor);
        }
        if (isNumber(options.ceiling)) {
          axis.max = mathMin(axis.max, options.ceiling);
        }
        if (softThreshold && defined(axis.dataMin)) {
          threshold = threshold || 0;
          if (!defined(hardMin) && axis.min < threshold && axis.dataMin >= threshold) {
            axis.min = threshold;
          } else if (!defined(hardMax) && axis.max > threshold && axis.dataMax <= threshold) {
            axis.max = threshold;
          }
        }
        if (axis.min === axis.max || axis.min === undefined || axis.max === undefined) {
          axis.tickInterval = 1;
        } else if (isLinked && !tickIntervalOption && tickPixelIntervalOption === axis.linkedParent.options.tickPixelInterval) {
          axis.tickInterval = tickIntervalOption = axis.linkedParent.tickInterval;
        } else {
          axis.tickInterval = pick(tickIntervalOption, this.tickAmount ? ((axis.max - axis.min) / mathMax(this.tickAmount - 1, 1)) : undefined, categories ? 1 : (axis.max - axis.min) * tickPixelIntervalOption / mathMax(axis.len, tickPixelIntervalOption));
        }
        if (isXAxis && !secondPass) {
          each(axis.series, function(series) {
            series.processData(axis.min !== axis.oldMin || axis.max !== axis.oldMax);
          });
        }
        axis.setAxisTranslation(true);
        if (axis.beforeSetTickPositions) {
          axis.beforeSetTickPositions();
        }
        if (axis.postProcessTickInterval) {
          axis.tickInterval = axis.postProcessTickInterval(axis.tickInterval);
        }
        if (axis.pointRange && !tickIntervalOption) {
          axis.tickInterval = mathMax(axis.pointRange, axis.tickInterval);
        }
        minTickInterval = pick(options.minTickInterval, axis.isDatetimeAxis && axis.closestPointRange);
        if (!tickIntervalOption && axis.tickInterval < minTickInterval) {
          axis.tickInterval = minTickInterval;
        }
        if (!isDatetimeAxis && !isLog && !tickIntervalOption) {
          axis.tickInterval = normalizeTickInterval(axis.tickInterval, null, getMagnitude(axis.tickInterval), pick(options.allowDecimals, !(axis.tickInterval > 0.5 && axis.tickInterval < 5 && axis.max > 1000 && axis.max < 9999)), !!this.tickAmount);
        }
        if (!this.tickAmount && this.len) {
          axis.tickInterval = axis.unsquish();
        }
        this.setTickPositions();
      },
      setTickPositions: function() {
        var options = this.options,
            tickPositions,
            tickPositionsOption = options.tickPositions,
            tickPositioner = options.tickPositioner,
            startOnTick = options.startOnTick,
            endOnTick = options.endOnTick,
            single;
        this.tickmarkOffset = (this.categories && options.tickmarkPlacement === 'between' && this.tickInterval === 1) ? 0.5 : 0;
        this.minorTickInterval = options.minorTickInterval === 'auto' && this.tickInterval ? this.tickInterval / 5 : options.minorTickInterval;
        this.tickPositions = tickPositions = tickPositionsOption && tickPositionsOption.slice();
        if (!tickPositions) {
          if (this.isDatetimeAxis) {
            tickPositions = this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, options.units), this.min, this.max, options.startOfWeek, this.ordinalPositions, this.closestPointRange, true);
          } else if (this.isLog) {
            tickPositions = this.getLogTickPositions(this.tickInterval, this.min, this.max);
          } else {
            tickPositions = this.getLinearTickPositions(this.tickInterval, this.min, this.max);
          }
          if (tickPositions.length > this.len) {
            tickPositions = [tickPositions[0], tickPositions.pop()];
          }
          this.tickPositions = tickPositions;
          if (tickPositioner) {
            tickPositioner = tickPositioner.apply(this, [this.min, this.max]);
            if (tickPositioner) {
              this.tickPositions = tickPositions = tickPositioner;
            }
          }
        }
        if (!this.isLinked) {
          this.trimTicks(tickPositions, startOnTick, endOnTick);
          if (this.min === this.max && defined(this.min) && !this.tickAmount) {
            single = true;
            this.min -= 0.5;
            this.max += 0.5;
          }
          this.single = single;
          if (!tickPositionsOption && !tickPositioner) {
            this.adjustTickAmount();
          }
        }
      },
      trimTicks: function(tickPositions, startOnTick, endOnTick) {
        var roundedMin = tickPositions[0],
            roundedMax = tickPositions[tickPositions.length - 1],
            minPointOffset = this.minPointOffset || 0;
        if (startOnTick) {
          this.min = roundedMin;
        } else {
          while (this.min - minPointOffset > tickPositions[0]) {
            tickPositions.shift();
          }
        }
        if (endOnTick) {
          this.max = roundedMax;
        } else {
          while (this.max + minPointOffset < tickPositions[tickPositions.length - 1]) {
            tickPositions.pop();
          }
        }
        if (tickPositions.length === 0 && defined(roundedMin)) {
          tickPositions.push((roundedMax + roundedMin) / 2);
        }
      },
      alignToOthers: function() {
        var others = {},
            hasOther,
            options = this.options;
        if (this.chart.options.chart.alignTicks !== false && options.alignTicks !== false) {
          each(this.chart[this.coll], function(axis) {
            var otherOptions = axis.options,
                horiz = axis.horiz,
                key = [horiz ? otherOptions.left : otherOptions.top, otherOptions.width, otherOptions.height, otherOptions.pane].join(',');
            if (axis.series.length) {
              if (others[key]) {
                hasOther = true;
              } else {
                others[key] = 1;
              }
            }
          });
        }
        return hasOther;
      },
      getTickAmount: function() {
        var options = this.options,
            tickAmount = options.tickAmount,
            tickPixelInterval = options.tickPixelInterval;
        if (!defined(options.tickInterval) && this.len < tickPixelInterval && !this.isRadial && !this.isLog && options.startOnTick && options.endOnTick) {
          tickAmount = 2;
        }
        if (!tickAmount && this.alignToOthers()) {
          tickAmount = mathCeil(this.len / tickPixelInterval) + 1;
        }
        if (tickAmount < 4) {
          this.finalTickAmt = tickAmount;
          tickAmount = 5;
        }
        this.tickAmount = tickAmount;
      },
      adjustTickAmount: function() {
        var tickInterval = this.tickInterval,
            tickPositions = this.tickPositions,
            tickAmount = this.tickAmount,
            finalTickAmt = this.finalTickAmt,
            currentTickAmount = tickPositions && tickPositions.length,
            i,
            len;
        if (currentTickAmount < tickAmount) {
          while (tickPositions.length < tickAmount) {
            tickPositions.push(correctFloat(tickPositions[tickPositions.length - 1] + tickInterval));
          }
          this.transA *= (currentTickAmount - 1) / (tickAmount - 1);
          this.max = tickPositions[tickPositions.length - 1];
        } else if (currentTickAmount > tickAmount) {
          this.tickInterval *= 2;
          this.setTickPositions();
        }
        if (defined(finalTickAmt)) {
          i = len = tickPositions.length;
          while (i--) {
            if ((finalTickAmt === 3 && i % 2 === 1) || (finalTickAmt <= 2 && i > 0 && i < len - 1)) {
              tickPositions.splice(i, 1);
            }
          }
          this.finalTickAmt = UNDEFINED;
        }
      },
      setScale: function() {
        var axis = this,
            isDirtyData,
            isDirtyAxisLength;
        axis.oldMin = axis.min;
        axis.oldMax = axis.max;
        axis.oldAxisLength = axis.len;
        axis.setAxisSize();
        isDirtyAxisLength = axis.len !== axis.oldAxisLength;
        each(axis.series, function(series) {
          if (series.isDirtyData || series.isDirty || series.xAxis.isDirty) {
            isDirtyData = true;
          }
        });
        if (isDirtyAxisLength || isDirtyData || axis.isLinked || axis.forceRedraw || axis.userMin !== axis.oldUserMin || axis.userMax !== axis.oldUserMax || axis.alignToOthers()) {
          if (axis.resetStacks) {
            axis.resetStacks();
          }
          axis.forceRedraw = false;
          axis.getSeriesExtremes();
          axis.setTickInterval();
          axis.oldUserMin = axis.userMin;
          axis.oldUserMax = axis.userMax;
          if (!axis.isDirty) {
            axis.isDirty = isDirtyAxisLength || axis.min !== axis.oldMin || axis.max !== axis.oldMax;
          }
        } else if (axis.cleanStacks) {
          axis.cleanStacks();
        }
      },
      setExtremes: function(newMin, newMax, redraw, animation, eventArguments) {
        var axis = this,
            chart = axis.chart;
        redraw = pick(redraw, true);
        each(axis.series, function(serie) {
          delete serie.kdTree;
        });
        eventArguments = extend(eventArguments, {
          min: newMin,
          max: newMax
        });
        fireEvent(axis, 'setExtremes', eventArguments, function() {
          axis.userMin = newMin;
          axis.userMax = newMax;
          axis.eventArgs = eventArguments;
          if (redraw) {
            chart.redraw(animation);
          }
        });
      },
      zoom: function(newMin, newMax) {
        var dataMin = this.dataMin,
            dataMax = this.dataMax,
            options = this.options,
            min = mathMin(dataMin, pick(options.min, dataMin)),
            max = mathMax(dataMax, pick(options.max, dataMax));
        if (!this.allowZoomOutside) {
          if (defined(dataMin) && newMin <= min) {
            newMin = min;
          }
          if (defined(dataMax) && newMax >= max) {
            newMax = max;
          }
        }
        this.displayBtn = newMin !== UNDEFINED || newMax !== UNDEFINED;
        this.setExtremes(newMin, newMax, false, UNDEFINED, {trigger: 'zoom'});
        return true;
      },
      setAxisSize: function() {
        var chart = this.chart,
            options = this.options,
            offsetLeft = options.offsetLeft || 0,
            offsetRight = options.offsetRight || 0,
            horiz = this.horiz,
            width = pick(options.width, chart.plotWidth - offsetLeft + offsetRight),
            height = pick(options.height, chart.plotHeight),
            top = pick(options.top, chart.plotTop),
            left = pick(options.left, chart.plotLeft + offsetLeft),
            percentRegex = /%$/;
        if (percentRegex.test(height)) {
          height = Math.round(parseFloat(height) / 100 * chart.plotHeight);
        }
        if (percentRegex.test(top)) {
          top = Math.round(parseFloat(top) / 100 * chart.plotHeight + chart.plotTop);
        }
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.bottom = chart.chartHeight - height - top;
        this.right = chart.chartWidth - width - left;
        this.len = mathMax(horiz ? width : height, 0);
        this.pos = horiz ? left : top;
      },
      getExtremes: function() {
        var axis = this,
            isLog = axis.isLog,
            lin2log = axis.lin2log;
        return {
          min: isLog ? correctFloat(lin2log(axis.min)) : axis.min,
          max: isLog ? correctFloat(lin2log(axis.max)) : axis.max,
          dataMin: axis.dataMin,
          dataMax: axis.dataMax,
          userMin: axis.userMin,
          userMax: axis.userMax
        };
      },
      getThreshold: function(threshold) {
        var axis = this,
            isLog = axis.isLog,
            lin2log = axis.lin2log,
            realMin = isLog ? lin2log(axis.min) : axis.min,
            realMax = isLog ? lin2log(axis.max) : axis.max;
        if (threshold === null) {
          threshold = realMax < 0 ? realMax : realMin;
        } else if (realMin > threshold) {
          threshold = realMin;
        } else if (realMax < threshold) {
          threshold = realMax;
        }
        return axis.translate(threshold, 0, 1, 0, 1);
      },
      autoLabelAlign: function(rotation) {
        var ret,
            angle = (pick(rotation, 0) - (this.side * 90) + 720) % 360;
        if (angle > 15 && angle < 165) {
          ret = 'right';
        } else if (angle > 195 && angle < 345) {
          ret = 'left';
        } else {
          ret = 'center';
        }
        return ret;
      },
      tickSize: function(prefix) {
        var options = this.options,
            tickLength = options[prefix + 'Length'],
            tickWidth = pick(options[prefix + 'Width'], prefix === 'tick' && this.isXAxis ? 1 : 0);
        if (tickWidth && tickLength) {
          if (options[prefix + 'Position'] === 'inside') {
            tickLength = -tickLength;
          }
          return [tickLength, tickWidth];
        }
      },
      labelMetrics: function() {
        return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label);
      },
      unsquish: function() {
        var labelOptions = this.options.labels,
            horiz = this.horiz,
            tickInterval = this.tickInterval,
            newTickInterval = tickInterval,
            slotSize = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / tickInterval),
            rotation,
            rotationOption = labelOptions.rotation,
            labelMetrics = this.labelMetrics(),
            step,
            bestScore = Number.MAX_VALUE,
            autoRotation,
            getStep = function(spaceNeeded) {
              var step = spaceNeeded / (slotSize || 1);
              step = step > 1 ? mathCeil(step) : 1;
              return step * tickInterval;
            };
        if (horiz) {
          autoRotation = !labelOptions.staggerLines && !labelOptions.step && (defined(rotationOption) ? [rotationOption] : slotSize < pick(labelOptions.autoRotationLimit, 80) && labelOptions.autoRotation);
          if (autoRotation) {
            each(autoRotation, function(rot) {
              var score;
              if (rot === rotationOption || (rot && rot >= -90 && rot <= 90)) {
                step = getStep(mathAbs(labelMetrics.h / mathSin(deg2rad * rot)));
                score = step + mathAbs(rot / 360);
                if (score < bestScore) {
                  bestScore = score;
                  rotation = rot;
                  newTickInterval = step;
                }
              }
            });
          }
        } else if (!labelOptions.step) {
          newTickInterval = getStep(labelMetrics.h);
        }
        this.autoRotation = autoRotation;
        this.labelRotation = pick(rotation, rotationOption);
        return newTickInterval;
      },
      getSlotWidth: function() {
        var chart = this.chart,
            horiz = this.horiz,
            labelOptions = this.options.labels,
            slotCount = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
            marginLeft = chart.margin[3];
        return (horiz && (labelOptions.step || 0) < 2 && !labelOptions.rotation && ((this.staggerLines || 1) * chart.plotWidth) / slotCount) || (!horiz && ((marginLeft && (marginLeft - chart.spacing[3])) || chart.chartWidth * 0.33));
      },
      renderUnsquish: function() {
        var chart = this.chart,
            renderer = chart.renderer,
            tickPositions = this.tickPositions,
            ticks = this.ticks,
            labelOptions = this.options.labels,
            horiz = this.horiz,
            slotWidth = this.getSlotWidth(),
            innerWidth = mathMax(1, mathRound(slotWidth - 2 * (labelOptions.padding || 5))),
            attr = {},
            labelMetrics = this.labelMetrics(),
            textOverflowOption = labelOptions.style.textOverflow,
            css,
            labelLength = 0,
            label,
            i,
            pos;
        if (!isString(labelOptions.rotation)) {
          attr.rotation = labelOptions.rotation || 0;
        }
        if (this.autoRotation) {
          each(tickPositions, function(tick) {
            tick = ticks[tick];
            if (tick && tick.labelLength > labelLength) {
              labelLength = tick.labelLength;
            }
          });
          if (labelLength > innerWidth && labelLength > labelMetrics.h) {
            attr.rotation = this.labelRotation;
          } else {
            this.labelRotation = 0;
          }
        } else if (slotWidth) {
          css = {width: innerWidth + PX};
          if (!textOverflowOption) {
            css.textOverflow = 'clip';
            i = tickPositions.length;
            while (!horiz && i--) {
              pos = tickPositions[i];
              label = ticks[pos].label;
              if (label) {
                if (label.styles.textOverflow === 'ellipsis') {
                  label.css({textOverflow: 'clip'});
                } else if (ticks[pos].labelLength > slotWidth) {
                  label.css({width: slotWidth + 'px'});
                }
                if (label.getBBox().height > this.len / tickPositions.length - (labelMetrics.h - labelMetrics.f)) {
                  label.specCss = {textOverflow: 'ellipsis'};
                }
              }
            }
          }
        }
        if (attr.rotation) {
          css = {width: (labelLength > chart.chartHeight * 0.5 ? chart.chartHeight * 0.33 : chart.chartHeight) + PX};
          if (!textOverflowOption) {
            css.textOverflow = 'ellipsis';
          }
        }
        this.labelAlign = labelOptions.align || this.autoLabelAlign(this.labelRotation);
        if (this.labelAlign) {
          attr.align = this.labelAlign;
        }
        each(tickPositions, function(pos) {
          var tick = ticks[pos],
              label = tick && tick.label;
          if (label) {
            label.attr(attr);
            if (css) {
              label.css(merge(css, label.specCss));
            }
            delete label.specCss;
            tick.rotation = attr.rotation;
          }
        });
        this.tickRotCorr = renderer.rotCorr(labelMetrics.b, this.labelRotation || 0, this.side !== 0);
      },
      hasData: function() {
        return this.hasVisibleSeries || (defined(this.min) && defined(this.max) && !!this.tickPositions);
      },
      getOffset: function() {
        var axis = this,
            chart = axis.chart,
            renderer = chart.renderer,
            options = axis.options,
            tickPositions = axis.tickPositions,
            ticks = axis.ticks,
            horiz = axis.horiz,
            side = axis.side,
            invertedSide = chart.inverted ? [1, 0, 3, 2][side] : side,
            hasData,
            showAxis,
            titleOffset = 0,
            titleOffsetOption,
            titleMargin = 0,
            axisTitleOptions = options.title,
            labelOptions = options.labels,
            labelOffset = 0,
            labelOffsetPadded,
            opposite = axis.opposite,
            axisOffset = chart.axisOffset,
            clipOffset = chart.clipOffset,
            clip,
            directionFactor = [-1, 1, 1, -1][side],
            n,
            textAlign,
            axisParent = axis.axisParent,
            lineHeightCorrection,
            tickSize = this.tickSize('tick');
        hasData = axis.hasData();
        axis.showAxis = showAxis = hasData || pick(options.showEmpty, true);
        axis.staggerLines = axis.horiz && labelOptions.staggerLines;
        if (!axis.axisGroup) {
          axis.gridGroup = renderer.g('grid').attr({zIndex: options.gridZIndex || 1}).add(axisParent);
          axis.axisGroup = renderer.g('axis').attr({zIndex: options.zIndex || 2}).add(axisParent);
          axis.labelGroup = renderer.g('axis-labels').attr({zIndex: labelOptions.zIndex || 7}).addClass(PREFIX + axis.coll.toLowerCase() + '-labels').add(axisParent);
        }
        if (hasData || axis.isLinked) {
          each(tickPositions, function(pos) {
            if (!ticks[pos]) {
              ticks[pos] = new Tick(axis, pos);
            } else {
              ticks[pos].addLabel();
            }
          });
          axis.renderUnsquish();
          if (labelOptions.reserveSpace !== false && (side === 0 || side === 2 || {
            1: 'left',
            3: 'right'
          }[side] === axis.labelAlign || axis.labelAlign === 'center')) {
            each(tickPositions, function(pos) {
              labelOffset = mathMax(ticks[pos].getLabelSize(), labelOffset);
            });
          }
          if (axis.staggerLines) {
            labelOffset *= axis.staggerLines;
            axis.labelOffset = labelOffset * (axis.opposite ? -1 : 1);
          }
        } else {
          for (n in ticks) {
            ticks[n].destroy();
            delete ticks[n];
          }
        }
        if (axisTitleOptions && axisTitleOptions.text && axisTitleOptions.enabled !== false) {
          if (!axis.axisTitle) {
            textAlign = axisTitleOptions.textAlign;
            if (!textAlign) {
              textAlign = (horiz ? {
                low: 'left',
                middle: 'center',
                high: 'right'
              } : {
                low: opposite ? 'right' : 'left',
                middle: 'center',
                high: opposite ? 'left' : 'right'
              })[axisTitleOptions.align];
            }
            axis.axisTitle = renderer.text(axisTitleOptions.text, 0, 0, axisTitleOptions.useHTML).attr({
              zIndex: 7,
              rotation: axisTitleOptions.rotation || 0,
              align: textAlign
            }).addClass(PREFIX + this.coll.toLowerCase() + '-title').css(axisTitleOptions.style).add(axis.axisGroup);
            axis.axisTitle.isNew = true;
          }
          if (showAxis) {
            titleOffset = axis.axisTitle.getBBox()[horiz ? 'height' : 'width'];
            titleOffsetOption = axisTitleOptions.offset;
            titleMargin = defined(titleOffsetOption) ? 0 : pick(axisTitleOptions.margin, horiz ? 5 : 10);
          }
          axis.axisTitle[showAxis ? 'show' : 'hide'](true);
        }
        axis.offset = directionFactor * pick(options.offset, axisOffset[side]);
        axis.tickRotCorr = axis.tickRotCorr || {
          x: 0,
          y: 0
        };
        if (side === 0) {
          lineHeightCorrection = -axis.labelMetrics().h;
        } else if (side === 2) {
          lineHeightCorrection = axis.tickRotCorr.y;
        } else {
          lineHeightCorrection = 0;
        }
        labelOffsetPadded = Math.abs(labelOffset) + titleMargin;
        if (labelOffset) {
          labelOffsetPadded -= lineHeightCorrection;
          labelOffsetPadded += directionFactor * (horiz ? pick(labelOptions.y, axis.tickRotCorr.y + directionFactor * 8) : labelOptions.x);
        }
        axis.axisTitleMargin = pick(titleOffsetOption, labelOffsetPadded);
        axisOffset[side] = mathMax(axisOffset[side], axis.axisTitleMargin + titleOffset + directionFactor * axis.offset, labelOffsetPadded, hasData && tickPositions.length && tickSize ? tickSize[0] : 0);
        clip = options.offset ? 0 : mathFloor(options.lineWidth / 2) * 2;
        clipOffset[invertedSide] = mathMax(clipOffset[invertedSide], clip);
      },
      getLinePath: function(lineWidth) {
        var chart = this.chart,
            opposite = this.opposite,
            offset = this.offset,
            horiz = this.horiz,
            lineLeft = this.left + (opposite ? this.width : 0) + offset,
            lineTop = chart.chartHeight - this.bottom - (opposite ? this.height : 0) + offset;
        if (opposite) {
          lineWidth *= -1;
        }
        return chart.renderer.crispLine([M, horiz ? this.left : lineLeft, horiz ? lineTop : this.top, L, horiz ? chart.chartWidth - this.right : lineLeft, horiz ? lineTop : chart.chartHeight - this.bottom], lineWidth);
      },
      getTitlePosition: function() {
        var horiz = this.horiz,
            axisLeft = this.left,
            axisTop = this.top,
            axisLength = this.len,
            axisTitleOptions = this.options.title,
            margin = horiz ? axisLeft : axisTop,
            opposite = this.opposite,
            offset = this.offset,
            xOption = axisTitleOptions.x || 0,
            yOption = axisTitleOptions.y || 0,
            fontSize = pInt(axisTitleOptions.style.fontSize || 12),
            alongAxis = {
              low: margin + (horiz ? 0 : axisLength),
              middle: margin + axisLength / 2,
              high: margin + (horiz ? axisLength : 0)
            }[axisTitleOptions.align],
            offAxis = (horiz ? axisTop + this.height : axisLeft) + (horiz ? 1 : -1) * (opposite ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? fontSize : 0);
        return {
          x: horiz ? alongAxis + xOption : offAxis + (opposite ? this.width : 0) + offset + xOption,
          y: horiz ? offAxis + yOption - (opposite ? this.height : 0) + offset : alongAxis + yOption
        };
      },
      render: function() {
        var axis = this,
            chart = axis.chart,
            renderer = chart.renderer,
            options = axis.options,
            isLog = axis.isLog,
            lin2log = axis.lin2log,
            isLinked = axis.isLinked,
            tickPositions = axis.tickPositions,
            axisTitle = axis.axisTitle,
            ticks = axis.ticks,
            minorTicks = axis.minorTicks,
            alternateBands = axis.alternateBands,
            stackLabelOptions = options.stackLabels,
            alternateGridColor = options.alternateGridColor,
            tickmarkOffset = axis.tickmarkOffset,
            lineWidth = options.lineWidth,
            linePath,
            hasRendered = chart.hasRendered,
            slideInTicks = hasRendered && isNumber(axis.oldMin),
            showAxis = axis.showAxis,
            animation = animObject(renderer.globalAnimation),
            from,
            to;
        axis.labelEdge.length = 0;
        axis.overlap = false;
        each([ticks, minorTicks, alternateBands], function(coll) {
          var pos;
          for (pos in coll) {
            coll[pos].isActive = false;
          }
        });
        if (axis.hasData() || isLinked) {
          if (axis.minorTickInterval && !axis.categories) {
            each(axis.getMinorTickPositions(), function(pos) {
              if (!minorTicks[pos]) {
                minorTicks[pos] = new Tick(axis, pos, 'minor');
              }
              if (slideInTicks && minorTicks[pos].isNew) {
                minorTicks[pos].render(null, true);
              }
              minorTicks[pos].render(null, false, 1);
            });
          }
          if (tickPositions.length) {
            each(tickPositions, function(pos, i) {
              if (!isLinked || (pos >= axis.min && pos <= axis.max)) {
                if (!ticks[pos]) {
                  ticks[pos] = new Tick(axis, pos);
                }
                if (slideInTicks && ticks[pos].isNew) {
                  ticks[pos].render(i, true, 0.1);
                }
                ticks[pos].render(i);
              }
            });
            if (tickmarkOffset && (axis.min === 0 || axis.single)) {
              if (!ticks[-1]) {
                ticks[-1] = new Tick(axis, -1, null, true);
              }
              ticks[-1].render(-1);
            }
          }
          if (alternateGridColor) {
            each(tickPositions, function(pos, i) {
              to = tickPositions[i + 1] !== UNDEFINED ? tickPositions[i + 1] + tickmarkOffset : axis.max - tickmarkOffset;
              if (i % 2 === 0 && pos < axis.max && to <= axis.max + (chart.polar ? -tickmarkOffset : tickmarkOffset)) {
                if (!alternateBands[pos]) {
                  alternateBands[pos] = new Highcharts.PlotLineOrBand(axis);
                }
                from = pos + tickmarkOffset;
                alternateBands[pos].options = {
                  from: isLog ? lin2log(from) : from,
                  to: isLog ? lin2log(to) : to,
                  color: alternateGridColor
                };
                alternateBands[pos].render();
                alternateBands[pos].isActive = true;
              }
            });
          }
          if (!axis._addedPlotLB) {
            each((options.plotLines || []).concat(options.plotBands || []), function(plotLineOptions) {
              axis.addPlotBandOrLine(plotLineOptions);
            });
            axis._addedPlotLB = true;
          }
        }
        each([ticks, minorTicks, alternateBands], function(coll) {
          var pos,
              i,
              forDestruction = [],
              delay = animation.duration,
              destroyInactiveItems = function() {
                i = forDestruction.length;
                while (i--) {
                  if (coll[forDestruction[i]] && !coll[forDestruction[i]].isActive) {
                    coll[forDestruction[i]].destroy();
                    delete coll[forDestruction[i]];
                  }
                }
              };
          for (pos in coll) {
            if (!coll[pos].isActive) {
              coll[pos].render(pos, false, 0);
              coll[pos].isActive = false;
              forDestruction.push(pos);
            }
          }
          syncTimeout(destroyInactiveItems, coll === alternateBands || !chart.hasRendered || !delay ? 0 : delay);
        });
        if (lineWidth) {
          linePath = axis.getLinePath(lineWidth);
          if (!axis.axisLine) {
            axis.axisLine = renderer.path(linePath).attr({
              stroke: options.lineColor,
              'stroke-width': lineWidth,
              zIndex: 7
            }).add(axis.axisGroup);
          } else {
            axis.axisLine.animate({d: linePath});
          }
          axis.axisLine[showAxis ? 'show' : 'hide'](true);
        }
        if (axisTitle && showAxis) {
          axisTitle[axisTitle.isNew ? 'attr' : 'animate'](axis.getTitlePosition());
          axisTitle.isNew = false;
        }
        if (stackLabelOptions && stackLabelOptions.enabled) {
          axis.renderStackTotals();
        }
        axis.isDirty = false;
      },
      redraw: function() {
        if (this.visible) {
          this.render();
          each(this.plotLinesAndBands, function(plotLine) {
            plotLine.render();
          });
        }
        each(this.series, function(series) {
          series.isDirty = true;
        });
      },
      destroy: function(keepEvents) {
        var axis = this,
            stacks = axis.stacks,
            stackKey,
            plotLinesAndBands = axis.plotLinesAndBands,
            i;
        if (!keepEvents) {
          removeEvent(axis);
        }
        for (stackKey in stacks) {
          destroyObjectProperties(stacks[stackKey]);
          stacks[stackKey] = null;
        }
        each([axis.ticks, axis.minorTicks, axis.alternateBands], function(coll) {
          destroyObjectProperties(coll);
        });
        i = plotLinesAndBands.length;
        while (i--) {
          plotLinesAndBands[i].destroy();
        }
        each(['stackTotalGroup', 'axisLine', 'axisTitle', 'axisGroup', 'cross', 'gridGroup', 'labelGroup'], function(prop) {
          if (axis[prop]) {
            axis[prop] = axis[prop].destroy();
          }
        });
        if (this.cross) {
          this.cross.destroy();
        }
      },
      drawCrosshair: function(e, point) {
        var path,
            options = this.crosshair,
            pos,
            attribs,
            categorized,
            strokeWidth;
        if (!this.crosshair || ((defined(point) || !pick(options.snap, true)) === false)) {
          this.hideCrosshair();
        } else {
          if (!pick(options.snap, true)) {
            pos = (this.horiz ? e.chartX - this.pos : this.len - e.chartY + this.pos);
          } else if (defined(point)) {
            pos = this.isXAxis ? point.plotX : this.len - point.plotY;
          }
          if (this.isRadial) {
            path = this.getPlotLinePath(this.isXAxis ? point.x : pick(point.stackY, point.y)) || null;
          } else {
            path = this.getPlotLinePath(null, null, null, null, pos) || null;
          }
          if (path === null) {
            this.hideCrosshair();
            return;
          }
          categorized = this.categories && !this.isRadial;
          strokeWidth = pick(options.width, (categorized ? this.transA : 1));
          if (this.cross) {
            this.cross.attr({
              d: path,
              visibility: 'visible',
              'stroke-width': strokeWidth
            });
          } else {
            attribs = {
              'pointer-events': 'none',
              'stroke-width': strokeWidth,
              stroke: options.color || (categorized ? 'rgba(155,200,255,0.2)' : '#C0C0C0'),
              zIndex: pick(options.zIndex, 2)
            };
            if (options.dashStyle) {
              attribs.dashstyle = options.dashStyle;
            }
            this.cross = this.chart.renderer.path(path).attr(attribs).add();
          }
        }
      },
      hideCrosshair: function() {
        if (this.cross) {
          this.cross.hide();
        }
      }
    };
    extend(Axis.prototype, AxisPlotLineOrBandExtension);
    Axis.prototype.getTimeTicks = function(normalizedInterval, min, max, startOfWeek) {
      var tickPositions = [],
          i,
          higherRanks = {},
          useUTC = defaultOptions.global.useUTC,
          minYear,
          minDate = new Date(min - getTZOffset(min)),
          interval = normalizedInterval.unitRange,
          count = normalizedInterval.count;
      if (defined(min)) {
        minDate[setMilliseconds](interval >= timeUnits.second ? 0 : count * mathFloor(minDate.getMilliseconds() / count));
        if (interval >= timeUnits.second) {
          minDate[setSeconds](interval >= timeUnits.minute ? 0 : count * mathFloor(minDate.getSeconds() / count));
        }
        if (interval >= timeUnits.minute) {
          minDate[setMinutes](interval >= timeUnits.hour ? 0 : count * mathFloor(minDate[getMinutes]() / count));
        }
        if (interval >= timeUnits.hour) {
          minDate[setHours](interval >= timeUnits.day ? 0 : count * mathFloor(minDate[getHours]() / count));
        }
        if (interval >= timeUnits.day) {
          minDate[setDate](interval >= timeUnits.month ? 1 : count * mathFloor(minDate[getDate]() / count));
        }
        if (interval >= timeUnits.month) {
          minDate[setMonth](interval >= timeUnits.year ? 0 : count * mathFloor(minDate[getMonth]() / count));
          minYear = minDate[getFullYear]();
        }
        if (interval >= timeUnits.year) {
          minYear -= minYear % count;
          minDate[setFullYear](minYear);
        }
        if (interval === timeUnits.week) {
          minDate[setDate](minDate[getDate]() - minDate[getDay]() + pick(startOfWeek, 1));
        }
        i = 1;
        if (timezoneOffset || getTimezoneOffset) {
          minDate = minDate.getTime();
          minDate = new Date(minDate + getTZOffset(minDate));
        }
        minYear = minDate[getFullYear]();
        var time = minDate.getTime(),
            minMonth = minDate[getMonth](),
            minDateDate = minDate[getDate](),
            variableDayLength = !useUTC || !!getTimezoneOffset,
            localTimezoneOffset = (timeUnits.day + (useUTC ? getTZOffset(minDate) : minDate.getTimezoneOffset() * 60 * 1000)) % timeUnits.day;
        while (time < max) {
          tickPositions.push(time);
          if (interval === timeUnits.year) {
            time = makeTime(minYear + i * count, 0);
          } else if (interval === timeUnits.month) {
            time = makeTime(minYear, minMonth + i * count);
          } else if (variableDayLength && (interval === timeUnits.day || interval === timeUnits.week)) {
            time = makeTime(minYear, minMonth, minDateDate + i * count * (interval === timeUnits.day ? 1 : 7));
          } else {
            time += interval * count;
          }
          i++;
        }
        tickPositions.push(time);
        each(grep(tickPositions, function(time) {
          return interval <= timeUnits.hour && time % timeUnits.day === localTimezoneOffset;
        }), function(time) {
          higherRanks[time] = 'day';
        });
      }
      tickPositions.info = extend(normalizedInterval, {
        higherRanks: higherRanks,
        totalRange: interval * count
      });
      return tickPositions;
    };
    Axis.prototype.normalizeTimeTickInterval = function(tickInterval, unitsOption) {
      var units = unitsOption || [['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ['second', [1, 2, 5, 10, 15, 30]], ['minute', [1, 2, 5, 10, 15, 30]], ['hour', [1, 2, 3, 4, 6, 8, 12]], ['day', [1, 2]], ['week', [1, 2]], ['month', [1, 2, 3, 4, 6]], ['year', null]],
          unit = units[units.length - 1],
          interval = timeUnits[unit[0]],
          multiples = unit[1],
          count,
          i;
      for (i = 0; i < units.length; i++) {
        unit = units[i];
        interval = timeUnits[unit[0]];
        multiples = unit[1];
        if (units[i + 1]) {
          var lessThan = (interval * multiples[multiples.length - 1] + timeUnits[units[i + 1][0]]) / 2;
          if (tickInterval <= lessThan) {
            break;
          }
        }
      }
      if (interval === timeUnits.year && tickInterval < 5 * interval) {
        multiples = [1, 2, 5];
      }
      count = normalizeTickInterval(tickInterval / interval, multiples, unit[0] === 'year' ? mathMax(getMagnitude(tickInterval / interval), 1) : 1);
      return {
        unitRange: interval,
        count: count,
        unitName: unit[0]
      };
    };
    Axis.prototype.getLogTickPositions = function(interval, min, max, minor) {
      var axis = this,
          options = axis.options,
          axisLength = axis.len,
          lin2log = axis.lin2log,
          log2lin = axis.log2lin,
          positions = [];
      if (!minor) {
        axis._minorAutoInterval = null;
      }
      if (interval >= 0.5) {
        interval = mathRound(interval);
        positions = axis.getLinearTickPositions(interval, min, max);
      } else if (interval >= 0.08) {
        var roundedMin = mathFloor(min),
            intermediate,
            i,
            j,
            len,
            pos,
            lastPos,
            break2;
        if (interval > 0.3) {
          intermediate = [1, 2, 4];
        } else if (interval > 0.15) {
          intermediate = [1, 2, 4, 6, 8];
        } else {
          intermediate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
        for (i = roundedMin; i < max + 1 && !break2; i++) {
          len = intermediate.length;
          for (j = 0; j < len && !break2; j++) {
            pos = log2lin(lin2log(i) * intermediate[j]);
            if (pos > min && (!minor || lastPos <= max) && lastPos !== UNDEFINED) {
              positions.push(lastPos);
            }
            if (lastPos > max) {
              break2 = true;
            }
            lastPos = pos;
          }
        }
      } else {
        var realMin = lin2log(min),
            realMax = lin2log(max),
            tickIntervalOption = options[minor ? 'minorTickInterval' : 'tickInterval'],
            filteredTickIntervalOption = tickIntervalOption === 'auto' ? null : tickIntervalOption,
            tickPixelIntervalOption = options.tickPixelInterval / (minor ? 5 : 1),
            totalPixelLength = minor ? axisLength / axis.tickPositions.length : axisLength;
        interval = pick(filteredTickIntervalOption, axis._minorAutoInterval, (realMax - realMin) * tickPixelIntervalOption / (totalPixelLength || 1));
        interval = normalizeTickInterval(interval, null, getMagnitude(interval));
        positions = map(axis.getLinearTickPositions(interval, realMin, realMax), log2lin);
        if (!minor) {
          axis._minorAutoInterval = interval / 5;
        }
      }
      if (!minor) {
        axis.tickInterval = interval;
      }
      return positions;
    };
    Axis.prototype.log2lin = function(num) {
      return math.log(num) / math.LN10;
    };
    Axis.prototype.lin2log = function(num) {
      return math.pow(10, num);
    };
    var Tooltip = Highcharts.Tooltip = function() {
      this.init.apply(this, arguments);
    };
    Tooltip.prototype = {
      init: function(chart, options) {
        var borderWidth = options.borderWidth,
            style = options.style,
            padding = pInt(style.padding);
        this.chart = chart;
        this.options = options;
        this.crosshairs = [];
        this.now = {
          x: 0,
          y: 0
        };
        this.isHidden = true;
        this.label = chart.renderer.label('', 0, 0, options.shape || 'callout', null, null, options.useHTML, null, 'tooltip').attr({
          padding: padding,
          fill: options.backgroundColor,
          'stroke-width': borderWidth,
          r: options.borderRadius,
          zIndex: 8
        }).css(style).css({padding: 0}).add().attr({y: -9999});
        if (!useCanVG) {
          this.label.shadow(options.shadow);
        }
        this.shared = options.shared;
      },
      destroy: function() {
        if (this.label) {
          this.label = this.label.destroy();
        }
        clearTimeout(this.hideTimer);
        clearTimeout(this.tooltipTimeout);
      },
      move: function(x, y, anchorX, anchorY) {
        var tooltip = this,
            now = tooltip.now,
            animate = tooltip.options.animation !== false && !tooltip.isHidden && (mathAbs(x - now.x) > 1 || mathAbs(y - now.y) > 1),
            skipAnchor = tooltip.followPointer || tooltip.len > 1;
        extend(now, {
          x: animate ? (2 * now.x + x) / 3 : x,
          y: animate ? (now.y + y) / 2 : y,
          anchorX: skipAnchor ? UNDEFINED : animate ? (2 * now.anchorX + anchorX) / 3 : anchorX,
          anchorY: skipAnchor ? UNDEFINED : animate ? (now.anchorY + anchorY) / 2 : anchorY
        });
        tooltip.label.attr(now);
        if (animate) {
          clearTimeout(this.tooltipTimeout);
          this.tooltipTimeout = setTimeout(function() {
            if (tooltip) {
              tooltip.move(x, y, anchorX, anchorY);
            }
          }, 32);
        }
      },
      hide: function(delay) {
        var tooltip = this;
        clearTimeout(this.hideTimer);
        delay = pick(delay, this.options.hideDelay, 500);
        if (!this.isHidden) {
          this.hideTimer = syncTimeout(function() {
            tooltip.label[delay ? 'fadeOut' : 'hide']();
            tooltip.isHidden = true;
          }, delay);
        }
      },
      getAnchor: function(points, mouseEvent) {
        var ret,
            chart = this.chart,
            inverted = chart.inverted,
            plotTop = chart.plotTop,
            plotLeft = chart.plotLeft,
            plotX = 0,
            plotY = 0,
            yAxis,
            xAxis;
        points = splat(points);
        ret = points[0].tooltipPos;
        if (this.followPointer && mouseEvent) {
          if (mouseEvent.chartX === UNDEFINED) {
            mouseEvent = chart.pointer.normalize(mouseEvent);
          }
          ret = [mouseEvent.chartX - chart.plotLeft, mouseEvent.chartY - plotTop];
        }
        if (!ret) {
          each(points, function(point) {
            yAxis = point.series.yAxis;
            xAxis = point.series.xAxis;
            plotX += point.plotX + (!inverted && xAxis ? xAxis.left - plotLeft : 0);
            plotY += (point.plotLow ? (point.plotLow + point.plotHigh) / 2 : point.plotY) + (!inverted && yAxis ? yAxis.top - plotTop : 0);
          });
          plotX /= points.length;
          plotY /= points.length;
          ret = [inverted ? chart.plotWidth - plotY : plotX, this.shared && !inverted && points.length > 1 && mouseEvent ? mouseEvent.chartY - plotTop : inverted ? chart.plotHeight - plotX : plotY];
        }
        return map(ret, mathRound);
      },
      getPosition: function(boxWidth, boxHeight, point) {
        var chart = this.chart,
            distance = this.distance,
            ret = {},
            h = point.h || 0,
            swapped,
            first = ['y', chart.chartHeight, boxHeight, point.plotY + chart.plotTop, chart.plotTop, chart.plotTop + chart.plotHeight],
            second = ['x', chart.chartWidth, boxWidth, point.plotX + chart.plotLeft, chart.plotLeft, chart.plotLeft + chart.plotWidth],
            preferFarSide = !this.followPointer && pick(point.ttBelow, !chart.inverted === !!point.negative),
            firstDimension = function(dim, outerSize, innerSize, point, min, max) {
              var roomLeft = innerSize < point - distance,
                  roomRight = point + distance + innerSize < outerSize,
                  alignedLeft = point - distance - innerSize,
                  alignedRight = point + distance;
              if (preferFarSide && roomRight) {
                ret[dim] = alignedRight;
              } else if (!preferFarSide && roomLeft) {
                ret[dim] = alignedLeft;
              } else if (roomLeft) {
                ret[dim] = mathMin(max - innerSize, alignedLeft - h < 0 ? alignedLeft : alignedLeft - h);
              } else if (roomRight) {
                ret[dim] = mathMax(min, alignedRight + h + innerSize > outerSize ? alignedRight : alignedRight + h);
              } else {
                return false;
              }
            },
            secondDimension = function(dim, outerSize, innerSize, point) {
              var retVal;
              if (point < distance || point > outerSize - distance) {
                retVal = false;
              } else if (point < innerSize / 2) {
                ret[dim] = 1;
              } else if (point > outerSize - innerSize / 2) {
                ret[dim] = outerSize - innerSize - 2;
              } else {
                ret[dim] = point - innerSize / 2;
              }
              return retVal;
            },
            swap = function(count) {
              var temp = first;
              first = second;
              second = temp;
              swapped = count;
            },
            run = function() {
              if (firstDimension.apply(0, first) !== false) {
                if (secondDimension.apply(0, second) === false && !swapped) {
                  swap(true);
                  run();
                }
              } else if (!swapped) {
                swap(true);
                run();
              } else {
                ret.x = ret.y = 0;
              }
            };
        if (chart.inverted || this.len > 1) {
          swap();
        }
        run();
        return ret;
      },
      defaultFormatter: function(tooltip) {
        var items = this.points || splat(this),
            s;
        s = [tooltip.tooltipFooterHeaderFormatter(items[0])];
        s = s.concat(tooltip.bodyFormatter(items));
        s.push(tooltip.tooltipFooterHeaderFormatter(items[0], true));
        return s.join('');
      },
      refresh: function(point, mouseEvent) {
        var tooltip = this,
            chart = tooltip.chart,
            label = tooltip.label,
            options = tooltip.options,
            x,
            y,
            anchor,
            textConfig = {},
            text,
            pointConfig = [],
            formatter = options.formatter || tooltip.defaultFormatter,
            hoverPoints = chart.hoverPoints,
            borderColor,
            shared = tooltip.shared,
            currentSeries;
        clearTimeout(this.hideTimer);
        tooltip.followPointer = splat(point)[0].series.tooltipOptions.followPointer;
        anchor = tooltip.getAnchor(point, mouseEvent);
        x = anchor[0];
        y = anchor[1];
        if (shared && !(point.series && point.series.noSharedTooltip)) {
          chart.hoverPoints = point;
          if (hoverPoints) {
            each(hoverPoints, function(point) {
              point.setState();
            });
          }
          each(point, function(item) {
            item.setState(HOVER_STATE);
            pointConfig.push(item.getLabelConfig());
          });
          textConfig = {
            x: point[0].category,
            y: point[0].y
          };
          textConfig.points = pointConfig;
          this.len = pointConfig.length;
          point = point[0];
        } else {
          textConfig = point.getLabelConfig();
        }
        text = formatter.call(textConfig, tooltip);
        currentSeries = point.series;
        this.distance = pick(currentSeries.tooltipOptions.distance, 16);
        if (text === false) {
          this.hide();
        } else {
          if (tooltip.isHidden) {
            stop(label);
            label.attr('opacity', 1).show();
          }
          label.attr({text: text});
          borderColor = options.borderColor || point.color || currentSeries.color || '#606060';
          label.attr({stroke: borderColor});
          tooltip.updatePosition({
            plotX: x,
            plotY: y,
            negative: point.negative,
            ttBelow: point.ttBelow,
            h: anchor[2] || 0
          });
          this.isHidden = false;
        }
        fireEvent(chart, 'tooltipRefresh', {
          text: text,
          x: x + chart.plotLeft,
          y: y + chart.plotTop,
          borderColor: borderColor
        });
      },
      updatePosition: function(point) {
        var chart = this.chart,
            label = this.label,
            pos = (this.options.positioner || this.getPosition).call(this, label.width, label.height, point);
        this.move(mathRound(pos.x), mathRound(pos.y || 0), point.plotX + chart.plotLeft, point.plotY + chart.plotTop);
      },
      getXDateFormat: function(point, options, xAxis) {
        var xDateFormat,
            dateTimeLabelFormats = options.dateTimeLabelFormats,
            closestPointRange = xAxis && xAxis.closestPointRange,
            n,
            blank = '01-01 00:00:00.000',
            strpos = {
              millisecond: 15,
              second: 12,
              minute: 9,
              hour: 6,
              day: 3
            },
            date,
            lastN = 'millisecond';
        if (closestPointRange) {
          date = dateFormat('%m-%d %H:%M:%S.%L', point.x);
          for (n in timeUnits) {
            if (closestPointRange === timeUnits.week && +dateFormat('%w', point.x) === xAxis.options.startOfWeek && date.substr(6) === blank.substr(6)) {
              n = 'week';
              break;
            }
            if (timeUnits[n] > closestPointRange) {
              n = lastN;
              break;
            }
            if (strpos[n] && date.substr(strpos[n]) !== blank.substr(strpos[n])) {
              break;
            }
            if (n !== 'week') {
              lastN = n;
            }
          }
          if (n) {
            xDateFormat = dateTimeLabelFormats[n];
          }
        } else {
          xDateFormat = dateTimeLabelFormats.day;
        }
        return xDateFormat || dateTimeLabelFormats.year;
      },
      tooltipFooterHeaderFormatter: function(point, isFooter) {
        var footOrHead = isFooter ? 'footer' : 'header',
            series = point.series,
            tooltipOptions = series.tooltipOptions,
            xDateFormat = tooltipOptions.xDateFormat,
            xAxis = series.xAxis,
            isDateTime = xAxis && xAxis.options.type === 'datetime' && isNumber(point.key),
            formatString = tooltipOptions[footOrHead + 'Format'];
        if (isDateTime && !xDateFormat) {
          xDateFormat = this.getXDateFormat(point, tooltipOptions, xAxis);
        }
        if (isDateTime && xDateFormat) {
          formatString = formatString.replace('{point.key}', '{point.key:' + xDateFormat + '}');
        }
        return format(formatString, {
          point: point,
          series: series
        });
      },
      bodyFormatter: function(items) {
        return map(items, function(item) {
          var tooltipOptions = item.series.tooltipOptions;
          return (tooltipOptions.pointFormatter || item.point.tooltipFormatter).call(item.point, tooltipOptions.pointFormat);
        });
      }
    };
    var hoverChartIndex;
    hasTouch = doc && doc.documentElement.ontouchstart !== UNDEFINED;
    var Pointer = Highcharts.Pointer = function(chart, options) {
      this.init(chart, options);
    };
    Pointer.prototype = {
      init: function(chart, options) {
        var chartOptions = options.chart,
            chartEvents = chartOptions.events,
            zoomType = useCanVG ? '' : chartOptions.zoomType,
            inverted = chart.inverted,
            zoomX,
            zoomY;
        this.options = options;
        this.chart = chart;
        this.zoomX = zoomX = /x/.test(zoomType);
        this.zoomY = zoomY = /y/.test(zoomType);
        this.zoomHor = (zoomX && !inverted) || (zoomY && inverted);
        this.zoomVert = (zoomY && !inverted) || (zoomX && inverted);
        this.hasZoom = zoomX || zoomY;
        this.runChartClick = chartEvents && !!chartEvents.click;
        this.pinchDown = [];
        this.lastValidTouch = {};
        if (Highcharts.Tooltip && options.tooltip.enabled) {
          chart.tooltip = new Tooltip(chart, options.tooltip);
          this.followTouchMove = pick(options.tooltip.followTouchMove, true);
        }
        this.setDOMEvents();
      },
      normalize: function(e, chartPosition) {
        var chartX,
            chartY,
            ePos;
        e = e || win.event;
        if (!e.target) {
          e.target = e.srcElement;
        }
        ePos = e.touches ? (e.touches.length ? e.touches.item(0) : e.changedTouches[0]) : e;
        if (!chartPosition) {
          this.chartPosition = chartPosition = offset(this.chart.container);
        }
        if (ePos.pageX === UNDEFINED) {
          chartX = mathMax(e.x, e.clientX - chartPosition.left);
          chartY = e.y;
        } else {
          chartX = ePos.pageX - chartPosition.left;
          chartY = ePos.pageY - chartPosition.top;
        }
        return extend(e, {
          chartX: mathRound(chartX),
          chartY: mathRound(chartY)
        });
      },
      getCoordinates: function(e) {
        var coordinates = {
          xAxis: [],
          yAxis: []
        };
        each(this.chart.axes, function(axis) {
          coordinates[axis.isXAxis ? 'xAxis' : 'yAxis'].push({
            axis: axis,
            value: axis.toValue(e[axis.horiz ? 'chartX' : 'chartY'])
          });
        });
        return coordinates;
      },
      runPointActions: function(e) {
        var pointer = this,
            chart = pointer.chart,
            series = chart.series,
            tooltip = chart.tooltip,
            shared = tooltip ? tooltip.shared : false,
            followPointer,
            hoverPoint = chart.hoverPoint,
            hoverSeries = chart.hoverSeries,
            i,
            distance = [Number.MAX_VALUE, Number.MAX_VALUE],
            anchor,
            noSharedTooltip,
            stickToHoverSeries,
            directTouch,
            kdpoints = [],
            kdpoint = [],
            kdpointT;
        if (!shared && !hoverSeries) {
          for (i = 0; i < series.length; i++) {
            if (series[i].directTouch || !series[i].options.stickyTracking) {
              series = [];
            }
          }
        }
        stickToHoverSeries = hoverSeries && (shared ? hoverSeries.noSharedTooltip : hoverSeries.directTouch);
        if (stickToHoverSeries && hoverPoint) {
          kdpoint = [hoverPoint];
        } else {
          each(series, function(s) {
            noSharedTooltip = s.noSharedTooltip && shared;
            directTouch = !shared && s.directTouch;
            if (s.visible && !noSharedTooltip && !directTouch && pick(s.options.enableMouseTracking, true)) {
              kdpointT = s.searchPoint(e, !noSharedTooltip && s.kdDimensions === 1);
              if (kdpointT) {
                kdpoints.push(kdpointT);
              }
            }
          });
          each(kdpoints, function(p) {
            if (p) {
              each(['dist', 'distX'], function(dist, k) {
                if (isNumber(p[dist])) {
                  var isCloser = p[dist] < distance[k],
                      isAbove = p[dist] === distance[k] && p.series.group.zIndex >= kdpoint[k].series.group.zIndex;
                  if (isCloser || isAbove) {
                    distance[k] = p[dist];
                    kdpoint[k] = p;
                  }
                }
              });
            }
          });
        }
        if (shared) {
          i = kdpoints.length;
          while (i--) {
            if (kdpoints[i].clientX !== kdpoint[1].clientX || kdpoints[i].series.noSharedTooltip) {
              kdpoints.splice(i, 1);
            }
          }
        }
        if (kdpoint[0] && (kdpoint[0] !== this.prevKDPoint || (tooltip && tooltip.isHidden))) {
          if (shared && !kdpoint[0].series.noSharedTooltip) {
            if (kdpoints.length && tooltip) {
              tooltip.refresh(kdpoints, e);
            }
            each(kdpoints, function(point) {
              point.onMouseOver(e, point !== ((hoverSeries && hoverSeries.directTouch && hoverPoint) || kdpoint[0]));
            });
            this.prevKDPoint = kdpoint[1];
          } else {
            if (tooltip) {
              tooltip.refresh(kdpoint[0], e);
            }
            if (!hoverSeries || !hoverSeries.directTouch) {
              kdpoint[0].onMouseOver(e);
            }
            this.prevKDPoint = kdpoint[0];
          }
        } else {
          followPointer = hoverSeries && hoverSeries.tooltipOptions.followPointer;
          if (tooltip && followPointer && !tooltip.isHidden) {
            anchor = tooltip.getAnchor([{}], e);
            tooltip.updatePosition({
              plotX: anchor[0],
              plotY: anchor[1]
            });
          }
        }
        if (!pointer._onDocumentMouseMove) {
          pointer._onDocumentMouseMove = function(e) {
            if (charts[hoverChartIndex]) {
              charts[hoverChartIndex].pointer.onDocumentMouseMove(e);
            }
          };
          addEvent(doc, 'mousemove', pointer._onDocumentMouseMove);
        }
        each(shared ? kdpoints : [pick(hoverPoint, kdpoint[1])], function(point) {
          each(chart.axes, function(axis) {
            if (!point || point.series[axis.coll] === axis) {
              axis.drawCrosshair(e, point);
            }
          });
        });
      },
      reset: function(allowMove, delay) {
        var pointer = this,
            chart = pointer.chart,
            hoverSeries = chart.hoverSeries,
            hoverPoint = chart.hoverPoint,
            hoverPoints = chart.hoverPoints,
            tooltip = chart.tooltip,
            tooltipPoints = tooltip && tooltip.shared ? hoverPoints : hoverPoint;
        if (allowMove && tooltipPoints) {
          each(splat(tooltipPoints), function(point) {
            if (point.series.isCartesian && point.plotX === undefined) {
              allowMove = false;
            }
          });
        }
        if (allowMove) {
          if (tooltip && tooltipPoints) {
            tooltip.refresh(tooltipPoints);
            if (hoverPoint) {
              hoverPoint.setState(hoverPoint.state, true);
              each(chart.axes, function(axis) {
                if (pick(axis.crosshair && axis.crosshair.snap, true)) {
                  axis.drawCrosshair(null, hoverPoint);
                } else {
                  axis.hideCrosshair();
                }
              });
            }
          }
        } else {
          if (hoverPoint) {
            hoverPoint.onMouseOut();
          }
          if (hoverPoints) {
            each(hoverPoints, function(point) {
              point.setState();
            });
          }
          if (hoverSeries) {
            hoverSeries.onMouseOut();
          }
          if (tooltip) {
            tooltip.hide(delay);
          }
          if (pointer._onDocumentMouseMove) {
            removeEvent(doc, 'mousemove', pointer._onDocumentMouseMove);
            pointer._onDocumentMouseMove = null;
          }
          each(chart.axes, function(axis) {
            axis.hideCrosshair();
          });
          pointer.hoverX = chart.hoverPoints = chart.hoverPoint = null;
        }
      },
      scaleGroups: function(attribs, clip) {
        var chart = this.chart,
            seriesAttribs;
        each(chart.series, function(series) {
          seriesAttribs = attribs || series.getPlotBox();
          if (series.xAxis && series.xAxis.zoomEnabled) {
            series.group.attr(seriesAttribs);
            if (series.markerGroup) {
              series.markerGroup.attr(seriesAttribs);
              series.markerGroup.clip(clip ? chart.clipRect : null);
            }
            if (series.dataLabelsGroup) {
              series.dataLabelsGroup.attr(seriesAttribs);
            }
          }
        });
        chart.clipRect.attr(clip || chart.clipBox);
      },
      dragStart: function(e) {
        var chart = this.chart;
        chart.mouseIsDown = e.type;
        chart.cancelClick = false;
        chart.mouseDownX = this.mouseDownX = e.chartX;
        chart.mouseDownY = this.mouseDownY = e.chartY;
      },
      drag: function(e) {
        var chart = this.chart,
            chartOptions = chart.options.chart,
            chartX = e.chartX,
            chartY = e.chartY,
            zoomHor = this.zoomHor,
            zoomVert = this.zoomVert,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            plotWidth = chart.plotWidth,
            plotHeight = chart.plotHeight,
            clickedInside,
            size,
            selectionMarker = this.selectionMarker,
            mouseDownX = this.mouseDownX,
            mouseDownY = this.mouseDownY,
            panKey = chartOptions.panKey && e[chartOptions.panKey + 'Key'];
        if (selectionMarker && selectionMarker.touch) {
          return;
        }
        if (chartX < plotLeft) {
          chartX = plotLeft;
        } else if (chartX > plotLeft + plotWidth) {
          chartX = plotLeft + plotWidth;
        }
        if (chartY < plotTop) {
          chartY = plotTop;
        } else if (chartY > plotTop + plotHeight) {
          chartY = plotTop + plotHeight;
        }
        this.hasDragged = Math.sqrt(Math.pow(mouseDownX - chartX, 2) + Math.pow(mouseDownY - chartY, 2));
        if (this.hasDragged > 10) {
          clickedInside = chart.isInsidePlot(mouseDownX - plotLeft, mouseDownY - plotTop);
          if (chart.hasCartesianSeries && (this.zoomX || this.zoomY) && clickedInside && !panKey) {
            if (!selectionMarker) {
              this.selectionMarker = selectionMarker = chart.renderer.rect(plotLeft, plotTop, zoomHor ? 1 : plotWidth, zoomVert ? 1 : plotHeight, 0).attr({
                fill: chartOptions.selectionMarkerFill || 'rgba(69,114,167,0.25)',
                zIndex: 7
              }).add();
            }
          }
          if (selectionMarker && zoomHor) {
            size = chartX - mouseDownX;
            selectionMarker.attr({
              width: mathAbs(size),
              x: (size > 0 ? 0 : size) + mouseDownX
            });
          }
          if (selectionMarker && zoomVert) {
            size = chartY - mouseDownY;
            selectionMarker.attr({
              height: mathAbs(size),
              y: (size > 0 ? 0 : size) + mouseDownY
            });
          }
          if (clickedInside && !selectionMarker && chartOptions.panning) {
            chart.pan(e, chartOptions.panning);
          }
        }
      },
      drop: function(e) {
        var pointer = this,
            chart = this.chart,
            hasPinched = this.hasPinched;
        if (this.selectionMarker) {
          var selectionData = {
            originalEvent: e,
            xAxis: [],
            yAxis: []
          },
              selectionBox = this.selectionMarker,
              selectionLeft = selectionBox.attr ? selectionBox.attr('x') : selectionBox.x,
              selectionTop = selectionBox.attr ? selectionBox.attr('y') : selectionBox.y,
              selectionWidth = selectionBox.attr ? selectionBox.attr('width') : selectionBox.width,
              selectionHeight = selectionBox.attr ? selectionBox.attr('height') : selectionBox.height,
              runZoom;
          if (this.hasDragged || hasPinched) {
            each(chart.axes, function(axis) {
              if (axis.zoomEnabled && defined(axis.min) && (hasPinched || pointer[{
                xAxis: 'zoomX',
                yAxis: 'zoomY'
              }[axis.coll]])) {
                var horiz = axis.horiz,
                    minPixelPadding = e.type === 'touchend' ? axis.minPixelPadding : 0,
                    selectionMin = axis.toValue((horiz ? selectionLeft : selectionTop) + minPixelPadding),
                    selectionMax = axis.toValue((horiz ? selectionLeft + selectionWidth : selectionTop + selectionHeight) - minPixelPadding);
                selectionData[axis.coll].push({
                  axis: axis,
                  min: mathMin(selectionMin, selectionMax),
                  max: mathMax(selectionMin, selectionMax)
                });
                runZoom = true;
              }
            });
            if (runZoom) {
              fireEvent(chart, 'selection', selectionData, function(args) {
                chart.zoom(extend(args, hasPinched ? {animation: false} : null));
              });
            }
          }
          this.selectionMarker = this.selectionMarker.destroy();
          if (hasPinched) {
            this.scaleGroups();
          }
        }
        if (chart) {
          css(chart.container, {cursor: chart._cursor});
          chart.cancelClick = this.hasDragged > 10;
          chart.mouseIsDown = this.hasDragged = this.hasPinched = false;
          this.pinchDown = [];
        }
      },
      onContainerMouseDown: function(e) {
        e = this.normalize(e);
        if (e.preventDefault) {
          e.preventDefault();
        }
        this.dragStart(e);
      },
      onDocumentMouseUp: function(e) {
        if (charts[hoverChartIndex]) {
          charts[hoverChartIndex].pointer.drop(e);
        }
      },
      onDocumentMouseMove: function(e) {
        var chart = this.chart,
            chartPosition = this.chartPosition;
        e = this.normalize(e, chartPosition);
        if (chartPosition && !this.inClass(e.target, 'highcharts-tracker') && !chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
          this.reset();
        }
      },
      onContainerMouseLeave: function(e) {
        var chart = charts[hoverChartIndex];
        if (chart && (e.relatedTarget || e.toElement)) {
          chart.pointer.reset();
          chart.pointer.chartPosition = null;
        }
      },
      onContainerMouseMove: function(e) {
        var chart = this.chart;
        if (!defined(hoverChartIndex) || !charts[hoverChartIndex] || !charts[hoverChartIndex].mouseIsDown) {
          hoverChartIndex = chart.index;
        }
        e = this.normalize(e);
        e.returnValue = false;
        if (chart.mouseIsDown === 'mousedown') {
          this.drag(e);
        }
        if ((this.inClass(e.target, 'highcharts-tracker') || chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) && !chart.openMenu) {
          this.runPointActions(e);
        }
      },
      inClass: function(element, className) {
        var elemClassName;
        while (element) {
          elemClassName = attr(element, 'class');
          if (elemClassName) {
            if (elemClassName.indexOf(className) !== -1) {
              return true;
            }
            if (elemClassName.indexOf(PREFIX + 'container') !== -1) {
              return false;
            }
          }
          element = element.parentNode;
        }
      },
      onTrackerMouseOut: function(e) {
        var series = this.chart.hoverSeries,
            relatedTarget = e.relatedTarget || e.toElement;
        if (series && relatedTarget && !series.options.stickyTracking && !this.inClass(relatedTarget, PREFIX + 'tooltip') && !this.inClass(relatedTarget, PREFIX + 'series-' + series.index)) {
          series.onMouseOut();
        }
      },
      onContainerClick: function(e) {
        var chart = this.chart,
            hoverPoint = chart.hoverPoint,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop;
        e = this.normalize(e);
        if (!chart.cancelClick) {
          if (hoverPoint && this.inClass(e.target, PREFIX + 'tracker')) {
            fireEvent(hoverPoint.series, 'click', extend(e, {point: hoverPoint}));
            if (chart.hoverPoint) {
              hoverPoint.firePointEvent('click', e);
            }
          } else {
            extend(e, this.getCoordinates(e));
            if (chart.isInsidePlot(e.chartX - plotLeft, e.chartY - plotTop)) {
              fireEvent(chart, 'click', e);
            }
          }
        }
      },
      setDOMEvents: function() {
        var pointer = this,
            container = pointer.chart.container;
        container.onmousedown = function(e) {
          pointer.onContainerMouseDown(e);
        };
        container.onmousemove = function(e) {
          pointer.onContainerMouseMove(e);
        };
        container.onclick = function(e) {
          pointer.onContainerClick(e);
        };
        addEvent(container, 'mouseleave', pointer.onContainerMouseLeave);
        if (chartCount === 1) {
          addEvent(doc, 'mouseup', pointer.onDocumentMouseUp);
        }
        if (hasTouch) {
          container.ontouchstart = function(e) {
            pointer.onContainerTouchStart(e);
          };
          container.ontouchmove = function(e) {
            pointer.onContainerTouchMove(e);
          };
          if (chartCount === 1) {
            addEvent(doc, 'touchend', pointer.onDocumentTouchEnd);
          }
        }
      },
      destroy: function() {
        var prop;
        removeEvent(this.chart.container, 'mouseleave', this.onContainerMouseLeave);
        if (!chartCount) {
          removeEvent(doc, 'mouseup', this.onDocumentMouseUp);
          removeEvent(doc, 'touchend', this.onDocumentTouchEnd);
        }
        clearInterval(this.tooltipTimeout);
        for (prop in this) {
          this[prop] = null;
        }
      }
    };
    extend(Highcharts.Pointer.prototype, {
      pinchTranslate: function(pinchDown, touches, transform, selectionMarker, clip, lastValidTouch) {
        if (this.zoomHor || this.pinchHor) {
          this.pinchTranslateDirection(true, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch);
        }
        if (this.zoomVert || this.pinchVert) {
          this.pinchTranslateDirection(false, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch);
        }
      },
      pinchTranslateDirection: function(horiz, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch, forcedScale) {
        var chart = this.chart,
            xy = horiz ? 'x' : 'y',
            XY = horiz ? 'X' : 'Y',
            sChartXY = 'chart' + XY,
            wh = horiz ? 'width' : 'height',
            plotLeftTop = chart['plot' + (horiz ? 'Left' : 'Top')],
            selectionWH,
            selectionXY,
            clipXY,
            scale = forcedScale || 1,
            inverted = chart.inverted,
            bounds = chart.bounds[horiz ? 'h' : 'v'],
            singleTouch = pinchDown.length === 1,
            touch0Start = pinchDown[0][sChartXY],
            touch0Now = touches[0][sChartXY],
            touch1Start = !singleTouch && pinchDown[1][sChartXY],
            touch1Now = !singleTouch && touches[1][sChartXY],
            outOfBounds,
            transformScale,
            scaleKey,
            setScale = function() {
              if (!singleTouch && mathAbs(touch0Start - touch1Start) > 20) {
                scale = forcedScale || mathAbs(touch0Now - touch1Now) / mathAbs(touch0Start - touch1Start);
              }
              clipXY = ((plotLeftTop - touch0Now) / scale) + touch0Start;
              selectionWH = chart['plot' + (horiz ? 'Width' : 'Height')] / scale;
            };
        setScale();
        selectionXY = clipXY;
        if (selectionXY < bounds.min) {
          selectionXY = bounds.min;
          outOfBounds = true;
        } else if (selectionXY + selectionWH > bounds.max) {
          selectionXY = bounds.max - selectionWH;
          outOfBounds = true;
        }
        if (outOfBounds) {
          touch0Now -= 0.8 * (touch0Now - lastValidTouch[xy][0]);
          if (!singleTouch) {
            touch1Now -= 0.8 * (touch1Now - lastValidTouch[xy][1]);
          }
          setScale();
        } else {
          lastValidTouch[xy] = [touch0Now, touch1Now];
        }
        if (!inverted) {
          clip[xy] = clipXY - plotLeftTop;
          clip[wh] = selectionWH;
        }
        scaleKey = inverted ? (horiz ? 'scaleY' : 'scaleX') : 'scale' + XY;
        transformScale = inverted ? 1 / scale : scale;
        selectionMarker[wh] = selectionWH;
        selectionMarker[xy] = selectionXY;
        transform[scaleKey] = scale;
        transform['translate' + XY] = (transformScale * plotLeftTop) + (touch0Now - (transformScale * touch0Start));
      },
      pinch: function(e) {
        var self = this,
            chart = self.chart,
            pinchDown = self.pinchDown,
            touches = e.touches,
            touchesLength = touches.length,
            lastValidTouch = self.lastValidTouch,
            hasZoom = self.hasZoom,
            selectionMarker = self.selectionMarker,
            transform = {},
            fireClickEvent = touchesLength === 1 && ((self.inClass(e.target, PREFIX + 'tracker') && chart.runTrackerClick) || self.runChartClick),
            clip = {};
        if (touchesLength > 1) {
          self.initiated = true;
        }
        if (hasZoom && self.initiated && !fireClickEvent) {
          e.preventDefault();
        }
        map(touches, function(e) {
          return self.normalize(e);
        });
        if (e.type === 'touchstart') {
          each(touches, function(e, i) {
            pinchDown[i] = {
              chartX: e.chartX,
              chartY: e.chartY
            };
          });
          lastValidTouch.x = [pinchDown[0].chartX, pinchDown[1] && pinchDown[1].chartX];
          lastValidTouch.y = [pinchDown[0].chartY, pinchDown[1] && pinchDown[1].chartY];
          each(chart.axes, function(axis) {
            if (axis.zoomEnabled) {
              var bounds = chart.bounds[axis.horiz ? 'h' : 'v'],
                  minPixelPadding = axis.minPixelPadding,
                  min = axis.toPixels(pick(axis.options.min, axis.dataMin)),
                  max = axis.toPixels(pick(axis.options.max, axis.dataMax)),
                  absMin = mathMin(min, max),
                  absMax = mathMax(min, max);
              bounds.min = mathMin(axis.pos, absMin - minPixelPadding);
              bounds.max = mathMax(axis.pos + axis.len, absMax + minPixelPadding);
            }
          });
          self.res = true;
        } else if (pinchDown.length) {
          if (!selectionMarker) {
            self.selectionMarker = selectionMarker = extend({
              destroy: noop,
              touch: true
            }, chart.plotBox);
          }
          self.pinchTranslate(pinchDown, touches, transform, selectionMarker, clip, lastValidTouch);
          self.hasPinched = hasZoom;
          self.scaleGroups(transform, clip);
          if (!hasZoom && self.followTouchMove && touchesLength === 1) {
            this.runPointActions(self.normalize(e));
          } else if (self.res) {
            self.res = false;
            this.reset(false, 0);
          }
        }
      },
      touch: function(e, start) {
        var chart = this.chart,
            hasMoved,
            pinchDown;
        hoverChartIndex = chart.index;
        if (e.touches.length === 1) {
          e = this.normalize(e);
          if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop) && !chart.openMenu) {
            if (start) {
              this.runPointActions(e);
            }
            if (e.type === 'touchmove') {
              pinchDown = this.pinchDown;
              hasMoved = pinchDown[0] ? Math.sqrt(Math.pow(pinchDown[0].chartX - e.chartX, 2) + Math.pow(pinchDown[0].chartY - e.chartY, 2)) >= 4 : false;
            }
            if (pick(hasMoved, true)) {
              this.pinch(e);
            }
          } else if (start) {
            this.reset();
          }
        } else if (e.touches.length === 2) {
          this.pinch(e);
        }
      },
      onContainerTouchStart: function(e) {
        this.touch(e, true);
      },
      onContainerTouchMove: function(e) {
        this.touch(e);
      },
      onDocumentTouchEnd: function(e) {
        if (charts[hoverChartIndex]) {
          charts[hoverChartIndex].pointer.drop(e);
        }
      }
    });
    if (win.PointerEvent || win.MSPointerEvent) {
      var touches = {},
          hasPointerEvent = !!win.PointerEvent,
          getWebkitTouches = function() {
            var key,
                fake = [];
            fake.item = function(i) {
              return this[i];
            };
            for (key in touches) {
              if (touches.hasOwnProperty(key)) {
                fake.push({
                  pageX: touches[key].pageX,
                  pageY: touches[key].pageY,
                  target: touches[key].target
                });
              }
            }
            return fake;
          },
          translateMSPointer = function(e, method, wktype, func) {
            var p;
            if ((e.pointerType === 'touch' || e.pointerType === e.MSPOINTER_TYPE_TOUCH) && charts[hoverChartIndex]) {
              func(e);
              p = charts[hoverChartIndex].pointer;
              p[method]({
                type: wktype,
                target: e.currentTarget,
                preventDefault: noop,
                touches: getWebkitTouches()
              });
            }
          };
      extend(Pointer.prototype, {
        onContainerPointerDown: function(e) {
          translateMSPointer(e, 'onContainerTouchStart', 'touchstart', function(e) {
            touches[e.pointerId] = {
              pageX: e.pageX,
              pageY: e.pageY,
              target: e.currentTarget
            };
          });
        },
        onContainerPointerMove: function(e) {
          translateMSPointer(e, 'onContainerTouchMove', 'touchmove', function(e) {
            touches[e.pointerId] = {
              pageX: e.pageX,
              pageY: e.pageY
            };
            if (!touches[e.pointerId].target) {
              touches[e.pointerId].target = e.currentTarget;
            }
          });
        },
        onDocumentPointerUp: function(e) {
          translateMSPointer(e, 'onDocumentTouchEnd', 'touchend', function(e) {
            delete touches[e.pointerId];
          });
        },
        batchMSEvents: function(fn) {
          fn(this.chart.container, hasPointerEvent ? 'pointerdown' : 'MSPointerDown', this.onContainerPointerDown);
          fn(this.chart.container, hasPointerEvent ? 'pointermove' : 'MSPointerMove', this.onContainerPointerMove);
          fn(doc, hasPointerEvent ? 'pointerup' : 'MSPointerUp', this.onDocumentPointerUp);
        }
      });
      wrap(Pointer.prototype, 'init', function(proceed, chart, options) {
        proceed.call(this, chart, options);
        if (this.hasZoom) {
          css(chart.container, {
            '-ms-touch-action': NONE,
            'touch-action': NONE
          });
        }
      });
      wrap(Pointer.prototype, 'setDOMEvents', function(proceed) {
        proceed.apply(this);
        if (this.hasZoom || this.followTouchMove) {
          this.batchMSEvents(addEvent);
        }
      });
      wrap(Pointer.prototype, 'destroy', function(proceed) {
        this.batchMSEvents(removeEvent);
        proceed.call(this);
      });
    }
    var Legend = Highcharts.Legend = function(chart, options) {
      this.init(chart, options);
    };
    Legend.prototype = {
      init: function(chart, options) {
        var legend = this,
            itemStyle = options.itemStyle,
            padding,
            itemMarginTop = options.itemMarginTop || 0;
        this.options = options;
        if (!options.enabled) {
          return;
        }
        legend.itemStyle = itemStyle;
        legend.itemHiddenStyle = merge(itemStyle, options.itemHiddenStyle);
        legend.itemMarginTop = itemMarginTop;
        legend.padding = padding = pick(options.padding, 8);
        legend.initialItemX = padding;
        legend.initialItemY = padding - 5;
        legend.maxItemWidth = 0;
        legend.chart = chart;
        legend.itemHeight = 0;
        legend.symbolWidth = pick(options.symbolWidth, 16);
        legend.pages = [];
        legend.render();
        addEvent(legend.chart, 'endResize', function() {
          legend.positionCheckboxes();
        });
      },
      colorizeItem: function(item, visible) {
        var legend = this,
            options = legend.options,
            legendItem = item.legendItem,
            legendLine = item.legendLine,
            legendSymbol = item.legendSymbol,
            hiddenColor = legend.itemHiddenStyle.color,
            textColor = visible ? options.itemStyle.color : hiddenColor,
            symbolColor = visible ? (item.legendColor || item.color || '#CCC') : hiddenColor,
            markerOptions = item.options && item.options.marker,
            symbolAttr = {fill: symbolColor},
            key,
            val;
        if (legendItem) {
          legendItem.css({
            fill: textColor,
            color: textColor
          });
        }
        if (legendLine) {
          legendLine.attr({stroke: symbolColor});
        }
        if (legendSymbol) {
          if (markerOptions && legendSymbol.isMarker) {
            symbolAttr.stroke = symbolColor;
            markerOptions = item.convertAttribs(markerOptions);
            for (key in markerOptions) {
              val = markerOptions[key];
              if (val !== UNDEFINED) {
                symbolAttr[key] = val;
              }
            }
          }
          legendSymbol.attr(symbolAttr);
        }
      },
      positionItem: function(item) {
        var legend = this,
            options = legend.options,
            symbolPadding = options.symbolPadding,
            ltr = !options.rtl,
            legendItemPos = item._legendItemPos,
            itemX = legendItemPos[0],
            itemY = legendItemPos[1],
            checkbox = item.checkbox,
            legendGroup = item.legendGroup;
        if (legendGroup && legendGroup.element) {
          legendGroup.translate(ltr ? itemX : legend.legendWidth - itemX - 2 * symbolPadding - 4, itemY);
        }
        if (checkbox) {
          checkbox.x = itemX;
          checkbox.y = itemY;
        }
      },
      destroyItem: function(item) {
        var checkbox = item.checkbox;
        each(['legendItem', 'legendLine', 'legendSymbol', 'legendGroup'], function(key) {
          if (item[key]) {
            item[key] = item[key].destroy();
          }
        });
        if (checkbox) {
          discardElement(item.checkbox);
        }
      },
      destroy: function() {
        var legend = this,
            legendGroup = legend.group,
            box = legend.box;
        if (box) {
          legend.box = box.destroy();
        }
        if (legendGroup) {
          legend.group = legendGroup.destroy();
        }
      },
      positionCheckboxes: function(scrollOffset) {
        var alignAttr = this.group.alignAttr,
            translateY,
            clipHeight = this.clipHeight || this.legendHeight,
            titleHeight = this.titleHeight;
        if (alignAttr) {
          translateY = alignAttr.translateY;
          each(this.allItems, function(item) {
            var checkbox = item.checkbox,
                top;
            if (checkbox) {
              top = translateY + titleHeight + checkbox.y + (scrollOffset || 0) + 3;
              css(checkbox, {
                left: (alignAttr.translateX + item.checkboxOffset + checkbox.x - 20) + PX,
                top: top + PX,
                display: top > translateY - 6 && top < translateY + clipHeight - 6 ? '' : NONE
              });
            }
          });
        }
      },
      renderTitle: function() {
        var options = this.options,
            padding = this.padding,
            titleOptions = options.title,
            titleHeight = 0,
            bBox;
        if (titleOptions.text) {
          if (!this.title) {
            this.title = this.chart.renderer.label(titleOptions.text, padding - 3, padding - 4, null, null, null, null, null, 'legend-title').attr({zIndex: 1}).css(titleOptions.style).add(this.group);
          }
          bBox = this.title.getBBox();
          titleHeight = bBox.height;
          this.offsetWidth = bBox.width;
          this.contentGroup.attr({translateY: titleHeight});
        }
        this.titleHeight = titleHeight;
      },
      setText: function(item) {
        var options = this.options;
        item.legendItem.attr({text: options.labelFormat ? format(options.labelFormat, item) : options.labelFormatter.call(item)});
      },
      renderItem: function(item) {
        var legend = this,
            chart = legend.chart,
            renderer = chart.renderer,
            options = legend.options,
            horizontal = options.layout === 'horizontal',
            symbolWidth = legend.symbolWidth,
            symbolPadding = options.symbolPadding,
            itemStyle = legend.itemStyle,
            itemHiddenStyle = legend.itemHiddenStyle,
            padding = legend.padding,
            itemDistance = horizontal ? pick(options.itemDistance, 20) : 0,
            ltr = !options.rtl,
            itemHeight,
            widthOption = options.width,
            itemMarginBottom = options.itemMarginBottom || 0,
            itemMarginTop = legend.itemMarginTop,
            initialItemX = legend.initialItemX,
            bBox,
            itemWidth,
            li = item.legendItem,
            series = item.series && item.series.drawLegendSymbol ? item.series : item,
            seriesOptions = series.options,
            showCheckbox = legend.createCheckboxForItem && seriesOptions && seriesOptions.showCheckbox,
            useHTML = options.useHTML;
        if (!li) {
          item.legendGroup = renderer.g('legend-item').attr({zIndex: 1}).add(legend.scrollGroup);
          item.legendItem = li = renderer.text('', ltr ? symbolWidth + symbolPadding : -symbolPadding, legend.baseline || 0, useHTML).css(merge(item.visible ? itemStyle : itemHiddenStyle)).attr({
            align: ltr ? 'left' : 'right',
            zIndex: 2
          }).add(item.legendGroup);
          if (!legend.baseline) {
            legend.fontMetrics = renderer.fontMetrics(itemStyle.fontSize, li);
            legend.baseline = legend.fontMetrics.f + 3 + itemMarginTop;
            li.attr('y', legend.baseline);
          }
          series.drawLegendSymbol(legend, item);
          if (legend.setItemEvents) {
            legend.setItemEvents(item, li, useHTML, itemStyle, itemHiddenStyle);
          }
          if (showCheckbox) {
            legend.createCheckboxForItem(item);
          }
        }
        legend.colorizeItem(item, item.visible);
        legend.setText(item);
        bBox = li.getBBox();
        itemWidth = item.checkboxOffset = options.itemWidth || item.legendItemWidth || symbolWidth + symbolPadding + bBox.width + itemDistance + (showCheckbox ? 20 : 0);
        legend.itemHeight = itemHeight = mathRound(item.legendItemHeight || bBox.height);
        if (horizontal && legend.itemX - initialItemX + itemWidth > (widthOption || (chart.chartWidth - 2 * padding - initialItemX - options.x))) {
          legend.itemX = initialItemX;
          legend.itemY += itemMarginTop + legend.lastLineHeight + itemMarginBottom;
          legend.lastLineHeight = 0;
        }
        legend.maxItemWidth = mathMax(legend.maxItemWidth, itemWidth);
        legend.lastItemY = itemMarginTop + legend.itemY + itemMarginBottom;
        legend.lastLineHeight = mathMax(itemHeight, legend.lastLineHeight);
        item._legendItemPos = [legend.itemX, legend.itemY];
        if (horizontal) {
          legend.itemX += itemWidth;
        } else {
          legend.itemY += itemMarginTop + itemHeight + itemMarginBottom;
          legend.lastLineHeight = itemHeight;
        }
        legend.offsetWidth = widthOption || mathMax((horizontal ? legend.itemX - initialItemX - itemDistance : itemWidth) + padding, legend.offsetWidth);
      },
      getAllItems: function() {
        var allItems = [];
        each(this.chart.series, function(series) {
          var seriesOptions = series.options;
          if (!pick(seriesOptions.showInLegend, !defined(seriesOptions.linkedTo) ? UNDEFINED : false, true)) {
            return;
          }
          allItems = allItems.concat(series.legendItems || (seriesOptions.legendType === 'point' ? series.data : series));
        });
        return allItems;
      },
      adjustMargins: function(margin, spacing) {
        var chart = this.chart,
            options = this.options,
            alignment = options.align.charAt(0) + options.verticalAlign.charAt(0) + options.layout.charAt(0);
        if (this.display && !options.floating) {
          each([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(alignments, side) {
            if (alignments.test(alignment) && !defined(margin[side])) {
              chart[marginNames[side]] = mathMax(chart[marginNames[side]], chart.legend[(side + 1) % 2 ? 'legendHeight' : 'legendWidth'] + [1, -1, -1, 1][side] * options[(side % 2) ? 'x' : 'y'] + pick(options.margin, 12) + spacing[side]);
            }
          });
        }
      },
      render: function() {
        var legend = this,
            chart = legend.chart,
            renderer = chart.renderer,
            legendGroup = legend.group,
            allItems,
            display,
            legendWidth,
            legendHeight,
            box = legend.box,
            options = legend.options,
            padding = legend.padding,
            legendBorderWidth = options.borderWidth,
            legendBackgroundColor = options.backgroundColor;
        legend.itemX = legend.initialItemX;
        legend.itemY = legend.initialItemY;
        legend.offsetWidth = 0;
        legend.lastItemY = 0;
        if (!legendGroup) {
          legend.group = legendGroup = renderer.g('legend').attr({zIndex: 7}).add();
          legend.contentGroup = renderer.g().attr({zIndex: 1}).add(legendGroup);
          legend.scrollGroup = renderer.g().add(legend.contentGroup);
        }
        legend.renderTitle();
        allItems = legend.getAllItems();
        stableSort(allItems, function(a, b) {
          return ((a.options && a.options.legendIndex) || 0) - ((b.options && b.options.legendIndex) || 0);
        });
        if (options.reversed) {
          allItems.reverse();
        }
        legend.allItems = allItems;
        legend.display = display = !!allItems.length;
        legend.lastLineHeight = 0;
        each(allItems, function(item) {
          legend.renderItem(item);
        });
        legendWidth = (options.width || legend.offsetWidth) + padding;
        legendHeight = legend.lastItemY + legend.lastLineHeight + legend.titleHeight;
        legendHeight = legend.handleOverflow(legendHeight);
        legendHeight += padding;
        if (legendBorderWidth || legendBackgroundColor) {
          if (!box) {
            legend.box = box = renderer.rect(0, 0, legendWidth, legendHeight, options.borderRadius, legendBorderWidth || 0).attr({
              stroke: options.borderColor,
              'stroke-width': legendBorderWidth || 0,
              fill: legendBackgroundColor || NONE
            }).add(legendGroup).shadow(options.shadow);
            box.isNew = true;
          } else if (legendWidth > 0 && legendHeight > 0) {
            box[box.isNew ? 'attr' : 'animate'](box.crisp({
              width: legendWidth,
              height: legendHeight
            }));
            box.isNew = false;
          }
          box[display ? 'show' : 'hide']();
        }
        legend.legendWidth = legendWidth;
        legend.legendHeight = legendHeight;
        each(allItems, function(item) {
          legend.positionItem(item);
        });
        if (display) {
          legendGroup.align(extend({
            width: legendWidth,
            height: legendHeight
          }, options), true, 'spacingBox');
        }
        if (!chart.isResizing) {
          this.positionCheckboxes();
        }
      },
      handleOverflow: function(legendHeight) {
        var legend = this,
            chart = this.chart,
            renderer = chart.renderer,
            options = this.options,
            optionsY = options.y,
            alignTop = options.verticalAlign === 'top',
            spaceHeight = chart.spacingBox.height + (alignTop ? -optionsY : optionsY) - this.padding,
            maxHeight = options.maxHeight,
            clipHeight,
            clipRect = this.clipRect,
            navOptions = options.navigation,
            animation = pick(navOptions.animation, true),
            arrowSize = navOptions.arrowSize || 12,
            nav = this.nav,
            pages = this.pages,
            padding = this.padding,
            lastY,
            allItems = this.allItems,
            clipToHeight = function(height) {
              clipRect.attr({height: height});
              if (legend.contentGroup.div) {
                legend.contentGroup.div.style.clip = 'rect(' + padding + 'px,9999px,' + (padding + height) + 'px,0)';
              }
            };
        if (options.layout === 'horizontal') {
          spaceHeight /= 2;
        }
        if (maxHeight) {
          spaceHeight = mathMin(spaceHeight, maxHeight);
        }
        pages.length = 0;
        if (legendHeight > spaceHeight && navOptions.enabled !== false) {
          this.clipHeight = clipHeight = mathMax(spaceHeight - 20 - this.titleHeight - padding, 0);
          this.currentPage = pick(this.currentPage, 1);
          this.fullHeight = legendHeight;
          each(allItems, function(item, i) {
            var y = item._legendItemPos[1],
                h = mathRound(item.legendItem.getBBox().height),
                len = pages.length;
            if (!len || (y - pages[len - 1] > clipHeight && (lastY || y) !== pages[len - 1])) {
              pages.push(lastY || y);
              len++;
            }
            if (i === allItems.length - 1 && y + h - pages[len - 1] > clipHeight) {
              pages.push(y);
            }
            if (y !== lastY) {
              lastY = y;
            }
          });
          if (!clipRect) {
            clipRect = legend.clipRect = renderer.clipRect(0, padding, 9999, 0);
            legend.contentGroup.clip(clipRect);
          }
          clipToHeight(clipHeight);
          if (!nav) {
            this.nav = nav = renderer.g().attr({zIndex: 1}).add(this.group);
            this.up = renderer.symbol('triangle', 0, 0, arrowSize, arrowSize).on('click', function() {
              legend.scroll(-1, animation);
            }).add(nav);
            this.pager = renderer.text('', 15, 10).css(navOptions.style).add(nav);
            this.down = renderer.symbol('triangle-down', 0, 0, arrowSize, arrowSize).on('click', function() {
              legend.scroll(1, animation);
            }).add(nav);
          }
          legend.scroll(0);
          legendHeight = spaceHeight;
        } else if (nav) {
          clipToHeight(chart.chartHeight);
          nav.hide();
          this.scrollGroup.attr({translateY: 1});
          this.clipHeight = 0;
        }
        return legendHeight;
      },
      scroll: function(scrollBy, animation) {
        var pages = this.pages,
            pageCount = pages.length,
            currentPage = this.currentPage + scrollBy,
            clipHeight = this.clipHeight,
            navOptions = this.options.navigation,
            activeColor = navOptions.activeColor,
            inactiveColor = navOptions.inactiveColor,
            pager = this.pager,
            padding = this.padding,
            scrollOffset;
        if (currentPage > pageCount) {
          currentPage = pageCount;
        }
        if (currentPage > 0) {
          if (animation !== UNDEFINED) {
            setAnimation(animation, this.chart);
          }
          this.nav.attr({
            translateX: padding,
            translateY: clipHeight + this.padding + 7 + this.titleHeight,
            visibility: VISIBLE
          });
          this.up.attr({fill: currentPage === 1 ? inactiveColor : activeColor}).css({cursor: currentPage === 1 ? 'default' : 'pointer'});
          pager.attr({text: currentPage + '/' + pageCount});
          this.down.attr({
            x: 18 + this.pager.getBBox().width,
            fill: currentPage === pageCount ? inactiveColor : activeColor
          }).css({cursor: currentPage === pageCount ? 'default' : 'pointer'});
          scrollOffset = -pages[currentPage - 1] + this.initialItemY;
          this.scrollGroup.animate({translateY: scrollOffset});
          this.currentPage = currentPage;
          this.positionCheckboxes(scrollOffset);
        }
      }
    };
    var LegendSymbolMixin = Highcharts.LegendSymbolMixin = {
      drawRectangle: function(legend, item) {
        var symbolHeight = legend.options.symbolHeight || legend.fontMetrics.f;
        item.legendSymbol = this.chart.renderer.rect(0, legend.baseline - symbolHeight + 1, legend.symbolWidth, symbolHeight, legend.options.symbolRadius || 0).attr({zIndex: 3}).add(item.legendGroup);
      },
      drawLineMarker: function(legend) {
        var options = this.options,
            markerOptions = options.marker,
            radius,
            legendSymbol,
            symbolWidth = legend.symbolWidth,
            renderer = this.chart.renderer,
            legendItemGroup = this.legendGroup,
            verticalCenter = legend.baseline - mathRound(legend.fontMetrics.b * 0.3),
            attr;
        if (options.lineWidth) {
          attr = {'stroke-width': options.lineWidth};
          if (options.dashStyle) {
            attr.dashstyle = options.dashStyle;
          }
          this.legendLine = renderer.path([M, 0, verticalCenter, L, symbolWidth, verticalCenter]).attr(attr).add(legendItemGroup);
        }
        if (markerOptions && markerOptions.enabled !== false) {
          radius = markerOptions.radius;
          this.legendSymbol = legendSymbol = renderer.symbol(this.symbol, (symbolWidth / 2) - radius, verticalCenter - radius, 2 * radius, 2 * radius, markerOptions).add(legendItemGroup);
          legendSymbol.isMarker = true;
        }
      }
    };
    if (/Trident\/7\.0/.test(userAgent) || isFirefox) {
      wrap(Legend.prototype, 'positionItem', function(proceed, item) {
        var legend = this,
            runPositionItem = function() {
              if (item._legendItemPos) {
                proceed.call(legend, item);
              }
            };
        runPositionItem();
        setTimeout(runPositionItem);
      });
    }
    var Chart = Highcharts.Chart = function() {
      this.getArgs.apply(this, arguments);
    };
    Highcharts.chart = function(a, b, c) {
      return new Chart(a, b, c);
    };
    Chart.prototype = {
      callbacks: [],
      getArgs: function() {
        var args = [].slice.call(arguments);
        if (isString(args[0]) || args[0].nodeName) {
          this.renderTo = args.shift();
        }
        this.init(args[0], args[1]);
      },
      init: function(userOptions, callback) {
        var options,
            seriesOptions = userOptions.series;
        userOptions.series = null;
        options = merge(defaultOptions, userOptions);
        options.series = userOptions.series = seriesOptions;
        this.userOptions = userOptions;
        var optionsChart = options.chart;
        this.margin = this.splashArray('margin', optionsChart);
        this.spacing = this.splashArray('spacing', optionsChart);
        var chartEvents = optionsChart.events;
        this.bounds = {
          h: {},
          v: {}
        };
        this.callback = callback;
        this.isResizing = 0;
        this.options = options;
        this.axes = [];
        this.series = [];
        this.hasCartesianSeries = optionsChart.showAxes;
        var chart = this,
            eventType;
        chart.index = charts.length;
        charts.push(chart);
        chartCount++;
        if (optionsChart.reflow !== false) {
          addEvent(chart, 'load', function() {
            chart.initReflow();
          });
        }
        if (chartEvents) {
          for (eventType in chartEvents) {
            addEvent(chart, eventType, chartEvents[eventType]);
          }
        }
        chart.xAxis = [];
        chart.yAxis = [];
        chart.animation = useCanVG ? false : pick(optionsChart.animation, true);
        chart.pointCount = chart.colorCounter = chart.symbolCounter = 0;
        chart.firstRender();
      },
      initSeries: function(options) {
        var chart = this,
            optionsChart = chart.options.chart,
            type = options.type || optionsChart.type || optionsChart.defaultSeriesType,
            series,
            constr = seriesTypes[type];
        if (!constr) {
          error(17, true);
        }
        series = new constr();
        series.init(this, options);
        return series;
      },
      isInsidePlot: function(plotX, plotY, inverted) {
        var x = inverted ? plotY : plotX,
            y = inverted ? plotX : plotY;
        return x >= 0 && x <= this.plotWidth && y >= 0 && y <= this.plotHeight;
      },
      redraw: function(animation) {
        var chart = this,
            axes = chart.axes,
            series = chart.series,
            pointer = chart.pointer,
            legend = chart.legend,
            redrawLegend = chart.isDirtyLegend,
            hasStackedSeries,
            hasDirtyStacks,
            hasCartesianSeries = chart.hasCartesianSeries,
            isDirtyBox = chart.isDirtyBox,
            seriesLength = series.length,
            i = seriesLength,
            serie,
            renderer = chart.renderer,
            isHiddenChart = renderer.isHidden(),
            afterRedraw = [];
        setAnimation(animation, chart);
        if (isHiddenChart) {
          chart.cloneRenderTo();
        }
        chart.layOutTitles();
        while (i--) {
          serie = series[i];
          if (serie.options.stacking) {
            hasStackedSeries = true;
            if (serie.isDirty) {
              hasDirtyStacks = true;
              break;
            }
          }
        }
        if (hasDirtyStacks) {
          i = seriesLength;
          while (i--) {
            serie = series[i];
            if (serie.options.stacking) {
              serie.isDirty = true;
            }
          }
        }
        each(series, function(serie) {
          if (serie.isDirty) {
            if (serie.options.legendType === 'point') {
              if (serie.updateTotals) {
                serie.updateTotals();
              }
              redrawLegend = true;
            }
          }
          if (serie.isDirtyData) {
            fireEvent(serie, 'updatedData');
          }
        });
        if (redrawLegend && legend.options.enabled) {
          legend.render();
          chart.isDirtyLegend = false;
        }
        if (hasStackedSeries) {
          chart.getStacks();
        }
        if (hasCartesianSeries) {
          if (!chart.isResizing) {
            chart.maxTicks = null;
            each(axes, function(axis) {
              axis.setScale();
            });
          }
        }
        chart.getMargins();
        if (hasCartesianSeries) {
          each(axes, function(axis) {
            if (axis.isDirty) {
              isDirtyBox = true;
            }
          });
          each(axes, function(axis) {
            var key = axis.min + ',' + axis.max;
            if (axis.extKey !== key) {
              axis.extKey = key;
              afterRedraw.push(function() {
                fireEvent(axis, 'afterSetExtremes', extend(axis.eventArgs, axis.getExtremes()));
                delete axis.eventArgs;
              });
            }
            if (isDirtyBox || hasStackedSeries) {
              axis.redraw();
            }
          });
        }
        if (isDirtyBox) {
          chart.drawChartBox();
        }
        each(series, function(serie) {
          if (serie.isDirty && serie.visible && (!serie.isCartesian || serie.xAxis)) {
            serie.redraw();
          }
        });
        if (pointer) {
          pointer.reset(true);
        }
        renderer.draw();
        fireEvent(chart, 'redraw');
        if (isHiddenChart) {
          chart.cloneRenderTo(true);
        }
        each(afterRedraw, function(callback) {
          callback.call();
        });
      },
      get: function(id) {
        var chart = this,
            axes = chart.axes,
            series = chart.series;
        var i,
            j,
            points;
        for (i = 0; i < axes.length; i++) {
          if (axes[i].options.id === id) {
            return axes[i];
          }
        }
        for (i = 0; i < series.length; i++) {
          if (series[i].options.id === id) {
            return series[i];
          }
        }
        for (i = 0; i < series.length; i++) {
          points = series[i].points || [];
          for (j = 0; j < points.length; j++) {
            if (points[j].id === id) {
              return points[j];
            }
          }
        }
        return null;
      },
      getAxes: function() {
        var chart = this,
            options = this.options,
            xAxisOptions = options.xAxis = splat(options.xAxis || {}),
            yAxisOptions = options.yAxis = splat(options.yAxis || {}),
            optionsArray;
        each(xAxisOptions, function(axis, i) {
          axis.index = i;
          axis.isX = true;
        });
        each(yAxisOptions, function(axis, i) {
          axis.index = i;
        });
        optionsArray = xAxisOptions.concat(yAxisOptions);
        each(optionsArray, function(axisOptions) {
          new Axis(chart, axisOptions);
        });
      },
      getSelectedPoints: function() {
        var points = [];
        each(this.series, function(serie) {
          points = points.concat(grep(serie.points || [], function(point) {
            return point.selected;
          }));
        });
        return points;
      },
      getSelectedSeries: function() {
        return grep(this.series, function(serie) {
          return serie.selected;
        });
      },
      setTitle: function(titleOptions, subtitleOptions, redraw) {
        var chart = this,
            options = chart.options,
            chartTitleOptions,
            chartSubtitleOptions;
        chartTitleOptions = options.title = merge(options.title, titleOptions);
        chartSubtitleOptions = options.subtitle = merge(options.subtitle, subtitleOptions);
        each([['title', titleOptions, chartTitleOptions], ['subtitle', subtitleOptions, chartSubtitleOptions]], function(arr) {
          var name = arr[0],
              title = chart[name],
              titleOptions = arr[1],
              chartTitleOptions = arr[2];
          if (title && titleOptions) {
            chart[name] = title = title.destroy();
          }
          if (chartTitleOptions && chartTitleOptions.text && !title) {
            chart[name] = chart.renderer.text(chartTitleOptions.text, 0, 0, chartTitleOptions.useHTML).attr({
              align: chartTitleOptions.align,
              'class': PREFIX + name,
              zIndex: chartTitleOptions.zIndex || 4
            }).css(chartTitleOptions.style).add();
          }
        });
        chart.layOutTitles(redraw);
      },
      layOutTitles: function(redraw) {
        var titleOffset = 0,
            title = this.title,
            subtitle = this.subtitle,
            options = this.options,
            titleOptions = options.title,
            subtitleOptions = options.subtitle,
            requiresDirtyBox,
            renderer = this.renderer,
            spacingBox = this.spacingBox;
        if (title) {
          title.css({width: (titleOptions.width || spacingBox.width + titleOptions.widthAdjust) + PX}).align(extend({y: renderer.fontMetrics(titleOptions.style.fontSize, title).b - 3}, titleOptions), false, spacingBox);
          if (!titleOptions.floating && !titleOptions.verticalAlign) {
            titleOffset = title.getBBox().height;
          }
        }
        if (subtitle) {
          subtitle.css({width: (subtitleOptions.width || spacingBox.width + subtitleOptions.widthAdjust) + PX}).align(extend({y: titleOffset + (titleOptions.margin - 13) + renderer.fontMetrics(subtitleOptions.style.fontSize, title).b}, subtitleOptions), false, spacingBox);
          if (!subtitleOptions.floating && !subtitleOptions.verticalAlign) {
            titleOffset = mathCeil(titleOffset + subtitle.getBBox().height);
          }
        }
        requiresDirtyBox = this.titleOffset !== titleOffset;
        this.titleOffset = titleOffset;
        if (!this.isDirtyBox && requiresDirtyBox) {
          this.isDirtyBox = requiresDirtyBox;
          if (this.hasRendered && pick(redraw, true) && this.isDirtyBox) {
            this.redraw();
          }
        }
      },
      getChartSize: function() {
        var chart = this,
            optionsChart = chart.options.chart,
            widthOption = optionsChart.width,
            heightOption = optionsChart.height,
            renderTo = chart.renderToClone || chart.renderTo;
        if (!defined(widthOption)) {
          chart.containerWidth = getStyle(renderTo, 'width');
        }
        if (!defined(heightOption)) {
          chart.containerHeight = getStyle(renderTo, 'height');
        }
        chart.chartWidth = mathMax(0, widthOption || chart.containerWidth || 600);
        chart.chartHeight = mathMax(0, pick(heightOption, chart.containerHeight > 19 ? chart.containerHeight : 400));
      },
      cloneRenderTo: function(revert) {
        var clone = this.renderToClone,
            container = this.container;
        if (revert) {
          if (clone) {
            this.renderTo.appendChild(container);
            discardElement(clone);
            delete this.renderToClone;
          }
        } else {
          if (container && container.parentNode === this.renderTo) {
            this.renderTo.removeChild(container);
          }
          this.renderToClone = clone = this.renderTo.cloneNode(0);
          css(clone, {
            position: ABSOLUTE,
            top: '-9999px',
            display: 'block'
          });
          if (clone.style.setProperty) {
            clone.style.setProperty('display', 'block', 'important');
          }
          doc.body.appendChild(clone);
          if (container) {
            clone.appendChild(container);
          }
        }
      },
      getContainer: function() {
        var chart = this,
            container,
            options = chart.options,
            optionsChart = options.chart,
            chartWidth,
            chartHeight,
            renderTo = chart.renderTo,
            indexAttrName = 'data-highcharts-chart',
            oldChartIndex,
            Ren,
            containerId = 'highcharts-' + idCounter++;
        if (!renderTo) {
          chart.renderTo = renderTo = optionsChart.renderTo;
        }
        if (isString(renderTo)) {
          chart.renderTo = renderTo = doc.getElementById(renderTo);
        }
        if (!renderTo) {
          error(13, true);
        }
        oldChartIndex = pInt(attr(renderTo, indexAttrName));
        if (isNumber(oldChartIndex) && charts[oldChartIndex] && charts[oldChartIndex].hasRendered) {
          charts[oldChartIndex].destroy();
        }
        attr(renderTo, indexAttrName, chart.index);
        renderTo.innerHTML = '';
        if (!optionsChart.skipClone && !renderTo.offsetWidth) {
          chart.cloneRenderTo();
        }
        chart.getChartSize();
        chartWidth = chart.chartWidth;
        chartHeight = chart.chartHeight;
        chart.container = container = createElement(DIV, {
          className: PREFIX + 'container' + (optionsChart.className ? ' ' + optionsChart.className : ''),
          id: containerId
        }, extend({
          position: RELATIVE,
          overflow: HIDDEN,
          width: chartWidth + PX,
          height: chartHeight + PX,
          textAlign: 'left',
          lineHeight: 'normal',
          zIndex: 0,
          '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
        }, optionsChart.style), chart.renderToClone || renderTo);
        chart._cursor = container.style.cursor;
        Ren = Highcharts[optionsChart.renderer] || Renderer;
        chart.renderer = new Ren(container, chartWidth, chartHeight, optionsChart.style, optionsChart.forExport, options.exporting && options.exporting.allowHTML);
        if (useCanVG) {
          chart.renderer.create(chart, container, chartWidth, chartHeight);
        }
        chart.renderer.chartIndex = chart.index;
      },
      getMargins: function(skipAxes) {
        var chart = this,
            spacing = chart.spacing,
            margin = chart.margin,
            titleOffset = chart.titleOffset;
        chart.resetMargins();
        if (titleOffset && !defined(margin[0])) {
          chart.plotTop = mathMax(chart.plotTop, titleOffset + chart.options.title.margin + spacing[0]);
        }
        chart.legend.adjustMargins(margin, spacing);
        if (chart.extraBottomMargin) {
          chart.marginBottom += chart.extraBottomMargin;
        }
        if (chart.extraTopMargin) {
          chart.plotTop += chart.extraTopMargin;
        }
        if (!skipAxes) {
          this.getAxisMargins();
        }
      },
      getAxisMargins: function() {
        var chart = this,
            axisOffset = chart.axisOffset = [0, 0, 0, 0],
            margin = chart.margin;
        if (chart.hasCartesianSeries) {
          each(chart.axes, function(axis) {
            if (axis.visible) {
              axis.getOffset();
            }
          });
        }
        each(marginNames, function(m, side) {
          if (!defined(margin[side])) {
            chart[m] += axisOffset[side];
          }
        });
        chart.setChartSize();
      },
      reflow: function(e) {
        var chart = this,
            optionsChart = chart.options.chart,
            renderTo = chart.renderTo,
            width = optionsChart.width || getStyle(renderTo, 'width'),
            height = optionsChart.height || getStyle(renderTo, 'height'),
            target = e ? e.target : win;
        if (!chart.hasUserSize && !chart.isPrinting && width && height && (target === win || target === doc)) {
          if (width !== chart.containerWidth || height !== chart.containerHeight) {
            clearTimeout(chart.reflowTimeout);
            chart.reflowTimeout = syncTimeout(function() {
              if (chart.container) {
                chart.setSize(width, height, false);
                chart.hasUserSize = null;
              }
            }, e ? 100 : 0);
          }
          chart.containerWidth = width;
          chart.containerHeight = height;
        }
      },
      initReflow: function() {
        var chart = this,
            reflow = function(e) {
              chart.reflow(e);
            };
        addEvent(win, 'resize', reflow);
        addEvent(chart, 'destroy', function() {
          removeEvent(win, 'resize', reflow);
        });
      },
      setSize: function(width, height, animation) {
        var chart = this,
            chartWidth,
            chartHeight,
            renderer = chart.renderer,
            globalAnimation;
        chart.isResizing += 1;
        setAnimation(animation, chart);
        chart.oldChartHeight = chart.chartHeight;
        chart.oldChartWidth = chart.chartWidth;
        if (defined(width)) {
          chart.chartWidth = chartWidth = mathMax(0, mathRound(width));
          chart.hasUserSize = !!chartWidth;
        }
        if (defined(height)) {
          chart.chartHeight = chartHeight = mathMax(0, mathRound(height));
        }
        globalAnimation = renderer.globalAnimation;
        (globalAnimation ? animate : css)(chart.container, {
          width: chartWidth + PX,
          height: chartHeight + PX
        }, globalAnimation);
        chart.setChartSize(true);
        renderer.setSize(chartWidth, chartHeight, animation);
        chart.maxTicks = null;
        each(chart.axes, function(axis) {
          axis.isDirty = true;
          axis.setScale();
        });
        each(chart.series, function(serie) {
          serie.isDirty = true;
        });
        chart.isDirtyLegend = true;
        chart.isDirtyBox = true;
        chart.layOutTitles();
        chart.getMargins();
        chart.redraw(animation);
        chart.oldChartHeight = null;
        fireEvent(chart, 'resize');
        syncTimeout(function() {
          if (chart) {
            fireEvent(chart, 'endResize', null, function() {
              chart.isResizing -= 1;
            });
          }
        }, animObject(globalAnimation).duration);
      },
      setChartSize: function(skipAxes) {
        var chart = this,
            inverted = chart.inverted,
            renderer = chart.renderer,
            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            optionsChart = chart.options.chart,
            spacing = chart.spacing,
            clipOffset = chart.clipOffset,
            clipX,
            clipY,
            plotLeft,
            plotTop,
            plotWidth,
            plotHeight,
            plotBorderWidth;
        chart.plotLeft = plotLeft = mathRound(chart.plotLeft);
        chart.plotTop = plotTop = mathRound(chart.plotTop);
        chart.plotWidth = plotWidth = mathMax(0, mathRound(chartWidth - plotLeft - chart.marginRight));
        chart.plotHeight = plotHeight = mathMax(0, mathRound(chartHeight - plotTop - chart.marginBottom));
        chart.plotSizeX = inverted ? plotHeight : plotWidth;
        chart.plotSizeY = inverted ? plotWidth : plotHeight;
        chart.plotBorderWidth = optionsChart.plotBorderWidth || 0;
        chart.spacingBox = renderer.spacingBox = {
          x: spacing[3],
          y: spacing[0],
          width: chartWidth - spacing[3] - spacing[1],
          height: chartHeight - spacing[0] - spacing[2]
        };
        chart.plotBox = renderer.plotBox = {
          x: plotLeft,
          y: plotTop,
          width: plotWidth,
          height: plotHeight
        };
        plotBorderWidth = 2 * mathFloor(chart.plotBorderWidth / 2);
        clipX = mathCeil(mathMax(plotBorderWidth, clipOffset[3]) / 2);
        clipY = mathCeil(mathMax(plotBorderWidth, clipOffset[0]) / 2);
        chart.clipBox = {
          x: clipX,
          y: clipY,
          width: mathFloor(chart.plotSizeX - mathMax(plotBorderWidth, clipOffset[1]) / 2 - clipX),
          height: mathMax(0, mathFloor(chart.plotSizeY - mathMax(plotBorderWidth, clipOffset[2]) / 2 - clipY))
        };
        if (!skipAxes) {
          each(chart.axes, function(axis) {
            axis.setAxisSize();
            axis.setAxisTranslation();
          });
        }
      },
      resetMargins: function() {
        var chart = this;
        each(marginNames, function(m, side) {
          chart[m] = pick(chart.margin[side], chart.spacing[side]);
        });
        chart.axisOffset = [0, 0, 0, 0];
        chart.clipOffset = [0, 0, 0, 0];
      },
      drawChartBox: function() {
        var chart = this,
            optionsChart = chart.options.chart,
            renderer = chart.renderer,
            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            chartBackground = chart.chartBackground,
            plotBackground = chart.plotBackground,
            plotBorder = chart.plotBorder,
            plotBGImage = chart.plotBGImage,
            chartBorderWidth = optionsChart.borderWidth || 0,
            chartBackgroundColor = optionsChart.backgroundColor,
            plotBackgroundColor = optionsChart.plotBackgroundColor,
            plotBackgroundImage = optionsChart.plotBackgroundImage,
            plotBorderWidth = optionsChart.plotBorderWidth || 0,
            mgn,
            bgAttr,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            plotWidth = chart.plotWidth,
            plotHeight = chart.plotHeight,
            plotBox = chart.plotBox,
            clipRect = chart.clipRect,
            clipBox = chart.clipBox;
        mgn = chartBorderWidth + (optionsChart.shadow ? 8 : 0);
        if (chartBorderWidth || chartBackgroundColor) {
          if (!chartBackground) {
            bgAttr = {fill: chartBackgroundColor || NONE};
            if (chartBorderWidth) {
              bgAttr.stroke = optionsChart.borderColor;
              bgAttr['stroke-width'] = chartBorderWidth;
            }
            chart.chartBackground = renderer.rect(mgn / 2, mgn / 2, chartWidth - mgn, chartHeight - mgn, optionsChart.borderRadius, chartBorderWidth).attr(bgAttr).addClass(PREFIX + 'background').add().shadow(optionsChart.shadow);
          } else {
            chartBackground.animate(chartBackground.crisp({
              width: chartWidth - mgn,
              height: chartHeight - mgn
            }));
          }
        }
        if (plotBackgroundColor) {
          if (!plotBackground) {
            chart.plotBackground = renderer.rect(plotLeft, plotTop, plotWidth, plotHeight, 0).attr({fill: plotBackgroundColor}).add().shadow(optionsChart.plotShadow);
          } else {
            plotBackground.animate(plotBox);
          }
        }
        if (plotBackgroundImage) {
          if (!plotBGImage) {
            chart.plotBGImage = renderer.image(plotBackgroundImage, plotLeft, plotTop, plotWidth, plotHeight).add();
          } else {
            plotBGImage.animate(plotBox);
          }
        }
        if (!clipRect) {
          chart.clipRect = renderer.clipRect(clipBox);
        } else {
          clipRect.animate({
            width: clipBox.width,
            height: clipBox.height
          });
        }
        if (plotBorderWidth) {
          if (!plotBorder) {
            chart.plotBorder = renderer.rect(plotLeft, plotTop, plotWidth, plotHeight, 0, -plotBorderWidth).attr({
              stroke: optionsChart.plotBorderColor,
              'stroke-width': plotBorderWidth,
              fill: NONE,
              zIndex: 1
            }).add();
          } else {
            plotBorder.strokeWidth = -plotBorderWidth;
            plotBorder.animate(plotBorder.crisp({
              x: plotLeft,
              y: plotTop,
              width: plotWidth,
              height: plotHeight
            }));
          }
        }
        chart.isDirtyBox = false;
      },
      propFromSeries: function() {
        var chart = this,
            optionsChart = chart.options.chart,
            klass,
            seriesOptions = chart.options.series,
            i,
            value;
        each(['inverted', 'angular', 'polar'], function(key) {
          klass = seriesTypes[optionsChart.type || optionsChart.defaultSeriesType];
          value = (chart[key] || optionsChart[key] || (klass && klass.prototype[key]));
          i = seriesOptions && seriesOptions.length;
          while (!value && i--) {
            klass = seriesTypes[seriesOptions[i].type];
            if (klass && klass.prototype[key]) {
              value = true;
            }
          }
          chart[key] = value;
        });
      },
      linkSeries: function() {
        var chart = this,
            chartSeries = chart.series;
        each(chartSeries, function(series) {
          series.linkedSeries.length = 0;
        });
        each(chartSeries, function(series) {
          var linkedTo = series.options.linkedTo;
          if (isString(linkedTo)) {
            if (linkedTo === ':previous') {
              linkedTo = chart.series[series.index - 1];
            } else {
              linkedTo = chart.get(linkedTo);
            }
            if (linkedTo) {
              linkedTo.linkedSeries.push(series);
              series.linkedParent = linkedTo;
              series.visible = pick(series.options.visible, linkedTo.options.visible, series.visible);
            }
          }
        });
      },
      renderSeries: function() {
        each(this.series, function(serie) {
          serie.translate();
          serie.render();
        });
      },
      renderLabels: function() {
        var chart = this,
            labels = chart.options.labels;
        if (labels.items) {
          each(labels.items, function(label) {
            var style = extend(labels.style, label.style),
                x = pInt(style.left) + chart.plotLeft,
                y = pInt(style.top) + chart.plotTop + 12;
            delete style.left;
            delete style.top;
            chart.renderer.text(label.html, x, y).attr({zIndex: 2}).css(style).add();
          });
        }
      },
      render: function() {
        var chart = this,
            axes = chart.axes,
            renderer = chart.renderer,
            options = chart.options,
            tempWidth,
            tempHeight,
            redoHorizontal,
            redoVertical;
        chart.setTitle();
        chart.legend = new Legend(chart, options.legend);
        if (chart.getStacks) {
          chart.getStacks();
        }
        chart.getMargins(true);
        chart.setChartSize();
        tempWidth = chart.plotWidth;
        tempHeight = chart.plotHeight = chart.plotHeight - 21;
        each(axes, function(axis) {
          axis.setScale();
        });
        chart.getAxisMargins();
        redoHorizontal = tempWidth / chart.plotWidth > 1.1;
        redoVertical = tempHeight / chart.plotHeight > 1.05;
        if (redoHorizontal || redoVertical) {
          chart.maxTicks = null;
          each(axes, function(axis) {
            if ((axis.horiz && redoHorizontal) || (!axis.horiz && redoVertical)) {
              axis.setTickInterval(true);
            }
          });
          chart.getMargins();
        }
        chart.drawChartBox();
        if (chart.hasCartesianSeries) {
          each(axes, function(axis) {
            if (axis.visible) {
              axis.render();
            }
          });
        }
        if (!chart.seriesGroup) {
          chart.seriesGroup = renderer.g('series-group').attr({zIndex: 3}).add();
        }
        chart.renderSeries();
        chart.renderLabels();
        chart.showCredits(options.credits);
        chart.hasRendered = true;
      },
      showCredits: function(credits) {
        if (credits.enabled && !this.credits) {
          this.credits = this.renderer.text(credits.text, 0, 0).on('click', function() {
            if (credits.href) {
              win.location.href = credits.href;
            }
          }).attr({
            align: credits.position.align,
            zIndex: 8
          }).css(credits.style).add().align(credits.position);
        }
      },
      destroy: function() {
        var chart = this,
            axes = chart.axes,
            series = chart.series,
            container = chart.container,
            i,
            parentNode = container && container.parentNode;
        fireEvent(chart, 'destroy');
        charts[chart.index] = UNDEFINED;
        chartCount--;
        chart.renderTo.removeAttribute('data-highcharts-chart');
        removeEvent(chart);
        i = axes.length;
        while (i--) {
          axes[i] = axes[i].destroy();
        }
        i = series.length;
        while (i--) {
          series[i] = series[i].destroy();
        }
        each(['title', 'subtitle', 'chartBackground', 'plotBackground', 'plotBGImage', 'plotBorder', 'seriesGroup', 'clipRect', 'credits', 'pointer', 'scroller', 'rangeSelector', 'legend', 'resetZoomButton', 'tooltip', 'renderer'], function(name) {
          var prop = chart[name];
          if (prop && prop.destroy) {
            chart[name] = prop.destroy();
          }
        });
        if (container) {
          container.innerHTML = '';
          removeEvent(container);
          if (parentNode) {
            discardElement(container);
          }
        }
        for (i in chart) {
          delete chart[i];
        }
      },
      isReadyToRender: function() {
        var chart = this;
        if ((!hasSVG && (win == win.top && doc.readyState !== 'complete')) || (useCanVG && !win.canvg)) {
          if (useCanVG) {
            CanVGController.push(function() {
              chart.firstRender();
            }, chart.options.global.canvasToolsURL);
          } else {
            doc.attachEvent('onreadystatechange', function() {
              doc.detachEvent('onreadystatechange', chart.firstRender);
              if (doc.readyState === 'complete') {
                chart.firstRender();
              }
            });
          }
          return false;
        }
        return true;
      },
      firstRender: function() {
        var chart = this,
            options = chart.options;
        if (!chart.isReadyToRender()) {
          return;
        }
        chart.getContainer();
        fireEvent(chart, 'init');
        chart.resetMargins();
        chart.setChartSize();
        chart.propFromSeries();
        chart.getAxes();
        each(options.series || [], function(serieOptions) {
          chart.initSeries(serieOptions);
        });
        chart.linkSeries();
        fireEvent(chart, 'beforeRender');
        if (Highcharts.Pointer) {
          chart.pointer = new Pointer(chart, options);
        }
        chart.render();
        chart.renderer.draw();
        if (!chart.renderer.imgCount && chart.onload) {
          chart.onload();
        }
        chart.cloneRenderTo(true);
      },
      onload: function() {
        var chart = this;
        each([this.callback].concat(this.callbacks), function(fn) {
          if (fn && chart.index !== undefined) {
            fn.apply(chart, [chart]);
          }
        });
        fireEvent(chart, 'load');
        this.onload = null;
      },
      splashArray: function(target, options) {
        var oVar = options[target],
            tArray = isObject(oVar) ? oVar : [oVar, oVar, oVar, oVar];
        return [pick(options[target + 'Top'], tArray[0]), pick(options[target + 'Right'], tArray[1]), pick(options[target + 'Bottom'], tArray[2]), pick(options[target + 'Left'], tArray[3])];
      }
    };
    var CenteredSeriesMixin = Highcharts.CenteredSeriesMixin = {getCenter: function() {
        var options = this.options,
            chart = this.chart,
            slicingRoom = 2 * (options.slicedOffset || 0),
            handleSlicingRoom,
            plotWidth = chart.plotWidth - 2 * slicingRoom,
            plotHeight = chart.plotHeight - 2 * slicingRoom,
            centerOption = options.center,
            positions = [pick(centerOption[0], '50%'), pick(centerOption[1], '50%'), options.size || '100%', options.innerSize || 0],
            smallestSize = mathMin(plotWidth, plotHeight),
            i,
            value;
        for (i = 0; i < 4; ++i) {
          value = positions[i];
          handleSlicingRoom = i < 2 || (i === 2 && /%$/.test(value));
          positions[i] = relativeLength(value, [plotWidth, plotHeight, smallestSize, positions[2]][i]) + (handleSlicingRoom ? slicingRoom : 0);
        }
        if (positions[3] > positions[2]) {
          positions[3] = positions[2];
        }
        return positions;
      }};
    var Point = function() {};
    Point.prototype = {
      init: function(series, options, x) {
        var point = this,
            colors;
        point.series = series;
        point.color = series.color;
        point.applyOptions(options, x);
        point.pointAttr = {};
        if (series.options.colorByPoint) {
          colors = series.options.colors || series.chart.options.colors;
          point.color = point.color || colors[series.colorCounter++];
          if (series.colorCounter === colors.length) {
            series.colorCounter = 0;
          }
        }
        series.chart.pointCount++;
        return point;
      },
      applyOptions: function(options, x) {
        var point = this,
            series = point.series,
            pointValKey = series.options.pointValKey || series.pointValKey;
        options = Point.prototype.optionsToObject.call(this, options);
        extend(point, options);
        point.options = point.options ? extend(point.options, options) : options;
        if (pointValKey) {
          point.y = point[pointValKey];
        }
        point.isNull = point.x === null || point.y === null;
        if (point.x === undefined && series) {
          point.x = x === undefined ? series.autoIncrement() : x;
        }
        return point;
      },
      optionsToObject: function(options) {
        var ret = {},
            series = this.series,
            keys = series.options.keys,
            pointArrayMap = keys || series.pointArrayMap || ['y'],
            valueCount = pointArrayMap.length,
            firstItemType,
            i = 0,
            j = 0;
        if (isNumber(options) || options === null) {
          ret[pointArrayMap[0]] = options;
        } else if (isArray(options)) {
          if (!keys && options.length > valueCount) {
            firstItemType = typeof options[0];
            if (firstItemType === 'string') {
              ret.name = options[0];
            } else if (firstItemType === 'number') {
              ret.x = options[0];
            }
            i++;
          }
          while (j < valueCount) {
            if (!keys || options[i] !== undefined) {
              ret[pointArrayMap[j]] = options[i];
            }
            i++;
            j++;
          }
        } else if (typeof options === 'object') {
          ret = options;
          if (options.dataLabels) {
            series._hasPointLabels = true;
          }
          if (options.marker) {
            series._hasPointMarkers = true;
          }
        }
        return ret;
      },
      destroy: function() {
        var point = this,
            series = point.series,
            chart = series.chart,
            hoverPoints = chart.hoverPoints,
            prop;
        chart.pointCount--;
        if (hoverPoints) {
          point.setState();
          erase(hoverPoints, point);
          if (!hoverPoints.length) {
            chart.hoverPoints = null;
          }
        }
        if (point === chart.hoverPoint) {
          point.onMouseOut();
        }
        if (point.graphic || point.dataLabel) {
          removeEvent(point);
          point.destroyElements();
        }
        if (point.legendItem) {
          chart.legend.destroyItem(point);
        }
        for (prop in point) {
          point[prop] = null;
        }
      },
      destroyElements: function() {
        var point = this,
            props = ['graphic', 'dataLabel', 'dataLabelUpper', 'connector', 'shadowGroup'],
            prop,
            i = 6;
        while (i--) {
          prop = props[i];
          if (point[prop]) {
            point[prop] = point[prop].destroy();
          }
        }
      },
      getLabelConfig: function() {
        return {
          x: this.category,
          y: this.y,
          color: this.color,
          key: this.name || this.category,
          series: this.series,
          point: this,
          percentage: this.percentage,
          total: this.total || this.stackTotal
        };
      },
      tooltipFormatter: function(pointFormat) {
        var series = this.series,
            seriesTooltipOptions = series.tooltipOptions,
            valueDecimals = pick(seriesTooltipOptions.valueDecimals, ''),
            valuePrefix = seriesTooltipOptions.valuePrefix || '',
            valueSuffix = seriesTooltipOptions.valueSuffix || '';
        each(series.pointArrayMap || ['y'], function(key) {
          key = '{point.' + key;
          if (valuePrefix || valueSuffix) {
            pointFormat = pointFormat.replace(key + '}', valuePrefix + key + '}' + valueSuffix);
          }
          pointFormat = pointFormat.replace(key + '}', key + ':,.' + valueDecimals + 'f}');
        });
        return format(pointFormat, {
          point: this,
          series: this.series
        });
      },
      firePointEvent: function(eventType, eventArgs, defaultFunction) {
        var point = this,
            series = this.series,
            seriesOptions = series.options;
        if (seriesOptions.point.events[eventType] || (point.options && point.options.events && point.options.events[eventType])) {
          this.importEvents();
        }
        if (eventType === 'click' && seriesOptions.allowPointSelect) {
          defaultFunction = function(event) {
            if (point.select) {
              point.select(null, event.ctrlKey || event.metaKey || event.shiftKey);
            }
          };
        }
        fireEvent(this, eventType, eventArgs, defaultFunction);
      },
      visible: true
    };
    var Series = Highcharts.Series = function() {};
    Series.prototype = {
      isCartesian: true,
      type: 'line',
      pointClass: Point,
      sorted: true,
      requireSorting: true,
      pointAttrToOptions: {
        stroke: 'lineColor',
        'stroke-width': 'lineWidth',
        fill: 'fillColor',
        r: 'radius'
      },
      directTouch: false,
      axisTypes: ['xAxis', 'yAxis'],
      colorCounter: 0,
      parallelArrays: ['x', 'y'],
      init: function(chart, options) {
        var series = this,
            eventType,
            events,
            chartSeries = chart.series,
            sortByIndex = function(a, b) {
              return pick(a.options.index, a._i) - pick(b.options.index, b._i);
            };
        series.chart = chart;
        series.options = options = series.setOptions(options);
        series.linkedSeries = [];
        series.bindAxes();
        extend(series, {
          name: options.name,
          state: NORMAL_STATE,
          pointAttr: {},
          visible: options.visible !== false,
          selected: options.selected === true
        });
        if (useCanVG) {
          options.animation = false;
        }
        events = options.events;
        for (eventType in events) {
          addEvent(series, eventType, events[eventType]);
        }
        if ((events && events.click) || (options.point && options.point.events && options.point.events.click) || options.allowPointSelect) {
          chart.runTrackerClick = true;
        }
        series.getColor();
        series.getSymbol();
        each(series.parallelArrays, function(key) {
          series[key + 'Data'] = [];
        });
        series.setData(options.data, false);
        if (series.isCartesian) {
          chart.hasCartesianSeries = true;
        }
        chartSeries.push(series);
        series._i = chartSeries.length - 1;
        stableSort(chartSeries, sortByIndex);
        if (this.yAxis) {
          stableSort(this.yAxis.series, sortByIndex);
        }
        each(chartSeries, function(series, i) {
          series.index = i;
          series.name = series.name || 'Series ' + (i + 1);
        });
      },
      bindAxes: function() {
        var series = this,
            seriesOptions = series.options,
            chart = series.chart,
            axisOptions;
        each(series.axisTypes || [], function(AXIS) {
          each(chart[AXIS], function(axis) {
            axisOptions = axis.options;
            if ((seriesOptions[AXIS] === axisOptions.index) || (seriesOptions[AXIS] !== UNDEFINED && seriesOptions[AXIS] === axisOptions.id) || (seriesOptions[AXIS] === UNDEFINED && axisOptions.index === 0)) {
              axis.series.push(series);
              series[AXIS] = axis;
              axis.isDirty = true;
            }
          });
          if (!series[AXIS] && series.optionalAxis !== AXIS) {
            error(18, true);
          }
        });
      },
      updateParallelArrays: function(point, i) {
        var series = point.series,
            args = arguments,
            fn = isNumber(i) ? function(key) {
              var val = key === 'y' && series.toYData ? series.toYData(point) : point[key];
              series[key + 'Data'][i] = val;
            } : function(key) {
              Array.prototype[i].apply(series[key + 'Data'], Array.prototype.slice.call(args, 2));
            };
        each(series.parallelArrays, fn);
      },
      autoIncrement: function() {
        var options = this.options,
            xIncrement = this.xIncrement,
            date,
            pointInterval,
            pointIntervalUnit = options.pointIntervalUnit;
        xIncrement = pick(xIncrement, options.pointStart, 0);
        this.pointInterval = pointInterval = pick(this.pointInterval, options.pointInterval, 1);
        if (pointIntervalUnit) {
          date = new Date(xIncrement);
          if (pointIntervalUnit === 'day') {
            date = +date[setDate](date[getDate]() + pointInterval);
          } else if (pointIntervalUnit === 'month') {
            date = +date[setMonth](date[getMonth]() + pointInterval);
          } else if (pointIntervalUnit === 'year') {
            date = +date[setFullYear](date[getFullYear]() + pointInterval);
          }
          pointInterval = date - xIncrement;
        }
        this.xIncrement = xIncrement + pointInterval;
        return xIncrement;
      },
      setOptions: function(itemOptions) {
        var chart = this.chart,
            chartOptions = chart.options,
            plotOptions = chartOptions.plotOptions,
            userOptions = chart.userOptions || {},
            userPlotOptions = userOptions.plotOptions || {},
            typeOptions = plotOptions[this.type],
            options,
            zones;
        this.userOptions = itemOptions;
        options = merge(typeOptions, plotOptions.series, itemOptions);
        this.tooltipOptions = merge(defaultOptions.tooltip, defaultOptions.plotOptions[this.type].tooltip, userOptions.tooltip, userPlotOptions.series && userPlotOptions.series.tooltip, userPlotOptions[this.type] && userPlotOptions[this.type].tooltip, itemOptions.tooltip);
        if (typeOptions.marker === null) {
          delete options.marker;
        }
        this.zoneAxis = options.zoneAxis;
        zones = this.zones = (options.zones || []).slice();
        if ((options.negativeColor || options.negativeFillColor) && !options.zones) {
          zones.push({
            value: options[this.zoneAxis + 'Threshold'] || options.threshold || 0,
            color: options.negativeColor,
            fillColor: options.negativeFillColor
          });
        }
        if (zones.length) {
          if (defined(zones[zones.length - 1].value)) {
            zones.push({
              color: this.color,
              fillColor: this.fillColor
            });
          }
        }
        return options;
      },
      getCyclic: function(prop, value, defaults) {
        var i,
            userOptions = this.userOptions,
            indexName = '_' + prop + 'Index',
            counterName = prop + 'Counter';
        if (!value) {
          if (defined(userOptions[indexName])) {
            i = userOptions[indexName];
          } else {
            userOptions[indexName] = i = this.chart[counterName] % defaults.length;
            this.chart[counterName] += 1;
          }
          value = defaults[i];
        }
        this[prop] = value;
      },
      getColor: function() {
        if (this.options.colorByPoint) {
          this.options.color = null;
        } else {
          this.getCyclic('color', this.options.color || defaultPlotOptions[this.type].color, this.chart.options.colors);
        }
      },
      getSymbol: function() {
        var seriesMarkerOption = this.options.marker;
        this.getCyclic('symbol', seriesMarkerOption.symbol, this.chart.options.symbols);
        if (/^url/.test(this.symbol)) {
          seriesMarkerOption.radius = 0;
        }
      },
      drawLegendSymbol: LegendSymbolMixin.drawLineMarker,
      setData: function(data, redraw, animation, updatePoints) {
        var series = this,
            oldData = series.points,
            oldDataLength = (oldData && oldData.length) || 0,
            dataLength,
            options = series.options,
            chart = series.chart,
            firstPoint = null,
            xAxis = series.xAxis,
            hasCategories = xAxis && !!xAxis.categories,
            i,
            turboThreshold = options.turboThreshold,
            pt,
            xData = this.xData,
            yData = this.yData,
            pointArrayMap = series.pointArrayMap,
            valueCount = pointArrayMap && pointArrayMap.length;
        data = data || [];
        dataLength = data.length;
        redraw = pick(redraw, true);
        if (updatePoints !== false && dataLength && oldDataLength === dataLength && !series.cropped && !series.hasGroupedData && series.visible) {
          each(data, function(point, i) {
            if (oldData[i].update && point !== options.data[i]) {
              oldData[i].update(point, false, null, false);
            }
          });
        } else {
          series.xIncrement = null;
          series.colorCounter = 0;
          each(this.parallelArrays, function(key) {
            series[key + 'Data'].length = 0;
          });
          if (turboThreshold && dataLength > turboThreshold) {
            i = 0;
            while (firstPoint === null && i < dataLength) {
              firstPoint = data[i];
              i++;
            }
            if (isNumber(firstPoint)) {
              var x = pick(options.pointStart, 0),
                  pointInterval = pick(options.pointInterval, 1);
              for (i = 0; i < dataLength; i++) {
                xData[i] = x;
                yData[i] = data[i];
                x += pointInterval;
              }
              series.xIncrement = x;
            } else if (isArray(firstPoint)) {
              if (valueCount) {
                for (i = 0; i < dataLength; i++) {
                  pt = data[i];
                  xData[i] = pt[0];
                  yData[i] = pt.slice(1, valueCount + 1);
                }
              } else {
                for (i = 0; i < dataLength; i++) {
                  pt = data[i];
                  xData[i] = pt[0];
                  yData[i] = pt[1];
                }
              }
            } else {
              error(12);
            }
          } else {
            for (i = 0; i < dataLength; i++) {
              if (data[i] !== UNDEFINED) {
                pt = {series: series};
                series.pointClass.prototype.applyOptions.apply(pt, [data[i]]);
                series.updateParallelArrays(pt, i);
                if (hasCategories && defined(pt.name)) {
                  xAxis.names[pt.x] = pt.name;
                }
              }
            }
          }
          if (isString(yData[0])) {
            error(14, true);
          }
          series.data = [];
          series.options.data = series.userOptions.data = data;
          i = oldDataLength;
          while (i--) {
            if (oldData[i] && oldData[i].destroy) {
              oldData[i].destroy();
            }
          }
          if (xAxis) {
            xAxis.minRange = xAxis.userMinRange;
          }
          series.isDirty = series.isDirtyData = chart.isDirtyBox = true;
          animation = false;
        }
        if (options.legendType === 'point') {
          this.processData();
          this.generatePoints();
        }
        if (redraw) {
          chart.redraw(animation);
        }
      },
      processData: function(force) {
        var series = this,
            processedXData = series.xData,
            processedYData = series.yData,
            dataLength = processedXData.length,
            croppedData,
            cropStart = 0,
            cropped,
            distance,
            closestPointRange,
            xAxis = series.xAxis,
            i,
            options = series.options,
            cropThreshold = options.cropThreshold,
            getExtremesFromAll = series.getExtremesFromAll || options.getExtremesFromAll,
            isCartesian = series.isCartesian,
            xExtremes,
            val2lin = xAxis && xAxis.val2lin,
            isLog = xAxis && xAxis.isLog,
            min,
            max;
        if (isCartesian && !series.isDirty && !xAxis.isDirty && !series.yAxis.isDirty && !force) {
          return false;
        }
        if (xAxis) {
          xExtremes = xAxis.getExtremes();
          min = xExtremes.min;
          max = xExtremes.max;
        }
        if (isCartesian && series.sorted && !getExtremesFromAll && (!cropThreshold || dataLength > cropThreshold || series.forceCrop)) {
          if (processedXData[dataLength - 1] < min || processedXData[0] > max) {
            processedXData = [];
            processedYData = [];
          } else if (processedXData[0] < min || processedXData[dataLength - 1] > max) {
            croppedData = this.cropData(series.xData, series.yData, min, max);
            processedXData = croppedData.xData;
            processedYData = croppedData.yData;
            cropStart = croppedData.start;
            cropped = true;
          }
        }
        i = processedXData.length || 1;
        while (--i) {
          distance = isLog ? val2lin(processedXData[i]) - val2lin(processedXData[i - 1]) : processedXData[i] - processedXData[i - 1];
          if (distance > 0 && (closestPointRange === UNDEFINED || distance < closestPointRange)) {
            closestPointRange = distance;
          } else if (distance < 0 && series.requireSorting) {
            error(15);
          }
        }
        series.cropped = cropped;
        series.cropStart = cropStart;
        series.processedXData = processedXData;
        series.processedYData = processedYData;
        series.closestPointRange = closestPointRange;
      },
      cropData: function(xData, yData, min, max) {
        var dataLength = xData.length,
            cropStart = 0,
            cropEnd = dataLength,
            cropShoulder = pick(this.cropShoulder, 1),
            i,
            j;
        for (i = 0; i < dataLength; i++) {
          if (xData[i] >= min) {
            cropStart = mathMax(0, i - cropShoulder);
            break;
          }
        }
        for (j = i; j < dataLength; j++) {
          if (xData[j] > max) {
            cropEnd = j + cropShoulder;
            break;
          }
        }
        return {
          xData: xData.slice(cropStart, cropEnd),
          yData: yData.slice(cropStart, cropEnd),
          start: cropStart,
          end: cropEnd
        };
      },
      generatePoints: function() {
        var series = this,
            options = series.options,
            dataOptions = options.data,
            data = series.data,
            dataLength,
            processedXData = series.processedXData,
            processedYData = series.processedYData,
            pointClass = series.pointClass,
            processedDataLength = processedXData.length,
            cropStart = series.cropStart || 0,
            cursor,
            hasGroupedData = series.hasGroupedData,
            point,
            points = [],
            i;
        if (!data && !hasGroupedData) {
          var arr = [];
          arr.length = dataOptions.length;
          data = series.data = arr;
        }
        for (i = 0; i < processedDataLength; i++) {
          cursor = cropStart + i;
          if (!hasGroupedData) {
            if (data[cursor]) {
              point = data[cursor];
            } else if (dataOptions[cursor] !== UNDEFINED) {
              data[cursor] = point = (new pointClass()).init(series, dataOptions[cursor], processedXData[i]);
            }
            points[i] = point;
          } else {
            points[i] = (new pointClass()).init(series, [processedXData[i]].concat(splat(processedYData[i])));
            points[i].dataGroup = series.groupMap[i];
          }
          points[i].index = cursor;
        }
        if (data && (processedDataLength !== (dataLength = data.length) || hasGroupedData)) {
          for (i = 0; i < dataLength; i++) {
            if (i === cropStart && !hasGroupedData) {
              i += processedDataLength;
            }
            if (data[i]) {
              data[i].destroyElements();
              data[i].plotX = UNDEFINED;
            }
          }
        }
        series.data = data;
        series.points = points;
      },
      getExtremes: function(yData) {
        var xAxis = this.xAxis,
            yAxis = this.yAxis,
            xData = this.processedXData,
            yDataLength,
            activeYData = [],
            activeCounter = 0,
            xExtremes = xAxis.getExtremes(),
            xMin = xExtremes.min,
            xMax = xExtremes.max,
            validValue,
            withinRange,
            x,
            y,
            i,
            j;
        yData = yData || this.stackedYData || this.processedYData || [];
        yDataLength = yData.length;
        for (i = 0; i < yDataLength; i++) {
          x = xData[i];
          y = yData[i];
          validValue = y !== null && y !== UNDEFINED && (!yAxis.isLog || (y.length || y > 0));
          withinRange = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || ((xData[i + 1] || x) >= xMin && (xData[i - 1] || x) <= xMax);
          if (validValue && withinRange) {
            j = y.length;
            if (j) {
              while (j--) {
                if (y[j] !== null) {
                  activeYData[activeCounter++] = y[j];
                }
              }
            } else {
              activeYData[activeCounter++] = y;
            }
          }
        }
        this.dataMin = arrayMin(activeYData);
        this.dataMax = arrayMax(activeYData);
      },
      translate: function() {
        if (!this.processedXData) {
          this.processData();
        }
        this.generatePoints();
        var series = this,
            options = series.options,
            stacking = options.stacking,
            xAxis = series.xAxis,
            categories = xAxis.categories,
            yAxis = series.yAxis,
            points = series.points,
            dataLength = points.length,
            hasModifyValue = !!series.modifyValue,
            i,
            pointPlacement = options.pointPlacement,
            dynamicallyPlaced = pointPlacement === 'between' || isNumber(pointPlacement),
            threshold = options.threshold,
            stackThreshold = options.startFromThreshold ? threshold : 0,
            plotX,
            plotY,
            lastPlotX,
            stackIndicator,
            closestPointRangePx = Number.MAX_VALUE;
        for (i = 0; i < dataLength; i++) {
          var point = points[i],
              xValue = point.x,
              yValue = point.y,
              yBottom = point.low,
              stack = stacking && yAxis.stacks[(series.negStacks && yValue < (stackThreshold ? 0 : threshold) ? '-' : '') + series.stackKey],
              pointStack,
              stackValues;
          if (yAxis.isLog && yValue !== null && yValue <= 0) {
            point.y = yValue = null;
            error(10);
          }
          point.plotX = plotX = correctFloat(mathMin(mathMax(-1e5, xAxis.translate(xValue, 0, 0, 0, 1, pointPlacement, this.type === 'flags')), 1e5));
          if (stacking && series.visible && !point.isNull && stack && stack[xValue]) {
            stackIndicator = series.getStackIndicator(stackIndicator, xValue, series.index);
            pointStack = stack[xValue];
            stackValues = pointStack.points[stackIndicator.key];
            yBottom = stackValues[0];
            yValue = stackValues[1];
            if (yBottom === stackThreshold) {
              yBottom = pick(threshold, yAxis.min);
            }
            if (yAxis.isLog && yBottom <= 0) {
              yBottom = null;
            }
            point.total = point.stackTotal = pointStack.total;
            point.percentage = pointStack.total && (point.y / pointStack.total * 100);
            point.stackY = yValue;
            pointStack.setOffset(series.pointXOffset || 0, series.barW || 0);
          }
          point.yBottom = defined(yBottom) ? yAxis.translate(yBottom, 0, 1, 0, 1) : null;
          if (hasModifyValue) {
            yValue = series.modifyValue(yValue, point);
          }
          point.plotY = plotY = (typeof yValue === 'number' && yValue !== Infinity) ? mathMin(mathMax(-1e5, yAxis.translate(yValue, 0, 1, 0, 1)), 1e5) : UNDEFINED;
          point.isInside = plotY !== UNDEFINED && plotY >= 0 && plotY <= yAxis.len && plotX >= 0 && plotX <= xAxis.len;
          point.clientX = dynamicallyPlaced ? xAxis.translate(xValue, 0, 0, 0, 1) : plotX;
          point.negative = point.y < (threshold || 0);
          point.category = categories && categories[point.x] !== UNDEFINED ? categories[point.x] : point.x;
          if (!point.isNull) {
            if (lastPlotX !== undefined) {
              closestPointRangePx = mathMin(closestPointRangePx, mathAbs(plotX - lastPlotX));
            }
            lastPlotX = plotX;
          }
        }
        series.closestPointRangePx = closestPointRangePx;
      },
      getValidPoints: function(points, insideOnly) {
        var chart = this.chart;
        return grep(points || this.points || [], function isValidPoint(point) {
          if (insideOnly && !chart.isInsidePlot(point.plotX, point.plotY, chart.inverted)) {
            return false;
          }
          return !point.isNull;
        });
      },
      setClip: function(animation) {
        var chart = this.chart,
            options = this.options,
            renderer = chart.renderer,
            inverted = chart.inverted,
            seriesClipBox = this.clipBox,
            clipBox = seriesClipBox || chart.clipBox,
            sharedClipKey = this.sharedClipKey || ['_sharedClip', animation && animation.duration, animation && animation.easing, clipBox.height, options.xAxis, options.yAxis].join(','),
            clipRect = chart[sharedClipKey],
            markerClipRect = chart[sharedClipKey + 'm'];
        if (!clipRect) {
          if (animation) {
            clipBox.width = 0;
            chart[sharedClipKey + 'm'] = markerClipRect = renderer.clipRect(-99, inverted ? -chart.plotLeft : -chart.plotTop, 99, inverted ? chart.chartWidth : chart.chartHeight);
          }
          chart[sharedClipKey] = clipRect = renderer.clipRect(clipBox);
        }
        if (animation) {
          clipRect.count += 1;
        }
        if (options.clip !== false) {
          this.group.clip(animation || seriesClipBox ? clipRect : chart.clipRect);
          this.markerGroup.clip(markerClipRect);
          this.sharedClipKey = sharedClipKey;
        }
        if (!animation) {
          clipRect.count -= 1;
          if (clipRect.count <= 0 && sharedClipKey && chart[sharedClipKey]) {
            if (!seriesClipBox) {
              chart[sharedClipKey] = chart[sharedClipKey].destroy();
            }
            if (chart[sharedClipKey + 'm']) {
              chart[sharedClipKey + 'm'] = chart[sharedClipKey + 'm'].destroy();
            }
          }
        }
      },
      animate: function(init) {
        var series = this,
            chart = series.chart,
            clipRect,
            animation = series.options.animation,
            sharedClipKey;
        if (animation && !isObject(animation)) {
          animation = defaultPlotOptions[series.type].animation;
        }
        if (init) {
          series.setClip(animation);
        } else {
          sharedClipKey = this.sharedClipKey;
          clipRect = chart[sharedClipKey];
          if (clipRect) {
            clipRect.animate({width: chart.plotSizeX}, animation);
          }
          if (chart[sharedClipKey + 'm']) {
            chart[sharedClipKey + 'm'].animate({width: chart.plotSizeX + 99}, animation);
          }
          series.animate = null;
        }
      },
      afterAnimate: function() {
        this.setClip();
        fireEvent(this, 'afterAnimate');
      },
      drawPoints: function() {
        var series = this,
            pointAttr,
            points = series.points,
            chart = series.chart,
            plotX,
            plotY,
            i,
            point,
            radius,
            symbol,
            isImage,
            graphic,
            options = series.options,
            seriesMarkerOptions = options.marker,
            seriesPointAttr = series.pointAttr[''],
            pointMarkerOptions,
            hasPointMarker,
            enabled,
            isInside,
            markerGroup = series.markerGroup,
            xAxis = series.xAxis,
            globallyEnabled = pick(seriesMarkerOptions.enabled, xAxis.isRadial, series.closestPointRangePx > 2 * seriesMarkerOptions.radius);
        if (seriesMarkerOptions.enabled !== false || series._hasPointMarkers) {
          i = points.length;
          while (i--) {
            point = points[i];
            plotX = mathFloor(point.plotX);
            plotY = point.plotY;
            graphic = point.graphic;
            pointMarkerOptions = point.marker || {};
            hasPointMarker = !!point.marker;
            enabled = (globallyEnabled && pointMarkerOptions.enabled === UNDEFINED) || pointMarkerOptions.enabled;
            isInside = point.isInside;
            if (enabled && isNumber(plotY) && point.y !== null) {
              pointAttr = point.pointAttr[point.selected ? SELECT_STATE : NORMAL_STATE] || seriesPointAttr;
              radius = pointAttr.r;
              symbol = pick(pointMarkerOptions.symbol, series.symbol);
              isImage = symbol.indexOf('url') === 0;
              if (graphic) {
                graphic[isInside ? 'show' : 'hide'](true).attr(pointAttr).animate(extend({
                  x: plotX - radius,
                  y: plotY - radius
                }, graphic.symbolName ? {
                  width: 2 * radius,
                  height: 2 * radius
                } : {}));
              } else if (isInside && (radius > 0 || isImage)) {
                point.graphic = graphic = chart.renderer.symbol(symbol, plotX - radius, plotY - radius, 2 * radius, 2 * radius, hasPointMarker ? pointMarkerOptions : seriesMarkerOptions).attr(pointAttr).add(markerGroup);
              }
            } else if (graphic) {
              point.graphic = graphic.destroy();
            }
          }
        }
      },
      convertAttribs: function(options, base1, base2, base3) {
        var conversion = this.pointAttrToOptions,
            attr,
            option,
            obj = {};
        options = options || {};
        base1 = base1 || {};
        base2 = base2 || {};
        base3 = base3 || {};
        for (attr in conversion) {
          option = conversion[attr];
          obj[attr] = pick(options[option], base1[attr], base2[attr], base3[attr]);
        }
        return obj;
      },
      getAttribs: function() {
        var series = this,
            seriesOptions = series.options,
            normalOptions = defaultPlotOptions[series.type].marker ? seriesOptions.marker : seriesOptions,
            stateOptions = normalOptions.states,
            stateOptionsHover = stateOptions[HOVER_STATE],
            pointStateOptionsHover,
            seriesColor = series.color,
            seriesNegativeColor = series.options.negativeColor,
            normalDefaults = {
              stroke: seriesColor,
              fill: seriesColor
            },
            points = series.points || [],
            i,
            j,
            threshold,
            point,
            seriesPointAttr = [],
            pointAttr,
            pointAttrToOptions = series.pointAttrToOptions,
            hasPointSpecificOptions = series.hasPointSpecificOptions,
            defaultLineColor = normalOptions.lineColor,
            defaultFillColor = normalOptions.fillColor,
            turboThreshold = seriesOptions.turboThreshold,
            zones = series.zones,
            zoneAxis = series.zoneAxis || 'y',
            zoneColor,
            attr,
            key;
        if (seriesOptions.marker) {
          stateOptionsHover.radius = stateOptionsHover.radius || normalOptions.radius + stateOptionsHover.radiusPlus;
          stateOptionsHover.lineWidth = stateOptionsHover.lineWidth || normalOptions.lineWidth + stateOptionsHover.lineWidthPlus;
        } else {
          stateOptionsHover.color = stateOptionsHover.color || Color(stateOptionsHover.color || seriesColor).brighten(stateOptionsHover.brightness).get();
          stateOptionsHover.negativeColor = stateOptionsHover.negativeColor || Color(stateOptionsHover.negativeColor || seriesNegativeColor).brighten(stateOptionsHover.brightness).get();
        }
        seriesPointAttr[NORMAL_STATE] = series.convertAttribs(normalOptions, normalDefaults);
        each([HOVER_STATE, SELECT_STATE], function(state) {
          seriesPointAttr[state] = series.convertAttribs(stateOptions[state], seriesPointAttr[NORMAL_STATE]);
        });
        series.pointAttr = seriesPointAttr;
        i = points.length;
        if (!turboThreshold || i < turboThreshold || hasPointSpecificOptions) {
          while (i--) {
            point = points[i];
            normalOptions = (point.options && point.options.marker) || point.options;
            if (normalOptions && normalOptions.enabled === false) {
              normalOptions.radius = 0;
            }
            zoneColor = null;
            if (zones.length) {
              j = 0;
              threshold = zones[j];
              while (point[zoneAxis] >= threshold.value) {
                threshold = zones[++j];
              }
              point.color = point.fillColor = zoneColor = pick(threshold.color, series.color);
            }
            hasPointSpecificOptions = seriesOptions.colorByPoint || point.color;
            if (point.options) {
              for (key in pointAttrToOptions) {
                if (defined(normalOptions[pointAttrToOptions[key]])) {
                  hasPointSpecificOptions = true;
                }
              }
            }
            if (hasPointSpecificOptions) {
              normalOptions = normalOptions || {};
              pointAttr = [];
              stateOptions = normalOptions.states || {};
              pointStateOptionsHover = stateOptions[HOVER_STATE] = stateOptions[HOVER_STATE] || {};
              if (!seriesOptions.marker || (point.negative && !pointStateOptionsHover.fillColor && !stateOptionsHover.fillColor)) {
                pointStateOptionsHover[series.pointAttrToOptions.fill] = pointStateOptionsHover.color || (!point.options.color && stateOptionsHover[(point.negative && seriesNegativeColor ? 'negativeColor' : 'color')]) || Color(point.color).brighten(pointStateOptionsHover.brightness || stateOptionsHover.brightness).get();
              }
              attr = {color: point.color};
              if (!defaultFillColor) {
                attr.fillColor = point.color;
              }
              if (!defaultLineColor) {
                attr.lineColor = point.color;
              }
              if (normalOptions.hasOwnProperty('color') && !normalOptions.color) {
                delete normalOptions.color;
              }
              if (zoneColor && !stateOptionsHover.fillColor) {
                pointStateOptionsHover.fillColor = zoneColor;
              }
              pointAttr[NORMAL_STATE] = series.convertAttribs(extend(attr, normalOptions), seriesPointAttr[NORMAL_STATE]);
              pointAttr[HOVER_STATE] = series.convertAttribs(stateOptions[HOVER_STATE], seriesPointAttr[HOVER_STATE], pointAttr[NORMAL_STATE]);
              pointAttr[SELECT_STATE] = series.convertAttribs(stateOptions[SELECT_STATE], seriesPointAttr[SELECT_STATE], pointAttr[NORMAL_STATE]);
            } else {
              pointAttr = seriesPointAttr;
            }
            point.pointAttr = pointAttr;
          }
        }
      },
      destroy: function() {
        var series = this,
            chart = series.chart,
            issue134 = /AppleWebKit\/533/.test(userAgent),
            destroy,
            i,
            data = series.data || [],
            point,
            prop,
            axis;
        fireEvent(series, 'destroy');
        removeEvent(series);
        each(series.axisTypes || [], function(AXIS) {
          axis = series[AXIS];
          if (axis) {
            erase(axis.series, series);
            axis.isDirty = axis.forceRedraw = true;
          }
        });
        if (series.legendItem) {
          series.chart.legend.destroyItem(series);
        }
        i = data.length;
        while (i--) {
          point = data[i];
          if (point && point.destroy) {
            point.destroy();
          }
        }
        series.points = null;
        clearTimeout(series.animationTimeout);
        for (prop in series) {
          if (series[prop] instanceof SVGElement && !series[prop].survive) {
            destroy = issue134 && prop === 'group' ? 'hide' : 'destroy';
            series[prop][destroy]();
          }
        }
        if (chart.hoverSeries === series) {
          chart.hoverSeries = null;
        }
        erase(chart.series, series);
        for (prop in series) {
          delete series[prop];
        }
      },
      getGraphPath: function(points, nullsAsZeroes, connectCliffs) {
        var series = this,
            options = series.options,
            step = options.step,
            reversed,
            graphPath = [],
            gap;
        points = points || series.points;
        reversed = points.reversed;
        if (reversed) {
          points.reverse();
        }
        step = {
          right: 1,
          center: 2
        }[step] || (step && 3);
        if (step && reversed) {
          step = 4 - step;
        }
        if (options.connectNulls && !nullsAsZeroes && !connectCliffs) {
          points = this.getValidPoints(points);
        }
        each(points, function(point, i) {
          var plotX = point.plotX,
              plotY = point.plotY,
              lastPoint = points[i - 1],
              pathToPoint;
          if ((point.leftCliff || (lastPoint && lastPoint.rightCliff)) && !connectCliffs) {
            gap = true;
          }
          if (point.isNull && !defined(nullsAsZeroes) && i > 0) {
            gap = !options.connectNulls;
          } else if (point.isNull && !nullsAsZeroes) {
            gap = true;
          } else {
            if (i === 0 || gap) {
              pathToPoint = [M, point.plotX, point.plotY];
            } else if (series.getPointSpline) {
              pathToPoint = series.getPointSpline(points, point, i);
            } else if (step) {
              if (step === 1) {
                pathToPoint = [L, lastPoint.plotX, plotY];
              } else if (step === 2) {
                pathToPoint = [L, (lastPoint.plotX + plotX) / 2, lastPoint.plotY, L, (lastPoint.plotX + plotX) / 2, plotY];
              } else {
                pathToPoint = [L, plotX, lastPoint.plotY];
              }
              pathToPoint.push(L, plotX, plotY);
            } else {
              pathToPoint = [L, plotX, plotY];
            }
            graphPath.push.apply(graphPath, pathToPoint);
            gap = false;
          }
        });
        series.graphPath = graphPath;
        return graphPath;
      },
      drawGraph: function() {
        var series = this,
            options = this.options,
            props = [['graph', options.lineColor || this.color, options.dashStyle]],
            lineWidth = options.lineWidth,
            roundCap = options.linecap !== 'square',
            graphPath = (this.gappedPath || this.getGraphPath).call(this),
            fillColor = (this.fillGraph && this.color) || NONE,
            zones = this.zones;
        each(zones, function(threshold, i) {
          props.push(['zoneGraph' + i, threshold.color || series.color, threshold.dashStyle || options.dashStyle]);
        });
        each(props, function(prop, i) {
          var graphKey = prop[0],
              graph = series[graphKey],
              attribs;
          if (graph) {
            graph.animate({d: graphPath});
          } else if ((lineWidth || fillColor) && graphPath.length) {
            attribs = {
              stroke: prop[1],
              'stroke-width': lineWidth,
              fill: fillColor,
              zIndex: 1
            };
            if (prop[2]) {
              attribs.dashstyle = prop[2];
            } else if (roundCap) {
              attribs['stroke-linecap'] = attribs['stroke-linejoin'] = 'round';
            }
            series[graphKey] = series.chart.renderer.path(graphPath).attr(attribs).add(series.group).shadow((i < 2) && options.shadow);
          }
        });
      },
      applyZones: function() {
        var series = this,
            chart = this.chart,
            renderer = chart.renderer,
            zones = this.zones,
            translatedFrom,
            translatedTo,
            clips = this.clips || [],
            clipAttr,
            graph = this.graph,
            area = this.area,
            chartSizeMax = mathMax(chart.chartWidth, chart.chartHeight),
            axis = this[(this.zoneAxis || 'y') + 'Axis'],
            extremes,
            reversed = axis.reversed,
            inverted = chart.inverted,
            horiz = axis.horiz,
            pxRange,
            pxPosMin,
            pxPosMax,
            ignoreZones = false;
        if (zones.length && (graph || area) && axis.min !== UNDEFINED) {
          if (graph) {
            graph.hide();
          }
          if (area) {
            area.hide();
          }
          extremes = axis.getExtremes();
          each(zones, function(threshold, i) {
            translatedFrom = reversed ? (horiz ? chart.plotWidth : 0) : (horiz ? 0 : axis.toPixels(extremes.min));
            translatedFrom = mathMin(mathMax(pick(translatedTo, translatedFrom), 0), chartSizeMax);
            translatedTo = mathMin(mathMax(mathRound(axis.toPixels(pick(threshold.value, extremes.max), true)), 0), chartSizeMax);
            if (ignoreZones) {
              translatedFrom = translatedTo = axis.toPixels(extremes.max);
            }
            pxRange = Math.abs(translatedFrom - translatedTo);
            pxPosMin = mathMin(translatedFrom, translatedTo);
            pxPosMax = mathMax(translatedFrom, translatedTo);
            if (axis.isXAxis) {
              clipAttr = {
                x: inverted ? pxPosMax : pxPosMin,
                y: 0,
                width: pxRange,
                height: chartSizeMax
              };
              if (!horiz) {
                clipAttr.x = chart.plotHeight - clipAttr.x;
              }
            } else {
              clipAttr = {
                x: 0,
                y: inverted ? pxPosMax : pxPosMin,
                width: chartSizeMax,
                height: pxRange
              };
              if (horiz) {
                clipAttr.y = chart.plotWidth - clipAttr.y;
              }
            }
            if (chart.inverted && renderer.isVML) {
              if (axis.isXAxis) {
                clipAttr = {
                  x: 0,
                  y: reversed ? pxPosMin : pxPosMax,
                  height: clipAttr.width,
                  width: chart.chartWidth
                };
              } else {
                clipAttr = {
                  x: clipAttr.y - chart.plotLeft - chart.spacingBox.x,
                  y: 0,
                  width: clipAttr.height,
                  height: chart.chartHeight
                };
              }
            }
            if (clips[i]) {
              clips[i].animate(clipAttr);
            } else {
              clips[i] = renderer.clipRect(clipAttr);
              if (graph) {
                series['zoneGraph' + i].clip(clips[i]);
              }
              if (area) {
                series['zoneArea' + i].clip(clips[i]);
              }
            }
            ignoreZones = threshold.value > extremes.max;
          });
          this.clips = clips;
        }
      },
      invertGroups: function() {
        var series = this,
            chart = series.chart;
        if (!series.xAxis) {
          return;
        }
        function setInvert() {
          var size = {
            width: series.yAxis.len,
            height: series.xAxis.len
          };
          each(['group', 'markerGroup'], function(groupName) {
            if (series[groupName]) {
              series[groupName].attr(size).invert();
            }
          });
        }
        addEvent(chart, 'resize', setInvert);
        addEvent(series, 'destroy', function() {
          removeEvent(chart, 'resize', setInvert);
        });
        setInvert();
        series.invertGroups = setInvert;
      },
      plotGroup: function(prop, name, visibility, zIndex, parent) {
        var group = this[prop],
            isNew = !group;
        if (isNew) {
          this[prop] = group = this.chart.renderer.g(name).attr({zIndex: zIndex || 0.1}).add(parent);
          group.addClass('highcharts-series-' + this.index);
        }
        group.attr({visibility: visibility})[isNew ? 'attr' : 'animate'](this.getPlotBox());
        return group;
      },
      getPlotBox: function() {
        var chart = this.chart,
            xAxis = this.xAxis,
            yAxis = this.yAxis;
        if (chart.inverted) {
          xAxis = yAxis;
          yAxis = this.xAxis;
        }
        return {
          translateX: xAxis ? xAxis.left : chart.plotLeft,
          translateY: yAxis ? yAxis.top : chart.plotTop,
          scaleX: 1,
          scaleY: 1
        };
      },
      render: function() {
        var series = this,
            chart = series.chart,
            group,
            options = series.options,
            animDuration = !!series.animate && chart.renderer.isSVG && animObject(options.animation).duration,
            visibility = series.visible ? 'inherit' : 'hidden',
            zIndex = options.zIndex,
            hasRendered = series.hasRendered,
            chartSeriesGroup = chart.seriesGroup;
        group = series.plotGroup('group', 'series', visibility, zIndex, chartSeriesGroup);
        series.markerGroup = series.plotGroup('markerGroup', 'markers', visibility, zIndex, chartSeriesGroup);
        if (animDuration) {
          series.animate(true);
        }
        series.getAttribs();
        group.inverted = series.isCartesian ? chart.inverted : false;
        if (series.drawGraph) {
          series.drawGraph();
          series.applyZones();
        }
        each(series.points, function(point) {
          if (point.redraw) {
            point.redraw();
          }
        });
        if (series.drawDataLabels) {
          series.drawDataLabels();
        }
        if (series.visible) {
          series.drawPoints();
        }
        if (series.drawTracker && series.options.enableMouseTracking !== false) {
          series.drawTracker();
        }
        if (chart.inverted) {
          series.invertGroups();
        }
        if (options.clip !== false && !series.sharedClipKey && !hasRendered) {
          group.clip(chart.clipRect);
        }
        if (animDuration) {
          series.animate();
        }
        if (!hasRendered) {
          series.animationTimeout = syncTimeout(function() {
            series.afterAnimate();
          }, animDuration);
        }
        series.isDirty = series.isDirtyData = false;
        series.hasRendered = true;
      },
      redraw: function() {
        var series = this,
            chart = series.chart,
            wasDirty = series.isDirty || series.isDirtyData,
            group = series.group,
            xAxis = series.xAxis,
            yAxis = series.yAxis;
        if (group) {
          if (chart.inverted) {
            group.attr({
              width: chart.plotWidth,
              height: chart.plotHeight
            });
          }
          group.animate({
            translateX: pick(xAxis && xAxis.left, chart.plotLeft),
            translateY: pick(yAxis && yAxis.top, chart.plotTop)
          });
        }
        series.translate();
        series.render();
        if (wasDirty) {
          delete this.kdTree;
        }
      },
      kdDimensions: 1,
      kdAxisArray: ['clientX', 'plotY'],
      searchPoint: function(e, compareX) {
        var series = this,
            xAxis = series.xAxis,
            yAxis = series.yAxis,
            inverted = series.chart.inverted;
        return this.searchKDTree({
          clientX: inverted ? xAxis.len - e.chartY + xAxis.pos : e.chartX - xAxis.pos,
          plotY: inverted ? yAxis.len - e.chartX + yAxis.pos : e.chartY - yAxis.pos
        }, compareX);
      },
      buildKDTree: function() {
        var series = this,
            dimensions = series.kdDimensions;
        function _kdtree(points, depth, dimensions) {
          var axis,
              median,
              length = points && points.length;
          if (length) {
            axis = series.kdAxisArray[depth % dimensions];
            points.sort(function(a, b) {
              return a[axis] - b[axis];
            });
            median = Math.floor(length / 2);
            return {
              point: points[median],
              left: _kdtree(points.slice(0, median), depth + 1, dimensions),
              right: _kdtree(points.slice(median + 1), depth + 1, dimensions)
            };
          }
        }
        function startRecursive() {
          series.kdTree = _kdtree(series.getValidPoints(null, !series.directTouch), dimensions, dimensions);
        }
        delete series.kdTree;
        syncTimeout(startRecursive, series.options.kdNow ? 0 : 1);
      },
      searchKDTree: function(point, compareX) {
        var series = this,
            kdX = this.kdAxisArray[0],
            kdY = this.kdAxisArray[1],
            kdComparer = compareX ? 'distX' : 'dist';
        function setDistance(p1, p2) {
          var x = (defined(p1[kdX]) && defined(p2[kdX])) ? Math.pow(p1[kdX] - p2[kdX], 2) : null,
              y = (defined(p1[kdY]) && defined(p2[kdY])) ? Math.pow(p1[kdY] - p2[kdY], 2) : null,
              r = (x || 0) + (y || 0);
          p2.dist = defined(r) ? Math.sqrt(r) : Number.MAX_VALUE;
          p2.distX = defined(x) ? Math.sqrt(x) : Number.MAX_VALUE;
        }
        function _search(search, tree, depth, dimensions) {
          var point = tree.point,
              axis = series.kdAxisArray[depth % dimensions],
              tdist,
              sideA,
              sideB,
              ret = point,
              nPoint1,
              nPoint2;
          setDistance(search, point);
          tdist = search[axis] - point[axis];
          sideA = tdist < 0 ? 'left' : 'right';
          sideB = tdist < 0 ? 'right' : 'left';
          if (tree[sideA]) {
            nPoint1 = _search(search, tree[sideA], depth + 1, dimensions);
            ret = (nPoint1[kdComparer] < ret[kdComparer] ? nPoint1 : point);
          }
          if (tree[sideB]) {
            if (Math.sqrt(tdist * tdist) < ret[kdComparer]) {
              nPoint2 = _search(search, tree[sideB], depth + 1, dimensions);
              ret = (nPoint2[kdComparer] < ret[kdComparer] ? nPoint2 : ret);
            }
          }
          return ret;
        }
        if (!this.kdTree) {
          this.buildKDTree();
        }
        if (this.kdTree) {
          return _search(point, this.kdTree, this.kdDimensions, this.kdDimensions);
        }
      }
    };
    function StackItem(axis, options, isNegative, x, stackOption) {
      var inverted = axis.chart.inverted;
      this.axis = axis;
      this.isNegative = isNegative;
      this.options = options;
      this.x = x;
      this.total = null;
      this.points = {};
      this.stack = stackOption;
      this.leftCliff = 0;
      this.rightCliff = 0;
      this.alignOptions = {
        align: options.align || (inverted ? (isNegative ? 'left' : 'right') : 'center'),
        verticalAlign: options.verticalAlign || (inverted ? 'middle' : (isNegative ? 'bottom' : 'top')),
        y: pick(options.y, inverted ? 4 : (isNegative ? 14 : -6)),
        x: pick(options.x, inverted ? (isNegative ? -6 : 6) : 0)
      };
      this.textAlign = options.textAlign || (inverted ? (isNegative ? 'right' : 'left') : 'center');
    }
    StackItem.prototype = {
      destroy: function() {
        destroyObjectProperties(this, this.axis);
      },
      render: function(group) {
        var options = this.options,
            formatOption = options.format,
            str = formatOption ? format(formatOption, this) : options.formatter.call(this);
        if (this.label) {
          this.label.attr({
            text: str,
            visibility: 'hidden'
          });
        } else {
          this.label = this.axis.chart.renderer.text(str, null, null, options.useHTML).css(options.style).attr({
            align: this.textAlign,
            rotation: options.rotation,
            visibility: HIDDEN
          }).add(group);
        }
      },
      setOffset: function(xOffset, xWidth) {
        var stackItem = this,
            axis = stackItem.axis,
            chart = axis.chart,
            inverted = chart.inverted,
            reversed = axis.reversed,
            neg = (this.isNegative && !reversed) || (!this.isNegative && reversed),
            y = axis.translate(axis.usePercentage ? 100 : this.total, 0, 0, 0, 1),
            yZero = axis.translate(0),
            h = mathAbs(y - yZero),
            x = chart.xAxis[0].translate(this.x) + xOffset,
            plotHeight = chart.plotHeight,
            stackBox = {
              x: inverted ? (neg ? y : y - h) : x,
              y: inverted ? plotHeight - x - xWidth : (neg ? (plotHeight - y - h) : plotHeight - y),
              width: inverted ? h : xWidth,
              height: inverted ? xWidth : h
            },
            label = this.label,
            alignAttr;
        if (label) {
          label.align(this.alignOptions, null, stackBox);
          alignAttr = label.alignAttr;
          label[this.options.crop === false || chart.isInsidePlot(alignAttr.x, alignAttr.y) ? 'show' : 'hide'](true);
        }
      }
    };
    Chart.prototype.getStacks = function() {
      var chart = this;
      each(chart.yAxis, function(axis) {
        if (axis.stacks && axis.hasVisibleSeries) {
          axis.oldStacks = axis.stacks;
        }
      });
      each(chart.series, function(series) {
        if (series.options.stacking && (series.visible === true || chart.options.chart.ignoreHiddenSeries === false)) {
          series.stackKey = series.type + pick(series.options.stack, '');
        }
      });
    };
    Axis.prototype.buildStacks = function() {
      var axisSeries = this.series,
          series,
          reversedStacks = pick(this.options.reversedStacks, true),
          len = axisSeries.length,
          i;
      if (!this.isXAxis) {
        this.usePercentage = false;
        i = len;
        while (i--) {
          axisSeries[reversedStacks ? i : len - i - 1].setStackedPoints();
        }
        i = len;
        while (i--) {
          series = axisSeries[reversedStacks ? i : len - i - 1];
          if (series.setStackCliffs) {
            series.setStackCliffs();
          }
        }
        if (this.usePercentage) {
          for (i = 0; i < len; i++) {
            axisSeries[i].setPercentStacks();
          }
        }
      }
    };
    Axis.prototype.renderStackTotals = function() {
      var axis = this,
          chart = axis.chart,
          renderer = chart.renderer,
          stacks = axis.stacks,
          stackKey,
          oneStack,
          stackCategory,
          stackTotalGroup = axis.stackTotalGroup;
      if (!stackTotalGroup) {
        axis.stackTotalGroup = stackTotalGroup = renderer.g('stack-labels').attr({
          visibility: VISIBLE,
          zIndex: 6
        }).add();
      }
      stackTotalGroup.translate(chart.plotLeft, chart.plotTop);
      for (stackKey in stacks) {
        oneStack = stacks[stackKey];
        for (stackCategory in oneStack) {
          oneStack[stackCategory].render(stackTotalGroup);
        }
      }
    };
    Axis.prototype.resetStacks = function() {
      var stacks = this.stacks,
          type,
          i;
      if (!this.isXAxis) {
        for (type in stacks) {
          for (i in stacks[type]) {
            if (stacks[type][i].touched < this.stacksTouched) {
              stacks[type][i].destroy();
              delete stacks[type][i];
            } else {
              stacks[type][i].total = null;
              stacks[type][i].cum = 0;
            }
          }
        }
      }
    };
    Axis.prototype.cleanStacks = function() {
      var stacks,
          type,
          i;
      if (!this.isXAxis) {
        if (this.oldStacks) {
          stacks = this.stacks = this.oldStacks;
        }
        for (type in stacks) {
          for (i in stacks[type]) {
            stacks[type][i].cum = stacks[type][i].total;
          }
        }
      }
    };
    Series.prototype.setStackedPoints = function() {
      if (!this.options.stacking || (this.visible !== true && this.chart.options.chart.ignoreHiddenSeries !== false)) {
        return;
      }
      var series = this,
          xData = series.processedXData,
          yData = series.processedYData,
          stackedYData = [],
          yDataLength = yData.length,
          seriesOptions = series.options,
          threshold = seriesOptions.threshold,
          stackThreshold = seriesOptions.startFromThreshold ? threshold : 0,
          stackOption = seriesOptions.stack,
          stacking = seriesOptions.stacking,
          stackKey = series.stackKey,
          negKey = '-' + stackKey,
          negStacks = series.negStacks,
          yAxis = series.yAxis,
          stacks = yAxis.stacks,
          oldStacks = yAxis.oldStacks,
          stackIndicator,
          isNegative,
          stack,
          other,
          key,
          pointKey,
          i,
          x,
          y;
      yAxis.stacksTouched += 1;
      for (i = 0; i < yDataLength; i++) {
        x = xData[i];
        y = yData[i];
        stackIndicator = series.getStackIndicator(stackIndicator, x, series.index);
        pointKey = stackIndicator.key;
        isNegative = negStacks && y < (stackThreshold ? 0 : threshold);
        key = isNegative ? negKey : stackKey;
        if (!stacks[key]) {
          stacks[key] = {};
        }
        if (!stacks[key][x]) {
          if (oldStacks[key] && oldStacks[key][x]) {
            stacks[key][x] = oldStacks[key][x];
            stacks[key][x].total = null;
          } else {
            stacks[key][x] = new StackItem(yAxis, yAxis.options.stackLabels, isNegative, x, stackOption);
          }
        }
        stack = stacks[key][x];
        if (y !== null) {
          stack.points[pointKey] = stack.points[series.index] = [pick(stack.cum, stackThreshold)];
          stack.touched = yAxis.stacksTouched;
          if (stackIndicator.index > 0 && series.singleStacks === false) {
            stack.points[pointKey][0] = stack.points[series.index + ',' + x + ',0'][0];
          }
        }
        if (stacking === 'percent') {
          other = isNegative ? stackKey : negKey;
          if (negStacks && stacks[other] && stacks[other][x]) {
            other = stacks[other][x];
            stack.total = other.total = mathMax(other.total, stack.total) + mathAbs(y) || 0;
          } else {
            stack.total = correctFloat(stack.total + (mathAbs(y) || 0));
          }
        } else {
          stack.total = correctFloat(stack.total + (y || 0));
        }
        stack.cum = pick(stack.cum, stackThreshold) + (y || 0);
        if (y !== null) {
          stack.points[pointKey].push(stack.cum);
          stackedYData[i] = stack.cum;
        }
      }
      if (stacking === 'percent') {
        yAxis.usePercentage = true;
      }
      this.stackedYData = stackedYData;
      yAxis.oldStacks = {};
    };
    Series.prototype.setPercentStacks = function() {
      var series = this,
          stackKey = series.stackKey,
          stacks = series.yAxis.stacks,
          processedXData = series.processedXData,
          stackIndicator;
      each([stackKey, '-' + stackKey], function(key) {
        var i = processedXData.length,
            x,
            stack,
            pointExtremes,
            totalFactor;
        while (i--) {
          x = processedXData[i];
          stackIndicator = series.getStackIndicator(stackIndicator, x, series.index);
          stack = stacks[key] && stacks[key][x];
          pointExtremes = stack && stack.points[stackIndicator.key];
          if (pointExtremes) {
            totalFactor = stack.total ? 100 / stack.total : 0;
            pointExtremes[0] = correctFloat(pointExtremes[0] * totalFactor);
            pointExtremes[1] = correctFloat(pointExtremes[1] * totalFactor);
            series.stackedYData[i] = pointExtremes[1];
          }
        }
      });
    };
    Series.prototype.getStackIndicator = function(stackIndicator, x, index) {
      if (!defined(stackIndicator) || stackIndicator.x !== x) {
        stackIndicator = {
          x: x,
          index: 0
        };
      } else {
        stackIndicator.index++;
      }
      stackIndicator.key = [index, x, stackIndicator.index].join(',');
      return stackIndicator;
    };
    extend(Chart.prototype, {
      addSeries: function(options, redraw, animation) {
        var series,
            chart = this;
        if (options) {
          redraw = pick(redraw, true);
          fireEvent(chart, 'addSeries', {options: options}, function() {
            series = chart.initSeries(options);
            chart.isDirtyLegend = true;
            chart.linkSeries();
            if (redraw) {
              chart.redraw(animation);
            }
          });
        }
        return series;
      },
      addAxis: function(options, isX, redraw, animation) {
        var key = isX ? 'xAxis' : 'yAxis',
            chartOptions = this.options,
            userOptions = merge(options, {
              index: this[key].length,
              isX: isX
            });
        new Axis(this, userOptions);
        chartOptions[key] = splat(chartOptions[key] || {});
        chartOptions[key].push(userOptions);
        if (pick(redraw, true)) {
          this.redraw(animation);
        }
      },
      showLoading: function(str) {
        var chart = this,
            options = chart.options,
            loadingDiv = chart.loadingDiv,
            loadingOptions = options.loading,
            setLoadingSize = function() {
              if (loadingDiv) {
                css(loadingDiv, {
                  left: chart.plotLeft + PX,
                  top: chart.plotTop + PX,
                  width: chart.plotWidth + PX,
                  height: chart.plotHeight + PX
                });
              }
            };
        if (!loadingDiv) {
          chart.loadingDiv = loadingDiv = createElement(DIV, {className: PREFIX + 'loading'}, extend(loadingOptions.style, {
            zIndex: 10,
            display: NONE
          }), chart.container);
          chart.loadingSpan = createElement('span', null, loadingOptions.labelStyle, loadingDiv);
          addEvent(chart, 'redraw', setLoadingSize);
        }
        chart.loadingSpan.innerHTML = str || options.lang.loading;
        if (!chart.loadingShown) {
          css(loadingDiv, {
            opacity: 0,
            display: ''
          });
          animate(loadingDiv, {opacity: loadingOptions.style.opacity}, {duration: loadingOptions.showDuration || 0});
          chart.loadingShown = true;
        }
        setLoadingSize();
      },
      hideLoading: function() {
        var options = this.options,
            loadingDiv = this.loadingDiv;
        if (loadingDiv) {
          animate(loadingDiv, {opacity: 0}, {
            duration: options.loading.hideDuration || 100,
            complete: function() {
              css(loadingDiv, {display: NONE});
            }
          });
        }
        this.loadingShown = false;
      }
    });
    extend(Point.prototype, {
      update: function(options, redraw, animation, runEvent) {
        var point = this,
            series = point.series,
            graphic = point.graphic,
            i,
            chart = series.chart,
            seriesOptions = series.options,
            names = series.xAxis && series.xAxis.names;
        redraw = pick(redraw, true);
        function update() {
          point.applyOptions(options);
          if (point.y === null && graphic) {
            point.graphic = graphic.destroy();
          }
          if (isObject(options) && !isArray(options)) {
            point.redraw = function() {
              if (graphic && graphic.element) {
                if (options && options.marker && options.marker.symbol) {
                  point.graphic = graphic.destroy();
                }
              }
              if (options && options.dataLabels && point.dataLabel) {
                point.dataLabel = point.dataLabel.destroy();
              }
              point.redraw = null;
            };
          }
          i = point.index;
          series.updateParallelArrays(point, i);
          if (names && point.name) {
            names[point.x] = point.name;
          }
          seriesOptions.data[i] = (isObject(seriesOptions.data[i]) && !isArray(seriesOptions.data[i])) ? point.options : options;
          series.isDirty = series.isDirtyData = true;
          if (!series.fixedBox && series.hasCartesianSeries) {
            chart.isDirtyBox = true;
          }
          if (seriesOptions.legendType === 'point') {
            chart.isDirtyLegend = true;
          }
          if (redraw) {
            chart.redraw(animation);
          }
        }
        if (runEvent === false) {
          update();
        } else {
          point.firePointEvent('update', {options: options}, update);
        }
      },
      remove: function(redraw, animation) {
        this.series.removePoint(inArray(this, this.series.data), redraw, animation);
      }
    });
    extend(Series.prototype, {
      addPoint: function(options, redraw, shift, animation) {
        var series = this,
            seriesOptions = series.options,
            data = series.data,
            graph = series.graph,
            area = series.area,
            chart = series.chart,
            names = series.xAxis && series.xAxis.names,
            currentShift = (graph && graph.shift) || 0,
            shiftShapes = ['graph', 'area'],
            dataOptions = seriesOptions.data,
            point,
            isInTheMiddle,
            xData = series.xData,
            i,
            x;
        setAnimation(animation, chart);
        if (shift) {
          i = series.zones.length;
          while (i--) {
            shiftShapes.push('zoneGraph' + i, 'zoneArea' + i);
          }
          each(shiftShapes, function(shape) {
            if (series[shape]) {
              series[shape].shift = currentShift + (seriesOptions.step ? 2 : 1);
            }
          });
        }
        if (area) {
          area.isArea = true;
        }
        redraw = pick(redraw, true);
        point = {series: series};
        series.pointClass.prototype.applyOptions.apply(point, [options]);
        x = point.x;
        i = xData.length;
        if (series.requireSorting && x < xData[i - 1]) {
          isInTheMiddle = true;
          while (i && xData[i - 1] > x) {
            i--;
          }
        }
        series.updateParallelArrays(point, 'splice', i, 0, 0);
        series.updateParallelArrays(point, i);
        if (names && point.name) {
          names[x] = point.name;
        }
        dataOptions.splice(i, 0, options);
        if (isInTheMiddle) {
          series.data.splice(i, 0, null);
          series.processData();
        }
        if (seriesOptions.legendType === 'point') {
          series.generatePoints();
        }
        if (shift) {
          if (data[0] && data[0].remove) {
            data[0].remove(false);
          } else {
            data.shift();
            series.updateParallelArrays(point, 'shift');
            dataOptions.shift();
          }
        }
        series.isDirty = true;
        series.isDirtyData = true;
        if (redraw) {
          series.getAttribs();
          chart.redraw();
        }
      },
      removePoint: function(i, redraw, animation) {
        var series = this,
            data = series.data,
            point = data[i],
            points = series.points,
            chart = series.chart,
            remove = function() {
              if (points && points.length === data.length) {
                points.splice(i, 1);
              }
              data.splice(i, 1);
              series.options.data.splice(i, 1);
              series.updateParallelArrays(point || {series: series}, 'splice', i, 1);
              if (point) {
                point.destroy();
              }
              series.isDirty = true;
              series.isDirtyData = true;
              if (redraw) {
                chart.redraw();
              }
            };
        setAnimation(animation, chart);
        redraw = pick(redraw, true);
        if (point) {
          point.firePointEvent('remove', null, remove);
        } else {
          remove();
        }
      },
      remove: function(redraw, animation) {
        var series = this,
            chart = series.chart;
        fireEvent(series, 'remove', null, function() {
          series.destroy();
          chart.isDirtyLegend = chart.isDirtyBox = true;
          chart.linkSeries();
          if (pick(redraw, true)) {
            chart.redraw(animation);
          }
        });
      },
      update: function(newOptions, redraw) {
        var series = this,
            chart = this.chart,
            oldOptions = this.userOptions,
            oldType = this.type,
            proto = seriesTypes[oldType].prototype,
            preserve = ['group', 'markerGroup', 'dataLabelsGroup'],
            n;
        if ((newOptions.type && newOptions.type !== oldType) || newOptions.zIndex !== undefined) {
          preserve.length = 0;
        }
        each(preserve, function(prop) {
          preserve[prop] = series[prop];
          delete series[prop];
        });
        newOptions = merge(oldOptions, {
          animation: false,
          index: this.index,
          pointStart: this.xData[0]
        }, {data: this.options.data}, newOptions);
        this.remove(false);
        for (n in proto) {
          this[n] = UNDEFINED;
        }
        extend(this, seriesTypes[newOptions.type || oldType].prototype);
        each(preserve, function(prop) {
          series[prop] = preserve[prop];
        });
        this.init(chart, newOptions);
        chart.linkSeries();
        if (pick(redraw, true)) {
          chart.redraw(false);
        }
      }
    });
    extend(Axis.prototype, {
      update: function(newOptions, redraw) {
        var chart = this.chart;
        newOptions = chart.options[this.coll][this.options.index] = merge(this.userOptions, newOptions);
        this.destroy(true);
        this._addedPlotLB = this.chart._labelPanes = UNDEFINED;
        this.init(chart, extend(newOptions, {events: UNDEFINED}));
        chart.isDirtyBox = true;
        if (pick(redraw, true)) {
          chart.redraw();
        }
      },
      remove: function(redraw) {
        var chart = this.chart,
            key = this.coll,
            axisSeries = this.series,
            i = axisSeries.length;
        while (i--) {
          if (axisSeries[i]) {
            axisSeries[i].remove(false);
          }
        }
        erase(chart.axes, this);
        erase(chart[key], this);
        chart.options[key].splice(this.options.index, 1);
        each(chart[key], function(axis, i) {
          axis.options.index = i;
        });
        this.destroy();
        chart.isDirtyBox = true;
        if (pick(redraw, true)) {
          chart.redraw();
        }
      },
      setTitle: function(newTitleOptions, redraw) {
        this.update({title: newTitleOptions}, redraw);
      },
      setCategories: function(categories, redraw) {
        this.update({categories: categories}, redraw);
      }
    });
    var LineSeries = extendClass(Series);
    seriesTypes.line = LineSeries;
    defaultPlotOptions.area = merge(defaultSeriesOptions, {
      softThreshold: false,
      threshold: 0
    });
    var AreaSeries = extendClass(Series, {
      type: 'area',
      singleStacks: false,
      getStackPoints: function() {
        var series = this,
            segment = [],
            keys = [],
            xAxis = this.xAxis,
            yAxis = this.yAxis,
            stack = yAxis.stacks[this.stackKey],
            pointMap = {},
            points = this.points,
            seriesIndex = series.index,
            yAxisSeries = yAxis.series,
            seriesLength = yAxisSeries.length,
            visibleSeries,
            upOrDown = pick(yAxis.options.reversedStacks, true) ? 1 : -1,
            i,
            x;
        if (this.options.stacking) {
          for (i = 0; i < points.length; i++) {
            pointMap[points[i].x] = points[i];
          }
          for (x in stack) {
            if (stack[x].total !== null) {
              keys.push(x);
            }
          }
          keys.sort(function(a, b) {
            return a - b;
          });
          visibleSeries = map(yAxisSeries, function() {
            return this.visible;
          });
          each(keys, function(x, idx) {
            var y = 0,
                stackPoint,
                stackedValues;
            if (pointMap[x] && !pointMap[x].isNull) {
              segment.push(pointMap[x]);
              each([-1, 1], function(direction) {
                var nullName = direction === 1 ? 'rightNull' : 'leftNull',
                    cliffName = direction === 1 ? 'rightCliff' : 'leftCliff',
                    cliff = 0,
                    otherStack = stack[keys[idx + direction]];
                if (otherStack) {
                  i = seriesIndex;
                  while (i >= 0 && i < seriesLength) {
                    stackPoint = otherStack.points[i];
                    if (!stackPoint) {
                      if (i === seriesIndex) {
                        pointMap[x][nullName] = true;
                      } else if (visibleSeries[i]) {
                        stackedValues = stack[x].points[i];
                        if (stackedValues) {
                          cliff -= stackedValues[1] - stackedValues[0];
                        }
                      }
                    }
                    i += upOrDown;
                  }
                }
                pointMap[x][cliffName] = cliff;
              });
            } else {
              i = seriesIndex;
              while (i >= 0 && i < seriesLength) {
                stackPoint = stack[x].points[i];
                if (stackPoint) {
                  y = stackPoint[1];
                  break;
                }
                i += upOrDown;
              }
              y = yAxis.toPixels(y, true);
              segment.push({
                isNull: true,
                plotX: xAxis.toPixels(x, true),
                plotY: y,
                yBottom: y
              });
            }
          });
        }
        return segment;
      },
      getGraphPath: function(points) {
        var getGraphPath = Series.prototype.getGraphPath,
            graphPath,
            options = this.options,
            stacking = options.stacking,
            yAxis = this.yAxis,
            topPath,
            bottomPath,
            bottomPoints = [],
            graphPoints = [],
            seriesIndex = this.index,
            i,
            areaPath,
            plotX,
            stacks = yAxis.stacks[this.stackKey],
            threshold = options.threshold,
            translatedThreshold = yAxis.getThreshold(options.threshold),
            isNull,
            yBottom,
            connectNulls = options.connectNulls || stacking === 'percent',
            addDummyPoints = function(i, otherI, side) {
              var point = points[i],
                  stackedValues = stacking && stacks[point.x].points[seriesIndex],
                  nullVal = point[side + 'Null'] || 0,
                  cliffVal = point[side + 'Cliff'] || 0,
                  top,
                  bottom,
                  isNull = true;
              if (cliffVal || nullVal) {
                top = (nullVal ? stackedValues[0] : stackedValues[1]) + cliffVal;
                bottom = stackedValues[0] + cliffVal;
                isNull = !!nullVal;
              } else if (!stacking && points[otherI] && points[otherI].isNull) {
                top = bottom = threshold;
              }
              if (top !== undefined) {
                graphPoints.push({
                  plotX: plotX,
                  plotY: top === null ? translatedThreshold : yAxis.getThreshold(top),
                  isNull: isNull
                });
                bottomPoints.push({
                  plotX: plotX,
                  plotY: bottom === null ? translatedThreshold : yAxis.getThreshold(bottom)
                });
              }
            };
        points = points || this.points;
        if (stacking) {
          points = this.getStackPoints();
        }
        for (i = 0; i < points.length; i++) {
          isNull = points[i].isNull;
          plotX = pick(points[i].rectPlotX, points[i].plotX);
          yBottom = pick(points[i].yBottom, translatedThreshold);
          if (!isNull || connectNulls) {
            if (!connectNulls) {
              addDummyPoints(i, i - 1, 'left');
            }
            if (!(isNull && !stacking && connectNulls)) {
              graphPoints.push(points[i]);
              bottomPoints.push({
                x: i,
                plotX: plotX,
                plotY: yBottom
              });
            }
            if (!connectNulls) {
              addDummyPoints(i, i + 1, 'right');
            }
          }
        }
        topPath = getGraphPath.call(this, graphPoints, true, true);
        bottomPoints.reversed = true;
        bottomPath = getGraphPath.call(this, bottomPoints, true, true);
        if (bottomPath.length) {
          bottomPath[0] = L;
        }
        areaPath = topPath.concat(bottomPath);
        graphPath = getGraphPath.call(this, graphPoints, false, connectNulls);
        this.areaPath = areaPath;
        return graphPath;
      },
      drawGraph: function() {
        this.areaPath = [];
        Series.prototype.drawGraph.apply(this);
        var series = this,
            areaPath = this.areaPath,
            options = this.options,
            zones = this.zones,
            props = [['area', this.color, options.fillColor]];
        each(zones, function(threshold, i) {
          props.push(['zoneArea' + i, threshold.color || series.color, threshold.fillColor || options.fillColor]);
        });
        each(props, function(prop) {
          var areaKey = prop[0],
              area = series[areaKey],
              attr;
          if (area) {
            area.animate({d: areaPath});
          } else {
            attr = {
              fill: prop[2] || prop[1],
              zIndex: 0
            };
            if (!prop[2]) {
              attr['fill-opacity'] = pick(options.fillOpacity, 0.75);
            }
            series[areaKey] = series.chart.renderer.path(areaPath).attr(attr).add(series.group);
          }
        });
      },
      drawLegendSymbol: LegendSymbolMixin.drawRectangle
    });
    seriesTypes.area = AreaSeries;
    defaultPlotOptions.spline = merge(defaultSeriesOptions);
    var SplineSeries = extendClass(Series, {
      type: 'spline',
      getPointSpline: function(points, point, i) {
        var smoothing = 1.5,
            denom = smoothing + 1,
            plotX = point.plotX,
            plotY = point.plotY,
            lastPoint = points[i - 1],
            nextPoint = points[i + 1],
            leftContX,
            leftContY,
            rightContX,
            rightContY,
            ret;
        if (lastPoint && !lastPoint.isNull && nextPoint && !nextPoint.isNull) {
          var lastX = lastPoint.plotX,
              lastY = lastPoint.plotY,
              nextX = nextPoint.plotX,
              nextY = nextPoint.plotY,
              correction = 0;
          leftContX = (smoothing * plotX + lastX) / denom;
          leftContY = (smoothing * plotY + lastY) / denom;
          rightContX = (smoothing * plotX + nextX) / denom;
          rightContY = (smoothing * plotY + nextY) / denom;
          if (rightContX !== leftContX) {
            correction = ((rightContY - leftContY) * (rightContX - plotX)) / (rightContX - leftContX) + plotY - rightContY;
          }
          leftContY += correction;
          rightContY += correction;
          if (leftContY > lastY && leftContY > plotY) {
            leftContY = mathMax(lastY, plotY);
            rightContY = 2 * plotY - leftContY;
          } else if (leftContY < lastY && leftContY < plotY) {
            leftContY = mathMin(lastY, plotY);
            rightContY = 2 * plotY - leftContY;
          }
          if (rightContY > nextY && rightContY > plotY) {
            rightContY = mathMax(nextY, plotY);
            leftContY = 2 * plotY - rightContY;
          } else if (rightContY < nextY && rightContY < plotY) {
            rightContY = mathMin(nextY, plotY);
            leftContY = 2 * plotY - rightContY;
          }
          point.rightContX = rightContX;
          point.rightContY = rightContY;
        }
        ret = ['C', pick(lastPoint.rightContX, lastPoint.plotX), pick(lastPoint.rightContY, lastPoint.plotY), pick(leftContX, plotX), pick(leftContY, plotY), plotX, plotY];
        lastPoint.rightContX = lastPoint.rightContY = null;
        return ret;
      }
    });
    seriesTypes.spline = SplineSeries;
    defaultPlotOptions.areaspline = merge(defaultPlotOptions.area);
    var areaProto = AreaSeries.prototype,
        AreaSplineSeries = extendClass(SplineSeries, {
          type: 'areaspline',
          getStackPoints: areaProto.getStackPoints,
          getGraphPath: areaProto.getGraphPath,
          setStackCliffs: areaProto.setStackCliffs,
          drawGraph: areaProto.drawGraph,
          drawLegendSymbol: LegendSymbolMixin.drawRectangle
        });
    seriesTypes.areaspline = AreaSplineSeries;
    defaultPlotOptions.column = merge(defaultSeriesOptions, {
      borderColor: '#FFFFFF',
      borderRadius: 0,
      groupPadding: 0.2,
      marker: null,
      pointPadding: 0.1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: {
          brightness: 0.1,
          shadow: false,
          halo: false
        },
        select: {
          color: '#C0C0C0',
          borderColor: '#000000',
          shadow: false
        }
      },
      dataLabels: {
        align: null,
        verticalAlign: null,
        y: null
      },
      softThreshold: false,
      startFromThreshold: true,
      stickyTracking: false,
      tooltip: {distance: 6},
      threshold: 0
    });
    var ColumnSeries = extendClass(Series, {
      type: 'column',
      pointAttrToOptions: {
        stroke: 'borderColor',
        fill: 'color',
        r: 'borderRadius'
      },
      cropShoulder: 0,
      directTouch: true,
      trackerGroups: ['group', 'dataLabelsGroup'],
      negStacks: true,
      init: function() {
        Series.prototype.init.apply(this, arguments);
        var series = this,
            chart = series.chart;
        if (chart.hasRendered) {
          each(chart.series, function(otherSeries) {
            if (otherSeries.type === series.type) {
              otherSeries.isDirty = true;
            }
          });
        }
      },
      getColumnMetrics: function() {
        var series = this,
            options = series.options,
            xAxis = series.xAxis,
            yAxis = series.yAxis,
            reversedXAxis = xAxis.reversed,
            stackKey,
            stackGroups = {},
            columnCount = 0;
        if (options.grouping === false) {
          columnCount = 1;
        } else {
          each(series.chart.series, function(otherSeries) {
            var otherOptions = otherSeries.options,
                otherYAxis = otherSeries.yAxis,
                columnIndex;
            if (otherSeries.type === series.type && otherSeries.visible && yAxis.len === otherYAxis.len && yAxis.pos === otherYAxis.pos) {
              if (otherOptions.stacking) {
                stackKey = otherSeries.stackKey;
                if (stackGroups[stackKey] === UNDEFINED) {
                  stackGroups[stackKey] = columnCount++;
                }
                columnIndex = stackGroups[stackKey];
              } else if (otherOptions.grouping !== false) {
                columnIndex = columnCount++;
              }
              otherSeries.columnIndex = columnIndex;
            }
          });
        }
        var categoryWidth = mathMin(mathAbs(xAxis.transA) * (xAxis.ordinalSlope || options.pointRange || xAxis.closestPointRange || xAxis.tickInterval || 1), xAxis.len),
            groupPadding = categoryWidth * options.groupPadding,
            groupWidth = categoryWidth - 2 * groupPadding,
            pointOffsetWidth = groupWidth / columnCount,
            pointWidth = mathMin(options.maxPointWidth || xAxis.len, pick(options.pointWidth, pointOffsetWidth * (1 - 2 * options.pointPadding))),
            pointPadding = (pointOffsetWidth - pointWidth) / 2,
            colIndex = (series.columnIndex || 0) + (reversedXAxis ? 1 : 0),
            pointXOffset = pointPadding + (groupPadding + colIndex * pointOffsetWidth - (categoryWidth / 2)) * (reversedXAxis ? -1 : 1);
        series.columnMetrics = {
          width: pointWidth,
          offset: pointXOffset
        };
        return series.columnMetrics;
      },
      crispCol: function(x, y, w, h) {
        var chart = this.chart,
            borderWidth = this.borderWidth,
            xCrisp = -(borderWidth % 2 ? 0.5 : 0),
            yCrisp = borderWidth % 2 ? 0.5 : 1,
            right,
            bottom,
            fromTop;
        if (chart.inverted && chart.renderer.isVML) {
          yCrisp += 1;
        }
        right = Math.round(x + w) + xCrisp;
        x = Math.round(x) + xCrisp;
        w = right - x;
        bottom = Math.round(y + h) + yCrisp;
        fromTop = mathAbs(y) <= 0.5 && bottom > 0.5;
        y = Math.round(y) + yCrisp;
        h = bottom - y;
        if (fromTop && h) {
          y -= 1;
          h += 1;
        }
        return {
          x: x,
          y: y,
          width: w,
          height: h
        };
      },
      translate: function() {
        var series = this,
            chart = series.chart,
            options = series.options,
            borderWidth = series.borderWidth = pick(options.borderWidth, series.closestPointRange * series.xAxis.transA < 2 ? 0 : 1),
            yAxis = series.yAxis,
            threshold = options.threshold,
            translatedThreshold = series.translatedThreshold = yAxis.getThreshold(threshold),
            minPointLength = pick(options.minPointLength, 5),
            metrics = series.getColumnMetrics(),
            pointWidth = metrics.width,
            seriesBarW = series.barW = mathMax(pointWidth, 1 + 2 * borderWidth),
            pointXOffset = series.pointXOffset = metrics.offset;
        if (chart.inverted) {
          translatedThreshold -= 0.5;
        }
        if (options.pointPadding) {
          seriesBarW = mathCeil(seriesBarW);
        }
        Series.prototype.translate.apply(series);
        each(series.points, function(point) {
          var yBottom = mathMin(pick(point.yBottom, translatedThreshold), 9e4),
              safeDistance = 999 + mathAbs(yBottom),
              plotY = mathMin(mathMax(-safeDistance, point.plotY), yAxis.len + safeDistance),
              barX = point.plotX + pointXOffset,
              barW = seriesBarW,
              barY = mathMin(plotY, yBottom),
              up,
              barH = mathMax(plotY, yBottom) - barY;
          if (mathAbs(barH) < minPointLength) {
            if (minPointLength) {
              barH = minPointLength;
              up = (!yAxis.reversed && !point.negative) || (yAxis.reversed && point.negative);
              barY = mathAbs(barY - translatedThreshold) > minPointLength ? yBottom - minPointLength : translatedThreshold - (up ? minPointLength : 0);
            }
          }
          point.barX = barX;
          point.pointWidth = pointWidth;
          point.tooltipPos = chart.inverted ? [yAxis.len + yAxis.pos - chart.plotLeft - plotY, series.xAxis.len - barX - barW / 2, barH] : [barX + barW / 2, plotY + yAxis.pos - chart.plotTop, barH];
          point.shapeType = 'rect';
          point.shapeArgs = series.crispCol(barX, barY, barW, barH);
        });
      },
      getSymbol: noop,
      drawLegendSymbol: LegendSymbolMixin.drawRectangle,
      drawGraph: noop,
      drawPoints: function() {
        var series = this,
            chart = this.chart,
            options = series.options,
            renderer = chart.renderer,
            animationLimit = options.animationLimit || 250,
            shapeArgs,
            pointAttr;
        each(series.points, function(point) {
          var plotY = point.plotY,
              graphic = point.graphic,
              borderAttr;
          if (isNumber(plotY) && point.y !== null) {
            shapeArgs = point.shapeArgs;
            borderAttr = defined(series.borderWidth) ? {'stroke-width': series.borderWidth} : {};
            pointAttr = point.pointAttr[point.selected ? SELECT_STATE : NORMAL_STATE] || series.pointAttr[NORMAL_STATE];
            if (graphic) {
              stop(graphic);
              graphic.attr(borderAttr).attr(pointAttr)[chart.pointCount < animationLimit ? 'animate' : 'attr'](merge(shapeArgs));
            } else {
              point.graphic = graphic = renderer[point.shapeType](shapeArgs).attr(borderAttr).attr(pointAttr).add(point.group || series.group).shadow(options.shadow, null, options.stacking && !options.borderRadius);
            }
          } else if (graphic) {
            point.graphic = graphic.destroy();
          }
        });
      },
      animate: function(init) {
        var series = this,
            yAxis = this.yAxis,
            options = series.options,
            inverted = this.chart.inverted,
            attr = {},
            translatedThreshold;
        if (hasSVG) {
          if (init) {
            attr.scaleY = 0.001;
            translatedThreshold = mathMin(yAxis.pos + yAxis.len, mathMax(yAxis.pos, yAxis.toPixels(options.threshold)));
            if (inverted) {
              attr.translateX = translatedThreshold - yAxis.len;
            } else {
              attr.translateY = translatedThreshold;
            }
            series.group.attr(attr);
          } else {
            attr[inverted ? 'translateX' : 'translateY'] = yAxis.pos;
            series.group.animate(attr, extend(animObject(series.options.animation), {step: function(val, fx) {
                series.group.attr({scaleY: mathMax(0.001, fx.pos)});
              }}));
            series.animate = null;
          }
        }
      },
      remove: function() {
        var series = this,
            chart = series.chart;
        if (chart.hasRendered) {
          each(chart.series, function(otherSeries) {
            if (otherSeries.type === series.type) {
              otherSeries.isDirty = true;
            }
          });
        }
        Series.prototype.remove.apply(series, arguments);
      }
    });
    seriesTypes.column = ColumnSeries;
    defaultPlotOptions.bar = merge(defaultPlotOptions.column);
    var BarSeries = extendClass(ColumnSeries, {
      type: 'bar',
      inverted: true
    });
    seriesTypes.bar = BarSeries;
    defaultPlotOptions.scatter = merge(defaultSeriesOptions, {
      lineWidth: 0,
      marker: {enabled: true},
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25CF</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
        pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>'
      }
    });
    var ScatterSeries = extendClass(Series, {
      type: 'scatter',
      sorted: false,
      requireSorting: false,
      noSharedTooltip: true,
      trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
      takeOrdinalPosition: false,
      kdDimensions: 2,
      drawGraph: function() {
        if (this.options.lineWidth) {
          Series.prototype.drawGraph.call(this);
        }
      }
    });
    seriesTypes.scatter = ScatterSeries;
    defaultPlotOptions.pie = merge(defaultSeriesOptions, {
      borderColor: '#FFFFFF',
      borderWidth: 1,
      center: [null, null],
      clip: false,
      colorByPoint: true,
      dataLabels: {
        distance: 30,
        enabled: true,
        formatter: function() {
          return this.y === null ? undefined : this.point.name;
        },
        x: 0
      },
      ignoreHiddenPoint: true,
      legendType: 'point',
      marker: null,
      size: null,
      showInLegend: false,
      slicedOffset: 10,
      states: {hover: {
          brightness: 0.1,
          shadow: false
        }},
      stickyTracking: false,
      tooltip: {followPointer: true}
    });
    var PiePoint = extendClass(Point, {
      init: function() {
        Point.prototype.init.apply(this, arguments);
        var point = this,
            toggleSlice;
        point.name = pick(point.name, 'Slice');
        toggleSlice = function(e) {
          point.slice(e.type === 'select');
        };
        addEvent(point, 'select', toggleSlice);
        addEvent(point, 'unselect', toggleSlice);
        return point;
      },
      setVisible: function(vis, redraw) {
        var point = this,
            series = point.series,
            chart = series.chart,
            ignoreHiddenPoint = series.options.ignoreHiddenPoint;
        redraw = pick(redraw, ignoreHiddenPoint);
        if (vis !== point.visible) {
          point.visible = point.options.visible = vis = vis === UNDEFINED ? !point.visible : vis;
          series.options.data[inArray(point, series.data)] = point.options;
          each(['graphic', 'dataLabel', 'connector', 'shadowGroup'], function(key) {
            if (point[key]) {
              point[key][vis ? 'show' : 'hide'](true);
            }
          });
          if (point.legendItem) {
            chart.legend.colorizeItem(point, vis);
          }
          if (!vis && point.state === 'hover') {
            point.setState('');
          }
          if (ignoreHiddenPoint) {
            series.isDirty = true;
          }
          if (redraw) {
            chart.redraw();
          }
        }
      },
      slice: function(sliced, redraw, animation) {
        var point = this,
            series = point.series,
            chart = series.chart,
            translation;
        setAnimation(animation, chart);
        redraw = pick(redraw, true);
        point.sliced = point.options.sliced = sliced = defined(sliced) ? sliced : !point.sliced;
        series.options.data[inArray(point, series.data)] = point.options;
        translation = sliced ? point.slicedTranslation : {
          translateX: 0,
          translateY: 0
        };
        point.graphic.animate(translation);
        if (point.shadowGroup) {
          point.shadowGroup.animate(translation);
        }
      },
      haloPath: function(size) {
        var shapeArgs = this.shapeArgs,
            chart = this.series.chart;
        return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(chart.plotLeft + shapeArgs.x, chart.plotTop + shapeArgs.y, shapeArgs.r + size, shapeArgs.r + size, {
          innerR: this.shapeArgs.r,
          start: shapeArgs.start,
          end: shapeArgs.end
        });
      }
    });
    var PieSeries = {
      type: 'pie',
      isCartesian: false,
      pointClass: PiePoint,
      requireSorting: false,
      directTouch: true,
      noSharedTooltip: true,
      trackerGroups: ['group', 'dataLabelsGroup'],
      axisTypes: [],
      pointAttrToOptions: {
        stroke: 'borderColor',
        'stroke-width': 'borderWidth',
        fill: 'color'
      },
      animate: function(init) {
        var series = this,
            points = series.points,
            startAngleRad = series.startAngleRad;
        if (!init) {
          each(points, function(point) {
            var graphic = point.graphic,
                args = point.shapeArgs;
            if (graphic) {
              graphic.attr({
                r: point.startR || (series.center[3] / 2),
                start: startAngleRad,
                end: startAngleRad
              });
              graphic.animate({
                r: args.r,
                start: args.start,
                end: args.end
              }, series.options.animation);
            }
          });
          series.animate = null;
        }
      },
      updateTotals: function() {
        var i,
            total = 0,
            points = this.points,
            len = points.length,
            point,
            ignoreHiddenPoint = this.options.ignoreHiddenPoint;
        for (i = 0; i < len; i++) {
          point = points[i];
          total += (ignoreHiddenPoint && !point.visible) ? 0 : point.y;
        }
        this.total = total;
        for (i = 0; i < len; i++) {
          point = points[i];
          point.percentage = (total > 0 && (point.visible || !ignoreHiddenPoint)) ? point.y / total * 100 : 0;
          point.total = total;
        }
      },
      generatePoints: function() {
        Series.prototype.generatePoints.call(this);
        this.updateTotals();
      },
      translate: function(positions) {
        this.generatePoints();
        var series = this,
            cumulative = 0,
            precision = 1000,
            options = series.options,
            slicedOffset = options.slicedOffset,
            connectorOffset = slicedOffset + options.borderWidth,
            start,
            end,
            angle,
            startAngle = options.startAngle || 0,
            startAngleRad = series.startAngleRad = mathPI / 180 * (startAngle - 90),
            endAngleRad = series.endAngleRad = mathPI / 180 * ((pick(options.endAngle, startAngle + 360)) - 90),
            circ = endAngleRad - startAngleRad,
            points = series.points,
            radiusX,
            radiusY,
            labelDistance = options.dataLabels.distance,
            ignoreHiddenPoint = options.ignoreHiddenPoint,
            i,
            len = points.length,
            point;
        if (!positions) {
          series.center = positions = series.getCenter();
        }
        series.getX = function(y, left) {
          angle = math.asin(mathMin((y - positions[1]) / (positions[2] / 2 + labelDistance), 1));
          return positions[0] + (left ? -1 : 1) * (mathCos(angle) * (positions[2] / 2 + labelDistance));
        };
        for (i = 0; i < len; i++) {
          point = points[i];
          start = startAngleRad + (cumulative * circ);
          if (!ignoreHiddenPoint || point.visible) {
            cumulative += point.percentage / 100;
          }
          end = startAngleRad + (cumulative * circ);
          point.shapeType = 'arc';
          point.shapeArgs = {
            x: positions[0],
            y: positions[1],
            r: positions[2] / 2,
            innerR: positions[3] / 2,
            start: mathRound(start * precision) / precision,
            end: mathRound(end * precision) / precision
          };
          angle = (end + start) / 2;
          if (angle > 1.5 * mathPI) {
            angle -= 2 * mathPI;
          } else if (angle < -mathPI / 2) {
            angle += 2 * mathPI;
          }
          point.slicedTranslation = {
            translateX: mathRound(mathCos(angle) * slicedOffset),
            translateY: mathRound(mathSin(angle) * slicedOffset)
          };
          radiusX = mathCos(angle) * positions[2] / 2;
          radiusY = mathSin(angle) * positions[2] / 2;
          point.tooltipPos = [positions[0] + radiusX * 0.7, positions[1] + radiusY * 0.7];
          point.half = angle < -mathPI / 2 || angle > mathPI / 2 ? 1 : 0;
          point.angle = angle;
          connectorOffset = mathMin(connectorOffset, labelDistance / 2);
          point.labelPos = [positions[0] + radiusX + mathCos(angle) * labelDistance, positions[1] + radiusY + mathSin(angle) * labelDistance, positions[0] + radiusX + mathCos(angle) * connectorOffset, positions[1] + radiusY + mathSin(angle) * connectorOffset, positions[0] + radiusX, positions[1] + radiusY, labelDistance < 0 ? 'center' : point.half ? 'right' : 'left', angle];
        }
      },
      drawGraph: null,
      drawPoints: function() {
        var series = this,
            chart = series.chart,
            renderer = chart.renderer,
            groupTranslation,
            graphic,
            shadow = series.options.shadow,
            shadowGroup,
            pointAttr,
            shapeArgs,
            attr;
        if (shadow && !series.shadowGroup) {
          series.shadowGroup = renderer.g('shadow').add(series.group);
        }
        each(series.points, function(point) {
          if (point.y !== null) {
            graphic = point.graphic;
            shapeArgs = point.shapeArgs;
            shadowGroup = point.shadowGroup;
            pointAttr = point.pointAttr[point.selected ? SELECT_STATE : NORMAL_STATE];
            if (!pointAttr.stroke) {
              pointAttr.stroke = pointAttr.fill;
            }
            if (shadow && !shadowGroup) {
              shadowGroup = point.shadowGroup = renderer.g('shadow').add(series.shadowGroup);
            }
            groupTranslation = point.sliced ? point.slicedTranslation : {
              translateX: 0,
              translateY: 0
            };
            if (shadowGroup) {
              shadowGroup.attr(groupTranslation);
            }
            if (graphic) {
              graphic.setRadialReference(series.center).attr(pointAttr).animate(extend(shapeArgs, groupTranslation));
            } else {
              attr = {'stroke-linejoin': 'round'};
              if (!point.visible) {
                attr.visibility = 'hidden';
              }
              point.graphic = graphic = renderer[point.shapeType](shapeArgs).setRadialReference(series.center).attr(pointAttr).attr(attr).attr(groupTranslation).add(series.group).shadow(shadow, shadowGroup);
            }
          }
        });
      },
      searchPoint: noop,
      sortByAngle: function(points, sign) {
        points.sort(function(a, b) {
          return a.angle !== undefined && (b.angle - a.angle) * sign;
        });
      },
      drawLegendSymbol: LegendSymbolMixin.drawRectangle,
      getCenter: CenteredSeriesMixin.getCenter,
      getSymbol: noop
    };
    PieSeries = extendClass(Series, PieSeries);
    seriesTypes.pie = PieSeries;
    Series.prototype.drawDataLabels = function() {
      var series = this,
          seriesOptions = series.options,
          cursor = seriesOptions.cursor,
          options = seriesOptions.dataLabels,
          points = series.points,
          pointOptions,
          generalOptions,
          hasRendered = series.hasRendered || 0,
          str,
          dataLabelsGroup,
          defer = pick(options.defer, true),
          renderer = series.chart.renderer;
      if (options.enabled || series._hasPointLabels) {
        if (series.dlProcessOptions) {
          series.dlProcessOptions(options);
        }
        dataLabelsGroup = series.plotGroup('dataLabelsGroup', 'data-labels', defer && !hasRendered ? 'hidden' : 'visible', options.zIndex || 6);
        if (defer) {
          dataLabelsGroup.attr({opacity: +hasRendered});
          if (!hasRendered) {
            addEvent(series, 'afterAnimate', function() {
              if (series.visible) {
                dataLabelsGroup.show();
              }
              dataLabelsGroup[seriesOptions.animation ? 'animate' : 'attr']({opacity: 1}, {duration: 200});
            });
          }
        }
        generalOptions = options;
        each(points, function(point) {
          var enabled,
              dataLabel = point.dataLabel,
              labelConfig,
              attr,
              name,
              rotation,
              connector = point.connector,
              isNew = true,
              style,
              moreStyle = {};
          pointOptions = point.dlOptions || (point.options && point.options.dataLabels);
          enabled = pick(pointOptions && pointOptions.enabled, generalOptions.enabled) && point.y !== null;
          if (dataLabel && !enabled) {
            point.dataLabel = dataLabel.destroy();
          } else if (enabled) {
            options = merge(generalOptions, pointOptions);
            style = options.style;
            rotation = options.rotation;
            labelConfig = point.getLabelConfig();
            str = options.format ? format(options.format, labelConfig) : options.formatter.call(labelConfig, options);
            style.color = pick(options.color, style.color, series.color, 'black');
            if (dataLabel) {
              if (defined(str)) {
                dataLabel.attr({text: str});
                isNew = false;
              } else {
                point.dataLabel = dataLabel = dataLabel.destroy();
                if (connector) {
                  point.connector = connector.destroy();
                }
              }
            } else if (defined(str)) {
              attr = {
                fill: options.backgroundColor,
                stroke: options.borderColor,
                'stroke-width': options.borderWidth,
                r: options.borderRadius || 0,
                rotation: rotation,
                padding: options.padding,
                zIndex: 1
              };
              if (style.color === 'contrast') {
                moreStyle.color = options.inside || options.distance < 0 || !!seriesOptions.stacking ? renderer.getContrast(point.color || series.color) : '#000000';
              }
              if (cursor) {
                moreStyle.cursor = cursor;
              }
              for (name in attr) {
                if (attr[name] === UNDEFINED) {
                  delete attr[name];
                }
              }
              dataLabel = point.dataLabel = renderer[rotation ? 'text' : 'label'](str, 0, -9999, options.shape, null, null, options.useHTML).attr(attr).css(extend(style, moreStyle)).add(dataLabelsGroup).shadow(options.shadow);
            }
            if (dataLabel) {
              series.alignDataLabel(point, dataLabel, options, null, isNew);
            }
          }
        });
      }
    };
    Series.prototype.alignDataLabel = function(point, dataLabel, options, alignTo, isNew) {
      var chart = this.chart,
          inverted = chart.inverted,
          plotX = pick(point.plotX, -9999),
          plotY = pick(point.plotY, -9999),
          bBox = dataLabel.getBBox(),
          baseline = chart.renderer.fontMetrics(options.style.fontSize).b,
          rotation = options.rotation,
          normRotation,
          negRotation,
          align = options.align,
          rotCorr,
          visible = this.visible && (point.series.forceDL || chart.isInsidePlot(plotX, mathRound(plotY), inverted) || (alignTo && chart.isInsidePlot(plotX, inverted ? alignTo.x + 1 : alignTo.y + alignTo.height - 1, inverted))),
          alignAttr,
          justify = pick(options.overflow, 'justify') === 'justify';
      if (visible) {
        alignTo = extend({
          x: inverted ? chart.plotWidth - plotY : plotX,
          y: mathRound(inverted ? chart.plotHeight - plotX : plotY),
          width: 0,
          height: 0
        }, alignTo);
        extend(options, {
          width: bBox.width,
          height: bBox.height
        });
        if (rotation) {
          justify = false;
          rotCorr = chart.renderer.rotCorr(baseline, rotation);
          alignAttr = {
            x: alignTo.x + options.x + alignTo.width / 2 + rotCorr.x,
            y: alignTo.y + options.y + {
              top: 0,
              middle: 0.5,
              bottom: 1
            }[options.verticalAlign] * alignTo.height
          };
          dataLabel[isNew ? 'attr' : 'animate'](alignAttr).attr({align: align});
          normRotation = (rotation + 720) % 360;
          negRotation = normRotation > 180 && normRotation < 360;
          if (align === 'left') {
            alignAttr.y -= negRotation ? bBox.height : 0;
          } else if (align === 'center') {
            alignAttr.x -= bBox.width / 2;
            alignAttr.y -= bBox.height / 2;
          } else if (align === 'right') {
            alignAttr.x -= bBox.width;
            alignAttr.y -= negRotation ? 0 : bBox.height;
          }
        } else {
          dataLabel.align(options, null, alignTo);
          alignAttr = dataLabel.alignAttr;
        }
        if (justify) {
          this.justifyDataLabel(dataLabel, options, alignAttr, bBox, alignTo, isNew);
        } else if (pick(options.crop, true)) {
          visible = chart.isInsidePlot(alignAttr.x, alignAttr.y) && chart.isInsidePlot(alignAttr.x + bBox.width, alignAttr.y + bBox.height);
        }
        if (options.shape && !rotation) {
          dataLabel.attr({
            anchorX: point.plotX,
            anchorY: point.plotY
          });
        }
      }
      if (!visible) {
        stop(dataLabel);
        dataLabel.attr({y: -9999});
        dataLabel.placed = false;
      }
    };
    Series.prototype.justifyDataLabel = function(dataLabel, options, alignAttr, bBox, alignTo, isNew) {
      var chart = this.chart,
          align = options.align,
          verticalAlign = options.verticalAlign,
          off,
          justified,
          padding = dataLabel.box ? 0 : (dataLabel.padding || 0);
      off = alignAttr.x + padding;
      if (off < 0) {
        if (align === 'right') {
          options.align = 'left';
        } else {
          options.x = -off;
        }
        justified = true;
      }
      off = alignAttr.x + bBox.width - padding;
      if (off > chart.plotWidth) {
        if (align === 'left') {
          options.align = 'right';
        } else {
          options.x = chart.plotWidth - off;
        }
        justified = true;
      }
      off = alignAttr.y + padding;
      if (off < 0) {
        if (verticalAlign === 'bottom') {
          options.verticalAlign = 'top';
        } else {
          options.y = -off;
        }
        justified = true;
      }
      off = alignAttr.y + bBox.height - padding;
      if (off > chart.plotHeight) {
        if (verticalAlign === 'top') {
          options.verticalAlign = 'bottom';
        } else {
          options.y = chart.plotHeight - off;
        }
        justified = true;
      }
      if (justified) {
        dataLabel.placed = !isNew;
        dataLabel.align(options, null, alignTo);
      }
    };
    if (seriesTypes.pie) {
      seriesTypes.pie.prototype.drawDataLabels = function() {
        var series = this,
            data = series.data,
            point,
            chart = series.chart,
            options = series.options.dataLabels,
            connectorPadding = pick(options.connectorPadding, 10),
            connectorWidth = pick(options.connectorWidth, 1),
            plotWidth = chart.plotWidth,
            plotHeight = chart.plotHeight,
            connector,
            connectorPath,
            softConnector = pick(options.softConnector, true),
            distanceOption = options.distance,
            seriesCenter = series.center,
            radius = seriesCenter[2] / 2,
            centerY = seriesCenter[1],
            outside = distanceOption > 0,
            dataLabel,
            dataLabelWidth,
            labelPos,
            labelHeight,
            halves = [[], []],
            x,
            y,
            visibility,
            rankArr,
            i,
            j,
            overflow = [0, 0, 0, 0],
            sort = function(a, b) {
              return b.y - a.y;
            };
        if (!series.visible || (!options.enabled && !series._hasPointLabels)) {
          return;
        }
        Series.prototype.drawDataLabels.apply(series);
        each(data, function(point) {
          if (point.dataLabel && point.visible) {
            halves[point.half].push(point);
            point.dataLabel._pos = null;
          }
        });
        i = 2;
        while (i--) {
          var slots = [],
              slotsLength,
              usedSlots = [],
              points = halves[i],
              pos,
              bottom,
              length = points.length,
              slotIndex;
          if (!length) {
            continue;
          }
          series.sortByAngle(points, i - 0.5);
          j = labelHeight = 0;
          while (!labelHeight && points[j]) {
            labelHeight = points[j] && points[j].dataLabel && (points[j].dataLabel.getBBox().height || 21);
            j++;
          }
          if (distanceOption > 0) {
            bottom = mathMin(centerY + radius + distanceOption, chart.plotHeight);
            for (pos = mathMax(0, centerY - radius - distanceOption); pos <= bottom; pos += labelHeight) {
              slots.push(pos);
            }
            slotsLength = slots.length;
            if (length > slotsLength) {
              rankArr = [].concat(points);
              rankArr.sort(sort);
              j = length;
              while (j--) {
                rankArr[j].rank = j;
              }
              j = length;
              while (j--) {
                if (points[j].rank >= slotsLength) {
                  points.splice(j, 1);
                }
              }
              length = points.length;
            }
            for (j = 0; j < length; j++) {
              point = points[j];
              labelPos = point.labelPos;
              var closest = 9999,
                  distance,
                  slotI;
              for (slotI = 0; slotI < slotsLength; slotI++) {
                distance = mathAbs(slots[slotI] - labelPos[1]);
                if (distance < closest) {
                  closest = distance;
                  slotIndex = slotI;
                }
              }
              if (slotIndex < j && slots[j] !== null) {
                slotIndex = j;
              } else if (slotsLength < length - j + slotIndex && slots[j] !== null) {
                slotIndex = slotsLength - length + j;
                while (slots[slotIndex] === null) {
                  slotIndex++;
                }
              } else {
                while (slots[slotIndex] === null) {
                  slotIndex++;
                }
              }
              usedSlots.push({
                i: slotIndex,
                y: slots[slotIndex]
              });
              slots[slotIndex] = null;
            }
            usedSlots.sort(sort);
          }
          for (j = 0; j < length; j++) {
            var slot,
                naturalY;
            point = points[j];
            labelPos = point.labelPos;
            dataLabel = point.dataLabel;
            visibility = point.visible === false ? HIDDEN : 'inherit';
            naturalY = labelPos[1];
            if (distanceOption > 0) {
              slot = usedSlots.pop();
              slotIndex = slot.i;
              y = slot.y;
              if ((naturalY > y && slots[slotIndex + 1] !== null) || (naturalY < y && slots[slotIndex - 1] !== null)) {
                y = mathMin(mathMax(0, naturalY), chart.plotHeight);
              }
            } else {
              y = naturalY;
            }
            x = options.justify ? seriesCenter[0] + (i ? -1 : 1) * (radius + distanceOption) : series.getX(y === centerY - radius - distanceOption || y === centerY + radius + distanceOption ? naturalY : y, i);
            dataLabel._attr = {
              visibility: visibility,
              align: labelPos[6]
            };
            dataLabel._pos = {
              x: x + options.x + ({
                left: connectorPadding,
                right: -connectorPadding
              }[labelPos[6]] || 0),
              y: y + options.y - 10
            };
            dataLabel.connX = x;
            dataLabel.connY = y;
            if (this.options.size === null) {
              dataLabelWidth = dataLabel.width;
              if (x - dataLabelWidth < connectorPadding) {
                overflow[3] = mathMax(mathRound(dataLabelWidth - x + connectorPadding), overflow[3]);
              } else if (x + dataLabelWidth > plotWidth - connectorPadding) {
                overflow[1] = mathMax(mathRound(x + dataLabelWidth - plotWidth + connectorPadding), overflow[1]);
              }
              if (y - labelHeight / 2 < 0) {
                overflow[0] = mathMax(mathRound(-y + labelHeight / 2), overflow[0]);
              } else if (y + labelHeight / 2 > plotHeight) {
                overflow[2] = mathMax(mathRound(y + labelHeight / 2 - plotHeight), overflow[2]);
              }
            }
          }
        }
        if (arrayMax(overflow) === 0 || this.verifyDataLabelOverflow(overflow)) {
          this.placeDataLabels();
          if (outside && connectorWidth) {
            each(this.points, function(point) {
              connector = point.connector;
              labelPos = point.labelPos;
              dataLabel = point.dataLabel;
              if (dataLabel && dataLabel._pos && point.visible) {
                visibility = dataLabel._attr.visibility;
                x = dataLabel.connX;
                y = dataLabel.connY;
                connectorPath = softConnector ? [M, x + (labelPos[6] === 'left' ? 5 : -5), y, 'C', x, y, 2 * labelPos[2] - labelPos[4], 2 * labelPos[3] - labelPos[5], labelPos[2], labelPos[3], L, labelPos[4], labelPos[5]] : [M, x + (labelPos[6] === 'left' ? 5 : -5), y, L, labelPos[2], labelPos[3], L, labelPos[4], labelPos[5]];
                if (connector) {
                  connector.animate({d: connectorPath});
                  connector.attr('visibility', visibility);
                } else {
                  point.connector = connector = series.chart.renderer.path(connectorPath).attr({
                    'stroke-width': connectorWidth,
                    stroke: options.connectorColor || point.color || '#606060',
                    visibility: visibility
                  }).add(series.dataLabelsGroup);
                }
              } else if (connector) {
                point.connector = connector.destroy();
              }
            });
          }
        }
      };
      seriesTypes.pie.prototype.placeDataLabels = function() {
        each(this.points, function(point) {
          var dataLabel = point.dataLabel,
              _pos;
          if (dataLabel && point.visible) {
            _pos = dataLabel._pos;
            if (_pos) {
              dataLabel.attr(dataLabel._attr);
              dataLabel[dataLabel.moved ? 'animate' : 'attr'](_pos);
              dataLabel.moved = true;
            } else if (dataLabel) {
              dataLabel.attr({y: -9999});
            }
          }
        });
      };
      seriesTypes.pie.prototype.alignDataLabel = noop;
      seriesTypes.pie.prototype.verifyDataLabelOverflow = function(overflow) {
        var center = this.center,
            options = this.options,
            centerOption = options.center,
            minSize = options.minSize || 80,
            newSize = minSize,
            ret;
        if (centerOption[0] !== null) {
          newSize = mathMax(center[2] - mathMax(overflow[1], overflow[3]), minSize);
        } else {
          newSize = mathMax(center[2] - overflow[1] - overflow[3], minSize);
          center[0] += (overflow[3] - overflow[1]) / 2;
        }
        if (centerOption[1] !== null) {
          newSize = mathMax(mathMin(newSize, center[2] - mathMax(overflow[0], overflow[2])), minSize);
        } else {
          newSize = mathMax(mathMin(newSize, center[2] - overflow[0] - overflow[2]), minSize);
          center[1] += (overflow[0] - overflow[2]) / 2;
        }
        if (newSize < center[2]) {
          center[2] = newSize;
          center[3] = Math.min(relativeLength(options.innerSize || 0, newSize), newSize);
          this.translate(center);
          if (this.drawDataLabels) {
            this.drawDataLabels();
          }
        } else {
          ret = true;
        }
        return ret;
      };
    }
    if (seriesTypes.column) {
      seriesTypes.column.prototype.alignDataLabel = function(point, dataLabel, options, alignTo, isNew) {
        var inverted = this.chart.inverted,
            series = point.series,
            dlBox = point.dlBox || point.shapeArgs,
            below = pick(point.below, point.plotY > pick(this.translatedThreshold, series.yAxis.len)),
            inside = pick(options.inside, !!this.options.stacking),
            overshoot;
        if (dlBox) {
          alignTo = merge(dlBox);
          if (alignTo.y < 0) {
            alignTo.height += alignTo.y;
            alignTo.y = 0;
          }
          overshoot = alignTo.y + alignTo.height - series.yAxis.len;
          if (overshoot > 0) {
            alignTo.height -= overshoot;
          }
          if (inverted) {
            alignTo = {
              x: series.yAxis.len - alignTo.y - alignTo.height,
              y: series.xAxis.len - alignTo.x - alignTo.width,
              width: alignTo.height,
              height: alignTo.width
            };
          }
          if (!inside) {
            if (inverted) {
              alignTo.x += below ? 0 : alignTo.width;
              alignTo.width = 0;
            } else {
              alignTo.y += below ? alignTo.height : 0;
              alignTo.height = 0;
            }
          }
        }
        options.align = pick(options.align, !inverted || inside ? 'center' : below ? 'right' : 'left');
        options.verticalAlign = pick(options.verticalAlign, inverted || inside ? 'middle' : below ? 'top' : 'bottom');
        Series.prototype.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
      };
    }
    (function(H) {
      var Chart = H.Chart,
          each = H.each,
          pick = H.pick,
          addEvent = H.addEvent;
      Chart.prototype.callbacks.push(function(chart) {
        function collectAndHide() {
          var labels = [];
          each(chart.series, function(series) {
            var dlOptions = series.options.dataLabels,
                collections = series.dataLabelCollections || ['dataLabel'];
            if ((dlOptions.enabled || series._hasPointLabels) && !dlOptions.allowOverlap && series.visible) {
              each(collections, function(coll) {
                each(series.points, function(point) {
                  if (point[coll]) {
                    point[coll].labelrank = pick(point.labelrank, point.shapeArgs && point.shapeArgs.height);
                    labels.push(point[coll]);
                  }
                });
              });
            }
          });
          chart.hideOverlappingLabels(labels);
        }
        collectAndHide();
        addEvent(chart, 'redraw', collectAndHide);
      });
      Chart.prototype.hideOverlappingLabels = function(labels) {
        var len = labels.length,
            label,
            i,
            j,
            label1,
            label2,
            isIntersecting,
            pos1,
            pos2,
            parent1,
            parent2,
            padding,
            intersectRect = function(x1, y1, w1, h1, x2, y2, w2, h2) {
              return !(x2 > x1 + w1 || x2 + w2 < x1 || y2 > y1 + h1 || y2 + h2 < y1);
            };
        for (i = 0; i < len; i++) {
          label = labels[i];
          if (label) {
            label.oldOpacity = label.opacity;
            label.newOpacity = 1;
          }
        }
        labels.sort(function(a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });
        for (i = 0; i < len; i++) {
          label1 = labels[i];
          for (j = i + 1; j < len; ++j) {
            label2 = labels[j];
            if (label1 && label2 && label1.placed && label2.placed && label1.newOpacity !== 0 && label2.newOpacity !== 0) {
              pos1 = label1.alignAttr;
              pos2 = label2.alignAttr;
              parent1 = label1.parentGroup;
              parent2 = label2.parentGroup;
              padding = 2 * (label1.box ? 0 : label1.padding);
              isIntersecting = intersectRect(pos1.x + parent1.translateX, pos1.y + parent1.translateY, label1.width - padding, label1.height - padding, pos2.x + parent2.translateX, pos2.y + parent2.translateY, label2.width - padding, label2.height - padding);
              if (isIntersecting) {
                (label1.labelrank < label2.labelrank ? label1 : label2).newOpacity = 0;
              }
            }
          }
        }
        each(labels, function(label) {
          var complete,
              newOpacity;
          if (label) {
            newOpacity = label.newOpacity;
            if (label.oldOpacity !== newOpacity && label.placed) {
              if (newOpacity) {
                label.show(true);
              } else {
                complete = function() {
                  label.hide();
                };
              }
              label.alignAttr.opacity = newOpacity;
              label[label.isOld ? 'animate' : 'attr'](label.alignAttr, null, complete);
            }
            label.isOld = true;
          }
        });
      };
    }(Highcharts));
    var TrackerMixin = Highcharts.TrackerMixin = {
      drawTrackerPoint: function() {
        var series = this,
            chart = series.chart,
            pointer = chart.pointer,
            cursor = series.options.cursor,
            css = cursor && {cursor: cursor},
            onMouseOver = function(e) {
              var target = e.target,
                  point;
              while (target && !point) {
                point = target.point;
                target = target.parentNode;
              }
              if (point !== UNDEFINED && point !== chart.hoverPoint) {
                point.onMouseOver(e);
              }
            };
        each(series.points, function(point) {
          if (point.graphic) {
            point.graphic.element.point = point;
          }
          if (point.dataLabel) {
            point.dataLabel.element.point = point;
          }
        });
        if (!series._hasTracking) {
          each(series.trackerGroups, function(key) {
            if (series[key]) {
              series[key].addClass(PREFIX + 'tracker').on('mouseover', onMouseOver).on('mouseout', function(e) {
                pointer.onTrackerMouseOut(e);
              }).css(css);
              if (hasTouch) {
                series[key].on('touchstart', onMouseOver);
              }
            }
          });
          series._hasTracking = true;
        }
      },
      drawTrackerGraph: function() {
        var series = this,
            options = series.options,
            trackByArea = options.trackByArea,
            trackerPath = [].concat(trackByArea ? series.areaPath : series.graphPath),
            trackerPathLength = trackerPath.length,
            chart = series.chart,
            pointer = chart.pointer,
            renderer = chart.renderer,
            snap = chart.options.tooltip.snap,
            tracker = series.tracker,
            cursor = options.cursor,
            css = cursor && {cursor: cursor},
            i,
            onMouseOver = function() {
              if (chart.hoverSeries !== series) {
                series.onMouseOver();
              }
            },
            TRACKER_FILL = 'rgba(192,192,192,' + (hasSVG ? 0.0001 : 0.002) + ')';
        if (trackerPathLength && !trackByArea) {
          i = trackerPathLength + 1;
          while (i--) {
            if (trackerPath[i] === M) {
              trackerPath.splice(i + 1, 0, trackerPath[i + 1] - snap, trackerPath[i + 2], L);
            }
            if ((i && trackerPath[i] === M) || i === trackerPathLength) {
              trackerPath.splice(i, 0, L, trackerPath[i - 2] + snap, trackerPath[i - 1]);
            }
          }
        }
        if (tracker) {
          tracker.attr({d: trackerPath});
        } else {
          series.tracker = renderer.path(trackerPath).attr({
            'stroke-linejoin': 'round',
            visibility: series.visible ? VISIBLE : HIDDEN,
            stroke: TRACKER_FILL,
            fill: trackByArea ? TRACKER_FILL : NONE,
            'stroke-width': options.lineWidth + (trackByArea ? 0 : 2 * snap),
            zIndex: 2
          }).add(series.group);
          each([series.tracker, series.markerGroup], function(tracker) {
            tracker.addClass(PREFIX + 'tracker').on('mouseover', onMouseOver).on('mouseout', function(e) {
              pointer.onTrackerMouseOut(e);
            }).css(css);
            if (hasTouch) {
              tracker.on('touchstart', onMouseOver);
            }
          });
        }
      }
    };
    if (seriesTypes.column) {
      ColumnSeries.prototype.drawTracker = TrackerMixin.drawTrackerPoint;
    }
    if (seriesTypes.pie) {
      seriesTypes.pie.prototype.drawTracker = TrackerMixin.drawTrackerPoint;
    }
    if (seriesTypes.scatter) {
      ScatterSeries.prototype.drawTracker = TrackerMixin.drawTrackerPoint;
    }
    extend(Legend.prototype, {
      setItemEvents: function(item, legendItem, useHTML, itemStyle, itemHiddenStyle) {
        var legend = this;
        (useHTML ? legendItem : item.legendGroup).on('mouseover', function() {
          item.setState(HOVER_STATE);
          legendItem.css(legend.options.itemHoverStyle);
        }).on('mouseout', function() {
          legendItem.css(item.visible ? itemStyle : itemHiddenStyle);
          item.setState();
        }).on('click', function(event) {
          var strLegendItemClick = 'legendItemClick',
              fnLegendItemClick = function() {
                if (item.setVisible) {
                  item.setVisible();
                }
              };
          event = {browserEvent: event};
          if (item.firePointEvent) {
            item.firePointEvent(strLegendItemClick, event, fnLegendItemClick);
          } else {
            fireEvent(item, strLegendItemClick, event, fnLegendItemClick);
          }
        });
      },
      createCheckboxForItem: function(item) {
        var legend = this;
        item.checkbox = createElement('input', {
          type: 'checkbox',
          checked: item.selected,
          defaultChecked: item.selected
        }, legend.options.itemCheckboxStyle, legend.chart.container);
        addEvent(item.checkbox, 'click', function(event) {
          var target = event.target;
          fireEvent(item.series || item, 'checkboxClick', {
            checked: target.checked,
            item: item
          }, function() {
            item.select();
          });
        });
      }
    });
    defaultOptions.legend.itemStyle.cursor = 'pointer';
    extend(Chart.prototype, {
      showResetZoom: function() {
        var chart = this,
            lang = defaultOptions.lang,
            btnOptions = chart.options.chart.resetZoomButton,
            theme = btnOptions.theme,
            states = theme.states,
            alignTo = btnOptions.relativeTo === 'chart' ? null : 'plotBox';
        function zoomOut() {
          chart.zoomOut();
        }
        this.resetZoomButton = chart.renderer.button(lang.resetZoom, null, null, zoomOut, theme, states && states.hover).attr({
          align: btnOptions.position.align,
          title: lang.resetZoomTitle
        }).add().align(btnOptions.position, false, alignTo);
      },
      zoomOut: function() {
        var chart = this;
        fireEvent(chart, 'selection', {resetSelection: true}, function() {
          chart.zoom();
        });
      },
      zoom: function(event) {
        var chart = this,
            hasZoomed,
            pointer = chart.pointer,
            displayButton = false,
            resetZoomButton;
        if (!event || event.resetSelection) {
          each(chart.axes, function(axis) {
            hasZoomed = axis.zoom();
          });
        } else {
          each(event.xAxis.concat(event.yAxis), function(axisData) {
            var axis = axisData.axis,
                isXAxis = axis.isXAxis;
            if (pointer[isXAxis ? 'zoomX' : 'zoomY'] || pointer[isXAxis ? 'pinchX' : 'pinchY']) {
              hasZoomed = axis.zoom(axisData.min, axisData.max);
              if (axis.displayBtn) {
                displayButton = true;
              }
            }
          });
        }
        resetZoomButton = chart.resetZoomButton;
        if (displayButton && !resetZoomButton) {
          chart.showResetZoom();
        } else if (!displayButton && isObject(resetZoomButton)) {
          chart.resetZoomButton = resetZoomButton.destroy();
        }
        if (hasZoomed) {
          chart.redraw(pick(chart.options.chart.animation, event && event.animation, chart.pointCount < 100));
        }
      },
      pan: function(e, panning) {
        var chart = this,
            hoverPoints = chart.hoverPoints,
            doRedraw;
        if (hoverPoints) {
          each(hoverPoints, function(point) {
            point.setState();
          });
        }
        each(panning === 'xy' ? [1, 0] : [1], function(isX) {
          var axis = chart[isX ? 'xAxis' : 'yAxis'][0],
              horiz = axis.horiz,
              mousePos = e[horiz ? 'chartX' : 'chartY'],
              mouseDown = horiz ? 'mouseDownX' : 'mouseDownY',
              startPos = chart[mouseDown],
              halfPointRange = (axis.pointRange || 0) / 2,
              extremes = axis.getExtremes(),
              newMin = axis.toValue(startPos - mousePos, true) + halfPointRange,
              newMax = axis.toValue(startPos + axis.len - mousePos, true) - halfPointRange,
              goingLeft = startPos > mousePos;
          if (axis.series.length && (goingLeft || newMin > mathMin(extremes.dataMin, extremes.min)) && (!goingLeft || newMax < mathMax(extremes.dataMax, extremes.max))) {
            axis.setExtremes(newMin, newMax, false, false, {trigger: 'pan'});
            doRedraw = true;
          }
          chart[mouseDown] = mousePos;
        });
        if (doRedraw) {
          chart.redraw(false);
        }
        css(chart.container, {cursor: 'move'});
      }
    });
    extend(Point.prototype, {
      select: function(selected, accumulate) {
        var point = this,
            series = point.series,
            chart = series.chart;
        selected = pick(selected, !point.selected);
        point.firePointEvent(selected ? 'select' : 'unselect', {accumulate: accumulate}, function() {
          point.selected = point.options.selected = selected;
          series.options.data[inArray(point, series.data)] = point.options;
          point.setState(selected && SELECT_STATE);
          if (!accumulate) {
            each(chart.getSelectedPoints(), function(loopPoint) {
              if (loopPoint.selected && loopPoint !== point) {
                loopPoint.selected = loopPoint.options.selected = false;
                series.options.data[inArray(loopPoint, series.data)] = loopPoint.options;
                loopPoint.setState(NORMAL_STATE);
                loopPoint.firePointEvent('unselect');
              }
            });
          }
        });
      },
      onMouseOver: function(e, byProximity) {
        var point = this,
            series = point.series,
            chart = series.chart,
            tooltip = chart.tooltip,
            hoverPoint = chart.hoverPoint;
        if (chart.hoverSeries !== series) {
          series.onMouseOver();
        }
        if (hoverPoint && hoverPoint !== point) {
          hoverPoint.onMouseOut();
        }
        if (point.series) {
          point.firePointEvent('mouseOver');
          if (tooltip && (!tooltip.shared || series.noSharedTooltip)) {
            tooltip.refresh(point, e);
          }
          point.setState(HOVER_STATE);
          if (!byProximity) {
            chart.hoverPoint = point;
          }
        }
      },
      onMouseOut: function() {
        var chart = this.series.chart,
            hoverPoints = chart.hoverPoints;
        this.firePointEvent('mouseOut');
        if (!hoverPoints || inArray(this, hoverPoints) === -1) {
          this.setState();
          chart.hoverPoint = null;
        }
      },
      importEvents: function() {
        if (!this.hasImportedEvents) {
          var point = this,
              options = merge(point.series.options.point, point.options),
              events = options.events,
              eventType;
          point.events = events;
          for (eventType in events) {
            addEvent(point, eventType, events[eventType]);
          }
          this.hasImportedEvents = true;
        }
      },
      setState: function(state, move) {
        var point = this,
            plotX = mathFloor(point.plotX),
            plotY = point.plotY,
            series = point.series,
            stateOptions = series.options.states,
            markerOptions = defaultPlotOptions[series.type].marker && series.options.marker,
            normalDisabled = markerOptions && !markerOptions.enabled,
            markerStateOptions = markerOptions && markerOptions.states[state],
            stateDisabled = markerStateOptions && markerStateOptions.enabled === false,
            stateMarkerGraphic = series.stateMarkerGraphic,
            pointMarker = point.marker || {},
            chart = series.chart,
            radius,
            halo = series.halo,
            haloOptions,
            newSymbol,
            pointAttr;
        state = state || NORMAL_STATE;
        pointAttr = point.pointAttr[state] || series.pointAttr[state];
        if ((state === point.state && !move) || (point.selected && state !== SELECT_STATE) || (stateOptions[state] && stateOptions[state].enabled === false) || (state && (stateDisabled || (normalDisabled && markerStateOptions.enabled === false))) || (state && pointMarker.states && pointMarker.states[state] && pointMarker.states[state].enabled === false)) {
          return;
        }
        if (point.graphic) {
          radius = markerOptions && point.graphic.symbolName && pointAttr.r;
          point.graphic.attr(merge(pointAttr, radius ? {
            x: plotX - radius,
            y: plotY - radius,
            width: 2 * radius,
            height: 2 * radius
          } : {}));
          if (stateMarkerGraphic) {
            stateMarkerGraphic.hide();
          }
        } else {
          if (state && markerStateOptions) {
            radius = markerStateOptions.radius;
            newSymbol = pointMarker.symbol || series.symbol;
            if (stateMarkerGraphic && stateMarkerGraphic.currentSymbol !== newSymbol) {
              stateMarkerGraphic = stateMarkerGraphic.destroy();
            }
            if (!stateMarkerGraphic) {
              if (newSymbol) {
                series.stateMarkerGraphic = stateMarkerGraphic = chart.renderer.symbol(newSymbol, plotX - radius, plotY - radius, 2 * radius, 2 * radius).attr(pointAttr).add(series.markerGroup);
                stateMarkerGraphic.currentSymbol = newSymbol;
              }
            } else {
              stateMarkerGraphic[move ? 'animate' : 'attr']({
                x: plotX - radius,
                y: plotY - radius
              });
            }
          }
          if (stateMarkerGraphic) {
            stateMarkerGraphic[state && chart.isInsidePlot(plotX, plotY, chart.inverted) ? 'show' : 'hide']();
            stateMarkerGraphic.element.point = point;
          }
        }
        haloOptions = stateOptions[state] && stateOptions[state].halo;
        if (haloOptions && haloOptions.size) {
          if (!halo) {
            series.halo = halo = chart.renderer.path().add(chart.seriesGroup);
          }
          halo.attr(extend({
            'fill': point.color || series.color,
            'fill-opacity': haloOptions.opacity,
            'zIndex': -1
          }, haloOptions.attributes))[move ? 'animate' : 'attr']({d: point.haloPath(haloOptions.size)});
        } else if (halo) {
          halo.attr({d: []});
        }
        point.state = state;
      },
      haloPath: function(size) {
        var series = this.series,
            chart = series.chart,
            plotBox = series.getPlotBox(),
            inverted = chart.inverted,
            plotX = Math.floor(this.plotX);
        return chart.renderer.symbols.circle(plotBox.translateX + (inverted ? series.yAxis.len - this.plotY : plotX) - size, plotBox.translateY + (inverted ? series.xAxis.len - plotX : this.plotY) - size, size * 2, size * 2);
      }
    });
    extend(Series.prototype, {
      onMouseOver: function() {
        var series = this,
            chart = series.chart,
            hoverSeries = chart.hoverSeries;
        if (hoverSeries && hoverSeries !== series) {
          hoverSeries.onMouseOut();
        }
        if (series.options.events.mouseOver) {
          fireEvent(series, 'mouseOver');
        }
        series.setState(HOVER_STATE);
        chart.hoverSeries = series;
      },
      onMouseOut: function() {
        var series = this,
            options = series.options,
            chart = series.chart,
            tooltip = chart.tooltip,
            hoverPoint = chart.hoverPoint;
        chart.hoverSeries = null;
        if (hoverPoint) {
          hoverPoint.onMouseOut();
        }
        if (series && options.events.mouseOut) {
          fireEvent(series, 'mouseOut');
        }
        if (tooltip && !options.stickyTracking && (!tooltip.shared || series.noSharedTooltip)) {
          tooltip.hide();
        }
        series.setState();
      },
      setState: function(state) {
        var series = this,
            options = series.options,
            graph = series.graph,
            stateOptions = options.states,
            lineWidth = options.lineWidth,
            attribs,
            i = 0;
        state = state || NORMAL_STATE;
        if (series.state !== state) {
          series.state = state;
          if (stateOptions[state] && stateOptions[state].enabled === false) {
            return;
          }
          if (state) {
            lineWidth = stateOptions[state].lineWidth || lineWidth + (stateOptions[state].lineWidthPlus || 0);
          }
          if (graph && !graph.dashstyle) {
            attribs = {'stroke-width': lineWidth};
            graph.attr(attribs);
            while (series['zoneGraph' + i]) {
              series['zoneGraph' + i].attr(attribs);
              i = i + 1;
            }
          }
        }
      },
      setVisible: function(vis, redraw) {
        var series = this,
            chart = series.chart,
            legendItem = series.legendItem,
            showOrHide,
            ignoreHiddenSeries = chart.options.chart.ignoreHiddenSeries,
            oldVisibility = series.visible;
        series.visible = vis = series.userOptions.visible = vis === UNDEFINED ? !oldVisibility : vis;
        showOrHide = vis ? 'show' : 'hide';
        each(['group', 'dataLabelsGroup', 'markerGroup', 'tracker'], function(key) {
          if (series[key]) {
            series[key][showOrHide]();
          }
        });
        if (chart.hoverSeries === series || (chart.hoverPoint && chart.hoverPoint.series) === series) {
          series.onMouseOut();
        }
        if (legendItem) {
          chart.legend.colorizeItem(series, vis);
        }
        series.isDirty = true;
        if (series.options.stacking) {
          each(chart.series, function(otherSeries) {
            if (otherSeries.options.stacking && otherSeries.visible) {
              otherSeries.isDirty = true;
            }
          });
        }
        each(series.linkedSeries, function(otherSeries) {
          otherSeries.setVisible(vis, false);
        });
        if (ignoreHiddenSeries) {
          chart.isDirtyBox = true;
        }
        if (redraw !== false) {
          chart.redraw();
        }
        fireEvent(series, showOrHide);
      },
      show: function() {
        this.setVisible(true);
      },
      hide: function() {
        this.setVisible(false);
      },
      select: function(selected) {
        var series = this;
        series.selected = selected = (selected === UNDEFINED) ? !series.selected : selected;
        if (series.checkbox) {
          series.checkbox.checked = selected;
        }
        fireEvent(series, selected ? 'select' : 'unselect');
      },
      drawTracker: TrackerMixin.drawTrackerGraph
    });
    extend(Highcharts, {
      Color: Color,
      Point: Point,
      Tick: Tick,
      Renderer: Renderer,
      SVGElement: SVGElement,
      SVGRenderer: SVGRenderer,
      arrayMin: arrayMin,
      arrayMax: arrayMax,
      charts: charts,
      correctFloat: correctFloat,
      dateFormat: dateFormat,
      error: error,
      format: format,
      pathAnim: pathAnim,
      getOptions: getOptions,
      hasBidiBug: hasBidiBug,
      isTouchDevice: isTouchDevice,
      setOptions: setOptions,
      addEvent: addEvent,
      removeEvent: removeEvent,
      createElement: createElement,
      discardElement: discardElement,
      css: css,
      each: each,
      map: map,
      merge: merge,
      splat: splat,
      stableSort: stableSort,
      extendClass: extendClass,
      pInt: pInt,
      svg: hasSVG,
      canvas: useCanVG,
      vml: !hasSVG && !useCanVG,
      product: PRODUCT,
      version: VERSION
    });
    return Highcharts;
  }));
})(require('process'));
