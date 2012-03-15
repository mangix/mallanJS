/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * dom.element.style.js
 */
//@require dom.element
(function ($, undefined) {
    if (!$.dom.element) {
        return;
    }
    var doc = document, styleExcept, getComputedStyle;
    styleExcept = {
        'float':$.dom.element.support.cssFloat ? 'cssFloat' : 'styleFloat'
    };
    getComputedStyle = (function () {
        if (doc.defaultView && doc.defaultView.getComputedStyle) {
            return function (el, key) {
                var res = doc.defaultView.getComputedStyle(el, null)[$.tools.toCamel(key)];
                if (key === 'opacity') {
                    return res * 100;
                }
                else {
                    return res;
                }
            };
        }
        else {
            return function (el, key) {
                return el.currentStyle[$.tools.toCamel(key)];
            };
        }
    })();

    function contain(str, item) {
        return (" " + str + " ").indexOf(" " + item + " ") !== -1;
    }

    var style = {
        hasClass:function (clsName) {
            //check if the first element has the class
            if (this.length > 0) {
                return contain(this[0].className, clsName);
            }
            return false;
        },
        addClass:function (clsName) {
            clsName = $.tools.trim(clsName);
            this.each(function () {
                var currentCls = $.tools.trim(this.className);
                if (!contain(currentCls, clsName)) {
                    this.className = currentCls + " " + clsName;
                }
            });
            return this;
        },
        removeClass:function (clsName) {
            this.each(function () {
                this.className = $.tools.trim((" " + this.className + " ").replace(" " + clsName + " ", " "));
            });
            return this;
        },
        css:function (key, value) {
            if (arguments.length == 1) {
                if ($.typeOf(key) === "string") {
                    //get style(first one)
                    if (this[0]) {
                        return getComputedStyle(this[0], key);
                    }
                    return '';
                } else if ($.typeOf(key) === 'object') {
                    //set
                    this.each(function () {
                        for (var o in key) {
                            if (o === 'opacity') {
                                $.dom.element.support.opacity ? this.style[o] = key[o] / 100 : this.style.filter = ('alpha(opacity=' + key[o] + ')');
                            }
                            else {
                                o = styleExcept[o] ? styleExcept[o] : o;
                                this.style[$.tools.toCamel(o)] = key[o];
                            }
                        }
                    });
                }
            } else if (arguments.length == 2) {
                //set style
                this.each(function () {
                    if (key === 'opacity') {
                        $.dom.element.support.opacity ? this.style[key] = value / 100 : this.style.filter = ('alpha(opacity=' + value + ')');
                    }
                    else {
                        key = styleExcept[key] ? styleExcept[key] : key;
                        this.style[$.tools.toCamel(key)] = value;
                    }
                });
            }
            return this;
        },
        center:function (zIndex) {
            this.each(function () {
                var w, h;
                this.style.position = "absolute";
                this.style.top = "50%";
                this.style.left = "50%";
                this.style.display = "block";
                this.style.zIndex = zIndex || 1000;
                w = parseInt(getComputedStyle(this, 'width')) || this.offsetWidth;
                h = parseInt(getComputedStyle(this, 'heigth')) || this.offsetHeight;
                this.style.marginLeft = (window.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft) - w / 2 + "px";
                this.style.marginTop = (window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop) - h / 2 + "px";
            });
            return this;
        },
        show:function () {
            this.each(function () {
                if (getComputedStyle(this, 'display') === 'none') {
                    this.style.display = this._display_cache || '';
                }
            });
            return this;
        },
        hide:function () {
            this.each(function () {
                if (getComputedStyle(this, 'display') !== 'none') {
                    this._display_cache = getComputedStyle(this, 'display');
                    this.style.display = "none";
                }
            });
            return this;
        }
    };
    $.dom.element.extend(style);
    $.nameSpace.pack("Mallan.dom.element.style", style);
})(Mallan);
