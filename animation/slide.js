/**
 * @author allanma
 * @mail maqh1988@gmail.com slide.js
 */

//@require dom.element
//@require dom.element.style
//@require animation.animate
(function($, undefined) {
    var defaultTime = 20;
    var slide = {
        slideup : function(time) {
            this.each(function() {
                var self = this, el = $(this);
                if (el.css('display') !== "none") {
                    self._origin_height = el.css('height');
                }
                var ani = this._animate_cache = this._animate_cache || new $.animation.animate(this, {});
                ani.stop();
                ani.events.onComplete.bindOnce(function() {
                    el.hide();
                });
                ani.start('height', '0px', time || defaultTime);
            });
            return this;
        },
        slidedown : function(time) {
            this.each(function() {
                var self = this, el = $(this), oHeight;
                if (this._origin_height) {
                    oHeight = self._origin_height;
                    el.show();
                } else {
                    el.show();
                    oHeight = el.css('height');
                    el.css('height', '0px');
                }
                var ani = this._animate_cache = this._animate_cache || new $.animation.animate(this, {});
                ani.stop();
                ani.start('height', oHeight, time || defaultTime);
            });
            return this;
        }
    };

    $.dom.element.extend(slide);
    $.nameSpace.pack("Mallan.animate.slide", slide);
})(Mallan);
