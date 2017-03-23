(function ($) {
    var defaults = {
        reNumbers: /(-|-\$)?(\d+(,\d{3})*(\.\d{1,})?|\.\d{1,})/g, cleanseNumber: function (v) {
            return v.replace(/[^0-9.\-]/g, "");
        }, useFieldPlugin: (!!$.fn.getValue), onParseError: null, onParseClear: null
    };
    $.Calculation = {
        version: "0.4.07", setDefaults: function (options) {
            $.extend(defaults, options);
        }
    };
    $.fn.parseNumber = function (options) {
        var aValues = [];
        options = $.extend(options, defaults);
        this.each(function () {
            var $el = $(this), sMethod = ($el.is(":input") ? (defaults.useFieldPlugin ? "getValue" : "val") : "text"), v = $.trim($el[sMethod]()).match(defaults.reNumbers, "");
            if (v == null) {
                v = 0;
                if (jQuery.isFunction(options.onParseError)) options.onParseError.apply($el, [sMethod]);
                $.data($el[0], "calcParseError", true);
            } else {
                v = options.cleanseNumber.apply(this, [v[0]]);
                if ($.data($el[0], "calcParseError") && jQuery.isFunction(options.onParseClear)) {
                    options.onParseClear.apply($el, [sMethod]);
                    $.data($el[0], "calcParseError", false);
                }
            }
            aValues.push(parseFloat(v, 10));
        });
        return aValues;
    };
    $.each(["sum", "avg", "min", "max"], function (i, method) {
        $.fn[method] = function (bind, selector) {
            if (arguments.length == 0) return math[method](this.parseNumber());
            var bSelOpt = selector && (selector.constructor == Object) && !(selector instanceof jQuery);
            var opt = bind && bind.constructor == Object ? bind : { bind: bind || "keyup", selector: (!bSelOpt) ? selector : null, oncalc: null };
            if (bSelOpt) opt = jQuery.extend(opt, selector);
            if (!!opt.selector) opt.selector = $(opt.selector);
            var self = this, sMethod, doCalc = function () {
                var value = math[method](self.parseNumber(opt));
                if (!!opt.selector) {
                    sMethod = (opt.selector.is(":input") ? (defaults.useFieldPlugin ? "setValue" : "val") : "text");
                    opt.selector[sMethod](value.toString());
                }
                if (jQuery.isFunction(opt.oncalc)) opt.oncalc.apply(self, [value, opt]);
            };
            doCalc();
            return self.bind(opt.bind, doCalc);
        };
    });
    var math = {
        sum: function (a) {
            var total = 0, precision = 0;
            $.each(a, function (i, v) {
                var p = v.toString().match(/\.\d+$/gi), len = (p) ? p[0].length - 1 : 0;
                if (len > precision) precision = len;
                total += v;
            });
            if (precision) total = Number(total.toFixed(precision));
            return total;
        }, avg: function (a) {
            return math.sum(a) / a.length;
        }, min: function (a) {
            return Math.min.apply(Math, a);
        }, max: function (a) {
            return Math.max.apply(Math, a);
        }
    };
})(jQuery);

/* reduce_add */
var setAmount = {
    min: 1,
    max: 999,
    urladd: '',

    init: function() {

    },
    reg: function (x) {
        return new RegExp("^[0-9]\\d*$").test(x);
    },
    amount: function (obj, mode) {
        var x = $(obj).val();
        if (x == "") x = 0;
        if (this.reg(x)) {
            if (mode) {
                x++;
            } else {
                x--;
            }
        } else {
            $(obj).val(1);
            $(obj).focus();
        }
        return x;
    },
    reduce: function (obj) {
        var x = this.amount(obj, false);
        if (x >= this.min) {
            $(obj).val(x);
        } else {
            $(obj).val(1);
            $(obj).focus();
        }
    },
    add: function (obj) {
        var x = this.amount(obj, true);
        if (x <= this.max) {
            $(obj).val(x);
        } else {
            $(obj).val(999);
            $(obj).focus();
        }
    },
    modify: function (obj) {
        var x = $(obj).val();
        if (x != "")
            if (x < this.min || x > this.max || !this.reg(x)) {
                $(obj).val(1);
                $(obj).focus();
            }
    },
    post: function () {
       
    },
    load: function (obj) {
        var x = $(obj).val();
        if (x == "") {
            $(obj).val(1);
        }
    }
};
