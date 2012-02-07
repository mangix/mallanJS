/**
 * @author allanma
 * @mail maqh1988@gmail.com style.js
 */
//@require Mallan.js
//@require Mallan.dom.element.js
(function($, undefined) {
    if (!$.dom.element) {
        return;
    }
    var doc = document, styleExcept = {
        'float' : $.dom.element.support.cssFloat ? 'cssFloat' : 'styleFloat',
    }, getComputedStyle = (function() {
        if (doc.defaultView && doc.defaultView.getComputedStyle) {
            return function(el, key) {
                return doc.defaultView.getComputedStyle(el, null)[$.tools.toCamel(key)];
            };
        } else {
            var div = doc.createElement("div");
            if (div.currentStyle) {
                return function(el, key) {
                    return el.currentStyle[$.tools.toCamel(key)];
                };
            } else {
                return function(el, key) {
                    return '';
                };
            }
        }
    })();

    function contain(str, item) {
        return (" " + str + " ").indexOf(" " + item + " ") !== -1;
    }

    var style = {
        hasClass : function(clsName) {
            //check if the first element has the class
            if (this.length > 0) {
                return contain(this[0].className, clsName);
            }
            return false;
        },
        addClass : function(clsName) {
            clsName = $.tools.trim(clsName);
            this.each(function() {
                var currentCls = $.tools.trim(this.className);
                if (!contain(currentCls, clsName)) {
                    this.className = currentCls + " " + clsName;
                }
            });
            return this;
        },
        removeClass : function(clsName) {
            this.each(function() {
                this.className = $.tools.trim((" " + this.className + " ").replace(" " + clsName + " ", " "));
            });
            return this;
        },
        css : function(key, value) {
            if (arguments.length == 1) {
                if ($.typeOf(key) === "string") {
                    //get style(first one)
                    if (this[0]) {
                        return getComputedStyle(this[0], key);
                    }
                    return '';
                } else if ($.typeOf(key) === 'object') {
                    //set
                    this.each(function() {
                        for ( var o in key) {
                            if (o === 'opacity') {
                                $.dom.element.support.opacity ? this.style[o] = key[o] : this.style.filter = ('alpha(opacity=' + key[o] * 100);
                            }
                            o = styleExcept[o] ? styleExcept[o] : o;
                            this.style[o] = key[o];
                        }
                    });
                }
            } else if (arguments.length == 2) {
                //set style
                this.each(function() {
                    if (key === 'opacity') {
                        $.dom.element.support.opacity ? this.style[key] = value : this.style.filter = ('alpha(opacity=' + value * 100);
                    } else {
                        key = styleExcept[key] ? styleExcept[key] : key;
                        this.style[$.tools.toCamel(key)] = value;
                    }
                });
            }
            return this;
        },
        offsetX : function() {

        },
        offsetY : function() {

        },
        center : function() {
            this.each(function() {
                var w, h;
                this.style.position = "absolute";
                this.style.top = "50%";
                this.style.left = "50%";
                this.style.display = "block";
                w = parseInt(getComputedStyle(this, 'width')) || 0;
                h = parseInt(getComputedStyle(this, 'heigth')) || 0;
                this.style["margin-left"] = (window.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft) - w / 2 + "px";
                this.style["margin-top"] = (window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop) - h / 2 + "px";
            });
            return this;
        },
        show : function() {
            this.each(function() {
                this.style.display = this._display_cache || '';
            });
            return this;
        },
        hide : function() {
            this.each(function() {
                this._display_cache = getComputedStyle(this, 'display');
                this.style.display = "none";
            });
            return this;
        }
    };
    $.dom.element.extend(style);
    $.nameSpace.pack("Mallan.dom.element.style", style);
})(Mallan);
