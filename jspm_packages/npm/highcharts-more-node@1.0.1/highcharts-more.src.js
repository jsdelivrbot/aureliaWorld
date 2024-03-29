/* */ 
"format cjs";
(function(process) {
  ;
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['highcharts'], factory);
    } else if (typeof exports === 'object') {
      module.exports = function(root, Highcharts) {
        if (Highcharts === undefined) {
          Highcharts = typeof window !== 'undefined' ? require('highcharts') : require('highcharts')(root);
        }
        return factory(Highcharts);
      };
    } else {
      return factory(root.Highcharts);
    }
  }(this, function(Highcharts) {
    var arrayMin = Highcharts.arrayMin,
        arrayMax = Highcharts.arrayMax,
        each = Highcharts.each,
        extend = Highcharts.extend,
        isNumber = Highcharts.isNumber,
        merge = Highcharts.merge,
        map = Highcharts.map,
        pick = Highcharts.pick,
        pInt = Highcharts.pInt,
        correctFloat = Highcharts.correctFloat,
        defaultPlotOptions = Highcharts.getOptions().plotOptions,
        seriesTypes = Highcharts.seriesTypes,
        extendClass = Highcharts.extendClass,
        splat = Highcharts.splat,
        wrap = Highcharts.wrap,
        Axis = Highcharts.Axis,
        Tick = Highcharts.Tick,
        Point = Highcharts.Point,
        Pointer = Highcharts.Pointer,
        CenteredSeriesMixin = Highcharts.CenteredSeriesMixin,
        TrackerMixin = Highcharts.TrackerMixin,
        Series = Highcharts.Series,
        math = Math,
        mathRound = math.round,
        mathFloor = math.floor,
        mathMax = math.max,
        Color = Highcharts.Color,
        noop = function() {},
        UNDEFINED;
    function Pane(options, chart, firstAxis) {
      this.init(options, chart, firstAxis);
    }
    extend(Pane.prototype, {
      init: function(options, chart, firstAxis) {
        var pane = this,
            backgroundOption,
            defaultOptions = pane.defaultOptions;
        pane.chart = chart;
        pane.options = options = merge(defaultOptions, chart.angular ? {background: {}} : undefined, options);
        backgroundOption = options.background;
        if (backgroundOption) {
          each([].concat(splat(backgroundOption)).reverse(), function(config) {
            var backgroundColor = config.backgroundColor,
                axisUserOptions = firstAxis.userOptions;
            config = merge(pane.defaultBackgroundOptions, config);
            if (backgroundColor) {
              config.backgroundColor = backgroundColor;
            }
            config.color = config.backgroundColor;
            firstAxis.options.plotBands.unshift(config);
            axisUserOptions.plotBands = axisUserOptions.plotBands || [];
            if (axisUserOptions.plotBands !== firstAxis.options.plotBands) {
              axisUserOptions.plotBands.unshift(config);
            }
          });
        }
      },
      defaultOptions: {
        center: ['50%', '50%'],
        size: '85%',
        startAngle: 0
      },
      defaultBackgroundOptions: {
        shape: 'circle',
        borderWidth: 1,
        borderColor: 'silver',
        backgroundColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [[0, '#FFF'], [1, '#DDD']]
        },
        from: -Number.MAX_VALUE,
        innerRadius: 0,
        to: Number.MAX_VALUE,
        outerRadius: '105%'
      }
    });
    var axisProto = Axis.prototype,
        tickProto = Tick.prototype;
    var hiddenAxisMixin = {
      getOffset: noop,
      redraw: function() {
        this.isDirty = false;
      },
      render: function() {
        this.isDirty = false;
      },
      setScale: noop,
      setCategories: noop,
      setTitle: noop
    };
    var radialAxisMixin = {
      isRadial: true,
      defaultRadialGaugeOptions: {
        labels: {
          align: 'center',
          x: 0,
          y: null
        },
        minorGridLineWidth: 0,
        minorTickInterval: 'auto',
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickWidth: 1,
        tickLength: 10,
        tickPosition: 'inside',
        tickWidth: 2,
        title: {rotation: 0},
        zIndex: 2
      },
      defaultRadialXOptions: {
        gridLineWidth: 1,
        labels: {
          align: null,
          distance: 15,
          x: 0,
          y: null
        },
        maxPadding: 0,
        minPadding: 0,
        showLastLabel: false,
        tickLength: 0
      },
      defaultRadialYOptions: {
        gridLineInterpolation: 'circle',
        labels: {
          align: 'right',
          x: -3,
          y: -2
        },
        showLastLabel: false,
        title: {
          x: 4,
          text: null,
          rotation: 90
        }
      },
      setOptions: function(userOptions) {
        var options = this.options = merge(this.defaultOptions, this.defaultRadialOptions, userOptions);
        if (!options.plotBands) {
          options.plotBands = [];
        }
      },
      getOffset: function() {
        axisProto.getOffset.call(this);
        this.chart.axisOffset[this.side] = 0;
        this.center = this.pane.center = CenteredSeriesMixin.getCenter.call(this.pane);
      },
      getLinePath: function(lineWidth, radius) {
        var center = this.center;
        radius = pick(radius, center[2] / 2 - this.offset);
        return this.chart.renderer.symbols.arc(this.left + center[0], this.top + center[1], radius, radius, {
          start: this.startAngleRad,
          end: this.endAngleRad,
          open: true,
          innerR: 0
        });
      },
      setAxisTranslation: function() {
        axisProto.setAxisTranslation.call(this);
        if (this.center) {
          if (this.isCircular) {
            this.transA = (this.endAngleRad - this.startAngleRad) / ((this.max - this.min) || 1);
          } else {
            this.transA = (this.center[2] / 2) / ((this.max - this.min) || 1);
          }
          if (this.isXAxis) {
            this.minPixelPadding = this.transA * this.minPointOffset;
          } else {
            this.minPixelPadding = 0;
          }
        }
      },
      beforeSetTickPositions: function() {
        if (this.autoConnect) {
          this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0;
        }
      },
      setAxisSize: function() {
        axisProto.setAxisSize.call(this);
        if (this.isRadial) {
          this.center = this.pane.center = Highcharts.CenteredSeriesMixin.getCenter.call(this.pane);
          if (this.isCircular) {
            this.sector = this.endAngleRad - this.startAngleRad;
          }
          this.len = this.width = this.height = this.center[2] * pick(this.sector, 1) / 2;
        }
      },
      getPosition: function(value, length) {
        return this.postTranslate(this.isCircular ? this.translate(value) : 0, pick(this.isCircular ? length : this.translate(value), this.center[2] / 2) - this.offset);
      },
      postTranslate: function(angle, radius) {
        var chart = this.chart,
            center = this.center;
        angle = this.startAngleRad + angle;
        return {
          x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
          y: chart.plotTop + center[1] + Math.sin(angle) * radius
        };
      },
      getPlotBandPath: function(from, to, options) {
        var center = this.center,
            startAngleRad = this.startAngleRad,
            fullRadius = center[2] / 2,
            radii = [pick(options.outerRadius, '100%'), options.innerRadius, pick(options.thickness, 10)],
            percentRegex = /%$/,
            start,
            end,
            open,
            isCircular = this.isCircular,
            ret;
        if (this.options.gridLineInterpolation === 'polygon') {
          ret = this.getPlotLinePath(from).concat(this.getPlotLinePath(to, true));
        } else {
          from = Math.max(from, this.min);
          to = Math.min(to, this.max);
          if (!isCircular) {
            radii[0] = this.translate(from);
            radii[1] = this.translate(to);
          }
          radii = map(radii, function(radius) {
            if (percentRegex.test(radius)) {
              radius = (pInt(radius, 10) * fullRadius) / 100;
            }
            return radius;
          });
          if (options.shape === 'circle' || !isCircular) {
            start = -Math.PI / 2;
            end = Math.PI * 1.5;
            open = true;
          } else {
            start = startAngleRad + this.translate(from);
            end = startAngleRad + this.translate(to);
          }
          ret = this.chart.renderer.symbols.arc(this.left + center[0], this.top + center[1], radii[0], radii[0], {
            start: Math.min(start, end),
            end: Math.max(start, end),
            innerR: pick(radii[1], radii[0] - radii[2]),
            open: open
          });
        }
        return ret;
      },
      getPlotLinePath: function(value, reverse) {
        var axis = this,
            center = axis.center,
            chart = axis.chart,
            end = axis.getPosition(value),
            xAxis,
            xy,
            tickPositions,
            ret;
        if (axis.isCircular) {
          ret = ['M', center[0] + chart.plotLeft, center[1] + chart.plotTop, 'L', end.x, end.y];
        } else if (axis.options.gridLineInterpolation === 'circle') {
          value = axis.translate(value);
          if (value) {
            ret = axis.getLinePath(0, value);
          }
        } else {
          each(chart.xAxis, function(a) {
            if (a.pane === axis.pane) {
              xAxis = a;
            }
          });
          ret = [];
          value = axis.translate(value);
          tickPositions = xAxis.tickPositions;
          if (xAxis.autoConnect) {
            tickPositions = tickPositions.concat([tickPositions[0]]);
          }
          if (reverse) {
            tickPositions = [].concat(tickPositions).reverse();
          }
          each(tickPositions, function(pos, i) {
            xy = xAxis.getPosition(pos, value);
            ret.push(i ? 'L' : 'M', xy.x, xy.y);
          });
        }
        return ret;
      },
      getTitlePosition: function() {
        var center = this.center,
            chart = this.chart,
            titleOptions = this.options.title;
        return {
          x: chart.plotLeft + center[0] + (titleOptions.x || 0),
          y: chart.plotTop + center[1] - ({
            high: 0.5,
            middle: 0.25,
            low: 0
          }[titleOptions.align] * center[2]) + (titleOptions.y || 0)
        };
      }
    };
    wrap(axisProto, 'init', function(proceed, chart, userOptions) {
      var axis = this,
          angular = chart.angular,
          polar = chart.polar,
          isX = userOptions.isX,
          isHidden = angular && isX,
          isCircular,
          startAngleRad,
          endAngleRad,
          options,
          chartOptions = chart.options,
          paneIndex = userOptions.pane || 0,
          pane,
          paneOptions;
      if (angular) {
        extend(this, isHidden ? hiddenAxisMixin : radialAxisMixin);
        isCircular = !isX;
        if (isCircular) {
          this.defaultRadialOptions = this.defaultRadialGaugeOptions;
        }
      } else if (polar) {
        extend(this, radialAxisMixin);
        isCircular = isX;
        this.defaultRadialOptions = isX ? this.defaultRadialXOptions : merge(this.defaultYAxisOptions, this.defaultRadialYOptions);
      }
      if (angular || polar) {
        chart.inverted = false;
        chartOptions.chart.zoomType = null;
      }
      proceed.call(this, chart, userOptions);
      if (!isHidden && (angular || polar)) {
        options = this.options;
        if (!chart.panes) {
          chart.panes = [];
        }
        this.pane = pane = chart.panes[paneIndex] = chart.panes[paneIndex] || new Pane(splat(chartOptions.pane)[paneIndex], chart, axis);
        paneOptions = pane.options;
        this.startAngleRad = startAngleRad = (paneOptions.startAngle - 90) * Math.PI / 180;
        this.endAngleRad = endAngleRad = (pick(paneOptions.endAngle, paneOptions.startAngle + 360) - 90) * Math.PI / 180;
        this.offset = options.offset || 0;
        this.isCircular = isCircular;
        if (isCircular && userOptions.max === UNDEFINED && endAngleRad - startAngleRad === 2 * Math.PI) {
          this.autoConnect = true;
        }
      }
    });
    wrap(axisProto, 'autoLabelAlign', function(proceed) {
      if (!this.isRadial) {
        return proceed.apply(this, [].slice.call(arguments, 1));
      }
    });
    wrap(tickProto, 'getPosition', function(proceed, horiz, pos, tickmarkOffset, old) {
      var axis = this.axis;
      return axis.getPosition ? axis.getPosition(pos) : proceed.call(this, horiz, pos, tickmarkOffset, old);
    });
    wrap(tickProto, 'getLabelPosition', function(proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
      var axis = this.axis,
          optionsY = labelOptions.y,
          ret,
          centerSlot = 20,
          align = labelOptions.align,
          angle = ((axis.translate(this.pos) + axis.startAngleRad + Math.PI / 2) / Math.PI * 180) % 360;
      if (axis.isRadial) {
        ret = axis.getPosition(this.pos, (axis.center[2] / 2) + pick(labelOptions.distance, -25));
        if (labelOptions.rotation === 'auto') {
          label.attr({rotation: angle});
        } else if (optionsY === null) {
          optionsY = axis.chart.renderer.fontMetrics(label.styles.fontSize).b - label.getBBox().height / 2;
        }
        if (align === null) {
          if (axis.isCircular) {
            if (this.label.getBBox().width > axis.len * axis.tickInterval / (axis.max - axis.min)) {
              centerSlot = 0;
            }
            if (angle > centerSlot && angle < 180 - centerSlot) {
              align = 'left';
            } else if (angle > 180 + centerSlot && angle < 360 - centerSlot) {
              align = 'right';
            } else {
              align = 'center';
            }
          } else {
            align = 'center';
          }
          label.attr({align: align});
        }
        ret.x += labelOptions.x;
        ret.y += optionsY;
      } else {
        ret = proceed.call(this, x, y, label, horiz, labelOptions, tickmarkOffset, index, step);
      }
      return ret;
    });
    wrap(tickProto, 'getMarkPath', function(proceed, x, y, tickLength, tickWidth, horiz, renderer) {
      var axis = this.axis,
          endPoint,
          ret;
      if (axis.isRadial) {
        endPoint = axis.getPosition(this.pos, axis.center[2] / 2 + tickLength);
        ret = ['M', x, y, 'L', endPoint.x, endPoint.y];
      } else {
        ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
      }
      return ret;
    });
    defaultPlotOptions.arearange = merge(defaultPlotOptions.area, {
      lineWidth: 1,
      marker: null,
      threshold: null,
      tooltip: {pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
      trackByArea: true,
      dataLabels: {
        align: null,
        verticalAlign: null,
        xLow: 0,
        xHigh: 0,
        yLow: 0,
        yHigh: 0
      },
      states: {hover: {halo: false}}
    });
    seriesTypes.arearange = extendClass(seriesTypes.area, {
      type: 'arearange',
      pointArrayMap: ['low', 'high'],
      dataLabelCollections: ['dataLabel', 'dataLabelUpper'],
      toYData: function(point) {
        return [point.low, point.high];
      },
      pointValKey: 'low',
      deferTranslatePolar: true,
      highToXY: function(point) {
        var chart = this.chart,
            xy = this.xAxis.postTranslate(point.rectPlotX, this.yAxis.len - point.plotHigh);
        point.plotHighX = xy.x - chart.plotLeft;
        point.plotHigh = xy.y - chart.plotTop;
      },
      translate: function() {
        var series = this,
            yAxis = series.yAxis;
        seriesTypes.area.prototype.translate.apply(series);
        each(series.points, function(point) {
          var low = point.low,
              high = point.high,
              plotY = point.plotY;
          if (high === null || low === null) {
            point.isNull = true;
          } else {
            point.plotLow = plotY;
            point.plotHigh = yAxis.translate(high, 0, 1, 0, 1);
          }
        });
        if (this.chart.polar) {
          each(this.points, function(point) {
            series.highToXY(point);
          });
        }
      },
      getGraphPath: function() {
        var points = this.points,
            highPoints = [],
            highAreaPoints = [],
            i = points.length,
            getGraphPath = Series.prototype.getGraphPath,
            point,
            pointShim,
            linePath,
            lowerPath,
            options = this.options,
            step = options.step,
            higherPath,
            higherAreaPath;
        i = points.length;
        while (i--) {
          point = points[i];
          if (!point.isNull && (!points[i + 1] || points[i + 1].isNull)) {
            highAreaPoints.push({
              plotX: point.plotX,
              plotY: point.plotLow
            });
          }
          pointShim = {
            plotX: point.plotX,
            plotY: point.plotHigh,
            isNull: point.isNull
          };
          highAreaPoints.push(pointShim);
          highPoints.push(pointShim);
          if (!point.isNull && (!points[i - 1] || points[i - 1].isNull)) {
            highAreaPoints.push({
              plotX: point.plotX,
              plotY: point.plotLow
            });
          }
        }
        lowerPath = getGraphPath.call(this, points);
        if (step) {
          if (step === true) {
            step = 'left';
          }
          options.step = {
            left: 'right',
            center: 'center',
            right: 'left'
          }[step];
        }
        higherPath = getGraphPath.call(this, highPoints);
        higherAreaPath = getGraphPath.call(this, highAreaPoints);
        options.step = step;
        linePath = [].concat(lowerPath, higherPath);
        if (!this.chart.polar && higherAreaPath[0] === 'M') {
          higherAreaPath[0] = 'L';
        }
        this.areaPath = this.areaPath.concat(lowerPath, higherAreaPath);
        return linePath;
      },
      drawDataLabels: function() {
        var data = this.data,
            length = data.length,
            i,
            originalDataLabels = [],
            seriesProto = Series.prototype,
            dataLabelOptions = this.options.dataLabels,
            align = dataLabelOptions.align,
            verticalAlign = dataLabelOptions.verticalAlign,
            inside = dataLabelOptions.inside,
            point,
            up,
            inverted = this.chart.inverted;
        if (dataLabelOptions.enabled || this._hasPointLabels) {
          i = length;
          while (i--) {
            point = data[i];
            if (point) {
              up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;
              point.y = point.high;
              point._plotY = point.plotY;
              point.plotY = point.plotHigh;
              originalDataLabels[i] = point.dataLabel;
              point.dataLabel = point.dataLabelUpper;
              point.below = up;
              if (inverted) {
                if (!align) {
                  dataLabelOptions.align = up ? 'right' : 'left';
                }
              } else {
                if (!verticalAlign) {
                  dataLabelOptions.verticalAlign = up ? 'top' : 'bottom';
                }
              }
              dataLabelOptions.x = dataLabelOptions.xHigh;
              dataLabelOptions.y = dataLabelOptions.yHigh;
            }
          }
          if (seriesProto.drawDataLabels) {
            seriesProto.drawDataLabels.apply(this, arguments);
          }
          i = length;
          while (i--) {
            point = data[i];
            if (point) {
              up = inside ? point.plotHigh < point.plotLow : point.plotHigh > point.plotLow;
              point.dataLabelUpper = point.dataLabel;
              point.dataLabel = originalDataLabels[i];
              point.y = point.low;
              point.plotY = point._plotY;
              point.below = !up;
              if (inverted) {
                if (!align) {
                  dataLabelOptions.align = up ? 'left' : 'right';
                }
              } else {
                if (!verticalAlign) {
                  dataLabelOptions.verticalAlign = up ? 'bottom' : 'top';
                }
              }
              dataLabelOptions.x = dataLabelOptions.xLow;
              dataLabelOptions.y = dataLabelOptions.yLow;
            }
          }
          if (seriesProto.drawDataLabels) {
            seriesProto.drawDataLabels.apply(this, arguments);
          }
        }
        dataLabelOptions.align = align;
        dataLabelOptions.verticalAlign = verticalAlign;
      },
      alignDataLabel: function() {
        seriesTypes.column.prototype.alignDataLabel.apply(this, arguments);
      },
      setStackedPoints: noop,
      getSymbol: noop,
      drawPoints: noop
    });
    defaultPlotOptions.areasplinerange = merge(defaultPlotOptions.arearange);
    seriesTypes.areasplinerange = extendClass(seriesTypes.arearange, {
      type: 'areasplinerange',
      getPointSpline: seriesTypes.spline.prototype.getPointSpline
    });
    (function() {
      var colProto = seriesTypes.column.prototype;
      defaultPlotOptions.columnrange = merge(defaultPlotOptions.column, defaultPlotOptions.arearange, {
        lineWidth: 1,
        pointRange: null
      });
      seriesTypes.columnrange = extendClass(seriesTypes.arearange, {
        type: 'columnrange',
        translate: function() {
          var series = this,
              yAxis = series.yAxis,
              xAxis = series.xAxis,
              startAngleRad = xAxis.startAngleRad,
              start,
              chart = series.chart,
              isRadial = series.xAxis.isRadial,
              plotHigh;
          colProto.translate.apply(series);
          each(series.points, function(point) {
            var shapeArgs = point.shapeArgs,
                minPointLength = series.options.minPointLength,
                heightDifference,
                height,
                y;
            point.plotHigh = plotHigh = yAxis.translate(point.high, 0, 1, 0, 1);
            point.plotLow = point.plotY;
            y = plotHigh;
            height = pick(point.rectPlotY, point.plotY) - plotHigh;
            if (Math.abs(height) < minPointLength) {
              heightDifference = (minPointLength - height);
              height += heightDifference;
              y -= heightDifference / 2;
            } else if (height < 0) {
              height *= -1;
              y -= height;
            }
            if (isRadial) {
              start = point.barX + startAngleRad;
              point.shapeType = 'path';
              point.shapeArgs = {d: series.polarArc(y + height, y, start, start + point.pointWidth)};
            } else {
              shapeArgs.height = height;
              shapeArgs.y = y;
              point.tooltipPos = chart.inverted ? [yAxis.len + yAxis.pos - chart.plotLeft - y - height / 2, xAxis.len + xAxis.pos - chart.plotTop - shapeArgs.x - shapeArgs.width / 2, height] : [xAxis.left - chart.plotLeft + shapeArgs.x + shapeArgs.width / 2, yAxis.pos - chart.plotTop + y + height / 2, height];
            }
          });
        },
        directTouch: true,
        trackerGroups: ['group', 'dataLabelsGroup'],
        drawGraph: noop,
        crispCol: colProto.crispCol,
        pointAttrToOptions: colProto.pointAttrToOptions,
        drawPoints: colProto.drawPoints,
        drawTracker: colProto.drawTracker,
        getColumnMetrics: colProto.getColumnMetrics,
        animate: function() {
          return colProto.animate.apply(this, arguments);
        },
        polarArc: function() {
          return colProto.polarArc.apply(this, arguments);
        }
      });
    }());
    defaultPlotOptions.gauge = merge(defaultPlotOptions.line, {
      dataLabels: {
        enabled: true,
        defer: false,
        y: 15,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 3,
        crop: false,
        verticalAlign: 'top',
        zIndex: 2
      },
      dial: {},
      pivot: {},
      tooltip: {headerFormat: ''},
      showInLegend: false
    });
    var GaugePoint = extendClass(Point, {setState: function(state) {
        this.state = state;
      }});
    var GaugeSeries = {
      type: 'gauge',
      pointClass: GaugePoint,
      angular: true,
      directTouch: true,
      drawGraph: noop,
      fixedBox: true,
      forceDL: true,
      trackerGroups: ['group', 'dataLabelsGroup'],
      translate: function() {
        var series = this,
            yAxis = series.yAxis,
            options = series.options,
            center = yAxis.center;
        series.generatePoints();
        each(series.points, function(point) {
          var dialOptions = merge(options.dial, point.dial),
              radius = (pInt(pick(dialOptions.radius, 80)) * center[2]) / 200,
              baseLength = (pInt(pick(dialOptions.baseLength, 70)) * radius) / 100,
              rearLength = (pInt(pick(dialOptions.rearLength, 10)) * radius) / 100,
              baseWidth = dialOptions.baseWidth || 3,
              topWidth = dialOptions.topWidth || 1,
              overshoot = options.overshoot,
              rotation = yAxis.startAngleRad + yAxis.translate(point.y, null, null, null, true);
          if (isNumber(overshoot)) {
            overshoot = overshoot / 180 * Math.PI;
            rotation = Math.max(yAxis.startAngleRad - overshoot, Math.min(yAxis.endAngleRad + overshoot, rotation));
          } else if (options.wrap === false) {
            rotation = Math.max(yAxis.startAngleRad, Math.min(yAxis.endAngleRad, rotation));
          }
          rotation = rotation * 180 / Math.PI;
          point.shapeType = 'path';
          point.shapeArgs = {
            d: dialOptions.path || ['M', -rearLength, -baseWidth / 2, 'L', baseLength, -baseWidth / 2, radius, -topWidth / 2, radius, topWidth / 2, baseLength, baseWidth / 2, -rearLength, baseWidth / 2, 'z'],
            translateX: center[0],
            translateY: center[1],
            rotation: rotation
          };
          point.plotX = center[0];
          point.plotY = center[1];
        });
      },
      drawPoints: function() {
        var series = this,
            center = series.yAxis.center,
            pivot = series.pivot,
            options = series.options,
            pivotOptions = options.pivot,
            renderer = series.chart.renderer;
        each(series.points, function(point) {
          var graphic = point.graphic,
              shapeArgs = point.shapeArgs,
              d = shapeArgs.d,
              dialOptions = merge(options.dial, point.dial);
          if (graphic) {
            graphic.animate(shapeArgs);
            shapeArgs.d = d;
          } else {
            point.graphic = renderer[point.shapeType](shapeArgs).attr({
              stroke: dialOptions.borderColor || 'none',
              'stroke-width': dialOptions.borderWidth || 0,
              fill: dialOptions.backgroundColor || 'black',
              rotation: shapeArgs.rotation,
              zIndex: 1
            }).add(series.group);
          }
        });
        if (pivot) {
          pivot.animate({
            translateX: center[0],
            translateY: center[1]
          });
        } else {
          series.pivot = renderer.circle(0, 0, pick(pivotOptions.radius, 5)).attr({
            'stroke-width': pivotOptions.borderWidth || 0,
            stroke: pivotOptions.borderColor || 'silver',
            fill: pivotOptions.backgroundColor || 'black',
            zIndex: 2
          }).translate(center[0], center[1]).add(series.group);
        }
      },
      animate: function(init) {
        var series = this;
        if (!init) {
          each(series.points, function(point) {
            var graphic = point.graphic;
            if (graphic) {
              graphic.attr({rotation: series.yAxis.startAngleRad * 180 / Math.PI});
              graphic.animate({rotation: point.shapeArgs.rotation}, series.options.animation);
            }
          });
          series.animate = null;
        }
      },
      render: function() {
        this.group = this.plotGroup('group', 'series', this.visible ? 'visible' : 'hidden', this.options.zIndex, this.chart.seriesGroup);
        Series.prototype.render.call(this);
        this.group.clip(this.chart.clipRect);
      },
      setData: function(data, redraw) {
        Series.prototype.setData.call(this, data, false);
        this.processData();
        this.generatePoints();
        if (pick(redraw, true)) {
          this.chart.redraw();
        }
      },
      drawTracker: TrackerMixin && TrackerMixin.drawTrackerPoint
    };
    seriesTypes.gauge = extendClass(seriesTypes.line, GaugeSeries);
    defaultPlotOptions.boxplot = merge(defaultPlotOptions.column, {
      fillColor: '#FFFFFF',
      lineWidth: 1,
      medianWidth: 2,
      states: {hover: {brightness: -0.3}},
      threshold: null,
      tooltip: {pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' + 'Maximum: {point.high}<br/>' + 'Upper quartile: {point.q3}<br/>' + 'Median: {point.median}<br/>' + 'Lower quartile: {point.q1}<br/>' + 'Minimum: {point.low}<br/>'},
      whiskerLength: '50%',
      whiskerWidth: 2
    });
    seriesTypes.boxplot = extendClass(seriesTypes.column, {
      type: 'boxplot',
      pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
      toYData: function(point) {
        return [point.low, point.q1, point.median, point.q3, point.high];
      },
      pointValKey: 'high',
      pointAttrToOptions: {
        fill: 'fillColor',
        stroke: 'color',
        'stroke-width': 'lineWidth'
      },
      drawDataLabels: noop,
      translate: function() {
        var series = this,
            yAxis = series.yAxis,
            pointArrayMap = series.pointArrayMap;
        seriesTypes.column.prototype.translate.apply(series);
        each(series.points, function(point) {
          each(pointArrayMap, function(key) {
            if (point[key] !== null) {
              point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
            }
          });
        });
      },
      drawPoints: function() {
        var series = this,
            points = series.points,
            options = series.options,
            chart = series.chart,
            renderer = chart.renderer,
            pointAttr,
            q1Plot,
            q3Plot,
            highPlot,
            lowPlot,
            medianPlot,
            crispCorr,
            crispX,
            graphic,
            stemPath,
            stemAttr,
            boxPath,
            whiskersPath,
            whiskersAttr,
            medianPath,
            medianAttr,
            width,
            left,
            right,
            halfWidth,
            shapeArgs,
            color,
            doQuartiles = series.doQuartiles !== false,
            pointWiskerLength,
            whiskerLength = series.options.whiskerLength;
        each(points, function(point) {
          graphic = point.graphic;
          shapeArgs = point.shapeArgs;
          stemAttr = {};
          whiskersAttr = {};
          medianAttr = {};
          color = point.color || series.color;
          if (point.plotY !== UNDEFINED) {
            pointAttr = point.pointAttr[point.selected ? 'selected' : ''];
            width = shapeArgs.width;
            left = mathFloor(shapeArgs.x);
            right = left + width;
            halfWidth = mathRound(width / 2);
            q1Plot = mathFloor(doQuartiles ? point.q1Plot : point.lowPlot);
            q3Plot = mathFloor(doQuartiles ? point.q3Plot : point.lowPlot);
            highPlot = mathFloor(point.highPlot);
            lowPlot = mathFloor(point.lowPlot);
            stemAttr.stroke = point.stemColor || options.stemColor || color;
            stemAttr['stroke-width'] = pick(point.stemWidth, options.stemWidth, options.lineWidth);
            stemAttr.dashstyle = point.stemDashStyle || options.stemDashStyle;
            whiskersAttr.stroke = point.whiskerColor || options.whiskerColor || color;
            whiskersAttr['stroke-width'] = pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);
            medianAttr.stroke = point.medianColor || options.medianColor || color;
            medianAttr['stroke-width'] = pick(point.medianWidth, options.medianWidth, options.lineWidth);
            crispCorr = (stemAttr['stroke-width'] % 2) / 2;
            crispX = left + halfWidth + crispCorr;
            stemPath = ['M', crispX, q3Plot, 'L', crispX, highPlot, 'M', crispX, q1Plot, 'L', crispX, lowPlot];
            if (doQuartiles) {
              crispCorr = (pointAttr['stroke-width'] % 2) / 2;
              crispX = mathFloor(crispX) + crispCorr;
              q1Plot = mathFloor(q1Plot) + crispCorr;
              q3Plot = mathFloor(q3Plot) + crispCorr;
              left += crispCorr;
              right += crispCorr;
              boxPath = ['M', left, q3Plot, 'L', left, q1Plot, 'L', right, q1Plot, 'L', right, q3Plot, 'L', left, q3Plot, 'z'];
            }
            if (whiskerLength) {
              crispCorr = (whiskersAttr['stroke-width'] % 2) / 2;
              highPlot = highPlot + crispCorr;
              lowPlot = lowPlot + crispCorr;
              pointWiskerLength = (/%$/).test(whiskerLength) ? halfWidth * parseFloat(whiskerLength) / 100 : whiskerLength / 2;
              whiskersPath = ['M', crispX - pointWiskerLength, highPlot, 'L', crispX + pointWiskerLength, highPlot, 'M', crispX - pointWiskerLength, lowPlot, 'L', crispX + pointWiskerLength, lowPlot];
            }
            crispCorr = (medianAttr['stroke-width'] % 2) / 2;
            medianPlot = mathRound(point.medianPlot) + crispCorr;
            medianPath = ['M', left, medianPlot, 'L', right, medianPlot];
            if (graphic) {
              point.stem.animate({d: stemPath});
              if (whiskerLength) {
                point.whiskers.animate({d: whiskersPath});
              }
              if (doQuartiles) {
                point.box.animate({d: boxPath});
              }
              point.medianShape.animate({d: medianPath});
            } else {
              point.graphic = graphic = renderer.g().add(series.group);
              point.stem = renderer.path(stemPath).attr(stemAttr).add(graphic);
              if (whiskerLength) {
                point.whiskers = renderer.path(whiskersPath).attr(whiskersAttr).add(graphic);
              }
              if (doQuartiles) {
                point.box = renderer.path(boxPath).attr(pointAttr).add(graphic);
              }
              point.medianShape = renderer.path(medianPath).attr(medianAttr).add(graphic);
            }
          }
        });
      },
      setStackedPoints: noop
    });
    defaultPlotOptions.errorbar = merge(defaultPlotOptions.boxplot, {
      color: '#000000',
      grouping: false,
      linkedTo: ':previous',
      tooltip: {pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
      whiskerWidth: null
    });
    seriesTypes.errorbar = extendClass(seriesTypes.boxplot, {
      type: 'errorbar',
      pointArrayMap: ['low', 'high'],
      toYData: function(point) {
        return [point.low, point.high];
      },
      pointValKey: 'high',
      doQuartiles: false,
      drawDataLabels: seriesTypes.arearange ? seriesTypes.arearange.prototype.drawDataLabels : noop,
      getColumnMetrics: function() {
        return (this.linkedParent && this.linkedParent.columnMetrics) || seriesTypes.column.prototype.getColumnMetrics.call(this);
      }
    });
    defaultPlotOptions.waterfall = merge(defaultPlotOptions.column, {
      lineWidth: 1,
      lineColor: '#333',
      dashStyle: 'dot',
      borderColor: '#333',
      dataLabels: {inside: true},
      states: {hover: {lineWidthPlus: 0}}
    });
    seriesTypes.waterfall = extendClass(seriesTypes.column, {
      type: 'waterfall',
      upColorProp: 'fill',
      pointValKey: 'y',
      translate: function() {
        var series = this,
            options = series.options,
            yAxis = series.yAxis,
            len,
            i,
            points,
            point,
            shapeArgs,
            stack,
            y,
            yValue,
            previousY,
            previousIntermediate,
            range,
            minPointLength = pick(options.minPointLength, 5),
            threshold = options.threshold,
            stacking = options.stacking,
            tooltipY;
        seriesTypes.column.prototype.translate.apply(this);
        series.minPointLengthOffset = 0;
        previousY = previousIntermediate = threshold;
        points = series.points;
        for (i = 0, len = points.length; i < len; i++) {
          point = points[i];
          yValue = this.processedYData[i];
          shapeArgs = point.shapeArgs;
          stack = stacking && yAxis.stacks[(series.negStacks && yValue < threshold ? '-' : '') + series.stackKey];
          range = stack ? stack[point.x].points[series.index + ',' + i] : [0, yValue];
          if (point.isSum) {
            point.y = correctFloat(yValue);
          } else if (point.isIntermediateSum) {
            point.y = correctFloat(yValue - previousIntermediate);
          }
          y = mathMax(previousY, previousY + point.y) + range[0];
          shapeArgs.y = yAxis.translate(y, 0, 1);
          if (point.isSum) {
            shapeArgs.y = yAxis.translate(range[1], 0, 1);
            shapeArgs.height = Math.min(yAxis.translate(range[0], 0, 1), yAxis.len) - shapeArgs.y + series.minPointLengthOffset;
          } else if (point.isIntermediateSum) {
            shapeArgs.y = yAxis.translate(range[1], 0, 1);
            shapeArgs.height = Math.min(yAxis.translate(previousIntermediate, 0, 1), yAxis.len) - shapeArgs.y + series.minPointLengthOffset;
            previousIntermediate = range[1];
          } else {
            if (previousY !== 0) {
              shapeArgs.height = yValue > 0 ? yAxis.translate(previousY, 0, 1) - shapeArgs.y : yAxis.translate(previousY, 0, 1) - yAxis.translate(previousY - yValue, 0, 1);
            }
            previousY += yValue;
          }
          if (shapeArgs.height < 0) {
            shapeArgs.y += shapeArgs.height;
            shapeArgs.height *= -1;
          }
          point.plotY = shapeArgs.y = mathRound(shapeArgs.y) - (series.borderWidth % 2) / 2;
          shapeArgs.height = mathMax(mathRound(shapeArgs.height), 0.001);
          point.yBottom = shapeArgs.y + shapeArgs.height;
          if (shapeArgs.height <= minPointLength) {
            shapeArgs.height = minPointLength;
            series.minPointLengthOffset += minPointLength;
          }
          shapeArgs.y -= series.minPointLengthOffset;
          tooltipY = point.plotY + (point.negative ? shapeArgs.height : 0) - series.minPointLengthOffset;
          if (series.chart.inverted) {
            point.tooltipPos[0] = yAxis.len - tooltipY;
          } else {
            point.tooltipPos[1] = tooltipY;
          }
        }
      },
      processData: function(force) {
        var series = this,
            options = series.options,
            yData = series.yData,
            points = series.options.data,
            point,
            dataLength = yData.length,
            threshold = options.threshold || 0,
            subSum,
            sum,
            dataMin,
            dataMax,
            y,
            i;
        sum = subSum = dataMin = dataMax = threshold;
        for (i = 0; i < dataLength; i++) {
          y = yData[i];
          point = points && points[i] ? points[i] : {};
          if (y === 'sum' || point.isSum) {
            yData[i] = correctFloat(sum);
          } else if (y === 'intermediateSum' || point.isIntermediateSum) {
            yData[i] = correctFloat(subSum);
          } else {
            sum += y;
            subSum += y;
          }
          dataMin = Math.min(sum, dataMin);
          dataMax = Math.max(sum, dataMax);
        }
        Series.prototype.processData.call(this, force);
        series.dataMin = dataMin;
        series.dataMax = dataMax;
      },
      toYData: function(pt) {
        if (pt.isSum) {
          return (pt.x === 0 ? null : 'sum');
        }
        if (pt.isIntermediateSum) {
          return (pt.x === 0 ? null : 'intermediateSum');
        }
        return pt.y;
      },
      getAttribs: function() {
        seriesTypes.column.prototype.getAttribs.apply(this, arguments);
        var series = this,
            options = series.options,
            stateOptions = options.states,
            upColor = options.upColor || series.color,
            hoverColor = Highcharts.Color(upColor).brighten(0.1).get(),
            seriesDownPointAttr = merge(series.pointAttr),
            upColorProp = series.upColorProp;
        seriesDownPointAttr[''][upColorProp] = upColor;
        seriesDownPointAttr.hover[upColorProp] = stateOptions.hover.upColor || hoverColor;
        seriesDownPointAttr.select[upColorProp] = stateOptions.select.upColor || upColor;
        each(series.points, function(point) {
          if (!point.options.color) {
            if (point.y > 0) {
              point.pointAttr = seriesDownPointAttr;
              point.color = upColor;
            } else {
              point.pointAttr = series.pointAttr;
            }
          }
        });
      },
      getGraphPath: function() {
        var data = this.data,
            length = data.length,
            lineWidth = this.options.lineWidth + this.borderWidth,
            normalizer = mathRound(lineWidth) % 2 / 2,
            path = [],
            M = 'M',
            L = 'L',
            prevArgs,
            pointArgs,
            i,
            d;
        for (i = 1; i < length; i++) {
          pointArgs = data[i].shapeArgs;
          prevArgs = data[i - 1].shapeArgs;
          d = [M, prevArgs.x + prevArgs.width, prevArgs.y + normalizer, L, pointArgs.x, prevArgs.y + normalizer];
          if (data[i - 1].y < 0) {
            d[2] += prevArgs.height;
            d[5] += prevArgs.height;
          }
          path = path.concat(d);
        }
        return path;
      },
      getExtremes: noop,
      drawGraph: Series.prototype.drawGraph
    });
    defaultPlotOptions.polygon = merge(defaultPlotOptions.scatter, {marker: {enabled: false}});
    seriesTypes.polygon = extendClass(seriesTypes.scatter, {
      type: 'polygon',
      fillGraph: true,
      getSegmentPath: function(segment) {
        return Series.prototype.getSegmentPath.call(this, segment).concat('z');
      },
      drawGraph: Series.prototype.drawGraph,
      drawLegendSymbol: Highcharts.LegendSymbolMixin.drawRectangle
    });
    defaultPlotOptions.bubble = merge(defaultPlotOptions.scatter, {
      dataLabels: {
        formatter: function() {
          return this.point.z;
        },
        inside: true,
        verticalAlign: 'middle'
      },
      marker: {
        lineColor: null,
        lineWidth: 1
      },
      minSize: 8,
      maxSize: '20%',
      softThreshold: false,
      states: {hover: {halo: {size: 5}}},
      tooltip: {pointFormat: '({point.x}, {point.y}), Size: {point.z}'},
      turboThreshold: 0,
      zThreshold: 0,
      zoneAxis: 'z'
    });
    var BubblePoint = extendClass(Point, {
      haloPath: function() {
        return Point.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size);
      },
      ttBelow: false
    });
    seriesTypes.bubble = extendClass(seriesTypes.scatter, {
      type: 'bubble',
      pointClass: BubblePoint,
      pointArrayMap: ['y', 'z'],
      parallelArrays: ['x', 'y', 'z'],
      trackerGroups: ['group', 'dataLabelsGroup'],
      bubblePadding: true,
      zoneAxis: 'z',
      pointAttrToOptions: {
        stroke: 'lineColor',
        'stroke-width': 'lineWidth',
        fill: 'fillColor'
      },
      applyOpacity: function(fill) {
        var markerOptions = this.options.marker,
            fillOpacity = pick(markerOptions.fillOpacity, 0.5);
        fill = fill || markerOptions.fillColor || this.color;
        if (fillOpacity !== 1) {
          fill = Color(fill).setOpacity(fillOpacity).get('rgba');
        }
        return fill;
      },
      convertAttribs: function() {
        var obj = Series.prototype.convertAttribs.apply(this, arguments);
        obj.fill = this.applyOpacity(obj.fill);
        return obj;
      },
      getRadii: function(zMin, zMax, minSize, maxSize) {
        var len,
            i,
            pos,
            zData = this.zData,
            radii = [],
            options = this.options,
            sizeByArea = options.sizeBy !== 'width',
            zThreshold = options.zThreshold,
            zRange = zMax - zMin,
            value,
            radius;
        for (i = 0, len = zData.length; i < len; i++) {
          value = zData[i];
          if (options.sizeByAbsoluteValue && value !== null) {
            value = Math.abs(value - zThreshold);
            zMax = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
            zMin = 0;
          }
          if (value === null) {
            radius = null;
          } else if (value < zMin) {
            radius = minSize / 2 - 1;
          } else {
            pos = zRange > 0 ? (value - zMin) / zRange : 0.5;
            if (sizeByArea && pos >= 0) {
              pos = Math.sqrt(pos);
            }
            radius = math.ceil(minSize + pos * (maxSize - minSize)) / 2;
          }
          radii.push(radius);
        }
        this.radii = radii;
      },
      animate: function(init) {
        var animation = this.options.animation;
        if (!init) {
          each(this.points, function(point) {
            var graphic = point.graphic,
                shapeArgs = point.shapeArgs;
            if (graphic && shapeArgs) {
              graphic.attr('r', 1);
              graphic.animate({r: shapeArgs.r}, animation);
            }
          });
          this.animate = null;
        }
      },
      translate: function() {
        var i,
            data = this.data,
            point,
            radius,
            radii = this.radii;
        seriesTypes.scatter.prototype.translate.call(this);
        i = data.length;
        while (i--) {
          point = data[i];
          radius = radii ? radii[i] : 0;
          if (isNumber(radius) && radius >= this.minPxSize / 2) {
            point.shapeType = 'circle';
            point.shapeArgs = {
              x: point.plotX,
              y: point.plotY,
              r: radius
            };
            point.dlBox = {
              x: point.plotX - radius,
              y: point.plotY - radius,
              width: 2 * radius,
              height: 2 * radius
            };
          } else {
            point.shapeArgs = point.plotY = point.dlBox = UNDEFINED;
          }
        }
      },
      drawLegendSymbol: function(legend, item) {
        var renderer = this.chart.renderer,
            radius = renderer.fontMetrics(legend.itemStyle.fontSize).f / 2;
        item.legendSymbol = renderer.circle(radius, legend.baseline - radius, radius).attr({zIndex: 3}).add(item.legendGroup);
        item.legendSymbol.isMarker = true;
      },
      drawPoints: seriesTypes.column.prototype.drawPoints,
      alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
      buildKDTree: noop,
      applyZones: noop
    });
    Axis.prototype.beforePadding = function() {
      var axis = this,
          axisLength = this.len,
          chart = this.chart,
          pxMin = 0,
          pxMax = axisLength,
          isXAxis = this.isXAxis,
          dataKey = isXAxis ? 'xData' : 'yData',
          min = this.min,
          extremes = {},
          smallestSize = math.min(chart.plotWidth, chart.plotHeight),
          zMin = Number.MAX_VALUE,
          zMax = -Number.MAX_VALUE,
          range = this.max - min,
          transA = axisLength / range,
          activeSeries = [];
      each(this.series, function(series) {
        var seriesOptions = series.options,
            zData;
        if (series.bubblePadding && (series.visible || !chart.options.chart.ignoreHiddenSeries)) {
          axis.allowZoomOutside = true;
          activeSeries.push(series);
          if (isXAxis) {
            each(['minSize', 'maxSize'], function(prop) {
              var length = seriesOptions[prop],
                  isPercent = /%$/.test(length);
              length = pInt(length);
              extremes[prop] = isPercent ? smallestSize * length / 100 : length;
            });
            series.minPxSize = extremes.minSize;
            series.maxPxSize = extremes.maxSize;
            zData = series.zData;
            if (zData.length) {
              zMin = pick(seriesOptions.zMin, math.min(zMin, math.max(arrayMin(zData), seriesOptions.displayNegative === false ? seriesOptions.zThreshold : -Number.MAX_VALUE)));
              zMax = pick(seriesOptions.zMax, math.max(zMax, arrayMax(zData)));
            }
          }
        }
      });
      each(activeSeries, function(series) {
        var data = series[dataKey],
            i = data.length,
            radius;
        if (isXAxis) {
          series.getRadii(zMin, zMax, series.minPxSize, series.maxPxSize);
        }
        if (range > 0) {
          while (i--) {
            if (isNumber(data[i]) && axis.dataMin <= data[i] && data[i] <= axis.dataMax) {
              radius = series.radii[i];
              pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
              pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
            }
          }
        }
      });
      if (activeSeries.length && range > 0 && !this.isLog) {
        pxMax -= axisLength;
        transA *= (axisLength + pxMin - pxMax) / axisLength;
        each([['min', 'userMin', pxMin], ['max', 'userMax', pxMax]], function(keys) {
          if (pick(axis.options[keys[0]], axis[keys[1]]) === UNDEFINED) {
            axis[keys[0]] += keys[2] / transA;
          }
        });
      }
    };
    (function() {
      var seriesProto = Series.prototype,
          pointerProto = Pointer.prototype,
          colProto;
      seriesProto.searchPointByAngle = function(e) {
        var series = this,
            chart = series.chart,
            xAxis = series.xAxis,
            center = xAxis.pane.center,
            plotX = e.chartX - center[0] - chart.plotLeft,
            plotY = e.chartY - center[1] - chart.plotTop;
        return this.searchKDTree({clientX: 180 + (Math.atan2(plotX, plotY) * (-180 / Math.PI))});
      };
      wrap(seriesProto, 'buildKDTree', function(proceed) {
        if (this.chart.polar) {
          if (this.kdByAngle) {
            this.searchPoint = this.searchPointByAngle;
          } else {
            this.kdDimensions = 2;
          }
        }
        proceed.apply(this);
      });
      seriesProto.toXY = function(point) {
        var xy,
            chart = this.chart,
            plotX = point.plotX,
            plotY = point.plotY,
            clientX;
        point.rectPlotX = plotX;
        point.rectPlotY = plotY;
        xy = this.xAxis.postTranslate(point.plotX, this.yAxis.len - plotY);
        point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
        point.plotY = point.polarPlotY = xy.y - chart.plotTop;
        if (this.kdByAngle) {
          clientX = ((plotX / Math.PI * 180) + this.xAxis.pane.options.startAngle) % 360;
          if (clientX < 0) {
            clientX += 360;
          }
          point.clientX = clientX;
        } else {
          point.clientX = point.plotX;
        }
      };
      if (seriesTypes.spline) {
        wrap(seriesTypes.spline.prototype, 'getPointSpline', function(proceed, segment, point, i) {
          var ret,
              smoothing = 1.5,
              denom = smoothing + 1,
              plotX,
              plotY,
              lastPoint,
              nextPoint,
              lastX,
              lastY,
              nextX,
              nextY,
              leftContX,
              leftContY,
              rightContX,
              rightContY,
              distanceLeftControlPoint,
              distanceRightControlPoint,
              leftContAngle,
              rightContAngle,
              jointAngle;
          if (this.chart.polar) {
            plotX = point.plotX;
            plotY = point.plotY;
            lastPoint = segment[i - 1];
            nextPoint = segment[i + 1];
            if (this.connectEnds) {
              if (!lastPoint) {
                lastPoint = segment[segment.length - 2];
              }
              if (!nextPoint) {
                nextPoint = segment[1];
              }
            }
            if (lastPoint && nextPoint) {
              lastX = lastPoint.plotX;
              lastY = lastPoint.plotY;
              nextX = nextPoint.plotX;
              nextY = nextPoint.plotY;
              leftContX = (smoothing * plotX + lastX) / denom;
              leftContY = (smoothing * plotY + lastY) / denom;
              rightContX = (smoothing * plotX + nextX) / denom;
              rightContY = (smoothing * plotY + nextY) / denom;
              distanceLeftControlPoint = Math.sqrt(Math.pow(leftContX - plotX, 2) + Math.pow(leftContY - plotY, 2));
              distanceRightControlPoint = Math.sqrt(Math.pow(rightContX - plotX, 2) + Math.pow(rightContY - plotY, 2));
              leftContAngle = Math.atan2(leftContY - plotY, leftContX - plotX);
              rightContAngle = Math.atan2(rightContY - plotY, rightContX - plotX);
              jointAngle = (Math.PI / 2) + ((leftContAngle + rightContAngle) / 2);
              if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
                jointAngle -= Math.PI;
              }
              leftContX = plotX + Math.cos(jointAngle) * distanceLeftControlPoint;
              leftContY = plotY + Math.sin(jointAngle) * distanceLeftControlPoint;
              rightContX = plotX + Math.cos(Math.PI + jointAngle) * distanceRightControlPoint;
              rightContY = plotY + Math.sin(Math.PI + jointAngle) * distanceRightControlPoint;
              point.rightContX = rightContX;
              point.rightContY = rightContY;
            }
            if (!i) {
              ret = ['M', plotX, plotY];
            } else {
              ret = ['C', lastPoint.rightContX || lastPoint.plotX, lastPoint.rightContY || lastPoint.plotY, leftContX || plotX, leftContY || plotY, plotX, plotY];
              lastPoint.rightContX = lastPoint.rightContY = null;
            }
          } else {
            ret = proceed.call(this, segment, point, i);
          }
          return ret;
        });
      }
      wrap(seriesProto, 'translate', function(proceed) {
        var chart = this.chart,
            points,
            i;
        proceed.call(this);
        if (chart.polar) {
          this.kdByAngle = chart.tooltip && chart.tooltip.shared;
          if (!this.preventPostTranslate) {
            points = this.points;
            i = points.length;
            while (i--) {
              this.toXY(points[i]);
            }
          }
        }
      });
      wrap(seriesProto, 'getGraphPath', function(proceed, points) {
        var series = this;
        if (this.chart.polar) {
          points = points || this.points;
          if (this.options.connectEnds !== false && points[0] && points[0].y !== null) {
            this.connectEnds = true;
            points.splice(points.length, 0, points[0]);
          }
          each(points, function(point) {
            if (point.polarPlotY === undefined) {
              series.toXY(point);
            }
          });
        }
        return proceed.apply(this, [].slice.call(arguments, 1));
      });
      function polarAnimate(proceed, init) {
        var chart = this.chart,
            animation = this.options.animation,
            group = this.group,
            markerGroup = this.markerGroup,
            center = this.xAxis.center,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            attribs;
        if (chart.polar) {
          if (chart.renderer.isSVG) {
            if (animation === true) {
              animation = {};
            }
            if (init) {
              attribs = {
                translateX: center[0] + plotLeft,
                translateY: center[1] + plotTop,
                scaleX: 0.001,
                scaleY: 0.001
              };
              group.attr(attribs);
              if (markerGroup) {
                markerGroup.attr(attribs);
              }
            } else {
              attribs = {
                translateX: plotLeft,
                translateY: plotTop,
                scaleX: 1,
                scaleY: 1
              };
              group.animate(attribs, animation);
              if (markerGroup) {
                markerGroup.animate(attribs, animation);
              }
              this.animate = null;
            }
          }
        } else {
          proceed.call(this, init);
        }
      }
      wrap(seriesProto, 'animate', polarAnimate);
      if (seriesTypes.column) {
        colProto = seriesTypes.column.prototype;
        colProto.polarArc = function(low, high, start, end) {
          var center = this.xAxis.center,
              len = this.yAxis.len;
          return this.chart.renderer.symbols.arc(center[0], center[1], len - high, null, {
            start: start,
            end: end,
            innerR: len - pick(low, len)
          });
        };
        wrap(colProto, 'animate', polarAnimate);
        wrap(colProto, 'translate', function(proceed) {
          var xAxis = this.xAxis,
              startAngleRad = xAxis.startAngleRad,
              start,
              points,
              point,
              i;
          this.preventPostTranslate = true;
          proceed.call(this);
          if (xAxis.isRadial) {
            points = this.points;
            i = points.length;
            while (i--) {
              point = points[i];
              start = point.barX + startAngleRad;
              point.shapeType = 'path';
              point.shapeArgs = {d: this.polarArc(point.yBottom, point.plotY, start, start + point.pointWidth)};
              this.toXY(point);
              point.tooltipPos = [point.plotX, point.plotY];
              point.ttBelow = point.plotY > xAxis.center[1];
            }
          }
        });
        wrap(colProto, 'alignDataLabel', function(proceed, point, dataLabel, options, alignTo, isNew) {
          if (this.chart.polar) {
            var angle = point.rectPlotX / Math.PI * 180,
                align,
                verticalAlign;
            if (options.align === null) {
              if (angle > 20 && angle < 160) {
                align = 'left';
              } else if (angle > 200 && angle < 340) {
                align = 'right';
              } else {
                align = 'center';
              }
              options.align = align;
            }
            if (options.verticalAlign === null) {
              if (angle < 45 || angle > 315) {
                verticalAlign = 'bottom';
              } else if (angle > 135 && angle < 225) {
                verticalAlign = 'top';
              } else {
                verticalAlign = 'middle';
              }
              options.verticalAlign = verticalAlign;
            }
            seriesProto.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
          } else {
            proceed.call(this, point, dataLabel, options, alignTo, isNew);
          }
        });
      }
      wrap(pointerProto, 'getCoordinates', function(proceed, e) {
        var chart = this.chart,
            ret = {
              xAxis: [],
              yAxis: []
            };
        if (chart.polar) {
          each(chart.axes, function(axis) {
            var isXAxis = axis.isXAxis,
                center = axis.center,
                x = e.chartX - center[0] - chart.plotLeft,
                y = e.chartY - center[1] - chart.plotTop;
            ret[isXAxis ? 'xAxis' : 'yAxis'].push({
              axis: axis,
              value: axis.translate(isXAxis ? Math.PI - Math.atan2(x, y) : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), true)
            });
          });
        } else {
          ret = proceed.call(this, e);
        }
        return ret;
      });
    }());
  }));
})(require('process'));
