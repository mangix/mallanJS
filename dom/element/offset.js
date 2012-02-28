/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * offset.js
 */


//@require dom.elemenet
//@require util.page

(function ($, undefined) {
    var getOffset, offset;

    getOffset = (function () {
        if (doc.documentElement.getBoundingClientRect) {
            return function (el) {
                var offset = el.getBoundingClientRect();
                return el.getBoundingClientRect();
            };
        }
    })();

    offset = {
        offsetLeft:function () {
            //获取element中的第一个元素的 左 边框到页面 左 边界的距离
            var scrollX = $("page").scrollX();
            if (this[0]) {
                return getOffset(this[0]).left + scrollX;
            }
        },
        offsetTop:function () {
            //获取element中的第一个元素的 上 边框到页面 上 边界的距离
            var scrollY = $("page").scrollY();
            if (this[0]) {
                return getOffset(this[0]).top + scrollY;
            }
        },
        offsetRight:function () {
            //获取element中的第一个元素的 右 边框到页面 左 边界的距离
            var scrollX = $("page").scrollX();
            if (this[0]) {
                return getOffset(this[0]).right + scrollX;
            }
        },
        offsetBottom:function () {
            //获取element中的第一个元素的 下 边框到页面 上 边界的距离
            var scrollY = $("page").scrollY();
            if (this[0]) {
                return getOffset(this[0]).bottom + scrollY;
            }
        }
    };

    $.dom.element.extend(offset);
    $.nameSpace.pack("Mallan.dom.element.offset", offset);
})(Mallan);
