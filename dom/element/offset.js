/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * offset.js
 */


//@require dom.element
//@require util.page

(function ($, undefined) {
    var getOffset, offset, pager = $.util.page.getInstance();

    getOffset = (function () {
        if (document.documentElement.getBoundingClientRect) {
            return function (el) {
                return el.getBoundingClientRect();
            };
        }
    })();

    var offset = {
        offsetLeft:function () {
            //get the distance of left border of first element  to page left border
            var x = pager.scrollX();
            if (this[0]) {
                return getOffset(this[0]).left + x;
            }
        },
        offsetTop:function () {
            //get the distance of top border of first element  to page top border
            var y = pager.scrollY();
            if (this[0]) {
                return getOffset(this[0]).top + y;
            }
        },
        offsetRight:function () {
            //get the distance of right border of first element  to page left border
            var scrollX = pager.scrollX();
            if (this[0]) {
                return getOffset(this[0]).right + scrollX;
            }
        },
        offsetBottom:function () {
            //get the distance of bottom border of first element  to page top border
            var scrollY = pager.scrollY();
            if (this[0]) {
                return getOffset(this[0]).bottom + scrollY;
            }
        }
    };

    $.dom.element.extend(offset);
    $.nameSpace.pack("Mallan.dom.element.offset", offset);
})(Mallan);
