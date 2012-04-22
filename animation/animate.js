/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * animate.js
 */

// @require dom.element.style
// @require events.customevent
// @require lang.array
(function ($, undefined) {
    var animate = function (element, opt) {
        this.event = new $.events.CustomEvent();
        this.element = $(element);
        this.opt = opt || {};
        this.timer = null;
    };
    animate.prototype = {
        constructor:animate,
        mallantype:"animate",
        start:function (keys, values, time) {
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
            var _events = [];
            $('array').each(keys, function (i) {
                _events.push('c_' + this);
            });
            _events.push(function () {
                self.event.emit('complete');
            });

            self.event.when.apply(self.event, _events);

            $('array').each(keys, function (i) {
                var key, value, speed, cur, pos, px, len, per = 1, count;
                key = keys[i];
                value = parseInt(values[i]);
                cur = parseInt(el.css(key)) || 0;
                if (value === cur) {
                    self.event.emit('c_' + key);
                    return;
                }
                px = values[i].indexOf('px') !== -1 ? 'px' : '';
                count = len = Math.abs(value - cur);
                pos = len / (value - cur);
                speed = time / len;
                if (speed < 2) {
                    speed = 2;
                    count = parseInt(time / speed);
                    per = parseFloat(len / count);
                }

                self.timer[i] = setInterval(function () {
                    //var _cur = parseFloat(el.css(key));
                    cur += pos * per;
                    if (count-- >= 0) {
                        el.css(key, cur + px);
                    } else {
                        el.css(key, values[i]);
                        clearInterval(self.timer[i]);
                        self.event.emit('c_' + key);
                    }
                }, speed);
            });
        },
        stop:function () {
            $('array').each(this.timer, function () {
                clearInterval(this);
            });
            this.event.clear();
        }
    };

    $.dom.element.extend({
        animate:function (keys, values, time, onComplete) {
            var event = new $.events.CustomEvent();
            var events = [];
            this.each(function (i) {
                events.push('element_' + i);
            });
            events.push(function () {
                onComplete();
            });
            event.whenOnce.apply(event, events);

            this.each(function (i) {
                var ani = this._animate_cache = this._animate_cache || new animate(this, {});
                ani.stop();
                if (onComplete) {
                    ani.event.once('complete', function () {
                        event.emit('element_' + i);
                    });
                }
                ani.start(keys, values, time);
            });
        }
    });

    $.nameSpace.pack("Mallan.animation.animate", animate);
})(Mallan);