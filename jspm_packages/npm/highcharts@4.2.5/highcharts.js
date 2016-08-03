/* */ 
(function(process) {
  (function(D, aa) {
    typeof module === "object" && module.exports ? module.exports = D.document ? aa(D) : aa : D.Highcharts = aa(D);
  })(typeof window !== "undefined" ? window : this, function(D) {
    function aa(a, b) {
      var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
      if (b)
        throw Error(c);
      D.console && console.log(c);
    }
    function pb(a, b, c) {
      this.options = b;
      this.elem = a;
      this.prop = c;
    }
    function E() {
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
    function C(a, b) {
      return parseInt(a, b || 10);
    }
    function xa(a) {
      return typeof a === "string";
    }
    function Z(a) {
      return a && typeof a === "object";
    }
    function Ea(a) {
      return Object.prototype.toString.call(a) === "[object Array]";
    }
    function pa(a, b) {
      for (var c = a.length; c--; )
        if (a[c] === b) {
          a.splice(c, 1);
          break;
        }
    }
    function r(a) {
      return a !== y && a !== null;
    }
    function P(a, b, c) {
      var d,
          e;
      if (xa(b))
        r(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b));
      else if (r(b) && Z(b))
        for (d in b)
          a.setAttribute(d, b[d]);
      return e;
    }
    function ta(a) {
      return Ea(a) ? a : [a];
    }
    function Pa(a, b, c) {
      if (b)
        return setTimeout(a, b, c);
      a.call(0, c);
    }
    function M(a, b) {
      if (ya && !fa && b && b.opacity !== y)
        b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
      u(a.style, b);
    }
    function ba(a, b, c, d, e) {
      a = A.createElement(a);
      b && u(a, b);
      e && M(a, {
        padding: 0,
        border: "none",
        margin: 0
      });
      c && M(a, c);
      d && d.appendChild(a);
      return a;
    }
    function qa(a, b) {
      var c = function() {};
      c.prototype = new a;
      u(c.prototype, b);
      return c;
    }
    function Fa(a, b, c) {
      return Array((b || 2) + 1 - String(a).length).join(c || 0) + a;
    }
    function Ya(a) {
      return (Za && Za(a) || qb || 0) * 6E4;
    }
    function Ka(a, b) {
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
            f = f.join(":"), g = /\.([0-9])/, h = U.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e !== null && (e = x.numberFormat(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : ""))) : e = Qa(f, e);
        }
        k.push(e);
        a = a.slice(c + 1);
        c = (d = !d) ? "}" : "{";
      }
      k.push(a);
      return k.join("");
    }
    function rb(a) {
      return Y.pow(10, V(Y.log(a) / Y.LN10));
    }
    function sb(a, b, c, d, e) {
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
    function hb(a, b) {
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
    function La(a) {
      for (var b = a.length,
          c = a[0]; b--; )
        a[b] < c && (c = a[b]);
      return c;
    }
    function Ga(a) {
      for (var b = a.length,
          c = a[0]; b--; )
        a[b] > c && (c = a[b]);
      return c;
    }
    function Ra(a, b) {
      for (var c in a)
        a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c];
    }
    function Sa(a) {
      ib || (ib = ba(Ma));
      a && ib.appendChild(a);
      ib.innerHTML = "";
    }
    function ca(a, b) {
      return parseFloat(a.toPrecision(b || 14));
    }
    function Ta(a, b) {
      b.renderer.globalAnimation = o(a, b.animation);
    }
    function $a(a) {
      return Z(a) ? E(a) : {duration: a ? 500 : 0};
    }
    function Eb() {
      var a = U.global,
          b = a.useUTC,
          c = b ? "getUTC" : "get",
          d = b ? "setUTC" : "set";
      la = a.Date || D.Date;
      qb = b && a.timezoneOffset;
      Za = b && a.getTimezoneOffset;
      jb = function(a, c, d, h, i, k) {
        var j;
        b ? (j = la.UTC.apply(0, arguments), j += Ya(j)) : j = (new la(a, c, o(d, 1), o(h, 0), o(i, 0), o(k, 0))).getTime();
        return j;
      };
      tb = c + "Minutes";
      ub = c + "Hours";
      vb = c + "Day";
      Ua = c + "Date";
      ab = c + "Month";
      bb = c + "FullYear";
      Fb = d + "Milliseconds";
      Gb = d + "Seconds";
      Hb = d + "Minutes";
      Ib = d + "Hours";
      kb = d + "Date";
      wb = d + "Month";
      xb = d + "FullYear";
    }
    function ma(a) {
      if (!(this instanceof ma))
        return new ma(a);
      this.init(a);
    }
    function O() {}
    function Va(a, b, c, d) {
      this.axis = a;
      this.pos = b;
      this.type = c || "";
      this.isNew = !0;
      !c && !d && this.addLabel();
    }
    function Jb(a, b, c, d, e) {
      var f = a.chart.inverted;
      this.axis = a;
      this.isNegative = c;
      this.options = b;
      this.x = d;
      this.total = null;
      this.points = {};
      this.stack = e;
      this.rightCliff = this.leftCliff = 0;
      this.alignOptions = {
        align: b.align || (f ? c ? "left" : "right" : "center"),
        verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
        y: o(b.y, f ? 4 : c ? 14 : -6),
        x: o(b.x, f ? c ? -6 : 6 : 0)
      };
      this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center");
    }
    var y,
        A = D.document,
        Y = Math,
        B = Y.round,
        V = Y.floor,
        ua = Y.ceil,
        t = Y.max,
        F = Y.min,
        Q = Y.abs,
        W = Y.cos,
        da = Y.sin,
        ra = Y.PI,
        ja = ra * 2 / 360,
        za = D.navigator && D.navigator.userAgent || "",
        Kb = D.opera,
        ya = /(msie|trident|edge)/i.test(za) && !Kb,
        lb = A && A.documentMode === 8,
        mb = !ya && /AppleWebKit/.test(za),
        Na = /Firefox/.test(za),
        Lb = /(Mobile|Android|Windows Phone)/.test(za),
        Ha = "http://www.w3.org/2000/svg",
        fa = A && A.createElementNS && !!A.createElementNS(Ha, "svg").createSVGRect,
        Pb = Na && parseInt(za.split("Firefox/")[1], 10) < 4,
        ka = A && !fa && !ya && !!A.createElement("canvas").getContext,
        cb,
        db,
        Mb = {},
        yb = 0,
        ib,
        U,
        Qa,
        H,
        Aa = function() {},
        T = [],
        eb = 0,
        Ma = "div",
        Qb = /^[0-9]+$/,
        nb = ["plotTop", "marginRight", "marginBottom", "plotLeft"],
        la,
        jb,
        qb,
        Za,
        tb,
        ub,
        vb,
        Ua,
        ab,
        bb,
        Fb,
        Gb,
        Hb,
        Ib,
        kb,
        wb,
        xb,
        L = {},
        x;
    x = D.Highcharts ? aa(16, !0) : {win: D};
    x.seriesTypes = L;
    var Ia = [],
        na,
        sa,
        p,
        Ba,
        zb,
        Ca,
        N,
        X,
        I,
        Wa,
        Oa;
    pb.prototype = {
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
        this.startTime = +new la;
        this.start = a;
        this.end = b;
        this.unit = c;
        this.now = this.start;
        this.pos = 0;
        e.elem = this.elem;
        if (e() && Ia.push(e) === 1)
          e.timerId = setInterval(function() {
            for (f = 0; f < Ia.length; f++)
              Ia[f]() || Ia.splice(f--, 1);
            Ia.length || clearInterval(e.timerId);
          }, 13);
      },
      step: function(a) {
        var b = +new la,
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
    var u = x.extend = function(a, b) {
      var c;
      a || (a = {});
      for (c in b)
        a[c] = b[c];
      return a;
    },
        J = x.isNumber = function(a) {
          return typeof a === "number" && !isNaN(a);
        },
        o = x.pick = function() {
          var a = arguments,
              b,
              c,
              d = a.length;
          for (b = 0; b < d; b++)
            if (c = a[b], c !== y && c !== null)
              return c;
        },
        fb = x.wrap = function(a, b, c) {
          var d = a[b];
          a[b] = function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a);
          };
        };
    Qa = function(a, b, c) {
      if (!J(b))
        return U.lang.invalidDate || "";
      var a = o(a, "%Y-%m-%d %H:%M:%S"),
          d = new la(b - Ya(b)),
          e,
          f = d[ub](),
          g = d[vb](),
          h = d[Ua](),
          i = d[ab](),
          k = d[bb](),
          j = U.lang,
          l = j.weekdays,
          m = j.shortWeekdays,
          d = u({
            a: m ? m[g] : l[g].substr(0, 3),
            A: l[g],
            d: Fa(h),
            e: Fa(h, 2, " "),
            w: g,
            b: j.shortMonths[i],
            B: j.months[i],
            m: Fa(i + 1),
            y: k.toString().substr(2, 2),
            Y: k,
            H: Fa(f),
            k: f,
            I: Fa(f % 12 || 12),
            l: f % 12 || 12,
            M: Fa(d[tb]()),
            p: f < 12 ? "AM" : "PM",
            P: f < 12 ? "am" : "pm",
            S: Fa(d.getSeconds()),
            L: Fa(B(b % 1E3), 3)
          }, x.dateFormats);
      for (e in d)
        for (; a.indexOf("%" + e) !== -1; )
          a = a.replace("%" + e, typeof d[e] === "function" ? d[e](b) : d[e]);
      return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
    };
    H = {
      millisecond: 1,
      second: 1E3,
      minute: 6E4,
      hour: 36E5,
      day: 864E5,
      week: 6048E5,
      month: 24192E5,
      year: 314496E5
    };
    x.numberFormat = function(a, b, c, d) {
      var a = +a || 0,
          b = +b,
          e = U.lang,
          f = (a.toString().split(".")[1] || "").length,
          g,
          h,
          i = Math.abs(a);
      b === -1 ? b = Math.min(f, 20) : J(b) || (b = 2);
      g = String(C(i.toFixed(b)));
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
      return (c = D.getComputedStyle(a, void 0)) && C(c.getPropertyValue(b));
    };
    sa = function(a, b) {
      return b.indexOf ? b.indexOf(a) : [].indexOf.call(b, a);
    };
    Ba = function(a, b) {
      return [].filter.call(a, b);
    };
    Ca = function(a, b) {
      for (var c = [],
          d = 0,
          e = a.length; d < e; d++)
        c[d] = b.call(a[d], a[d], d, a);
      return c;
    };
    zb = function(a) {
      var b = A.documentElement,
          a = a.getBoundingClientRect();
      return {
        top: a.top + (D.pageYOffset || b.scrollTop) - (b.clientTop || 0),
        left: a.left + (D.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
      };
    };
    Oa = function(a) {
      for (var b = Ia.length; b--; )
        if (Ia[b].elem === a)
          Ia[b].stopped = !0;
    };
    p = function(a, b) {
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
    X = function(a, b, c) {
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
        b ? (f = g[b] || [], c ? (h = sa(c, f), h > -1 && (f.splice(h, 1), g[b] = f), d(b, c)) : (e(), g[b] = [])) : (e(), a.hcEvents = {});
    };
    I = function(a, b, c, d) {
      var e;
      e = a.hcEvents;
      var f,
          g,
          c = c || {};
      if (A.createEvent && (a.dispatchEvent || a.fireEvent))
        e = A.createEvent("Events"), e.initEvent(b, !0, !0), e.target = a, u(e, c), a.dispatchEvent ? a.dispatchEvent(e) : a.fireEvent(b, e);
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
    Wa = function(a, b, c) {
      var d,
          e = "",
          f,
          g,
          h;
      Z(c) || (d = arguments, c = {
        duration: d[2],
        easing: d[3],
        complete: d[4]
      });
      if (!J(c.duration))
        c.duration = 400;
      c.easing = typeof c.easing === "function" ? c.easing : Math[c.easing] || Math.easeInOutSine;
      c.curAnim = E(b);
      for (h in b)
        g = new pb(a, c, h), f = null, h === "d" ? (g.paths = g.initPath(a, a.d, b.d), g.toD = b.d, d = 0, f = 1) : a.attr ? d = a.attr(h) : (d = parseFloat(na(a, h)) || 0, h !== "opacity" && (e = "px")), f || (f = b[h]), f.match && f.match("px") && (f = f.replace(/px/g, "")), g.run(d, f, e);
    };
    if (D.jQuery)
      D.jQuery.fn.highcharts = function() {
        var a = [].slice.call(arguments);
        if (this[0])
          return a[0] ? (new (x[xa(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : T[P(this[0], "data-highcharts-chart")];
      };
    A && !A.defaultView && (na = function(a, b) {
      var c;
      c = {
        width: "clientWidth",
        height: "clientHeight"
      }[b];
      if (a.style[b])
        return C(a.style[b]);
      b === "opacity" && (b = "filter");
      if (c)
        return a.style.zoom = 1, Math.max(a[c] - 2 * na(a, "padding"), 0);
      c = a.currentStyle[b.replace(/\-(\w)/g, function(a, b) {
        return b.toUpperCase();
      })];
      b === "filter" && (c = c.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
        return b / 100;
      }));
      return c === "" ? 1 : C(c);
    });
    Array.prototype.forEach || (p = function(a, b) {
      for (var c = 0,
          d = a.length; c < d; c++)
        if (b.call(a[c], a[c], c, a) === !1)
          return c;
    });
    Array.prototype.indexOf || (sa = function(a, b) {
      var c,
          d = 0;
      if (b)
        for (c = b.length; d < c; d++)
          if (b[d] === a)
            return d;
      return -1;
    });
    Array.prototype.filter || (Ba = function(a, b) {
      for (var c = [],
          d = 0,
          e = a.length; d < e; d++)
        b(a[d], d) && c.push(a[d]);
      return c;
    });
    x.Fx = pb;
    x.inArray = sa;
    x.each = p;
    x.grep = Ba;
    x.offset = zb;
    x.map = Ca;
    x.addEvent = N;
    x.removeEvent = X;
    x.fireEvent = I;
    x.animate = Wa;
    x.animObject = $a;
    x.stop = Oa;
    U = {
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
        VMLRadialGradientURL: "http://code.highcharts.com/4.2.5/gfx/vml-radial-gradient.png"
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
              return this.y === null ? "" : x.numberFormat(this.y, -1);
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
        animation: fa,
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
        snap: Lb ? 25 : 10,
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
    var ea = U.plotOptions,
        ga = ea.line;
    Eb();
    ma.prototype = {
      parsers: [{
        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        parse: function(a) {
          return [C(a[1]), C(a[2]), C(a[3]), parseFloat(a[4], 10)];
        }
      }, {
        regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        parse: function(a) {
          return [C(a[1], 16), C(a[2], 16), C(a[3], 16), 1];
        }
      }, {
        regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        parse: function(a) {
          return [C(a[1]), C(a[2]), C(a[3]), 1];
        }
      }],
      init: function(a) {
        var b,
            c,
            d,
            e;
        if ((this.input = a) && a.stops)
          this.stops = Ca(a.stops, function(a) {
            return new ma(a[1]);
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
        this.stops ? (d = E(b), d.stops = [].concat(d.stops), p(this.stops, function(b, c) {
          d.stops[c] = [d.stops[c][0], b.get(a)];
        })) : d = c && J(c[0]) ? a === "rgb" || !a && c[3] === 1 ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : a === "a" ? c[3] : "rgba(" + c.join(",") + ")" : b;
        return d;
      },
      brighten: function(a) {
        var b,
            c = this.rgba;
        if (this.stops)
          p(this.stops, function(b) {
            b.brighten(a);
          });
        else if (J(a) && a !== 0)
          for (b = 0; b < 3; b++)
            c[b] += C(a * 255), c[b] < 0 && (c[b] = 0), c[b] > 255 && (c[b] = 255);
        return this;
      },
      setOpacity: function(a) {
        this.rgba[3] = a;
        return this;
      }
    };
    O.prototype = {
      opacity: 1,
      textProps: "direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
      init: function(a, b) {
        this.element = b === "span" ? ba(b) : A.createElementNS(Ha, b);
        this.renderer = a;
      },
      animate: function(a, b, c) {
        b = o(b, this.renderer.globalAnimation, !0);
        Oa(this);
        if (b) {
          if (c)
            b.complete = c;
          Wa(this, a, b);
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
            n,
            q,
            z = [],
            s;
        a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
        if (f) {
          g = a[f];
          i = d.gradients;
          j = a.stops;
          n = c.radialReference;
          Ea(g) && (a[f] = g = {
            x1: g[0],
            y1: g[1],
            x2: g[2],
            y2: g[3],
            gradientUnits: "userSpaceOnUse"
          });
          f === "radialGradient" && n && !r(g.gradientUnits) && (h = g, g = E(g, d.getRadialAttr(n, h), {gradientUnits: "userSpaceOnUse"}));
          for (q in g)
            q !== "id" && z.push(q, g[q]);
          for (q in j)
            z.push(j[q]);
          z = z.join(",");
          i[z] ? n = i[z].attr("id") : (g.id = n = "highcharts-" + yb++, i[z] = k = d.createElement(f).attr(g).add(d.defs), k.radAttr = h, k.stops = [], p(j, function(a) {
            a[1].indexOf("rgba") === 0 ? (e = ma(a[1]), l = e.get("rgb"), m = e.get("a")) : (l = a[1], m = 1);
            a = d.createElement("stop").attr({
              offset: a[0],
              "stop-color": l,
              "stop-opacity": m
            }).add(k);
            k.stops.push(a);
          }));
          s = "url(" + d.url + "#" + n + ")";
          c.setAttribute(b, s);
          c.gradient = z;
          a.toString = function() {
            return s;
          };
        }
      },
      applyTextShadow: function(a) {
        var b = this.element,
            c,
            d = a.indexOf("contrast") !== -1,
            e = {},
            f = this.renderer.forExport,
            g = f || b.style.textShadow !== y && !ya;
        if (d)
          e.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill));
        if (mb || f)
          e.textRendering = "geometricPrecision";
        g ? this.css(e) : (this.fakeTS = !0, this.ySetter = this.xSetter, c = [].slice.call(b.getElementsByTagName("tspan")), p(a.split(/\s?,\s?/g), function(a) {
          var d = b.firstChild,
              e,
              f,
              a = a.split(" ");
          e = a[a.length - 1];
          (f = a[a.length - 2]) && p(c, function(a, c) {
            var g;
            c === 0 && (a.setAttribute("x", b.getAttribute("x")), c = b.getAttribute("y"), a.setAttribute("y", c || 0), c === null && b.setAttribute("y", 0));
            g = a.cloneNode(1);
            P(g, {
              "class": "highcharts-text-shadow",
              fill: e,
              stroke: e,
              "stroke-opacity": 1 / t(C(f), 3),
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
        typeof a === "string" && b !== y && (d = a, a = {}, a[d] = b);
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
            c = P(b, "class") || "";
        c.indexOf(a) === -1 && P(b, "class", c + " " + a);
        return this;
      },
      symbolAttr: function(a) {
        var b = this;
        p("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
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
        d = B(e) % 2 / 2;
        a.x = V(a.x || this.x || 0) + d;
        a.y = V(a.y || this.y || 0) + d;
        a.width = V((a.width || this.width || 0) - 2 * d);
        a.height = V((a.height || this.height || 0) - 2 * d);
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
          e = this.textWidth = a && a.width && d.nodeName.toLowerCase() === "text" && C(a.width) || this.textWidth;
          b && (a = u(b, c));
          this.styles = a;
          e && (ka || !fa && this.renderer.forExport) && delete a.width;
          if (ya && !fa)
            M(this.element, a);
          else {
            b = function(a, b) {
              return "-" + b.toLowerCase();
            };
            for (f in a)
              g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
            P(d, "style", g);
          }
          e && this.added && this.renderer.buildText(this);
        }
        return this;
      },
      on: function(a, b) {
        var c = this,
            d = c.element;
        db && a === "click" ? (d.ontouchstart = function(a) {
          c.touchEventFired = la.now();
          a.preventDefault();
          b.call(d, a);
        }, d.onclick = function(a) {
          (za.indexOf("Android") === -1 || la.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a);
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
        (r(c) || r(d)) && a.push("scale(" + o(c, 1) + " " + o(d, 1) + ")");
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
          if (this.alignOptions = a, this.alignByTranslate = b, !c || xa(c))
            this.alignTo = d = c || "renderer", pa(f, this), f.push(this), c = null;
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
        h[b ? "translateX" : "x"] = B(f);
        if (e === "bottom" || e === "middle")
          g += (c.height - (a.height || 0)) / ({
            bottom: 1,
            middle: 2
          }[e] || 1);
        h[b ? "translateY" : "y"] = B(g);
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
            n = d.cacheKeys,
            q;
        f = o(b, this.rotation);
        g = f * ja;
        e !== y && (q = ["", f || 0, i && i.fontSize, h.style.width].join(","), q = e === "" || Qb.test(e) ? "num:" + e.toString().length + q : e + q);
        q && !a && (c = m[q]);
        if (!c) {
          if (h.namespaceURI === Ha || d.forExport) {
            try {
              l = this.fakeTS && function(a) {
                p(h.querySelectorAll(".highcharts-text-shadow"), function(b) {
                  b.style.display = a;
                });
              }, Na && j.textShadow ? (k = j.textShadow, j.textShadow = "") : l && l("none"), c = h.getBBox ? u({}, h.getBBox()) : {
                width: h.offsetWidth,
                height: h.offsetHeight
              }, k ? j.textShadow = k : l && l("");
            } catch (z) {}
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
            if (ya && i && i.fontSize === "11px" && e.toPrecision(3) === "16.9")
              c.height = e = 14;
            if (f)
              c.width = Q(e * da(g)) + Q(d * W(g)), c.height = Q(e * W(g)) + Q(d * da(g));
          }
          if (q) {
            for (; n.length > 250; )
              delete m[n.shift()];
            m[q] || n.push(q);
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
        Oa(a);
        if (a.clipPath)
          a.clipPath = a.clipPath.destroy();
        if (a.stops) {
          for (f = 0; f < a.stops.length; f++)
            a.stops[f] = a.stops[f].destroy();
          a.stops = null;
        }
        a.safeRemoveChild(b);
        for (c && p(c, function(b) {
          a.safeRemoveChild(b);
        }); d && d.div && d.div.childNodes.length === 0; )
          b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b;
        a.alignTo && pa(a.renderer.alignedObjects, a);
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
            P(f, {
              isShadow: "true",
              stroke: a.color || "black",
              "stroke-opacity": k * e,
              "stroke-width": h,
              transform: "translate" + j,
              fill: "none"
            });
            if (c)
              P(f, "height", t(P(f, "height") - h, 0)), f.cutHeight = h;
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
            a[b] = C(a[b]) * c;
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
        b || (b = A.createElementNS(Ha, "title"), this.element.appendChild(b));
        b.firstChild && b.removeChild(b.firstChild);
        b.appendChild(A.createTextNode(String(o(a), "").replace(/<[^>]*>/g, "")));
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
        if (r(a))
          g.zIndex = a, a = +a, this[b] === a && (e = !1), this[b] = a;
        if (e) {
          if ((a = this.zIndex) && d)
            d.handleZ = !0;
          d = c.childNodes;
          for (i = 0; i < d.length && !h; i++)
            if (e = d[i], f = e.zIndex, e !== g && (C(f) > a || !r(a) && r(f)))
              c.insertBefore(g, e), h = !0;
          h || c.appendChild(g);
        }
        return h;
      },
      _defaultSetter: function(a, b, c) {
        c.setAttribute(b, a);
      }
    };
    O.prototype.yGetter = O.prototype.xGetter;
    O.prototype.translateXSetter = O.prototype.translateYSetter = O.prototype.rotationSetter = O.prototype.verticalAlignSetter = O.prototype.scaleXSetter = O.prototype.scaleYSetter = function(a, b) {
      this[b] = a;
      this.doTransform = !0;
    };
    O.prototype["stroke-widthSetter"] = O.prototype.strokeSetter = function(a, b, c) {
      this[b] = a;
      if (this.stroke && this["stroke-width"])
        this.strokeWidth = this["stroke-width"], O.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0;
      else if (b === "stroke-width" && a === 0 && this.hasStroke)
        c.removeAttribute("stroke"), this.hasStroke = !1;
    };
    var Da = function() {
      this.init.apply(this, arguments);
    };
    Da.prototype = {
      Element: O,
      init: function(a, b, c, d, e, f) {
        var g,
            d = this.createElement("svg").attr({version: "1.1"}).css(this.getStyle(d));
        g = d.element;
        a.appendChild(g);
        a.innerHTML.indexOf("xmlns") === -1 && P(g, "xmlns", Ha);
        this.isSVG = !0;
        this.box = g;
        this.boxWrapper = d;
        this.alignedObjects = [];
        this.url = (Na || mb) && A.getElementsByTagName("base").length ? D.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
        this.createElement("desc").add().element.appendChild(A.createTextNode("Created with Highcharts 4.2.5"));
        this.defs = this.createElement("defs").add();
        this.allowHTML = f;
        this.forExport = e;
        this.gradients = {};
        this.cache = {};
        this.cacheKeys = [];
        this.imgCount = 0;
        this.setSize(b, c, !1);
        var h;
        if (Na && a.getBoundingClientRect)
          this.subPixelFix = b = function() {
            M(a, {
              left: 0,
              top: 0
            });
            h = a.getBoundingClientRect();
            M(a, {
              left: ua(h.left) - h.left + "px",
              top: ua(h.top) - h.top + "px"
            });
          }, b(), N(D, "resize", b);
      },
      getStyle: function(a) {
        return this.style = u({
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
        Ra(this.gradients || {});
        this.gradients = null;
        if (a)
          this.defs = a.destroy();
        this.subPixelFix && X(D, "resize", this.subPixelFix);
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
            j = P(b, "x"),
            l = a.styles,
            m = a.textWidth,
            n = l && l.lineHeight,
            q = l && l.textShadow,
            z = l && l.textOverflow === "ellipsis",
            s = g.length,
            G = m && !a.added && this.box,
            w = function(a) {
              return n ? C(n) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : l && l.fontSize || c.style.fontSize || 12, a).h;
            },
            v = function(a) {
              return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            }; s--; )
          b.removeChild(g[s]);
        !f && !q && !z && e.indexOf(" ") === -1 ? b.appendChild(A.createTextNode(v(e))) : (h = /<.*style="([^"]+)".*>/, i = /<.*href="(http[^"]+)".*>/, G && G.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], e = Ba(e, function(a) {
          return a !== "";
        }), p(e, function(e, f) {
          var g,
              n = 0,
              e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
          g = e.split("|||");
          p(g, function(e) {
            if (e !== "" || g.length === 1) {
              var q = {},
                  s = A.createElementNS(Ha, "tspan"),
                  o;
              h.test(e) && (o = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), P(s, "style", o));
              i.test(e) && !d && (P(s, "onclick", 'location.href="' + e.match(i)[1] + '"'), M(s, {cursor: "pointer"}));
              e = v(e.replace(/<(.|\n)*?>/g, "") || " ");
              if (e !== " ") {
                s.appendChild(A.createTextNode(e));
                if (n)
                  q.dx = 0;
                else if (f && j !== null)
                  q.x = j;
                P(s, q);
                b.appendChild(s);
                !n && f && (!fa && d && M(s, {display: "block"}), P(s, "dy", w(s)));
                if (m) {
                  for (var q = e.replace(/([^\^])-/g, "$1- ").split(" "),
                      p = g.length > 1 || f || q.length > 1 && l.whiteSpace !== "nowrap",
                      G,
                      S,
                      r = [],
                      t = w(s),
                      u = 1,
                      B = a.rotation,
                      y = e,
                      x = y.length; (p || z) && (q.length || r.length); )
                    a.rotation = 0, G = a.getBBox(!0), S = G.width, !fa && c.forExport && (S = c.measureSpanWidth(s.firstChild.data, a.styles)), G = S > m, k === void 0 && (k = G), z && k ? (x /= 2, y === "" || !G && x < 0.5 ? q = [] : (y = e.substring(0, y.length + (G ? -1 : 1) * ua(x)), q = [y + (m > 3 ? "\u2026" : "")], s.removeChild(s.firstChild))) : !G || q.length === 1 ? (q = r, r = [], q.length && (u++, s = A.createElementNS(Ha, "tspan"), P(s, {
                      dy: t,
                      x: j
                    }), o && P(s, "style", o), b.appendChild(s)), S > m && (m = S)) : (s.removeChild(s.firstChild), r.unshift(q.pop())), q.length && s.appendChild(A.createTextNode(q.join(" ").replace(/- /g, "-")));
                  a.rotation = B;
                }
                n++;
              }
            }
          });
        }), k && a.attr("title", a.textStr), G && G.removeChild(b), q && a.applyTextShadow && a.applyTextShadow(q));
      },
      getContrast: function(a) {
        a = ma(a).rgba;
        return a[0] + a[1] + a[2] > 384 ? "#000000" : "#FFFFFF";
      },
      button: function(a, b, c, d, e, f, g, h, i) {
        var k = this.label(a, b, c, i, null, null, null, null, "button"),
            j = 0,
            l,
            m,
            n,
            q,
            z,
            s,
            a = {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            e = E({
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
        n = e.style;
        delete e.style;
        f = E(e, {
          stroke: "#68A",
          fill: {
            linearGradient: a,
            stops: [[0, "#FFF"], [1, "#ACF"]]
          }
        }, f);
        q = f.style;
        delete f.style;
        g = E(e, {
          stroke: "#68A",
          fill: {
            linearGradient: a,
            stops: [[0, "#9BD"], [1, "#CDF"]]
          }
        }, g);
        z = g.style;
        delete g.style;
        h = E(e, {style: {color: "#CCC"}}, h);
        s = h.style;
        delete h.style;
        N(k.element, ya ? "mouseover" : "mouseenter", function() {
          j !== 3 && k.attr(f).css(q);
        });
        N(k.element, ya ? "mouseout" : "mouseleave", function() {
          j !== 3 && (l = [e, f, g][j], m = [n, q, z][j], k.attr(l).css(m));
        });
        k.setState = function(a) {
          (k.state = j = a) ? a === 2 ? k.attr(g).css(z) : a === 3 && k.attr(h).css(s) : k.attr(e).css(n);
        };
        return k.on("click", function(a) {
          j !== 3 && d.call(k, a);
        }).attr(e).css(u({cursor: "default"}, n));
      },
      crispLine: function(a, b) {
        a[1] === a[4] && (a[1] = a[4] = B(a[1]) - b % 2 / 2);
        a[2] === a[5] && (a[2] = a[5] = B(a[2]) + b % 2 / 2);
        return a;
      },
      path: function(a) {
        var b = {fill: "none"};
        Ea(a) ? b.d = a : Z(a) && u(b, a);
        return this.createElement("path").attr(b);
      },
      circle: function(a, b, c) {
        a = Z(a) ? a : {
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
        if (Z(a))
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
        var e = Z(a) ? a.r : e,
            g = this.createElement("rect"),
            a = Z(a) ? a : a === y ? {} : {
              x: a,
              y: b,
              width: t(c, 0),
              height: t(d, 0)
            };
        if (f !== y)
          g.strokeWidth = f, a = g.crisp(a);
        if (e)
          a.r = e;
        g.rSetter = function(a, b, c) {
          P(c, {
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
        return r(a) ? b.attr({"class": "highcharts-" + a}) : b;
      },
      image: function(a, b, c, d, e) {
        var f = {preserveAspectRatio: "none"};
        arguments.length > 1 && u(f, {
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
            i = i && i(B(b), B(c), d, e, f),
            k = /^url\((.*?)\)$/,
            j,
            l;
        if (i)
          h = this.path(i), u(h, {
            symbolName: a,
            x: b,
            y: c,
            width: d,
            height: e
          }), f && u(h, f);
        else if (k.test(a))
          l = function(a, b) {
            a.element && (a.attr({
              width: b[0],
              height: b[1]
            }), a.alignByTranslate || a.translate(B((d - b[0]) / 2), B((e - b[1]) / 2)));
          }, j = a.match(k)[1], a = Mb[j] || f && f.width && f.height && [f.width, f.height], h = this.image(j).attr({
            x: b,
            y: c
          }), h.isImg = !0, a ? l(h, a) : (h.attr({
            width: 0,
            height: 0
          }), ba("img", {
            onload: function() {
              this.width === 0 && (M(this, {
                position: "absolute",
                top: "-999em"
              }), A.body.appendChild(this));
              l(h, Mb[j] = [this.width, this.height]);
              this.parentNode && this.parentNode.removeChild(this);
              g.imgCount--;
              if (!g.imgCount && T[g.chartIndex].onload)
                T[g.chartIndex].onload();
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
              i = W(f),
              k = da(f),
              j = W(g),
              g = da(g),
              e = e.end - f < ra ? 0 : 1;
          return ["M", a + c * i, b + c * k, "A", c, c, 0, e, 1, a + c * j, b + c * g, h ? "M" : "L", a + d * j, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * k, h ? "" : "Z"];
        },
        callout: function(a, b, c, d, e) {
          var f = F(e && e.r || 0, c, d),
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
        var e = "highcharts-" + yb++,
            f = this.createElement("clipPath").attr({id: e}).add(this.defs),
            a = this.rect(a, b, c, d, 0).add(f);
        a.id = e;
        a.clipPath = f;
        a.count = 0;
        return a;
      },
      text: function(a, b, c, d) {
        var e = ka || !fa && this.forExport,
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
        a = /px/.test(a) ? C(a) : /em/.test(a) ? parseFloat(a) * 12 : 12;
        c = a < 24 ? a + 3 : B(a * 1.2);
        d = B(c * 0.8);
        return {
          h: c,
          b: d,
          f: a
        };
      },
      rotCorr: function(a, b, c) {
        var d = a;
        b && c && (d = t(d * W(b * ja), 4));
        return {
          x: -a / 3 * da(b * ja),
          y: d
        };
      },
      label: function(a, b, c, d, e, f, g, h, i) {
        var k = this,
            j = k.g(i),
            l = k.text("", 0, 0, g).attr({zIndex: 1}),
            m,
            n,
            q = 0,
            z = 3,
            s = 0,
            o,
            w,
            v,
            S,
            t = 0,
            $ = {},
            x,
            A,
            Ab,
            F,
            D;
        Ab = function() {
          var a,
              b;
          a = l.element.style;
          n = (o === void 0 || w === void 0 || j.styles.textAlign) && r(l.textStr) && l.getBBox();
          j.width = (o || n.width || 0) + 2 * z + s;
          j.height = (w || n.height || 0) + 2 * z;
          x = z + k.fontMetrics(a && a.fontSize, l).b;
          if (A) {
            if (!m)
              a = t, b = (h ? -x : 0) + t, j.box = m = d ? k.symbol(d, a, b, j.width, j.height, $) : k.rect(a, b, j.width, j.height, 0, $["stroke-width"]), m.isImg || m.attr("fill", "none"), m.add(j);
            m.isImg || m.attr(u({
              width: B(j.width),
              height: B(j.height)
            }, $));
            $ = null;
          }
        };
        F = function() {
          var a = j.styles,
              a = a && a.textAlign,
              b = s + z,
              c;
          c = h ? 0 : x;
          if (r(o) && n && (a === "center" || a === "right"))
            b += {
              center: 0.5,
              right: 1
            }[a] * (o - n.width);
          if (b !== l.x || c !== l.y)
            l.attr("x", b), c !== y && l.attr("y", c);
          l.x = b;
          l.y = c;
        };
        D = function(a, b) {
          m ? m.attr(a, b) : $[a] = b;
        };
        j.onAdd = function() {
          l.add(j);
          j.attr({
            text: a || a === 0 ? a : "",
            x: b,
            y: c
          });
          m && r(e) && j.attr({
            anchorX: e,
            anchorY: f
          });
        };
        j.widthSetter = function(a) {
          o = a;
        };
        j.heightSetter = function(a) {
          w = a;
        };
        j.paddingSetter = function(a) {
          if (r(a) && a !== z)
            z = j.padding = a, F();
        };
        j.paddingLeftSetter = function(a) {
          r(a) && a !== s && (s = a, F());
        };
        j.alignSetter = function(a) {
          a = {
            left: 0,
            center: 0.5,
            right: 1
          }[a];
          a !== q && (q = a, n && j.attr({x: v}));
        };
        j.textSetter = function(a) {
          a !== y && l.textSetter(a);
          Ab();
          F();
        };
        j["stroke-widthSetter"] = function(a, b) {
          a && (A = !0);
          t = a % 2 / 2;
          D(b, a);
        };
        j.strokeSetter = j.fillSetter = j.rSetter = function(a, b) {
          b === "fill" && a && (A = !0);
          D(b, a);
        };
        j.anchorXSetter = function(a, b) {
          e = a;
          D(b, B(a) - t - v);
        };
        j.anchorYSetter = function(a, b) {
          f = a;
          D(b, a - S);
        };
        j.xSetter = function(a) {
          j.x = a;
          q && (a -= q * ((o || n.width) + 2 * z));
          v = B(a);
          j.attr("translateX", v);
        };
        j.ySetter = function(a) {
          S = j.y = B(a);
          j.attr("translateY", S);
        };
        var C = j.css;
        return u(j, {
          css: function(a) {
            if (a) {
              var b = {},
                  a = E(a);
              p(j.textProps, function(c) {
                a[c] !== y && (b[c] = a[c], delete a[c]);
              });
              l.css(b);
            }
            return C.call(j, a);
          },
          getBBox: function() {
            return {
              width: n.width + 2 * z,
              height: n.height + 2 * z,
              x: n.x - z,
              y: n.y - z
            };
          },
          shadow: function(a) {
            m && m.shadow(a);
            return j;
          },
          destroy: function() {
            X(j.element, "mouseenter");
            X(j.element, "mouseleave");
            l && (l = l.destroy());
            m && (m = m.destroy());
            O.prototype.destroy.call(j);
            j = k = Ab = F = D = null;
          }
        });
      }
    };
    cb = Da;
    u(O.prototype, {
      htmlCss: function(a) {
        var b = this.element;
        if (b = a && b.tagName === "SPAN" && a.width)
          delete a.width, this.textWidth = b, this.updateTransform();
        if (a && a.textOverflow === "ellipsis")
          a.whiteSpace = "nowrap", a.overflow = "hidden";
        this.styles = u(this.styles, a);
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
          i && p(i, function(a) {
            M(a, {
              marginLeft: c + 1,
              marginTop: d + 1
            });
          });
          this.inverted && p(b.childNodes, function(c) {
            a.invertChild(c, b);
          });
          if (b.tagName === "SPAN") {
            var i = this.rotation,
                j = C(this.textWidth),
                l = k && k.whiteSpace,
                m = [i, g, b.innerHTML, this.textWidth, this.textAlign].join(",");
            if (m !== this.cTT) {
              k = a.fontMetrics(b.style.fontSize).b;
              r(i) && this.setSpanRotation(i, h, k);
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
            if (mb)
              k = b.offsetHeight;
            this.cTT = m;
          }
        } else
          this.alignOnAdd = !0;
      },
      setSpanRotation: function(a, b, c) {
        var d = {},
            e = ya ? "-ms-transform" : mb ? "-webkit-transform" : Na ? "MozTransform" : Kb ? "-o-transform" : "";
        d[e] = d.transform = "rotate(" + a + "deg)";
        d[e + (Na ? "Origin" : "-origin")] = d.transformOrigin = b * 100 + "% " + c + "px";
        M(this.element, d);
      },
      getSpanCorrection: function(a, b, c) {
        this.xCorr = -a * c;
        this.yCorr = -b;
      }
    });
    u(Da.prototype, {html: function(a, b, c) {
        var d = this.createElement("span"),
            e = d.element,
            f = d.renderer,
            g = f.isSVG,
            h = function(a, b) {
              p(["opacity", "visibility"], function(c) {
                fb(a, c + "Setter", function(a, c, d, e) {
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
          x: B(b),
          y: B(c)
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
                p(g.reverse(), function(a) {
                  var d,
                      e = P(a.element, "class");
                  e && (e = {className: e});
                  b = a.div = a.div || ba(Ma, e, {
                    position: "absolute",
                    left: (a.translateX || 0) + "px",
                    top: (a.translateY || 0) + "px",
                    opacity: a.opacity
                  }, b || c);
                  d = b.style;
                  u(a, {
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
    var K;
    if (!fa && !ka) {
      K = {
        init: function(a, b) {
          var c = ["<", b, ' filled="f" stroked="f"'],
              d = ["position: ", "absolute", ";"],
              e = b === Ma;
          (b === "shape" || e) && d.push("left:0;top:0;width:1px;height:1px;");
          d.push("visibility: ", e ? "hidden" : "visible");
          c.push(' style="', d.join(""), '"/>');
          if (b)
            c = e || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = ba(c);
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
        updateTransform: O.prototype.htmlUpdateTransform,
        setSpanRotation: function() {
          var a = this.rotation,
              b = W(a * ja),
              c = da(a * ja);
          M(this.element, {filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : "none"});
        },
        getSpanCorrection: function(a, b, c, d, e) {
          var f = d ? W(d * ja) : 1,
              g = d ? da(d * ja) : 0,
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
            if (J(a[b]))
              c[b] = B(a[b] * 10) - 5;
            else if (a[b] === "Z")
              c[b] = "x";
            else if (c[b] = a[b], a.isArc && (a[b] === "wa" || a[b] === "at"))
              c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1);
          return c.join(" ") || "x";
        },
        clip: function(a) {
          var b = this,
              c;
          a ? (c = a.members, pa(c, b), c.push(b), b.destroyClip = function() {
            pa(c, b);
          }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {clip: lb ? "inherit" : "rect(auto)"});
          return b.css(a);
        },
        css: O.prototype.htmlCss,
        safeRemoveChild: function(a) {
          a.parentNode && Sa(a);
        },
        destroy: function() {
          this.destroyClip && this.destroyClip();
          return O.prototype.destroy.apply(this);
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
            a[c - 4] = a[c - 2] = C(a[c - 2]) - 10 * b;
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
              n,
              q;
          j && typeof j.value !== "string" && (j = "x");
          m = j;
          if (a) {
            n = o(a.width, 3);
            q = (a.opacity || 0.15) / n;
            for (e = 1; e <= 3; e++) {
              l = n * 2 + 1 - 2 * e;
              c && (m = this.cutOffPath(j.value, l + 0.5));
              k = ['<shape isShadow="true" strokeweight="', l, '" filled="false" path="', m, '" coordsize="10 10" style="', f.style.cssText, '" />'];
              h = ba(g.prepVML(k), null, {
                left: C(i.left) + o(a.offsetX, 1),
                top: C(i.top) + o(a.offsetY, 1)
              });
              if (c)
                h.cutOff = l + 1;
              k = ['<stroke color="', a.color || "black", '" opacity="', q * e, '"/>'];
              ba(g.prepVML(k), null, null, h);
              b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
              d.push(h);
            }
            this.shadows = d;
          }
          return this;
        },
        updateShadows: Aa,
        setAttr: function(a, b) {
          lb ? this.element[a] = b : this.element.setAttribute(a, b);
        },
        classSetter: function(a) {
          this.element.className = a;
        },
        dashstyleSetter: function(a, b, c) {
          (c.getElementsByTagName("stroke")[0] || ba(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid";
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
          ba(this.renderer.prepVML(["<", b.split("-")[0], ' opacity="', a, '"/>']), null, null, c);
        },
        opacitySetter: Aa,
        rotationSetter: function(a, b, c) {
          c = c.style;
          this[b] = c[b] = a;
          c.left = -B(da(a * ja) + 1) + "px";
          c.top = B(W(a * ja)) + "px";
        },
        strokeSetter: function(a, b, c) {
          this.setAttr("strokecolor", this.renderer.color(a, c, b, this));
        },
        "stroke-widthSetter": function(a, b, c) {
          c.stroked = !!a;
          this[b] = a;
          J(a) && (a += "px");
          this.setAttr("strokeweight", a);
        },
        titleSetter: function(a, b) {
          this.setAttr(b, a);
        },
        visibilitySetter: function(a, b, c) {
          a === "inherit" && (a = "visible");
          this.shadows && p(this.shadows, function(c) {
            c.style[b] = a;
          });
          c.nodeName === "DIV" && (a = a === "hidden" ? "-999em" : 0, lb || (c.style[b] = a ? "visible" : "hidden"), b = "top");
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
      };
      K["stroke-opacitySetter"] = K["fill-opacitySetter"];
      x.VMLElement = K = qa(O, K);
      K.prototype.ySetter = K.prototype.widthSetter = K.prototype.heightSetter = K.prototype.xSetter;
      var Bb = {
        Element: K,
        isIE8: za.indexOf("MSIE 8.0") > -1,
        init: function(a, b, c, d) {
          var e;
          this.alignedObjects = [];
          d = this.createElement(Ma).css(u(this.getStyle(d), {position: "relative"}));
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
          if (!A.namespaces.hcv) {
            A.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
            try {
              A.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            } catch (f) {
              A.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            }
          }
        },
        isHidden: function() {
          return !this.box.offsetWidth;
        },
        clipRect: function(a, b, c, d) {
          var e = this.createElement(),
              f = Z(a);
          return u(e, {
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
                  d = {clip: "rect(" + B(a ? e : d) + "px," + B(a ? f : b) + "px," + B(a ? b : f) + "px," + B(a ? d : e) + "px)"};
              !a && lb && c === "DIV" && u(d, {
                width: b + "px",
                height: f + "px"
              });
              return d;
            },
            updateClipping: function() {
              p(e.members, function(a) {
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
                n,
                q,
                z,
                s,
                o,
                w = "",
                a = a.stops,
                v,
                S = [],
                r = function() {
                  h = ['<fill colors="' + S.join(",") + '" opacity="', z, '" o:opacity2="', q, '" type="', i, '" ', w, 'focus="100%" method="any" />'];
                  ba(e.prepVML(h), null, null, b);
                };
            n = a[0];
            v = a[a.length - 1];
            n[0] > 0 && a.unshift([0, n[1]]);
            v[0] < 1 && a.push([1, v[1]]);
            p(a, function(a, b) {
              g.test(a[1]) ? (f = ma(a[1]), j = f.get("rgb"), l = f.get("a")) : (j = a[1], l = 1);
              S.push(a[0] * 100 + "% " + j);
              b ? (z = l, s = j) : (q = l, o = j);
            });
            if (c === "fill")
              if (i === "gradient")
                c = m.x1 || m[0] || 0, a = m.y1 || m[1] || 0, n = m.x2 || m[2] || 0, m = m.y2 || m[3] || 0, w = 'angle="' + (90 - Y.atan((m - a) / (n - c)) * 180 / ra) + '"', r();
              else {
                var k = m.r,
                    $ = k * 2,
                    t = k * 2,
                    u = m.cx,
                    y = m.cy,
                    B = b.radialReference,
                    x,
                    k = function() {
                      B && (x = d.getBBox(), u += (B[0] - x.x) / x.width - 0.5, y += (B[1] - x.y) / x.height - 0.5, $ *= B[2] / x.width, t *= B[2] / x.height);
                      w = 'src="' + U.global.VMLRadialGradientURL + '" size="' + $ + "," + t + '" origin="0.5,0.5" position="' + u + "," + y + '" color2="' + o + '" ';
                      r();
                    };
                d.added ? k() : d.onAdd = k;
                k = s;
              }
            else
              k = j;
          } else if (g.test(a) && b.tagName !== "IMG")
            f = ma(a), d[c + "-opacitySetter"](f.get("a"), c, b), k = f.get("rgb");
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
        text: Da.prototype.html,
        path: function(a) {
          var b = {coordsize: "10 10"};
          Ea(a) ? b.d = a : Z(a) && u(b, a);
          return this.createElement("shape").attr(b);
        },
        circle: function(a, b, c) {
          var d = this.symbol("circle");
          if (Z(a))
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
          return this.createElement(Ma).attr(b);
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
          return a === "rect" ? this.symbol(a) : Da.prototype.createElement.call(this, a);
        },
        invertChild: function(a, b) {
          var c = this,
              d = b.style,
              e = a.tagName === "IMG" && a.style;
          M(a, {
            flip: "x",
            left: C(d.width) - (e ? C(e.top) : 1),
            top: C(d.height) - (e ? C(e.left) : 1),
            rotation: -90
          });
          p(a.childNodes, function(b) {
            c.invertChild(b, a);
          });
        },
        symbols: {
          arc: function(a, b, c, d, e) {
            var f = e.start,
                g = e.end,
                h = e.r || c || d,
                c = e.innerR,
                d = W(f),
                i = da(f),
                k = W(g),
                j = da(g);
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
            return Da.prototype.symbols[!r(e) || !e.r ? "square" : "callout"].call(0, a, b, c, d, e);
          }
        }
      };
      x.VMLRenderer = K = function() {
        this.init.apply(this, arguments);
      };
      K.prototype = E(Da.prototype, Bb);
      cb = K;
    }
    Da.prototype.measureSpanWidth = function(a, b) {
      var c = A.createElement("span"),
          d;
      d = A.createTextNode(a);
      c.appendChild(d);
      M(c, b);
      this.box.appendChild(c);
      d = c.offsetWidth;
      Sa(c);
      return d;
    };
    var Nb;
    if (ka)
      x.CanVGRenderer = K = function() {
        Ha = "http://www.w3.org/1999/xhtml";
      }, K.prototype.symbols = {}, Nb = function() {
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
              var e = A.getElementsByTagName("head")[0],
                  f = A.createElement("script");
              f.type = "text/javascript";
              f.src = d;
              f.onload = a;
              e.appendChild(f);
            }
            b.push(c);
          }};
      }(), cb = K;
    Va.prototype = {
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
          value: a.isLog ? ca(a.lin2log(e)) : e
        });
        r(d) ? d && d.attr({text: b}) : (this.labelLength = (this.label = d = r(b) && g.enabled ? c.renderer.text(b, 0, 0, g.useHTML).css(E(g.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0);
      },
      getLabelSize: function() {
        return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
      },
      handleOverflow: function(a) {
        var b = this.axis,
            c = a.x,
            d = b.chart.chartWidth,
            e = b.chart.spacing,
            f = o(b.labelLeft, F(b.pos, e[3])),
            e = o(b.labelRight, t(b.pos + b.len, d - e[1])),
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
            n,
            q = {};
        if (h)
          h < 0 && c - i * k < f ? n = B(c / W(h * ja) - f) : h > 0 && c + i * k > e && (n = B((d - c) / W(h * ja)));
        else if (d = c + (1 - i) * k, c - i * k < f ? l = a.x + l * (1 - i) - f : d > e && (l = e - a.x + l * i, m = -1), l = F(j, l), l < j && b.labelAlign === "center" && (a.x += m * (j - l - i * (j - F(k, l)))), k > l || b.autoRotation && g.styles.width)
          n = l;
        if (n) {
          q.width = n;
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
            n = e.y;
        r(n) || (n = i.side === 0 ? c.rotation ? -8 : -c.getBBox().height : i.side === 2 ? m.y + 8 : W(c.rotation * ja) * (m.y - c.getBBox(!1, 0).height / 2));
        a = a + e.x + m.x - (f && d ? f * k * (j ? -1 : 1) : 0);
        b = b + n - (f && !d ? f * k * (j ? 1 : -1) : 0);
        l && (c = g / (h || 1) % l, i.opposite && (c = l - c - 1), b += c * (i.labelOffset / l));
        return {
          x: a,
          y: B(b)
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
            n = h ? h + "Tick" : "tick",
            q = e[m + "LineWidth"],
            z = e[m + "LineColor"],
            s = e[m + "LineDashStyle"],
            m = d.tickSize(n),
            n = e[n + "Color"],
            p = this.mark,
            w = j.step,
            v = !0,
            S = d.tickmarkOffset,
            r = this.getPosition(g, k, S, b),
            $ = r.x,
            r = r.y,
            t = g && $ === d.pos + d.len || !g && r === d.pos ? -1 : 1,
            c = o(c, 1);
        this.isActive = !0;
        if (q) {
          k = d.getPlotLinePath(k + S, q * t, b, !0);
          if (l === y) {
            l = {
              stroke: z,
              "stroke-width": q
            };
            if (s)
              l.dashstyle = s;
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
          d.opposite && (m[0] = -m[0]), h = this.getMarkPath($, r, m[0], m[1] * t, g, f), p ? p.animate({
            d: h,
            opacity: c
          }) : this.mark = f.path(h).attr({
            stroke: n,
            "stroke-width": m[1],
            opacity: c
          }).add(d.axisGroup);
        if (i && J($))
          i.xy = r = this.getLabelPosition($, r, i, g, j, S, a, w), this.isFirst && !this.isLast && !o(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !o(e.showLastLabel, 1) ? v = !1 : g && !d.isRadial && !j.step && !j.rotation && !b && c !== 0 && this.handleOverflow(r), w && a % w && (v = !1), v && J(r.y) ? (r.opacity = c, i[this.isNew ? "attr" : "animate"](r), this.isNew = !1) : i.attr("y", -9999);
      },
      destroy: function() {
        Ra(this, this.axis);
      }
    };
    x.PlotLineOrBand = function(a, b) {
      this.axis = a;
      if (b)
        this.options = b, this.id = b.id;
    };
    x.PlotLineOrBand.prototype = {
      render: function() {
        var a = this,
            b = a.axis,
            c = b.horiz,
            d = a.options,
            e = d.label,
            f = a.label,
            g = d.width,
            h = d.to,
            i = d.from,
            k = r(i) && r(h),
            j = d.value,
            l = d.dashStyle,
            m = a.svgElem,
            n = [],
            q,
            z = d.color,
            s = o(d.zIndex, 0),
            p = d.events,
            w = {},
            v = b.chart.renderer,
            n = b.log2lin;
        b.isLog && (i = n(i), h = n(h), j = n(j));
        if (g) {
          if (n = b.getPlotLinePath(j, g), w = {
            stroke: z,
            "stroke-width": g
          }, l)
            w.dashstyle = l;
        } else if (k) {
          n = b.getPlotBandPath(i, h, d);
          if (z)
            w.fill = z;
          if (d.borderWidth)
            w.stroke = d.borderColor, w["stroke-width"] = d.borderWidth;
        } else
          return;
        w.zIndex = s;
        if (m)
          if (n)
            m.show(), m.animate({d: n});
          else {
            if (m.hide(), f)
              a.label = f = f.destroy();
          }
        else if (n && n.length && (a.svgElem = m = v.path(n).attr(w).add(), p))
          for (q in d = function(b) {
            m.on(b, function(c) {
              p[b].apply(a, [c]);
            });
          }, p)
            d(q);
        e && r(e.text) && n && n.length && b.width > 0 && b.height > 0 && !n.flat ? (e = E({
          align: c && k && "center",
          x: c ? !k && 4 : 10,
          verticalAlign: !c && k && "middle",
          y: c ? k ? 16 : 10 : k ? 6 : -4,
          rotation: c && !k && 90
        }, e), this.renderLabel(e, n, k, s)) : f && f.hide();
        return a;
      },
      renderLabel: function(a, b, c, d) {
        var e = this.label,
            f = this.axis.chart.renderer;
        if (!e)
          e = {
            align: a.textAlign || a.align,
            rotation: a.rotation
          }, e.zIndex = d, this.label = e = f.text(a.text, 0, 0, a.useHTML).attr(e).css(a.style).add();
        d = [b[1], b[4], c ? b[6] : b[1]];
        b = [b[2], b[5], c ? b[7] : b[2]];
        c = La(d);
        f = La(b);
        e.align(a, !1, {
          x: c,
          y: f,
          width: Ga(d) - c,
          height: Ga(b) - f
        });
        e.show();
      },
      destroy: function() {
        pa(this.axis.plotLinesAndBands, this);
        delete this.axis;
        Ra(this);
      }
    };
    var ha = x.Axis = function() {
      this.init.apply(this, arguments);
    };
    ha.prototype = {
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
            return x.numberFormat(this.total, -1);
          },
          style: E(ea.line.dataLabels.style, {color: "#000000"})
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
        this.isLinked = r(d.linkedTo);
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
        this.crosshair = o(d.crosshair, ta(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
        var f,
            d = this.options.events;
        sa(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
        this.series = this.series || [];
        if (a.inverted && c && this.reversed === y)
          this.reversed = !0;
        this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
        for (f in d)
          N(this, f, d[f]);
        if (this.isLog)
          this.val2lin = this.log2lin, this.lin2val = this.lin2log;
      },
      setOptions: function(a) {
        this.options = E(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], E(U[this.coll], a));
      },
      defaultLabelFormatter: function() {
        var a = this.axis,
            b = this.value,
            c = a.categories,
            d = this.dateTimeLabelFormat,
            e = U.lang.numericSymbols,
            f = e && e.length,
            g,
            h = a.options.labels.format,
            a = a.isLog ? b : a.tickInterval;
        if (h)
          g = Ka(h, this);
        else if (c)
          g = b;
        else if (d)
          g = Qa(d, b);
        else if (f && a >= 1E3)
          for (; f-- && g === y; )
            c = Math.pow(1E3, f + 1), a >= c && b * 10 % c === 0 && e[f] !== null && (g = x.numberFormat(b / c, -1) + e[f]);
        g === y && (g = Q(b) >= 1E4 ? x.numberFormat(b, -1) : x.numberFormat(b, -1, y, ""));
        return g;
      },
      getSeriesExtremes: function() {
        var a = this,
            b = a.chart;
        a.hasVisibleSeries = !1;
        a.dataMin = a.dataMax = a.threshold = null;
        a.softThreshold = !a.isXAxis;
        a.buildStacks && a.buildStacks();
        p(a.series, function(c) {
          if (c.visible || !b.options.chart.ignoreHiddenSeries) {
            var d = c.options,
                e = d.threshold,
                f;
            a.hasVisibleSeries = !0;
            a.isLog && e <= 0 && (e = null);
            if (a.isXAxis) {
              if (d = c.xData, d.length)
                c = La(d), !J(c) && !(c instanceof la) && (d = Ba(d, function(a) {
                  return J(a);
                }), c = La(d)), a.dataMin = F(o(a.dataMin, d[0]), c), a.dataMax = t(o(a.dataMax, d[0]), Ga(d));
            } else {
              c.getExtremes();
              f = c.dataMax;
              c = c.dataMin;
              if (r(c) && r(f))
                a.dataMin = F(o(a.dataMin, c), c), a.dataMax = t(o(a.dataMax, f), f);
              if (r(e))
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
        b ? (a = a * h + i, a -= j, a = a / k + d, e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)), f === "between" && (f = 0.5), a = h * (a - d) * k + i + h * j + (J(f) ? k * f * g.pointRange : 0));
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
        var n = function(a, b, c) {
          if (a < b || a > c)
            d ? a = F(t(b, a), c) : m = !0;
          return a;
        },
            e = o(e, this.translate(a, null, null, c)),
            a = c = B(e + i);
        i = k = B(j - e - i);
        J(e) ? this.horiz ? (i = h, k = j - this.bottom, a = c = n(a, g, g + this.width)) : (a = g, c = l - this.right, i = k = n(i, h, h + this.height)) : m = !0;
        return m && !d ? null : f.renderer.crispLine(["M", a, i, "L", c, k], b || 1);
      },
      getLinearTickPositions: function(a, b, c) {
        var d,
            e = ca(V(b / a) * a),
            f = ca(ua(c / a) * a),
            g = [];
        if (b === c && J(b))
          return [b];
        for (b = e; b <= f; ) {
          g.push(b);
          b = ca(b + a);
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
        if (this.isXAxis && this.minRange === y && !this.isLog)
          r(a.min) || r(a.max) ? this.minRange = null : (p(this.series, function(a) {
            i = a.xData;
            for (g = k = a.xIncrement ? 1 : i.length - 1; g > 0; g--)
              if (h = i[g] - i[g - 1], f === y || h < f)
                f = h;
          }), this.minRange = F(f * 5, this.dataMax - this.dataMin));
        if (c - b < this.minRange) {
          j = this.minRange;
          d = (j - c + b) / 2;
          d = [b - d, o(a.min, b - d)];
          if (e)
            d[2] = this.dataMin;
          b = Ga(d);
          c = [b + j, o(a.max, b + j)];
          if (e)
            c[2] = this.dataMax;
          c = La(c);
          c - b < j && (d[0] = c - j, d[1] = o(a.min, c - j), b = Ga(d));
        }
        this.min = b;
        this.max = c;
      },
      getClosest: function() {
        var a;
        p(this.series, function(b) {
          var c = b.closestPointRange;
          !b.noSharedTooltip && r(c) && (a = r(a) ? F(a, c) : c);
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
          if (h ? (f = h.minPointOffset, g = h.pointRangePadding) : (e = b.getClosest(), p(b.series, function(a) {
            var c = i ? 1 : j ? o(a.options.pointRange, e, 0) : b.axisPointRange || 0,
                a = a.options.pointPlacement;
            d = t(d, c);
            b.single || (f = t(f, xa(a) ? 0 : c / 2), g = t(g, a === "on" ? 0 : c));
          })), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = F(d, c), j)
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
            n = b.categories,
            q = b.threshold,
            z = b.softThreshold,
            s,
            G,
            w,
            v;
        !g && !n && !i && this.getTickAmount();
        w = o(b.userMin, d.min);
        v = o(b.userMax, d.max);
        i ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = o(c.min, c.dataMin), b.max = o(c.max, c.dataMax), d.type !== b.linkedParent.options.type && aa(11, 1)) : (!z && r(q) && (b.dataMin >= q ? (s = q, j = 0) : b.dataMax <= q && (G = q, k = 0)), b.min = o(w, s, b.dataMin), b.max = o(v, G, b.dataMax));
        if (e)
          !a && F(b.min, o(b.dataMin, b.min)) <= 0 && aa(10, 1), b.min = ca(f(b.min), 15), b.max = ca(f(b.max), 15);
        if (b.range && r(b.max))
          b.userMin = b.min = w = t(b.min, b.minFromRange()), b.userMax = v = b.max, b.range = null;
        I(b, "foundExtremes");
        b.beforePadding && b.beforePadding();
        b.adjustForMinRange();
        if (!n && !b.axisPointRange && !b.usePercentage && !i && r(b.min) && r(b.max) && (f = b.max - b.min))
          !r(w) && j && (b.min -= f * j), !r(v) && k && (b.max += f * k);
        if (J(d.floor))
          b.min = t(b.min, d.floor);
        if (J(d.ceiling))
          b.max = F(b.max, d.ceiling);
        if (z && r(b.dataMin))
          if (q = q || 0, !r(w) && b.min < q && b.dataMin >= q)
            b.min = q;
          else if (!r(v) && b.max > q && b.dataMax <= q)
            b.max = q;
        b.tickInterval = b.min === b.max || b.min === void 0 || b.max === void 0 ? 1 : i && !l && m === b.linkedParent.options.tickPixelInterval ? l = b.linkedParent.tickInterval : o(l, this.tickAmount ? (b.max - b.min) / t(this.tickAmount - 1, 1) : void 0, n ? 1 : (b.max - b.min) * m / t(b.len, m));
        h && !a && p(b.series, function(a) {
          a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
        });
        b.setAxisTranslation(!0);
        b.beforeSetTickPositions && b.beforeSetTickPositions();
        if (b.postProcessTickInterval)
          b.tickInterval = b.postProcessTickInterval(b.tickInterval);
        if (b.pointRange && !l)
          b.tickInterval = t(b.pointRange, b.tickInterval);
        a = o(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
        if (!l && b.tickInterval < a)
          b.tickInterval = a;
        if (!g && !e && !l)
          b.tickInterval = sb(b.tickInterval, null, rb(b.tickInterval), o(d.allowDecimals, !(b.tickInterval > 0.5 && b.tickInterval < 5 && b.max > 1E3 && b.max < 9999)), !!this.tickAmount);
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
          this.trimTicks(b, e, f), this.min === this.max && r(this.min) && !this.tickAmount && (g = !0, this.min -= 0.5, this.max += 0.5), this.single = g, !c && !d && this.adjustTickAmount();
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
        a.length === 0 && r(d) && a.push((e + d) / 2);
      },
      alignToOthers: function() {
        var a = {},
            b,
            c = this.options;
        this.chart.options.chart.alignTicks !== !1 && c.alignTicks !== !1 && p(this.chart[this.coll], function(c) {
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
        !r(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
        !b && this.alignToOthers() && (b = ua(this.len / c) + 1);
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
            b.push(ca(b[b.length - 1] + a));
          this.transA *= (e - 1) / (c - 1);
          this.max = b[b.length - 1];
        } else
          e > c && (this.tickInterval *= 2, this.setTickPositions());
        if (r(d)) {
          for (a = c = b.length; a--; )
            (d === 3 && a % 2 === 1 || d <= 2 && a > 0 && a < c - 1) && b.splice(a, 1);
          this.finalTickAmt = y;
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
        p(this.series, function(b) {
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
        p(f.series, function(a) {
          delete a.kdTree;
        });
        e = u(e, {
          min: a,
          max: b
        });
        I(f, "setExtremes", e, function() {
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
            f = F(c, o(e.min, c)),
            e = t(d, o(e.max, d));
        this.allowZoomOutside || (r(c) && a <= f && (a = f), r(d) && b >= e && (b = e));
        this.displayBtn = a !== y || b !== y;
        this.setExtremes(a, b, !1, y, {trigger: "zoom"});
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
        this.len = t(d ? e : f, 0);
        this.pos = d ? b : g;
      },
      getExtremes: function() {
        var a = this.isLog,
            b = this.lin2log;
        return {
          min: a ? ca(b(this.min)) : this.min,
          max: a ? ca(b(this.max)) : this.max,
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
              a = a > 1 ? ua(a) : 1;
              return a * c;
            };
        b ? (j = !a.staggerLines && !a.step && (r(g) ? [g] : e < o(a.autoRotationLimit, 80) && a.autoRotation)) && p(j, function(a) {
          var b;
          if (a === g || a && a >= -90 && a <= 90)
            i = l(Q(h.h / da(ja * a))), b = i + Q(a / 360), b < k && (k = b, f = a, d = i);
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
            h = t(1, B(g - 2 * (e.padding || 5))),
            i = {},
            k = this.labelMetrics(),
            j = e.style.textOverflow,
            l,
            m = 0,
            n,
            q;
        if (!xa(e.rotation))
          i.rotation = e.rotation || 0;
        if (this.autoRotation)
          p(c, function(a) {
            if ((a = d[a]) && a.labelLength > m)
              m = a.labelLength;
          }), m > h && m > k.h ? i.rotation = this.labelRotation : this.labelRotation = 0;
        else if (g && (l = {width: h + "px"}, !j)) {
          l.textOverflow = "clip";
          for (n = c.length; !f && n--; )
            if (q = c[n], h = d[q].label)
              if (h.styles.textOverflow === "ellipsis" ? h.css({textOverflow: "clip"}) : d[q].labelLength > g && h.css({width: g + "px"}), h.getBBox().height > this.len / c.length - (k.h - k.f))
                h.specCss = {textOverflow: "ellipsis"};
        }
        if (i.rotation && (l = {width: (m > a.chartHeight * 0.5 ? a.chartHeight * 0.33 : a.chartHeight) + "px"}, !j))
          l.textOverflow = "ellipsis";
        if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation))
          i.align = this.labelAlign;
        p(c, function(a) {
          var b = (a = d[a]) && a.label;
          if (b)
            b.attr(i), l && b.css(E(l, b.specCss)), delete b.specCss, a.rotation = i.rotation;
        });
        this.tickRotCorr = b.rotCorr(k.b, this.labelRotation || 0, this.side !== 0);
      },
      hasData: function() {
        return this.hasVisibleSeries || r(this.min) && r(this.max) && !!this.tickPositions;
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
            n = 0,
            q = d.title,
            z = d.labels,
            s = 0,
            G = a.opposite,
            w = b.axisOffset,
            b = b.clipOffset,
            v = [-1, 1, 1, -1][h],
            S,
            u = a.axisParent,
            $ = this.tickSize("tick");
        k = a.hasData();
        a.showAxis = j = k || o(d.showEmpty, !0);
        a.staggerLines = a.horiz && z.staggerLines;
        if (!a.axisGroup)
          a.gridGroup = c.g("grid").attr({zIndex: d.gridZIndex || 1}).add(u), a.axisGroup = c.g("axis").attr({zIndex: d.zIndex || 2}).add(u), a.labelGroup = c.g("axis-labels").attr({zIndex: z.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add(u);
        if (k || a.isLinked) {
          if (p(e, function(b) {
            f[b] ? f[b].addLabel() : f[b] = new Va(a, b);
          }), a.renderUnsquish(), z.reserveSpace !== !1 && (h === 0 || h === 2 || {
            1: "left",
            3: "right"
          }[h] === a.labelAlign || a.labelAlign === "center") && p(e, function(a) {
            s = t(f[a].getLabelSize(), s);
          }), a.staggerLines)
            s *= a.staggerLines, a.labelOffset = s * (a.opposite ? -1 : 1);
        } else
          for (S in f)
            f[S].destroy(), delete f[S];
        if (q && q.text && q.enabled !== !1) {
          if (!a.axisTitle)
            (S = q.textAlign) || (S = (g ? {
              low: "left",
              middle: "center",
              high: "right"
            } : {
              low: G ? "right" : "left",
              middle: "center",
              high: G ? "left" : "right"
            })[q.align]), a.axisTitle = c.text(q.text, 0, 0, q.useHTML).attr({
              zIndex: 7,
              rotation: q.rotation || 0,
              align: S
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(q.style).add(a.axisGroup), a.axisTitle.isNew = !0;
          if (j)
            l = a.axisTitle.getBBox()[g ? "height" : "width"], m = q.offset, n = r(m) ? 0 : o(q.margin, g ? 5 : 10);
          a.axisTitle[j ? "show" : "hide"](!0);
        }
        a.offset = v * o(d.offset, w[h]);
        a.tickRotCorr = a.tickRotCorr || {
          x: 0,
          y: 0
        };
        c = h === 0 ? -a.labelMetrics().h : h === 2 ? a.tickRotCorr.y : 0;
        n = Math.abs(s) + n;
        s && (n -= c, n += v * (g ? o(z.y, a.tickRotCorr.y + v * 8) : z.x));
        a.axisTitleMargin = o(m, n);
        w[h] = t(w[h], a.axisTitleMargin + l + v * a.offset, n, k && e.length && $ ? $[0] : 0);
        d = d.offset ? 0 : V(d.lineWidth / 2) * 2;
        b[i] = t(b[i], d);
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
            j = C(e.style.fontSize || 12),
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
            n = d.alternateGridColor,
            q = a.tickmarkOffset,
            z = d.lineWidth,
            s,
            o = b.hasRendered && J(a.oldMin),
            w = a.showAxis,
            v = $a(c.globalAnimation),
            r,
            t;
        a.labelEdge.length = 0;
        a.overlap = !1;
        p([k, j, l], function(a) {
          for (var b in a)
            a[b].isActive = !1;
        });
        if (a.hasData() || g) {
          a.minorTickInterval && !a.categories && p(a.getMinorTickPositions(), function(b) {
            j[b] || (j[b] = new Va(a, b, "minor"));
            o && j[b].isNew && j[b].render(null, !0);
            j[b].render(null, !1, 1);
          });
          if (h.length && (p(h, function(b, c) {
            if (!g || b >= a.min && b <= a.max)
              k[b] || (k[b] = new Va(a, b)), o && k[b].isNew && k[b].render(c, !0, 0.1), k[b].render(c);
          }), q && (a.min === 0 || a.single)))
            k[-1] || (k[-1] = new Va(a, -1, null, !0)), k[-1].render(-1);
          n && p(h, function(c, d) {
            t = h[d + 1] !== y ? h[d + 1] + q : a.max - q;
            if (d % 2 === 0 && c < a.max && t <= a.max + (b.polar ? -q : q))
              l[c] || (l[c] = new x.PlotLineOrBand(a)), r = c + q, l[c].options = {
                from: e ? f(r) : r,
                to: e ? f(t) : t,
                color: n
              }, l[c].render(), l[c].isActive = !0;
          });
          if (!a._addedPlotLB)
            p((d.plotLines || []).concat(d.plotBands || []), function(b) {
              a.addPlotBandOrLine(b);
            }), a._addedPlotLB = !0;
        }
        p([k, j, l], function(a) {
          var c,
              d,
              e = [],
              f = v.duration;
          for (c in a)
            if (!a[c].isActive)
              a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c);
          Pa(function() {
            for (d = e.length; d--; )
              a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]]);
          }, a === l || !b.hasRendered || !f ? 0 : f);
        });
        if (z)
          s = a.getLinePath(z), a.axisLine ? a.axisLine.animate({d: s}) : a.axisLine = c.path(s).attr({
            stroke: d.lineColor,
            "stroke-width": z,
            zIndex: 7
          }).add(a.axisGroup), a.axisLine[w ? "show" : "hide"](!0);
        if (i && w)
          i[i.isNew ? "attr" : "animate"](a.getTitlePosition()), i.isNew = !1;
        m && m.enabled && a.renderStackTotals();
        a.isDirty = !1;
      },
      redraw: function() {
        this.visible && (this.render(), p(this.plotLinesAndBands, function(a) {
          a.render();
        }));
        p(this.series, function(a) {
          a.isDirty = !0;
        });
      },
      destroy: function(a) {
        var b = this,
            c = b.stacks,
            d,
            e = b.plotLinesAndBands;
        a || X(b);
        for (d in c)
          Ra(c[d]), c[d] = null;
        p([b.ticks, b.minorTicks, b.alternateBands], function(a) {
          Ra(a);
        });
        for (a = e.length; a--; )
          e[a].destroy();
        p("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
          b[a] && (b[a] = b[a].destroy());
        });
        this.cross && this.cross.destroy();
      },
      drawCrosshair: function(a, b) {
        var c,
            d = this.crosshair,
            e,
            f;
        if (!this.crosshair || (r(b) || !o(d.snap, !0)) === !1)
          this.hideCrosshair();
        else if (o(d.snap, !0) ? r(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : o(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, c === null)
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
    u(ha.prototype, {
      getPlotBandPath: function(a, b) {
        var c = this.getPlotLinePath(b, null, null, !0),
            d = this.getPlotLinePath(a, null, null, !0);
        d && c ? (d.flat = d.toString() === c.toString(), d.push(c[4], c[5], c[1], c[2])) : d = null;
        return d;
      },
      addPlotBand: function(a) {
        return this.addPlotBandOrLine(a, "plotBands");
      },
      addPlotLine: function(a) {
        return this.addPlotBandOrLine(a, "plotLines");
      },
      addPlotBandOrLine: function(a, b) {
        var c = (new x.PlotLineOrBand(this, a)).render(),
            d = this.userOptions;
        c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c));
        return c;
      },
      removePlotBandOrLine: function(a) {
        for (var b = this.plotLinesAndBands,
            c = this.options,
            d = this.userOptions,
            e = b.length; e--; )
          b[e].id === a && b[e].destroy();
        p([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function(b) {
          for (e = b.length; e--; )
            b[e].id === a && pa(b, b[e]);
        });
      }
    });
    ha.prototype.getTimeTicks = function(a, b, c, d) {
      var e = [],
          f = {},
          g = U.global.useUTC,
          h,
          i = new la(b - Ya(b)),
          k = a.unitRange,
          j = a.count;
      if (r(b)) {
        i[Fb](k >= H.second ? 0 : j * V(i.getMilliseconds() / j));
        if (k >= H.second)
          i[Gb](k >= H.minute ? 0 : j * V(i.getSeconds() / j));
        if (k >= H.minute)
          i[Hb](k >= H.hour ? 0 : j * V(i[tb]() / j));
        if (k >= H.hour)
          i[Ib](k >= H.day ? 0 : j * V(i[ub]() / j));
        if (k >= H.day)
          i[kb](k >= H.month ? 1 : j * V(i[Ua]() / j));
        k >= H.month && (i[wb](k >= H.year ? 0 : j * V(i[ab]() / j)), h = i[bb]());
        k >= H.year && (h -= h % j, i[xb](h));
        if (k === H.week)
          i[kb](i[Ua]() - i[vb]() + o(d, 1));
        b = 1;
        if (qb || Za)
          i = i.getTime(), i = new la(i + Ya(i));
        h = i[bb]();
        for (var d = i.getTime(),
            l = i[ab](),
            m = i[Ua](),
            n = !g || !!Za,
            q = (H.day + (g ? Ya(i) : i.getTimezoneOffset() * 6E4)) % H.day; d < c; )
          e.push(d), k === H.year ? d = jb(h + b * j, 0) : k === H.month ? d = jb(h, l + b * j) : n && (k === H.day || k === H.week) ? d = jb(h, l, m + b * j * (k === H.day ? 1 : 7)) : d += k * j, b++;
        e.push(d);
        p(Ba(e, function(a) {
          return k <= H.hour && a % H.day === q;
        }), function(a) {
          f[a] = "day";
        });
      }
      e.info = u(a, {
        higherRanks: f,
        totalRange: k * j
      });
      return e;
    };
    ha.prototype.normalizeTimeTickInterval = function(a, b) {
      var c = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]],
          d = c[c.length - 1],
          e = H[d[0]],
          f = d[1],
          g;
      for (g = 0; g < c.length; g++)
        if (d = c[g], e = H[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + H[c[g + 1][0]]) / 2)
          break;
      e === H.year && a < 5 * e && (f = [1, 2, 5]);
      c = sb(a / e, f, d[0] === "year" ? t(rb(a / e), 1) : 1);
      return {
        unitRange: e,
        count: c,
        unitName: d[0]
      };
    };
    ha.prototype.getLogTickPositions = function(a, b, c, d) {
      var e = this.options,
          f = this.len,
          g = this.lin2log,
          h = this.log2lin,
          i = [];
      if (!d)
        this._minorAutoInterval = null;
      if (a >= 0.5)
        a = B(a), i = this.getLinearTickPositions(a, b, c);
      else if (a >= 0.08)
        for (var f = V(b),
            k,
            j,
            l,
            m,
            n,
            e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !n; f++) {
          j = e.length;
          for (k = 0; k < j && !n; k++)
            l = h(g(f) * e[k]), l > b && (!d || m <= c) && m !== y && i.push(m), m > c && (n = !0), m = l;
        }
      else if (b = g(b), c = g(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = o(a === "auto" ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = sb(a, null, rb(a)), i = Ca(this.getLinearTickPositions(a, b, c), h), !d)
        this._minorAutoInterval = a / 5;
      if (!d)
        this.tickInterval = a;
      return i;
    };
    ha.prototype.log2lin = function(a) {
      return Y.log(a) / Y.LN10;
    };
    ha.prototype.lin2log = function(a) {
      return Y.pow(10, a);
    };
    var Ob = x.Tooltip = function() {
      this.init.apply(this, arguments);
    };
    Ob.prototype = {
      init: function(a, b) {
        var c = b.borderWidth,
            d = b.style,
            e = C(d.padding);
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
        ka || this.label.shadow(b.shadow);
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
            g = e.options.animation !== !1 && !e.isHidden && (Q(a - f.x) > 1 || Q(b - f.y) > 1),
            h = e.followPointer || e.len > 1;
        u(f, {
          x: g ? (2 * f.x + a) / 3 : a,
          y: g ? (f.y + b) / 2 : b,
          anchorX: h ? y : g ? (2 * f.anchorX + c) / 3 : c,
          anchorY: h ? y : g ? (f.anchorY + d) / 2 : d
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
          this.hideTimer = Pa(function() {
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
            a = ta(a);
        c = a[0].tooltipPos;
        this.followPointer && b && (b.chartX === y && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
        c || (p(a, function(a) {
          k = a.series.yAxis;
          j = a.series.xAxis;
          h += a.plotX + (!e && j ? j.left - g : 0);
          i += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && k ? k.top - f : 0);
        }), h /= a.length, i /= a.length, c = [e ? d.plotWidth - i : h, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - h : i]);
        return Ca(c, B);
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
                  m = d + e + c < b,
                  l = d - e - c;
              d += e;
              if (j && m)
                f[a] = d;
              else if (!j && k)
                f[a] = l;
              else if (k)
                f[a] = F(i - c, l - g < 0 ? l : l - g);
              else if (m)
                f[a] = t(h, d + g + c > b ? d : d + g);
              else
                return !1;
            },
            m = function(a, b, c, d) {
              var g;
              d < e || d > b - e ? g = !1 : f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
              return g;
            },
            n = function(a) {
              var b = i;
              i = k;
              k = b;
              h = a;
            },
            q = function() {
              l.apply(0, i) !== !1 ? m.apply(0, k) === !1 && !h && (n(!0), q()) : h ? f.x = f.y = 0 : (n(!0), q());
            };
        (d.inverted || this.len > 1) && n();
        q();
        return f;
      },
      defaultFormatter: function(a) {
        var b = this.points || ta(this),
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
        this.followPointer = ta(a)[0].series.tooltipOptions.followPointer;
        h = this.getAnchor(a, b);
        f = h[0];
        g = h[1];
        m && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, i && p(i, function(a) {
          a.setState();
        }), p(a, function(a) {
          a.setState("hover");
          j.push(a.getLabelConfig());
        }), i = {
          x: a[0].category,
          y: a[0].y
        }, i.points = j, this.len = j.length, a = a[0]) : i = a.getLabelConfig();
        k = k.call(i, this);
        i = a.series;
        this.distance = o(i.tooltipOptions.distance, 16);
        k === !1 ? this.hide() : (this.isHidden && (Oa(d), d.attr("opacity", 1).show()), d.attr({text: k}), l = e.borderColor || a.color || i.color || "#606060", d.attr({stroke: l}), this.updatePosition({
          plotX: f,
          plotY: g,
          negative: a.negative,
          ttBelow: a.ttBelow,
          h: h[2] || 0
        }), this.isHidden = !1);
        I(c, "tooltipRefresh", {
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
        this.move(B(c.x), B(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop);
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
          h = Qa("%m-%d %H:%M:%S.%L", a.x);
          for (f in H) {
            if (e === H.week && +Qa("%w", a.x) === c.options.startOfWeek && h.substr(6) === "00:00:00.000") {
              f = "week";
              break;
            }
            if (H[f] > e) {
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
            h = g && g.options.type === "datetime" && J(a.key),
            c = e[c + "Format"];
        h && !f && (f = this.getXDateFormat(a, e, g));
        h && f && (c = c.replace("{point.key}", "{point.key:" + f + "}"));
        return Ka(c, {
          point: a,
          series: d
        });
      },
      bodyFormatter: function(a) {
        return Ca(a, function(a) {
          var c = a.series.tooltipOptions;
          return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat);
        });
      }
    };
    var ia;
    db = A && A.documentElement.ontouchstart !== y;
    var Xa = x.Pointer = function(a, b) {
      this.init(a, b);
    };
    Xa.prototype = {
      init: function(a, b) {
        var c = b.chart,
            d = c.events,
            e = ka ? "" : c.zoomType,
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
        if (x.Tooltip && b.tooltip.enabled)
          a.tooltip = new Ob(a, b.tooltip), this.followTouchMove = o(b.tooltip.followTouchMove, !0);
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
          this.chartPosition = b = zb(this.chart.container);
        d.pageX === y ? (c = t(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
        return u(a, {
          chartX: B(c),
          chartY: B(d)
        });
      },
      getCoordinates: function(a) {
        var b = {
          xAxis: [],
          yAxis: []
        };
        p(this.chart.axes, function(c) {
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
            n;
        if (!e && !g)
          for (h = 0; h < c.length; h++)
            if (c[h].directTouch || !c[h].options.stickyTracking)
              c = [];
        g && (e ? g.noSharedTooltip : g.directTouch) && f ? m = [f] : (p(c, function(b) {
          k = b.noSharedTooltip && e;
          j = !e && b.directTouch;
          b.visible && !k && !j && o(b.options.enableMouseTracking, !0) && (n = b.searchPoint(a, !k && b.kdDimensions === 1)) && l.push(n);
        }), p(l, function(a) {
          a && p(["dist", "distX"], function(b, c) {
            if (J(a[b])) {
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
            l.length && d && d.refresh(l, a), p(l, function(b) {
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
            if (T[ia])
              T[ia].pointer.onDocumentMouseMove(a);
          }, N(A, "mousemove", this._onDocumentMouseMove);
        p(e ? l : [o(f, m[1])], function(c) {
          p(b.axes, function(b) {
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
        a && h && p(ta(h), function(b) {
          b.series.isCartesian && b.plotX === void 0 && (a = !1);
        });
        if (a)
          g && h && (g.refresh(h), e && (e.setState(e.state, !0), p(c.axes, function(a) {
            o(a.crosshair && a.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair();
          })));
        else {
          if (e)
            e.onMouseOut();
          f && p(f, function(a) {
            a.setState();
          });
          if (d)
            d.onMouseOut();
          g && g.hide(b);
          if (this._onDocumentMouseMove)
            X(A, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null;
          p(c.axes, function(a) {
            a.hideCrosshair();
          });
          this.hoverX = c.hoverPoints = c.hoverPoint = null;
        }
      },
      scaleGroups: function(a, b) {
        var c = this.chart,
            d;
        p(c.series, function(e) {
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
            n = this.mouseDownX,
            q = this.mouseDownY,
            o = c.panKey && a[c.panKey + "Key"];
        if (!m || !m.touch)
          if (d < h ? d = h : d > h + k && (d = h + k), e < i ? e = i : e > i + j && (e = i + j), this.hasDragged = Math.sqrt(Math.pow(n - d, 2) + Math.pow(q - e, 2)), this.hasDragged > 10) {
            l = b.isInsidePlot(n - h, q - i);
            if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !o && !m)
              this.selectionMarker = m = b.renderer.rect(h, i, f ? 1 : k, g ? 1 : j, 0).attr({
                fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
              }).add();
            m && f && (d -= n, m.attr({
              width: Q(d),
              x: (d > 0 ? 0 : d) + n
            }));
            m && g && (d = e - q, m.attr({
              height: Q(d),
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
            p(c.axes, function(c) {
              if (c.zoomEnabled && r(c.min) && (d || b[{
                xAxis: "zoomX",
                yAxis: "zoomY"
              }[c.coll]])) {
                var f = c.horiz,
                    n = a.type === "touchend" ? c.minPixelPadding : 0,
                    q = c.toValue((f ? g : h) + n),
                    f = c.toValue((f ? g + i : h + k) - n);
                e[c.coll].push({
                  axis: c,
                  min: F(q, f),
                  max: t(q, f)
                });
                j = !0;
              }
            }), j && I(c, "selection", e, function(a) {
              c.zoom(u(a, d ? {animation: !1} : null));
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
        T[ia] && T[ia].pointer.drop(a);
      },
      onDocumentMouseMove: function(a) {
        var b = this.chart,
            c = this.chartPosition,
            a = this.normalize(a, c);
        c && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset();
      },
      onContainerMouseLeave: function(a) {
        var b = T[ia];
        if (b && (a.relatedTarget || a.toElement))
          b.pointer.reset(), b.pointer.chartPosition = null;
      },
      onContainerMouseMove: function(a) {
        var b = this.chart;
        if (!r(ia) || !T[ia] || !T[ia].mouseIsDown)
          ia = b.index;
        a = this.normalize(a);
        a.returnValue = !1;
        b.mouseIsDown === "mousedown" && this.drag(a);
        (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a);
      },
      inClass: function(a, b) {
        for (var c; a; ) {
          if (c = P(a, "class")) {
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
        b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (I(c.series, "click", u(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (u(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && I(b, "click", a)));
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
        eb === 1 && N(A, "mouseup", a.onDocumentMouseUp);
        if (db)
          b.ontouchstart = function(b) {
            a.onContainerTouchStart(b);
          }, b.ontouchmove = function(b) {
            a.onContainerTouchMove(b);
          }, eb === 1 && N(A, "touchend", a.onDocumentTouchEnd);
      },
      destroy: function() {
        var a;
        X(this.chart.container, "mouseleave", this.onContainerMouseLeave);
        eb || (X(A, "mouseup", this.onDocumentMouseUp), X(A, "touchend", this.onDocumentTouchEnd));
        clearInterval(this.tooltipTimeout);
        for (a in this)
          this[a] = null;
      }
    };
    u(x.Pointer.prototype, {
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
            n = i["plot" + (a ? "Left" : "Top")],
            q,
            o,
            s = h || 1,
            p = i.inverted,
            w = i.bounds[a ? "h" : "v"],
            v = b.length === 1,
            r = b[0][l],
            t = c[0][l],
            u = !v && b[1][l],
            x = !v && c[1][l],
            B,
            c = function() {
              !v && Q(r - u) > 20 && (s = h || Q(t - x) / Q(r - u));
              o = (n - t) / s + r;
              q = i["plot" + (a ? "Width" : "Height")] / s;
            };
        c();
        b = o;
        b < w.min ? (b = w.min, B = !0) : b + q > w.max && (b = w.max - q, B = !0);
        B ? (t -= 0.8 * (t - g[k][0]), v || (x -= 0.8 * (x - g[k][1])), c()) : g[k] = [t, x];
        p || (f[k] = o - n, f[m] = q);
        f = p ? 1 / s : s;
        e[m] = q;
        e[k] = b;
        d[p ? a ? "scaleY" : "scaleX" : "scale" + j] = s;
        d["translate" + j] = f * n + (t - f * r);
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
        Ca(e, function(a) {
          return b.normalize(a);
        });
        if (a.type === "touchstart")
          p(e, function(a, b) {
            d[b] = {
              chartX: a.chartX,
              chartY: a.chartY
            };
          }), g.x = [d[0].chartX, d[1] && d[1].chartX], g.y = [d[0].chartY, d[1] && d[1].chartY], p(c.axes, function(a) {
            if (a.zoomEnabled) {
              var b = c.bounds[a.horiz ? "h" : "v"],
                  d = a.minPixelPadding,
                  e = a.toPixels(o(a.options.min, a.dataMin)),
                  f = a.toPixels(o(a.options.max, a.dataMax)),
                  g = F(e, f),
                  e = t(e, f);
              b.min = F(a.pos, g - d);
              b.max = t(a.pos + a.len, e + d);
            }
          }), b.res = !0;
        else if (d.length) {
          if (!i)
            b.selectionMarker = i = u({
              destroy: Aa,
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
        T[ia] && T[ia].pointer.drop(a);
      }
    });
    if (D.PointerEvent || D.MSPointerEvent) {
      var va = {},
          Cb = !!D.PointerEvent,
          Rb = function() {
            var a,
                b = [];
            b.item = function(a) {
              return this[a];
            };
            for (a in va)
              va.hasOwnProperty(a) && b.push({
                pageX: va[a].pageX,
                pageY: va[a].pageY,
                target: va[a].target
              });
            return b;
          },
          Db = function(a, b, c, d) {
            if ((a.pointerType === "touch" || a.pointerType === a.MSPOINTER_TYPE_TOUCH) && T[ia])
              d(a), d = T[ia].pointer, d[b]({
                type: c,
                target: a.currentTarget,
                preventDefault: Aa,
                touches: Rb()
              });
          };
      u(Xa.prototype, {
        onContainerPointerDown: function(a) {
          Db(a, "onContainerTouchStart", "touchstart", function(a) {
            va[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget
            };
          });
        },
        onContainerPointerMove: function(a) {
          Db(a, "onContainerTouchMove", "touchmove", function(a) {
            va[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY
            };
            if (!va[a.pointerId].target)
              va[a.pointerId].target = a.currentTarget;
          });
        },
        onDocumentPointerUp: function(a) {
          Db(a, "onDocumentTouchEnd", "touchend", function(a) {
            delete va[a.pointerId];
          });
        },
        batchMSEvents: function(a) {
          a(this.chart.container, Cb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
          a(this.chart.container, Cb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
          a(A, Cb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        }
      });
      fb(Xa.prototype, "init", function(a, b, c) {
        a.call(this, b, c);
        this.hasZoom && M(b.container, {
          "-ms-touch-action": "none",
          "touch-action": "none"
        });
      });
      fb(Xa.prototype, "setDOMEvents", function(a) {
        a.apply(this);
        (this.hasZoom || this.followTouchMove) && this.batchMSEvents(N);
      });
      fb(Xa.prototype, "destroy", function(a) {
        this.batchMSEvents(X);
        a.call(this);
      });
    }
    var ob = x.Legend = function(a, b) {
      this.init(a, b);
    };
    ob.prototype = {
      init: function(a, b) {
        var c = this,
            d = b.itemStyle,
            e = b.itemMarginTop || 0;
        this.options = b;
        if (b.enabled)
          c.itemStyle = d, c.itemHiddenStyle = E(d, b.itemHiddenStyle), c.itemMarginTop = e, c.padding = d = o(b.padding, 8), c.initialItemX = d, c.initialItemY = d - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.symbolWidth = o(b.symbolWidth, 16), c.pages = [], c.render(), N(c.chart, "endResize", function() {
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
              d = g[k], d !== y && (i[k] = d);
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
        p(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
          a[b] && (a[b] = a[b].destroy());
        });
        b && Sa(a.checkbox);
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
          c = b.translateY, p(this.allItems, function(f) {
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
        a.legendItem.attr({text: b.labelFormat ? Ka(b.labelFormat, a) : b.labelFormatter.call(a)});
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
            n = d.itemMarginBottom || 0,
            q = this.itemMarginTop,
            z = this.initialItemX,
            s = a.legendItem,
            p = a.series && a.series.drawLegendSymbol ? a.series : a,
            w = p.options,
            w = this.createCheckboxForItem && w && w.showCheckbox,
            v = d.useHTML;
        if (!s) {
          a.legendGroup = c.g("legend-item").attr({zIndex: 1}).add(this.scrollGroup);
          a.legendItem = s = c.text("", l ? f + g : -g, this.baseline || 0, v).css(E(a.visible ? h : i)).attr({
            align: l ? "left" : "right",
            zIndex: 2
          }).add(a.legendGroup);
          if (!this.baseline)
            this.fontMetrics = c.fontMetrics(h.fontSize, s), this.baseline = this.fontMetrics.f + 3 + q, s.attr("y", this.baseline);
          p.drawLegendSymbol(this, a);
          this.setItemEvents && this.setItemEvents(a, s, v, h, i);
          w && this.createCheckboxForItem(a);
        }
        this.colorizeItem(a, a.visible);
        this.setText(a);
        c = s.getBBox();
        f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + j + (w ? 20 : 0);
        this.itemHeight = g = B(a.legendItemHeight || c.height);
        if (e && this.itemX - z + f > (m || b.chartWidth - 2 * k - z - d.x))
          this.itemX = z, this.itemY += q + this.lastLineHeight + n, this.lastLineHeight = 0;
        this.maxItemWidth = t(this.maxItemWidth, f);
        this.lastItemY = q + this.itemY + n;
        this.lastLineHeight = t(g, this.lastLineHeight);
        a._legendItemPos = [this.itemX, this.itemY];
        e ? this.itemX += f : (this.itemY += q + g + n, this.lastLineHeight = g);
        this.offsetWidth = m || t((e ? this.itemX - z - j : f) + k, this.offsetWidth);
      },
      getAllItems: function() {
        var a = [];
        p(this.chart.series, function(b) {
          var c = b.options;
          if (o(c.showInLegend, !r(c.linkedTo) ? y : !1, !0))
            a = a.concat(b.legendItems || (c.legendType === "point" ? b.data : b));
        });
        return a;
      },
      adjustMargins: function(a, b) {
        var c = this.chart,
            d = this.options,
            e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
        this.display && !d.floating && p([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, g) {
          f.test(e) && !r(a[g]) && (c[nb[g]] = t(c[nb[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + o(d.margin, 12) + b[g]));
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
        hb(e, function(a, b) {
          return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
        });
        k.reversed && e.reverse();
        a.allItems = e;
        a.display = f = !!e.length;
        a.lastLineHeight = 0;
        p(e, function(b) {
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
        p(e, function(b) {
          a.positionItem(b);
        });
        f && d.align(u({
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
            n = this.pages,
            q = this.padding,
            z,
            s = this.allItems,
            r = function(a) {
              i.attr({height: a});
              if (b.contentGroup.div)
                b.contentGroup.div.style.clip = "rect(" + q + "px,9999px," + (q + a) + "px,0)";
            };
        e.layout === "horizontal" && (f /= 2);
        g && (f = F(f, g));
        n.length = 0;
        if (a > f && k.enabled !== !1) {
          this.clipHeight = h = t(f - 20 - this.titleHeight - q, 0);
          this.currentPage = o(this.currentPage, 1);
          this.fullHeight = a;
          p(s, function(a, b) {
            var c = a._legendItemPos[1],
                d = B(a.legendItem.getBBox().height),
                e = n.length;
            if (!e || c - n[e - 1] > h && (z || c) !== n[e - 1])
              n.push(z || c), e++;
            b === s.length - 1 && c + d - n[e - 1] > h && n.push(c);
            c !== z && (z = c);
          });
          if (!i)
            i = b.clipRect = d.clipRect(0, q, 9999, 0), b.contentGroup.clip(i);
          r(h);
          if (!m)
            this.nav = m = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function() {
              b.scroll(-1, j);
            }).add(m), this.pager = d.text("", 15, 10).css(k.style).add(m), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function() {
              b.scroll(1, j);
            }).add(m);
          b.scroll(0);
          a = f;
        } else if (m)
          r(c.chartHeight), m.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0;
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
          b !== y && Ta(b, this.chart), this.nav.attr({
            translateX: k,
            translateY: f + this.padding + 7 + this.titleHeight,
            visibility: "visible"
          }), this.up.attr({fill: e === 1 ? g : h}).css({cursor: e === 1 ? "default" : "pointer"}), i.attr({text: e + "/" + d}), this.down.attr({
            x: 18 + this.pager.getBBox().width,
            fill: e === d ? g : h
          }).css({cursor: e === d ? "default" : "pointer"}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = e, this.positionCheckboxes(c);
      }
    };
    K = x.LegendSymbolMixin = {
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
            a = a.baseline - B(a.fontMetrics.b * 0.3),
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
    (/Trident\/7\.0/.test(za) || Na) && fb(ob.prototype, "positionItem", function(a, b) {
      var c = this,
          d = function() {
            b._legendItemPos && a.call(c, b);
          };
      d();
      setTimeout(d);
    });
    var gb = x.Chart = function() {
      this.getArgs.apply(this, arguments);
    };
    x.chart = function(a, b, c) {
      return new gb(a, b, c);
    };
    gb.prototype = {
      callbacks: [],
      getArgs: function() {
        var a = [].slice.call(arguments);
        if (xa(a[0]) || a[0].nodeName)
          this.renderTo = a.shift();
        this.init(a[0], a[1]);
      },
      init: function(a, b) {
        var c,
            d = a.series;
        a.series = null;
        c = E(U, a);
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
        f.index = T.length;
        T.push(f);
        eb++;
        d.reflow !== !1 && N(f, "load", function() {
          f.initReflow();
        });
        if (e)
          for (g in e)
            N(f, g, e[g]);
        f.xAxis = [];
        f.yAxis = [];
        f.animation = ka ? !1 : o(d.animation, !0);
        f.pointCount = f.colorCounter = f.symbolCounter = 0;
        f.firstRender();
      },
      initSeries: function(a) {
        var b = this.options.chart;
        (b = L[a.type || b.type || b.defaultSeriesType]) || aa(17, !0);
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
            n = m.isHidden(),
            q = [];
        Ta(a, this);
        n && this.cloneRenderTo();
        for (this.layOutTitles(); l--; )
          if (a = c[l], a.options.stacking && (g = !0, a.isDirty)) {
            h = !0;
            break;
          }
        if (h)
          for (l = j; l--; )
            if (a = c[l], a.options.stacking)
              a.isDirty = !0;
        p(c, function(a) {
          a.isDirty && a.options.legendType === "point" && (a.updateTotals && a.updateTotals(), f = !0);
          a.isDirtyData && I(a, "updatedData");
        });
        if (f && e.options.enabled)
          e.render(), this.isDirtyLegend = !1;
        g && this.getStacks();
        if (i && !this.isResizing)
          this.maxTicks = null, p(b, function(a) {
            a.setScale();
          });
        this.getMargins();
        i && (p(b, function(a) {
          a.isDirty && (k = !0);
        }), p(b, function(a) {
          var b = a.min + "," + a.max;
          if (a.extKey !== b)
            a.extKey = b, q.push(function() {
              I(a, "afterSetExtremes", u(a.eventArgs, a.getExtremes()));
              delete a.eventArgs;
            });
          (k || g) && a.redraw();
        }));
        k && this.drawChartBox();
        p(c, function(a) {
          a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
        });
        d && d.reset(!0);
        m.draw();
        I(this, "redraw");
        n && this.cloneRenderTo(!0);
        p(q, function(a) {
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
            c = b.xAxis = ta(b.xAxis || {}),
            b = b.yAxis = ta(b.yAxis || {});
        p(c, function(a, b) {
          a.index = b;
          a.isX = !0;
        });
        p(b, function(a, b) {
          a.index = b;
        });
        c = c.concat(b);
        p(c, function(b) {
          new ha(a, b);
        });
      },
      getSelectedPoints: function() {
        var a = [];
        p(this.series, function(b) {
          a = a.concat(Ba(b.points || [], function(a) {
            return a.selected;
          }));
        });
        return a;
      },
      getSelectedSeries: function() {
        return Ba(this.series, function(a) {
          return a.selected;
        });
      },
      setTitle: function(a, b, c) {
        var g;
        var d = this,
            e = d.options,
            f;
        f = e.title = E(e.title, a);
        g = e.subtitle = E(e.subtitle, b), e = g;
        p([["title", a, f], ["subtitle", b, e]], function(a) {
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
        if (c && (c.css({width: (f.width || h.width + f.widthAdjust) + "px"}).align(u({y: g.fontMetrics(f.style.fontSize, c).b - 3}, f), !1, h), !f.floating && !f.verticalAlign))
          b = c.getBBox().height;
        d && (d.css({width: (e.width || h.width + e.widthAdjust) + "px"}).align(u({y: b + (f.margin - 13) + g.fontMetrics(e.style.fontSize, c).b}, e), !1, h), !e.floating && !e.verticalAlign && (b = ua(b + d.getBBox().height)));
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
        if (!r(b))
          this.containerWidth = na(c, "width");
        if (!r(a))
          this.containerHeight = na(c, "height");
        this.chartWidth = t(0, b || this.containerWidth || 600);
        this.chartHeight = t(0, o(a, this.containerHeight > 19 ? this.containerHeight : 400));
      },
      cloneRenderTo: function(a) {
        var b = this.renderToClone,
            c = this.container;
        a ? b && (this.renderTo.appendChild(c), Sa(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), M(b, {
          position: "absolute",
          top: "-9999px",
          display: "block"
        }), b.style.setProperty && b.style.setProperty("display", "block", "important"), A.body.appendChild(b), c && b.appendChild(c));
      },
      getContainer: function() {
        var a,
            b = this.options,
            c = b.chart,
            d,
            e;
        a = this.renderTo;
        var f = "highcharts-" + yb++;
        if (!a)
          this.renderTo = a = c.renderTo;
        if (xa(a))
          this.renderTo = a = A.getElementById(a);
        a || aa(13, !0);
        d = C(P(a, "data-highcharts-chart"));
        J(d) && T[d] && T[d].hasRendered && T[d].destroy();
        P(a, "data-highcharts-chart", this.index);
        a.innerHTML = "";
        !c.skipClone && !a.offsetWidth && this.cloneRenderTo();
        this.getChartSize();
        d = this.chartWidth;
        e = this.chartHeight;
        this.container = a = ba(Ma, {
          className: "highcharts-container" + (c.className ? " " + c.className : ""),
          id: f
        }, u({
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
        this.renderer = new (x[c.renderer] || cb)(a, d, e, c.style, c.forExport, b.exporting && b.exporting.allowHTML);
        ka && this.renderer.create(this, a, d, e);
        this.renderer.chartIndex = this.index;
      },
      getMargins: function(a) {
        var b = this.spacing,
            c = this.margin,
            d = this.titleOffset;
        this.resetMargins();
        if (d && !r(c[0]))
          this.plotTop = t(this.plotTop, d + this.options.title.margin + b[0]);
        this.legend.adjustMargins(c, b);
        this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
        this.extraTopMargin && (this.plotTop += this.extraTopMargin);
        a || this.getAxisMargins();
      },
      getAxisMargins: function() {
        var a = this,
            b = a.axisOffset = [0, 0, 0, 0],
            c = a.margin;
        a.hasCartesianSeries && p(a.axes, function(a) {
          a.visible && a.getOffset();
        });
        p(nb, function(d, e) {
          r(c[e]) || (a[d] += b[e]);
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
        if (!b.hasUserSize && !b.isPrinting && e && f && (c === D || c === A)) {
          if (e !== b.containerWidth || f !== b.containerHeight)
            clearTimeout(b.reflowTimeout), b.reflowTimeout = Pa(function() {
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
          X(D, "resize", b);
        });
      },
      setSize: function(a, b, c) {
        var d = this,
            e,
            f,
            g = d.renderer;
        d.isResizing += 1;
        Ta(c, d);
        d.oldChartHeight = d.chartHeight;
        d.oldChartWidth = d.chartWidth;
        if (r(a))
          d.chartWidth = e = t(0, B(a)), d.hasUserSize = !!e;
        if (r(b))
          d.chartHeight = f = t(0, B(b));
        a = g.globalAnimation;
        (a ? Wa : M)(d.container, {
          width: e + "px",
          height: f + "px"
        }, a);
        d.setChartSize(!0);
        g.setSize(e, f, c);
        d.maxTicks = null;
        p(d.axes, function(a) {
          a.isDirty = !0;
          a.setScale();
        });
        p(d.series, function(a) {
          a.isDirty = !0;
        });
        d.isDirtyLegend = !0;
        d.isDirtyBox = !0;
        d.layOutTitles();
        d.getMargins();
        d.redraw(c);
        d.oldChartHeight = null;
        I(d, "resize");
        Pa(function() {
          d && I(d, "endResize", null, function() {
            d.isResizing -= 1;
          });
        }, $a(a).duration);
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
        this.plotLeft = i = B(this.plotLeft);
        this.plotTop = k = B(this.plotTop);
        this.plotWidth = j = t(0, B(d - i - this.marginRight));
        this.plotHeight = l = t(0, B(e - k - this.marginBottom));
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
        d = 2 * V(this.plotBorderWidth / 2);
        b = ua(t(d, h[3]) / 2);
        c = ua(t(d, h[0]) / 2);
        this.clipBox = {
          x: b,
          y: c,
          width: V(this.plotSizeX - t(d, h[1]) / 2 - b),
          height: t(0, V(this.plotSizeY - t(d, h[2]) / 2 - c))
        };
        a || p(this.axes, function(a) {
          a.setAxisSize();
          a.setAxisTranslation();
        });
      },
      resetMargins: function() {
        var a = this;
        p(nb, function(b, c) {
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
            n,
            q = this.plotLeft,
            o = this.plotTop,
            p = this.plotWidth,
            r = this.plotHeight,
            w = this.plotBox,
            v = this.clipRect,
            t = this.clipBox;
        n = i + (a.shadow ? 8 : 0);
        if (i || k)
          if (e)
            e.animate(e.crisp({
              width: c - n,
              height: d - n
            }));
          else {
            e = {fill: k || "none"};
            if (i)
              e.stroke = a.borderColor, e["stroke-width"] = i;
            this.chartBackground = b.rect(n / 2, n / 2, c - n, d - n, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow);
          }
        if (j)
          f ? f.animate(w) : this.plotBackground = b.rect(q, o, p, r, 0).attr({fill: j}).add().shadow(a.plotShadow);
        if (l)
          h ? h.animate(w) : this.plotBGImage = b.image(l, q, o, p, r).add();
        v ? v.animate({
          width: t.width,
          height: t.height
        }) : this.clipRect = b.clipRect(t);
        if (m)
          g ? (g.strokeWidth = -m, g.animate(g.crisp({
            x: q,
            y: o,
            width: p,
            height: r
          }))) : this.plotBorder = b.rect(q, o, p, r, 0, -m).attr({
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
        p(["inverted", "angular", "polar"], function(g) {
          c = L[b.type || b.defaultSeriesType];
          f = a[g] || b[g] || c && c.prototype[g];
          for (e = d && d.length; !f && e--; )
            (c = L[d[e].type]) && c.prototype[g] && (f = !0);
          a[g] = f;
        });
      },
      linkSeries: function() {
        var a = this,
            b = a.series;
        p(b, function(a) {
          a.linkedSeries.length = 0;
        });
        p(b, function(b) {
          var d = b.options.linkedTo;
          if (xa(d) && (d = d === ":previous" ? a.series[b.index - 1] : a.get(d)))
            d.linkedSeries.push(b), b.linkedParent = d, b.visible = o(b.options.visible, d.options.visible, b.visible);
        });
      },
      renderSeries: function() {
        p(this.series, function(a) {
          a.translate();
          a.render();
        });
      },
      renderLabels: function() {
        var a = this,
            b = a.options.labels;
        b.items && p(b.items, function(c) {
          var d = u(b.style, c.style),
              e = C(d.left) + a.plotLeft,
              f = C(d.top) + a.plotTop + 12;
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
        this.legend = new ob(this, c.legend);
        this.getStacks && this.getStacks();
        this.getMargins(!0);
        this.setChartSize();
        d = this.plotWidth;
        e = this.plotHeight -= 21;
        p(a, function(a) {
          a.setScale();
        });
        this.getAxisMargins();
        f = d / this.plotWidth > 1.1;
        g = e / this.plotHeight > 1.05;
        if (f || g)
          this.maxTicks = null, p(a, function(a) {
            (a.horiz && f || !a.horiz && g) && a.setTickInterval(!0);
          }), this.getMargins();
        this.drawChartBox();
        this.hasCartesianSeries && p(a, function(a) {
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
        I(a, "destroy");
        T[a.index] = y;
        eb--;
        a.renderTo.removeAttribute("data-highcharts-chart");
        X(a);
        for (e = b.length; e--; )
          b[e] = b[e].destroy();
        for (e = c.length; e--; )
          c[e] = c[e].destroy();
        p("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(b) {
          var c = a[b];
          c && c.destroy && (a[b] = c.destroy());
        });
        if (d)
          d.innerHTML = "", X(d), f && Sa(d);
        for (e in a)
          delete a[e];
      },
      isReadyToRender: function() {
        var a = this;
        return !fa && D == D.top && A.readyState !== "complete" || ka && !D.canvg ? (ka ? Nb.push(function() {
          a.firstRender();
        }, a.options.global.canvasToolsURL) : A.attachEvent("onreadystatechange", function() {
          A.detachEvent("onreadystatechange", a.firstRender);
          A.readyState === "complete" && a.firstRender();
        }), !1) : !0;
      },
      firstRender: function() {
        var a = this,
            b = a.options;
        if (a.isReadyToRender()) {
          a.getContainer();
          I(a, "init");
          a.resetMargins();
          a.setChartSize();
          a.propFromSeries();
          a.getAxes();
          p(b.series || [], function(b) {
            a.initSeries(b);
          });
          a.linkSeries();
          I(a, "beforeRender");
          if (x.Pointer)
            a.pointer = new Xa(a, b);
          a.render();
          a.renderer.draw();
          if (!a.renderer.imgCount && a.onload)
            a.onload();
          a.cloneRenderTo(!0);
        }
      },
      onload: function() {
        var a = this;
        p([this.callback].concat(this.callbacks), function(b) {
          b && a.index !== void 0 && b.apply(a, [a]);
        });
        I(a, "load");
        this.onload = null;
      },
      splashArray: function(a, b) {
        var c = b[a],
            c = Z(c) ? c : [c, c, c, c];
        return [o(b[a + "Top"], c[0]), o(b[a + "Right"], c[1]), o(b[a + "Bottom"], c[2]), o(b[a + "Left"], c[3])];
      }
    };
    var Bb = x.CenteredSeriesMixin = {getCenter: function() {
        var a = this.options,
            b = this.chart,
            c = 2 * (a.slicedOffset || 0),
            d = b.plotWidth - 2 * c,
            b = b.plotHeight - 2 * c,
            e = a.center,
            e = [o(e[0], "50%"), o(e[1], "50%"), a.size || "100%", a.innerSize || 0],
            f = F(d, b),
            g,
            h;
        for (g = 0; g < 4; ++g)
          h = e[g], a = g < 2 || g === 2 && /%$/.test(h), e[g] = (/%$/.test(h) ? [d, b, f, e[2]][g] * parseFloat(h) / 100 : parseFloat(h)) + (a ? c : 0);
        e[3] > e[2] && (e[3] = e[2]);
        return e;
      }},
        Ja = function() {};
    Ja.prototype = {
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
            a = Ja.prototype.optionsToObject.call(this, a);
        u(this, a);
        this.options = this.options ? u(this.options, a) : a;
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
        if (J(a) || a === null)
          b[e[0]] = a;
        else if (Ea(a)) {
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
        if (b && (this.setState(), pa(b, this), !b.length))
          a.hoverPoints = null;
        if (this === a.hoverPoint)
          this.onMouseOut();
        if (this.graphic || this.dataLabel)
          X(this), this.destroyElements();
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
        p(b.pointArrayMap || ["y"], function(b) {
          b = "{point." + b;
          if (e || f)
            a = a.replace(b + "}", e + b + "}" + f);
          a = a.replace(b + "}", b + ":,." + d + "f}");
        });
        return Ka(a, {
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
        I(this, a, b, c);
      },
      visible: !0
    };
    var R = x.Series = function() {};
    R.prototype = {
      isCartesian: !0,
      type: "line",
      pointClass: Ja,
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
        u(c, {
          name: b.name,
          state: "",
          pointAttr: {},
          visible: b.visible !== !1,
          selected: b.selected === !0
        });
        if (ka)
          b.animation = !1;
        e = b.events;
        for (d in e)
          N(c, d, e[d]);
        if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)
          a.runTrackerClick = !0;
        c.getColor();
        c.getSymbol();
        p(c.parallelArrays, function(a) {
          c[a + "Data"] = [];
        });
        c.setData(b.data, !1);
        if (c.isCartesian)
          a.hasCartesianSeries = !0;
        f.push(c);
        c._i = f.length - 1;
        hb(f, g);
        this.yAxis && hb(this.yAxis.series, g);
        p(f, function(a, b) {
          a.index = b;
          a.name = a.name || "Series " + (b + 1);
        });
      },
      bindAxes: function() {
        var a = this,
            b = a.options,
            c = a.chart,
            d;
        p(a.axisTypes || [], function(e) {
          p(c[e], function(c) {
            d = c.options;
            if (b[e] === d.index || b[e] !== y && b[e] === d.id || b[e] === y && d.index === 0)
              c.series.push(a), a[e] = c, c.isDirty = !0;
          });
          !a[e] && a.optionalAxis !== e && aa(18, !0);
        });
      },
      updateParallelArrays: function(a, b) {
        var c = a.series,
            d = arguments,
            e = J(b) ? function(d) {
              var e = d === "y" && c.toYData ? c.toYData(a) : a[d];
              c[d + "Data"][b] = e;
            } : function(a) {
              Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2));
            };
        p(c.parallelArrays, e);
      },
      autoIncrement: function() {
        var a = this.options,
            b = this.xIncrement,
            c,
            d = a.pointIntervalUnit,
            b = o(b, a.pointStart, 0);
        this.pointInterval = c = o(this.pointInterval, a.pointInterval, 1);
        d && (a = new la(b), d === "day" ? a = +a[kb](a[Ua]() + c) : d === "month" ? a = +a[wb](a[ab]() + c) : d === "year" && (a = +a[xb](a[bb]() + c)), c = a - b);
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
        c = E(e, c.series, a);
        this.tooltipOptions = E(U.tooltip, U.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
        e.marker === null && delete c.marker;
        this.zoneAxis = c.zoneAxis;
        a = this.zones = (c.zones || []).slice();
        if ((c.negativeColor || c.negativeFillColor) && !c.zones)
          a.push({
            value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
            color: c.negativeColor,
            fillColor: c.negativeFillColor
          });
        a.length && r(a[a.length - 1].value) && a.push({
          color: this.color,
          fillColor: this.fillColor
        });
        return c;
      },
      getCyclic: function(a, b, c) {
        var d = this.userOptions,
            e = "_" + a + "Index",
            f = a + "Counter";
        b || (r(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
        this[a] = b;
      },
      getColor: function() {
        this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || ea[this.type].color, this.chart.options.colors);
      },
      getSymbol: function() {
        var a = this.options.marker;
        this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
        if (/^url/.test(this.symbol))
          a.radius = 0;
      },
      drawLegendSymbol: K.drawLineMarker,
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
            n = i.turboThreshold,
            q = this.xData,
            z = this.yData,
            s = (h = e.pointArrayMap) && h.length,
            a = a || [];
        h = a.length;
        b = o(b, !0);
        if (d !== !1 && h && g === h && !e.cropped && !e.hasGroupedData && e.visible)
          p(a, function(a, b) {
            f[b].update && a !== i.data[b] && f[b].update(a, !1, null, !1);
          });
        else {
          e.xIncrement = null;
          e.colorCounter = 0;
          p(this.parallelArrays, function(a) {
            e[a + "Data"].length = 0;
          });
          if (n && h > n) {
            for (c = 0; j === null && c < h; )
              j = a[c], c++;
            if (J(j)) {
              m = o(i.pointStart, 0);
              j = o(i.pointInterval, 1);
              for (c = 0; c < h; c++)
                q[c] = m, z[c] = a[c], m += j;
              e.xIncrement = m;
            } else if (Ea(j))
              if (s)
                for (c = 0; c < h; c++)
                  j = a[c], q[c] = j[0], z[c] = j.slice(1, s + 1);
              else
                for (c = 0; c < h; c++)
                  j = a[c], q[c] = j[0], z[c] = j[1];
            else
              aa(12);
          } else
            for (c = 0; c < h; c++)
              if (a[c] !== y && (j = {series: e}, e.pointClass.prototype.applyOptions.apply(j, [a[c]]), e.updateParallelArrays(j, c), m && r(j.name)))
                l.names[j.x] = j.name;
          xa(z[0]) && aa(14, !0);
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
            n,
            q;
        if (l && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a)
          return !1;
        if (h)
          a = h.getExtremes(), n = a.min, q = a.max;
        if (l && this.sorted && !j && (!i || d > i || this.forceCrop))
          if (b[d - 1] < n || b[0] > q)
            b = [], c = [];
          else if (b[0] < n || b[d - 1] > q)
            e = this.cropData(this.xData, this.yData, n, q), b = e.xData, c = e.yData, e = e.start, f = !0;
        for (i = b.length || 1; --i; )
          d = m ? k(b[i]) - k(b[i - 1]) : b[i] - b[i - 1], d > 0 && (g === y || d < g) ? g = d : d < 0 && this.requireSorting && aa(15);
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
            f = t(0, i - h);
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
          i = h + m, k ? (l[m] = (new f).init(this, [d[m]].concat(ta(e[m]))), l[m].dataGroup = this.groupMap[m]) : (b[i] ? j = b[i] : a[i] !== y && (b[i] = j = (new f).init(this, a[i], d[m])), l[m] = j), l[m].index = i;
        if (b && (g !== (c = b.length) || k))
          for (m = 0; m < c; m++)
            if (m === h && !k && (m += g), b[m])
              b[m].destroyElements(), b[m].plotX = y;
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
          if (k = c[l], j = a[l], i = j !== null && j !== y && (!b.isLog || j.length || j > 0), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[l + 1] || k) >= g && (c[l - 1] || k) <= h, i && k)
            if (i = j.length)
              for (; i--; )
                j[i] !== null && (e[f++] = j[i]);
            else
              e[f++] = j;
        this.dataMin = La(e);
        this.dataMax = Ga(e);
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
            k = i === "between" || J(i),
            j = a.threshold,
            l = a.startFromThreshold ? j : 0,
            m,
            n,
            q,
            p,
            s = Number.MAX_VALUE,
            a = 0; a < g; a++) {
          var G = f[a],
              w = G.x,
              v = G.y;
          n = G.low;
          var u = b && e.stacks[(this.negStacks && v < (l ? 0 : j) ? "-" : "") + this.stackKey];
          if (e.isLog && v !== null && v <= 0)
            G.y = v = null, aa(10);
          G.plotX = m = ca(F(t(-1E5, c.translate(w, 0, 0, 0, 1, i, this.type === "flags")), 1E5));
          if (b && this.visible && !G.isNull && u && u[w])
            p = this.getStackIndicator(p, w, this.index), u = u[w], v = u.points[p.key], n = v[0], v = v[1], n === l && (n = o(j, e.min)), e.isLog && n <= 0 && (n = null), G.total = G.stackTotal = u.total, G.percentage = u.total && G.y / u.total * 100, G.stackY = v, u.setOffset(this.pointXOffset || 0, this.barW || 0);
          G.yBottom = r(n) ? e.translate(n, 0, 1, 0, 1) : null;
          h && (v = this.modifyValue(v, G));
          G.plotY = n = typeof v === "number" && v !== Infinity ? F(t(-1E5, e.translate(v, 0, 1, 0, 1)), 1E5) : y;
          G.isInside = n !== y && n >= 0 && n <= e.len && m >= 0 && m <= c.len;
          G.clientX = k ? c.translate(w, 0, 0, 0, 1) : m;
          G.negative = G.y < (j || 0);
          G.category = d && d[G.x] !== y ? d[G.x] : G.x;
          G.isNull || (q !== void 0 && (s = F(s, Q(m - q))), q = m);
        }
        this.closestPointRangePx = s;
      },
      getValidPoints: function(a, b) {
        var c = this.chart;
        return Ba(a || this.points || [], function(a) {
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
        if (c && !Z(c))
          c = ea[this.type].animation;
        a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({width: b.plotSizeX}, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null);
      },
      afterAnimate: function() {
        this.setClip();
        I(this, "afterAnimate");
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
            n,
            q,
            p,
            s = this.markerGroup,
            r = o(l.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * l.radius);
        if (l.enabled !== !1 || this._hasPointMarkers)
          for (f = b.length; f--; )
            if (g = b[f], d = V(g.plotX), e = g.plotY, j = g.graphic, n = g.marker || {}, q = !!g.marker, a = r && n.enabled === y || n.enabled, p = g.isInside, a && J(e) && g.y !== null)
              if (a = g.pointAttr[g.selected ? "select" : ""] || m, h = a.r, i = o(n.symbol, this.symbol), k = i.indexOf("url") === 0, j)
                j[p ? "show" : "hide"](!0).attr(a).animate(u({
                  x: d - h,
                  y: e - h
                }, j.symbolName ? {
                  width: 2 * h,
                  height: 2 * h
                } : {}));
              else {
                if (p && (h > 0 || k))
                  g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h, q ? n : l).attr(a).add(s);
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
            c = ea[a.type].marker ? b.marker : b,
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
            n = a.pointAttrToOptions;
        f = a.hasPointSpecificOptions;
        var q = c.lineColor,
            z = c.fillColor;
        j = b.turboThreshold;
        var s = a.zones,
            t = a.zoneAxis || "y",
            w,
            v;
        b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : (e.color = e.color || ma(e.color || g).brighten(e.brightness).get(), e.negativeColor = e.negativeColor || ma(e.negativeColor || h).brighten(e.brightness).get());
        l[""] = a.convertAttribs(c, i);
        p(["hover", "select"], function(b) {
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
              for (i = s[f]; j[t] >= i.value; )
                i = s[++f];
              j.color = j.fillColor = i = o(i.color, a.color);
            }
            f = b.colorByPoint || j.color;
            if (j.options)
              for (v in n)
                r(c[n[v]]) && (f = !0);
            if (f) {
              c = c || {};
              m = [];
              d = c.states || {};
              f = d.hover = d.hover || {};
              if (!b.marker || j.negative && !f.fillColor && !e.fillColor)
                f[a.pointAttrToOptions.fill] = f.color || !j.options.color && e[j.negative && h ? "negativeColor" : "color"] || ma(j.color).brighten(f.brightness || e.brightness).get();
              w = {color: j.color};
              if (!z)
                w.fillColor = j.color;
              if (!q)
                w.lineColor = j.color;
              c.hasOwnProperty("color") && !c.color && delete c.color;
              if (i && !e.fillColor)
                f.fillColor = i;
              m[""] = a.convertAttribs(u(w, c), l[""]);
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
            c = /AppleWebKit\/533/.test(za),
            d,
            e = a.data || [],
            f,
            g,
            h;
        I(a, "destroy");
        X(a);
        p(a.axisTypes || [], function(b) {
          if (h = a[b])
            pa(h.series, a), h.isDirty = h.forceRedraw = !0;
        });
        a.legendItem && a.chart.legend.destroyItem(a);
        for (d = e.length; d--; )
          (f = e[d]) && f.destroy && f.destroy();
        a.points = null;
        clearTimeout(a.animationTimeout);
        for (g in a)
          a[g] instanceof O && !a[g].survive && (d = c && g === "group" ? "hide" : "destroy", a[g][d]());
        if (b.hoverSeries === a)
          b.hoverSeries = null;
        pa(b.series, a);
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
        p(a, function(g, j) {
          var l = g.plotX,
              m = g.plotY,
              n = a[j - 1];
          if ((g.leftCliff || n && n.rightCliff) && !c)
            i = !0;
          g.isNull && !r(b) && j > 0 ? i = !e.connectNulls : g.isNull && !b ? i = !0 : (j === 0 || i ? n = ["M", g.plotX, g.plotY] : d.getPointSpline ? n = d.getPointSpline(a, g, j) : f ? (n = f === 1 ? ["L", n.plotX, m] : f === 2 ? ["L", (n.plotX + l) / 2, n.plotY, "L", (n.plotX + l) / 2, m] : ["L", l, n.plotY], n.push("L", l, m)) : n = ["L", l, m], h.push.apply(h, n), i = !1);
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
        p(this.zones, function(d, e) {
          c.push(["zoneGraph" + e, d.color || a.color, d.dashStyle || b.dashStyle]);
        });
        p(c, function(c, i) {
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
            j = t(b.chartWidth, b.chartHeight),
            l = this[(this.zoneAxis || "y") + "Axis"],
            m,
            n = l.reversed,
            q = b.inverted,
            z = l.horiz,
            s,
            r,
            w,
            v = !1;
        if (d.length && (i || k) && l.min !== y)
          i && i.hide(), k && k.hide(), m = l.getExtremes(), p(d, function(d, p) {
            e = n ? z ? b.plotWidth : 0 : z ? 0 : l.toPixels(m.min);
            e = F(t(o(f, e), 0), j);
            f = F(t(B(l.toPixels(o(d.value, m.max), !0)), 0), j);
            v && (e = f = l.toPixels(m.max));
            s = Math.abs(e - f);
            r = F(e, f);
            w = t(e, f);
            if (l.isXAxis) {
              if (h = {
                x: q ? w : r,
                y: 0,
                width: s,
                height: j
              }, !z)
                h.x = b.plotHeight - h.x;
            } else if (h = {
              x: 0,
              y: q ? w : r,
              width: j,
              height: s
            }, z)
              h.y = b.plotWidth - h.y;
            b.inverted && c.isVML && (h = l.isXAxis ? {
              x: 0,
              y: n ? r : w,
              height: h.width,
              width: b.chartWidth
            } : {
              x: h.y - b.plotLeft - b.spacingBox.x,
              y: 0,
              width: h.height,
              height: b.chartHeight
            });
            g[p] ? g[p].animate(h) : (g[p] = c.clipRect(h), i && a["zoneGraph" + p].clip(g[p]), k && a["zoneArea" + p].clip(g[p]));
            v = d.value > m.max;
          }), this.clips = g;
      },
      invertGroups: function() {
        function a() {
          var a = {
            width: b.yAxis.len,
            height: b.xAxis.len
          };
          p(["group", "markerGroup"], function(c) {
            b[c] && b[c].attr(a).invert();
          });
        }
        var b = this,
            c = b.chart;
        if (b.xAxis)
          N(c, "resize", a), N(b, "destroy", function() {
            X(c, "resize", a);
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
            e = !!a.animate && b.renderer.isSVG && $a(d.animation).duration,
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
        p(a.points, function(a) {
          a.redraw && a.redraw();
        });
        a.drawDataLabels && a.drawDataLabels();
        a.visible && a.drawPoints();
        a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker();
        b.inverted && a.invertGroups();
        d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect);
        e && a.animate();
        if (!h)
          a.animationTimeout = Pa(function() {
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
        Pa(function() {
          b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
        }, b.options.kdNow ? 0 : 1);
      },
      searchKDTree: function(a, b) {
        function c(a, b, k, j) {
          var l = b.point,
              m = d.kdAxisArray[k % j],
              n,
              q,
              o = l;
          q = r(a[e]) && r(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
          n = r(a[f]) && r(l[f]) ? Math.pow(a[f] - l[f], 2) : null;
          n = (q || 0) + (n || 0);
          l.dist = r(n) ? Math.sqrt(n) : Number.MAX_VALUE;
          l.distX = r(q) ? Math.sqrt(q) : Number.MAX_VALUE;
          m = a[m] - l[m];
          n = m < 0 ? "left" : "right";
          q = m < 0 ? "right" : "left";
          b[n] && (n = c(a, b[n], k + 1, j), o = n[g] < o[g] ? n : l);
          b[q] && Math.sqrt(m * m) < o[g] && (a = c(a, b[q], k + 1, j), o = a[g] < o[g] ? a : o);
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
    Jb.prototype = {
      destroy: function() {
        Ra(this, this.axis);
      },
      render: function(a) {
        var b = this.options,
            c = b.format,
            c = c ? Ka(c, this) : b.formatter.call(this);
        this.label ? this.label.attr({
          text: c,
          visibility: "hidden"
        }) : this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
          align: this.textAlign,
          rotation: b.rotation,
          visibility: "hidden"
        }).add(a);
      },
      setOffset: function(a, b) {
        var c = this.axis,
            d = c.chart,
            e = d.inverted,
            f = c.reversed,
            f = this.isNegative && !f || !this.isNegative && f,
            g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1),
            c = c.translate(0),
            c = Q(g - c),
            h = d.xAxis[0].translate(this.x) + a,
            i = d.plotHeight,
            f = {
              x: e ? f ? g : g - c : h,
              y: e ? i - h - b : f ? i - g - c : i - g,
              width: e ? c : b,
              height: e ? b : c
            };
        if (e = this.label)
          e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0);
      }
    };
    gb.prototype.getStacks = function() {
      var a = this;
      p(a.yAxis, function(a) {
        if (a.stacks && a.hasVisibleSeries)
          a.oldStacks = a.stacks;
      });
      p(a.series, function(b) {
        if (b.options.stacking && (b.visible === !0 || a.options.chart.ignoreHiddenSeries === !1))
          b.stackKey = b.type + o(b.options.stack, "");
      });
    };
    ha.prototype.buildStacks = function() {
      var a = this.series,
          b,
          c = o(this.options.reversedStacks, !0),
          d = a.length,
          e;
      if (!this.isXAxis) {
        this.usePercentage = !1;
        for (e = d; e--; )
          a[c ? e : d - e - 1].setStackedPoints();
        for (e = d; e--; )
          b = a[c ? e : d - e - 1], b.setStackCliffs && b.setStackCliffs();
        if (this.usePercentage)
          for (e = 0; e < d; e++)
            a[e].setPercentStacks();
      }
    };
    ha.prototype.renderStackTotals = function() {
      var a = this.chart,
          b = a.renderer,
          c = this.stacks,
          d,
          e,
          f = this.stackTotalGroup;
      if (!f)
        this.stackTotalGroup = f = b.g("stack-labels").attr({
          visibility: "visible",
          zIndex: 6
        }).add();
      f.translate(a.plotLeft, a.plotTop);
      for (d in c)
        for (e in a = c[d], a)
          a[e].render(f);
    };
    ha.prototype.resetStacks = function() {
      var a = this.stacks,
          b,
          c;
      if (!this.isXAxis)
        for (b in a)
          for (c in a[b])
            a[b][c].touched < this.stacksTouched ? (a[b][c].destroy(), delete a[b][c]) : (a[b][c].total = null, a[b][c].cum = 0);
    };
    ha.prototype.cleanStacks = function() {
      var a,
          b,
          c;
      if (!this.isXAxis) {
        if (this.oldStacks)
          a = this.stacks = this.oldStacks;
        for (b in a)
          for (c in a[b])
            a[b][c].cum = a[b][c].total;
      }
    };
    R.prototype.setStackedPoints = function() {
      if (this.options.stacking && !(this.visible !== !0 && this.chart.options.chart.ignoreHiddenSeries !== !1)) {
        var a = this.processedXData,
            b = this.processedYData,
            c = [],
            d = b.length,
            e = this.options,
            f = e.threshold,
            g = e.startFromThreshold ? f : 0,
            h = e.stack,
            e = e.stacking,
            i = this.stackKey,
            k = "-" + i,
            j = this.negStacks,
            l = this.yAxis,
            m = l.stacks,
            n = l.oldStacks,
            q,
            p,
            s,
            r,
            w,
            v,
            u;
        l.stacksTouched += 1;
        for (w = 0; w < d; w++) {
          v = a[w];
          u = b[w];
          q = this.getStackIndicator(q, v, this.index);
          r = q.key;
          s = (p = j && u < (g ? 0 : f)) ? k : i;
          m[s] || (m[s] = {});
          if (!m[s][v])
            n[s] && n[s][v] ? (m[s][v] = n[s][v], m[s][v].total = null) : m[s][v] = new Jb(l, l.options.stackLabels, p, v, h);
          s = m[s][v];
          if (u !== null)
            s.points[r] = s.points[this.index] = [o(s.cum, g)], s.touched = l.stacksTouched, q.index > 0 && this.singleStacks === !1 && (s.points[r][0] = s.points[this.index + "," + v + ",0"][0]);
          e === "percent" ? (p = p ? i : k, j && m[p] && m[p][v] ? (p = m[p][v], s.total = p.total = t(p.total, s.total) + Q(u) || 0) : s.total = ca(s.total + (Q(u) || 0))) : s.total = ca(s.total + (u || 0));
          s.cum = o(s.cum, g) + (u || 0);
          if (u !== null)
            s.points[r].push(s.cum), c[w] = s.cum;
        }
        if (e === "percent")
          l.usePercentage = !0;
        this.stackedYData = c;
        l.oldStacks = {};
      }
    };
    R.prototype.setPercentStacks = function() {
      var a = this,
          b = a.stackKey,
          c = a.yAxis.stacks,
          d = a.processedXData,
          e;
      p([b, "-" + b], function(b) {
        var f;
        for (var g = d.length,
            h,
            i; g--; )
          if (h = d[g], e = a.getStackIndicator(e, h, a.index), f = (i = c[b] && c[b][h]) && i.points[e.key], h = f)
            i = i.total ? 100 / i.total : 0, h[0] = ca(h[0] * i), h[1] = ca(h[1] * i), a.stackedYData[g] = h[1];
      });
    };
    R.prototype.getStackIndicator = function(a, b, c) {
      !r(a) || a.x !== b ? a = {
        x: b,
        index: 0
      } : a.index++;
      a.key = [c, b, a.index].join(",");
      return a;
    };
    u(gb.prototype, {
      addSeries: function(a, b, c) {
        var d,
            e = this;
        a && (b = o(b, !0), I(e, "addSeries", {options: a}, function() {
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
            a = E(a, {
              index: this[e].length,
              isX: b
            });
        new ha(this, a);
        f[e] = ta(f[e] || {});
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
          b.loadingDiv = d = ba(Ma, {className: "highcharts-loading"}, u(e.style, {
            zIndex: 10,
            display: "none"
          }), b.container), b.loadingSpan = ba("span", null, e.labelStyle, d), N(b, "redraw", f);
        b.loadingSpan.innerHTML = a || c.lang.loading;
        if (!b.loadingShown)
          M(d, {
            opacity: 0,
            display: ""
          }), Wa(d, {opacity: e.style.opacity}, {duration: e.showDuration || 0}), b.loadingShown = !0;
        f();
      },
      hideLoading: function() {
        var a = this.options,
            b = this.loadingDiv;
        b && Wa(b, {opacity: 0}, {
          duration: a.loading.hideDuration || 100,
          complete: function() {
            M(b, {display: "none"});
          }
        });
        this.loadingShown = !1;
      }
    });
    u(Ja.prototype, {
      update: function(a, b, c, d) {
        function e() {
          f.applyOptions(a);
          if (f.y === null && h)
            f.graphic = h.destroy();
          if (Z(a) && !Ea(a))
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
          j.data[i] = Z(j.data[i]) && !Ea(j.data[i]) ? f.options : a;
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
        this.series.removePoint(sa(this, this.series.data), a, b);
      }
    });
    u(R.prototype, {
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
            n,
            q = e.xData;
        Ta(d, k);
        if (c) {
          for (d = e.zones.length; d--; )
            m.push("zoneGraph" + d, "zoneArea" + d);
          p(m, function(a) {
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
          for (n = !0; d && q[d - 1] > m; )
            d--;
        e.updateParallelArrays(i, "splice", d, 0, 0);
        e.updateParallelArrays(i, d);
        if (j && i.name)
          j[m] = i.name;
        h.splice(d, 0, a);
        n && (e.data.splice(d, 0, null), e.processData());
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
        Ta(c, h);
        b = o(b, !0);
        f ? f.firePointEvent("remove", null, i) : i();
      },
      remove: function(a, b) {
        var c = this,
            d = c.chart;
        I(c, "remove", null, function() {
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
            g = L[f].prototype,
            h = ["group", "markerGroup", "dataLabelsGroup"],
            i;
        if (a.type && a.type !== f || a.zIndex !== void 0)
          h.length = 0;
        p(h, function(a) {
          h[a] = c[a];
          delete c[a];
        });
        a = E(e, {
          animation: !1,
          index: this.index,
          pointStart: this.xData[0]
        }, {data: this.options.data}, a);
        this.remove(!1);
        for (i in g)
          this[i] = y;
        u(this, L[a.type || f].prototype);
        p(h, function(a) {
          c[a] = h[a];
        });
        this.init(d, a);
        d.linkSeries();
        o(b, !0) && d.redraw(!1);
      }
    });
    u(ha.prototype, {
      update: function(a, b) {
        var c = this.chart,
            a = c.options[this.coll][this.options.index] = E(this.userOptions, a);
        this.destroy(!0);
        this._addedPlotLB = this.chart._labelPanes = y;
        this.init(c, u(a, {events: y}));
        c.isDirtyBox = !0;
        o(b, !0) && c.redraw();
      },
      remove: function(a) {
        for (var b = this.chart,
            c = this.coll,
            d = this.series,
            e = d.length; e--; )
          d[e] && d[e].remove(!1);
        pa(b.axes, this);
        pa(b[c], this);
        b.options[c].splice(this.options.index, 1);
        p(b[c], function(a, b) {
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
    var wa = qa(R);
    L.line = wa;
    ea.area = E(ga, {
      softThreshold: !1,
      threshold: 0
    });
    var oa = qa(R, {
      type: "area",
      singleStacks: !1,
      getStackPoints: function() {
        var a = [],
            b = [],
            c = this.xAxis,
            d = this.yAxis,
            e = d.stacks[this.stackKey],
            f = {},
            g = this.points,
            h = this.index,
            i = d.series,
            k = i.length,
            j,
            l = o(d.options.reversedStacks, !0) ? 1 : -1,
            m,
            n;
        if (this.options.stacking) {
          for (m = 0; m < g.length; m++)
            f[g[m].x] = g[m];
          for (n in e)
            e[n].total !== null && b.push(n);
          b.sort(function(a, b) {
            return a - b;
          });
          j = Ca(i, function() {
            return this.visible;
          });
          p(b, function(g, i) {
            var n = 0,
                o,
                r;
            if (f[g] && !f[g].isNull)
              a.push(f[g]), p([-1, 1], function(a) {
                var c = a === 1 ? "rightNull" : "leftNull",
                    d = 0,
                    n = e[b[i + a]];
                if (n)
                  for (m = h; m >= 0 && m < k; )
                    o = n.points[m], o || (m === h ? f[g][c] = !0 : j[m] && (r = e[g].points[m]) && (d -= r[1] - r[0])), m += l;
                f[g][a === 1 ? "rightCliff" : "leftCliff"] = d;
              });
            else {
              for (m = h; m >= 0 && m < k; ) {
                if (o = e[g].points[m]) {
                  n = o[1];
                  break;
                }
                m += l;
              }
              n = d.toPixels(n, !0);
              a.push({
                isNull: !0,
                plotX: c.toPixels(g, !0),
                plotY: n,
                yBottom: n
              });
            }
          });
        }
        return a;
      },
      getGraphPath: function(a) {
        var b = R.prototype.getGraphPath,
            c = this.options,
            d = c.stacking,
            e = this.yAxis,
            f,
            g,
            h = [],
            i = [],
            k = this.index,
            j,
            l = e.stacks[this.stackKey],
            m = c.threshold,
            n = e.getThreshold(c.threshold),
            q,
            c = c.connectNulls || d === "percent",
            p = function(b, c, f) {
              var g = a[b],
                  b = d && l[g.x].points[k],
                  q = g[f + "Null"] || 0,
                  f = g[f + "Cliff"] || 0,
                  o,
                  p,
                  g = !0;
              f || q ? (o = (q ? b[0] : b[1]) + f, p = b[0] + f, g = !!q) : !d && a[c] && a[c].isNull && (o = p = m);
              o !== void 0 && (i.push({
                plotX: j,
                plotY: o === null ? n : e.getThreshold(o),
                isNull: g
              }), h.push({
                plotX: j,
                plotY: p === null ? n : e.getThreshold(p)
              }));
            },
            a = a || this.points;
        d && (a = this.getStackPoints());
        for (f = 0; f < a.length; f++)
          if (g = a[f].isNull, j = o(a[f].rectPlotX, a[f].plotX), q = o(a[f].yBottom, n), !g || c) {
            c || p(f, f - 1, "left");
            if (!g || d || !c)
              i.push(a[f]), h.push({
                x: f,
                plotX: j,
                plotY: q
              });
            c || p(f, f + 1, "right");
          }
        f = b.call(this, i, !0, !0);
        h.reversed = !0;
        g = b.call(this, h, !0, !0);
        g.length && (g[0] = "L");
        f = f.concat(g);
        b = b.call(this, i, !1, c);
        this.areaPath = f;
        return b;
      },
      drawGraph: function() {
        this.areaPath = [];
        R.prototype.drawGraph.apply(this);
        var a = this,
            b = this.areaPath,
            c = this.options,
            d = [["area", this.color, c.fillColor]];
        p(this.zones, function(b, f) {
          d.push(["zoneArea" + f, b.color || a.color, b.fillColor || c.fillColor]);
        });
        p(d, function(d) {
          var f = d[0],
              g = a[f];
          g ? g.animate({d: b}) : (g = {
            fill: d[2] || d[1],
            zIndex: 0
          }, d[2] || (g["fill-opacity"] = o(c.fillOpacity, 0.75)), a[f] = a.chart.renderer.path(b).attr(g).add(a.group));
        });
      },
      drawLegendSymbol: K.drawRectangle
    });
    L.area = oa;
    ea.spline = E(ga);
    wa = qa(R, {
      type: "spline",
      getPointSpline: function(a, b, c) {
        var d = b.plotX,
            e = b.plotY,
            f = a[c - 1],
            c = a[c + 1],
            g,
            h,
            i,
            k;
        if (f && !f.isNull && c && !c.isNull) {
          a = f.plotY;
          i = c.plotX;
          var c = c.plotY,
              j = 0;
          g = (1.5 * d + f.plotX) / 2.5;
          h = (1.5 * e + a) / 2.5;
          i = (1.5 * d + i) / 2.5;
          k = (1.5 * e + c) / 2.5;
          i !== g && (j = (k - h) * (i - d) / (i - g) + e - k);
          h += j;
          k += j;
          h > a && h > e ? (h = t(a, e), k = 2 * e - h) : h < a && h < e && (h = F(a, e), k = 2 * e - h);
          k > c && k > e ? (k = t(c, e), h = 2 * e - k) : k < c && k < e && (k = F(c, e), h = 2 * e - k);
          b.rightContX = i;
          b.rightContY = k;
        }
        b = ["C", o(f.rightContX, f.plotX), o(f.rightContY, f.plotY), o(g, d), o(h, e), d, e];
        f.rightContX = f.rightContY = null;
        return b;
      }
    });
    L.spline = wa;
    ea.areaspline = E(ea.area);
    oa = oa.prototype;
    wa = qa(wa, {
      type: "areaspline",
      getStackPoints: oa.getStackPoints,
      getGraphPath: oa.getGraphPath,
      setStackCliffs: oa.setStackCliffs,
      drawGraph: oa.drawGraph,
      drawLegendSymbol: K.drawRectangle
    });
    L.areaspline = wa;
    ea.column = E(ga, {
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
    wa = qa(R, {
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
        b.hasRendered && p(b.series, function(b) {
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
        b.grouping === !1 ? h = 1 : p(a.chart.series, function(b) {
          var c = b.options,
              e = b.yAxis,
              i;
          if (b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos)
            c.stacking ? (f = b.stackKey, g[f] === y && (g[f] = h++), i = g[f]) : c.grouping !== !1 && (i = h++), b.columnIndex = i;
        });
        var i = F(Q(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
            k = i * b.groupPadding,
            j = (i - 2 * k) / h,
            b = F(b.maxPointWidth || c.len, o(b.pointWidth, j * (1 - 2 * b.pointPadding)));
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
        g = Q(b) <= 0.5 && d > 0.5;
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
            k = a.barW = t(i, 1 + 2 * d),
            j = a.pointXOffset = h.offset;
        b.inverted && (f -= 0.5);
        c.pointPadding && (k = ua(k));
        R.prototype.translate.apply(a);
        p(a.points, function(c) {
          var d = F(o(c.yBottom, f), 9E4),
              h = 999 + Q(d),
              h = F(t(-h, c.plotY), e.len + h),
              q = c.plotX + j,
              p = k,
              s = F(h, d),
              r,
              w = t(h, d) - s;
          Q(w) < g && g && (w = g, r = !e.reversed && !c.negative || e.reversed && c.negative, s = Q(s - f) > g ? d - g : f - (r ? g : 0));
          c.barX = q;
          c.pointWidth = i;
          c.tooltipPos = b.inverted ? [e.len + e.pos - b.plotLeft - h, a.xAxis.len - q - p / 2, w] : [q + p / 2, h + e.pos - b.plotTop, w];
          c.shapeType = "rect";
          c.shapeArgs = a.crispCol(q, s, p, w);
        });
      },
      getSymbol: Aa,
      drawLegendSymbol: K.drawRectangle,
      drawGraph: Aa,
      drawPoints: function() {
        var a = this,
            b = this.chart,
            c = a.options,
            d = b.renderer,
            e = c.animationLimit || 250,
            f,
            g;
        p(a.points, function(h) {
          var i = h.graphic,
              k;
          if (J(h.plotY) && h.y !== null)
            f = h.shapeArgs, k = r(a.borderWidth) ? {"stroke-width": a.borderWidth} : {}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], i ? (Oa(i), i.attr(k).attr(g)[b.pointCount < e ? "animate" : "attr"](E(f))) : h.graphic = d[h.shapeType](f).attr(k).attr(g).add(h.group || a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius);
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
        if (fa)
          a ? (f.scaleY = 0.001, a = F(c.pos + c.len, t(c.pos, c.toPixels(d.threshold))), e ? f.translateX = a - c.len : f.translateY = a, b.group.attr(f)) : (f[e ? "translateX" : "translateY"] = c.pos, b.group.animate(f, u($a(b.options.animation), {step: function(a, c) {
              b.group.attr({scaleY: t(0.001, c.pos)});
            }})), b.animate = null);
      },
      remove: function() {
        var a = this,
            b = a.chart;
        b.hasRendered && p(b.series, function(b) {
          if (b.type === a.type)
            b.isDirty = !0;
        });
        R.prototype.remove.apply(a, arguments);
      }
    });
    L.column = wa;
    ea.bar = E(ea.column);
    oa = qa(wa, {
      type: "bar",
      inverted: !0
    });
    L.bar = oa;
    ea.scatter = E(ga, {
      lineWidth: 0,
      marker: {enabled: !0},
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
      }
    });
    oa = qa(R, {
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
    L.scatter = oa;
    ea.pie = E(ga, {
      borderColor: "#FFFFFF",
      borderWidth: 1,
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        distance: 30,
        enabled: !0,
        formatter: function() {
          return this.y === null ? void 0 : this.point.name;
        },
        x: 0
      },
      ignoreHiddenPoint: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      states: {hover: {
          brightness: 0.1,
          shadow: !1
        }},
      stickyTracking: !1,
      tooltip: {followPointer: !0}
    });
    ga = {
      type: "pie",
      isCartesian: !1,
      pointClass: qa(Ja, {
        init: function() {
          Ja.prototype.init.apply(this, arguments);
          var a = this,
              b;
          a.name = o(a.name, "Slice");
          b = function(b) {
            a.slice(b.type === "select");
          };
          N(a, "select", b);
          N(a, "unselect", b);
          return a;
        },
        setVisible: function(a, b) {
          var c = this,
              d = c.series,
              e = d.chart,
              f = d.options.ignoreHiddenPoint,
              b = o(b, f);
          if (a !== c.visible) {
            c.visible = c.options.visible = a = a === y ? !c.visible : a;
            d.options.data[sa(c, d.data)] = c.options;
            p(["graphic", "dataLabel", "connector", "shadowGroup"], function(b) {
              if (c[b])
                c[b][a ? "show" : "hide"](!0);
            });
            c.legendItem && e.legend.colorizeItem(c, a);
            !a && c.state === "hover" && c.setState("");
            if (f)
              d.isDirty = !0;
            b && e.redraw();
          }
        },
        slice: function(a, b, c) {
          var d = this.series;
          Ta(c, d.chart);
          o(b, !0);
          this.sliced = this.options.sliced = a = r(a) ? a : !this.sliced;
          d.options.data[sa(this, d.data)] = this.options;
          a = a ? this.slicedTranslation : {
            translateX: 0,
            translateY: 0
          };
          this.graphic.animate(a);
          this.shadowGroup && this.shadowGroup.animate(a);
        },
        haloPath: function(a) {
          var b = this.shapeArgs,
              c = this.series.chart;
          return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
            innerR: this.shapeArgs.r,
            start: b.start,
            end: b.end
          });
        }
      }),
      requireSorting: !1,
      directTouch: !0,
      noSharedTooltip: !0,
      trackerGroups: ["group", "dataLabelsGroup"],
      axisTypes: [],
      pointAttrToOptions: {
        stroke: "borderColor",
        "stroke-width": "borderWidth",
        fill: "color"
      },
      animate: function(a) {
        var b = this,
            c = b.points,
            d = b.startAngleRad;
        if (!a)
          p(c, function(a) {
            var c = a.graphic,
                g = a.shapeArgs;
            c && (c.attr({
              r: a.startR || b.center[3] / 2,
              start: d,
              end: d
            }), c.animate({
              r: g.r,
              start: g.start,
              end: g.end
            }, b.options.animation));
          }), b.animate = null;
      },
      updateTotals: function() {
        var a,
            b = 0,
            c = this.points,
            d = c.length,
            e,
            f = this.options.ignoreHiddenPoint;
        for (a = 0; a < d; a++)
          e = c[a], b += f && !e.visible ? 0 : e.y;
        this.total = b;
        for (a = 0; a < d; a++)
          e = c[a], e.percentage = b > 0 && (e.visible || !f) ? e.y / b * 100 : 0, e.total = b;
      },
      generatePoints: function() {
        R.prototype.generatePoints.call(this);
        this.updateTotals();
      },
      translate: function(a) {
        this.generatePoints();
        var b = 0,
            c = this.options,
            d = c.slicedOffset,
            e = d + c.borderWidth,
            f,
            g,
            h,
            i = c.startAngle || 0,
            k = this.startAngleRad = ra / 180 * (i - 90),
            i = (this.endAngleRad = ra / 180 * (o(c.endAngle, i + 360) - 90)) - k,
            j = this.points,
            l = c.dataLabels.distance,
            c = c.ignoreHiddenPoint,
            m,
            n = j.length,
            q;
        if (!a)
          this.center = a = this.getCenter();
        this.getX = function(b, c) {
          h = Y.asin(F((b - a[1]) / (a[2] / 2 + l), 1));
          return a[0] + (c ? -1 : 1) * W(h) * (a[2] / 2 + l);
        };
        for (m = 0; m < n; m++) {
          q = j[m];
          f = k + b * i;
          if (!c || q.visible)
            b += q.percentage / 100;
          g = k + b * i;
          q.shapeType = "arc";
          q.shapeArgs = {
            x: a[0],
            y: a[1],
            r: a[2] / 2,
            innerR: a[3] / 2,
            start: B(f * 1E3) / 1E3,
            end: B(g * 1E3) / 1E3
          };
          h = (g + f) / 2;
          h > 1.5 * ra ? h -= 2 * ra : h < -ra / 2 && (h += 2 * ra);
          q.slicedTranslation = {
            translateX: B(W(h) * d),
            translateY: B(da(h) * d)
          };
          f = W(h) * a[2] / 2;
          g = da(h) * a[2] / 2;
          q.tooltipPos = [a[0] + f * 0.7, a[1] + g * 0.7];
          q.half = h < -ra / 2 || h > ra / 2 ? 1 : 0;
          q.angle = h;
          e = F(e, l / 2);
          q.labelPos = [a[0] + f + W(h) * l, a[1] + g + da(h) * l, a[0] + f + W(h) * e, a[1] + g + da(h) * e, a[0] + f, a[1] + g, l < 0 ? "center" : q.half ? "right" : "left", h];
        }
      },
      drawGraph: null,
      drawPoints: function() {
        var a = this,
            b = a.chart.renderer,
            c,
            d,
            e = a.options.shadow,
            f,
            g,
            h,
            i;
        if (e && !a.shadowGroup)
          a.shadowGroup = b.g("shadow").add(a.group);
        p(a.points, function(k) {
          if (k.y !== null) {
            d = k.graphic;
            h = k.shapeArgs;
            f = k.shadowGroup;
            g = k.pointAttr[k.selected ? "select" : ""];
            if (!g.stroke)
              g.stroke = g.fill;
            if (e && !f)
              f = k.shadowGroup = b.g("shadow").add(a.shadowGroup);
            c = k.sliced ? k.slicedTranslation : {
              translateX: 0,
              translateY: 0
            };
            f && f.attr(c);
            if (d)
              d.setRadialReference(a.center).attr(g).animate(u(h, c));
            else {
              i = {"stroke-linejoin": "round"};
              if (!k.visible)
                i.visibility = "hidden";
              k.graphic = d = b[k.shapeType](h).setRadialReference(a.center).attr(g).attr(i).attr(c).add(a.group).shadow(e, f);
            }
          }
        });
      },
      searchPoint: Aa,
      sortByAngle: function(a, b) {
        a.sort(function(a, d) {
          return a.angle !== void 0 && (d.angle - a.angle) * b;
        });
      },
      drawLegendSymbol: K.drawRectangle,
      getCenter: Bb.getCenter,
      getSymbol: Aa
    };
    ga = qa(R, ga);
    L.pie = ga;
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
        })), g = d, p(e, function(e) {
          var h,
              j = e.dataLabel,
              p,
              s,
              t = e.connector,
              w = !0,
              v,
              x = {};
          f = e.dlOptions || e.options && e.options.dataLabels;
          h = o(f && f.enabled, g.enabled) && e.y !== null;
          if (j && !h)
            e.dataLabel = j.destroy();
          else if (h) {
            d = E(g, f);
            v = d.style;
            h = d.rotation;
            p = e.getLabelConfig();
            i = d.format ? Ka(d.format, p) : d.formatter.call(p, d);
            v.color = o(d.color, v.color, a.color, "black");
            if (j)
              if (r(i))
                j.attr({text: i}), w = !1;
              else {
                if (e.dataLabel = j = j.destroy(), t)
                  e.connector = t.destroy();
              }
            else if (r(i)) {
              j = {
                fill: d.backgroundColor,
                stroke: d.borderColor,
                "stroke-width": d.borderWidth,
                r: d.borderRadius || 0,
                rotation: h,
                padding: d.padding,
                zIndex: 1
              };
              if (v.color === "contrast")
                x.color = d.inside || d.distance < 0 || b.stacking ? l.getContrast(e.color || a.color) : "#000000";
              if (c)
                x.cursor = c;
              for (s in j)
                j[s] === y && delete j[s];
              j = e.dataLabel = l[h ? "text" : "label"](i, 0, -9999, d.shape, null, null, d.useHTML).attr(j).css(u(v, x)).add(k).shadow(d.shadow);
            }
            j && a.alignDataLabel(e, j, d, null, w);
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
          n = this.visible && (a.series.forceDL || f.isInsidePlot(h, B(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g)),
          q = o(c.overflow, "justify") === "justify";
      if (n)
        d = u({
          x: g ? f.plotWidth - i : h,
          y: B(g ? f.plotHeight - h : i),
          width: 0,
          height: 0
        }, d), u(c, {
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
        Oa(b), b.attr({y: -9999}), b.placed = !1;
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
    if (L.pie)
      L.pie.prototype.drawDataLabels = function() {
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
            n = a.center,
            q = n[2] / 2,
            r = n[1],
            s = m > 0,
            u,
            w,
            v,
            x = [[], []],
            y,
            A,
            D,
            E,
            C,
            H = [0, 0, 0, 0],
            M = function(a, b) {
              return b.y - a.y;
            };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
          R.prototype.drawDataLabels.apply(a);
          p(b, function(a) {
            if (a.dataLabel && a.visible)
              x[a.half].push(a), a.dataLabel._pos = null;
          });
          for (E = 2; E--; ) {
            var I = [],
                N = [],
                J = x[E],
                L = J.length,
                K;
            if (L) {
              a.sortByAngle(J, E - 0.5);
              for (C = b = 0; !b && J[C]; )
                b = J[C] && J[C].dataLabel && (J[C].dataLabel.getBBox().height || 21), C++;
              if (m > 0) {
                w = F(r + q + m, d.plotHeight);
                for (C = t(0, r - q - m); C <= w; C += b)
                  I.push(C);
                w = I.length;
                if (L > w) {
                  c = [].concat(J);
                  c.sort(M);
                  for (C = L; C--; )
                    c[C].rank = C;
                  for (C = L; C--; )
                    J[C].rank >= w && J.splice(C, 1);
                  L = J.length;
                }
                for (C = 0; C < L; C++) {
                  c = J[C];
                  v = c.labelPos;
                  c = 9999;
                  var P,
                      O;
                  for (O = 0; O < w; O++)
                    P = Q(I[O] - v[1]), P < c && (c = P, K = O);
                  if (K < C && I[C] !== null)
                    K = C;
                  else
                    for (w < L - C + K && I[C] !== null && (K = w - L + C); I[K] === null; )
                      K++;
                  N.push({
                    i: K,
                    y: I[K]
                  });
                  I[K] = null;
                }
                N.sort(M);
              }
              for (C = 0; C < L; C++) {
                c = J[C];
                v = c.labelPos;
                u = c.dataLabel;
                D = c.visible === !1 ? "hidden" : "inherit";
                c = v[1];
                if (m > 0) {
                  if (w = N.pop(), K = w.i, A = w.y, c > A && I[K + 1] !== null || c < A && I[K - 1] !== null)
                    A = F(t(0, c), d.plotHeight);
                } else
                  A = c;
                y = e.justify ? n[0] + (E ? -1 : 1) * (q + m) : a.getX(A === r - q - m || A === r + q + m ? c : A, E);
                u._attr = {
                  visibility: D,
                  align: v[6]
                };
                u._pos = {
                  x: y + e.x + ({
                    left: f,
                    right: -f
                  }[v[6]] || 0),
                  y: A + e.y - 10
                };
                u.connX = y;
                u.connY = A;
                if (this.options.size === null)
                  w = u.width, y - w < f ? H[3] = t(B(w - y + f), H[3]) : y + w > h - f && (H[1] = t(B(y + w - h + f), H[1])), A - b / 2 < 0 ? H[0] = t(B(-A + b / 2), H[0]) : A + b / 2 > i && (H[2] = t(B(A + b / 2 - i), H[2]));
              }
            }
          }
          if (Ga(H) === 0 || this.verifyDataLabelOverflow(H))
            this.placeDataLabels(), s && g && p(this.points, function(b) {
              k = b.connector;
              v = b.labelPos;
              if ((u = b.dataLabel) && u._pos && b.visible)
                D = u._attr.visibility, y = u.connX, A = u.connY, j = l ? ["M", y + (v[6] === "left" ? 5 : -5), A, "C", y, A, 2 * v[2] - v[4], 2 * v[3] - v[5], v[2], v[3], "L", v[4], v[5]] : ["M", y + (v[6] === "left" ? 5 : -5), A, "L", v[2], v[3], "L", v[4], v[5]], k ? (k.animate({d: j}), k.attr("visibility", D)) : b.connector = k = a.chart.renderer.path(j).attr({
                  "stroke-width": g,
                  stroke: e.connectorColor || b.color || "#606060",
                  visibility: D
                }).add(a.dataLabelsGroup);
              else if (k)
                b.connector = k.destroy();
            });
        }
      }, L.pie.prototype.placeDataLabels = function() {
        p(this.points, function(a) {
          var b = a.dataLabel;
          if (b && a.visible)
            (a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999});
        });
      }, L.pie.prototype.alignDataLabel = Aa, L.pie.prototype.verifyDataLabelOverflow = function(a) {
        var b = this.center,
            c = this.options,
            d = c.center,
            e = c.minSize || 80,
            f = e,
            g;
        d[0] !== null ? f = t(b[2] - t(a[1], a[3]), e) : (f = t(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2);
        d[1] !== null ? f = t(F(f, b[2] - t(a[0], a[2])), e) : (f = t(F(f, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2);
        f < b[2] ? (b[2] = f, b[3] = Math.min(/%$/.test(c.innerSize || 0) ? f * parseFloat(c.innerSize || 0) / 100 : parseFloat(c.innerSize || 0), f), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : g = !0;
        return g;
      };
    if (L.column)
      L.column.prototype.alignDataLabel = function(a, b, c, d, e) {
        var f = this.chart.inverted,
            g = a.series,
            h = a.dlBox || a.shapeArgs,
            i = o(a.below, a.plotY > o(this.translatedThreshold, g.yAxis.len)),
            k = o(c.inside, !!this.options.stacking);
        if (h) {
          d = E(h);
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
            q,
            o;
        for (e = 0; e < b; e++)
          if (d = a[e])
            d.oldOpacity = d.opacity, d.newOpacity = 1;
        a.sort(function(a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });
        for (e = 0; e < b; e++) {
          k = a[e];
          for (d = e + 1; d < b; ++d)
            if (j = a[d], k && j && k.placed && j.placed && k.newOpacity !== 0 && j.newOpacity !== 0 && (l = k.alignAttr, m = j.alignAttr, n = k.parentGroup, q = j.parentGroup, o = 2 * (k.box ? 0 : k.padding), l = !(m.x + q.translateX > l.x + n.translateX + (k.width - o) || m.x + q.translateX + (j.width - o) < l.x + n.translateX || m.y + q.translateY > l.y + n.translateY + (k.height - o) || m.y + q.translateY + (j.height - o) < l.y + n.translateY)))
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
    })(x);
    ga = x.TrackerMixin = {
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
              if (d !== y && d !== b.hoverPoint)
                d.onMouseOver(a);
            };
        p(a.points, function(a) {
          if (a.graphic)
            a.graphic.element.point = a;
          if (a.dataLabel)
            a.dataLabel.element.point = a;
        });
        if (!a._hasTracking)
          p(a.trackerGroups, function(b) {
            if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
              c.onTrackerMouseOut(a);
            }).css(e), db))
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
            n = "rgba(192,192,192," + (fa ? 1.0E-4 : 0.002) + ")";
        if (e && !c)
          for (j = e + 1; j--; )
            d[j] === "M" && d.splice(j + 1, 0, d[j + 1] - i, d[j + 2], "L"), (j && d[j] === "M" || j === e) && d.splice(j, 0, "L", d[j - 2] + i, d[j - 1]);
        k ? k.attr({d: d}) : (a.tracker = h.path(d).attr({
          "stroke-linejoin": "round",
          visibility: a.visible ? "visible" : "hidden",
          stroke: n,
          fill: c ? n : "none",
          "stroke-width": b.lineWidth + (c ? 0 : 2 * i),
          zIndex: 2
        }).add(a.group), p([a.tracker, a.markerGroup], function(a) {
          a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function(a) {
            g.onTrackerMouseOut(a);
          }).css(l);
          if (db)
            a.on("touchstart", m);
        }));
      }
    };
    if (L.column)
      wa.prototype.drawTracker = ga.drawTrackerPoint;
    if (L.pie)
      L.pie.prototype.drawTracker = ga.drawTrackerPoint;
    if (L.scatter)
      oa.prototype.drawTracker = ga.drawTrackerPoint;
    u(ob.prototype, {
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
          a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : I(a, "legendItemClick", b, c);
        });
      },
      createCheckboxForItem: function(a) {
        a.checkbox = ba("input", {
          type: "checkbox",
          checked: a.selected,
          defaultChecked: a.selected
        }, this.options.itemCheckboxStyle, this.chart.container);
        N(a.checkbox, "click", function(b) {
          I(a.series || a, "checkboxClick", {
            checked: b.target.checked,
            item: a
          }, function() {
            a.select();
          });
        });
      }
    });
    U.legend.itemStyle.cursor = "pointer";
    u(gb.prototype, {
      showResetZoom: function() {
        var a = this,
            b = U.lang,
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
        I(a, "selection", {resetSelection: !0}, function() {
          a.zoom();
        });
      },
      zoom: function(a) {
        var b,
            c = this.pointer,
            d = !1,
            e;
        !a || a.resetSelection ? p(this.axes, function(a) {
          b = a.zoom();
        }) : p(a.xAxis.concat(a.yAxis), function(a) {
          var e = a.axis,
              h = e.isXAxis;
          if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"])
            b = e.zoom(a.min, a.max), e.displayBtn && (d = !0);
        });
        e = this.resetZoomButton;
        if (d && !e)
          this.showResetZoom();
        else if (!d && Z(e))
          this.resetZoomButton = e.destroy();
        b && this.redraw(o(this.options.chart.animation, a && a.animation, this.pointCount < 100));
      },
      pan: function(a, b) {
        var c = this,
            d = c.hoverPoints,
            e;
        d && p(d, function(a) {
          a.setState();
        });
        p(b === "xy" ? [1, 0] : [1], function(b) {
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
          if (b.series.length && (i || l > F(j.dataMin, j.min)) && (!i || k < t(j.dataMax, j.max)))
            b.setExtremes(l, k, !1, !1, {trigger: "pan"}), e = !0;
          c[d] = h;
        });
        e && c.redraw(!1);
        M(c.container, {cursor: "move"});
      }
    });
    u(Ja.prototype, {
      select: function(a, b) {
        var c = this,
            d = c.series,
            e = d.chart,
            a = o(a, !c.selected);
        c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function() {
          c.selected = c.options.selected = a;
          d.options.data[sa(c, d.data)] = c.options;
          c.setState(a && "select");
          b || p(e.getSelectedPoints(), function(a) {
            if (a.selected && a !== c)
              a.selected = a.options.selected = !1, d.options.data[sa(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect");
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
        if (!b || sa(this, b) === -1)
          this.setState(), a.hoverPoint = null;
      },
      importEvents: function() {
        if (!this.hasImportedEvents) {
          var a = E(this.series.options.point, this.options).events,
              b;
          this.events = a;
          for (b in a)
            N(this, b, a[b]);
          this.hasImportedEvents = !0;
        }
      },
      setState: function(a, b) {
        var c = V(this.plotX),
            d = this.plotY,
            e = this.series,
            f = e.options.states,
            g = ea[e.type].marker && e.options.marker,
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
            g = g && this.graphic.symbolName && o.r, this.graphic.attr(E(o, g ? {
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
            n.attr(u({
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
    u(R.prototype, {
      onMouseOver: function() {
        var a = this.chart,
            b = a.hoverSeries;
        if (b && b !== this)
          b.onMouseOut();
        this.options.events.mouseOver && I(this, "mouseOver");
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
        this && a.events.mouseOut && I(this, "mouseOut");
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
        f = (c.visible = a = c.userOptions.visible = a === y ? !h : a) ? "show" : "hide";
        p(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
          if (c[a])
            c[a][f]();
        });
        if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)
          c.onMouseOut();
        e && d.legend.colorizeItem(c, a);
        c.isDirty = !0;
        c.options.stacking && p(d.series, function(a) {
          if (a.options.stacking && a.visible)
            a.isDirty = !0;
        });
        p(c.linkedSeries, function(b) {
          b.setVisible(a, !1);
        });
        if (g)
          d.isDirtyBox = !0;
        b !== !1 && d.redraw();
        I(c, f);
      },
      show: function() {
        this.setVisible(!0);
      },
      hide: function() {
        this.setVisible(!1);
      },
      select: function(a) {
        this.selected = a = a === y ? !this.selected : a;
        if (this.checkbox)
          this.checkbox.checked = a;
        I(this, a ? "select" : "unselect");
      },
      drawTracker: ga.drawTrackerGraph
    });
    u(x, {
      Color: ma,
      Point: Ja,
      Tick: Va,
      Renderer: cb,
      SVGElement: O,
      SVGRenderer: Da,
      arrayMin: La,
      arrayMax: Ga,
      charts: T,
      correctFloat: ca,
      dateFormat: Qa,
      error: aa,
      format: Ka,
      pathAnim: void 0,
      getOptions: function() {
        return U;
      },
      hasBidiBug: Pb,
      isTouchDevice: Lb,
      setOptions: function(a) {
        U = E(!0, U, a);
        Eb();
        return U;
      },
      addEvent: N,
      removeEvent: X,
      createElement: ba,
      discardElement: Sa,
      css: M,
      each: p,
      map: Ca,
      merge: E,
      splat: ta,
      stableSort: hb,
      extendClass: qa,
      pInt: C,
      svg: fa,
      canvas: ka,
      vml: !fa && !ka,
      product: "Highcharts",
      version: "4.2.5"
    });
    return x;
  });
})(require('process'));
