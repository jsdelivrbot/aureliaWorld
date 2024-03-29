/* */ 
(function(process) {
  (function(D, V) {
    typeof module === "object" && module.exports ? module.exports = D.document ? V(D) : V : D.Highcharts = V(D);
  })(typeof window !== "undefined" ? window : this, function(D) {
    function V(a, b) {
      var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
      if (b)
        throw Error(c);
      D.console && console.log(c);
    }
    function kb(a, b, c) {
      this.options = b;
      this.elem = a;
      this.prop = c;
    }
    function C() {
      var a,
          b = arguments,
          c,
          d = {},
          e = function(a, b) {
            var c,
                d;
            typeof a !== "object" && (a = {});
            for (d in b)
              b.hasOwnProperty(d) && (c = b[d], a[d] = c && typeof c === "object" && Object.prototype.toString.call(c) !== "[object Array]" && d !== "renderTo" && typeof c.nodeType !== "number" ? e(a[d] || {}, c) : b[d]);
            return a;
          };
      b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2));
      c = b.length;
      for (a = 0; a < c; a++)
        d = e(d, b[a]);
      return d;
    }
    function E(a, b) {
      return parseInt(a, b || 10);
    }
    function va(a) {
      return typeof a === "string";
    }
    function aa(a) {
      return a && typeof a === "object";
    }
    function Ca(a) {
      return Object.prototype.toString.call(a) === "[object Array]";
    }
    function wa(a, b) {
      for (var c = a.length; c--; )
        if (a[c] === b) {
          a.splice(c, 1);
          break;
        }
    }
    function t(a) {
      return a !== w && a !== null;
    }
    function K(a, b, c) {
      var d,
          e;
      if (va(b))
        t(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b));
      else if (t(b) && aa(b))
        for (d in b)
          a.setAttribute(d, b[d]);
      return e;
    }
    function ra(a) {
      return Ca(a) ? a : [a];
    }
    function Na(a, b, c) {
      if (b)
        return setTimeout(a, b, c);
      a.call(0, c);
    }
    function M(a, b) {
      if (xa && !ea && b && b.opacity !== w)
        b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
      r(a.style, b);
    }
    function da(a, b, c, d, e) {
      a = z.createElement(a);
      b && r(a, b);
      e && M(a, {
        padding: 0,
        border: "none",
        margin: 0
      });
      c && M(a, c);
      d && d.appendChild(a);
      return a;
    }
    function ba(a, b) {
      var c = function() {};
      c.prototype = new a;
      r(c.prototype, b);
      return c;
    }
    function Da(a, b, c) {
      return Array((b || 2) + 1 - String(a).length).join(c || 0) + a;
    }
    function Ea(a, b) {
      for (var c = "{",
          d = !1,
          e,
          f,
          g,
          h,
          i,
          k = []; (c = a.indexOf(c)) !== -1; ) {
        e = a.slice(0, c);
        if (d) {
          f = e.split(":");
          g = f.shift().split(".");
          i = g.length;
          e = b;
          for (h = 0; h < i; h++)
            e = e[g[h]];
          if (f.length)
            f = f.join(":"), g = /\.([0-9])/, h = L.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e !== null && (e = s.numberFormat(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : ""))) : e = Oa(f, e);
        }
        k.push(e);
        a = a.slice(c + 1);
        c = (d = !d) ? "}" : "{";
      }
      k.push(a);
      return k.join("");
    }
    function ub(a, b, c, d, e) {
      var f,
          g = a,
          c = o(c, 1);
      f = a / c;
      b || (b = [1, 2, 2.5, 5, 10], d === !1 && (c === 1 ? b = [1, 2, 5, 10] : c <= 0.1 && (b = [1 / c])));
      for (d = 0; d < b.length; d++)
        if (g = b[d], e && g * c >= a || !e && f <= (b[d] + (b[d + 1] || b[d])) / 2)
          break;
      g *= c;
      return g;
    }
    function cb(a, b) {
      var c = a.length,
          d,
          e;
      for (e = 0; e < c; e++)
        a[e].safeI = e;
      a.sort(function(a, c) {
        d = b(a, c);
        return d === 0 ? a.safeI - c.safeI : d;
      });
      for (e = 0; e < c; e++)
        delete a[e].safeI;
    }
    function Pa(a) {
      for (var b = a.length,
          c = a[0]; b--; )
        a[b] < c && (c = a[b]);
      return c;
    }
    function Ia(a) {
      for (var b = a.length,
          c = a[0]; b--; )
        a[b] > c && (c = a[b]);
      return c;
    }
    function db(a, b) {
      for (var c in a)
        a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c];
    }
    function Qa(a) {
      eb || (eb = da(Ja));
      a && eb.appendChild(a);
      eb.innerHTML = "";
    }
    function pa(a, b) {
      return parseFloat(a.toPrecision(b || 14));
    }
    function Va(a, b) {
      b.renderer.globalAnimation = o(a, b.animation);
    }
    function Ra(a) {
      return aa(a) ? C(a) : {duration: a ? 500 : 0};
    }
    function vb() {
      var a = L.global,
          b = a.useUTC,
          c = b ? "getUTC" : "get",
          d = b ? "setUTC" : "set";
      sa = a.Date || D.Date;
      wb = b && a.timezoneOffset;
      lb = b && a.getTimezoneOffset;
      xb = c + "Minutes";
      yb = c + "Hours";
      zb = c + "Day";
      mb = c + "Date";
      nb = c + "Month";
      ob = c + "FullYear";
      Ab = d + "Date";
      Bb = d + "Month";
      Cb = d + "FullYear";
    }
    function T(a) {
      if (!(this instanceof T))
        return new T(a);
      this.init(a);
    }
    function Q() {}
    function Sa(a, b, c, d) {
      this.axis = a;
      this.pos = b;
      this.type = c || "";
      this.isNew = !0;
      !c && !d && this.addLabel();
    }
    function Db(a, b) {
      var c,
          d,
          e,
          f,
          g = !1,
          h = a.x,
          i = a.y;
      for (c = 0, d = b.length - 1; c < b.length; d = c++)
        e = b[c][1] > i, f = b[d][1] > i, e !== f && h < (b[d][0] - b[c][0]) * (i - b[c][1]) / (b[d][1] - b[c][1]) + b[c][0] && (g = !g);
      return g;
    }
    function Eb(a, b, c, d, e, f, g, h) {
      return ["M", a + e, b, "L", a + c - f, b, "C", a + c - f / 2, b, a + c, b + f / 2, a + c, b + f, "L", a + c, b + d - g, "C", a + c, b + d - g / 2, a + c - g / 2, b + d, a + c - g, b + d, "L", a + h, b + d, "C", a + h / 2, b + d, a, b + d - h / 2, a, b + d - h, "L", a, b + e, "C", a, b + e / 2, a + e / 2, b, a + e, b, "Z"];
    }
    var w,
        z = D.document,
        H = Math,
        x = H.round,
        fa = H.floor,
        ta = H.ceil,
        u = H.max,
        I = H.min,
        S = H.abs,
        ka = H.cos,
        qa = H.sin,
        pb = H.PI,
        la = pb * 2 / 360,
        ya = D.navigator && D.navigator.userAgent || "",
        Fb = D.opera,
        xa = /(msie|trident|edge)/i.test(ya) && !Fb,
        fb = z && z.documentMode === 8,
        gb = !xa && /AppleWebKit/.test(ya),
        Ka = /Firefox/.test(ya),
        Gb = /(Mobile|Android|Windows Phone)/.test(ya),
        Fa = "http://www.w3.org/2000/svg",
        ea = z && z.createElementNS && !!z.createElementNS(Fa, "svg").createSVGRect,
        Mb = Ka && parseInt(ya.split("Firefox/")[1], 10) < 4,
        ma = z && !ea && !xa && !!z.createElement("canvas").getContext,
        Ta,
        Wa,
        Hb = {},
        qb = 0,
        eb,
        L,
        Oa,
        hb,
        W = function() {},
        O = [],
        Xa = 0,
        Ja = "div",
        Nb = /^[0-9]+$/,
        ib = ["plotTop", "marginRight", "marginBottom", "plotLeft"],
        sa,
        wb,
        lb,
        xb,
        yb,
        zb,
        mb,
        nb,
        ob,
        Ab,
        Bb,
        Cb,
        y = {},
        s;
    s = D.Highcharts ? V(16, !0) : {win: D};
    s.seriesTypes = y;
    var Ga = [],
        na,
        za,
        n,
        Ha,
        rb,
        Aa,
        N,
        Y,
        G,
        Ua,
        La;
    kb.prototype = {
      dSetter: function() {
        var a = this.paths[0],
            b = this.paths[1],
            c = [],
            d = this.now,
            e = a.length,
            f;
        if (d === 1)
          c = this.toD;
        else if (e === b.length && d < 1)
          for (; e--; )
            f = parseFloat(a[e]), c[e] = isNaN(f) ? a[e] : d * parseFloat(b[e] - f) + f;
        else
          c = b;
        this.elem.attr("d", c);
      },
      update: function() {
        var a = this.elem,
            b = this.prop,
            c = this.now,
            d = this.options.step;
        if (this[b + "Setter"])
          this[b + "Setter"]();
        else
          a.attr ? a.element && a.attr(b, c) : a.style[b] = c + this.unit;
        d && d.call(a, c, this);
      },
      run: function(a, b, c) {
        var d = this,
            e = function(a) {
              return e.stopped ? !1 : d.step(a);
            },
            f;
        this.startTime = +new sa;
        this.start = a;
        this.end = b;
        this.unit = c;
        this.now = this.start;
        this.pos = 0;
        e.elem = this.elem;
        if (e() && Ga.push(e) === 1)
          e.timerId = setInterval(function() {
            for (f = 0; f < Ga.length; f++)
              Ga[f]() || Ga.splice(f--, 1);
            Ga.length || clearInterval(e.timerId);
          }, 13);
      },
      step: function(a) {
        var b = +new sa,
            c,
            d = this.options;
        c = this.elem;
        var e = d.complete,
            f = d.duration,
            g = d.curAnim,
            h;
        if (c.attr && !c.element)
          c = !1;
        else if (a || b >= f + this.startTime) {
          this.now = this.end;
          this.pos = 1;
          this.update();
          a = g[this.prop] = !0;
          for (h in g)
            g[h] !== !0 && (a = !1);
          a && e && e.call(c);
          c = !1;
        } else
          this.pos = d.easing((b - this.startTime) / f), this.now = this.start + (this.end - this.start) * this.pos, this.update(), c = !0;
        return c;
      },
      initPath: function(a, b, c) {
        var b = b || "",
            d = a.shift,
            e = b.indexOf("C") > -1,
            f = e ? 7 : 3,
            g,
            b = b.split(" "),
            c = [].concat(c),
            h = a.isArea,
            i = h ? 2 : 1,
            k = function(a) {
              for (g = a.length; g--; )
                (a[g] === "M" || a[g] === "L") && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]);
            };
        e && (k(b), k(c));
        if (d <= c.length / f && b.length === c.length)
          for (; d--; )
            c = c.slice(0, f).concat(c), h && (c = c.concat(c.slice(c.length - f)));
        a.shift = 0;
        if (b.length)
          for (a = c.length; b.length < a; )
            d = b.slice().splice(b.length / i - f, f * i), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), [].splice.apply(b, [b.length / i, 0].concat(d));
        return [b, c];
      }
    };
    var r = s.extend = function(a, b) {
      var c;
      a || (a = {});
      for (c in b)
        a[c] = b[c];
      return a;
    },
        F = s.isNumber = function(a) {
          return typeof a === "number" && !isNaN(a);
        },
        o = s.pick = function() {
          var a = arguments,
              b,
              c,
              d = a.length;
          for (b = 0; b < d; b++)
            if (c = a[b], c !== w && c !== null)
              return c;
        },
        ga = s.wrap = function(a, b, c) {
          var d = a[b];
          a[b] = function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a);
          };
        };
    Oa = function(a, b, c) {
      if (!F(b))
        return L.lang.invalidDate || "";
      var a = o(a, "%Y-%m-%d %H:%M:%S"),
          d = new sa(b - (lb && lb(b) || wb || 0) * 6E4),
          e,
          f = d[yb](),
          g = d[zb](),
          h = d[mb](),
          i = d[nb](),
          k = d[ob](),
          j = L.lang,
          l = j.weekdays,
          m = j.shortWeekdays,
          d = r({
            a: m ? m[g] : l[g].substr(0, 3),
            A: l[g],
            d: Da(h),
            e: Da(h, 2, " "),
            w: g,
            b: j.shortMonths[i],
            B: j.months[i],
            m: Da(i + 1),
            y: k.toString().substr(2, 2),
            Y: k,
            H: Da(f),
            k: f,
            I: Da(f % 12 || 12),
            l: f % 12 || 12,
            M: Da(d[xb]()),
            p: f < 12 ? "AM" : "PM",
            P: f < 12 ? "am" : "pm",
            S: Da(d.getSeconds()),
            L: Da(x(b % 1E3), 3)
          }, s.dateFormats);
      for (e in d)
        for (; a.indexOf("%" + e) !== -1; )
          a = a.replace("%" + e, typeof d[e] === "function" ? d[e](b) : d[e]);
      return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
    };
    hb = {
      millisecond: 1,
      second: 1E3,
      minute: 6E4,
      hour: 36E5,
      day: 864E5,
      week: 6048E5,
      month: 24192E5,
      year: 314496E5
    };
    s.numberFormat = function(a, b, c, d) {
      var a = +a || 0,
          b = +b,
          e = L.lang,
          f = (a.toString().split(".")[1] || "").length,
          g,
          h,
          i = Math.abs(a);
      b === -1 ? b = Math.min(f, 20) : F(b) || (b = 2);
      g = String(E(i.toFixed(b)));
      h = g.length > 3 ? g.length % 3 : 0;
      c = o(c, e.decimalPoint);
      d = o(d, e.thousandsSep);
      a = a < 0 ? "-" : "";
      a += h ? g.substr(0, h) + d : "";
      a += g.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + d);
      b && (d = Math.abs(i - g + Math.pow(10, -Math.max(b, f) - 1)), a += c + d.toFixed(b).slice(2));
      return a;
    };
    Math.easeInOutSine = function(a) {
      return -0.5 * (Math.cos(Math.PI * a) - 1);
    };
    na = function(a, b) {
      var c;
      if (b === "width")
        return Math.min(a.offsetWidth, a.scrollWidth) - na(a, "padding-left") - na(a, "padding-right");
      else if (b === "height")
        return Math.min(a.offsetHeight, a.scrollHeight) - na(a, "padding-top") - na(a, "padding-bottom");
      return (c = D.getComputedStyle(a, void 0)) && E(c.getPropertyValue(b));
    };
    za = function(a, b) {
      return b.indexOf ? b.indexOf(a) : [].indexOf.call(b, a);
    };
    Ha = function(a, b) {
      return [].filter.call(a, b);
    };
    Aa = function(a, b) {
      for (var c = [],
          d = 0,
          e = a.length; d < e; d++)
        c[d] = b.call(a[d], a[d], d, a);
      return c;
    };
    rb = function(a) {
      var b = z.documentElement,
          a = a.getBoundingClientRect();
      return {
        top: a.top + (D.pageYOffset || b.scrollTop) - (b.clientTop || 0),
        left: a.left + (D.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
      };
    };
    La = function(a) {
      for (var b = Ga.length; b--; )
        if (Ga[b].elem === a)
          Ga[b].stopped = !0;
    };
    n = function(a, b) {
      return Array.prototype.forEach.call(a, b);
    };
    N = function(a, b, c) {
      function d(b) {
        b.target = b.srcElement || D;
        c.call(a, b);
      }
      var e = a.hcEvents = a.hcEvents || {};
      if (a.addEventListener)
        a.addEventListener(b, c, !1);
      else if (a.attachEvent) {
        if (!a.hcEventsIE)
          a.hcEventsIE = {};
        a.hcEventsIE[c.toString()] = d;
        a.attachEvent("on" + b, d);
      }
      e[b] || (e[b] = []);
      e[b].push(c);
    };
    Y = function(a, b, c) {
      function d(b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && (c = a.hcEventsIE[c.toString()], a.detachEvent("on" + b, c));
      }
      function e() {
        var c,
            e,
            f;
        if (a.nodeName)
          for (f in b ? (c = {}, c[b] = !0) : c = g, c)
            if (g[f])
              for (e = g[f].length; e--; )
                d(f, g[f][e]);
      }
      var f,
          g = a.hcEvents,
          h;
      if (g)
        b ? (f = g[b] || [], c ? (h = za(c, f), h > -1 && (f.splice(h, 1), g[b] = f), d(b, c)) : (e(), g[b] = [])) : (e(), a.hcEvents = {});
    };
    G = function(a, b, c, d) {
      var e;
      e = a.hcEvents;
      var f,
          g,
          c = c || {};
      if (z.createEvent && (a.dispatchEvent || a.fireEvent))
        e = z.createEvent("Events"), e.initEvent(b, !0, !0), e.target = a, r(e, c), a.dispatchEvent ? a.dispatchEvent(e) : a.fireEvent(b, e);
      else if (e) {
        e = e[b] || [];
        f = e.length;
        if (!c.preventDefault)
          c.preventDefault = function() {
            c.defaultPrevented = !0;
          };
        c.target = a;
        if (!c.type)
          c.type = b;
        for (b = 0; b < f; b++)
          g = e[b], g.call(a, c) === !1 && c.preventDefault();
      }
      d && !c.defaultPrevented && d(c);
    };
    Ua = function(a, b, c) {
      var d,
          e = "",
          f,
          g,
          h;
      aa(c) || (d = arguments, c = {
        duration: d[2],
        easing: d[3],
        complete: d[4]
      });
      if (!F(c.duration))
        c.duration = 400;
      c.easing = typeof c.easing === "function" ? c.easing : Math[c.easing] || Math.easeInOutSine;
      c.curAnim = C(b);
      for (h in b)
        g = new kb(a, c, h), f = null, h === "d" ? (g.paths = g.initPath(a, a.d, b.d), g.toD = b.d, d = 0, f = 1) : a.attr ? d = a.attr(h) : (d = parseFloat(na(a, h)) || 0, h !== "opacity" && (e = "px")), f || (f = b[h]), f.match && f.match("px") && (f = f.replace(/px/g, "")), g.run(d, f, e);
    };
    if (D.jQuery)
      D.jQuery.fn.highcharts = function() {
        var a = [].slice.call(arguments);
        if (this[0])
          return a[0] ? (new (s[va(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : O[K(this[0], "data-highcharts-chart")];
      };
    z && !z.defaultView && (na = function(a, b) {
      var c;
      c = {
        width: "clientWidth",
        height: "clientHeight"
      }[b];
      if (a.style[b])
        return E(a.style[b]);
      b === "opacity" && (b = "filter");
      if (c)
        return a.style.zoom = 1, Math.max(a[c] - 2 * na(a, "padding"), 0);
      c = a.currentStyle[b.replace(/\-(\w)/g, function(a, b) {
        return b.toUpperCase();
      })];
      b === "filter" && (c = c.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
        return b / 100;
      }));
      return c === "" ? 1 : E(c);
    });
    Array.prototype.forEach || (n = function(a, b) {
      for (var c = 0,
          d = a.length; c < d; c++)
        if (b.call(a[c], a[c], c, a) === !1)
          return c;
    });
    Array.prototype.indexOf || (za = function(a, b) {
      var c,
          d = 0;
      if (b)
        for (c = b.length; d < c; d++)
          if (b[d] === a)
            return d;
      return -1;
    });
    Array.prototype.filter || (Ha = function(a, b) {
      for (var c = [],
          d = 0,
          e = a.length; d < e; d++)
        b(a[d], d) && c.push(a[d]);
      return c;
    });
    s.Fx = kb;
    s.inArray = za;
    s.each = n;
    s.grep = Ha;
    s.offset = rb;
    s.map = Aa;
    s.addEvent = N;
    s.removeEvent = Y;
    s.fireEvent = G;
    s.animate = Ua;
    s.animObject = Ra;
    s.stop = La;
    L = {
      colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
      symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
      lang: {
        loading: "Loading...",
        months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
        shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
        weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
        decimalPoint: ".",
        numericSymbols: "k,M,G,T,P,E".split(","),
        resetZoom: "Reset zoom",
        resetZoomTitle: "Reset zoom level 1:1",
        thousandsSep: " "
      },
      global: {
        useUTC: !0,
        canvasToolsURL: "http://code.highcharts.com/modules/canvas-tools.js",
        VMLRadialGradientURL: "http://code.highcharts.com/maps/4.2.5/gfx/vml-radial-gradient.png"
      },
      chart: {
        borderColor: "#4572A7",
        borderRadius: 0,
        defaultSeriesType: "line",
        ignoreHiddenSeries: !0,
        spacing: [10, 10, 15, 10],
        backgroundColor: "#FFFFFF",
        plotBorderColor: "#C0C0C0",
        resetZoomButton: {
          theme: {zIndex: 20},
          position: {
            align: "right",
            x: -10,
            y: 10
          }
        }
      },
      title: {
        text: "Chart title",
        align: "center",
        margin: 15,
        style: {
          color: "#333333",
          fontSize: "18px"
        },
        widthAdjust: -44
      },
      subtitle: {
        text: "",
        align: "center",
        style: {color: "#555555"},
        widthAdjust: -44
      },
      plotOptions: {line: {
          allowPointSelect: !1,
          showCheckbox: !1,
          animation: {duration: 1E3},
          events: {},
          lineWidth: 2,
          marker: {
            lineWidth: 0,
            radius: 4,
            lineColor: "#FFFFFF",
            states: {
              hover: {
                enabled: !0,
                lineWidthPlus: 1,
                radiusPlus: 2
              },
              select: {
                fillColor: "#FFFFFF",
                lineColor: "#000000",
                lineWidth: 2
              }
            }
          },
          point: {events: {}},
          dataLabels: {
            align: "center",
            formatter: function() {
              return this.y === null ? "" : s.numberFormat(this.y, -1);
            },
            style: {
              color: "contrast",
              fontSize: "11px",
              fontWeight: "bold",
              textShadow: "0 0 6px contrast, 0 0 3px contrast"
            },
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            padding: 5
          },
          cropThreshold: 300,
          pointRange: 0,
          softThreshold: !0,
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
          stickyTracking: !0,
          turboThreshold: 1E3
        }},
      labels: {style: {
          position: "absolute",
          color: "#3E576F"
        }},
      legend: {
        enabled: !0,
        align: "center",
        layout: "horizontal",
        labelFormatter: function() {
          return this.name;
        },
        borderColor: "#909090",
        borderRadius: 0,
        navigation: {
          activeColor: "#274b6d",
          inactiveColor: "#CCC"
        },
        shadow: !1,
        itemStyle: {
          color: "#333333",
          fontSize: "12px",
          fontWeight: "bold"
        },
        itemHoverStyle: {color: "#000"},
        itemHiddenStyle: {color: "#CCC"},
        itemCheckboxStyle: {
          position: "absolute",
          width: "13px",
          height: "13px"
        },
        symbolPadding: 5,
        verticalAlign: "bottom",
        x: 0,
        y: 0,
        title: {style: {fontWeight: "bold"}}
      },
      loading: {
        labelStyle: {
          fontWeight: "bold",
          position: "relative",
          top: "45%"
        },
        style: {
          position: "absolute",
          backgroundColor: "white",
          opacity: 0.5,
          textAlign: "center"
        }
      },
      tooltip: {
        enabled: !0,
        animation: ea,
        backgroundColor: "rgba(249, 249, 249, .85)",
        borderWidth: 1,
        borderRadius: 3,
        dateTimeLabelFormats: {
          millisecond: "%A, %b %e, %H:%M:%S.%L",
          second: "%A, %b %e, %H:%M:%S",
          minute: "%A, %b %e, %H:%M",
          hour: "%A, %b %e, %H:%M",
          day: "%A, %b %e, %Y",
          week: "Week from %A, %b %e, %Y",
          month: "%B %Y",
          year: "%Y"
        },
        footerFormat: "",
        headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
        shadow: !0,
        snap: Gb ? 25 : 10,
        style: {
          color: "#333333",
          cursor: "default",
          fontSize: "12px",
          padding: "8px",
          pointerEvents: "none",
          whiteSpace: "nowrap"
        }
      },
      credits: {
        enabled: !0,
        text: "Highcharts.com",
        href: "http://www.highcharts.com",
        position: {
          align: "right",
          x: -10,
          verticalAlign: "bottom",
          y: -5
        },
        style: {
          cursor: "pointer",
          color: "#909090",
          fontSize: "9px"
        }
      }
    };
    var Z = L.plotOptions,
        Ya = Z.line;
    vb();
    T.prototype = {
      parsers: [{
        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        parse: function(a) {
          return [E(a[1]), E(a[2]), E(a[3]), parseFloat(a[4], 10)];
        }
      }, {
        regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        parse: function(a) {
          return [E(a[1], 16), E(a[2], 16), E(a[3], 16), 1];
        }
      }, {
        regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        parse: function(a) {
          return [E(a[1]), E(a[2]), E(a[3]), 1];
        }
      }],
      init: function(a) {
        var b,
            c,
            d,
            e;
        if ((this.input = a) && a.stops)
          this.stops = Aa(a.stops, function(a) {
            return new T(a[1]);
          });
        else
          for (d = this.parsers.length; d-- && !c; )
            e = this.parsers[d], (b = e.regex.exec(a)) && (c = e.parse(b));
        this.rgba = c || [];
      },
      get: function(a) {
        var b = this.input,
            c = this.rgba,
            d;
        this.stops ? (d = C(b), d.stops = [].concat(d.stops), n(this.stops, function(b, c) {
          d.stops[c] = [d.stops[c][0], b.get(a)];
        })) : d = c && F(c[0]) ? a === "rgb" || !a && c[3] === 1 ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : a === "a" ? c[3] : "rgba(" + c.join(",") + ")" : b;
        return d;
      },
      brighten: function(a) {
        var b,
            c = this.rgba;
        if (this.stops)
          n(this.stops, function(b) {
            b.brighten(a);
          });
        else if (F(a) && a !== 0)
          for (b = 0; b < 3; b++)
            c[b] += E(a * 255), c[b] < 0 && (c[b] = 0), c[b] > 255 && (c[b] = 255);
        return this;
      },
      setOpacity: function(a) {
        this.rgba[3] = a;
        return this;
      }
    };
    Q.prototype = {
      opacity: 1,
      textProps: "direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
      init: function(a, b) {
        this.element = b === "span" ? da(b) : z.createElementNS(Fa, b);
        this.renderer = a;
      },
      animate: function(a, b, c) {
        b = o(b, this.renderer.globalAnimation, !0);
        La(this);
        if (b) {
          if (c)
            b.complete = c;
          Ua(this, a, b);
        } else
          this.attr(a, null, c);
        return this;
      },
      colorGradient: function(a, b, c) {
        var d = this.renderer,
            e,
            f,
            g,
            h,
            i,
            k,
            j,
            l,
            m,
            p,
            q,
            A = [],
            o;
        a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
        if (f) {
          g = a[f];
          i = d.gradients;
          j = a.stops;
          p = c.radialReference;
          Ca(g) && (a[f] = g = {
            x1: g[0],
            y1: g[1],
            x2: g[2],
            y2: g[3],
            gradientUnits: "userSpaceOnUse"
          });
          f === "radialGradient" && p && !t(g.gradientUnits) && (h = g, g = C(g, d.getRadialAttr(p, h), {gradientUnits: "userSpaceOnUse"}));
          for (q in g)
            q !== "id" && A.push(q, g[q]);
          for (q in j)
            A.push(j[q]);
          A = A.join(",");
          i[A] ? p = i[A].attr("id") : (g.id = p = "highcharts-" + qb++, i[A] = k = d.createElement(f).attr(g).add(d.defs), k.radAttr = h, k.stops = [], n(j, function(a) {
            a[1].indexOf("rgba") === 0 ? (e = T(a[1]), l = e.get("rgb"), m = e.get("a")) : (l = a[1], m = 1);
            a = d.createElement("stop").attr({
              offset: a[0],
              "stop-color": l,
              "stop-opacity": m
            }).add(k);
            k.stops.push(a);
          }));
          o = "url(" + d.url + "#" + p + ")";
          c.setAttribute(b, o);
          c.gradient = A;
          a.toString = function() {
            return o;
          };
        }
      },
      applyTextShadow: function(a) {
        var b = this.element,
            c,
            d = a.indexOf("contrast") !== -1,
            e = {},
            f = this.renderer.forExport,
            g = f || b.style.textShadow !== w && !xa;
        if (d)
          e.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill));
        if (gb || f)
          e.textRendering = "geometricPrecision";
        g ? this.css(e) : (this.fakeTS = !0, this.ySetter = this.xSetter, c = [].slice.call(b.getElementsByTagName("tspan")), n(a.split(/\s?,\s?/g), function(a) {
          var d = b.firstChild,
              e,
              f,
              a = a.split(" ");
          e = a[a.length - 1];
          (f = a[a.length - 2]) && n(c, function(a, c) {
            var g;
            c === 0 && (a.setAttribute("x", b.getAttribute("x")), c = b.getAttribute("y"), a.setAttribute("y", c || 0), c === null && b.setAttribute("y", 0));
            g = a.cloneNode(1);
            K(g, {
              "class": "highcharts-text-shadow",
              fill: e,
              stroke: e,
              "stroke-opacity": 1 / u(E(f), 3),
              "stroke-width": f,
              "stroke-linejoin": "round"
            });
            b.insertBefore(g, d);
          });
        }));
      },
      attr: function(a, b, c) {
        var d,
            e = this.element,
            f,
            g = this,
            h;
        typeof a === "string" && b !== w && (d = a, a = {}, a[d] = b);
        if (typeof a === "string")
          g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e);
        else {
          for (d in a) {
            b = a[d];
            h = !1;
            this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d) && (f || (this.symbolAttr(a), f = !0), h = !0);
            if (this.rotation && (d === "x" || d === "y"))
              this.doTransform = !0;
            h || (h = this[d + "Setter"] || this._defaultSetter, h.call(this, b, d, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, b, h));
          }
          if (this.doTransform)
            this.updateTransform(), this.doTransform = !1;
        }
        c && c();
        return g;
      },
      updateShadows: function(a, b, c) {
        for (var d = this.shadows,
            e = d.length; e--; )
          c.call(d[e], a === "height" ? Math.max(b - (d[e].cutHeight || 0), 0) : a === "d" ? this.d : b, a, d[e]);
      },
      addClass: function(a) {
        var b = this.element,
            c = K(b, "class") || "";
        c.indexOf(a) === -1 && K(b, "class", c + " " + a);
        return this;
      },
      symbolAttr: function(a) {
        var b = this;
        n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
          b[c] = o(a[c], b[c]);
        });
        b.attr({d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)});
      },
      clip: function(a) {
        return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
      },
      crisp: function(a) {
        var b,
            c = {},
            d,
            e = this.strokeWidth || 0;
        d = x(e) % 2 / 2;
        a.x = fa(a.x || this.x || 0) + d;
        a.y = fa(a.y || this.y || 0) + d;
        a.width = fa((a.width || this.width || 0) - 2 * d);
        a.height = fa((a.height || this.height || 0) - 2 * d);
        a.strokeWidth = e;
        for (b in a)
          this[b] !== a[b] && (this[b] = c[b] = a[b]);
        return c;
      },
      css: function(a) {
        var b = this.styles,
            c = {},
            d = this.element,
            e,
            f,
            g = "";
        e = !b;
        if (a && a.color)
          a.fill = a.color;
        if (b)
          for (f in a)
            a[f] !== b[f] && (c[f] = a[f], e = !0);
        if (e) {
          e = this.textWidth = a && a.width && d.nodeName.toLowerCase() === "text" && E(a.width) || this.textWidth;
          b && (a = r(b, c));
          this.styles = a;
          e && (ma || !ea && this.renderer.forExport) && delete a.width;
          if (xa && !ea)
            M(this.element, a);
          else {
            b = function(a, b) {
              return "-" + b.toLowerCase();
            };
            for (f in a)
              g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
            K(d, "style", g);
          }
          e && this.added && this.renderer.buildText(this);
        }
        return this;
      },
      on: function(a, b) {
        var c = this,
            d = c.element;
        Wa && a === "click" ? (d.ontouchstart = function(a) {
          c.touchEventFired = sa.now();
          a.preventDefault();
          b.call(d, a);
        }, d.onclick = function(a) {
          (ya.indexOf("Android") === -1 || sa.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a);
        }) : d["on" + a] = b;
        return this;
      },
      setRadialReference: function(a) {
        var b = this.renderer.gradients[this.element.gradient];
        this.element.radialReference = a;
        b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
        return this;
      },
      translate: function(a, b) {
        return this.attr({
          translateX: a,
          translateY: b
        });
      },
      invert: function() {
        this.inverted = !0;
        this.updateTransform();
        return this;
      },
      updateTransform: function() {
        var a = this.translateX || 0,
            b = this.translateY || 0,
            c = this.scaleX,
            d = this.scaleY,
            e = this.inverted,
            f = this.rotation,
            g = this.element;
        e && (a += this.attr("width"), b += this.attr("height"));
        a = ["translate(" + a + "," + b + ")"];
        e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")");
        (t(c) || t(d)) && a.push("scale(" + o(c, 1) + " " + o(d, 1) + ")");
        a.length && g.setAttribute("transform", a.join(" "));
      },
      toFront: function() {
        var a = this.element;
        a.parentNode.appendChild(a);
        return this;
      },
      align: function(a, b, c) {
        var d,
            e,
            f,
            g,
            h = {};
        e = this.renderer;
        f = e.alignedObjects;
        if (a) {
          if (this.alignOptions = a, this.alignByTranslate = b, !c || va(c))
            this.alignTo = d = c || "renderer", wa(f, this), f.push(this), c = null;
        } else
          a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
        c = o(c, e[d], e);
        d = a.align;
        e = a.verticalAlign;
        f = (c.x || 0) + (a.x || 0);
        g = (c.y || 0) + (a.y || 0);
        if (d === "right" || d === "center")
          f += (c.width - (a.width || 0)) / {
            right: 1,
            center: 2
          }[d];
        h[b ? "translateX" : "x"] = x(f);
        if (e === "bottom" || e === "middle")
          g += (c.height - (a.height || 0)) / ({
            bottom: 1,
            middle: 2
          }[e] || 1);
        h[b ? "translateY" : "y"] = x(g);
        this[this.placed ? "animate" : "attr"](h);
        this.placed = !0;
        this.alignAttr = h;
        return this;
      },
      getBBox: function(a, b) {
        var c,
            d = this.renderer,
            e,
            f,
            g,
            h = this.element,
            i = this.styles;
        e = this.textStr;
        var k,
            j = h.style,
            l,
            m = d.cache,
            p = d.cacheKeys,
            q;
        f = o(b, this.rotation);
        g = f * la;
        e !== w && (q = ["", f || 0, i && i.fontSize, h.style.width].join(","), q = e === "" || Nb.test(e) ? "num:" + e.toString().length + q : e + q);
        q && !a && (c = m[q]);
        if (!c) {
          if (h.namespaceURI === Fa || d.forExport) {
            try {
              l = this.fakeTS && function(a) {
                n(h.querySelectorAll(".highcharts-text-shadow"), function(b) {
                  b.style.display = a;
                });
              }, Ka && j.textShadow ? (k = j.textShadow, j.textShadow = "") : l && l("none"), c = h.getBBox ? r({}, h.getBBox()) : {
                width: h.offsetWidth,
                height: h.offsetHeight
              }, k ? j.textShadow = k : l && l("");
            } catch (A) {}
            if (!c || c.width < 0)
              c = {
                width: 0,
                height: 0
              };
          } else
            c = this.htmlGetBBox();
          if (d.isSVG) {
            d = c.width;
            e = c.height;
            if (xa && i && i.fontSize === "11px" && e.toPrecision(3) === "16.9")
              c.height = e = 14;
            if (f)
              c.width = S(e * qa(g)) + S(d * ka(g)), c.height = S(e * ka(g)) + S(d * qa(g));
          }
          if (q) {
            for (; p.length > 250; )
              delete m[p.shift()];
            m[q] || p.push(q);
            m[q] = c;
          }
        }
        return c;
      },
      show: function(a) {
        return this.attr({visibility: a ? "inherit" : "visible"});
      },
      hide: function() {
        return this.attr({visibility: "hidden"});
      },
      fadeOut: function(a) {
        var b = this;
        b.animate({opacity: 0}, {
          duration: a || 150,
          complete: function() {
            b.attr({y: -9999});
          }
        });
      },
      add: function(a) {
        var b = this.renderer,
            c = this.element,
            d;
        if (a)
          this.parentGroup = a;
        this.parentInverted = a && a.inverted;
        this.textStr !== void 0 && b.buildText(this);
        this.added = !0;
        if (!a || a.handleZ || this.zIndex)
          d = this.zIndexSetter();
        d || (a ? a.element : b.box).appendChild(c);
        if (this.onAdd)
          this.onAdd();
        return this;
      },
      safeRemoveChild: function(a) {
        var b = a.parentNode;
        b && b.removeChild(a);
      },
      destroy: function() {
        var a = this,
            b = a.element || {},
            c = a.shadows,
            d = a.renderer.isSVG && b.nodeName === "SPAN" && a.parentGroup,
            e,
            f;
        b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
        La(a);
        if (a.clipPath)
          a.clipPath = a.clipPath.destroy();
        if (a.stops) {
          for (f = 0; f < a.stops.length; f++)
            a.stops[f] = a.stops[f].destroy();
          a.stops = null;
        }
        a.safeRemoveChild(b);
        for (c && n(c, function(b) {
          a.safeRemoveChild(b);
        }); d && d.div && d.div.childNodes.length === 0; )
          b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b;
        a.alignTo && wa(a.renderer.alignedObjects, a);
        for (e in a)
          delete a[e];
        return null;
      },
      shadow: function(a, b, c) {
        var d = [],
            e,
            f,
            g = this.element,
            h,
            i,
            k,
            j;
        if (a) {
          i = o(a.width, 3);
          k = (a.opacity || 0.15) / i;
          j = this.parentInverted ? "(-1,-1)" : "(" + o(a.offsetX, 1) + ", " + o(a.offsetY, 1) + ")";
          for (e = 1; e <= i; e++) {
            f = g.cloneNode(0);
            h = i * 2 + 1 - 2 * e;
            K(f, {
              isShadow: "true",
              stroke: a.color || "black",
              "stroke-opacity": k * e,
              "stroke-width": h,
              transform: "translate" + j,
              fill: "none"
            });
            if (c)
              K(f, "height", u(K(f, "height") - h, 0)), f.cutHeight = h;
            b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g);
            d.push(f);
          }
          this.shadows = d;
        }
        return this;
      },
      xGetter: function(a) {
        this.element.nodeName === "circle" && (a = {
          x: "cx",
          y: "cy"
        }[a] || a);
        return this._defaultGetter(a);
      },
      _defaultGetter: function(a) {
        a = o(this[a], this.element ? this.element.getAttribute(a) : null, 0);
        /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
        return a;
      },
      dSetter: function(a, b, c) {
        a && a.join && (a = a.join(" "));
        /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
        c.setAttribute(b, a);
        this[b] = a;
      },
      dashstyleSetter: function(a) {
        var b,
            c = this["stroke-width"];
        c === "inherit" && (c = 1);
        if (a = a && a.toLowerCase()) {
          a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
          for (b = a.length; b--; )
            a[b] = E(a[b]) * c;
          a = a.join(",").replace(/NaN/g, "none");
          this.element.setAttribute("stroke-dasharray", a);
        }
      },
      alignSetter: function(a) {
        this.element.setAttribute("text-anchor", {
          left: "start",
          center: "middle",
          right: "end"
        }[a]);
      },
      opacitySetter: function(a, b, c) {
        this[b] = a;
        c.setAttribute(b, a);
      },
      titleSetter: function(a) {
        var b = this.element.getElementsByTagName("title")[0];
        b || (b = z.createElementNS(Fa, "title"), this.element.appendChild(b));
        b.firstChild && b.removeChild(b.firstChild);
        b.appendChild(z.createTextNode(String(o(a), "").replace(/<[^>]*>/g, "")));
      },
      textSetter: function(a) {
        if (a !== this.textStr)
          delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this);
      },
      fillSetter: function(a, b, c) {
        typeof a === "string" ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c);
      },
      visibilitySetter: function(a, b, c) {
        a === "inherit" ? c.removeAttribute(b) : c.setAttribute(b, a);
      },
      zIndexSetter: function(a, b) {
        var c = this.renderer,
            d = this.parentGroup,
            c = (d || c).element || c.box,
            e,
            f,
            g = this.element,
            h;
        e = this.added;
        var i;
        if (t(a))
          g.zIndex = a, a = +a, this[b] === a && (e = !1), this[b] = a;
        if (e) {
          if ((a = this.zIndex) && d)
            d.handleZ = !0;
          d = c.childNodes;
          for (i = 0; i < d.length && !h; i++)
            if (e = d[i], f = e.zIndex, e !== g && (E(f) > a || !t(a) && t(f)))
              c.insertBefore(g, e), h = !0;
          h || c.appendChild(g);
        }
        return h;
      },
      _defaultSetter: function(a, b, c) {
        c.setAttribute(b, a);
      }
    };
    Q.prototype.yGetter = Q.prototype.xGetter;
    Q.prototype.translateXSetter = Q.prototype.translateYSetter = Q.prototype.rotationSetter = Q.prototype.verticalAlignSetter = Q.prototype.scaleXSetter = Q.prototype.scaleYSetter = function(a, b) {
      this[b] = a;
      this.doTransform = !0;
    };
    Q.prototype["stroke-widthSetter"] = Q.prototype.strokeSetter = function(a, b, c) {
      this[b] = a;
      if (this.stroke && this["stroke-width"])
        this.strokeWidth = this["stroke-width"], Q.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0;
      else if (b === "stroke-width" && a === 0 && this.hasStroke)
        c.removeAttribute("stroke"), this.hasStroke = !1;
    };
    var oa = function() {
      this.init.apply(this, arguments);
    };
    oa.prototype = {
      Element: Q,
      init: function(a, b, c, d, e, f) {
        var g,
            d = this.createElement("svg").attr({version: "1.1"}).css(this.getStyle(d));
        g = d.element;
        a.appendChild(g);
        a.innerHTML.indexOf("xmlns") === -1 && K(g, "xmlns", Fa);
        this.isSVG = !0;
        this.box = g;
        this.boxWrapper = d;
        this.alignedObjects = [];
        this.url = (Ka || gb) && z.getElementsByTagName("base").length ? D.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
        this.createElement("desc").add().element.appendChild(z.createTextNode("Created with Highmaps 4.2.5"));
        this.defs = this.createElement("defs").add();
        this.allowHTML = f;
        this.forExport = e;
        this.gradients = {};
        this.cache = {};
        this.cacheKeys = [];
        this.imgCount = 0;
        this.setSize(b, c, !1);
        var h;
        if (Ka && a.getBoundingClientRect)
          this.subPixelFix = b = function() {
            M(a, {
              left: 0,
              top: 0
            });
            h = a.getBoundingClientRect();
            M(a, {
              left: ta(h.left) - h.left + "px",
              top: ta(h.top) - h.top + "px"
            });
          }, b(), N(D, "resize", b);
      },
      getStyle: function(a) {
        return this.style = r({
          fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
          fontSize: "12px"
        }, a);
      },
      isHidden: function() {
        return !this.boxWrapper.getBBox().width;
      },
      destroy: function() {
        var a = this.defs;
        this.box = null;
        this.boxWrapper = this.boxWrapper.destroy();
        db(this.gradients || {});
        this.gradients = null;
        if (a)
          this.defs = a.destroy();
        this.subPixelFix && Y(D, "resize", this.subPixelFix);
        return this.alignedObjects = null;
      },
      createElement: function(a) {
        var b = new this.Element;
        b.init(this, a);
        return b;
      },
      draw: function() {},
      getRadialAttr: function(a, b) {
        return {
          cx: a[0] - a[2] / 2 + b.cx * a[2],
          cy: a[1] - a[2] / 2 + b.cy * a[2],
          r: b.r * a[2]
        };
      },
      buildText: function(a) {
        for (var b = a.element,
            c = this,
            d = c.forExport,
            e = o(a.textStr, "").toString(),
            f = e.indexOf("<") !== -1,
            g = b.childNodes,
            h,
            i,
            k,
            j = K(b, "x"),
            l = a.styles,
            m = a.textWidth,
            p = l && l.lineHeight,
            q = l && l.textShadow,
            A = l && l.textOverflow === "ellipsis",
            ha = g.length,
            v = m && !a.added && this.box,
            B = function(a) {
              return p ? E(p) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : l && l.fontSize || c.style.fontSize || 12, a).h;
            },
            P = function(a) {
              return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            }; ha--; )
          b.removeChild(g[ha]);
        !f && !q && !A && e.indexOf(" ") === -1 ? b.appendChild(z.createTextNode(P(e))) : (h = /<.*style="([^"]+)".*>/, i = /<.*href="(http[^"]+)".*>/, v && v.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], e = Ha(e, function(a) {
          return a !== "";
        }), n(e, function(e, f) {
          var g,
              p = 0,
              e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
          g = e.split("|||");
          n(g, function(e) {
            if (e !== "" || g.length === 1) {
              var q = {},
                  n = z.createElementNS(Fa, "tspan"),
                  o;
              h.test(e) && (o = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), K(n, "style", o));
              i.test(e) && !d && (K(n, "onclick", 'location.href="' + e.match(i)[1] + '"'), M(n, {cursor: "pointer"}));
              e = P(e.replace(/<(.|\n)*?>/g, "") || " ");
              if (e !== " ") {
                n.appendChild(z.createTextNode(e));
                if (p)
                  q.dx = 0;
                else if (f && j !== null)
                  q.x = j;
                K(n, q);
                b.appendChild(n);
                !p && f && (!ea && d && M(n, {display: "block"}), K(n, "dy", B(n)));
                if (m) {
                  for (var q = e.replace(/([^\^])-/g, "$1- ").split(" "),
                      ha = g.length > 1 || f || q.length > 1 && l.whiteSpace !== "nowrap",
                      v,
                      t,
                      r = [],
                      u = B(n),
                      Ob = 1,
                      w = a.rotation,
                      s = e,
                      x = s.length; (ha || A) && (q.length || r.length); )
                    a.rotation = 0, v = a.getBBox(!0), t = v.width, !ea && c.forExport && (t = c.measureSpanWidth(n.firstChild.data, a.styles)), v = t > m, k === void 0 && (k = v), A && k ? (x /= 2, s === "" || !v && x < 0.5 ? q = [] : (s = e.substring(0, s.length + (v ? -1 : 1) * ta(x)), q = [s + (m > 3 ? "\u2026" : "")], n.removeChild(n.firstChild))) : !v || q.length === 1 ? (q = r, r = [], q.length && (Ob++, n = z.createElementNS(Fa, "tspan"), K(n, {
                      dy: u,
                      x: j
                    }), o && K(n, "style", o), b.appendChild(n)), t > m && (m = t)) : (n.removeChild(n.firstChild), r.unshift(q.pop())), q.length && n.appendChild(z.createTextNode(q.join(" ").replace(/- /g, "-")));
                  a.rotation = w;
                }
                p++;
              }
            }
          });
        }), k && a.attr("title", a.textStr), v && v.removeChild(b), q && a.applyTextShadow && a.applyTextShadow(q));
      },
      getContrast: function(a) {
        a = T(a).rgba;
        return a[0] + a[1] + a[2] > 384 ? "#000000" : "#FFFFFF";
      },
      button: function(a, b, c, d, e, f, g, h, i) {
        var k = this.label(a, b, c, i, null, null, null, null, "button"),
            j = 0,
            l,
            m,
            p,
            q,
            A,
            n,
            a = {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            e = C({
              "stroke-width": 1,
              stroke: "#CCCCCC",
              fill: {
                linearGradient: a,
                stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]
              },
              r: 2,
              padding: 5,
              style: {color: "black"}
            }, e);
        p = e.style;
        delete e.style;
        f = C(e, {
          stroke: "#68A",
          fill: {
            linearGradient: a,
            stops: [[0, "#FFF"], [1, "#ACF"]]
          }
        }, f);
        q = f.style;
        delete f.style;
        g = C(e, {
          stroke: "#68A",
          fill: {
            linearGradient: a,
            stops: [[0, "#9BD"], [1, "#CDF"]]
          }
        }, g);
        A = g.style;
        delete g.style;
        h = C(e, {style: {color: "#CCC"}}, h);
        n = h.style;
        delete h.style;
        N(k.element, xa ? "mouseover" : "mouseenter", function() {
          j !== 3 && k.attr(f).css(q);
        });
        N(k.element, xa ? "mouseout" : "mouseleave", function() {
          j !== 3 && (l = [e, f, g][j], m = [p, q, A][j], k.attr(l).css(m));
        });
        k.setState = function(a) {
          (k.state = j = a) ? a === 2 ? k.attr(g).css(A) : a === 3 && k.attr(h).css(n) : k.attr(e).css(p);
        };
        return k.on("click", function(a) {
          j !== 3 && d.call(k, a);
        }).attr(e).css(r({cursor: "default"}, p));
      },
      crispLine: function(a, b) {
        a[1] === a[4] && (a[1] = a[4] = x(a[1]) - b % 2 / 2);
        a[2] === a[5] && (a[2] = a[5] = x(a[2]) + b % 2 / 2);
        return a;
      },
      path: function(a) {
        var b = {fill: "none"};
        Ca(a) ? b.d = a : aa(a) && r(b, a);
        return this.createElement("path").attr(b);
      },
      circle: function(a, b, c) {
        a = aa(a) ? a : {
          x: a,
          y: b,
          r: c
        };
        b = this.createElement("circle");
        b.xSetter = b.ySetter = function(a, b, c) {
          c.setAttribute("c" + b, a);
        };
        return b.attr(a);
      },
      arc: function(a, b, c, d, e, f) {
        if (aa(a))
          b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x;
        a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
          innerR: d || 0,
          start: e || 0,
          end: f || 0
        });
        a.r = c;
        return a;
      },
      rect: function(a, b, c, d, e, f) {
        var e = aa(a) ? a.r : e,
            g = this.createElement("rect"),
            a = aa(a) ? a : a === w ? {} : {
              x: a,
              y: b,
              width: u(c, 0),
              height: u(d, 0)
            };
        if (f !== w)
          g.strokeWidth = f, a = g.crisp(a);
        if (e)
          a.r = e;
        g.rSetter = function(a, b, c) {
          K(c, {
            rx: a,
            ry: a
          });
        };
        return g.attr(a);
      },
      setSize: function(a, b, c) {
        var d = this.alignedObjects,
            e = d.length;
        this.width = a;
        this.height = b;
        for (this.boxWrapper[o(c, !0) ? "animate" : "attr"]({
          width: a,
          height: b
        }); e--; )
          d[e].align();
      },
      g: function(a) {
        var b = this.createElement("g");
        return t(a) ? b.attr({"class": "highcharts-" + a}) : b;
      },
      image: function(a, b, c, d, e) {
        var f = {preserveAspectRatio: "none"};
        arguments.length > 1 && r(f, {
          x: b,
          y: c,
          width: d,
          height: e
        });
        f = this.createElement("image").attr(f);
        f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
        return f;
      },
      symbol: function(a, b, c, d, e, f) {
        var g = this,
            h,
            i = this.symbols[a],
            i = i && i(x(b), x(c), d, e, f),
            k = /^url\((.*?)\)$/,
            j,
            l;
        if (i)
          h = this.path(i), r(h, {
            symbolName: a,
            x: b,
            y: c,
            width: d,
            height: e
          }), f && r(h, f);
        else if (k.test(a))
          l = function(a, b) {
            a.element && (a.attr({
              width: b[0],
              height: b[1]
            }), a.alignByTranslate || a.translate(x((d - b[0]) / 2), x((e - b[1]) / 2)));
          }, j = a.match(k)[1], a = Hb[j] || f && f.width && f.height && [f.width, f.height], h = this.image(j).attr({
            x: b,
            y: c
          }), h.isImg = !0, a ? l(h, a) : (h.attr({
            width: 0,
            height: 0
          }), da("img", {
            onload: function() {
              this.width === 0 && (M(this, {
                position: "absolute",
                top: "-999em"
              }), z.body.appendChild(this));
              l(h, Hb[j] = [this.width, this.height]);
              this.parentNode && this.parentNode.removeChild(this);
              g.imgCount--;
              if (!g.imgCount && O[g.chartIndex].onload)
                O[g.chartIndex].onload();
            },
            src: j
          }), this.imgCount++);
        return h;
      },
      symbols: {
        circle: function(a, b, c, d) {
          var e = 0.166 * c;
          return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"];
        },
        square: function(a, b, c, d) {
          return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"];
        },
        triangle: function(a, b, c, d) {
          return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"];
        },
        "triangle-down": function(a, b, c, d) {
          return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"];
        },
        diamond: function(a, b, c, d) {
          return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"];
        },
        arc: function(a, b, c, d, e) {
          var f = e.start,
              c = e.r || c || d,
              g = e.end - 0.001,
              d = e.innerR,
              h = e.open,
              i = ka(f),
              k = qa(f),
              j = ka(g),
              g = qa(g),
              e = e.end - f < pb ? 0 : 1;
          return ["M", a + c * i, b + c * k, "A", c, c, 0, e, 1, a + c * j, b + c * g, h ? "M" : "L", a + d * j, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * k, h ? "" : "Z"];
        },
        callout: function(a, b, c, d, e) {
          var f = I(e && e.r || 0, c, d),
              g = f + 6,
              h = e && e.anchorX,
              e = e && e.anchorY,
              i;
          i = ["M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b];
          h && h > c && e > b + g && e < b + d - g ? i.splice(13, 3, "L", a + c, e - 6, a + c + 6, e, a + c, e + 6, a + c, b + d - f) : h && h < 0 && e > b + g && e < b + d - g ? i.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + f) : e && e > d && h > a + g && h < a + c - g ? i.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : e && e < 0 && h > a + g && h < a + c - g && i.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b);
          return i;
        }
      },
      clipRect: function(a, b, c, d) {
        var e = "highcharts-" + qb++,
            f = this.createElement("clipPath").attr({id: e}).add(this.defs),
            a = this.rect(a, b, c, d, 0).add(f);
        a.id = e;
        a.clipPath = f;
        a.count = 0;
        return a;
      },
      text: function(a, b, c, d) {
        var e = ma || !ea && this.forExport,
            f = {};
        if (d && (this.allowHTML || !this.forExport))
          return this.html(a, b, c);
        f.x = Math.round(b || 0);
        if (c)
          f.y = Math.round(c);
        if (a || a === 0)
          f.text = a;
        a = this.createElement("text").attr(f);
        e && a.css({position: "absolute"});
        if (!d)
          a.xSetter = function(a, b, c) {
            var d = c.getElementsByTagName("tspan"),
                e,
                f = c.getAttribute(b),
                m;
            for (m = 0; m < d.length; m++)
              e = d[m], e.getAttribute(b) === f && e.setAttribute(b, a);
            c.setAttribute(b, a);
          };
        return a;
      },
      fontMetrics: function(a, b) {
        var c,
            d,
            a = a || this.style.fontSize;
        !a && b && D.getComputedStyle && (b = b.element || b, a = (c = D.getComputedStyle(b, "")) && c.fontSize);
        a = /px/.test(a) ? E(a) : /em/.test(a) ? parseFloat(a) * 12 : 12;
        c = a < 24 ? a + 3 : x(a * 1.2);
        d = x(c * 0.8);
        return {
          h: c,
          b: d,
          f: a
        };
      },
      rotCorr: function(a, b, c) {
        var d = a;
        b && c && (d = u(d * ka(b * la), 4));
        return {
          x: -a / 3 * qa(b * la),
          y: d
        };
      },
      label: function(a, b, c, d, e, f, g, h, i) {
        var k = this,
            j = k.g(i),
            l = k.text("", 0, 0, g).attr({zIndex: 1}),
            m,
            p,
            q = 0,
            A = 3,
            o = 0,
            v,
            B,
            P,
            u,
            s = 0,
            ca = {},
            z,
            y,
            J,
            D,
            E;
        J = function() {
          var a,
              b;
          a = l.element.style;
          p = (v === void 0 || B === void 0 || j.styles.textAlign) && t(l.textStr) && l.getBBox();
          j.width = (v || p.width || 0) + 2 * A + o;
          j.height = (B || p.height || 0) + 2 * A;
          z = A + k.fontMetrics(a && a.fontSize, l).b;
          if (y) {
            if (!m)
              a = s, b = (h ? -z : 0) + s, j.box = m = d ? k.symbol(d, a, b, j.width, j.height, ca) : k.rect(a, b, j.width, j.height, 0, ca["stroke-width"]), m.isImg || m.attr("fill", "none"), m.add(j);
            m.isImg || m.attr(r({
              width: x(j.width),
              height: x(j.height)
            }, ca));
            ca = null;
          }
        };
        D = function() {
          var a = j.styles,
              a = a && a.textAlign,
              b = o + A,
              c;
          c = h ? 0 : z;
          if (t(v) && p && (a === "center" || a === "right"))
            b += {
              center: 0.5,
              right: 1
            }[a] * (v - p.width);
          if (b !== l.x || c !== l.y)
            l.attr("x", b), c !== w && l.attr("y", c);
          l.x = b;
          l.y = c;
        };
        E = function(a, b) {
          m ? m.attr(a, b) : ca[a] = b;
        };
        j.onAdd = function() {
          l.add(j);
          j.attr({
            text: a || a === 0 ? a : "",
            x: b,
            y: c
          });
          m && t(e) && j.attr({
            anchorX: e,
            anchorY: f
          });
        };
        j.widthSetter = function(a) {
          v = a;
        };
        j.heightSetter = function(a) {
          B = a;
        };
        j.paddingSetter = function(a) {
          if (t(a) && a !== A)
            A = j.padding = a, D();
        };
        j.paddingLeftSetter = function(a) {
          t(a) && a !== o && (o = a, D());
        };
        j.alignSetter = function(a) {
          a = {
            left: 0,
            center: 0.5,
            right: 1
          }[a];
          a !== q && (q = a, p && j.attr({x: P}));
        };
        j.textSetter = function(a) {
          a !== w && l.textSetter(a);
          J();
          D();
        };
        j["stroke-widthSetter"] = function(a, b) {
          a && (y = !0);
          s = a % 2 / 2;
          E(b, a);
        };
        j.strokeSetter = j.fillSetter = j.rSetter = function(a, b) {
          b === "fill" && a && (y = !0);
          E(b, a);
        };
        j.anchorXSetter = function(a, b) {
          e = a;
          E(b, x(a) - s - P);
        };
        j.anchorYSetter = function(a, b) {
          f = a;
          E(b, a - u);
        };
        j.xSetter = function(a) {
          j.x = a;
          q && (a -= q * ((v || p.width) + 2 * A));
          P = x(a);
          j.attr("translateX", P);
        };
        j.ySetter = function(a) {
          u = j.y = x(a);
          j.attr("translateY", u);
        };
        var I = j.css;
        return r(j, {
          css: function(a) {
            if (a) {
              var b = {},
                  a = C(a);
              n(j.textProps, function(c) {
                a[c] !== w && (b[c] = a[c], delete a[c]);
              });
              l.css(b);
            }
            return I.call(j, a);
          },
          getBBox: function() {
            return {
              width: p.width + 2 * A,
              height: p.height + 2 * A,
              x: p.x - A,
              y: p.y - A
            };
          },
          shadow: function(a) {
            m && m.shadow(a);
            return j;
          },
          destroy: function() {
            Y(j.element, "mouseenter");
            Y(j.element, "mouseleave");
            l && (l = l.destroy());
            m && (m = m.destroy());
            Q.prototype.destroy.call(j);
            j = k = J = D = E = null;
          }
        });
      }
    };
    Ta = oa;
    r(Q.prototype, {
      htmlCss: function(a) {
        var b = this.element;
        if (b = a && b.tagName === "SPAN" && a.width)
          delete a.width, this.textWidth = b, this.updateTransform();
        if (a && a.textOverflow === "ellipsis")
          a.whiteSpace = "nowrap", a.overflow = "hidden";
        this.styles = r(this.styles, a);
        M(this.element, a);
        return this;
      },
      htmlGetBBox: function() {
        var a = this.element;
        if (a.nodeName === "text")
          a.style.position = "absolute";
        return {
          x: a.offsetLeft,
          y: a.offsetTop,
          width: a.offsetWidth,
          height: a.offsetHeight
        };
      },
      htmlUpdateTransform: function() {
        if (this.added) {
          var a = this.renderer,
              b = this.element,
              c = this.translateX || 0,
              d = this.translateY || 0,
              e = this.x || 0,
              f = this.y || 0,
              g = this.textAlign || "left",
              h = {
                left: 0,
                center: 0.5,
                right: 1
              }[g],
              i = this.shadows,
              k = this.styles;
          M(b, {
            marginLeft: c,
            marginTop: d
          });
          i && n(i, function(a) {
            M(a, {
              marginLeft: c + 1,
              marginTop: d + 1
            });
          });
          this.inverted && n(b.childNodes, function(c) {
            a.invertChild(c, b);
          });
          if (b.tagName === "SPAN") {
            var i = this.rotation,
                j = E(this.textWidth),
                l = k && k.whiteSpace,
                m = [i, g, b.innerHTML, this.textWidth, this.textAlign].join(",");
            if (m !== this.cTT) {
              k = a.fontMetrics(b.style.fontSize).b;
              t(i) && this.setSpanRotation(i, h, k);
              if (b.offsetWidth > j && /[ \-]/.test(b.textContent || b.innerText))
                M(b, {
                  width: j + "px",
                  display: "block",
                  whiteSpace: l || "normal"
                }), this.hasTextWidth = !0;
              else if (this.hasTextWidth)
                M(b, {
                  width: "",
                  display: "",
                  whiteSpace: l || "nowrap"
                }), this.hasTextWidth = !1;
              this.getSpanCorrection(this.hasTextWidth ? j : b.offsetWidth, k, h, i, g);
            }
            M(b, {
              left: e + (this.xCorr || 0) + "px",
              top: f + (this.yCorr || 0) + "px"
            });
            if (gb)
              k = b.offsetHeight;
            this.cTT = m;
          }
        } else
          this.alignOnAdd = !0;
      },
      setSpanRotation: function(a, b, c) {
        var d = {},
            e = xa ? "-ms-transform" : gb ? "-webkit-transform" : Ka ? "MozTransform" : Fb ? "-o-transform" : "";
        d[e] = d.transform = "rotate(" + a + "deg)";
        d[e + (Ka ? "Origin" : "-origin")] = d.transformOrigin = b * 100 + "% " + c + "px";
        M(this.element, d);
      },
      getSpanCorrection: function(a, b, c) {
        this.xCorr = -a * c;
        this.yCorr = -b;
      }
    });
    r(oa.prototype, {html: function(a, b, c) {
        var d = this.createElement("span"),
            e = d.element,
            f = d.renderer,
            g = f.isSVG,
            h = function(a, b) {
              n(["opacity", "visibility"], function(c) {
                ga(a, c + "Setter", function(a, c, d, e) {
                  a.call(this, c, d, e);
                  b[d] = c;
                });
              });
            };
        d.textSetter = function(a) {
          a !== e.innerHTML && delete this.bBox;
          e.innerHTML = this.textStr = a;
          d.htmlUpdateTransform();
        };
        g && h(d, d.element.style);
        d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
          b === "align" && (b = "textAlign");
          d[b] = a;
          d.htmlUpdateTransform();
        };
        d.attr({
          text: a,
          x: x(b),
          y: x(c)
        }).css({
          position: "absolute",
          fontFamily: this.style.fontFamily,
          fontSize: this.style.fontSize
        });
        e.style.whiteSpace = "nowrap";
        d.css = d.htmlCss;
        if (g)
          d.add = function(a) {
            var b,
                c = f.box.parentNode,
                g = [];
            if (this.parentGroup = a) {
              if (b = a.div, !b) {
                for (; a; )
                  g.push(a), a = a.parentGroup;
                n(g.reverse(), function(a) {
                  var d,
                      e = K(a.element, "class");
                  e && (e = {className: e});
                  b = a.div = a.div || da(Ja, e, {
                    position: "absolute",
                    left: (a.translateX || 0) + "px",
                    top: (a.translateY || 0) + "px",
                    opacity: a.opacity
                  }, b || c);
                  d = b.style;
                  r(a, {
                    translateXSetter: function(b, c) {
                      d.left = b + "px";
                      a[c] = b;
                      a.doTransform = !0;
                    },
                    translateYSetter: function(b, c) {
                      d.top = b + "px";
                      a[c] = b;
                      a.doTransform = !0;
                    }
                  });
                  h(a, d);
                });
              }
            } else
              b = c;
            b.appendChild(e);
            d.added = !0;
            d.alignOnAdd && d.htmlUpdateTransform();
            return d;
          };
        return d;
      }});
    var Za,
        U;
    if (!ea && !ma)
      U = {
        init: function(a, b) {
          var c = ["<", b, ' filled="f" stroked="f"'],
              d = ["position: ", "absolute", ";"],
              e = b === Ja;
          (b === "shape" || e) && d.push("left:0;top:0;width:1px;height:1px;");
          d.push("visibility: ", e ? "hidden" : "visible");
          c.push(' style="', d.join(""), '"/>');
          if (b)
            c = e || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = da(c);
          this.renderer = a;
        },
        add: function(a) {
          var b = this.renderer,
              c = this.element,
              d = b.box,
              e = a && a.inverted,
              d = a ? a.element || a : d;
          if (a)
            this.parentGroup = a;
          e && b.invertChild(c, d);
          d.appendChild(c);
          this.added = !0;
          this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
          if (this.onAdd)
            this.onAdd();
          return this;
        },
        updateTransform: Q.prototype.htmlUpdateTransform,
        setSpanRotation: function() {
          var a = this.rotation,
              b = ka(a * la),
              c = qa(a * la);
          M(this.element, {filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : "none"});
        },
        getSpanCorrection: function(a, b, c, d, e) {
          var f = d ? ka(d * la) : 1,
              g = d ? qa(d * la) : 0,
              h = o(this.elemHeight, this.element.offsetHeight),
              i;
          this.xCorr = f < 0 && -a;
          this.yCorr = g < 0 && -h;
          i = f * g < 0;
          this.xCorr += g * b * (i ? 1 - c : c);
          this.yCorr -= f * b * (d ? i ? c : 1 - c : 1);
          e && e !== "left" && (this.xCorr -= a * c * (f < 0 ? -1 : 1), d && (this.yCorr -= h * c * (g < 0 ? -1 : 1)), M(this.element, {textAlign: e}));
        },
        pathToVML: function(a) {
          for (var b = a.length,
              c = []; b--; )
            if (F(a[b]))
              c[b] = x(a[b] * 10) - 5;
            else if (a[b] === "Z")
              c[b] = "x";
            else if (c[b] = a[b], a.isArc && (a[b] === "wa" || a[b] === "at"))
              c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1);
          return c.join(" ") || "x";
        },
        clip: function(a) {
          var b = this,
              c;
          a ? (c = a.members, wa(c, b), c.push(b), b.destroyClip = function() {
            wa(c, b);
          }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {clip: fb ? "inherit" : "rect(auto)"});
          return b.css(a);
        },
        css: Q.prototype.htmlCss,
        safeRemoveChild: function(a) {
          a.parentNode && Qa(a);
        },
        destroy: function() {
          this.destroyClip && this.destroyClip();
          return Q.prototype.destroy.apply(this);
        },
        on: function(a, b) {
          this.element["on" + a] = function() {
            var a = D.event;
            a.target = a.srcElement;
            b(a);
          };
          return this;
        },
        cutOffPath: function(a, b) {
          var c,
              a = a.split(/[ ,]/);
          c = a.length;
          if (c === 9 || c === 11)
            a[c - 4] = a[c - 2] = E(a[c - 2]) - 10 * b;
          return a.join(" ");
        },
        shadow: function(a, b, c) {
          var d = [],
              e,
              f = this.element,
              g = this.renderer,
              h,
              i = f.style,
              k,
              j = f.path,
              l,
              m,
              p,
              q;
          j && typeof j.value !== "string" && (j = "x");
          m = j;
          if (a) {
            p = o(a.width, 3);
            q = (a.opacity || 0.15) / p;
            for (e = 1; e <= 3; e++) {
              l = p * 2 + 1 - 2 * e;
              c && (m = this.cutOffPath(j.value, l + 0.5));
              k = ['<shape isShadow="true" strokeweight="', l, '" filled="false" path="', m, '" coordsize="10 10" style="', f.style.cssText, '" />'];
              h = da(g.prepVML(k), null, {
                left: E(i.left) + o(a.offsetX, 1),
                top: E(i.top) + o(a.offsetY, 1)
              });
              if (c)
                h.cutOff = l + 1;
              k = ['<stroke color="', a.color || "black", '" opacity="', q * e, '"/>'];
              da(g.prepVML(k), null, null, h);
              b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
              d.push(h);
            }
            this.shadows = d;
          }
          return this;
        },
        updateShadows: W,
        setAttr: function(a, b) {
          fb ? this.element[a] = b : this.element.setAttribute(a, b);
        },
        classSetter: function(a) {
          this.element.className = a;
        },
        dashstyleSetter: function(a, b, c) {
          (c.getElementsByTagName("stroke")[0] || da(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid";
          this[b] = a;
        },
        dSetter: function(a, b, c) {
          var d = this.shadows,
              a = a || [];
          this.d = a.join && a.join(" ");
          c.path = a = this.pathToVML(a);
          if (d)
            for (c = d.length; c--; )
              d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
          this.setAttr(b, a);
        },
        fillSetter: function(a, b, c) {
          var d = c.nodeName;
          if (d === "SPAN")
            c.style.color = a;
          else if (d !== "IMG")
            c.filled = a !== "none", this.setAttr("fillcolor", this.renderer.color(a, c, b, this));
        },
        "fill-opacitySetter": function(a, b, c) {
          da(this.renderer.prepVML(["<", b.split("-")[0], ' opacity="', a, '"/>']), null, null, c);
        },
        opacitySetter: W,
        rotationSetter: function(a, b, c) {
          c = c.style;
          this[b] = c[b] = a;
          c.left = -x(qa(a * la) + 1) + "px";
          c.top = x(ka(a * la)) + "px";
        },
        strokeSetter: function(a, b, c) {
          this.setAttr("strokecolor", this.renderer.color(a, c, b, this));
        },
        "stroke-widthSetter": function(a, b, c) {
          c.stroked = !!a;
          this[b] = a;
          F(a) && (a += "px");
          this.setAttr("strokeweight", a);
        },
        titleSetter: function(a, b) {
          this.setAttr(b, a);
        },
        visibilitySetter: function(a, b, c) {
          a === "inherit" && (a = "visible");
          this.shadows && n(this.shadows, function(c) {
            c.style[b] = a;
          });
          c.nodeName === "DIV" && (a = a === "hidden" ? "-999em" : 0, fb || (c.style[b] = a ? "visible" : "hidden"), b = "top");
          c.style[b] = a;
        },
        xSetter: function(a, b, c) {
          this[b] = a;
          b === "x" ? b = "left" : b === "y" && (b = "top");
          this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a;
        },
        zIndexSetter: function(a, b, c) {
          c.style[b] = a;
        }
      }, U["stroke-opacitySetter"] = U["fill-opacitySetter"], s.VMLElement = U = ba(Q, U), U.prototype.ySetter = U.prototype.widthSetter = U.prototype.heightSetter = U.prototype.xSetter, U = {
        Element: U,
        isIE8: ya.indexOf("MSIE 8.0") > -1,
        init: function(a, b, c, d) {
          var e;
          this.alignedObjects = [];
          d = this.createElement(Ja).css(r(this.getStyle(d), {position: "relative"}));
          e = d.element;
          a.appendChild(d.element);
          this.isVML = !0;
          this.box = e;
          this.boxWrapper = d;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(b, c, !1);
          if (!z.namespaces.hcv) {
            z.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
            try {
              z.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            } catch (f) {
              z.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            }
          }
        },
        isHidden: function() {
          return !this.box.offsetWidth;
        },
        clipRect: function(a, b, c, d) {
          var e = this.createElement(),
              f = aa(a);
          return r(e, {
            members: [],
            count: 0,
            left: (f ? a.x : a) + 1,
            top: (f ? a.y : b) + 1,
            width: (f ? a.width : c) - 1,
            height: (f ? a.height : d) - 1,
            getCSS: function(a) {
              var b = a.element,
                  c = b.nodeName,
                  a = a.inverted,
                  d = this.top - (c === "shape" ? b.offsetTop : 0),
                  e = this.left,
                  b = e + this.width,
                  f = d + this.height,
                  d = {clip: "rect(" + x(a ? e : d) + "px," + x(a ? f : b) + "px," + x(a ? b : f) + "px," + x(a ? d : e) + "px)"};
              !a && fb && c === "DIV" && r(d, {
                width: b + "px",
                height: f + "px"
              });
              return d;
            },
            updateClipping: function() {
              n(e.members, function(a) {
                a.element && a.css(e.getCSS(a));
              });
            }
          });
        },
        color: function(a, b, c, d) {
          var e = this,
              f,
              g = /^rgba/,
              h,
              i,
              k = "none";
          a && a.linearGradient ? i = "gradient" : a && a.radialGradient && (i = "pattern");
          if (i) {
            var j,
                l,
                m = a.linearGradient || a.radialGradient,
                p,
                q,
                A,
                o,
                v,
                B = "",
                a = a.stops,
                P,
                t = [],
                r = function() {
                  h = ['<fill colors="' + t.join(",") + '" opacity="', A, '" o:opacity2="', q, '" type="', i, '" ', B, 'focus="100%" method="any" />'];
                  da(e.prepVML(h), null, null, b);
                };
            p = a[0];
            P = a[a.length - 1];
            p[0] > 0 && a.unshift([0, p[1]]);
            P[0] < 1 && a.push([1, P[1]]);
            n(a, function(a, b) {
              g.test(a[1]) ? (f = T(a[1]), j = f.get("rgb"), l = f.get("a")) : (j = a[1], l = 1);
              t.push(a[0] * 100 + "% " + j);
              b ? (A = l, o = j) : (q = l, v = j);
            });
            if (c === "fill")
              if (i === "gradient")
                c = m.x1 || m[0] || 0, a = m.y1 || m[1] || 0, p = m.x2 || m[2] || 0, m = m.y2 || m[3] || 0, B = 'angle="' + (90 - H.atan((m - a) / (p - c)) * 180 / pb) + '"', r();
              else {
                var k = m.r,
                    ca = k * 2,
                    u = k * 2,
                    s = m.cx,
                    w = m.cy,
                    x = b.radialReference,
                    z,
                    k = function() {
                      x && (z = d.getBBox(), s += (x[0] - z.x) / z.width - 0.5, w += (x[1] - z.y) / z.height - 0.5, ca *= x[2] / z.width, u *= x[2] / z.height);
                      B = 'src="' + L.global.VMLRadialGradientURL + '" size="' + ca + "," + u + '" origin="0.5,0.5" position="' + s + "," + w + '" color2="' + v + '" ';
                      r();
                    };
                d.added ? k() : d.onAdd = k;
                k = o;
              }
            else
              k = j;
          } else if (g.test(a) && b.tagName !== "IMG")
            f = T(a), d[c + "-opacitySetter"](f.get("a"), c, b), k = f.get("rgb");
          else {
            k = b.getElementsByTagName(c);
            if (k.length)
              k[0].opacity = 1, k[0].type = "solid";
            k = a;
          }
          return k;
        },
        prepVML: function(a) {
          var b = this.isIE8,
              a = a.join("");
          b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
          return a;
        },
        text: oa.prototype.html,
        path: function(a) {
          var b = {coordsize: "10 10"};
          Ca(a) ? b.d = a : aa(a) && r(b, a);
          return this.createElement("shape").attr(b);
        },
        circle: function(a, b, c) {
          var d = this.symbol("circle");
          if (aa(a))
            c = a.r, b = a.y, a = a.x;
          d.isCircle = !0;
          d.r = c;
          return d.attr({
            x: a,
            y: b
          });
        },
        g: function(a) {
          var b;
          a && (b = {
            className: "highcharts-" + a,
            "class": "highcharts-" + a
          });
          return this.createElement(Ja).attr(b);
        },
        image: function(a, b, c, d, e) {
          var f = this.createElement("img").attr({src: a});
          arguments.length > 1 && f.attr({
            x: b,
            y: c,
            width: d,
            height: e
          });
          return f;
        },
        createElement: function(a) {
          return a === "rect" ? this.symbol(a) : oa.prototype.createElement.call(this, a);
        },
        invertChild: function(a, b) {
          var c = this,
              d = b.style,
              e = a.tagName === "IMG" && a.style;
          M(a, {
            flip: "x",
            left: E(d.width) - (e ? E(e.top) : 1),
            top: E(d.height) - (e ? E(e.left) : 1),
            rotation: -90
          });
          n(a.childNodes, function(b) {
            c.invertChild(b, a);
          });
        },
        symbols: {
          arc: function(a, b, c, d, e) {
            var f = e.start,
                g = e.end,
                h = e.r || c || d,
                c = e.innerR,
                d = ka(f),
                i = qa(f),
                k = ka(g),
                j = qa(g);
            if (g - f === 0)
              return ["x"];
            f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * k, b + h * j];
            e.open && !c && f.push("e", "M", a, b);
            f.push("at", a - c, b - c, a + c, b + c, a + c * k, b + c * j, a + c * d, b + c * i, "x", "e");
            f.isArc = !0;
            return f;
          },
          circle: function(a, b, c, d, e) {
            e && (c = d = 2 * e.r);
            e && e.isCircle && (a -= c / 2, b -= d / 2);
            return ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"];
          },
          rect: function(a, b, c, d, e) {
            return oa.prototype.symbols[!t(e) || !e.r ? "square" : "callout"].call(0, a, b, c, d, e);
          }
        }
      }, s.VMLRenderer = Za = function() {
        this.init.apply(this, arguments);
      }, Za.prototype = C(oa.prototype, U), Ta = Za;
    oa.prototype.measureSpanWidth = function(a, b) {
      var c = z.createElement("span"),
          d;
      d = z.createTextNode(a);
      c.appendChild(d);
      M(c, b);
      this.box.appendChild(c);
      d = c.offsetWidth;
      Qa(c);
      return d;
    };
    var Ib;
    if (ma)
      s.CanVGRenderer = U = function() {
        Fa = "http://www.w3.org/1999/xhtml";
      }, U.prototype.symbols = {}, Ib = function() {
        function a() {
          var a = b.length,
              d;
          for (d = 0; d < a; d++)
            b[d]();
          b = [];
        }
        var b = [];
        return {push: function(c, d) {
            if (b.length === 0) {
              var e = z.getElementsByTagName("head")[0],
                  f = z.createElement("script");
              f.type = "text/javascript";
              f.src = d;
              f.onload = a;
              e.appendChild(f);
            }
            b.push(c);
          }};
      }(), Ta = U;
    Sa.prototype = {
      addLabel: function() {
        var a = this.axis,
            b = a.options,
            c = a.chart,
            d = a.categories,
            e = a.names,
            f = this.pos,
            g = b.labels,
            h = a.tickPositions,
            i = f === h[0],
            k = f === h[h.length - 1],
            e = d ? o(d[f], e[f], f) : f,
            d = this.label,
            h = h.info,
            j;
        a.isDatetimeAxis && h && (j = b.dateTimeLabelFormats[h.higherRanks[f] || h.unitName]);
        this.isFirst = i;
        this.isLast = k;
        b = a.labelFormatter.call({
          axis: a,
          chart: c,
          isFirst: i,
          isLast: k,
          dateTimeLabelFormat: j,
          value: a.isLog ? pa(a.lin2log(e)) : e
        });
        t(d) ? d && d.attr({text: b}) : (this.labelLength = (this.label = d = t(b) && g.enabled ? c.renderer.text(b, 0, 0, g.useHTML).css(C(g.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0);
      },
      getLabelSize: function() {
        return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
      },
      handleOverflow: function(a) {
        var b = this.axis,
            c = a.x,
            d = b.chart.chartWidth,
            e = b.chart.spacing,
            f = o(b.labelLeft, I(b.pos, e[3])),
            e = o(b.labelRight, u(b.pos + b.len, d - e[1])),
            g = this.label,
            h = this.rotation,
            i = {
              left: 0,
              center: 0.5,
              right: 1
            }[b.labelAlign],
            k = g.getBBox().width,
            j = b.getSlotWidth(),
            l = j,
            m = 1,
            p,
            q = {};
        if (h)
          h < 0 && c - i * k < f ? p = x(c / ka(h * la) - f) : h > 0 && c + i * k > e && (p = x((d - c) / ka(h * la)));
        else if (d = c + (1 - i) * k, c - i * k < f ? l = a.x + l * (1 - i) - f : d > e && (l = e - a.x + l * i, m = -1), l = I(j, l), l < j && b.labelAlign === "center" && (a.x += m * (j - l - i * (j - I(k, l)))), k > l || b.autoRotation && g.styles.width)
          p = l;
        if (p) {
          q.width = p;
          if (!b.options.labels.style.textOverflow)
            q.textOverflow = "ellipsis";
          g.css(q);
        }
      },
      getPosition: function(a, b, c, d) {
        var e = this.axis,
            f = e.chart,
            g = d && f.oldChartHeight || f.chartHeight;
        return {
          x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
          y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
        };
      },
      getLabelPosition: function(a, b, c, d, e, f, g, h) {
        var i = this.axis,
            k = i.transA,
            j = i.reversed,
            l = i.staggerLines,
            m = i.tickRotCorr || {
              x: 0,
              y: 0
            },
            p = e.y;
        t(p) || (p = i.side === 0 ? c.rotation ? -8 : -c.getBBox().height : i.side === 2 ? m.y + 8 : ka(c.rotation * la) * (m.y - c.getBBox(!1, 0).height / 2));
        a = a + e.x + m.x - (f && d ? f * k * (j ? -1 : 1) : 0);
        b = b + p - (f && !d ? f * k * (j ? 1 : -1) : 0);
        l && (c = g / (h || 1) % l, i.opposite && (c = l - c - 1), b += c * (i.labelOffset / l));
        return {
          x: a,
          y: x(b)
        };
      },
      getMarkPath: function(a, b, c, d, e, f) {
        return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d);
      },
      render: function(a, b, c) {
        var d = this.axis,
            e = d.options,
            f = d.chart.renderer,
            g = d.horiz,
            h = this.type,
            i = this.label,
            k = this.pos,
            j = e.labels,
            l = this.gridLine,
            m = h ? h + "Grid" : "grid",
            p = h ? h + "Tick" : "tick",
            q = e[m + "LineWidth"],
            A = e[m + "LineColor"],
            n = e[m + "LineDashStyle"],
            m = d.tickSize(p),
            p = e[p + "Color"],
            v = this.mark,
            B = j.step,
            P = !0,
            t = d.tickmarkOffset,
            r = this.getPosition(g, k, t, b),
            ca = r.x,
            r = r.y,
            u = g && ca === d.pos + d.len || !g && r === d.pos ? -1 : 1,
            c = o(c, 1);
        this.isActive = !0;
        if (q) {
          k = d.getPlotLinePath(k + t, q * u, b, !0);
          if (l === w) {
            l = {
              stroke: A,
              "stroke-width": q
            };
            if (n)
              l.dashstyle = n;
            if (!h)
              l.zIndex = 1;
            if (b)
              l.opacity = 0;
            this.gridLine = l = q ? f.path(k).attr(l).add(d.gridGroup) : null;
          }
          if (!b && l && k)
            l[this.isNew ? "attr" : "animate"]({
              d: k,
              opacity: c
            });
        }
        if (m)
          d.opposite && (m[0] = -m[0]), h = this.getMarkPath(ca, r, m[0], m[1] * u, g, f), v ? v.animate({
            d: h,
            opacity: c
          }) : this.mark = f.path(h).attr({
            stroke: p,
            "stroke-width": m[1],
            opacity: c
          }).add(d.axisGroup);
        if (i && F(ca))
          i.xy = r = this.getLabelPosition(ca, r, i, g, j, t, a, B), this.isFirst && !this.isLast && !o(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !o(e.showLastLabel, 1) ? P = !1 : g && !d.isRadial && !j.step && !j.rotation && !b && c !== 0 && this.handleOverflow(r), B && a % B && (P = !1), P && F(r.y) ? (r.opacity = c, i[this.isNew ? "attr" : "animate"](r), this.isNew = !1) : i.attr("y", -9999);
      },
      destroy: function() {
        db(this, this.axis);
      }
    };
    var X = s.Axis = function() {
      this.init.apply(this, arguments);
    };
    X.prototype = {
      defaultOptions: {
        dateTimeLabelFormats: {
          millisecond: "%H:%M:%S.%L",
          second: "%H:%M:%S",
          minute: "%H:%M",
          hour: "%H:%M",
          day: "%e. %b",
          week: "%e. %b",
          month: "%b '%y",
          year: "%Y"
        },
        endOnTick: !1,
        gridLineColor: "#D8D8D8",
        labels: {
          enabled: !0,
          style: {
            color: "#606060",
            cursor: "default",
            fontSize: "11px"
          },
          x: 0
        },
        lineColor: "#C0D0E0",
        lineWidth: 1,
        minPadding: 0.01,
        maxPadding: 0.01,
        minorGridLineColor: "#E0E0E0",
        minorGridLineWidth: 1,
        minorTickColor: "#A0A0A0",
        minorTickLength: 2,
        minorTickPosition: "outside",
        startOfWeek: 1,
        startOnTick: !1,
        tickColor: "#C0D0E0",
        tickLength: 10,
        tickmarkPlacement: "between",
        tickPixelInterval: 100,
        tickPosition: "outside",
        title: {
          align: "middle",
          style: {color: "#707070"}
        },
        type: "linear"
      },
      defaultYAxisOptions: {
        endOnTick: !0,
        gridLineWidth: 1,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: {x: -8},
        lineWidth: 0,
        maxPadding: 0.05,
        minPadding: 0.05,
        startOnTick: !0,
        title: {
          rotation: 270,
          text: "Values"
        },
        stackLabels: {
          enabled: !1,
          formatter: function() {
            return s.numberFormat(this.total, -1);
          },
          style: C(Z.line.dataLabels.style, {color: "#000000"})
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
      init: function(a, b) {
        var c = b.isX;
        this.chart = a;
        this.horiz = a.inverted ? !c : c;
        this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis";
        this.opposite = b.opposite;
        this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
        this.setOptions(b);
        var d = this.options,
            e = d.type;
        this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
        this.userOptions = b;
        this.minPixelPadding = 0;
        this.reversed = d.reversed;
        this.visible = d.visible !== !1;
        this.zoomEnabled = d.zoomEnabled !== !1;
        this.categories = d.categories || e === "category";
        this.names = this.names || [];
        this.isLog = e === "logarithmic";
        this.isDatetimeAxis = e === "datetime";
        this.isLinked = t(d.linkedTo);
        this.ticks = {};
        this.labelEdge = [];
        this.minorTicks = {};
        this.plotLinesAndBands = [];
        this.alternateBands = {};
        this.len = 0;
        this.minRange = this.userMinRange = d.minRange || d.maxZoom;
        this.range = d.range;
        this.offset = d.offset || 0;
        this.stacks = {};
        this.oldStacks = {};
        this.stacksTouched = 0;
        this.min = this.max = null;
        this.crosshair = o(d.crosshair, ra(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
        var f,
            d = this.options.events;
        za(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
        this.series = this.series || [];
        if (a.inverted && c && this.reversed === w)
          this.reversed = !0;
        this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
        for (f in d)
          N(this, f, d[f]);
        if (this.isLog)
          this.val2lin = this.log2lin, this.lin2val = this.lin2log;
      },
      setOptions: function(a) {
        this.options = C(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], C(L[this.coll], a));
      },
      defaultLabelFormatter: function() {
        var a = this.axis,
            b = this.value,
            c = a.categories,
            d = this.dateTimeLabelFormat,
            e = L.lang.numericSymbols,
            f = e && e.length,
            g,
            h = a.options.labels.format,
            a = a.isLog ? b : a.tickInterval;
        if (h)
          g = Ea(h, this);
        else if (c)
          g = b;
        else if (d)
          g = Oa(d, b);
        else if (f && a >= 1E3)
          for (; f-- && g === w; )
            c = Math.pow(1E3, f + 1), a >= c && b * 10 % c === 0 && e[f] !== null && (g = s.numberFormat(b / c, -1) + e[f]);
        g === w && (g = S(b) >= 1E4 ? s.numberFormat(b, -1) : s.numberFormat(b, -1, w, ""));
        return g;
      },
      getSeriesExtremes: function() {
        var a = this,
            b = a.chart;
        a.hasVisibleSeries = !1;
        a.dataMin = a.dataMax = a.threshold = null;
        a.softThreshold = !a.isXAxis;
        a.buildStacks && a.buildStacks();
        n(a.series, function(c) {
          if (c.visible || !b.options.chart.ignoreHiddenSeries) {
            var d = c.options,
                e = d.threshold,
                f;
            a.hasVisibleSeries = !0;
            a.isLog && e <= 0 && (e = null);
            if (a.isXAxis) {
              if (d = c.xData, d.length)
                c = Pa(d), !F(c) && !(c instanceof sa) && (d = Ha(d, function(a) {
                  return F(a);
                }), c = Pa(d)), a.dataMin = I(o(a.dataMin, d[0]), c), a.dataMax = u(o(a.dataMax, d[0]), Ia(d));
            } else {
              c.getExtremes();
              f = c.dataMax;
              c = c.dataMin;
              if (t(c) && t(f))
                a.dataMin = I(o(a.dataMin, c), c), a.dataMax = u(o(a.dataMax, f), f);
              if (t(e))
                a.threshold = e;
              if (!d.softThreshold || a.isLog)
                a.softThreshold = !1;
            }
          }
        });
      },
      translate: function(a, b, c, d, e, f) {
        var g = this.linkedParent || this,
            h = 1,
            i = 0,
            k = d ? g.oldTransA : g.transA,
            d = d ? g.oldMin : g.min,
            j = g.minPixelPadding,
            e = (g.isOrdinal || g.isBroken || g.isLog && e) && g.lin2val;
        if (!k)
          k = g.transA;
        if (c)
          h *= -1, i = g.len;
        g.reversed && (h *= -1, i -= h * (g.sector || g.len));
        b ? (a = a * h + i, a -= j, a = a / k + d, e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)), f === "between" && (f = 0.5), a = h * (a - d) * k + i + h * j + (F(f) ? k * f * g.pointRange : 0));
        return a;
      },
      toPixels: function(a, b) {
        return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
      },
      toValue: function(a, b) {
        return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
      },
      getPlotLinePath: function(a, b, c, d, e) {
        var f = this.chart,
            g = this.left,
            h = this.top,
            i,
            k,
            j = c && f.oldChartHeight || f.chartHeight,
            l = c && f.oldChartWidth || f.chartWidth,
            m;
        i = this.transB;
        var p = function(a, b, c) {
          if (a < b || a > c)
            d ? a = I(u(b, a), c) : m = !0;
          return a;
        },
            e = o(e, this.translate(a, null, null, c)),
            a = c = x(e + i);
        i = k = x(j - e - i);
        F(e) ? this.horiz ? (i = h, k = j - this.bottom, a = c = p(a, g, g + this.width)) : (a = g, c = l - this.right, i = k = p(i, h, h + this.height)) : m = !0;
        return m && !d ? null : f.renderer.crispLine(["M", a, i, "L", c, k], b || 1);
      },
      getLinearTickPositions: function(a, b, c) {
        var d,
            e = pa(fa(b / a) * a),
            f = pa(ta(c / a) * a),
            g = [];
        if (b === c && F(b))
          return [b];
        for (b = e; b <= f; ) {
          g.push(b);
          b = pa(b + a);
          if (b === d)
            break;
          d = b;
        }
        return g;
      },
      getMinorTickPositions: function() {
        var a = this.options,
            b = this.tickPositions,
            c = this.minorTickInterval,
            d = [],
            e,
            f = this.pointRangePadding || 0;
        e = this.min - f;
        var f = this.max + f,
            g = f - e;
        if (g && g / c < this.len / 3)
          if (this.isLog) {
            f = b.length;
            for (e = 1; e < f; e++)
              d = d.concat(this.getLogTickPositions(c, b[e - 1], b[e], !0));
          } else if (this.isDatetimeAxis && a.minorTickInterval === "auto")
            d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), e, f, a.startOfWeek));
          else
            for (b = e + (b[0] - e) % c; b <= f; b += c)
              d.push(b);
        d.length !== 0 && this.trimTicks(d, a.startOnTick, a.endOnTick);
        return d;
      },
      adjustForMinRange: function() {
        var a = this.options,
            b = this.min,
            c = this.max,
            d,
            e = this.dataMax - this.dataMin >= this.minRange,
            f,
            g,
            h,
            i,
            k,
            j;
        if (this.isXAxis && this.minRange === w && !this.isLog)
          t(a.min) || t(a.max) ? this.minRange = null : (n(this.series, function(a) {
            i = a.xData;
            for (g = k = a.xIncrement ? 1 : i.length - 1; g > 0; g--)
              if (h = i[g] - i[g - 1], f === w || h < f)
                f = h;
          }), this.minRange = I(f * 5, this.dataMax - this.dataMin));
        if (c - b < this.minRange) {
          j = this.minRange;
          d = (j - c + b) / 2;
          d = [b - d, o(a.min, b - d)];
          if (e)
            d[2] = this.dataMin;
          b = Ia(d);
          c = [b + j, o(a.max, b + j)];
          if (e)
            c[2] = this.dataMax;
          c = Pa(c);
          c - b < j && (d[0] = c - j, d[1] = o(a.min, c - j), b = Ia(d));
        }
        this.min = b;
        this.max = c;
      },
      getClosest: function() {
        var a;
        n(this.series, function(b) {
          var c = b.closestPointRange;
          !b.noSharedTooltip && t(c) && (a = t(a) ? I(a, c) : c);
        });
        return a;
      },
      setAxisTranslation: function(a) {
        var b = this,
            c = b.max - b.min,
            d = b.axisPointRange || 0,
            e,
            f = 0,
            g = 0,
            h = b.linkedParent,
            i = !!b.categories,
            k = b.transA,
            j = b.isXAxis;
        if (j || i || d)
          if (h ? (f = h.minPointOffset, g = h.pointRangePadding) : (e = b.getClosest(), n(b.series, function(a) {
            var c = i ? 1 : j ? o(a.options.pointRange, e, 0) : b.axisPointRange || 0,
                a = a.options.pointPlacement;
            d = u(d, c);
            b.single || (f = u(f, va(a) ? 0 : c / 2), g = u(g, a === "on" ? 0 : c));
          })), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = I(d, c), j)
            b.closestPointRange = e;
        if (a)
          b.oldTransA = k;
        b.translationSlope = b.transA = k = b.len / (c + g || 1);
        b.transB = b.horiz ? b.left : b.bottom;
        b.minPixelPadding = k * f;
      },
      minFromRange: function() {
        return this.max - this.range;
      },
      setTickInterval: function(a) {
        var b = this,
            c = b.chart,
            d = b.options,
            e = b.isLog,
            f = b.log2lin,
            g = b.isDatetimeAxis,
            h = b.isXAxis,
            i = b.isLinked,
            k = d.maxPadding,
            j = d.minPadding,
            l = d.tickInterval,
            m = d.tickPixelInterval,
            p = b.categories,
            q = b.threshold,
            A = b.softThreshold,
            ha,
            v,
            B,
            P;
        !g && !p && !i && this.getTickAmount();
        B = o(b.userMin, d.min);
        P = o(b.userMax, d.max);
        i ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = o(c.min, c.dataMin), b.max = o(c.max, c.dataMax), d.type !== b.linkedParent.options.type && V(11, 1)) : (!A && t(q) && (b.dataMin >= q ? (ha = q, j = 0) : b.dataMax <= q && (v = q, k = 0)), b.min = o(B, ha, b.dataMin), b.max = o(P, v, b.dataMax));
        if (e)
          !a && I(b.min, o(b.dataMin, b.min)) <= 0 && V(10, 1), b.min = pa(f(b.min), 15), b.max = pa(f(b.max), 15);
        if (b.range && t(b.max))
          b.userMin = b.min = B = u(b.min, b.minFromRange()), b.userMax = P = b.max, b.range = null;
        G(b, "foundExtremes");
        b.beforePadding && b.beforePadding();
        b.adjustForMinRange();
        if (!p && !b.axisPointRange && !b.usePercentage && !i && t(b.min) && t(b.max) && (f = b.max - b.min))
          !t(B) && j && (b.min -= f * j), !t(P) && k && (b.max += f * k);
        if (F(d.floor))
          b.min = u(b.min, d.floor);
        if (F(d.ceiling))
          b.max = I(b.max, d.ceiling);
        if (A && t(b.dataMin))
          if (q = q || 0, !t(B) && b.min < q && b.dataMin >= q)
            b.min = q;
          else if (!t(P) && b.max > q && b.dataMax <= q)
            b.max = q;
        b.tickInterval = b.min === b.max || b.min === void 0 || b.max === void 0 ? 1 : i && !l && m === b.linkedParent.options.tickPixelInterval ? l = b.linkedParent.tickInterval : o(l, this.tickAmount ? (b.max - b.min) / u(this.tickAmount - 1, 1) : void 0, p ? 1 : (b.max - b.min) * m / u(b.len, m));
        h && !a && n(b.series, function(a) {
          a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
        });
        b.setAxisTranslation(!0);
        b.beforeSetTickPositions && b.beforeSetTickPositions();
        if (b.postProcessTickInterval)
          b.tickInterval = b.postProcessTickInterval(b.tickInterval);
        if (b.pointRange && !l)
          b.tickInterval = u(b.pointRange, b.tickInterval);
        a = o(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
        if (!l && b.tickInterval < a)
          b.tickInterval = a;
        if (!g && !e && !l)
          b.tickInterval = ub(b.tickInterval, null, H.pow(10, fa(H.log(b.tickInterval) / H.LN10)), o(d.allowDecimals, !(b.tickInterval > 0.5 && b.tickInterval < 5 && b.max > 1E3 && b.max < 9999)), !!this.tickAmount);
        if (!this.tickAmount && this.len)
          b.tickInterval = b.unsquish();
        this.setTickPositions();
      },
      setTickPositions: function() {
        var a = this.options,
            b,
            c = a.tickPositions,
            d = a.tickPositioner,
            e = a.startOnTick,
            f = a.endOnTick,
            g;
        this.tickmarkOffset = this.categories && a.tickmarkPlacement === "between" && this.tickInterval === 1 ? 0.5 : 0;
        this.minorTickInterval = a.minorTickInterval === "auto" && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
        this.tickPositions = b = c && c.slice();
        if (!b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))))
          this.tickPositions = b = d;
        if (!this.isLinked)
          this.trimTicks(b, e, f), this.min === this.max && t(this.min) && !this.tickAmount && (g = !0, this.min -= 0.5, this.max += 0.5), this.single = g, !c && !d && this.adjustTickAmount();
      },
      trimTicks: function(a, b, c) {
        var d = a[0],
            e = a[a.length - 1],
            f = this.minPointOffset || 0;
        if (b)
          this.min = d;
        else
          for (; this.min - f > a[0]; )
            a.shift();
        if (c)
          this.max = e;
        else
          for (; this.max + f < a[a.length - 1]; )
            a.pop();
        a.length === 0 && t(d) && a.push((e + d) / 2);
      },
      alignToOthers: function() {
        var a = {},
            b,
            c = this.options;
        this.chart.options.chart.alignTicks !== !1 && c.alignTicks !== !1 && n(this.chart[this.coll], function(c) {
          var e = c.options,
              e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join(",");
          c.series.length && (a[e] ? b = !0 : a[e] = 1);
        });
        return b;
      },
      getTickAmount: function() {
        var a = this.options,
            b = a.tickAmount,
            c = a.tickPixelInterval;
        !t(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
        !b && this.alignToOthers() && (b = ta(this.len / c) + 1);
        if (b < 4)
          this.finalTickAmt = b, b = 5;
        this.tickAmount = b;
      },
      adjustTickAmount: function() {
        var a = this.tickInterval,
            b = this.tickPositions,
            c = this.tickAmount,
            d = this.finalTickAmt,
            e = b && b.length;
        if (e < c) {
          for (; b.length < c; )
            b.push(pa(b[b.length - 1] + a));
          this.transA *= (e - 1) / (c - 1);
          this.max = b[b.length - 1];
        } else
          e > c && (this.tickInterval *= 2, this.setTickPositions());
        if (t(d)) {
          for (a = c = b.length; a--; )
            (d === 3 && a % 2 === 1 || d <= 2 && a > 0 && a < c - 1) && b.splice(a, 1);
          this.finalTickAmt = w;
        }
      },
      setScale: function() {
        var a,
            b;
        this.oldMin = this.min;
        this.oldMax = this.max;
        this.oldAxisLength = this.len;
        this.setAxisSize();
        b = this.len !== this.oldAxisLength;
        n(this.series, function(b) {
          if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)
            a = !0;
        });
        if (b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers()) {
          if (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, !this.isDirty)
            this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax;
        } else
          this.cleanStacks && this.cleanStacks();
      },
      setExtremes: function(a, b, c, d, e) {
        var f = this,
            g = f.chart,
            c = o(c, !0);
        n(f.series, function(a) {
          delete a.kdTree;
        });
        e = r(e, {
          min: a,
          max: b
        });
        G(f, "setExtremes", e, function() {
          f.userMin = a;
          f.userMax = b;
          f.eventArgs = e;
          c && g.redraw(d);
        });
      },
      zoom: function(a, b) {
        var c = this.dataMin,
            d = this.dataMax,
            e = this.options,
            f = I(c, o(e.min, c)),
            e = u(d, o(e.max, d));
        this.allowZoomOutside || (t(c) && a <= f && (a = f), t(d) && b >= e && (b = e));
        this.displayBtn = a !== w || b !== w;
        this.setExtremes(a, b, !1, w, {trigger: "zoom"});
        return !0;
      },
      setAxisSize: function() {
        var a = this.chart,
            b = this.options,
            c = b.offsetLeft || 0,
            d = this.horiz,
            e = o(b.width, a.plotWidth - c + (b.offsetRight || 0)),
            f = o(b.height, a.plotHeight),
            g = o(b.top, a.plotTop),
            b = o(b.left, a.plotLeft + c),
            c = /%$/;
        c.test(f) && (f = Math.round(parseFloat(f) / 100 * a.plotHeight));
        c.test(g) && (g = Math.round(parseFloat(g) / 100 * a.plotHeight + a.plotTop));
        this.left = b;
        this.top = g;
        this.width = e;
        this.height = f;
        this.bottom = a.chartHeight - f - g;
        this.right = a.chartWidth - e - b;
        this.len = u(d ? e : f, 0);
        this.pos = d ? b : g;
      },
      getExtremes: function() {
        var a = this.isLog,
            b = this.lin2log;
        return {
          min: a ? pa(b(this.min)) : this.min,
          max: a ? pa(b(this.max)) : this.max,
          dataMin: this.dataMin,
          dataMax: this.dataMax,
          userMin: this.userMin,
          userMax: this.userMax
        };
      },
      getThreshold: function(a) {
        var b = this.isLog,
            c = this.lin2log,
            d = b ? c(this.min) : this.min,
            b = b ? c(this.max) : this.max;
        a === null ? a = b < 0 ? b : d : d > a ? a = d : b < a && (a = b);
        return this.translate(a, 0, 1, 0, 1);
      },
      autoLabelAlign: function(a) {
        a = (o(a, 0) - this.side * 90 + 720) % 360;
        return a > 15 && a < 165 ? "right" : a > 195 && a < 345 ? "left" : "center";
      },
      tickSize: function(a) {
        var b = this.options,
            c = b[a + "Length"],
            d = o(b[a + "Width"], a === "tick" && this.isXAxis ? 1 : 0);
        if (d && c)
          return b[a + "Position"] === "inside" && (c = -c), [c, d];
      },
      labelMetrics: function() {
        return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label);
      },
      unsquish: function() {
        var a = this.options.labels,
            b = this.horiz,
            c = this.tickInterval,
            d = c,
            e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
            f,
            g = a.rotation,
            h = this.labelMetrics(),
            i,
            k = Number.MAX_VALUE,
            j,
            l = function(a) {
              a /= e || 1;
              a = a > 1 ? ta(a) : 1;
              return a * c;
            };
        b ? (j = !a.staggerLines && !a.step && (t(g) ? [g] : e < o(a.autoRotationLimit, 80) && a.autoRotation)) && n(j, function(a) {
          var b;
          if (a === g || a && a >= -90 && a <= 90)
            i = l(S(h.h / qa(la * a))), b = i + S(a / 360), b < k && (k = b, f = a, d = i);
        }) : a.step || (d = l(h.h));
        this.autoRotation = j;
        this.labelRotation = o(f, g);
        return d;
      },
      getSlotWidth: function() {
        var a = this.chart,
            b = this.horiz,
            c = this.options.labels,
            d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
            e = a.margin[3];
        return b && (c.step || 0) < 2 && !c.rotation && (this.staggerLines || 1) * a.plotWidth / d || !b && (e && e - a.spacing[3] || a.chartWidth * 0.33);
      },
      renderUnsquish: function() {
        var a = this.chart,
            b = a.renderer,
            c = this.tickPositions,
            d = this.ticks,
            e = this.options.labels,
            f = this.horiz,
            g = this.getSlotWidth(),
            h = u(1, x(g - 2 * (e.padding || 5))),
            i = {},
            k = this.labelMetrics(),
            j = e.style.textOverflow,
            l,
            m = 0,
            p,
            q;
        if (!va(e.rotation))
          i.rotation = e.rotation || 0;
        if (this.autoRotation)
          n(c, function(a) {
            if ((a = d[a]) && a.labelLength > m)
              m = a.labelLength;
          }), m > h && m > k.h ? i.rotation = this.labelRotation : this.labelRotation = 0;
        else if (g && (l = {width: h + "px"}, !j)) {
          l.textOverflow = "clip";
          for (p = c.length; !f && p--; )
            if (q = c[p], h = d[q].label)
              if (h.styles.textOverflow === "ellipsis" ? h.css({textOverflow: "clip"}) : d[q].labelLength > g && h.css({width: g + "px"}), h.getBBox().height > this.len / c.length - (k.h - k.f))
                h.specCss = {textOverflow: "ellipsis"};
        }
        if (i.rotation && (l = {width: (m > a.chartHeight * 0.5 ? a.chartHeight * 0.33 : a.chartHeight) + "px"}, !j))
          l.textOverflow = "ellipsis";
        if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation))
          i.align = this.labelAlign;
        n(c, function(a) {
          var b = (a = d[a]) && a.label;
          if (b)
            b.attr(i), l && b.css(C(l, b.specCss)), delete b.specCss, a.rotation = i.rotation;
        });
        this.tickRotCorr = b.rotCorr(k.b, this.labelRotation || 0, this.side !== 0);
      },
      hasData: function() {
        return this.hasVisibleSeries || t(this.min) && t(this.max) && !!this.tickPositions;
      },
      getOffset: function() {
        var a = this,
            b = a.chart,
            c = b.renderer,
            d = a.options,
            e = a.tickPositions,
            f = a.ticks,
            g = a.horiz,
            h = a.side,
            i = b.inverted ? [1, 0, 3, 2][h] : h,
            k,
            j,
            l = 0,
            m,
            p = 0,
            q = d.title,
            A = d.labels,
            ha = 0,
            v = a.opposite,
            B = b.axisOffset,
            b = b.clipOffset,
            P = [-1, 1, 1, -1][h],
            r,
            s = a.axisParent,
            ca = this.tickSize("tick");
        k = a.hasData();
        a.showAxis = j = k || o(d.showEmpty, !0);
        a.staggerLines = a.horiz && A.staggerLines;
        if (!a.axisGroup)
          a.gridGroup = c.g("grid").attr({zIndex: d.gridZIndex || 1}).add(s), a.axisGroup = c.g("axis").attr({zIndex: d.zIndex || 2}).add(s), a.labelGroup = c.g("axis-labels").attr({zIndex: A.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add(s);
        if (k || a.isLinked) {
          if (n(e, function(b) {
            f[b] ? f[b].addLabel() : f[b] = new Sa(a, b);
          }), a.renderUnsquish(), A.reserveSpace !== !1 && (h === 0 || h === 2 || {
            1: "left",
            3: "right"
          }[h] === a.labelAlign || a.labelAlign === "center") && n(e, function(a) {
            ha = u(f[a].getLabelSize(), ha);
          }), a.staggerLines)
            ha *= a.staggerLines, a.labelOffset = ha * (a.opposite ? -1 : 1);
        } else
          for (r in f)
            f[r].destroy(), delete f[r];
        if (q && q.text && q.enabled !== !1) {
          if (!a.axisTitle)
            (r = q.textAlign) || (r = (g ? {
              low: "left",
              middle: "center",
              high: "right"
            } : {
              low: v ? "right" : "left",
              middle: "center",
              high: v ? "left" : "right"
            })[q.align]), a.axisTitle = c.text(q.text, 0, 0, q.useHTML).attr({
              zIndex: 7,
              rotation: q.rotation || 0,
              align: r
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(q.style).add(a.axisGroup), a.axisTitle.isNew = !0;
          if (j)
            l = a.axisTitle.getBBox()[g ? "height" : "width"], m = q.offset, p = t(m) ? 0 : o(q.margin, g ? 5 : 10);
          a.axisTitle[j ? "show" : "hide"](!0);
        }
        a.offset = P * o(d.offset, B[h]);
        a.tickRotCorr = a.tickRotCorr || {
          x: 0,
          y: 0
        };
        c = h === 0 ? -a.labelMetrics().h : h === 2 ? a.tickRotCorr.y : 0;
        p = Math.abs(ha) + p;
        ha && (p -= c, p += P * (g ? o(A.y, a.tickRotCorr.y + P * 8) : A.x));
        a.axisTitleMargin = o(m, p);
        B[h] = u(B[h], a.axisTitleMargin + l + P * a.offset, p, k && e.length && ca ? ca[0] : 0);
        d = d.offset ? 0 : fa(d.lineWidth / 2) * 2;
        b[i] = u(b[i], d);
      },
      getLinePath: function(a) {
        var b = this.chart,
            c = this.opposite,
            d = this.offset,
            e = this.horiz,
            f = this.left + (c ? this.width : 0) + d,
            d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
        c && (a *= -1);
        return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a);
      },
      getTitlePosition: function() {
        var a = this.horiz,
            b = this.left,
            c = this.top,
            d = this.len,
            e = this.options.title,
            f = a ? b : c,
            g = this.opposite,
            h = this.offset,
            i = e.x || 0,
            k = e.y || 0,
            j = E(e.style.fontSize || 12),
            d = {
              low: f + (a ? 0 : d),
              middle: f + d / 2,
              high: f + (a ? d : 0)
            }[e.align],
            b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? j : 0);
        return {
          x: a ? d + i : b + (g ? this.width : 0) + h + i,
          y: a ? b + k - (g ? this.height : 0) + h : d + k
        };
      },
      render: function() {
        var a = this,
            b = a.chart,
            c = b.renderer,
            d = a.options,
            e = a.isLog,
            f = a.lin2log,
            g = a.isLinked,
            h = a.tickPositions,
            i = a.axisTitle,
            k = a.ticks,
            j = a.minorTicks,
            l = a.alternateBands,
            m = d.stackLabels,
            p = d.alternateGridColor,
            q = a.tickmarkOffset,
            A = d.lineWidth,
            o,
            v = b.hasRendered && F(a.oldMin),
            B = a.showAxis,
            r = Ra(c.globalAnimation),
            t,
            u;
        a.labelEdge.length = 0;
        a.overlap = !1;
        n([k, j, l], function(a) {
          for (var b in a)
            a[b].isActive = !1;
        });
        if (a.hasData() || g) {
          a.minorTickInterval && !a.categories && n(a.getMinorTickPositions(), function(b) {
            j[b] || (j[b] = new Sa(a, b, "minor"));
            v && j[b].isNew && j[b].render(null, !0);
            j[b].render(null, !1, 1);
          });
          if (h.length && (n(h, function(b, c) {
            if (!g || b >= a.min && b <= a.max)
              k[b] || (k[b] = new Sa(a, b)), v && k[b].isNew && k[b].render(c, !0, 0.1), k[b].render(c);
          }), q && (a.min === 0 || a.single)))
            k[-1] || (k[-1] = new Sa(a, -1, null, !0)), k[-1].render(-1);
          p && n(h, function(c, d) {
            u = h[d + 1] !== w ? h[d + 1] + q : a.max - q;
            if (d % 2 === 0 && c < a.max && u <= a.max + (b.polar ? -q : q))
              l[c] || (l[c] = new s.PlotLineOrBand(a)), t = c + q, l[c].options = {
                from: e ? f(t) : t,
                to: e ? f(u) : u,
                color: p
              }, l[c].render(), l[c].isActive = !0;
          });
          if (!a._addedPlotLB)
            n((d.plotLines || []).concat(d.plotBands || []), function(b) {
              a.addPlotBandOrLine(b);
            }), a._addedPlotLB = !0;
        }
        n([k, j, l], function(a) {
          var c,
              d,
              e = [],
              f = r.duration;
          for (c in a)
            if (!a[c].isActive)
              a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c);
          Na(function() {
            for (d = e.length; d--; )
              a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]]);
          }, a === l || !b.hasRendered || !f ? 0 : f);
        });
        if (A)
          o = a.getLinePath(A), a.axisLine ? a.axisLine.animate({d: o}) : a.axisLine = c.path(o).attr({
            stroke: d.lineColor,
            "stroke-width": A,
            zIndex: 7
          }).add(a.axisGroup), a.axisLine[B ? "show" : "hide"](!0);
        if (i && B)
          i[i.isNew ? "attr" : "animate"](a.getTitlePosition()), i.isNew = !1;
        m && m.enabled && a.renderStackTotals();
        a.isDirty = !1;
      },
      redraw: function() {
        this.visible && (this.render(), n(this.plotLinesAndBands, function(a) {
          a.render();
        }));
        n(this.series, function(a) {
          a.isDirty = !0;
        });
      },
      destroy: function(a) {
        var b = this,
            c = b.stacks,
            d,
            e = b.plotLinesAndBands;
        a || Y(b);
        for (d in c)
          db(c[d]), c[d] = null;
        n([b.ticks, b.minorTicks, b.alternateBands], function(a) {
          db(a);
        });
        for (a = e.length; a--; )
          e[a].destroy();
        n("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
          b[a] && (b[a] = b[a].destroy());
        });
        this.cross && this.cross.destroy();
      },
      drawCrosshair: function(a, b) {
        var c,
            d = this.crosshair,
            e,
            f;
        if (!this.crosshair || (t(b) || !o(d.snap, !0)) === !1)
          this.hideCrosshair();
        else if (o(d.snap, !0) ? t(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : o(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, c === null)
          this.hideCrosshair();
        else if (e = this.categories && !this.isRadial, f = o(d.width, e ? this.transA : 1), this.cross)
          this.cross.attr({
            d: c,
            visibility: "visible",
            "stroke-width": f
          });
        else {
          e = {
            "pointer-events": "none",
            "stroke-width": f,
            stroke: d.color || (e ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
            zIndex: o(d.zIndex, 2)
          };
          if (d.dashStyle)
            e.dashstyle = d.dashStyle;
          this.cross = this.chart.renderer.path(c).attr(e).add();
        }
      },
      hideCrosshair: function() {
        this.cross && this.cross.hide();
      }
    };
    r(X.prototype, void 0);
    X.prototype.getLogTickPositions = function(a, b, c, d) {
      var e = this.options,
          f = this.len,
          g = this.lin2log,
          h = this.log2lin,
          i = [];
      if (!d)
        this._minorAutoInterval = null;
      if (a >= 0.5)
        a = x(a), i = this.getLinearTickPositions(a, b, c);
      else if (a >= 0.08)
        for (var f = fa(b),
            k,
            j,
            l,
            m,
            p,
            e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !p; f++) {
          j = e.length;
          for (k = 0; k < j && !p; k++)
            l = h(g(f) * e[k]), l > b && (!d || m <= c) && m !== w && i.push(m), m > c && (p = !0), m = l;
        }
      else if (b = g(b), c = g(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = o(a === "auto" ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = ub(a, null, H.pow(10, fa(H.log(a) / H.LN10))), i = Aa(this.getLinearTickPositions(a, b, c), h), !d)
        this._minorAutoInterval = a / 5;
      if (!d)
        this.tickInterval = a;
      return i;
    };
    X.prototype.log2lin = function(a) {
      return H.log(a) / H.LN10;
    };
    X.prototype.lin2log = function(a) {
      return H.pow(10, a);
    };
    var Jb = s.Tooltip = function() {
      this.init.apply(this, arguments);
    };
    Jb.prototype = {
      init: function(a, b) {
        var c = b.borderWidth,
            d = b.style,
            e = E(d.padding);
        this.chart = a;
        this.options = b;
        this.crosshairs = [];
        this.now = {
          x: 0,
          y: 0
        };
        this.isHidden = !0;
        this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
          padding: e,
          fill: b.backgroundColor,
          "stroke-width": c,
          r: b.borderRadius,
          zIndex: 8
        }).css(d).css({padding: 0}).add().attr({y: -9999});
        ma || this.label.shadow(b.shadow);
        this.shared = b.shared;
      },
      destroy: function() {
        if (this.label)
          this.label = this.label.destroy();
        clearTimeout(this.hideTimer);
        clearTimeout(this.tooltipTimeout);
      },
      move: function(a, b, c, d) {
        var e = this,
            f = e.now,
            g = e.options.animation !== !1 && !e.isHidden && (S(a - f.x) > 1 || S(b - f.y) > 1),
            h = e.followPointer || e.len > 1;
        r(f, {
          x: g ? (2 * f.x + a) / 3 : a,
          y: g ? (f.y + b) / 2 : b,
          anchorX: h ? w : g ? (2 * f.anchorX + c) / 3 : c,
          anchorY: h ? w : g ? (f.anchorY + d) / 2 : d
        });
        e.label.attr(f);
        if (g)
          clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
            e && e.move(a, b, c, d);
          }, 32);
      },
      hide: function(a) {
        var b = this;
        clearTimeout(this.hideTimer);
        a = o(a, this.options.hideDelay, 500);
        if (!this.isHidden)
          this.hideTimer = Na(function() {
            b.label[a ? "fadeOut" : "hide"]();
            b.isHidden = !0;
          }, a);
      },
      getAnchor: function(a, b) {
        var c,
            d = this.chart,
            e = d.inverted,
            f = d.plotTop,
            g = d.plotLeft,
            h = 0,
            i = 0,
            k,
            j,
            a = ra(a);
        c = a[0].tooltipPos;
        this.followPointer && b && (b.chartX === w && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
        c || (n(a, function(a) {
          k = a.series.yAxis;
          j = a.series.xAxis;
          h += a.plotX + (!e && j ? j.left - g : 0);
          i += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && k ? k.top - f : 0);
        }), h /= a.length, i /= a.length, c = [e ? d.plotWidth - i : h, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - h : i]);
        return Aa(c, x);
      },
      getPosition: function(a, b, c) {
        var d = this.chart,
            e = this.distance,
            f = {},
            g = c.h || 0,
            h,
            i = ["y", d.chartHeight, b, c.plotY + d.plotTop, d.plotTop, d.plotTop + d.plotHeight],
            k = ["x", d.chartWidth, a, c.plotX + d.plotLeft, d.plotLeft, d.plotLeft + d.plotWidth],
            j = !this.followPointer && o(c.ttBelow, !d.inverted === !!c.negative),
            l = function(a, b, c, d, h, i) {
              var k = c < d - e,
                  l = d + e + c < b,
                  m = d - e - c;
              d += e;
              if (j && l)
                f[a] = d;
              else if (!j && k)
                f[a] = m;
              else if (k)
                f[a] = I(i - c, m - g < 0 ? m : m - g);
              else if (l)
                f[a] = u(h, d + g + c > b ? d : d + g);
              else
                return !1;
            },
            m = function(a, b, c, d) {
              var g;
              d < e || d > b - e ? g = !1 : f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
              return g;
            },
            p = function(a) {
              var b = i;
              i = k;
              k = b;
              h = a;
            },
            q = function() {
              l.apply(0, i) !== !1 ? m.apply(0, k) === !1 && !h && (p(!0), q()) : h ? f.x = f.y = 0 : (p(!0), q());
            };
        (d.inverted || this.len > 1) && p();
        q();
        return f;
      },
      defaultFormatter: function(a) {
        var b = this.points || ra(this),
            c;
        c = [a.tooltipFooterHeaderFormatter(b[0])];
        c = c.concat(a.bodyFormatter(b));
        c.push(a.tooltipFooterHeaderFormatter(b[0], !0));
        return c.join("");
      },
      refresh: function(a, b) {
        var c = this.chart,
            d = this.label,
            e = this.options,
            f,
            g,
            h,
            i = {},
            k,
            j = [];
        k = e.formatter || this.defaultFormatter;
        var i = c.hoverPoints,
            l,
            m = this.shared;
        clearTimeout(this.hideTimer);
        this.followPointer = ra(a)[0].series.tooltipOptions.followPointer;
        h = this.getAnchor(a, b);
        f = h[0];
        g = h[1];
        m && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, i && n(i, function(a) {
          a.setState();
        }), n(a, function(a) {
          a.setState("hover");
          j.push(a.getLabelConfig());
        }), i = {
          x: a[0].category,
          y: a[0].y
        }, i.points = j, this.len = j.length, a = a[0]) : i = a.getLabelConfig();
        k = k.call(i, this);
        i = a.series;
        this.distance = o(i.tooltipOptions.distance, 16);
        k === !1 ? this.hide() : (this.isHidden && (La(d), d.attr("opacity", 1).show()), d.attr({text: k}), l = e.borderColor || a.color || i.color || "#606060", d.attr({stroke: l}), this.updatePosition({
          plotX: f,
          plotY: g,
          negative: a.negative,
          ttBelow: a.ttBelow,
          h: h[2] || 0
        }), this.isHidden = !1);
        G(c, "tooltipRefresh", {
          text: k,
          x: f + c.plotLeft,
          y: g + c.plotTop,
          borderColor: l
        });
      },
      updatePosition: function(a) {
        var b = this.chart,
            c = this.label,
            c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
        this.move(x(c.x), x(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop);
      },
      getXDateFormat: function(a, b, c) {
        var d,
            b = b.dateTimeLabelFormats,
            e = c && c.closestPointRange,
            f,
            g = {
              millisecond: 15,
              second: 12,
              minute: 9,
              hour: 6,
              day: 3
            },
            h,
            i = "millisecond";
        if (e) {
          h = Oa("%m-%d %H:%M:%S.%L", a.x);
          for (f in hb) {
            if (e === hb.week && +Oa("%w", a.x) === c.options.startOfWeek && h.substr(6) === "00:00:00.000") {
              f = "week";
              break;
            }
            if (hb[f] > e) {
              f = i;
              break;
            }
            if (g[f] && h.substr(g[f]) !== "01-01 00:00:00.000".substr(g[f]))
              break;
            f !== "week" && (i = f);
          }
          f && (d = b[f]);
        } else
          d = b.day;
        return d || b.year;
      },
      tooltipFooterHeaderFormatter: function(a, b) {
        var c = b ? "footer" : "header",
            d = a.series,
            e = d.tooltipOptions,
            f = e.xDateFormat,
            g = d.xAxis,
            h = g && g.options.type === "datetime" && F(a.key),
            c = e[c + "Format"];
        h && !f && (f = this.getXDateFormat(a, e, g));
        h && f && (c = c.replace("{point.key}", "{point.key:" + f + "}"));
        return Ea(c, {
          point: a,
          series: d
        });
      },
      bodyFormatter: function(a) {
        return Aa(a, function(a) {
          var c = a.series.tooltipOptions;
          return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat);
        });
      }
    };
    var ia;
    Wa = z && z.documentElement.ontouchstart !== w;
    var Ba = s.Pointer = function(a, b) {
      this.init(a, b);
    };
    Ba.prototype = {
      init: function(a, b) {
        var c = b.chart,
            d = c.events,
            e = ma ? "" : c.zoomType,
            c = a.inverted,
            f;
        this.options = b;
        this.chart = a;
        this.zoomX = f = /x/.test(e);
        this.zoomY = e = /y/.test(e);
        this.zoomHor = f && !c || e && c;
        this.zoomVert = e && !c || f && c;
        this.hasZoom = f || e;
        this.runChartClick = d && !!d.click;
        this.pinchDown = [];
        this.lastValidTouch = {};
        if (s.Tooltip && b.tooltip.enabled)
          a.tooltip = new Jb(a, b.tooltip), this.followTouchMove = o(b.tooltip.followTouchMove, !0);
        this.setDOMEvents();
      },
      normalize: function(a, b) {
        var c,
            d,
            a = a || D.event;
        if (!a.target)
          a.target = a.srcElement;
        d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
        if (!b)
          this.chartPosition = b = rb(this.chart.container);
        d.pageX === w ? (c = u(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
        return r(a, {
          chartX: x(c),
          chartY: x(d)
        });
      },
      getCoordinates: function(a) {
        var b = {
          xAxis: [],
          yAxis: []
        };
        n(this.chart.axes, function(c) {
          b[c.isXAxis ? "xAxis" : "yAxis"].push({
            axis: c,
            value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
          });
        });
        return b;
      },
      runPointActions: function(a) {
        var b = this.chart,
            c = b.series,
            d = b.tooltip,
            e = d ? d.shared : !1,
            f = b.hoverPoint,
            g = b.hoverSeries,
            h,
            i = [Number.MAX_VALUE, Number.MAX_VALUE],
            k,
            j,
            l = [],
            m = [],
            p;
        if (!e && !g)
          for (h = 0; h < c.length; h++)
            if (c[h].directTouch || !c[h].options.stickyTracking)
              c = [];
        g && (e ? g.noSharedTooltip : g.directTouch) && f ? m = [f] : (n(c, function(b) {
          k = b.noSharedTooltip && e;
          j = !e && b.directTouch;
          b.visible && !k && !j && o(b.options.enableMouseTracking, !0) && (p = b.searchPoint(a, !k && b.kdDimensions === 1)) && l.push(p);
        }), n(l, function(a) {
          a && n(["dist", "distX"], function(b, c) {
            if (F(a[b])) {
              var d = a[b] === i[c] && a.series.group.zIndex >= m[c].series.group.zIndex;
              if (a[b] < i[c] || d)
                i[c] = a[b], m[c] = a;
            }
          });
        }));
        if (e)
          for (h = l.length; h--; )
            (l[h].clientX !== m[1].clientX || l[h].series.noSharedTooltip) && l.splice(h, 1);
        if (m[0] && (m[0] !== this.prevKDPoint || d && d.isHidden))
          if (e && !m[0].series.noSharedTooltip)
            l.length && d && d.refresh(l, a), n(l, function(b) {
              b.onMouseOver(a, b !== (g && g.directTouch && f || m[0]));
            }), this.prevKDPoint = m[1];
          else {
            d && d.refresh(m[0], a);
            if (!g || !g.directTouch)
              m[0].onMouseOver(a);
            this.prevKDPoint = m[0];
          }
        else
          c = g && g.tooltipOptions.followPointer, d && c && !d.isHidden && (c = d.getAnchor([{}], a), d.updatePosition({
            plotX: c[0],
            plotY: c[1]
          }));
        if (!this._onDocumentMouseMove)
          this._onDocumentMouseMove = function(a) {
            if (O[ia])
              O[ia].pointer.onDocumentMouseMove(a);
          }, N(z, "mousemove", this._onDocumentMouseMove);
        n(e ? l : [o(f, m[1])], function(c) {
          n(b.axes, function(b) {
            (!c || c.series[b.coll] === b) && b.drawCrosshair(a, c);
          });
        });
      },
      reset: function(a, b) {
        var c = this.chart,
            d = c.hoverSeries,
            e = c.hoverPoint,
            f = c.hoverPoints,
            g = c.tooltip,
            h = g && g.shared ? f : e;
        a && h && n(ra(h), function(b) {
          b.series.isCartesian && b.plotX === void 0 && (a = !1);
        });
        if (a)
          g && h && (g.refresh(h), e && (e.setState(e.state, !0), n(c.axes, function(a) {
            o(a.crosshair && a.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair();
          })));
        else {
          if (e)
            e.onMouseOut();
          f && n(f, function(a) {
            a.setState();
          });
          if (d)
            d.onMouseOut();
          g && g.hide(b);
          if (this._onDocumentMouseMove)
            Y(z, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null;
          n(c.axes, function(a) {
            a.hideCrosshair();
          });
          this.hoverX = c.hoverPoints = c.hoverPoint = null;
        }
      },
      scaleGroups: function(a, b) {
        var c = this.chart,
            d;
        n(c.series, function(e) {
          d = a || e.getPlotBox();
          e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d));
        });
        c.clipRect.attr(b || c.clipBox);
      },
      dragStart: function(a) {
        var b = this.chart;
        b.mouseIsDown = a.type;
        b.cancelClick = !1;
        b.mouseDownX = this.mouseDownX = a.chartX;
        b.mouseDownY = this.mouseDownY = a.chartY;
      },
      drag: function(a) {
        var b = this.chart,
            c = b.options.chart,
            d = a.chartX,
            e = a.chartY,
            f = this.zoomHor,
            g = this.zoomVert,
            h = b.plotLeft,
            i = b.plotTop,
            k = b.plotWidth,
            j = b.plotHeight,
            l,
            m = this.selectionMarker,
            p = this.mouseDownX,
            q = this.mouseDownY,
            n = c.panKey && a[c.panKey + "Key"];
        if (!m || !m.touch)
          if (d < h ? d = h : d > h + k && (d = h + k), e < i ? e = i : e > i + j && (e = i + j), this.hasDragged = Math.sqrt(Math.pow(p - d, 2) + Math.pow(q - e, 2)), this.hasDragged > 10) {
            l = b.isInsidePlot(p - h, q - i);
            if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !n && !m)
              this.selectionMarker = m = b.renderer.rect(h, i, f ? 1 : k, g ? 1 : j, 0).attr({
                fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
              }).add();
            m && f && (d -= p, m.attr({
              width: S(d),
              x: (d > 0 ? 0 : d) + p
            }));
            m && g && (d = e - q, m.attr({
              height: S(d),
              y: (d > 0 ? 0 : d) + q
            }));
            l && !m && c.panning && b.pan(a, c.panning);
          }
      },
      drop: function(a) {
        var b = this,
            c = this.chart,
            d = this.hasPinched;
        if (this.selectionMarker) {
          var e = {
            originalEvent: a,
            xAxis: [],
            yAxis: []
          },
              f = this.selectionMarker,
              g = f.attr ? f.attr("x") : f.x,
              h = f.attr ? f.attr("y") : f.y,
              i = f.attr ? f.attr("width") : f.width,
              k = f.attr ? f.attr("height") : f.height,
              j;
          if (this.hasDragged || d)
            n(c.axes, function(c) {
              if (c.zoomEnabled && t(c.min) && (d || b[{
                xAxis: "zoomX",
                yAxis: "zoomY"
              }[c.coll]])) {
                var f = c.horiz,
                    p = a.type === "touchend" ? c.minPixelPadding : 0,
                    q = c.toValue((f ? g : h) + p),
                    f = c.toValue((f ? g + i : h + k) - p);
                e[c.coll].push({
                  axis: c,
                  min: I(q, f),
                  max: u(q, f)
                });
                j = !0;
              }
            }), j && G(c, "selection", e, function(a) {
              c.zoom(r(a, d ? {animation: !1} : null));
            });
          this.selectionMarker = this.selectionMarker.destroy();
          d && this.scaleGroups();
        }
        if (c)
          M(c.container, {cursor: c._cursor}), c.cancelClick = this.hasDragged > 10, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [];
      },
      onContainerMouseDown: function(a) {
        a = this.normalize(a);
        a.preventDefault && a.preventDefault();
        this.dragStart(a);
      },
      onDocumentMouseUp: function(a) {
        O[ia] && O[ia].pointer.drop(a);
      },
      onDocumentMouseMove: function(a) {
        var b = this.chart,
            c = this.chartPosition,
            a = this.normalize(a, c);
        c && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset();
      },
      onContainerMouseLeave: function(a) {
        var b = O[ia];
        if (b && (a.relatedTarget || a.toElement))
          b.pointer.reset(), b.pointer.chartPosition = null;
      },
      onContainerMouseMove: function(a) {
        var b = this.chart;
        if (!t(ia) || !O[ia] || !O[ia].mouseIsDown)
          ia = b.index;
        a = this.normalize(a);
        a.returnValue = !1;
        b.mouseIsDown === "mousedown" && this.drag(a);
        (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a);
      },
      inClass: function(a, b) {
        for (var c; a; ) {
          if (c = K(a, "class")) {
            if (c.indexOf(b) !== -1)
              return !0;
            if (c.indexOf("highcharts-container") !== -1)
              return !1;
          }
          a = a.parentNode;
        }
      },
      onTrackerMouseOut: function(a) {
        var b = this.chart.hoverSeries,
            a = a.relatedTarget || a.toElement;
        if (b && a && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && !this.inClass(a, "highcharts-series-" + b.index))
          b.onMouseOut();
      },
      onContainerClick: function(a) {
        var b = this.chart,
            c = b.hoverPoint,
            d = b.plotLeft,
            e = b.plotTop,
            a = this.normalize(a);
        b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (G(c.series, "click", r(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && G(b, "click", a)));
      },
      setDOMEvents: function() {
        var a = this,
            b = a.chart.container;
        b.onmousedown = function(b) {
          a.onContainerMouseDown(b);
        };
        b.onmousemove = function(b) {
          a.onContainerMouseMove(b);
        };
        b.onclick = function(b) {
          a.onContainerClick(b);
        };
        N(b, "mouseleave", a.onContainerMouseLeave);
        Xa === 1 && N(z, "mouseup", a.onDocumentMouseUp);
        if (Wa)
          b.ontouchstart = function(b) {
            a.onContainerTouchStart(b);
          }, b.ontouchmove = function(b) {
            a.onContainerTouchMove(b);
          }, Xa === 1 && N(z, "touchend", a.onDocumentTouchEnd);
      },
      destroy: function() {
        var a;
        Y(this.chart.container, "mouseleave", this.onContainerMouseLeave);
        Xa || (Y(z, "mouseup", this.onDocumentMouseUp), Y(z, "touchend", this.onDocumentTouchEnd));
        clearInterval(this.tooltipTimeout);
        for (a in this)
          this[a] = null;
      }
    };
    r(s.Pointer.prototype, {
      pinchTranslate: function(a, b, c, d, e, f) {
        (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f);
        (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f);
      },
      pinchTranslateDirection: function(a, b, c, d, e, f, g, h) {
        var i = this.chart,
            k = a ? "x" : "y",
            j = a ? "X" : "Y",
            l = "chart" + j,
            m = a ? "width" : "height",
            p = i["plot" + (a ? "Left" : "Top")],
            q,
            n,
            o = h || 1,
            v = i.inverted,
            B = i.bounds[a ? "h" : "v"],
            r = b.length === 1,
            t = b[0][l],
            u = c[0][l],
            s = !r && b[1][l],
            w = !r && c[1][l],
            x,
            c = function() {
              !r && S(t - s) > 20 && (o = h || S(u - w) / S(t - s));
              n = (p - u) / o + t;
              q = i["plot" + (a ? "Width" : "Height")] / o;
            };
        c();
        b = n;
        b < B.min ? (b = B.min, x = !0) : b + q > B.max && (b = B.max - q, x = !0);
        x ? (u -= 0.8 * (u - g[k][0]), r || (w -= 0.8 * (w - g[k][1])), c()) : g[k] = [u, w];
        v || (f[k] = n - p, f[m] = q);
        f = v ? 1 / o : o;
        e[m] = q;
        e[k] = b;
        d[v ? a ? "scaleY" : "scaleX" : "scale" + j] = o;
        d["translate" + j] = f * p + (u - f * t);
      },
      pinch: function(a) {
        var b = this,
            c = b.chart,
            d = b.pinchDown,
            e = a.touches,
            f = e.length,
            g = b.lastValidTouch,
            h = b.hasZoom,
            i = b.selectionMarker,
            k = {},
            j = f === 1 && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick),
            l = {};
        if (f > 1)
          b.initiated = !0;
        h && b.initiated && !j && a.preventDefault();
        Aa(e, function(a) {
          return b.normalize(a);
        });
        if (a.type === "touchstart")
          n(e, function(a, b) {
            d[b] = {
              chartX: a.chartX,
              chartY: a.chartY
            };
          }), g.x = [d[0].chartX, d[1] && d[1].chartX], g.y = [d[0].chartY, d[1] && d[1].chartY], n(c.axes, function(a) {
            if (a.zoomEnabled) {
              var b = c.bounds[a.horiz ? "h" : "v"],
                  d = a.minPixelPadding,
                  e = a.toPixels(o(a.options.min, a.dataMin)),
                  f = a.toPixels(o(a.options.max, a.dataMax)),
                  g = I(e, f),
                  e = u(e, f);
              b.min = I(a.pos, g - d);
              b.max = u(a.pos + a.len, e + d);
            }
          }), b.res = !0;
        else if (d.length) {
          if (!i)
            b.selectionMarker = i = r({
              destroy: W,
              touch: !0
            }, c.plotBox);
          b.pinchTranslate(d, e, k, i, l, g);
          b.hasPinched = h;
          b.scaleGroups(k, l);
          if (!h && b.followTouchMove && f === 1)
            this.runPointActions(b.normalize(a));
          else if (b.res)
            b.res = !1, this.reset(!1, 0);
        }
      },
      touch: function(a, b) {
        var c = this.chart,
            d;
        ia = c.index;
        if (a.touches.length === 1)
          if (a = this.normalize(a), c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) && !c.openMenu) {
            b && this.runPointActions(a);
            if (a.type === "touchmove")
              c = this.pinchDown, d = c[0] ? Math.sqrt(Math.pow(c[0].chartX - a.chartX, 2) + Math.pow(c[0].chartY - a.chartY, 2)) >= 4 : !1;
            o(d, !0) && this.pinch(a);
          } else
            b && this.reset();
        else
          a.touches.length === 2 && this.pinch(a);
      },
      onContainerTouchStart: function(a) {
        this.touch(a, !0);
      },
      onContainerTouchMove: function(a) {
        this.touch(a);
      },
      onDocumentTouchEnd: function(a) {
        O[ia] && O[ia].pointer.drop(a);
      }
    });
    if (D.PointerEvent || D.MSPointerEvent) {
      var ua = {},
          sb = !!D.PointerEvent,
          Pb = function() {
            var a,
                b = [];
            b.item = function(a) {
              return this[a];
            };
            for (a in ua)
              ua.hasOwnProperty(a) && b.push({
                pageX: ua[a].pageX,
                pageY: ua[a].pageY,
                target: ua[a].target
              });
            return b;
          },
          tb = function(a, b, c, d) {
            if ((a.pointerType === "touch" || a.pointerType === a.MSPOINTER_TYPE_TOUCH) && O[ia])
              d(a), d = O[ia].pointer, d[b]({
                type: c,
                target: a.currentTarget,
                preventDefault: W,
                touches: Pb()
              });
          };
      r(Ba.prototype, {
        onContainerPointerDown: function(a) {
          tb(a, "onContainerTouchStart", "touchstart", function(a) {
            ua[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget
            };
          });
        },
        onContainerPointerMove: function(a) {
          tb(a, "onContainerTouchMove", "touchmove", function(a) {
            ua[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY
            };
            if (!ua[a.pointerId].target)
              ua[a.pointerId].target = a.currentTarget;
          });
        },
        onDocumentPointerUp: function(a) {
          tb(a, "onDocumentTouchEnd", "touchend", function(a) {
            delete ua[a.pointerId];
          });
        },
        batchMSEvents: function(a) {
          a(this.chart.container, sb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
          a(this.chart.container, sb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
          a(z, sb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        }
      });
      ga(Ba.prototype, "init", function(a, b, c) {
        a.call(this, b, c);
        this.hasZoom && M(b.container, {
          "-ms-touch-action": "none",
          "touch-action": "none"
        });
      });
      ga(Ba.prototype, "setDOMEvents", function(a) {
        a.apply(this);
        (this.hasZoom || this.followTouchMove) && this.batchMSEvents(N);
      });
      ga(Ba.prototype, "destroy", function(a) {
        this.batchMSEvents(Y);
        a.call(this);
      });
    }
    var $a = s.Legend = function(a, b) {
      this.init(a, b);
    };
    $a.prototype = {
      init: function(a, b) {
        var c = this,
            d = b.itemStyle,
            e = b.itemMarginTop || 0;
        this.options = b;
        if (b.enabled)
          c.itemStyle = d, c.itemHiddenStyle = C(d, b.itemHiddenStyle), c.itemMarginTop = e, c.padding = d = o(b.padding, 8), c.initialItemX = d, c.initialItemY = d - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.symbolWidth = o(b.symbolWidth, 16), c.pages = [], c.render(), N(c.chart, "endResize", function() {
            c.positionCheckboxes();
          });
      },
      colorizeItem: function(a, b) {
        var c = this.options,
            d = a.legendItem,
            e = a.legendLine,
            f = a.legendSymbol,
            g = this.itemHiddenStyle.color,
            c = b ? c.itemStyle.color : g,
            h = b ? a.legendColor || a.color || "#CCC" : g,
            g = a.options && a.options.marker,
            i = {fill: h},
            k;
        d && d.css({
          fill: c,
          color: c
        });
        e && e.attr({stroke: h});
        if (f) {
          if (g && f.isMarker)
            for (k in i.stroke = h, g = a.convertAttribs(g), g)
              d = g[k], d !== w && (i[k] = d);
          f.attr(i);
        }
      },
      positionItem: function(a) {
        var b = this.options,
            c = b.symbolPadding,
            b = !b.rtl,
            d = a._legendItemPos,
            e = d[0],
            d = d[1],
            f = a.checkbox;
        (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
        if (f)
          f.x = e, f.y = d;
      },
      destroyItem: function(a) {
        var b = a.checkbox;
        n(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
          a[b] && (a[b] = a[b].destroy());
        });
        b && Qa(a.checkbox);
      },
      destroy: function() {
        var a = this.group,
            b = this.box;
        if (b)
          this.box = b.destroy();
        if (a)
          this.group = a.destroy();
      },
      positionCheckboxes: function(a) {
        var b = this.group.alignAttr,
            c,
            d = this.clipHeight || this.legendHeight,
            e = this.titleHeight;
        if (b)
          c = b.translateY, n(this.allItems, function(f) {
            var g = f.checkbox,
                h;
            g && (h = c + e + g.y + (a || 0) + 3, M(g, {
              left: b.translateX + f.checkboxOffset + g.x - 20 + "px",
              top: h + "px",
              display: h > c - 6 && h < c + d - 6 ? "" : "none"
            }));
          });
      },
      renderTitle: function() {
        var a = this.padding,
            b = this.options.title,
            c = 0;
        if (b.text) {
          if (!this.title)
            this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group);
          a = this.title.getBBox();
          c = a.height;
          this.offsetWidth = a.width;
          this.contentGroup.attr({translateY: c});
        }
        this.titleHeight = c;
      },
      setText: function(a) {
        var b = this.options;
        a.legendItem.attr({text: b.labelFormat ? Ea(b.labelFormat, a) : b.labelFormatter.call(a)});
      },
      renderItem: function(a) {
        var b = this.chart,
            c = b.renderer,
            d = this.options,
            e = d.layout === "horizontal",
            f = this.symbolWidth,
            g = d.symbolPadding,
            h = this.itemStyle,
            i = this.itemHiddenStyle,
            k = this.padding,
            j = e ? o(d.itemDistance, 20) : 0,
            l = !d.rtl,
            m = d.width,
            p = d.itemMarginBottom || 0,
            q = this.itemMarginTop,
            n = this.initialItemX,
            r = a.legendItem,
            v = a.series && a.series.drawLegendSymbol ? a.series : a,
            B = v.options,
            B = this.createCheckboxForItem && B && B.showCheckbox,
            t = d.useHTML;
        if (!r) {
          a.legendGroup = c.g("legend-item").attr({zIndex: 1}).add(this.scrollGroup);
          a.legendItem = r = c.text("", l ? f + g : -g, this.baseline || 0, t).css(C(a.visible ? h : i)).attr({
            align: l ? "left" : "right",
            zIndex: 2
          }).add(a.legendGroup);
          if (!this.baseline)
            this.fontMetrics = c.fontMetrics(h.fontSize, r), this.baseline = this.fontMetrics.f + 3 + q, r.attr("y", this.baseline);
          v.drawLegendSymbol(this, a);
          this.setItemEvents && this.setItemEvents(a, r, t, h, i);
          B && this.createCheckboxForItem(a);
        }
        this.colorizeItem(a, a.visible);
        this.setText(a);
        c = r.getBBox();
        f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + j + (B ? 20 : 0);
        this.itemHeight = g = x(a.legendItemHeight || c.height);
        if (e && this.itemX - n + f > (m || b.chartWidth - 2 * k - n - d.x))
          this.itemX = n, this.itemY += q + this.lastLineHeight + p, this.lastLineHeight = 0;
        this.maxItemWidth = u(this.maxItemWidth, f);
        this.lastItemY = q + this.itemY + p;
        this.lastLineHeight = u(g, this.lastLineHeight);
        a._legendItemPos = [this.itemX, this.itemY];
        e ? this.itemX += f : (this.itemY += q + g + p, this.lastLineHeight = g);
        this.offsetWidth = m || u((e ? this.itemX - n - j : f) + k, this.offsetWidth);
      },
      getAllItems: function() {
        var a = [];
        n(this.chart.series, function(b) {
          var c = b.options;
          if (o(c.showInLegend, !t(c.linkedTo) ? w : !1, !0))
            a = a.concat(b.legendItems || (c.legendType === "point" ? b.data : b));
        });
        return a;
      },
      adjustMargins: function(a, b) {
        var c = this.chart,
            d = this.options,
            e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
        this.display && !d.floating && n([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, g) {
          f.test(e) && !t(a[g]) && (c[ib[g]] = u(c[ib[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + o(d.margin, 12) + b[g]));
        });
      },
      render: function() {
        var a = this,
            b = a.chart,
            c = b.renderer,
            d = a.group,
            e,
            f,
            g,
            h,
            i = a.box,
            k = a.options,
            j = a.padding,
            l = k.borderWidth,
            m = k.backgroundColor;
        a.itemX = a.initialItemX;
        a.itemY = a.initialItemY;
        a.offsetWidth = 0;
        a.lastItemY = 0;
        if (!d)
          a.group = d = c.g("legend").attr({zIndex: 7}).add(), a.contentGroup = c.g().attr({zIndex: 1}).add(d), a.scrollGroup = c.g().add(a.contentGroup);
        a.renderTitle();
        e = a.getAllItems();
        cb(e, function(a, b) {
          return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
        });
        k.reversed && e.reverse();
        a.allItems = e;
        a.display = f = !!e.length;
        a.lastLineHeight = 0;
        n(e, function(b) {
          a.renderItem(b);
        });
        g = (k.width || a.offsetWidth) + j;
        h = a.lastItemY + a.lastLineHeight + a.titleHeight;
        h = a.handleOverflow(h);
        h += j;
        if (l || m) {
          if (i) {
            if (g > 0 && h > 0)
              i[i.isNew ? "attr" : "animate"](i.crisp({
                width: g,
                height: h
              })), i.isNew = !1;
          } else
            a.box = i = c.rect(0, 0, g, h, k.borderRadius, l || 0).attr({
              stroke: k.borderColor,
              "stroke-width": l || 0,
              fill: m || "none"
            }).add(d).shadow(k.shadow), i.isNew = !0;
          i[f ? "show" : "hide"]();
        }
        a.legendWidth = g;
        a.legendHeight = h;
        n(e, function(b) {
          a.positionItem(b);
        });
        f && d.align(r({
          width: g,
          height: h
        }, k), !0, "spacingBox");
        b.isResizing || this.positionCheckboxes();
      },
      handleOverflow: function(a) {
        var b = this,
            c = this.chart,
            d = c.renderer,
            e = this.options,
            f = e.y,
            f = c.spacingBox.height + (e.verticalAlign === "top" ? -f : f) - this.padding,
            g = e.maxHeight,
            h,
            i = this.clipRect,
            k = e.navigation,
            j = o(k.animation, !0),
            l = k.arrowSize || 12,
            m = this.nav,
            p = this.pages,
            q = this.padding,
            A,
            r = this.allItems,
            v = function(a) {
              i.attr({height: a});
              if (b.contentGroup.div)
                b.contentGroup.div.style.clip = "rect(" + q + "px,9999px," + (q + a) + "px,0)";
            };
        e.layout === "horizontal" && (f /= 2);
        g && (f = I(f, g));
        p.length = 0;
        if (a > f && k.enabled !== !1) {
          this.clipHeight = h = u(f - 20 - this.titleHeight - q, 0);
          this.currentPage = o(this.currentPage, 1);
          this.fullHeight = a;
          n(r, function(a, b) {
            var c = a._legendItemPos[1],
                d = x(a.legendItem.getBBox().height),
                e = p.length;
            if (!e || c - p[e - 1] > h && (A || c) !== p[e - 1])
              p.push(A || c), e++;
            b === r.length - 1 && c + d - p[e - 1] > h && p.push(c);
            c !== A && (A = c);
          });
          if (!i)
            i = b.clipRect = d.clipRect(0, q, 9999, 0), b.contentGroup.clip(i);
          v(h);
          if (!m)
            this.nav = m = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function() {
              b.scroll(-1, j);
            }).add(m), this.pager = d.text("", 15, 10).css(k.style).add(m), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function() {
              b.scroll(1, j);
            }).add(m);
          b.scroll(0);
          a = f;
        } else if (m)
          v(c.chartHeight), m.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0;
        return a;
      },
      scroll: function(a, b) {
        var c = this.pages,
            d = c.length,
            e = this.currentPage + a,
            f = this.clipHeight,
            g = this.options.navigation,
            h = g.activeColor,
            g = g.inactiveColor,
            i = this.pager,
            k = this.padding;
        e > d && (e = d);
        if (e > 0)
          b !== w && Va(b, this.chart), this.nav.attr({
            translateX: k,
            translateY: f + this.padding + 7 + this.titleHeight,
            visibility: "visible"
          }), this.up.attr({fill: e === 1 ? g : h}).css({cursor: e === 1 ? "default" : "pointer"}), i.attr({text: e + "/" + d}), this.down.attr({
            x: 18 + this.pager.getBBox().width,
            fill: e === d ? g : h
          }).css({cursor: e === d ? "default" : "pointer"}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = e, this.positionCheckboxes(c);
      }
    };
    var ab = s.LegendSymbolMixin = {
      drawRectangle: function(a, b) {
        var c = a.options.symbolHeight || a.fontMetrics.f;
        b.legendSymbol = this.chart.renderer.rect(0, a.baseline - c + 1, a.symbolWidth, c, a.options.symbolRadius || 0).attr({zIndex: 3}).add(b.legendGroup);
      },
      drawLineMarker: function(a) {
        var b = this.options,
            c = b.marker,
            d = a.symbolWidth,
            e = this.chart.renderer,
            f = this.legendGroup,
            a = a.baseline - x(a.fontMetrics.b * 0.3),
            g;
        if (b.lineWidth) {
          g = {"stroke-width": b.lineWidth};
          if (b.dashStyle)
            g.dashstyle = b.dashStyle;
          this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f);
        }
        if (c && c.enabled !== !1)
          b = c.radius, this.legendSymbol = c = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b, c).add(f), c.isMarker = !0;
      }
    };
    (/Trident\/7\.0/.test(ya) || Ka) && ga($a.prototype, "positionItem", function(a, b) {
      var c = this,
          d = function() {
            b._legendItemPos && a.call(c, b);
          };
      d();
      setTimeout(d);
    });
    var ja = s.Chart = function() {
      this.getArgs.apply(this, arguments);
    };
    s.chart = function(a, b, c) {
      return new ja(a, b, c);
    };
    ja.prototype = {
      callbacks: [],
      getArgs: function() {
        var a = [].slice.call(arguments);
        if (va(a[0]) || a[0].nodeName)
          this.renderTo = a.shift();
        this.init(a[0], a[1]);
      },
      init: function(a, b) {
        var c,
            d = a.series;
        a.series = null;
        c = C(L, a);
        c.series = a.series = d;
        this.userOptions = a;
        d = c.chart;
        this.margin = this.splashArray("margin", d);
        this.spacing = this.splashArray("spacing", d);
        var e = d.events;
        this.bounds = {
          h: {},
          v: {}
        };
        this.callback = b;
        this.isResizing = 0;
        this.options = c;
        this.axes = [];
        this.series = [];
        this.hasCartesianSeries = d.showAxes;
        var f = this,
            g;
        f.index = O.length;
        O.push(f);
        Xa++;
        d.reflow !== !1 && N(f, "load", function() {
          f.initReflow();
        });
        if (e)
          for (g in e)
            N(f, g, e[g]);
        f.xAxis = [];
        f.yAxis = [];
        f.animation = ma ? !1 : o(d.animation, !0);
        f.pointCount = f.colorCounter = f.symbolCounter = 0;
        f.firstRender();
      },
      initSeries: function(a) {
        var b = this.options.chart;
        (b = y[a.type || b.type || b.defaultSeriesType]) || V(17, !0);
        b = new b;
        b.init(this, a);
        return b;
      },
      isInsidePlot: function(a, b, c) {
        var d = c ? b : a,
            a = c ? a : b;
        return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight;
      },
      redraw: function(a) {
        var b = this.axes,
            c = this.series,
            d = this.pointer,
            e = this.legend,
            f = this.isDirtyLegend,
            g,
            h,
            i = this.hasCartesianSeries,
            k = this.isDirtyBox,
            j = c.length,
            l = j,
            m = this.renderer,
            p = m.isHidden(),
            q = [];
        Va(a, this);
        p && this.cloneRenderTo();
        for (this.layOutTitles(); l--; )
          if (a = c[l], a.options.stacking && (g = !0, a.isDirty)) {
            h = !0;
            break;
          }
        if (h)
          for (l = j; l--; )
            if (a = c[l], a.options.stacking)
              a.isDirty = !0;
        n(c, function(a) {
          a.isDirty && a.options.legendType === "point" && (a.updateTotals && a.updateTotals(), f = !0);
          a.isDirtyData && G(a, "updatedData");
        });
        if (f && e.options.enabled)
          e.render(), this.isDirtyLegend = !1;
        g && this.getStacks();
        if (i && !this.isResizing)
          this.maxTicks = null, n(b, function(a) {
            a.setScale();
          });
        this.getMargins();
        i && (n(b, function(a) {
          a.isDirty && (k = !0);
        }), n(b, function(a) {
          var b = a.min + "," + a.max;
          if (a.extKey !== b)
            a.extKey = b, q.push(function() {
              G(a, "afterSetExtremes", r(a.eventArgs, a.getExtremes()));
              delete a.eventArgs;
            });
          (k || g) && a.redraw();
        }));
        k && this.drawChartBox();
        n(c, function(a) {
          a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
        });
        d && d.reset(!0);
        m.draw();
        G(this, "redraw");
        p && this.cloneRenderTo(!0);
        n(q, function(a) {
          a.call();
        });
      },
      get: function(a) {
        var b = this.axes,
            c = this.series,
            d,
            e;
        for (d = 0; d < b.length; d++)
          if (b[d].options.id === a)
            return b[d];
        for (d = 0; d < c.length; d++)
          if (c[d].options.id === a)
            return c[d];
        for (d = 0; d < c.length; d++) {
          e = c[d].points || [];
          for (b = 0; b < e.length; b++)
            if (e[b].id === a)
              return e[b];
        }
        return null;
      },
      getAxes: function() {
        var a = this,
            b = this.options,
            c = b.xAxis = ra(b.xAxis || {}),
            b = b.yAxis = ra(b.yAxis || {});
        n(c, function(a, b) {
          a.index = b;
          a.isX = !0;
        });
        n(b, function(a, b) {
          a.index = b;
        });
        c = c.concat(b);
        n(c, function(b) {
          new X(a, b);
        });
      },
      getSelectedPoints: function() {
        var a = [];
        n(this.series, function(b) {
          a = a.concat(Ha(b.points || [], function(a) {
            return a.selected;
          }));
        });
        return a;
      },
      getSelectedSeries: function() {
        return Ha(this.series, function(a) {
          return a.selected;
        });
      },
      setTitle: function(a, b, c) {
        var g;
        var d = this,
            e = d.options,
            f;
        f = e.title = C(e.title, a);
        g = e.subtitle = C(e.subtitle, b), e = g;
        n([["title", a, f], ["subtitle", b, e]], function(a) {
          var b = a[0],
              c = d[b],
              e = a[1],
              a = a[2];
          c && e && (d[b] = c = c.destroy());
          a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
            align: a.align,
            "class": "highcharts-" + b,
            zIndex: a.zIndex || 4
          }).css(a.style).add());
        });
        d.layOutTitles(c);
      },
      layOutTitles: function(a) {
        var b = 0,
            c = this.title,
            d = this.subtitle,
            e = this.options,
            f = e.title,
            e = e.subtitle,
            g = this.renderer,
            h = this.spacingBox;
        if (c && (c.css({width: (f.width || h.width + f.widthAdjust) + "px"}).align(r({y: g.fontMetrics(f.style.fontSize, c).b - 3}, f), !1, h), !f.floating && !f.verticalAlign))
          b = c.getBBox().height;
        d && (d.css({width: (e.width || h.width + e.widthAdjust) + "px"}).align(r({y: b + (f.margin - 13) + g.fontMetrics(e.style.fontSize, c).b}, e), !1, h), !e.floating && !e.verticalAlign && (b = ta(b + d.getBBox().height)));
        c = this.titleOffset !== b;
        this.titleOffset = b;
        if (!this.isDirtyBox && c)
          this.isDirtyBox = c, this.hasRendered && o(a, !0) && this.isDirtyBox && this.redraw();
      },
      getChartSize: function() {
        var a = this.options.chart,
            b = a.width,
            a = a.height,
            c = this.renderToClone || this.renderTo;
        if (!t(b))
          this.containerWidth = na(c, "width");
        if (!t(a))
          this.containerHeight = na(c, "height");
        this.chartWidth = u(0, b || this.containerWidth || 600);
        this.chartHeight = u(0, o(a, this.containerHeight > 19 ? this.containerHeight : 400));
      },
      cloneRenderTo: function(a) {
        var b = this.renderToClone,
            c = this.container;
        a ? b && (this.renderTo.appendChild(c), Qa(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), M(b, {
          position: "absolute",
          top: "-9999px",
          display: "block"
        }), b.style.setProperty && b.style.setProperty("display", "block", "important"), z.body.appendChild(b), c && b.appendChild(c));
      },
      getContainer: function() {
        var a,
            b = this.options,
            c = b.chart,
            d,
            e;
        a = this.renderTo;
        var f = "highcharts-" + qb++;
        if (!a)
          this.renderTo = a = c.renderTo;
        if (va(a))
          this.renderTo = a = z.getElementById(a);
        a || V(13, !0);
        d = E(K(a, "data-highcharts-chart"));
        F(d) && O[d] && O[d].hasRendered && O[d].destroy();
        K(a, "data-highcharts-chart", this.index);
        a.innerHTML = "";
        !c.skipClone && !a.offsetWidth && this.cloneRenderTo();
        this.getChartSize();
        d = this.chartWidth;
        e = this.chartHeight;
        this.container = a = da(Ja, {
          className: "highcharts-container" + (c.className ? " " + c.className : ""),
          id: f
        }, r({
          position: "relative",
          overflow: "hidden",
          width: d + "px",
          height: e + "px",
          textAlign: "left",
          lineHeight: "normal",
          zIndex: 0,
          "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
        }, c.style), this.renderToClone || a);
        this._cursor = a.style.cursor;
        this.renderer = new (s[c.renderer] || Ta)(a, d, e, c.style, c.forExport, b.exporting && b.exporting.allowHTML);
        ma && this.renderer.create(this, a, d, e);
        this.renderer.chartIndex = this.index;
      },
      getMargins: function(a) {
        var b = this.spacing,
            c = this.margin,
            d = this.titleOffset;
        this.resetMargins();
        if (d && !t(c[0]))
          this.plotTop = u(this.plotTop, d + this.options.title.margin + b[0]);
        this.legend.adjustMargins(c, b);
        this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
        this.extraTopMargin && (this.plotTop += this.extraTopMargin);
        a || this.getAxisMargins();
      },
      getAxisMargins: function() {
        var a = this,
            b = a.axisOffset = [0, 0, 0, 0],
            c = a.margin;
        a.hasCartesianSeries && n(a.axes, function(a) {
          a.visible && a.getOffset();
        });
        n(ib, function(d, e) {
          t(c[e]) || (a[d] += b[e]);
        });
        a.setChartSize();
      },
      reflow: function(a) {
        var b = this,
            c = b.options.chart,
            d = b.renderTo,
            e = c.width || na(d, "width"),
            f = c.height || na(d, "height"),
            c = a ? a.target : D;
        if (!b.hasUserSize && !b.isPrinting && e && f && (c === D || c === z)) {
          if (e !== b.containerWidth || f !== b.containerHeight)
            clearTimeout(b.reflowTimeout), b.reflowTimeout = Na(function() {
              if (b.container)
                b.setSize(e, f, !1), b.hasUserSize = null;
            }, a ? 100 : 0);
          b.containerWidth = e;
          b.containerHeight = f;
        }
      },
      initReflow: function() {
        var a = this,
            b = function(b) {
              a.reflow(b);
            };
        N(D, "resize", b);
        N(a, "destroy", function() {
          Y(D, "resize", b);
        });
      },
      setSize: function(a, b, c) {
        var d = this,
            e,
            f,
            g = d.renderer;
        d.isResizing += 1;
        Va(c, d);
        d.oldChartHeight = d.chartHeight;
        d.oldChartWidth = d.chartWidth;
        if (t(a))
          d.chartWidth = e = u(0, x(a)), d.hasUserSize = !!e;
        if (t(b))
          d.chartHeight = f = u(0, x(b));
        a = g.globalAnimation;
        (a ? Ua : M)(d.container, {
          width: e + "px",
          height: f + "px"
        }, a);
        d.setChartSize(!0);
        g.setSize(e, f, c);
        d.maxTicks = null;
        n(d.axes, function(a) {
          a.isDirty = !0;
          a.setScale();
        });
        n(d.series, function(a) {
          a.isDirty = !0;
        });
        d.isDirtyLegend = !0;
        d.isDirtyBox = !0;
        d.layOutTitles();
        d.getMargins();
        d.redraw(c);
        d.oldChartHeight = null;
        G(d, "resize");
        Na(function() {
          d && G(d, "endResize", null, function() {
            d.isResizing -= 1;
          });
        }, Ra(a).duration);
      },
      setChartSize: function(a) {
        var b = this.inverted,
            c = this.renderer,
            d = this.chartWidth,
            e = this.chartHeight,
            f = this.options.chart,
            g = this.spacing,
            h = this.clipOffset,
            i,
            k,
            j,
            l;
        this.plotLeft = i = x(this.plotLeft);
        this.plotTop = k = x(this.plotTop);
        this.plotWidth = j = u(0, x(d - i - this.marginRight));
        this.plotHeight = l = u(0, x(e - k - this.marginBottom));
        this.plotSizeX = b ? l : j;
        this.plotSizeY = b ? j : l;
        this.plotBorderWidth = f.plotBorderWidth || 0;
        this.spacingBox = c.spacingBox = {
          x: g[3],
          y: g[0],
          width: d - g[3] - g[1],
          height: e - g[0] - g[2]
        };
        this.plotBox = c.plotBox = {
          x: i,
          y: k,
          width: j,
          height: l
        };
        d = 2 * fa(this.plotBorderWidth / 2);
        b = ta(u(d, h[3]) / 2);
        c = ta(u(d, h[0]) / 2);
        this.clipBox = {
          x: b,
          y: c,
          width: fa(this.plotSizeX - u(d, h[1]) / 2 - b),
          height: u(0, fa(this.plotSizeY - u(d, h[2]) / 2 - c))
        };
        a || n(this.axes, function(a) {
          a.setAxisSize();
          a.setAxisTranslation();
        });
      },
      resetMargins: function() {
        var a = this;
        n(ib, function(b, c) {
          a[b] = o(a.margin[c], a.spacing[c]);
        });
        a.axisOffset = [0, 0, 0, 0];
        a.clipOffset = [0, 0, 0, 0];
      },
      drawChartBox: function() {
        var a = this.options.chart,
            b = this.renderer,
            c = this.chartWidth,
            d = this.chartHeight,
            e = this.chartBackground,
            f = this.plotBackground,
            g = this.plotBorder,
            h = this.plotBGImage,
            i = a.borderWidth || 0,
            k = a.backgroundColor,
            j = a.plotBackgroundColor,
            l = a.plotBackgroundImage,
            m = a.plotBorderWidth || 0,
            p,
            q = this.plotLeft,
            n = this.plotTop,
            o = this.plotWidth,
            v = this.plotHeight,
            r = this.plotBox,
            t = this.clipRect,
            u = this.clipBox;
        p = i + (a.shadow ? 8 : 0);
        if (i || k)
          if (e)
            e.animate(e.crisp({
              width: c - p,
              height: d - p
            }));
          else {
            e = {fill: k || "none"};
            if (i)
              e.stroke = a.borderColor, e["stroke-width"] = i;
            this.chartBackground = b.rect(p / 2, p / 2, c - p, d - p, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow);
          }
        if (j)
          f ? f.animate(r) : this.plotBackground = b.rect(q, n, o, v, 0).attr({fill: j}).add().shadow(a.plotShadow);
        if (l)
          h ? h.animate(r) : this.plotBGImage = b.image(l, q, n, o, v).add();
        t ? t.animate({
          width: u.width,
          height: u.height
        }) : this.clipRect = b.clipRect(u);
        if (m)
          g ? (g.strokeWidth = -m, g.animate(g.crisp({
            x: q,
            y: n,
            width: o,
            height: v
          }))) : this.plotBorder = b.rect(q, n, o, v, 0, -m).attr({
            stroke: a.plotBorderColor,
            "stroke-width": m,
            fill: "none",
            zIndex: 1
          }).add();
        this.isDirtyBox = !1;
      },
      propFromSeries: function() {
        var a = this,
            b = a.options.chart,
            c,
            d = a.options.series,
            e,
            f;
        n(["inverted", "angular", "polar"], function(g) {
          c = y[b.type || b.defaultSeriesType];
          f = a[g] || b[g] || c && c.prototype[g];
          for (e = d && d.length; !f && e--; )
            (c = y[d[e].type]) && c.prototype[g] && (f = !0);
          a[g] = f;
        });
      },
      linkSeries: function() {
        var a = this,
            b = a.series;
        n(b, function(a) {
          a.linkedSeries.length = 0;
        });
        n(b, function(b) {
          var d = b.options.linkedTo;
          if (va(d) && (d = d === ":previous" ? a.series[b.index - 1] : a.get(d)))
            d.linkedSeries.push(b), b.linkedParent = d, b.visible = o(b.options.visible, d.options.visible, b.visible);
        });
      },
      renderSeries: function() {
        n(this.series, function(a) {
          a.translate();
          a.render();
        });
      },
      renderLabels: function() {
        var a = this,
            b = a.options.labels;
        b.items && n(b.items, function(c) {
          var d = r(b.style, c.style),
              e = E(d.left) + a.plotLeft,
              f = E(d.top) + a.plotTop + 12;
          delete d.left;
          delete d.top;
          a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add();
        });
      },
      render: function() {
        var a = this.axes,
            b = this.renderer,
            c = this.options,
            d,
            e,
            f,
            g;
        this.setTitle();
        this.legend = new $a(this, c.legend);
        this.getStacks && this.getStacks();
        this.getMargins(!0);
        this.setChartSize();
        d = this.plotWidth;
        e = this.plotHeight -= 21;
        n(a, function(a) {
          a.setScale();
        });
        this.getAxisMargins();
        f = d / this.plotWidth > 1.1;
        g = e / this.plotHeight > 1.05;
        if (f || g)
          this.maxTicks = null, n(a, function(a) {
            (a.horiz && f || !a.horiz && g) && a.setTickInterval(!0);
          }), this.getMargins();
        this.drawChartBox();
        this.hasCartesianSeries && n(a, function(a) {
          a.visible && a.render();
        });
        if (!this.seriesGroup)
          this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add();
        this.renderSeries();
        this.renderLabels();
        this.showCredits(c.credits);
        this.hasRendered = !0;
      },
      showCredits: function(a) {
        if (a.enabled && !this.credits)
          this.credits = this.renderer.text(a.text, 0, 0).on("click", function() {
            if (a.href)
              D.location.href = a.href;
          }).attr({
            align: a.position.align,
            zIndex: 8
          }).css(a.style).add().align(a.position);
      },
      destroy: function() {
        var a = this,
            b = a.axes,
            c = a.series,
            d = a.container,
            e,
            f = d && d.parentNode;
        G(a, "destroy");
        O[a.index] = w;
        Xa--;
        a.renderTo.removeAttribute("data-highcharts-chart");
        Y(a);
        for (e = b.length; e--; )
          b[e] = b[e].destroy();
        for (e = c.length; e--; )
          c[e] = c[e].destroy();
        n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(b) {
          var c = a[b];
          c && c.destroy && (a[b] = c.destroy());
        });
        if (d)
          d.innerHTML = "", Y(d), f && Qa(d);
        for (e in a)
          delete a[e];
      },
      isReadyToRender: function() {
        var a = this;
        return !ea && D == D.top && z.readyState !== "complete" || ma && !D.canvg ? (ma ? Ib.push(function() {
          a.firstRender();
        }, a.options.global.canvasToolsURL) : z.attachEvent("onreadystatechange", function() {
          z.detachEvent("onreadystatechange", a.firstRender);
          z.readyState === "complete" && a.firstRender();
        }), !1) : !0;
      },
      firstRender: function() {
        var a = this,
            b = a.options;
        if (a.isReadyToRender()) {
          a.getContainer();
          G(a, "init");
          a.resetMargins();
          a.setChartSize();
          a.propFromSeries();
          a.getAxes();
          n(b.series || [], function(b) {
            a.initSeries(b);
          });
          a.linkSeries();
          G(a, "beforeRender");
          if (s.Pointer)
            a.pointer = new Ba(a, b);
          a.render();
          a.renderer.draw();
          if (!a.renderer.imgCount && a.onload)
            a.onload();
          a.cloneRenderTo(!0);
        }
      },
      onload: function() {
        var a = this;
        n([this.callback].concat(this.callbacks), function(b) {
          b && a.index !== void 0 && b.apply(a, [a]);
        });
        G(a, "load");
        this.onload = null;
      },
      splashArray: function(a, b) {
        var c = b[a],
            c = aa(c) ? c : [c, c, c, c];
        return [o(b[a + "Top"], c[0]), o(b[a + "Right"], c[1]), o(b[a + "Bottom"], c[2]), o(b[a + "Left"], c[3])];
      }
    };
    var $ = function() {};
    $.prototype = {
      init: function(a, b, c) {
        this.series = a;
        this.color = a.color;
        this.applyOptions(b, c);
        this.pointAttr = {};
        if (a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length))
          a.colorCounter = 0;
        a.chart.pointCount++;
        return this;
      },
      applyOptions: function(a, b) {
        var c = this.series,
            d = c.options.pointValKey || c.pointValKey,
            a = $.prototype.optionsToObject.call(this, a);
        r(this, a);
        this.options = this.options ? r(this.options, a) : a;
        if (d)
          this.y = this[d];
        this.isNull = this.x === null || this.y === null;
        if (this.x === void 0 && c)
          this.x = b === void 0 ? c.autoIncrement() : b;
        return this;
      },
      optionsToObject: function(a) {
        var b = {},
            c = this.series,
            d = c.options.keys,
            e = d || c.pointArrayMap || ["y"],
            f = e.length,
            g = 0,
            h = 0;
        if (F(a) || a === null)
          b[e[0]] = a;
        else if (Ca(a)) {
          if (!d && a.length > f) {
            c = typeof a[0];
            if (c === "string")
              b.name = a[0];
            else if (c === "number")
              b.x = a[0];
            g++;
          }
          for (; h < f; ) {
            if (!d || a[g] !== void 0)
              b[e[h]] = a[g];
            g++;
            h++;
          }
        } else if (typeof a === "object") {
          b = a;
          if (a.dataLabels)
            c._hasPointLabels = !0;
          if (a.marker)
            c._hasPointMarkers = !0;
        }
        return b;
      },
      destroy: function() {
        var a = this.series.chart,
            b = a.hoverPoints,
            c;
        a.pointCount--;
        if (b && (this.setState(), wa(b, this), !b.length))
          a.hoverPoints = null;
        if (this === a.hoverPoint)
          this.onMouseOut();
        if (this.graphic || this.dataLabel)
          Y(this), this.destroyElements();
        this.legendItem && a.legend.destroyItem(this);
        for (c in this)
          this[c] = null;
      },
      destroyElements: function() {
        for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"],
            b,
            c = 6; c--; )
          b = a[c], this[b] && (this[b] = this[b].destroy());
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
      tooltipFormatter: function(a) {
        var b = this.series,
            c = b.tooltipOptions,
            d = o(c.valueDecimals, ""),
            e = c.valuePrefix || "",
            f = c.valueSuffix || "";
        n(b.pointArrayMap || ["y"], function(b) {
          b = "{point." + b;
          if (e || f)
            a = a.replace(b + "}", e + b + "}" + f);
          a = a.replace(b + "}", b + ":,." + d + "f}");
        });
        return Ea(a, {
          point: this,
          series: this.series
        });
      },
      firePointEvent: function(a, b, c) {
        var d = this,
            e = this.series.options;
        (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
        a === "click" && e.allowPointSelect && (c = function(a) {
          d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
        });
        G(this, a, b, c);
      },
      visible: !0
    };
    var R = s.Series = function() {};
    R.prototype = {
      isCartesian: !0,
      type: "line",
      pointClass: $,
      sorted: !0,
      requireSorting: !0,
      pointAttrToOptions: {
        stroke: "lineColor",
        "stroke-width": "lineWidth",
        fill: "fillColor",
        r: "radius"
      },
      directTouch: !1,
      axisTypes: ["xAxis", "yAxis"],
      colorCounter: 0,
      parallelArrays: ["x", "y"],
      init: function(a, b) {
        var c = this,
            d,
            e,
            f = a.series,
            g = function(a, b) {
              return o(a.options.index, a._i) - o(b.options.index, b._i);
            };
        c.chart = a;
        c.options = b = c.setOptions(b);
        c.linkedSeries = [];
        c.bindAxes();
        r(c, {
          name: b.name,
          state: "",
          pointAttr: {},
          visible: b.visible !== !1,
          selected: b.selected === !0
        });
        if (ma)
          b.animation = !1;
        e = b.events;
        for (d in e)
          N(c, d, e[d]);
        if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)
          a.runTrackerClick = !0;
        c.getColor();
        c.getSymbol();
        n(c.parallelArrays, function(a) {
          c[a + "Data"] = [];
        });
        c.setData(b.data, !1);
        if (c.isCartesian)
          a.hasCartesianSeries = !0;
        f.push(c);
        c._i = f.length - 1;
        cb(f, g);
        this.yAxis && cb(this.yAxis.series, g);
        n(f, function(a, b) {
          a.index = b;
          a.name = a.name || "Series " + (b + 1);
        });
      },
      bindAxes: function() {
        var a = this,
            b = a.options,
            c = a.chart,
            d;
        n(a.axisTypes || [], function(e) {
          n(c[e], function(c) {
            d = c.options;
            if (b[e] === d.index || b[e] !== w && b[e] === d.id || b[e] === w && d.index === 0)
              c.series.push(a), a[e] = c, c.isDirty = !0;
          });
          !a[e] && a.optionalAxis !== e && V(18, !0);
        });
      },
      updateParallelArrays: function(a, b) {
        var c = a.series,
            d = arguments,
            e = F(b) ? function(d) {
              var e = d === "y" && c.toYData ? c.toYData(a) : a[d];
              c[d + "Data"][b] = e;
            } : function(a) {
              Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2));
            };
        n(c.parallelArrays, e);
      },
      autoIncrement: function() {
        var a = this.options,
            b = this.xIncrement,
            c,
            d = a.pointIntervalUnit,
            b = o(b, a.pointStart, 0);
        this.pointInterval = c = o(this.pointInterval, a.pointInterval, 1);
        d && (a = new sa(b), d === "day" ? a = +a[Ab](a[mb]() + c) : d === "month" ? a = +a[Bb](a[nb]() + c) : d === "year" && (a = +a[Cb](a[ob]() + c)), c = a - b);
        this.xIncrement = b + c;
        return b;
      },
      setOptions: function(a) {
        var b = this.chart,
            c = b.options.plotOptions,
            b = b.userOptions || {},
            d = b.plotOptions || {},
            e = c[this.type];
        this.userOptions = a;
        c = C(e, c.series, a);
        this.tooltipOptions = C(L.tooltip, L.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
        e.marker === null && delete c.marker;
        this.zoneAxis = c.zoneAxis;
        a = this.zones = (c.zones || []).slice();
        if ((c.negativeColor || c.negativeFillColor) && !c.zones)
          a.push({
            value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
            color: c.negativeColor,
            fillColor: c.negativeFillColor
          });
        a.length && t(a[a.length - 1].value) && a.push({
          color: this.color,
          fillColor: this.fillColor
        });
        return c;
      },
      getCyclic: function(a, b, c) {
        var d = this.userOptions,
            e = "_" + a + "Index",
            f = a + "Counter";
        b || (t(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
        this[a] = b;
      },
      getColor: function() {
        this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || Z[this.type].color, this.chart.options.colors);
      },
      getSymbol: function() {
        var a = this.options.marker;
        this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
        if (/^url/.test(this.symbol))
          a.radius = 0;
      },
      drawLegendSymbol: ab.drawLineMarker,
      setData: function(a, b, c, d) {
        var e = this,
            f = e.points,
            g = f && f.length || 0,
            h,
            i = e.options,
            k = e.chart,
            j = null,
            l = e.xAxis,
            m = l && !!l.categories,
            p = i.turboThreshold,
            q = this.xData,
            A = this.yData,
            r = (h = e.pointArrayMap) && h.length,
            a = a || [];
        h = a.length;
        b = o(b, !0);
        if (d !== !1 && h && g === h && !e.cropped && !e.hasGroupedData && e.visible)
          n(a, function(a, b) {
            f[b].update && a !== i.data[b] && f[b].update(a, !1, null, !1);
          });
        else {
          e.xIncrement = null;
          e.colorCounter = 0;
          n(this.parallelArrays, function(a) {
            e[a + "Data"].length = 0;
          });
          if (p && h > p) {
            for (c = 0; j === null && c < h; )
              j = a[c], c++;
            if (F(j)) {
              m = o(i.pointStart, 0);
              j = o(i.pointInterval, 1);
              for (c = 0; c < h; c++)
                q[c] = m, A[c] = a[c], m += j;
              e.xIncrement = m;
            } else if (Ca(j))
              if (r)
                for (c = 0; c < h; c++)
                  j = a[c], q[c] = j[0], A[c] = j.slice(1, r + 1);
              else
                for (c = 0; c < h; c++)
                  j = a[c], q[c] = j[0], A[c] = j[1];
            else
              V(12);
          } else
            for (c = 0; c < h; c++)
              if (a[c] !== w && (j = {series: e}, e.pointClass.prototype.applyOptions.apply(j, [a[c]]), e.updateParallelArrays(j, c), m && t(j.name)))
                l.names[j.x] = j.name;
          va(A[0]) && V(14, !0);
          e.data = [];
          e.options.data = e.userOptions.data = a;
          for (c = g; c--; )
            f[c] && f[c].destroy && f[c].destroy();
          if (l)
            l.minRange = l.userMinRange;
          e.isDirty = e.isDirtyData = k.isDirtyBox = !0;
          c = !1;
        }
        i.legendType === "point" && (this.processData(), this.generatePoints());
        b && k.redraw(c);
      },
      processData: function(a) {
        var b = this.xData,
            c = this.yData,
            d = b.length,
            e;
        e = 0;
        var f,
            g,
            h = this.xAxis,
            i,
            k = this.options;
        i = k.cropThreshold;
        var j = this.getExtremesFromAll || k.getExtremesFromAll,
            l = this.isCartesian,
            k = h && h.val2lin,
            m = h && h.isLog,
            p,
            q;
        if (l && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a)
          return !1;
        if (h)
          a = h.getExtremes(), p = a.min, q = a.max;
        if (l && this.sorted && !j && (!i || d > i || this.forceCrop))
          if (b[d - 1] < p || b[0] > q)
            b = [], c = [];
          else if (b[0] < p || b[d - 1] > q)
            e = this.cropData(this.xData, this.yData, p, q), b = e.xData, c = e.yData, e = e.start, f = !0;
        for (i = b.length || 1; --i; )
          d = m ? k(b[i]) - k(b[i - 1]) : b[i] - b[i - 1], d > 0 && (g === w || d < g) ? g = d : d < 0 && this.requireSorting && V(15);
        this.cropped = f;
        this.cropStart = e;
        this.processedXData = b;
        this.processedYData = c;
        this.closestPointRange = g;
      },
      cropData: function(a, b, c, d) {
        var e = a.length,
            f = 0,
            g = e,
            h = o(this.cropShoulder, 1),
            i;
        for (i = 0; i < e; i++)
          if (a[i] >= c) {
            f = u(0, i - h);
            break;
          }
        for (c = i; c < e; c++)
          if (a[c] > d) {
            g = c + h;
            break;
          }
        return {
          xData: a.slice(f, g),
          yData: b.slice(f, g),
          start: f,
          end: g
        };
      },
      generatePoints: function() {
        var a = this.options.data,
            b = this.data,
            c,
            d = this.processedXData,
            e = this.processedYData,
            f = this.pointClass,
            g = d.length,
            h = this.cropStart || 0,
            i,
            k = this.hasGroupedData,
            j,
            l = [],
            m;
        if (!b && !k)
          b = [], b.length = a.length, b = this.data = b;
        for (m = 0; m < g; m++)
          i = h + m, k ? (l[m] = (new f).init(this, [d[m]].concat(ra(e[m]))), l[m].dataGroup = this.groupMap[m]) : (b[i] ? j = b[i] : a[i] !== w && (b[i] = j = (new f).init(this, a[i], d[m])), l[m] = j), l[m].index = i;
        if (b && (g !== (c = b.length) || k))
          for (m = 0; m < c; m++)
            if (m === h && !k && (m += g), b[m])
              b[m].destroyElements(), b[m].plotX = w;
        this.data = b;
        this.points = l;
      },
      getExtremes: function(a) {
        var b = this.yAxis,
            c = this.processedXData,
            d,
            e = [],
            f = 0;
        d = this.xAxis.getExtremes();
        var g = d.min,
            h = d.max,
            i,
            k,
            j,
            l,
            a = a || this.stackedYData || this.processedYData || [];
        d = a.length;
        for (l = 0; l < d; l++)
          if (k = c[l], j = a[l], i = j !== null && j !== w && (!b.isLog || j.length || j > 0), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[l + 1] || k) >= g && (c[l - 1] || k) <= h, i && k)
            if (i = j.length)
              for (; i--; )
                j[i] !== null && (e[f++] = j[i]);
            else
              e[f++] = j;
        this.dataMin = Pa(e);
        this.dataMax = Ia(e);
      },
      translate: function() {
        this.processedXData || this.processData();
        this.generatePoints();
        for (var a = this.options,
            b = a.stacking,
            c = this.xAxis,
            d = c.categories,
            e = this.yAxis,
            f = this.points,
            g = f.length,
            h = !!this.modifyValue,
            i = a.pointPlacement,
            k = i === "between" || F(i),
            j = a.threshold,
            l = a.startFromThreshold ? j : 0,
            m,
            p,
            q,
            n,
            r = Number.MAX_VALUE,
            a = 0; a < g; a++) {
          var v = f[a],
              B = v.x,
              s = v.y;
          p = v.low;
          var x = b && e.stacks[(this.negStacks && s < (l ? 0 : j) ? "-" : "") + this.stackKey];
          if (e.isLog && s !== null && s <= 0)
            v.y = s = null, V(10);
          v.plotX = m = pa(I(u(-1E5, c.translate(B, 0, 0, 0, 1, i, this.type === "flags")), 1E5));
          if (b && this.visible && !v.isNull && x && x[B])
            n = this.getStackIndicator(n, B, this.index), x = x[B], s = x.points[n.key], p = s[0], s = s[1], p === l && (p = o(j, e.min)), e.isLog && p <= 0 && (p = null), v.total = v.stackTotal = x.total, v.percentage = x.total && v.y / x.total * 100, v.stackY = s, x.setOffset(this.pointXOffset || 0, this.barW || 0);
          v.yBottom = t(p) ? e.translate(p, 0, 1, 0, 1) : null;
          h && (s = this.modifyValue(s, v));
          v.plotY = p = typeof s === "number" && s !== Infinity ? I(u(-1E5, e.translate(s, 0, 1, 0, 1)), 1E5) : w;
          v.isInside = p !== w && p >= 0 && p <= e.len && m >= 0 && m <= c.len;
          v.clientX = k ? c.translate(B, 0, 0, 0, 1) : m;
          v.negative = v.y < (j || 0);
          v.category = d && d[v.x] !== w ? d[v.x] : v.x;
          v.isNull || (q !== void 0 && (r = I(r, S(m - q))), q = m);
        }
        this.closestPointRangePx = r;
      },
      getValidPoints: function(a, b) {
        var c = this.chart;
        return Ha(a || this.points || [], function(a) {
          return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull;
        });
      },
      setClip: function(a) {
        var b = this.chart,
            c = this.options,
            d = b.renderer,
            e = b.inverted,
            f = this.clipBox,
            g = f || b.clipBox,
            h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(","),
            i = b[h],
            k = b[h + "m"];
        if (!i) {
          if (a)
            g.width = 0, b[h + "m"] = k = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight);
          b[h] = i = d.clipRect(g);
        }
        a && (i.count += 1);
        if (c.clip !== !1)
          this.group.clip(a || f ? i : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = h;
        a || (i.count -= 1, i.count <= 0 && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())));
      },
      animate: function(a) {
        var b = this.chart,
            c = this.options.animation,
            d;
        if (c && !aa(c))
          c = Z[this.type].animation;
        a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({width: b.plotSizeX}, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null);
      },
      afterAnimate: function() {
        this.setClip();
        G(this, "afterAnimate");
      },
      drawPoints: function() {
        var a,
            b = this.points,
            c = this.chart,
            d,
            e,
            f,
            g,
            h,
            i,
            k,
            j,
            l = this.options.marker,
            m = this.pointAttr[""],
            p,
            q,
            n,
            t = this.markerGroup,
            v = o(l.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * l.radius);
        if (l.enabled !== !1 || this._hasPointMarkers)
          for (f = b.length; f--; )
            if (g = b[f], d = fa(g.plotX), e = g.plotY, j = g.graphic, p = g.marker || {}, q = !!g.marker, a = v && p.enabled === w || p.enabled, n = g.isInside, a && F(e) && g.y !== null)
              if (a = g.pointAttr[g.selected ? "select" : ""] || m, h = a.r, i = o(p.symbol, this.symbol), k = i.indexOf("url") === 0, j)
                j[n ? "show" : "hide"](!0).attr(a).animate(r({
                  x: d - h,
                  y: e - h
                }, j.symbolName ? {
                  width: 2 * h,
                  height: 2 * h
                } : {}));
              else {
                if (n && (h > 0 || k))
                  g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h, q ? p : l).attr(a).add(t);
              }
            else if (j)
              g.graphic = j.destroy();
      },
      convertAttribs: function(a, b, c, d) {
        var e = this.pointAttrToOptions,
            f,
            g,
            h = {},
            a = a || {},
            b = b || {},
            c = c || {},
            d = d || {};
        for (f in e)
          g = e[f], h[f] = o(a[g], b[f], c[f], d[f]);
        return h;
      },
      getAttribs: function() {
        var a = this,
            b = a.options,
            c = Z[a.type].marker ? b.marker : b,
            d = c.states,
            e = d.hover,
            f,
            g = a.color,
            h = a.options.negativeColor,
            i = {
              stroke: g,
              fill: g
            },
            k = a.points || [],
            j,
            l = [],
            m,
            p = a.pointAttrToOptions;
        f = a.hasPointSpecificOptions;
        var q = c.lineColor,
            A = c.fillColor;
        j = b.turboThreshold;
        var s = a.zones,
            v = a.zoneAxis || "y",
            B,
            u;
        b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : (e.color = e.color || T(e.color || g).brighten(e.brightness).get(), e.negativeColor = e.negativeColor || T(e.negativeColor || h).brighten(e.brightness).get());
        l[""] = a.convertAttribs(c, i);
        n(["hover", "select"], function(b) {
          l[b] = a.convertAttribs(d[b], l[""]);
        });
        a.pointAttr = l;
        g = k.length;
        if (!j || g < j || f)
          for (; g--; ) {
            j = k[g];
            if ((c = j.options && j.options.marker || j.options) && c.enabled === !1)
              c.radius = 0;
            i = null;
            if (s.length) {
              f = 0;
              for (i = s[f]; j[v] >= i.value; )
                i = s[++f];
              j.color = j.fillColor = i = o(i.color, a.color);
            }
            f = b.colorByPoint || j.color;
            if (j.options)
              for (u in p)
                t(c[p[u]]) && (f = !0);
            if (f) {
              c = c || {};
              m = [];
              d = c.states || {};
              f = d.hover = d.hover || {};
              if (!b.marker || j.negative && !f.fillColor && !e.fillColor)
                f[a.pointAttrToOptions.fill] = f.color || !j.options.color && e[j.negative && h ? "negativeColor" : "color"] || T(j.color).brighten(f.brightness || e.brightness).get();
              B = {color: j.color};
              if (!A)
                B.fillColor = j.color;
              if (!q)
                B.lineColor = j.color;
              c.hasOwnProperty("color") && !c.color && delete c.color;
              if (i && !e.fillColor)
                f.fillColor = i;
              m[""] = a.convertAttribs(r(B, c), l[""]);
              m.hover = a.convertAttribs(d.hover, l.hover, m[""]);
              m.select = a.convertAttribs(d.select, l.select, m[""]);
            } else
              m = l;
            j.pointAttr = m;
          }
      },
      destroy: function() {
        var a = this,
            b = a.chart,
            c = /AppleWebKit\/533/.test(ya),
            d,
            e = a.data || [],
            f,
            g,
            h;
        G(a, "destroy");
        Y(a);
        n(a.axisTypes || [], function(b) {
          if (h = a[b])
            wa(h.series, a), h.isDirty = h.forceRedraw = !0;
        });
        a.legendItem && a.chart.legend.destroyItem(a);
        for (d = e.length; d--; )
          (f = e[d]) && f.destroy && f.destroy();
        a.points = null;
        clearTimeout(a.animationTimeout);
        for (g in a)
          a[g] instanceof Q && !a[g].survive && (d = c && g === "group" ? "hide" : "destroy", a[g][d]());
        if (b.hoverSeries === a)
          b.hoverSeries = null;
        wa(b.series, a);
        for (g in a)
          delete a[g];
      },
      getGraphPath: function(a, b, c) {
        var d = this,
            e = d.options,
            f = e.step,
            g,
            h = [],
            i,
            a = a || d.points;
        (g = a.reversed) && a.reverse();
        (f = {
          right: 1,
          center: 2
        }[f] || f && 3) && g && (f = 4 - f);
        e.connectNulls && !b && !c && (a = this.getValidPoints(a));
        n(a, function(g, j) {
          var l = g.plotX,
              m = g.plotY,
              p = a[j - 1];
          if ((g.leftCliff || p && p.rightCliff) && !c)
            i = !0;
          g.isNull && !t(b) && j > 0 ? i = !e.connectNulls : g.isNull && !b ? i = !0 : (j === 0 || i ? p = ["M", g.plotX, g.plotY] : d.getPointSpline ? p = d.getPointSpline(a, g, j) : f ? (p = f === 1 ? ["L", p.plotX, m] : f === 2 ? ["L", (p.plotX + l) / 2, p.plotY, "L", (p.plotX + l) / 2, m] : ["L", l, p.plotY], p.push("L", l, m)) : p = ["L", l, m], h.push.apply(h, p), i = !1);
        });
        return d.graphPath = h;
      },
      drawGraph: function() {
        var a = this,
            b = this.options,
            c = [["graph", b.lineColor || this.color, b.dashStyle]],
            d = b.lineWidth,
            e = b.linecap !== "square",
            f = (this.gappedPath || this.getGraphPath).call(this),
            g = this.fillGraph && this.color || "none";
        n(this.zones, function(d, e) {
          c.push(["zoneGraph" + e, d.color || a.color, d.dashStyle || b.dashStyle]);
        });
        n(c, function(c, i) {
          var k = c[0],
              j = a[k];
          if (j)
            j.animate({d: f});
          else if ((d || g) && f.length)
            j = {
              stroke: c[1],
              "stroke-width": d,
              fill: g,
              zIndex: 1
            }, c[2] ? j.dashstyle = c[2] : e && (j["stroke-linecap"] = j["stroke-linejoin"] = "round"), a[k] = a.chart.renderer.path(f).attr(j).add(a.group).shadow(i < 2 && b.shadow);
        });
      },
      applyZones: function() {
        var a = this,
            b = this.chart,
            c = b.renderer,
            d = this.zones,
            e,
            f,
            g = this.clips || [],
            h,
            i = this.graph,
            k = this.area,
            j = u(b.chartWidth, b.chartHeight),
            l = this[(this.zoneAxis || "y") + "Axis"],
            m,
            p = l.reversed,
            q = b.inverted,
            A = l.horiz,
            r,
            v,
            B,
            t = !1;
        if (d.length && (i || k) && l.min !== w)
          i && i.hide(), k && k.hide(), m = l.getExtremes(), n(d, function(d, n) {
            e = p ? A ? b.plotWidth : 0 : A ? 0 : l.toPixels(m.min);
            e = I(u(o(f, e), 0), j);
            f = I(u(x(l.toPixels(o(d.value, m.max), !0)), 0), j);
            t && (e = f = l.toPixels(m.max));
            r = Math.abs(e - f);
            v = I(e, f);
            B = u(e, f);
            if (l.isXAxis) {
              if (h = {
                x: q ? B : v,
                y: 0,
                width: r,
                height: j
              }, !A)
                h.x = b.plotHeight - h.x;
            } else if (h = {
              x: 0,
              y: q ? B : v,
              width: j,
              height: r
            }, A)
              h.y = b.plotWidth - h.y;
            b.inverted && c.isVML && (h = l.isXAxis ? {
              x: 0,
              y: p ? v : B,
              height: h.width,
              width: b.chartWidth
            } : {
              x: h.y - b.plotLeft - b.spacingBox.x,
              y: 0,
              width: h.height,
              height: b.chartHeight
            });
            g[n] ? g[n].animate(h) : (g[n] = c.clipRect(h), i && a["zoneGraph" + n].clip(g[n]), k && a["zoneArea" + n].clip(g[n]));
            t = d.value > m.max;
          }), this.clips = g;
      },
      invertGroups: function() {
        function a() {
          var a = {
            width: b.yAxis.len,
            height: b.xAxis.len
          };
          n(["group", "markerGroup"], function(c) {
            b[c] && b[c].attr(a).invert();
          });
        }
        var b = this,
            c = b.chart;
        if (b.xAxis)
          N(c, "resize", a), N(b, "destroy", function() {
            Y(c, "resize", a);
          }), a(), b.invertGroups = a;
      },
      plotGroup: function(a, b, c, d, e) {
        var f = this[a],
            g = !f;
        g && (this[a] = f = this.chart.renderer.g(b).attr({zIndex: d || 0.1}).add(e), f.addClass("highcharts-series-" + this.index));
        f.attr({visibility: c})[g ? "attr" : "animate"](this.getPlotBox());
        return f;
      },
      getPlotBox: function() {
        var a = this.chart,
            b = this.xAxis,
            c = this.yAxis;
        if (a.inverted)
          b = c, c = this.xAxis;
        return {
          translateX: b ? b.left : a.plotLeft,
          translateY: c ? c.top : a.plotTop,
          scaleX: 1,
          scaleY: 1
        };
      },
      render: function() {
        var a = this,
            b = a.chart,
            c,
            d = a.options,
            e = !!a.animate && b.renderer.isSVG && Ra(d.animation).duration,
            f = a.visible ? "inherit" : "hidden",
            g = d.zIndex,
            h = a.hasRendered,
            i = b.seriesGroup;
        c = a.plotGroup("group", "series", f, g, i);
        a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, i);
        e && a.animate(!0);
        a.getAttribs();
        c.inverted = a.isCartesian ? b.inverted : !1;
        a.drawGraph && (a.drawGraph(), a.applyZones());
        n(a.points, function(a) {
          a.redraw && a.redraw();
        });
        a.drawDataLabels && a.drawDataLabels();
        a.visible && a.drawPoints();
        a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker();
        b.inverted && a.invertGroups();
        d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect);
        e && a.animate();
        if (!h)
          a.animationTimeout = Na(function() {
            a.afterAnimate();
          }, e);
        a.isDirty = a.isDirtyData = !1;
        a.hasRendered = !0;
      },
      redraw: function() {
        var a = this.chart,
            b = this.isDirty || this.isDirtyData,
            c = this.group,
            d = this.xAxis,
            e = this.yAxis;
        c && (a.inverted && c.attr({
          width: a.plotWidth,
          height: a.plotHeight
        }), c.animate({
          translateX: o(d && d.left, a.plotLeft),
          translateY: o(e && e.top, a.plotTop)
        }));
        this.translate();
        this.render();
        b && delete this.kdTree;
      },
      kdDimensions: 1,
      kdAxisArray: ["clientX", "plotY"],
      searchPoint: function(a, b) {
        var c = this.xAxis,
            d = this.yAxis,
            e = this.chart.inverted;
        return this.searchKDTree({
          clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
          plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
        }, b);
      },
      buildKDTree: function() {
        function a(c, e, f) {
          var g,
              h;
          if (h = c && c.length)
            return g = b.kdAxisArray[e % f], c.sort(function(a, b) {
              return a[g] - b[g];
            }), h = Math.floor(h / 2), {
              point: c[h],
              left: a(c.slice(0, h), e + 1, f),
              right: a(c.slice(h + 1), e + 1, f)
            };
        }
        var b = this,
            c = b.kdDimensions;
        delete b.kdTree;
        Na(function() {
          b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
        }, b.options.kdNow ? 0 : 1);
      },
      searchKDTree: function(a, b) {
        function c(a, b, k, j) {
          var l = b.point,
              m = d.kdAxisArray[k % j],
              p,
              n,
              o = l;
          n = t(a[e]) && t(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
          p = t(a[f]) && t(l[f]) ? Math.pow(a[f] - l[f], 2) : null;
          p = (n || 0) + (p || 0);
          l.dist = t(p) ? Math.sqrt(p) : Number.MAX_VALUE;
          l.distX = t(n) ? Math.sqrt(n) : Number.MAX_VALUE;
          m = a[m] - l[m];
          p = m < 0 ? "left" : "right";
          n = m < 0 ? "right" : "left";
          b[p] && (p = c(a, b[p], k + 1, j), o = p[g] < o[g] ? p : l);
          b[n] && Math.sqrt(m * m) < o[g] && (a = c(a, b[n], k + 1, j), o = a[g] < o[g] ? a : o);
          return o;
        }
        var d = this,
            e = this.kdAxisArray[0],
            f = this.kdAxisArray[1],
            g = b ? "distX" : "dist";
        this.kdTree || this.buildKDTree();
        if (this.kdTree)
          return c(a, this.kdTree, this.kdDimensions, this.kdDimensions);
      }
    };
    r(ja.prototype, {
      addSeries: function(a, b, c) {
        var d,
            e = this;
        a && (b = o(b, !0), G(e, "addSeries", {options: a}, function() {
          d = e.initSeries(a);
          e.isDirtyLegend = !0;
          e.linkSeries();
          b && e.redraw(c);
        }));
        return d;
      },
      addAxis: function(a, b, c, d) {
        var e = b ? "xAxis" : "yAxis",
            f = this.options,
            a = C(a, {
              index: this[e].length,
              isX: b
            });
        new X(this, a);
        f[e] = ra(f[e] || {});
        f[e].push(a);
        o(c, !0) && this.redraw(d);
      },
      showLoading: function(a) {
        var b = this,
            c = b.options,
            d = b.loadingDiv,
            e = c.loading,
            f = function() {
              d && M(d, {
                left: b.plotLeft + "px",
                top: b.plotTop + "px",
                width: b.plotWidth + "px",
                height: b.plotHeight + "px"
              });
            };
        if (!d)
          b.loadingDiv = d = da(Ja, {className: "highcharts-loading"}, r(e.style, {
            zIndex: 10,
            display: "none"
          }), b.container), b.loadingSpan = da("span", null, e.labelStyle, d), N(b, "redraw", f);
        b.loadingSpan.innerHTML = a || c.lang.loading;
        if (!b.loadingShown)
          M(d, {
            opacity: 0,
            display: ""
          }), Ua(d, {opacity: e.style.opacity}, {duration: e.showDuration || 0}), b.loadingShown = !0;
        f();
      },
      hideLoading: function() {
        var a = this.options,
            b = this.loadingDiv;
        b && Ua(b, {opacity: 0}, {
          duration: a.loading.hideDuration || 100,
          complete: function() {
            M(b, {display: "none"});
          }
        });
        this.loadingShown = !1;
      }
    });
    r($.prototype, {
      update: function(a, b, c, d) {
        function e() {
          f.applyOptions(a);
          if (f.y === null && h)
            f.graphic = h.destroy();
          if (aa(a) && !Ca(a))
            f.redraw = function() {
              if (h && h.element && a && a.marker && a.marker.symbol)
                f.graphic = h.destroy();
              if (a && a.dataLabels && f.dataLabel)
                f.dataLabel = f.dataLabel.destroy();
              f.redraw = null;
            };
          i = f.index;
          g.updateParallelArrays(f, i);
          if (l && f.name)
            l[f.x] = f.name;
          j.data[i] = aa(j.data[i]) && !Ca(j.data[i]) ? f.options : a;
          g.isDirty = g.isDirtyData = !0;
          if (!g.fixedBox && g.hasCartesianSeries)
            k.isDirtyBox = !0;
          if (j.legendType === "point")
            k.isDirtyLegend = !0;
          b && k.redraw(c);
        }
        var f = this,
            g = f.series,
            h = f.graphic,
            i,
            k = g.chart,
            j = g.options,
            l = g.xAxis && g.xAxis.names,
            b = o(b, !0);
        d === !1 ? e() : f.firePointEvent("update", {options: a}, e);
      },
      remove: function(a, b) {
        this.series.removePoint(za(this, this.series.data), a, b);
      }
    });
    r(R.prototype, {
      addPoint: function(a, b, c, d) {
        var e = this,
            f = e.options,
            g = e.data,
            h = e.graph,
            i = e.area,
            k = e.chart,
            j = e.xAxis && e.xAxis.names,
            l = h && h.shift || 0,
            m = ["graph", "area"],
            h = f.data,
            p,
            q = e.xData;
        Va(d, k);
        if (c) {
          for (d = e.zones.length; d--; )
            m.push("zoneGraph" + d, "zoneArea" + d);
          n(m, function(a) {
            if (e[a])
              e[a].shift = l + (f.step ? 2 : 1);
          });
        }
        if (i)
          i.isArea = !0;
        b = o(b, !0);
        i = {series: e};
        e.pointClass.prototype.applyOptions.apply(i, [a]);
        m = i.x;
        d = q.length;
        if (e.requireSorting && m < q[d - 1])
          for (p = !0; d && q[d - 1] > m; )
            d--;
        e.updateParallelArrays(i, "splice", d, 0, 0);
        e.updateParallelArrays(i, d);
        if (j && i.name)
          j[m] = i.name;
        h.splice(d, 0, a);
        p && (e.data.splice(d, 0, null), e.processData());
        f.legendType === "point" && e.generatePoints();
        c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), e.updateParallelArrays(i, "shift"), h.shift()));
        e.isDirty = !0;
        e.isDirtyData = !0;
        b && (e.getAttribs(), k.redraw());
      },
      removePoint: function(a, b, c) {
        var d = this,
            e = d.data,
            f = e[a],
            g = d.points,
            h = d.chart,
            i = function() {
              g && g.length === e.length && g.splice(a, 1);
              e.splice(a, 1);
              d.options.data.splice(a, 1);
              d.updateParallelArrays(f || {series: d}, "splice", a, 1);
              f && f.destroy();
              d.isDirty = !0;
              d.isDirtyData = !0;
              b && h.redraw();
            };
        Va(c, h);
        b = o(b, !0);
        f ? f.firePointEvent("remove", null, i) : i();
      },
      remove: function(a, b) {
        var c = this,
            d = c.chart;
        G(c, "remove", null, function() {
          c.destroy();
          d.isDirtyLegend = d.isDirtyBox = !0;
          d.linkSeries();
          o(a, !0) && d.redraw(b);
        });
      },
      update: function(a, b) {
        var c = this,
            d = this.chart,
            e = this.userOptions,
            f = this.type,
            g = y[f].prototype,
            h = ["group", "markerGroup", "dataLabelsGroup"],
            i;
        if (a.type && a.type !== f || a.zIndex !== void 0)
          h.length = 0;
        n(h, function(a) {
          h[a] = c[a];
          delete c[a];
        });
        a = C(e, {
          animation: !1,
          index: this.index,
          pointStart: this.xData[0]
        }, {data: this.options.data}, a);
        this.remove(!1);
        for (i in g)
          this[i] = w;
        r(this, y[a.type || f].prototype);
        n(h, function(a) {
          c[a] = h[a];
        });
        this.init(d, a);
        d.linkSeries();
        o(b, !0) && d.redraw(!1);
      }
    });
    r(X.prototype, {
      update: function(a, b) {
        var c = this.chart,
            a = c.options[this.coll][this.options.index] = C(this.userOptions, a);
        this.destroy(!0);
        this._addedPlotLB = this.chart._labelPanes = w;
        this.init(c, r(a, {events: w}));
        c.isDirtyBox = !0;
        o(b, !0) && c.redraw();
      },
      remove: function(a) {
        for (var b = this.chart,
            c = this.coll,
            d = this.series,
            e = d.length; e--; )
          d[e] && d[e].remove(!1);
        wa(b.axes, this);
        wa(b[c], this);
        b.options[c].splice(this.options.index, 1);
        n(b[c], function(a, b) {
          a.options.index = b;
        });
        this.destroy();
        b.isDirtyBox = !0;
        o(a, !0) && b.redraw();
      },
      setTitle: function(a, b) {
        this.update({title: a}, b);
      },
      setCategories: function(a, b) {
        this.update({categories: a}, b);
      }
    });
    U = ba(R);
    y.line = U;
    Z.column = C(Ya, {
      borderColor: "#FFFFFF",
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
          shadow: !1,
          halo: !1
        },
        select: {
          color: "#C0C0C0",
          borderColor: "#000000",
          shadow: !1
        }
      },
      dataLabels: {
        align: null,
        verticalAlign: null,
        y: null
      },
      softThreshold: !1,
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: {distance: 6},
      threshold: 0
    });
    U = ba(R, {
      type: "column",
      pointAttrToOptions: {
        stroke: "borderColor",
        fill: "color",
        r: "borderRadius"
      },
      cropShoulder: 0,
      directTouch: !0,
      trackerGroups: ["group", "dataLabelsGroup"],
      negStacks: !0,
      init: function() {
        R.prototype.init.apply(this, arguments);
        var a = this,
            b = a.chart;
        b.hasRendered && n(b.series, function(b) {
          if (b.type === a.type)
            b.isDirty = !0;
        });
      },
      getColumnMetrics: function() {
        var a = this,
            b = a.options,
            c = a.xAxis,
            d = a.yAxis,
            e = c.reversed,
            f,
            g = {},
            h = 0;
        b.grouping === !1 ? h = 1 : n(a.chart.series, function(b) {
          var c = b.options,
              e = b.yAxis,
              i;
          if (b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos)
            c.stacking ? (f = b.stackKey, g[f] === w && (g[f] = h++), i = g[f]) : c.grouping !== !1 && (i = h++), b.columnIndex = i;
        });
        var i = I(S(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
            k = i * b.groupPadding,
            j = (i - 2 * k) / h,
            b = I(b.maxPointWidth || c.len, o(b.pointWidth, j * (1 - 2 * b.pointPadding)));
        a.columnMetrics = {
          width: b,
          offset: (j - b) / 2 + (k + ((a.columnIndex || 0) + (e ? 1 : 0)) * j - i / 2) * (e ? -1 : 1)
        };
        return a.columnMetrics;
      },
      crispCol: function(a, b, c, d) {
        var e = this.chart,
            f = this.borderWidth,
            g = -(f % 2 ? 0.5 : 0),
            f = f % 2 ? 0.5 : 1;
        e.inverted && e.renderer.isVML && (f += 1);
        c = Math.round(a + c) + g;
        a = Math.round(a) + g;
        c -= a;
        d = Math.round(b + d) + f;
        g = S(b) <= 0.5 && d > 0.5;
        b = Math.round(b) + f;
        d -= b;
        g && d && (b -= 1, d += 1);
        return {
          x: a,
          y: b,
          width: c,
          height: d
        };
      },
      translate: function() {
        var a = this,
            b = a.chart,
            c = a.options,
            d = a.borderWidth = o(c.borderWidth, a.closestPointRange * a.xAxis.transA < 2 ? 0 : 1),
            e = a.yAxis,
            f = a.translatedThreshold = e.getThreshold(c.threshold),
            g = o(c.minPointLength, 5),
            h = a.getColumnMetrics(),
            i = h.width,
            k = a.barW = u(i, 1 + 2 * d),
            j = a.pointXOffset = h.offset;
        b.inverted && (f -= 0.5);
        c.pointPadding && (k = ta(k));
        R.prototype.translate.apply(a);
        n(a.points, function(c) {
          var d = I(o(c.yBottom, f), 9E4),
              h = 999 + S(d),
              h = I(u(-h, c.plotY), e.len + h),
              n = c.plotX + j,
              r = k,
              t = I(h, d),
              v,
              B = u(h, d) - t;
          S(B) < g && g && (B = g, v = !e.reversed && !c.negative || e.reversed && c.negative, t = S(t - f) > g ? d - g : f - (v ? g : 0));
          c.barX = n;
          c.pointWidth = i;
          c.tooltipPos = b.inverted ? [e.len + e.pos - b.plotLeft - h, a.xAxis.len - n - r / 2, B] : [n + r / 2, h + e.pos - b.plotTop, B];
          c.shapeType = "rect";
          c.shapeArgs = a.crispCol(n, t, r, B);
        });
      },
      getSymbol: W,
      drawLegendSymbol: ab.drawRectangle,
      drawGraph: W,
      drawPoints: function() {
        var a = this,
            b = this.chart,
            c = a.options,
            d = b.renderer,
            e = c.animationLimit || 250,
            f,
            g;
        n(a.points, function(h) {
          var i = h.graphic,
              k;
          if (F(h.plotY) && h.y !== null)
            f = h.shapeArgs, k = t(a.borderWidth) ? {"stroke-width": a.borderWidth} : {}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], i ? (La(i), i.attr(k).attr(g)[b.pointCount < e ? "animate" : "attr"](C(f))) : h.graphic = d[h.shapeType](f).attr(k).attr(g).add(h.group || a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius);
          else if (i)
            h.graphic = i.destroy();
        });
      },
      animate: function(a) {
        var b = this,
            c = this.yAxis,
            d = b.options,
            e = this.chart.inverted,
            f = {};
        if (ea)
          a ? (f.scaleY = 0.001, a = I(c.pos + c.len, u(c.pos, c.toPixels(d.threshold))), e ? f.translateX = a - c.len : f.translateY = a, b.group.attr(f)) : (f[e ? "translateX" : "translateY"] = c.pos, b.group.animate(f, r(Ra(b.options.animation), {step: function(a, c) {
              b.group.attr({scaleY: u(0.001, c.pos)});
            }})), b.animate = null);
      },
      remove: function() {
        var a = this,
            b = a.chart;
        b.hasRendered && n(b.series, function(b) {
          if (b.type === a.type)
            b.isDirty = !0;
        });
        R.prototype.remove.apply(a, arguments);
      }
    });
    y.column = U;
    Z.scatter = C(Ya, {
      lineWidth: 0,
      marker: {enabled: !0},
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
      }
    });
    Ya = ba(R, {
      type: "scatter",
      sorted: !1,
      requireSorting: !1,
      noSharedTooltip: !0,
      trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
      takeOrdinalPosition: !1,
      kdDimensions: 2,
      drawGraph: function() {
        this.options.lineWidth && R.prototype.drawGraph.call(this);
      }
    });
    y.scatter = Ya;
    R.prototype.drawDataLabels = function() {
      var a = this,
          b = a.options,
          c = b.cursor,
          d = b.dataLabels,
          e = a.points,
          f,
          g,
          h = a.hasRendered || 0,
          i,
          k,
          j = o(d.defer, !0),
          l = a.chart.renderer;
      if (d.enabled || a._hasPointLabels)
        a.dlProcessOptions && a.dlProcessOptions(d), k = a.plotGroup("dataLabelsGroup", "data-labels", j && !h ? "hidden" : "visible", d.zIndex || 6), j && (k.attr({opacity: +h}), h || N(a, "afterAnimate", function() {
          a.visible && k.show();
          k[b.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200});
        })), g = d, n(e, function(e) {
          var h,
              j = e.dataLabel,
              n,
              s,
              v = e.connector,
              B = !0,
              u,
              x = {};
          f = e.dlOptions || e.options && e.options.dataLabels;
          h = o(f && f.enabled, g.enabled) && e.y !== null;
          if (j && !h)
            e.dataLabel = j.destroy();
          else if (h) {
            d = C(g, f);
            u = d.style;
            h = d.rotation;
            n = e.getLabelConfig();
            i = d.format ? Ea(d.format, n) : d.formatter.call(n, d);
            u.color = o(d.color, u.color, a.color, "black");
            if (j)
              if (t(i))
                j.attr({text: i}), B = !1;
              else {
                if (e.dataLabel = j = j.destroy(), v)
                  e.connector = v.destroy();
              }
            else if (t(i)) {
              j = {
                fill: d.backgroundColor,
                stroke: d.borderColor,
                "stroke-width": d.borderWidth,
                r: d.borderRadius || 0,
                rotation: h,
                padding: d.padding,
                zIndex: 1
              };
              if (u.color === "contrast")
                x.color = d.inside || d.distance < 0 || b.stacking ? l.getContrast(e.color || a.color) : "#000000";
              if (c)
                x.cursor = c;
              for (s in j)
                j[s] === w && delete j[s];
              j = e.dataLabel = l[h ? "text" : "label"](i, 0, -9999, d.shape, null, null, d.useHTML).attr(j).css(r(u, x)).add(k).shadow(d.shadow);
            }
            j && a.alignDataLabel(e, j, d, null, B);
          }
        });
    };
    R.prototype.alignDataLabel = function(a, b, c, d, e) {
      var f = this.chart,
          g = f.inverted,
          h = o(a.plotX, -9999),
          i = o(a.plotY, -9999),
          k = b.getBBox(),
          j = f.renderer.fontMetrics(c.style.fontSize).b,
          l = c.rotation,
          m = c.align,
          n = this.visible && (a.series.forceDL || f.isInsidePlot(h, x(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g)),
          q = o(c.overflow, "justify") === "justify";
      if (n)
        d = r({
          x: g ? f.plotWidth - i : h,
          y: x(g ? f.plotHeight - h : i),
          width: 0,
          height: 0
        }, d), r(c, {
          width: k.width,
          height: k.height
        }), l ? (q = !1, g = f.renderer.rotCorr(j, l), g = {
          x: d.x + c.x + d.width / 2 + g.x,
          y: d.y + c.y + {
            top: 0,
            middle: 0.5,
            bottom: 1
          }[c.verticalAlign] * d.height
        }, b[e ? "attr" : "animate"](g).attr({align: m}), h = (l + 720) % 360, h = h > 180 && h < 360, m === "left" ? g.y -= h ? k.height : 0 : m === "center" ? (g.x -= k.width / 2, g.y -= k.height / 2) : m === "right" && (g.x -= k.width, g.y -= h ? 0 : k.height)) : (b.align(c, null, d), g = b.alignAttr), q ? this.justifyDataLabel(b, c, g, k, d, e) : o(c.crop, !0) && (n = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + k.width, g.y + k.height)), c.shape && !l && b.attr({
          anchorX: a.plotX,
          anchorY: a.plotY
        });
      if (!n)
        La(b), b.attr({y: -9999}), b.placed = !1;
    };
    R.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
      var g = this.chart,
          h = b.align,
          i = b.verticalAlign,
          k,
          j,
          l = a.box ? 0 : a.padding || 0;
      k = c.x + l;
      if (k < 0)
        h === "right" ? b.align = "left" : b.x = -k, j = !0;
      k = c.x + d.width - l;
      if (k > g.plotWidth)
        h === "left" ? b.align = "right" : b.x = g.plotWidth - k, j = !0;
      k = c.y + l;
      if (k < 0)
        i === "bottom" ? b.verticalAlign = "top" : b.y = -k, j = !0;
      k = c.y + d.height - l;
      if (k > g.plotHeight)
        i === "top" ? b.verticalAlign = "bottom" : b.y = g.plotHeight - k, j = !0;
      if (j)
        a.placed = !f, a.align(b, null, e);
    };
    if (y.pie)
      y.pie.prototype.drawDataLabels = function() {
        var a = this,
            b = a.data,
            c,
            d = a.chart,
            e = a.options.dataLabels,
            f = o(e.connectorPadding, 10),
            g = o(e.connectorWidth, 1),
            h = d.plotWidth,
            i = d.plotHeight,
            k,
            j,
            l = o(e.softConnector, !0),
            m = e.distance,
            p = a.center,
            q = p[2] / 2,
            r = p[1],
            t = m > 0,
            v,
            s,
            w,
            z = [[], []],
            C,
            y,
            D,
            E,
            J,
            F = [0, 0, 0, 0],
            M = function(a, b) {
              return b.y - a.y;
            };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
          R.prototype.drawDataLabels.apply(a);
          n(b, function(a) {
            if (a.dataLabel && a.visible)
              z[a.half].push(a), a.dataLabel._pos = null;
          });
          for (E = 2; E--; ) {
            var G = [],
                N = [],
                H = z[E],
                L = H.length,
                K;
            if (L) {
              a.sortByAngle(H, E - 0.5);
              for (J = b = 0; !b && H[J]; )
                b = H[J] && H[J].dataLabel && (H[J].dataLabel.getBBox().height || 21), J++;
              if (m > 0) {
                s = I(r + q + m, d.plotHeight);
                for (J = u(0, r - q - m); J <= s; J += b)
                  G.push(J);
                s = G.length;
                if (L > s) {
                  c = [].concat(H);
                  c.sort(M);
                  for (J = L; J--; )
                    c[J].rank = J;
                  for (J = L; J--; )
                    H[J].rank >= s && H.splice(J, 1);
                  L = H.length;
                }
                for (J = 0; J < L; J++) {
                  c = H[J];
                  w = c.labelPos;
                  c = 9999;
                  var Q,
                      O;
                  for (O = 0; O < s; O++)
                    Q = S(G[O] - w[1]), Q < c && (c = Q, K = O);
                  if (K < J && G[J] !== null)
                    K = J;
                  else
                    for (s < L - J + K && G[J] !== null && (K = s - L + J); G[K] === null; )
                      K++;
                  N.push({
                    i: K,
                    y: G[K]
                  });
                  G[K] = null;
                }
                N.sort(M);
              }
              for (J = 0; J < L; J++) {
                c = H[J];
                w = c.labelPos;
                v = c.dataLabel;
                D = c.visible === !1 ? "hidden" : "inherit";
                c = w[1];
                if (m > 0) {
                  if (s = N.pop(), K = s.i, y = s.y, c > y && G[K + 1] !== null || c < y && G[K - 1] !== null)
                    y = I(u(0, c), d.plotHeight);
                } else
                  y = c;
                C = e.justify ? p[0] + (E ? -1 : 1) * (q + m) : a.getX(y === r - q - m || y === r + q + m ? c : y, E);
                v._attr = {
                  visibility: D,
                  align: w[6]
                };
                v._pos = {
                  x: C + e.x + ({
                    left: f,
                    right: -f
                  }[w[6]] || 0),
                  y: y + e.y - 10
                };
                v.connX = C;
                v.connY = y;
                if (this.options.size === null)
                  s = v.width, C - s < f ? F[3] = u(x(s - C + f), F[3]) : C + s > h - f && (F[1] = u(x(C + s - h + f), F[1])), y - b / 2 < 0 ? F[0] = u(x(-y + b / 2), F[0]) : y + b / 2 > i && (F[2] = u(x(y + b / 2 - i), F[2]));
              }
            }
          }
          if (Ia(F) === 0 || this.verifyDataLabelOverflow(F))
            this.placeDataLabels(), t && g && n(this.points, function(b) {
              k = b.connector;
              w = b.labelPos;
              if ((v = b.dataLabel) && v._pos && b.visible)
                D = v._attr.visibility, C = v.connX, y = v.connY, j = l ? ["M", C + (w[6] === "left" ? 5 : -5), y, "C", C, y, 2 * w[2] - w[4], 2 * w[3] - w[5], w[2], w[3], "L", w[4], w[5]] : ["M", C + (w[6] === "left" ? 5 : -5), y, "L", w[2], w[3], "L", w[4], w[5]], k ? (k.animate({d: j}), k.attr("visibility", D)) : b.connector = k = a.chart.renderer.path(j).attr({
                  "stroke-width": g,
                  stroke: e.connectorColor || b.color || "#606060",
                  visibility: D
                }).add(a.dataLabelsGroup);
              else if (k)
                b.connector = k.destroy();
            });
        }
      }, y.pie.prototype.placeDataLabels = function() {
        n(this.points, function(a) {
          var b = a.dataLabel;
          if (b && a.visible)
            (a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999});
        });
      }, y.pie.prototype.alignDataLabel = W, y.pie.prototype.verifyDataLabelOverflow = function(a) {
        var b = this.center,
            c = this.options,
            d = c.center,
            e = c.minSize || 80,
            f = e,
            g;
        d[0] !== null ? f = u(b[2] - u(a[1], a[3]), e) : (f = u(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2);
        d[1] !== null ? f = u(I(f, b[2] - u(a[0], a[2])), e) : (f = u(I(f, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2);
        f < b[2] ? (b[2] = f, b[3] = Math.min(/%$/.test(c.innerSize || 0) ? f * parseFloat(c.innerSize || 0) / 100 : parseFloat(c.innerSize || 0), f), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : g = !0;
        return g;
      };
    if (y.column)
      y.column.prototype.alignDataLabel = function(a, b, c, d, e) {
        var f = this.chart.inverted,
            g = a.series,
            h = a.dlBox || a.shapeArgs,
            i = o(a.below, a.plotY > o(this.translatedThreshold, g.yAxis.len)),
            k = o(c.inside, !!this.options.stacking);
        if (h) {
          d = C(h);
          if (d.y < 0)
            d.height += d.y, d.y = 0;
          h = d.y + d.height - g.yAxis.len;
          h > 0 && (d.height -= h);
          f && (d = {
            x: g.yAxis.len - d.y - d.height,
            y: g.xAxis.len - d.x - d.width,
            width: d.height,
            height: d.width
          });
          if (!k)
            f ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0);
        }
        c.align = o(c.align, !f || k ? "center" : i ? "right" : "left");
        c.verticalAlign = o(c.verticalAlign, f || k ? "middle" : i ? "top" : "bottom");
        R.prototype.alignDataLabel.call(this, a, b, c, d, e);
      };
    (function(a) {
      var b = a.Chart,
          c = a.each,
          d = a.pick,
          e = a.addEvent;
      b.prototype.callbacks.push(function(a) {
        function b() {
          var e = [];
          c(a.series, function(a) {
            var b = a.options.dataLabels,
                f = a.dataLabelCollections || ["dataLabel"];
            (b.enabled || a._hasPointLabels) && !b.allowOverlap && a.visible && c(f, function(b) {
              c(a.points, function(a) {
                if (a[b])
                  a[b].labelrank = d(a.labelrank, a.shapeArgs && a.shapeArgs.height), e.push(a[b]);
              });
            });
          });
          a.hideOverlappingLabels(e);
        }
        b();
        e(a, "redraw", b);
      });
      b.prototype.hideOverlappingLabels = function(a) {
        var b = a.length,
            d,
            e,
            k,
            j,
            l,
            m,
            n,
            o,
            r;
        for (e = 0; e < b; e++)
          if (d = a[e])
            d.oldOpacity = d.opacity, d.newOpacity = 1;
        a.sort(function(a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });
        for (e = 0; e < b; e++) {
          k = a[e];
          for (d = e + 1; d < b; ++d)
            if (j = a[d], k && j && k.placed && j.placed && k.newOpacity !== 0 && j.newOpacity !== 0 && (l = k.alignAttr, m = j.alignAttr, n = k.parentGroup, o = j.parentGroup, r = 2 * (k.box ? 0 : k.padding), l = !(m.x + o.translateX > l.x + n.translateX + (k.width - r) || m.x + o.translateX + (j.width - r) < l.x + n.translateX || m.y + o.translateY > l.y + n.translateY + (k.height - r) || m.y + o.translateY + (j.height - r) < l.y + n.translateY)))
              (k.labelrank < j.labelrank ? k : j).newOpacity = 0;
        }
        c(a, function(a) {
          var b,
              c;
          if (a) {
            c = a.newOpacity;
            if (a.oldOpacity !== c && a.placed)
              c ? a.show(!0) : b = function() {
                a.hide();
              }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b);
            a.isOld = !0;
          }
        });
      };
    })(s);
    ga(X.prototype, "getSeriesExtremes", function(a) {
      var b = this.isXAxis,
          c,
          d,
          e = [],
          f;
      b && n(this.series, function(a, b) {
        if (a.useMapGeometry)
          e[b] = a.xData, a.xData = [];
      });
      a.call(this);
      if (b && (c = o(this.dataMin, Number.MAX_VALUE), d = o(this.dataMax, -Number.MAX_VALUE), n(this.series, function(a, b) {
        if (a.useMapGeometry)
          c = Math.min(c, o(a.minX, c)), d = Math.max(d, o(a.maxX, c)), a.xData = e[b], f = !0;
      }), f))
        this.dataMin = c, this.dataMax = d;
    });
    ga(X.prototype, "setAxisTranslation", function(a) {
      var b = this.chart,
          c = b.plotWidth / b.plotHeight,
          b = b.xAxis[0],
          d;
      a.call(this);
      this.coll === "yAxis" && b.transA !== w && n(this.series, function(a) {
        a.preserveAspectRatio && (d = !0);
      });
      if (d && (this.transA = b.transA = Math.min(this.transA, b.transA), a = c / ((b.max - b.min) / (this.max - this.min)), a = a < 1 ? this : b, c = (a.max - a.min) * a.transA, a.pixelPadding = a.len - c, a.minPixelPadding = a.pixelPadding / 2, c = a.fixTo)) {
        c = c[1] - a.toValue(c[0], !0);
        c *= a.transA;
        if (Math.abs(c) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax)
          c = 0;
        a.minPixelPadding -= c;
      }
    });
    ga(X.prototype, "render", function(a) {
      a.call(this);
      this.fixTo = null;
    });
    var bb = s.ColorAxis = function() {
      this.isColorAxis = !0;
      this.init.apply(this, arguments);
    };
    r(bb.prototype, X.prototype);
    r(bb.prototype, {
      defaultColorAxisOptions: {
        lineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        gridLineWidth: 1,
        tickPixelInterval: 72,
        startOnTick: !0,
        endOnTick: !0,
        offset: 0,
        marker: {
          animation: {duration: 50},
          color: "gray",
          width: 0.01
        },
        labels: {overflow: "justify"},
        minColor: "#EFEFFF",
        maxColor: "#003875",
        tickLength: 5
      },
      init: function(a, b) {
        var c = a.options.legend.layout !== "vertical",
            d;
        d = C(this.defaultColorAxisOptions, {
          side: c ? 2 : 1,
          reversed: !c
        }, b, {
          opposite: !c,
          showEmpty: !1,
          title: null,
          isColor: !0
        });
        X.prototype.init.call(this, a, d);
        b.dataClasses && this.initDataClasses(b);
        this.initStops(b);
        this.horiz = c;
        this.zoomEnabled = !1;
      },
      tweenColors: function(a, b, c) {
        var d;
        !b.rgba.length || !a.rgba.length ? a = b.input || "none" : (a = a.rgba, b = b.rgba, d = b[3] !== 1 || a[3] !== 1, a = (d ? "rgba(" : "rgb(") + Math.round(b[0] + (a[0] - b[0]) * (1 - c)) + "," + Math.round(b[1] + (a[1] - b[1]) * (1 - c)) + "," + Math.round(b[2] + (a[2] - b[2]) * (1 - c)) + (d ? "," + (b[3] + (a[3] - b[3]) * (1 - c)) : "") + ")");
        return a;
      },
      initDataClasses: function(a) {
        var b = this,
            c = this.chart,
            d,
            e = 0,
            f = this.options,
            g = a.dataClasses.length;
        this.dataClasses = d = [];
        this.legendItems = [];
        n(a.dataClasses, function(a, i) {
          var k,
              a = C(a);
          d.push(a);
          if (!a.color)
            f.dataClassColor === "category" ? (k = c.options.colors, a.color = k[e++], e === k.length && (e = 0)) : a.color = b.tweenColors(T(f.minColor), T(f.maxColor), g < 2 ? 0.5 : i / (g - 1));
        });
      },
      initStops: function(a) {
        this.stops = a.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
        n(this.stops, function(a) {
          a.color = T(a[1]);
        });
      },
      setOptions: function(a) {
        X.prototype.setOptions.call(this, a);
        this.options.crosshair = this.options.marker;
        this.coll = "colorAxis";
      },
      setAxisSize: function() {
        var a = this.legendSymbol,
            b = this.chart,
            c,
            d,
            e;
        if (a)
          this.left = c = a.attr("x"), this.top = d = a.attr("y"), this.width = e = a.attr("width"), this.height = a = a.attr("height"), this.right = b.chartWidth - c - e, this.bottom = b.chartHeight - d - a, this.len = this.horiz ? e : a, this.pos = this.horiz ? c : d;
      },
      toColor: function(a, b) {
        var c,
            d = this.stops,
            e,
            f = this.dataClasses,
            g,
            h;
        if (f)
          for (h = f.length; h--; ) {
            if (g = f[h], e = g.from, d = g.to, (e === w || a >= e) && (d === w || a <= d)) {
              c = g.color;
              if (b)
                b.dataClass = h;
              break;
            }
          }
        else {
          this.isLog && (a = this.val2lin(a));
          c = 1 - (this.max - a) / (this.max - this.min || 1);
          for (h = d.length; h--; )
            if (c > d[h][0])
              break;
          e = d[h] || d[h + 1];
          d = d[h + 1] || e;
          c = 1 - (d[0] - c) / (d[0] - e[0] || 1);
          c = this.tweenColors(e.color, d.color, c);
        }
        return c;
      },
      getOffset: function() {
        var a = this.legendGroup,
            b = this.chart.axisOffset[this.side];
        if (a) {
          this.axisParent = a;
          X.prototype.getOffset.call(this);
          if (!this.added)
            this.added = !0, this.labelLeft = 0, this.labelRight = this.width;
          this.chart.axisOffset[this.side] = b;
        }
      },
      setLegendColor: function() {
        var a,
            b = this.options,
            c = this.reversed;
        a = c ? 1 : 0;
        c = c ? 0 : 1;
        a = this.horiz ? [a, 0, c, 0] : [0, c, 0, a];
        this.legendColor = {
          linearGradient: {
            x1: a[0],
            y1: a[1],
            x2: a[2],
            y2: a[3]
          },
          stops: b.stops || [[0, b.minColor], [1, b.maxColor]]
        };
      },
      drawLegendSymbol: function(a, b) {
        var c = a.padding,
            d = a.options,
            e = this.horiz,
            f = o(d.symbolWidth, e ? 200 : 12),
            g = o(d.symbolHeight, e ? 12 : 200),
            h = o(d.labelPadding, e ? 16 : 30),
            d = o(d.itemDistance, 10);
        this.setLegendColor();
        b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({zIndex: 1}).add(b.legendGroup);
        this.legendItemWidth = f + c + (e ? d : h);
        this.legendItemHeight = g + c + (e ? h : 0);
      },
      setState: W,
      visible: !0,
      setVisible: W,
      getSeriesExtremes: function() {
        var a;
        if (this.series.length)
          a = this.series[0], this.dataMin = a.valueMin, this.dataMax = a.valueMax;
      },
      drawCrosshair: function(a, b) {
        var c = b && b.plotX,
            d = b && b.plotY,
            e,
            f = this.pos,
            g = this.len;
        if (b)
          e = this.toPixels(b[b.series.colorKey]), e < f ? e = f - 2 : e > f + g && (e = f + g + 2), b.plotX = e, b.plotY = this.len - e, X.prototype.drawCrosshair.call(this, a, b), b.plotX = c, b.plotY = d, this.cross && this.cross.attr({fill: this.crosshair.color}).add(this.legendGroup);
      },
      getPlotLinePath: function(a, b, c, d, e) {
        return F(e) ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L", this.left - 6, e + 6, this.left - 6, e - 6, "Z"] : X.prototype.getPlotLinePath.call(this, a, b, c, d);
      },
      update: function(a, b) {
        var c = this.chart,
            d = c.legend;
        n(this.series, function(a) {
          a.isDirtyData = !0;
        });
        if (a.dataClasses && d.allItems)
          n(d.allItems, function(a) {
            a.isDataClass && a.legendGroup.destroy();
          }), c.isDirtyLegend = !0;
        c.options[this.coll] = C(this.userOptions, a);
        X.prototype.update.call(this, a, b);
        this.legendItem && (this.setLegendColor(), d.colorizeItem(this, !0));
      },
      getDataClassLegendSymbols: function() {
        var a = this,
            b = this.chart,
            c = this.legendItems,
            d = b.options.legend,
            e = d.valueDecimals,
            f = d.valueSuffix || "",
            g;
        c.length || n(this.dataClasses, function(d, i) {
          var k = !0,
              j = d.from,
              l = d.to;
          g = "";
          j === w ? g = "< " : l === w && (g = "> ");
          j !== w && (g += s.numberFormat(j, e) + f);
          j !== w && l !== w && (g += " - ");
          l !== w && (g += s.numberFormat(l, e) + f);
          c.push(r({
            chart: b,
            name: g,
            options: {},
            drawLegendSymbol: ab.drawRectangle,
            visible: !0,
            setState: W,
            isDataClass: !0,
            setVisible: function() {
              k = this.visible = !k;
              n(a.series, function(a) {
                n(a.points, function(a) {
                  a.dataClass === i && a.setVisible(k);
                });
              });
              b.legend.colorizeItem(this, k);
            }
          }, d));
        });
        return c;
      },
      name: ""
    });
    n(["fill", "stroke"], function(a) {
      s.Fx.prototype[a + "Setter"] = function() {
        this.elem.attr(a, bb.prototype.tweenColors(T(this.start), T(this.end), this.pos));
      };
    });
    ga(ja.prototype, "getAxes", function(a) {
      var b = this.options.colorAxis;
      a.call(this);
      this.colorAxis = [];
      b && new bb(this, b);
    });
    ga($a.prototype, "getAllItems", function(a) {
      var b = [],
          c = this.chart.colorAxis[0];
      c && (c.options.dataClasses ? b = b.concat(c.getDataClassLegendSymbols()) : b.push(c), n(c.series, function(a) {
        a.options.showInLegend = !1;
      }));
      return b.concat(a.call(this));
    });
    var Ma = {setVisible: function(a) {
        var b = this,
            c = a ? "show" : "hide";
        n(["graphic", "dataLabel"], function(a) {
          if (b[a])
            b[a][c]();
        });
      }},
        Kb = {
          pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color",
            dashstyle: "dashStyle"
          },
          pointArrayMap: ["value"],
          axisTypes: ["xAxis", "yAxis", "colorAxis"],
          optionalAxis: "colorAxis",
          trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
          getSymbol: W,
          parallelArrays: ["x", "y", "value"],
          colorKey: "value",
          translateColors: function() {
            var a = this,
                b = this.options.nullColor,
                c = this.colorAxis,
                d = this.colorKey;
            n(this.data, function(e) {
              var f = e[d];
              if (f = e.options.color || (f === null ? b : c && f !== void 0 ? c.toColor(f, e) : e.color || a.color))
                e.color = f;
            });
          }
        },
        jb = z.documentElement.style.vectorEffect !== void 0;
    Z.map = C(Z.scatter, {
      allAreas: !0,
      animation: !1,
      nullColor: "#F8F8F8",
      borderColor: "silver",
      borderWidth: 1,
      marker: null,
      stickyTracking: !1,
      dataLabels: {
        formatter: function() {
          return this.point.value;
        },
        inside: !0,
        verticalAlign: "middle",
        crop: !1,
        overflow: !1,
        padding: 0
      },
      turboThreshold: 0,
      tooltip: {
        followPointer: !0,
        pointFormat: "{point.name}: {point.value}<br/>"
      },
      states: {
        normal: {animation: !0},
        hover: {
          brightness: 0.2,
          halo: null
        }
      }
    });
    var Lb = ba($, r({
      applyOptions: function(a, b) {
        var c = $.prototype.applyOptions.call(this, a, b),
            d = this.series,
            e = d.joinBy;
        if (d.mapData)
          if (e = c[e[1]] !== void 0 && d.mapMap[c[e[1]]]) {
            if (d.xyFromShape)
              c.x = e._midX, c.y = e._midY;
            r(c, e);
          } else
            c.value = c.value || null;
        return c;
      },
      onMouseOver: function(a) {
        clearTimeout(this.colorInterval);
        if (this.value !== null)
          $.prototype.onMouseOver.call(this, a);
        else
          this.series.onMouseOut(a);
      },
      onMouseOut: function() {
        var a = this,
            b = +new sa,
            c = T(a.color),
            d = T(a.pointAttr.hover.fill),
            e = Ra(a.series.options.states.normal.animation).duration,
            f;
        if (e && c.rgba.length === 4 && d.rgba.length === 4 && a.state !== "select")
          f = a.pointAttr[""].fill, delete a.pointAttr[""].fill, clearTimeout(a.colorInterval), a.colorInterval = setInterval(function() {
            var f = (new sa - b) / e,
                h = a.graphic;
            f > 1 && (f = 1);
            h && h.attr("fill", bb.prototype.tweenColors.call(0, d, c, f));
            f >= 1 && clearTimeout(a.colorInterval);
          }, 13);
        $.prototype.onMouseOut.call(a);
        if (f)
          a.pointAttr[""].fill = f;
      },
      zoomTo: function() {
        var a = this.series;
        a.xAxis.setExtremes(this._minX, this._maxX, !1);
        a.yAxis.setExtremes(this._minY, this._maxY, !1);
        a.chart.redraw();
      }
    }, Ma));
    y.map = ba(y.scatter, C(Kb, {
      type: "map",
      pointClass: Lb,
      supportsDrilldown: !0,
      getExtremesFromAll: !0,
      useMapGeometry: !0,
      forceDL: !0,
      searchPoint: W,
      directTouch: !0,
      preserveAspectRatio: !0,
      getBox: function(a) {
        var b = Number.MAX_VALUE,
            c = -b,
            d = b,
            e = -b,
            f = b,
            g = b,
            h = this.xAxis,
            i = this.yAxis,
            k;
        n(a || [], function(a) {
          if (a.path) {
            if (typeof a.path === "string")
              a.path = s.splitPath(a.path);
            var h = a.path || [],
                i = h.length,
                n = !1,
                q = -b,
                r = b,
                t = -b,
                v = b,
                u = a.properties;
            if (!a._foundBox) {
              for (; i--; )
                F(h[i]) && (n ? (q = Math.max(q, h[i]), r = Math.min(r, h[i])) : (t = Math.max(t, h[i]), v = Math.min(v, h[i])), n = !n);
              a._midX = r + (q - r) * (a.middleX || u && u["hc-middle-x"] || 0.5);
              a._midY = v + (t - v) * (a.middleY || u && u["hc-middle-y"] || 0.5);
              a._maxX = q;
              a._minX = r;
              a._maxY = t;
              a._minY = v;
              a.labelrank = o(a.labelrank, (q - r) * (t - v));
              a._foundBox = !0;
            }
            c = Math.max(c, a._maxX);
            d = Math.min(d, a._minX);
            e = Math.max(e, a._maxY);
            f = Math.min(f, a._minY);
            g = Math.min(a._maxX - a._minX, a._maxY - a._minY, g);
            k = !0;
          }
        });
        if (k) {
          this.minY = Math.min(f, o(this.minY, b));
          this.maxY = Math.max(e, o(this.maxY, -b));
          this.minX = Math.min(d, o(this.minX, b));
          this.maxX = Math.max(c, o(this.maxX, -b));
          if (h && h.options.minRange === void 0)
            h.minRange = Math.min(5 * g, (this.maxX - this.minX) / 5, h.minRange || b);
          if (i && i.options.minRange === void 0)
            i.minRange = Math.min(5 * g, (this.maxY - this.minY) / 5, i.minRange || b);
        }
      },
      getExtremes: function() {
        R.prototype.getExtremes.call(this, this.valueData);
        this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
        this.valueMin = this.dataMin;
        this.valueMax = this.dataMax;
        this.dataMin = this.minY;
        this.dataMax = this.maxY;
      },
      translatePath: function(a) {
        var b = !1,
            c = this.xAxis,
            d = this.yAxis,
            e = c.min,
            f = c.transA,
            c = c.minPixelPadding,
            g = d.min,
            h = d.transA,
            d = d.minPixelPadding,
            i,
            k = [];
        if (a)
          for (i = a.length; i--; )
            F(a[i]) ? (k[i] = b ? (a[i] - e) * f + c : (a[i] - g) * h + d, b = !b) : k[i] = a[i];
        return k;
      },
      setData: function(a, b, c, d) {
        var e = this.options,
            f = e.mapData,
            g = e.joinBy,
            h = g === null,
            i = [],
            k = {},
            j,
            l,
            m;
        h && (g = "_i");
        g = this.joinBy = s.splat(g);
        g[1] || (g[1] = g[0]);
        a && n(a, function(b, c) {
          F(b) && (a[c] = {value: b});
          if (h)
            a[c]._i = c;
        });
        this.getBox(a);
        if (f) {
          if (f.type === "FeatureCollection") {
            if (f["hc-transform"])
              for (j in this.chart.mapTransforms = l = f["hc-transform"], l)
                if (l.hasOwnProperty(j) && j.rotation)
                  j.cosAngle = Math.cos(j.rotation), j.sinAngle = Math.sin(j.rotation);
            f = s.geojson(f, this.type, this);
          }
          this.mapData = f;
          for (m = 0; m < f.length; m++)
            j = f[m], l = j.properties, j._i = m, g[0] && l && l[g[0]] && (j[g[0]] = l[g[0]]), k[j[g[0]]] = j;
          this.mapMap = k;
          a && g[1] && n(a, function(a) {
            k[a[g[1]]] && i.push(k[a[g[1]]]);
          });
          e.allAreas ? (this.getBox(f), a = a || [], i = "|" + Aa(i, function(a) {
            return a[g[0]];
          }).join("|") + "|", n(f, function(b) {
            if (!g[0] || i.indexOf("|" + b[g[0]] + "|") === -1)
              a.push(C(b, {value: null})), d = !1;
          })) : this.getBox(i);
        }
        R.prototype.setData.call(this, a, b, c, d);
      },
      drawGraph: W,
      drawDataLabels: W,
      doFullTranslate: function() {
        return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans;
      },
      translate: function() {
        var a = this,
            b = a.xAxis,
            c = a.yAxis,
            d = a.doFullTranslate();
        a.generatePoints();
        n(a.data, function(e) {
          e.plotX = b.toPixels(e._midX, !0);
          e.plotY = c.toPixels(e._midY, !0);
          if (d)
            e.shapeType = "path", e.shapeArgs = {d: a.translatePath(e.path)}, jb && (e.shapeArgs["vector-effect"] = "non-scaling-stroke");
        });
        a.translateColors();
      },
      drawPoints: function() {
        var a = this,
            b = a.xAxis,
            c = a.yAxis,
            d = a.group,
            e = a.chart,
            f = e.renderer,
            g,
            h = this.baseTrans;
        if (!a.transformGroup)
          a.transformGroup = f.g().attr({
            scaleX: 1,
            scaleY: 1
          }).add(d), a.transformGroup.survive = !0;
        a.doFullTranslate() ? (e.hasRendered && a.pointAttrToOptions.fill === "color" && n(a.points, function(a) {
          if (a.shapeArgs)
            a.shapeArgs.fill = a.pointAttr[o(a.state, "")].fill;
        }), jb || n(a.points, function(b) {
          b = b.pointAttr[""];
          b["stroke-width"] === a.pointAttr[""]["stroke-width"] && (b["stroke-width"] = "inherit");
        }), a.group = a.transformGroup, y.column.prototype.drawPoints.apply(a), a.group = d, n(a.points, function(a) {
          a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(" ", "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()), jb || (a.graphic["stroke-widthSetter"] = W));
        }), this.baseTrans = {
          originX: b.min - b.minPixelPadding / b.transA,
          originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA),
          transAX: b.transA,
          transAY: c.transA
        }, this.transformGroup.animate({
          translateX: 0,
          translateY: 0,
          scaleX: 1,
          scaleY: 1
        })) : (g = b.transA / h.transAX, d = c.transA / h.transAY, b = b.toPixels(h.originX, !0), c = c.toPixels(h.originY, !0), g > 0.99 && g < 1.01 && d > 0.99 && d < 1.01 && (d = g = 1, b = Math.round(b), c = Math.round(c)), this.transformGroup.animate({
          translateX: b,
          translateY: c,
          scaleX: g,
          scaleY: d
        }));
        jb || a.group.element.setAttribute("stroke-width", a.options.borderWidth / (g || 1));
        this.drawMapDataLabels();
      },
      drawMapDataLabels: function() {
        R.prototype.drawDataLabels.call(this);
        this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect);
      },
      render: function() {
        var a = this,
            b = R.prototype.render;
        a.chart.renderer.isVML && a.data.length > 3E3 ? setTimeout(function() {
          b.call(a);
        }) : b.call(a);
      },
      animate: function(a) {
        var b = this.options.animation,
            c = this.group,
            d = this.xAxis,
            e = this.yAxis,
            f = d.pos,
            g = e.pos;
        if (this.chart.renderer.isSVG)
          b === !0 && (b = {duration: 1E3}), a ? c.attr({
            translateX: f + d.len / 2,
            translateY: g + e.len / 2,
            scaleX: 0.001,
            scaleY: 0.001
          }) : (c.animate({
            translateX: f,
            translateY: g,
            scaleX: 1,
            scaleY: 1
          }, b), this.animate = null);
      },
      animateDrilldown: function(a) {
        var b = this.chart.plotBox,
            c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
            d = c.bBox,
            e = this.chart.options.drilldown.animation;
        if (!a)
          a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
            scaleX: a,
            scaleY: a,
            translateX: d.x,
            translateY: d.y
          }, n(this.points, function(a) {
            a.graphic && a.graphic.attr(c.shapeArgs).animate({
              scaleX: 1,
              scaleY: 1,
              translateX: 0,
              translateY: 0
            }, e);
          }), this.animate = null;
      },
      drawLegendSymbol: ab.drawRectangle,
      animateDrillupFrom: function(a) {
        y.column.prototype.animateDrillupFrom.call(this, a);
      },
      animateDrillupTo: function(a) {
        y.column.prototype.animateDrillupTo.call(this, a);
      }
    }));
    (function(a) {
      var b = a.Chart,
          c = a.each,
          d = a.pick,
          e = a.addEvent;
      b.prototype.callbacks.push(function(a) {
        function b() {
          var e = [];
          c(a.series, function(a) {
            var b = a.options.dataLabels,
                f = a.dataLabelCollections || ["dataLabel"];
            (b.enabled || a._hasPointLabels) && !b.allowOverlap && a.visible && c(f, function(b) {
              c(a.points, function(a) {
                if (a[b])
                  a[b].labelrank = d(a.labelrank, a.shapeArgs && a.shapeArgs.height), e.push(a[b]);
              });
            });
          });
          a.hideOverlappingLabels(e);
        }
        b();
        e(a, "redraw", b);
      });
      b.prototype.hideOverlappingLabels = function(a) {
        var b = a.length,
            d,
            e,
            k,
            j,
            l,
            m,
            n,
            o,
            r;
        for (e = 0; e < b; e++)
          if (d = a[e])
            d.oldOpacity = d.opacity, d.newOpacity = 1;
        a.sort(function(a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });
        for (e = 0; e < b; e++) {
          k = a[e];
          for (d = e + 1; d < b; ++d)
            if (j = a[d], k && j && k.placed && j.placed && k.newOpacity !== 0 && j.newOpacity !== 0 && (l = k.alignAttr, m = j.alignAttr, n = k.parentGroup, o = j.parentGroup, r = 2 * (k.box ? 0 : k.padding), l = !(m.x + o.translateX > l.x + n.translateX + (k.width - r) || m.x + o.translateX + (j.width - r) < l.x + n.translateX || m.y + o.translateY > l.y + n.translateY + (k.height - r) || m.y + o.translateY + (j.height - r) < l.y + n.translateY)))
              (k.labelrank < j.labelrank ? k : j).newOpacity = 0;
        }
        c(a, function(a) {
          var b,
              c;
          if (a) {
            c = a.newOpacity;
            if (a.oldOpacity !== c && a.placed)
              c ? a.show(!0) : b = function() {
                a.hide();
              }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b);
            a.isOld = !0;
          }
        });
      };
    })(s);
    r(ja.prototype, {
      renderMapNavigation: function() {
        var a = this,
            b = this.options.mapNavigation,
            c = b.buttons,
            d,
            e,
            f,
            g,
            h = function(a) {
              if (a)
                a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
            },
            i = function(b) {
              this.handler.call(a, b);
              h(b);
            };
        if (o(b.enableButtons, b.enabled) && !a.renderer.forExport)
          for (d in a.mapNavButtons = [], c)
            if (c.hasOwnProperty(d))
              f = C(b.buttonOptions, c[d]), e = f.theme, e.style = C(f.theme.style, f.style), g = e.states, e = a.renderer.button(f.text, 0, 0, i, e, g && g.hover, g && g.select, 0, d === "zoomIn" ? "topbutton" : "bottombutton").attr({
                width: f.width,
                height: f.height,
                title: a.options.lang[d],
                zIndex: 5
              }).add(), e.handler = f.onclick, e.align(r(f, {
                width: e.width,
                height: 2 * e.height
              }), null, f.alignTo), N(e.element, "dblclick", h), a.mapNavButtons.push(e);
      },
      fitToBox: function(a, b) {
        n([["x", "width"], ["y", "height"]], function(c) {
          var d = c[0],
              c = c[1];
          a[d] + a[c] > b[d] + b[c] && (a[c] > b[c] ? (a[c] = b[c], a[d] = b[d]) : a[d] = b[d] + b[c] - a[c]);
          a[c] > b[c] && (a[c] = b[c]);
          a[d] < b[d] && (a[d] = b[d]);
        });
        return a;
      },
      mapZoom: function(a, b, c, d, e) {
        var f = this.xAxis[0],
            g = f.max - f.min,
            h = o(b, f.min + g / 2),
            i = g * a,
            g = this.yAxis[0],
            k = g.max - g.min,
            j = o(c, g.min + k / 2);
        k *= a;
        h = this.fitToBox({
          x: h - i * (d ? (d - f.pos) / f.len : 0.5),
          y: j - k * (e ? (e - g.pos) / g.len : 0.5),
          width: i,
          height: k
        }, {
          x: f.dataMin,
          y: g.dataMin,
          width: f.dataMax - f.dataMin,
          height: g.dataMax - g.dataMin
        });
        if (d)
          f.fixTo = [d - f.pos, b];
        if (e)
          g.fixTo = [e - g.pos, c];
        a !== void 0 ? (f.setExtremes(h.x, h.x + h.width, !1), g.setExtremes(h.y, h.y + h.height, !1)) : (f.setExtremes(void 0, void 0, !1), g.setExtremes(void 0, void 0, !1));
        this.redraw();
      }
    });
    ga(ja.prototype, "render", function(a) {
      var b = this,
          c = b.options.mapNavigation;
      b.renderMapNavigation();
      a.call(b);
      (o(c.enableDoubleClickZoom, c.enabled) || c.enableDoubleClickZoomTo) && N(b.container, "dblclick", function(a) {
        b.pointer.onContainerDblClick(a);
      });
      o(c.enableMouseWheelZoom, c.enabled) && N(b.container, z.onmousewheel === void 0 ? "DOMMouseScroll" : "mousewheel", function(a) {
        b.pointer.onContainerMouseWheel(a);
        return !1;
      });
    });
    r(Ba.prototype, {
      onContainerDblClick: function(a) {
        var b = this.chart,
            a = this.normalize(a);
        b.options.mapNavigation.enableDoubleClickZoomTo ? b.pointer.inClass(a.target, "highcharts-tracker") && b.hoverPoint && b.hoverPoint.zoomTo() : b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && b.mapZoom(0.5, b.xAxis[0].toValue(a.chartX), b.yAxis[0].toValue(a.chartY), a.chartX, a.chartY);
      },
      onContainerMouseWheel: function(a) {
        var b = this.chart,
            c,
            a = this.normalize(a);
        c = a.detail || -(a.wheelDelta / 120);
        b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && b.mapZoom(Math.pow(b.options.mapNavigation.mouseWheelSensitivity, c), b.xAxis[0].toValue(a.chartX), b.yAxis[0].toValue(a.chartY), a.chartX, a.chartY);
      }
    });
    ga(Ba.prototype, "init", function(a, b, c) {
      a.call(this, b, c);
      if (o(c.mapNavigation.enableTouchZoom, c.mapNavigation.enabled))
        this.pinchX = this.pinchHor = this.pinchY = this.pinchVert = this.hasZoom = !0;
    });
    ga(Ba.prototype, "pinchTranslate", function(a, b, c, d, e, f, g) {
      a.call(this, b, c, d, e, f, g);
      this.chart.options.chart.type === "map" && this.hasZoom && (a = d.scaleX > d.scaleY, this.pinchTranslateDirection(!a, b, c, d, e, f, g, a ? d.scaleX : d.scaleY));
    });
    Z.mapline = C(Z.map, {
      lineWidth: 1,
      fillColor: "none"
    });
    y.mapline = ba(y.map, {
      type: "mapline",
      pointAttrToOptions: {
        stroke: "color",
        "stroke-width": "lineWidth",
        fill: "fillColor",
        dashstyle: "dashStyle"
      },
      drawLegendSymbol: y.line.prototype.drawLegendSymbol
    });
    Z.mappoint = C(Z.scatter, {dataLabels: {
        enabled: !0,
        formatter: function() {
          return this.point.name;
        },
        crop: !1,
        defer: !1,
        overflow: !1,
        style: {color: "#000000"}
      }});
    y.mappoint = ba(y.scatter, {
      type: "mappoint",
      forceDL: !0,
      pointClass: ba($, {applyOptions: function(a, b) {
          var c = $.prototype.applyOptions.call(this, a, b);
          a.lat !== void 0 && a.lon !== void 0 && (c = r(c, this.series.chart.fromLatLonToPoint(c)));
          return c;
        }})
    });
    Z.bubble = C(Z.scatter, {
      dataLabels: {
        formatter: function() {
          return this.point.z;
        },
        inside: !0,
        verticalAlign: "middle"
      },
      marker: {
        lineColor: null,
        lineWidth: 1
      },
      minSize: 8,
      maxSize: "20%",
      softThreshold: !1,
      states: {hover: {halo: {size: 5}}},
      tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
      turboThreshold: 0,
      zThreshold: 0,
      zoneAxis: "z"
    });
    var Qb = ba($, {
      haloPath: function() {
        return $.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size);
      },
      ttBelow: !1
    });
    y.bubble = ba(y.scatter, {
      type: "bubble",
      pointClass: Qb,
      pointArrayMap: ["y", "z"],
      parallelArrays: ["x", "y", "z"],
      trackerGroups: ["group", "dataLabelsGroup"],
      bubblePadding: !0,
      zoneAxis: "z",
      pointAttrToOptions: {
        stroke: "lineColor",
        "stroke-width": "lineWidth",
        fill: "fillColor"
      },
      applyOpacity: function(a) {
        var b = this.options.marker,
            c = o(b.fillOpacity, 0.5),
            a = a || b.fillColor || this.color;
        c !== 1 && (a = T(a).setOpacity(c).get("rgba"));
        return a;
      },
      convertAttribs: function() {
        var a = R.prototype.convertAttribs.apply(this, arguments);
        a.fill = this.applyOpacity(a.fill);
        return a;
      },
      getRadii: function(a, b, c, d) {
        var e,
            f,
            g,
            h = this.zData,
            i = [],
            k = this.options,
            j = k.sizeBy !== "width",
            l = k.zThreshold,
            m = b - a;
        for (f = 0, e = h.length; f < e; f++)
          g = h[f], k.sizeByAbsoluteValue && g !== null && (g = Math.abs(g - l), b = Math.max(b - l, Math.abs(a - l)), a = 0), g === null ? g = null : g < a ? g = c / 2 - 1 : (g = m > 0 ? (g - a) / m : 0.5, j && g >= 0 && (g = Math.sqrt(g)), g = H.ceil(c + g * (d - c)) / 2), i.push(g);
        this.radii = i;
      },
      animate: function(a) {
        var b = this.options.animation;
        if (!a)
          n(this.points, function(a) {
            var d = a.graphic,
                a = a.shapeArgs;
            d && a && (d.attr("r", 1), d.animate({r: a.r}, b));
          }), this.animate = null;
      },
      translate: function() {
        var a,
            b = this.data,
            c,
            d,
            e = this.radii;
        y.scatter.prototype.translate.call(this);
        for (a = b.length; a--; )
          c = b[a], d = e ? e[a] : 0, F(d) && d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = {
            x: c.plotX,
            y: c.plotY,
            r: d
          }, c.dlBox = {
            x: c.plotX - d,
            y: c.plotY - d,
            width: 2 * d,
            height: 2 * d
          }) : c.shapeArgs = c.plotY = c.dlBox = w;
      },
      drawLegendSymbol: function(a, b) {
        var c = this.chart.renderer,
            d = c.fontMetrics(a.itemStyle.fontSize).f / 2;
        b.legendSymbol = c.circle(d, a.baseline - d, d).attr({zIndex: 3}).add(b.legendGroup);
        b.legendSymbol.isMarker = !0;
      },
      drawPoints: y.column.prototype.drawPoints,
      alignDataLabel: y.column.prototype.alignDataLabel,
      buildKDTree: W,
      applyZones: W
    });
    X.prototype.beforePadding = function() {
      var a = this,
          b = this.len,
          c = this.chart,
          d = 0,
          e = b,
          f = this.isXAxis,
          g = f ? "xData" : "yData",
          h = this.min,
          i = {},
          k = H.min(c.plotWidth, c.plotHeight),
          j = Number.MAX_VALUE,
          l = -Number.MAX_VALUE,
          m = this.max - h,
          p = b / m,
          q = [];
      n(this.series, function(b) {
        var d = b.options;
        if (b.bubblePadding && (b.visible || !c.options.chart.ignoreHiddenSeries))
          if (a.allowZoomOutside = !0, q.push(b), f)
            n(["minSize", "maxSize"], function(a) {
              var b = d[a],
                  c = /%$/.test(b),
                  b = E(b);
              i[a] = c ? k * b / 100 : b;
            }), b.minPxSize = i.minSize, b.maxPxSize = i.maxSize, b = b.zData, b.length && (j = o(d.zMin, H.min(j, H.max(Pa(b), d.displayNegative === !1 ? d.zThreshold : -Number.MAX_VALUE))), l = o(d.zMax, H.max(l, Ia(b))));
      });
      n(q, function(b) {
        var c = b[g],
            i = c.length,
            k;
        f && b.getRadii(j, l, b.minPxSize, b.maxPxSize);
        if (m > 0)
          for (; i--; )
            F(c[i]) && a.dataMin <= c[i] && c[i] <= a.dataMax && (k = b.radii[i], d = Math.min((c[i] - h) * p - k, d), e = Math.max((c[i] - h) * p + k, e));
      });
      q.length && m > 0 && !this.isLog && (e -= b, p *= (b + d - e) / b, n([["min", "userMin", d], ["max", "userMax", e]], function(b) {
        o(a.options[b[0]], a[b[1]]) === w && (a[b[0]] += b[2] / p);
      }));
    };
    if (y.bubble)
      Z.mapbubble = C(Z.bubble, {
        animationLimit: 500,
        tooltip: {pointFormat: "{point.name}: {point.z}"}
      }), y.mapbubble = ba(y.bubble, {
        pointClass: ba($, {
          applyOptions: function(a, b) {
            var c;
            a && a.lat !== void 0 && a.lon !== void 0 ? (c = $.prototype.applyOptions.call(this, a, b), c = r(c, this.series.chart.fromLatLonToPoint(c))) : c = Lb.prototype.applyOptions.call(this, a, b);
            return c;
          },
          ttBelow: !1
        }),
        xyFromShape: !0,
        type: "mapbubble",
        pointArrayMap: ["z"],
        getMapData: y.map.prototype.getMapData,
        getBox: y.map.prototype.getBox,
        setData: y.map.prototype.setData
      });
    ja.prototype.transformFromLatLon = function(a, b) {
      if (D.proj4 === void 0)
        return V(21), {
          x: 0,
          y: null
        };
      var c = D.proj4(b.crs, [a.lon, a.lat]),
          d = b.cosAngle || b.rotation && Math.cos(b.rotation),
          e = b.sinAngle || b.rotation && Math.sin(b.rotation),
          c = b.rotation ? [c[0] * d + c[1] * e, -c[0] * e + c[1] * d] : c;
      return {
        x: ((c[0] - (b.xoffset || 0)) * (b.scale || 1) + (b.xpan || 0)) * (b.jsonres || 1) + (b.jsonmarginX || 0),
        y: (((b.yoffset || 0) - c[1]) * (b.scale || 1) + (b.ypan || 0)) * (b.jsonres || 1) - (b.jsonmarginY || 0)
      };
    };
    ja.prototype.transformToLatLon = function(a, b) {
      if (D.proj4 === void 0)
        V(21);
      else {
        var c = {
          x: ((a.x - (b.jsonmarginX || 0)) / (b.jsonres || 1) - (b.xpan || 0)) / (b.scale || 1) + (b.xoffset || 0),
          y: ((-a.y - (b.jsonmarginY || 0)) / (b.jsonres || 1) + (b.ypan || 0)) / (b.scale || 1) + (b.yoffset || 0)
        },
            d = b.cosAngle || b.rotation && Math.cos(b.rotation),
            e = b.sinAngle || b.rotation && Math.sin(b.rotation),
            c = D.proj4(b.crs, "WGS84", b.rotation ? {
              x: c.x * d + c.y * -e,
              y: c.x * e + c.y * d
            } : c);
        return {
          lat: c.y,
          lon: c.x
        };
      }
    };
    ja.prototype.fromPointToLatLon = function(a) {
      var b = this.mapTransforms,
          c;
      if (b) {
        for (c in b)
          if (b.hasOwnProperty(c) && b[c].hitZone && Db({
            x: a.x,
            y: -a.y
          }, b[c].hitZone.coordinates[0]))
            return this.transformToLatLon(a, b[c]);
        return this.transformToLatLon(a, b["default"]);
      } else
        V(22);
    };
    ja.prototype.fromLatLonToPoint = function(a) {
      var b = this.mapTransforms,
          c,
          d;
      if (!b)
        return V(22), {
          x: 0,
          y: null
        };
      for (c in b)
        if (b.hasOwnProperty(c) && b[c].hitZone && (d = this.transformFromLatLon(a, b[c]), Db({
          x: d.x,
          y: -d.y
        }, b[c].hitZone.coordinates[0])))
          return d;
      return this.transformFromLatLon(a, b["default"]);
    };
    s.geojson = function(a, b, c) {
      var d = [],
          e = [],
          f = function(a) {
            var b,
                c = a.length;
            e.push("M");
            for (b = 0; b < c; b++)
              b === 1 && e.push("L"), e.push(a[b][0], -a[b][1]);
          },
          b = b || "map";
      n(a.features, function(a) {
        var c = a.geometry,
            i = c.type,
            c = c.coordinates,
            a = a.properties,
            k;
        e = [];
        b === "map" || b === "mapbubble" ? (i === "Polygon" ? (n(c, f), e.push("Z")) : i === "MultiPolygon" && (n(c, function(a) {
          n(a, f);
        }), e.push("Z")), e.length && (k = {path: e})) : b === "mapline" ? (i === "LineString" ? f(c) : i === "MultiLineString" && n(c, f), e.length && (k = {path: e})) : b === "mappoint" && i === "Point" && (k = {
          x: c[0],
          y: -c[1]
        });
        k && d.push(r(k, {
          name: a.name || a.NAME,
          properties: a
        }));
      });
      if (c && a.copyrightShort)
        c.chart.mapCredits = Ea(c.chart.options.credits.mapText, {geojson: a}), c.chart.mapCreditsFull = Ea(c.chart.options.credits.mapTextFull, {geojson: a});
      return d;
    };
    ga(ja.prototype, "showCredits", function(a, b) {
      if (this.mapCredits)
        b.href = null;
      a.call(this, s.merge(b, {text: b.text + (this.mapCredits || "")}));
      this.credits && this.mapCreditsFull && this.credits.attr({title: this.mapCreditsFull});
    });
    r(L.lang, {
      zoomIn: "Zoom in",
      zoomOut: "Zoom out"
    });
    L.mapNavigation = {
      buttonOptions: {
        alignTo: "plotBox",
        align: "left",
        verticalAlign: "top",
        x: 0,
        width: 18,
        height: 18,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          textAlign: "center"
        },
        theme: {"stroke-width": 1}
      },
      buttons: {
        zoomIn: {
          onclick: function() {
            this.mapZoom(0.5);
          },
          text: "+",
          y: 0
        },
        zoomOut: {
          onclick: function() {
            this.mapZoom(2);
          },
          text: "-",
          y: 28
        }
      },
      mouseWheelSensitivity: 1.1
    };
    s.splitPath = function(a) {
      var b,
          a = a.replace(/([A-Za-z])/g, " $1 "),
          a = a.replace(/^\s*/, "").replace(/\s*$/, ""),
          a = a.split(/[ ,]+/);
      for (b = 0; b < a.length; b++)
        /[a-zA-Z]/.test(a[b]) || (a[b] = parseFloat(a[b]));
      return a;
    };
    s.maps = {};
    oa.prototype.symbols.topbutton = function(a, b, c, d, e) {
      return Eb(a - 1, b - 1, c, d, e.r, e.r, 0, 0);
    };
    oa.prototype.symbols.bottombutton = function(a, b, c, d, e) {
      return Eb(a - 1, b - 1, c, d, 0, 0, e.r, e.r);
    };
    Ta === Za && n(["topbutton", "bottombutton"], function(a) {
      Za.prototype.symbols[a] = oa.prototype.symbols[a];
    });
    s.Map = s.mapChart = function(a, b, c) {
      var d = typeof a === "string" || a.nodeName,
          e = arguments[d ? 1 : 0],
          f = {
            endOnTick: !1,
            gridLineWidth: 0,
            lineWidth: 0,
            minPadding: 0,
            maxPadding: 0,
            startOnTick: !1,
            title: null,
            tickPositions: []
          },
          g,
          h = s.getOptions().credits;
      g = e.series;
      e.series = null;
      e = C({
        chart: {
          panning: "xy",
          type: "map"
        },
        credits: {
          mapText: o(h.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
          mapTextFull: o(h.mapTextFull, "{geojson.copyright}")
        },
        xAxis: f,
        yAxis: C(f, {reversed: !0})
      }, e, {chart: {
          inverted: !1,
          alignTicks: !1
        }});
      e.series = g;
      return d ? new ja(a, e, c) : new ja(e, b);
    };
    L.plotOptions.heatmap = C(L.plotOptions.scatter, {
      animation: !1,
      borderWidth: 0,
      nullColor: "#F8F8F8",
      dataLabels: {
        formatter: function() {
          return this.point.value;
        },
        inside: !0,
        verticalAlign: "middle",
        crop: !1,
        overflow: !1,
        padding: 0
      },
      marker: null,
      pointRange: null,
      tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}<br/>"},
      states: {
        normal: {animation: !0},
        hover: {
          halo: !1,
          brightness: 0.2
        }
      }
    });
    y.heatmap = ba(y.scatter, C(Kb, {
      type: "heatmap",
      pointArrayMap: ["y", "value"],
      hasPointSpecificOptions: !0,
      pointClass: ba($, Ma),
      supportsDrilldown: !0,
      getExtremesFromAll: !0,
      directTouch: !0,
      init: function() {
        var a;
        y.scatter.prototype.init.apply(this, arguments);
        a = this.options;
        a.pointRange = o(a.pointRange, a.colsize || 1);
        this.yAxis.axisPointRange = a.rowsize || 1;
      },
      translate: function() {
        var a = this.options,
            b = this.xAxis,
            c = this.yAxis,
            d = function(a, b, c) {
              return Math.min(Math.max(b, a), c);
            };
        this.generatePoints();
        n(this.points, function(e) {
          var f = (a.colsize || 1) / 2,
              g = (a.rowsize || 1) / 2,
              h = d(Math.round(b.len - b.translate(e.x - f, 0, 1, 0, 1)), -b.len, 2 * b.len),
              f = d(Math.round(b.len - b.translate(e.x + f, 0, 1, 0, 1)), -b.len, 2 * b.len),
              i = d(Math.round(c.translate(e.y - g, 0, 1, 0, 1)), -c.len, 2 * c.len),
              g = d(Math.round(c.translate(e.y + g, 0, 1, 0, 1)), -c.len, 2 * c.len);
          e.plotX = e.clientX = (h + f) / 2;
          e.plotY = (i + g) / 2;
          e.shapeType = "rect";
          e.shapeArgs = {
            x: Math.min(h, f),
            y: Math.min(i, g),
            width: Math.abs(f - h),
            height: Math.abs(g - i)
          };
        });
        this.translateColors();
        this.chart.hasRendered && n(this.points, function(a) {
          a.shapeArgs.fill = a.options.color || a.color;
        });
      },
      drawPoints: y.column.prototype.drawPoints,
      animate: W,
      getBox: W,
      drawLegendSymbol: ab.drawRectangle,
      alignDataLabel: y.column.prototype.alignDataLabel,
      getExtremes: function() {
        R.prototype.getExtremes.call(this, this.valueData);
        this.valueMin = this.dataMin;
        this.valueMax = this.dataMax;
        R.prototype.getExtremes.call(this);
      }
    }));
    Ma = s.TrackerMixin = {
      drawTrackerPoint: function() {
        var a = this,
            b = a.chart,
            c = b.pointer,
            d = a.options.cursor,
            e = d && {cursor: d},
            f = function(a) {
              for (var c = a.target,
                  d; c && !d; )
                d = c.point, c = c.parentNode;
              if (d !== w && d !== b.hoverPoint)
                d.onMouseOver(a);
            };
        n(a.points, function(a) {
          if (a.graphic)
            a.graphic.element.point = a;
          if (a.dataLabel)
            a.dataLabel.element.point = a;
        });
        if (!a._hasTracking)
          n(a.trackerGroups, function(b) {
            if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
              c.onTrackerMouseOut(a);
            }).css(e), Wa))
              a[b].on("touchstart", f);
          }), a._hasTracking = !0;
      },
      drawTrackerGraph: function() {
        var a = this,
            b = a.options,
            c = b.trackByArea,
            d = [].concat(c ? a.areaPath : a.graphPath),
            e = d.length,
            f = a.chart,
            g = f.pointer,
            h = f.renderer,
            i = f.options.tooltip.snap,
            k = a.tracker,
            j = b.cursor,
            l = j && {cursor: j},
            m = function() {
              if (f.hoverSeries !== a)
                a.onMouseOver();
            },
            o = "rgba(192,192,192," + (ea ? 1.0E-4 : 0.002) + ")";
        if (e && !c)
          for (j = e + 1; j--; )
            d[j] === "M" && d.splice(j + 1, 0, d[j + 1] - i, d[j + 2], "L"), (j && d[j] === "M" || j === e) && d.splice(j, 0, "L", d[j - 2] + i, d[j - 1]);
        k ? k.attr({d: d}) : (a.tracker = h.path(d).attr({
          "stroke-linejoin": "round",
          visibility: a.visible ? "visible" : "hidden",
          stroke: o,
          fill: c ? o : "none",
          "stroke-width": b.lineWidth + (c ? 0 : 2 * i),
          zIndex: 2
        }).add(a.group), n([a.tracker, a.markerGroup], function(a) {
          a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function(a) {
            g.onTrackerMouseOut(a);
          }).css(l);
          if (Wa)
            a.on("touchstart", m);
        }));
      }
    };
    if (y.column)
      U.prototype.drawTracker = Ma.drawTrackerPoint;
    if (y.pie)
      y.pie.prototype.drawTracker = Ma.drawTrackerPoint;
    if (y.scatter)
      Ya.prototype.drawTracker = Ma.drawTrackerPoint;
    r($a.prototype, {
      setItemEvents: function(a, b, c, d, e) {
        var f = this;
        (c ? b : a.legendGroup).on("mouseover", function() {
          a.setState("hover");
          b.css(f.options.itemHoverStyle);
        }).on("mouseout", function() {
          b.css(a.visible ? d : e);
          a.setState();
        }).on("click", function(b) {
          var c = function() {
            a.setVisible && a.setVisible();
          },
              b = {browserEvent: b};
          a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : G(a, "legendItemClick", b, c);
        });
      },
      createCheckboxForItem: function(a) {
        a.checkbox = da("input", {
          type: "checkbox",
          checked: a.selected,
          defaultChecked: a.selected
        }, this.options.itemCheckboxStyle, this.chart.container);
        N(a.checkbox, "click", function(b) {
          G(a.series || a, "checkboxClick", {
            checked: b.target.checked,
            item: a
          }, function() {
            a.select();
          });
        });
      }
    });
    L.legend.itemStyle.cursor = "pointer";
    r(ja.prototype, {
      showResetZoom: function() {
        var a = this,
            b = L.lang,
            c = a.options.chart.resetZoomButton,
            d = c.theme,
            e = d.states,
            f = c.relativeTo === "chart" ? null : "plotBox";
        this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
          a.zoomOut();
        }, d, e && e.hover).attr({
          align: c.position.align,
          title: b.resetZoomTitle
        }).add().align(c.position, !1, f);
      },
      zoomOut: function() {
        var a = this;
        G(a, "selection", {resetSelection: !0}, function() {
          a.zoom();
        });
      },
      zoom: function(a) {
        var b,
            c = this.pointer,
            d = !1,
            e;
        !a || a.resetSelection ? n(this.axes, function(a) {
          b = a.zoom();
        }) : n(a.xAxis.concat(a.yAxis), function(a) {
          var e = a.axis,
              h = e.isXAxis;
          if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"])
            b = e.zoom(a.min, a.max), e.displayBtn && (d = !0);
        });
        e = this.resetZoomButton;
        if (d && !e)
          this.showResetZoom();
        else if (!d && aa(e))
          this.resetZoomButton = e.destroy();
        b && this.redraw(o(this.options.chart.animation, a && a.animation, this.pointCount < 100));
      },
      pan: function(a, b) {
        var c = this,
            d = c.hoverPoints,
            e;
        d && n(d, function(a) {
          a.setState();
        });
        n(b === "xy" ? [1, 0] : [1], function(b) {
          var b = c[b ? "xAxis" : "yAxis"][0],
              d = b.horiz,
              h = a[d ? "chartX" : "chartY"],
              d = d ? "mouseDownX" : "mouseDownY",
              i = c[d],
              k = (b.pointRange || 0) / 2,
              j = b.getExtremes(),
              l = b.toValue(i - h, !0) + k,
              k = b.toValue(i + b.len - h, !0) - k,
              i = i > h;
          if (b.series.length && (i || l > I(j.dataMin, j.min)) && (!i || k < u(j.dataMax, j.max)))
            b.setExtremes(l, k, !1, !1, {trigger: "pan"}), e = !0;
          c[d] = h;
        });
        e && c.redraw(!1);
        M(c.container, {cursor: "move"});
      }
    });
    r($.prototype, {
      select: function(a, b) {
        var c = this,
            d = c.series,
            e = d.chart,
            a = o(a, !c.selected);
        c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function() {
          c.selected = c.options.selected = a;
          d.options.data[za(c, d.data)] = c.options;
          c.setState(a && "select");
          b || n(e.getSelectedPoints(), function(a) {
            if (a.selected && a !== c)
              a.selected = a.options.selected = !1, d.options.data[za(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect");
          });
        });
      },
      onMouseOver: function(a, b) {
        var c = this.series,
            d = c.chart,
            e = d.tooltip,
            f = d.hoverPoint;
        if (d.hoverSeries !== c)
          c.onMouseOver();
        if (f && f !== this)
          f.onMouseOut();
        if (this.series && (this.firePointEvent("mouseOver"), e && (!e.shared || c.noSharedTooltip) && e.refresh(this, a), this.setState("hover"), !b))
          d.hoverPoint = this;
      },
      onMouseOut: function() {
        var a = this.series.chart,
            b = a.hoverPoints;
        this.firePointEvent("mouseOut");
        if (!b || za(this, b) === -1)
          this.setState(), a.hoverPoint = null;
      },
      importEvents: function() {
        if (!this.hasImportedEvents) {
          var a = C(this.series.options.point, this.options).events,
              b;
          this.events = a;
          for (b in a)
            N(this, b, a[b]);
          this.hasImportedEvents = !0;
        }
      },
      setState: function(a, b) {
        var c = fa(this.plotX),
            d = this.plotY,
            e = this.series,
            f = e.options.states,
            g = Z[e.type].marker && e.options.marker,
            h = g && !g.enabled,
            i = g && g.states[a],
            k = i && i.enabled === !1,
            j = e.stateMarkerGraphic,
            l = this.marker || {},
            m = e.chart,
            n = e.halo,
            o,
            a = a || "";
        o = this.pointAttr[a] || e.pointAttr[a];
        if (!(a === this.state && !b || this.selected && a !== "select" || f[a] && f[a].enabled === !1 || a && (k || h && i.enabled === !1) || a && l.states && l.states[a] && l.states[a].enabled === !1)) {
          if (this.graphic)
            g = g && this.graphic.symbolName && o.r, this.graphic.attr(C(o, g ? {
              x: c - g,
              y: d - g,
              width: 2 * g,
              height: 2 * g
            } : {})), j && j.hide();
          else {
            if (a && i)
              if (g = i.radius, l = l.symbol || e.symbol, j && j.currentSymbol !== l && (j = j.destroy()), j)
                j[b ? "animate" : "attr"]({
                  x: c - g,
                  y: d - g
                });
              else if (l)
                e.stateMarkerGraphic = j = m.renderer.symbol(l, c - g, d - g, 2 * g, 2 * g).attr(o).add(e.markerGroup), j.currentSymbol = l;
            if (j)
              j[a && m.isInsidePlot(c, d, m.inverted) ? "show" : "hide"](), j.element.point = this;
          }
          if ((c = f[a] && f[a].halo) && c.size) {
            if (!n)
              e.halo = n = m.renderer.path().add(m.seriesGroup);
            n.attr(r({
              fill: this.color || e.color,
              "fill-opacity": c.opacity,
              zIndex: -1
            }, c.attributes))[b ? "animate" : "attr"]({d: this.haloPath(c.size)});
          } else
            n && n.attr({d: []});
          this.state = a;
        }
      },
      haloPath: function(a) {
        var b = this.series,
            c = b.chart,
            d = b.getPlotBox(),
            e = c.inverted,
            f = Math.floor(this.plotX);
        return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : f) - a, d.translateY + (e ? b.xAxis.len - f : this.plotY) - a, a * 2, a * 2);
      }
    });
    r(R.prototype, {
      onMouseOver: function() {
        var a = this.chart,
            b = a.hoverSeries;
        if (b && b !== this)
          b.onMouseOut();
        this.options.events.mouseOver && G(this, "mouseOver");
        this.setState("hover");
        a.hoverSeries = this;
      },
      onMouseOut: function() {
        var a = this.options,
            b = this.chart,
            c = b.tooltip,
            d = b.hoverPoint;
        b.hoverSeries = null;
        if (d)
          d.onMouseOut();
        this && a.events.mouseOut && G(this, "mouseOut");
        c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide();
        this.setState();
      },
      setState: function(a) {
        var b = this.options,
            c = this.graph,
            d = b.states,
            e = b.lineWidth,
            b = 0,
            a = a || "";
        if (this.state !== a && (this.state = a, !(d[a] && d[a].enabled === !1) && (a && (e = d[a].lineWidth || e + (d[a].lineWidthPlus || 0)), c && !c.dashstyle))) {
          a = {"stroke-width": e};
          for (c.attr(a); this["zoneGraph" + b]; )
            this["zoneGraph" + b].attr(a), b += 1;
        }
      },
      setVisible: function(a, b) {
        var c = this,
            d = c.chart,
            e = c.legendItem,
            f,
            g = d.options.chart.ignoreHiddenSeries,
            h = c.visible;
        f = (c.visible = a = c.userOptions.visible = a === w ? !h : a) ? "show" : "hide";
        n(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
          if (c[a])
            c[a][f]();
        });
        if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)
          c.onMouseOut();
        e && d.legend.colorizeItem(c, a);
        c.isDirty = !0;
        c.options.stacking && n(d.series, function(a) {
          if (a.options.stacking && a.visible)
            a.isDirty = !0;
        });
        n(c.linkedSeries, function(b) {
          b.setVisible(a, !1);
        });
        if (g)
          d.isDirtyBox = !0;
        b !== !1 && d.redraw();
        G(c, f);
      },
      show: function() {
        this.setVisible(!0);
      },
      hide: function() {
        this.setVisible(!1);
      },
      select: function(a) {
        this.selected = a = a === w ? !this.selected : a;
        if (this.checkbox)
          this.checkbox.checked = a;
        G(this, a ? "select" : "unselect");
      },
      drawTracker: Ma.drawTrackerGraph
    });
    r(s, {
      Color: T,
      Point: $,
      Tick: Sa,
      Renderer: Ta,
      SVGElement: Q,
      SVGRenderer: oa,
      arrayMin: Pa,
      arrayMax: Ia,
      charts: O,
      correctFloat: pa,
      dateFormat: Oa,
      error: V,
      format: Ea,
      pathAnim: void 0,
      getOptions: function() {
        return L;
      },
      hasBidiBug: Mb,
      isTouchDevice: Gb,
      setOptions: function(a) {
        L = C(!0, L, a);
        vb();
        return L;
      },
      addEvent: N,
      removeEvent: Y,
      createElement: da,
      discardElement: Qa,
      css: M,
      each: n,
      map: Aa,
      merge: C,
      splat: ra,
      stableSort: cb,
      extendClass: ba,
      pInt: E,
      svg: ea,
      canvas: ma,
      vml: !ea && !ma,
      product: "Highmaps",
      version: "4.2.5"
    });
    return s;
  });
})(require('process'));
