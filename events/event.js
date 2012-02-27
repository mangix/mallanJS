/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * event.js
 */
//@require events.keycode
(function ($, undefined) {
    function Event(e) {
        var e = this.originalEvent = e || {};
        this.target = e.target || e.srcElement;
        while (this.target && this.target.nodeType == 3) {
            //text
            this.target = this.target.parentNode;
        }
        this.clientX = e.clientX;//to browser
        this.clientY = e.clientY;
        this.pageX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));//to document
        this.pageY = e.pageY || (e.clientY + document.documentElement.scrollTop || document.body.scrollLeft);
        this.type = e.type || "";
        this.button = e.button;
        this.altKey = e.altKey;
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.metaKey = e.metaKey;
        this.which = e.charCode ? e.charCode : e.keyCode;
        if (this.type.indexOf("key") != -1) {
            if (e.charCode) {
                this.key = String.fromCharCode(e.charCode);
            }
            else {
                var keyCode = $.events.keyCode.getInstance();
                if (this.type.indexOf("keypress") != -1) {
                    this.key = keyCode.charMap[(e.charCode == undefined ? e.keyCode : "~" + e.keyCode)];
                }
                else {
                    this.key = keyCode.charMap["~" + this.which];
                }
            }
        }
        this.fromElement = e.fromElement ? e.fromElement : (e.type === "mouseover" ? e.relatedTarget : this.target );
        this.toElement = e.toElement ? e.toElement : (e.type === "mouseout" ? e.relatedTarget : this.target );
    }

    Event.prototype = {
        constructor:Event,
        mallantype:"Event",
        preventDefault:function () {
            var e = this.originalEvent;
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.cancelBubble = true;
            }
            return this;
        },
        stopPropagation:function () {
            var e = this.originalEvent;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                e.returnValue = false;
            }
            return this;
        },
        stop:function () {
            var e = this.originalEvent;
            this.preventDefault();
            this.stopPropagation();
            if (e.stop) {
                e.stop();
            }
            return this;
        }
    };

    $.nameSpace.pack("Mallan.events.event", Event);
})(Mallan);
