/**
 * @author allanma
 * @mail maqh1988@gmail.com slide.js
 */

//@require Mallan.js
//@require Mallan.dom.element.js
//@require Mallan.dom.element.style.js
//@require Mallan.animate.js
(function($, undefined) {
    var defaultTime = 20;
    var slide = {
        slideup : function(time) {
            this.each(function() {
                var el = $(this);
                var ani = this._animate_cache = this._animate_cache || new $.animation.animate(this, {});
                ani.stop();
                ani.events.onComplete.bindOnce(function(){
                    el.hide();
                });
                ani.start('height', '0px', time || defaultTime);
            });
            return this;
        },
        slidedown : function(time) {
            this.each(function() {
                var el = $(this), oHeight;
                el.show();
                oHeight = el.css('height');
                el.css('height', '0px');
                var ani = this._animate_cache = this._animate_cache || new animate(this, {});
                ani.stop();
                ani.events.onComplete.bindOnce(function(){
                    el.show();
                });
                ani.start('height', oHeight, time || defaultTime, function() {
                    $(this).show();
                });
            });
            return this;
        }
    };

    $.dom.element.extend(slide);
    $.nameSpace.pack("Mallan.animate.slide", slide);
})(Mallan);
