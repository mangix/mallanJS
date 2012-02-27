/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * hover.js
 */
//@require dom.element
//@require events.eventbind

(function ($, undefined) {
    var element = $.dom.element, hover;

    hover = function (onMouseOver, onMouseOut) {
        //提供对mouseover，mouseout事件的封装，解决子元素的mouseover，mouseout反复冒泡的弊端
        var self = this;
        this.bind('mouseover', function (e) {
            if (!this._cache_mouseover_) {
                onMouseOver.call(this, e);
                this._cache_mouseover_ = true;
            }
        });
        this.bind('mouseout', function (e) {
            var toElement = e.toElement, inElement = false;
            while (toElement) {
                if (toElement === this) {
                    inElement = true;
                    break;
                }
                toElement = toElement.parentNode;
            }
            if (!inElement) {
                onMouseOut.call(this, e);
                this._cache_mouseover_ = false;
            }
        });
        return this;
    };
    element.extend({
        "hover":hover
    });
    $.nameSpace.pack("Mallan.events.hover", hover);
})(Mallan);