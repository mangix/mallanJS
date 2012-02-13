/**
 * @author allanma
 * @mail maqh1988@gmail.com 
 * animate.js
 */

// @require dom.element.style
// @require events.customevent
// @require lang.array
(function($, undefined) {
    var ce = $.events.customEvent;
    var animate = function(element, opt) {
        this.events = {
            onStart : new ce("onstart"),
            onComplete : new ce('oncomplete')
        };

        this.element = $(element);
        this.opt = opt;
        this.timer = null;
    };
    animate.prototype = {
        constructor : animate,
        mallantype : "animate",
        start : function(keys, values, time) {
            // <param>keys String or Array : such as margin-left,top</param>
            // <param>values String or Array : value of key ,when animation
            // when completed, element.style[key] will be value</param>
            // <param>time Number : millisecond</param>
            if (!$.tools.isArray(keys)) {
                keys = [ keys ];
            }
            if (!$.tools.isArray(values)) {
                values = [ values ];
            }
            var self = this, el = self.element, complete = new Array(keys.length);
            if (!el[0]) {
                return;
            }
            el = new $.dom.element(el[0]);
            self.timer = new Array(keys.length);
            function keyComplete(i) {
                var ok = true;
                complete[i] = true;
                $('array').each(complete, function() {
                    if (!this) {
                        ok = false;
                        return false;
                    }
                });
                if (ok) {
                    self.events.onComplete.fire();
                }
            }
            $('array').each(keys, function(i) {
                var key, value, speed, cur, pos, px, len, per = 1, count;
                key = keys[i];
                value = parseInt(values[i]);
                cur = parseInt(el.css(key));
                if (value === cur) {
                    return;
                }
                px = values[i].indexOf('px') ? 'px' : '';
                count = len = Math.abs(value - cur);
                pos = len / (value - cur);
                speed = time / len;
                if (speed < 2) {
                    speed = 2;
                    count = parseInt(time / speed);
                    per = parseInt(len / count);
                }

                self.timer[i] = setInterval(function() {
                    var _cur = parseInt(el.css(key));
                    if (count-- >= 0) {
                        el.css(key, _cur + pos * per + px);
                    } else {
                        el.css(key, values[i]);
                        keyComplete(i);
                        clearInterval(self.timer[i]);
                    }
                }, speed);
            });
        },
        stop : function() {
            $('array').each(this.timer, function(i) {
                clearInterval(this);
            });
            this.events.onComplete.removeListener();
        }
    };

    $.dom.element.extend({
        animate : function(keys, values, time, onComplete) {
            var allComplete = new Array(this.length);
            function complete(i) {
                allComplete[i] = true;
                var ok = true;
                $("array").each(allComplete, function() {
                    if (!this) {
                        ok = false;
                        return false;
                    }
                });
                if (ok) {
                    onComplete();
                }
            }
            this.each(function(i) {
                var ani = this._animate_cache = this._animate_cache || new animate(this, {});
                ani.stop();
                if (onComplete) {
                    ani.onComplete.bindOnce(function() {
                        complete(i);
                    });
                }
                ani.start(keys, values, time);
            });
        }
    });

    $.nameSpace.pack("Mallan.animation.animate", animate);
})(Mallan);