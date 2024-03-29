/* */ 
(function(process) {
  (function(c) {
    typeof module === "object" && module.exports ? module.exports = c : c(Highcharts);
  })(function(c) {
    function z(a, b, d, f, h) {
      for (var h = h || 0,
          f = f || A,
          c = h + f,
          r = !0; r && h < c && h < a.length; )
        r = b(a[h], h), h += 1;
      r && (h < a.length ? setTimeout(function() {
        z(a, b, d, f, h);
      }) : d && d());
    }
    var s = c.win.document,
        R = function() {},
        S = c.Color,
        k = c.Series,
        e = c.seriesTypes,
        l = c.each,
        t = c.extend,
        T = c.addEvent,
        U = c.fireEvent,
        u = c.grep,
        m = c.isNumber,
        V = c.merge,
        W = c.pick,
        j = c.wrap,
        p = c.getOptions().plotOptions,
        A = 5E4,
        B;
    l(["area", "arearange", "column", "line", "scatter"], function(a) {
      if (p[a])
        p[a].boostThreshold = 5E3;
    });
    l(["translate", "generatePoints", "drawTracker", "drawPoints", "render"], function(a) {
      function b(b) {
        var f = this.options.stacking && (a === "translate" || a === "generatePoints");
        if ((this.processedXData || this.options.data).length < (this.options.boostThreshold || Number.MAX_VALUE) || f) {
          if (a === "render" && this.image)
            this.image.attr({href: ""}), this.animate = null;
          b.call(this);
        } else if (this[a + "Canvas"])
          this[a + "Canvas"]();
      }
      j(k.prototype, a, b);
      a === "translate" && (e.column && j(e.column.prototype, a, b), e.arearange && j(e.arearange.prototype, a, b));
    });
    j(k.prototype, "getExtremes", function(a) {
      this.hasExtremes() || a.apply(this, Array.prototype.slice.call(arguments, 1));
    });
    j(k.prototype, "setData", function(a) {
      this.hasExtremes(!0) || a.apply(this, Array.prototype.slice.call(arguments, 1));
    });
    j(k.prototype, "processData", function(a) {
      this.hasExtremes(!0) || a.apply(this, Array.prototype.slice.call(arguments, 1));
    });
    c.extend(k.prototype, {
      pointRange: 0,
      allowDG: !1,
      hasExtremes: function(a) {
        var b = this.options,
            d = this.xAxis && this.xAxis.options,
            f = this.yAxis && this.yAxis.options;
        return b.data.length > (b.boostThreshold || Number.MAX_VALUE) && m(f.min) && m(f.max) && (!a || m(d.min) && m(d.max));
      },
      destroyGraphics: function() {
        var a = this,
            b = this.points,
            d,
            f;
        if (b)
          for (f = 0; f < b.length; f += 1)
            if ((d = b[f]) && d.graphic)
              d.graphic = d.graphic.destroy();
        l(["graph", "area", "tracker"], function(b) {
          a[b] && (a[b] = a[b].destroy());
        });
      },
      getContext: function() {
        var a = this.chart,
            b = a.plotWidth,
            d = a.plotHeight,
            f = this.ctx,
            h = function(a, b, d, f, h, c, e) {
              a.call(this, d, b, f, h, c, e);
            };
        this.canvas ? f.clearRect(0, 0, b, d) : (this.canvas = s.createElement("canvas"), this.image = a.renderer.image("", 0, 0, b, d).add(this.group), this.ctx = f = this.canvas.getContext("2d"), a.inverted && l(["moveTo", "lineTo", "rect", "arc"], function(a) {
          j(f, a, h);
        }));
        this.canvas.width = b;
        this.canvas.height = d;
        this.image.attr({
          width: b,
          height: d
        });
        return f;
      },
      canvasToSVG: function() {
        this.image.attr({href: this.canvas.toDataURL("image/png")});
      },
      cvsLineTo: function(a, b, d) {
        a.lineTo(b, d);
      },
      renderCanvas: function() {
        var a = this,
            b = a.options,
            d = a.chart,
            f = this.xAxis,
            h = this.yAxis,
            c,
            e = 0,
            j = a.processedXData,
            k = a.processedYData,
            l = b.data,
            i = f.getExtremes(),
            p = i.min,
            s = i.max,
            i = h.getExtremes(),
            u = i.min,
            X = i.max,
            C = {},
            v,
            Y = !!a.sampling,
            D,
            E = b.marker && b.marker.radius,
            F = this.cvsDrawPoint,
            G = b.lineWidth ? this.cvsLineTo : !1,
            H = E <= 1 ? this.cvsMarkerSquare : this.cvsMarkerCircle,
            Z = b.enableMouseTracking !== !1,
            I,
            i = b.threshold,
            n = h.getThreshold(i),
            J = m(i),
            K = n,
            $ = this.fill,
            L = a.pointArrayMap && a.pointArrayMap.join(",") === "low,high",
            M = !!b.stacking,
            aa = a.cropStart || 0,
            i = d.options.loading,
            ba = a.requireSorting,
            N,
            ca = b.connectNulls,
            O = !j,
            w,
            x,
            o,
            q,
            da = a.fillOpacity ? (new S(a.color)).setOpacity(W(b.fillOpacity, 0.75)).get() : a.color,
            P = function() {
              $ ? (c.fillStyle = da, c.fill()) : (c.strokeStyle = a.color, c.lineWidth = b.lineWidth, c.stroke());
            },
            Q = function(a, b, d) {
              e === 0 && c.beginPath();
              N ? c.moveTo(a, b) : F ? F(c, a, b, d, I) : G ? G(c, a, b) : H && H(c, a, b, E);
              e += 1;
              e === 1E3 && (P(), e = 0);
              I = {
                clientX: a,
                plotY: b,
                yBottom: d
              };
            },
            y = function(a, b, c) {
              Z && !C[a + "," + b] && (C[a + "," + b] = !0, d.inverted && (a = f.len - a, b = h.len - b), D.push({
                clientX: a,
                plotX: a,
                plotY: b,
                i: aa + c
              }));
            };
        (this.points || this.graph) && this.destroyGraphics();
        a.plotGroup("group", "series", a.visible ? "visible" : "hidden", b.zIndex, d.seriesGroup);
        a.getAttribs();
        a.markerGroup = a.group;
        T(a, "destroy", function() {
          a.markerGroup = null;
        });
        D = this.points = [];
        c = this.getContext();
        a.buildKDTree = R;
        if (l.length > 99999)
          d.options.loading = V(i, {
            labelStyle: {
              backgroundColor: "rgba(255,255,255,0.75)",
              padding: "1em",
              borderRadius: "0.5em"
            },
            style: {
              backgroundColor: "none",
              opacity: 1
            }
          }), clearTimeout(B), d.showLoading("Drawing..."), d.options.loading = i;
        z(M ? a.data : j || l, function(b, c) {
          var e,
              g,
              j,
              i,
              l = typeof d.index === "undefined",
              m = !0;
          if (!l) {
            O ? (e = b[0], g = b[1]) : (e = b, g = k[c]);
            if (L)
              O && (g = b.slice(1, 3)), i = g[0], g = g[1];
            else if (M)
              e = b.x, g = b.stackY, i = g - b.y;
            j = g === null;
            ba || (m = g >= u && g <= X);
            if (!j && e >= p && e <= s && m)
              if (e = Math.round(f.toPixels(e, !0)), Y) {
                if (o === void 0 || e === v) {
                  L || (i = g);
                  if (q === void 0 || g > x)
                    x = g, q = c;
                  if (o === void 0 || i < w)
                    w = i, o = c;
                }
                e !== v && (o !== void 0 && (g = h.toPixels(x, !0), n = h.toPixels(w, !0), Q(e, J ? Math.min(g, K) : g, J ? Math.max(n, K) : n), y(e, g, q), n !== g && y(e, n, o)), o = q = void 0, v = e);
              } else
                g = Math.round(h.toPixels(g, !0)), Q(e, g, n), y(e, g, c);
            N = j && !ca;
            c % A === 0 && a.canvasToSVG();
          }
          return !l;
        }, function() {
          var b = d.loadingDiv,
              c = d.loadingShown;
          P();
          a.canvasToSVG();
          U(a, "renderedCanvas");
          if (c)
            t(b.style, {
              transition: "opacity 250ms",
              opacity: 0
            }), d.loadingShown = !1, B = setTimeout(function() {
              b.parentNode && b.parentNode.removeChild(b);
              d.loadingDiv = d.loadingSpan = null;
            }, 250);
          a.directTouch = !1;
          a.options.stickyTracking = !0;
          delete a.buildKDTree;
          a.buildKDTree();
        }, d.renderer.forExport ? Number.MAX_VALUE : void 0);
      }
    });
    e.scatter.prototype.cvsMarkerCircle = function(a, b, d, c) {
      a.moveTo(b, d);
      a.arc(b, d, c, 0, 2 * Math.PI, !1);
    };
    e.scatter.prototype.cvsMarkerSquare = function(a, b, d, c) {
      a.rect(b - c, d - c, c * 2, c * 2);
    };
    e.scatter.prototype.fill = !0;
    t(e.area.prototype, {
      cvsDrawPoint: function(a, b, d, c, e) {
        e && b !== e.clientX && (a.moveTo(e.clientX, e.yBottom), a.lineTo(e.clientX, e.plotY), a.lineTo(b, d), a.lineTo(b, c));
      },
      fill: !0,
      fillOpacity: !0,
      sampling: !0
    });
    t(e.column.prototype, {
      cvsDrawPoint: function(a, b, d, c) {
        a.rect(b - 1, d, 1, c - d);
      },
      fill: !0,
      sampling: !0
    });
    k.prototype.getPoint = function(a) {
      var b = a;
      if (a && !(a instanceof this.pointClass))
        b = (new this.pointClass).init(this, this.options.data[a.i]), b.category = b.x, b.dist = a.dist, b.distX = a.distX, b.plotX = a.plotX, b.plotY = a.plotY;
      return b;
    };
    j(k.prototype, "destroy", function(a) {
      var b = this,
          c = b.chart;
      if (c.hoverPoints)
        c.hoverPoints = u(c.hoverPoints, function(a) {
          return a.series === b;
        });
      if (c.hoverPoint && c.hoverPoint.series === b)
        c.hoverPoint = null;
      a.call(this);
    });
    j(k.prototype, "searchPoint", function(a) {
      return this.getPoint(a.apply(this, [].slice.call(arguments, 1)));
    });
  });
})(require('process'));
