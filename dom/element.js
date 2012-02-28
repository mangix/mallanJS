/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * element.js
 */
//@require dom.selector
(function ($, undefined) {
    //Class element
    //pack the result of a selector to the element object
    //and the element object provides couple of usefull method to operate the DOM
    var support = (function () {
        var testee = document.createElement('div'), id = '_jui_' + (new Date()).getTime(), testee_a;
        testee.innerHTML = '   <link/><table></table><a name="' + id + '" class=" b" href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select>';
        //support.opacity = (typeof testee.style.opacity) !== 'undefined' ? 1 : ((typeof
        // testee.filters === 'object') || (typeof testee.filter === 'string')) ? 2 : 0;
        // do not support any other old browsers
        support = {
            // IE don't support opacity
            // but use filter instead
            opacity:( typeof testee.style.opacity) !== 'undefined' ? true : false,

            // FF use textContent instead of innerText
            innerText:( typeof testee.innerText) !== 'undefined' ? true : false,

            // IE strips leading whitespace when .innerHTML is used
            leadingWhitespace:testee.firstChild && testee.firstChild.nodeType == 3,

            // Verify style float existence
            // (IE uses styleFloat instead of cssFloat)
            cssFloat:!(testee.style.cssFloat === undefined),

            // these will be specified later
            cloneEvent:false,

            // Make sure that tbody elements aren't automatically inserted
            // IE will insert them into empty tables
            tbody:false,

            // Make sure that link elements get serialized correctly by innerHTML
            // This requires a wrapper element in IE
            htmlSerialize:false
        }

        if (testee.getElementsByTagName) {
            support.tbody = !!testee.getElementsByTagName("tbody").length;
            support.htmlSerialize = !!testee.getElementsByTagName("link").length;
        }

        // clone event test
        if (testee.attachEvent && testee.fireEvent) {
            testee.attachEvent("onclick", function click() {
                // Cloning a node shouldn't copy over any
                // bound event handlers (IE does this)
                support.cloneEvent = true;
                testee.detachEvent("onclick", click);
            });
            testee.cloneNode(true).fireEvent("onclick");
        }
        return support;
    })();

    var element = function (selector, context) {
        //<param>selector String , element , DOM Element , array of DOM Element</param>
        //<param>context DOM Element</param>
        this.length = 0;
        this.selector = "";
        if (!selector) {
            return this;
        }
        if (selector.mallantype === "element") {
            return selector;
        }
        if (selector.nodeType || selector === window) {
            this.join(selector);
            return this;
        }
        if ($.tools.isArray(selector) || (selector.length && selector.item )) {
            this.join(selector);
        }
        if (typeof selector === "string") {
            //use Selector
            this.join($.select(selector, context));
        }
    };
    //the element object is the return object of '$' selecotr
    element.prototype = {
        constructor:element,
        mallantype:"element",
        join:function (domElements) {
            if ($.tools.isArray(domElements) || (domElements.length && domElements.item)) {
                for (var i = 0, l = domElements.length; i < l; i++) {
                    var item = domElements[i];
                    if (item && item.nodeType && item.nodeType == 1) {
                        this[this.length++] = item;
                    }
                }
            }
            else if (domElements.nodeType) {
                this[this.length++] = domElements;
            }
        },
        each:function (fn) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (fn.call(this[i], i) === false) {
                    break;
                }
            }
            return this;
        },
        indexOf:function (el) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i] === el) {
                    return i;
                }
            }
            return -1;
        },
        query:function (selectStr) {
            if (this[0]) {
                return new element($.select(selectStr, this[0]));
            }
            else {
                return new element();
            }
        },
        exist:function (fn) {
            if (this.length != 0) {
                if (fn) {
                    fn.call(this);
                }
            }
            return this;
        }
    };
    element.extend = function (obj) {
        if (typeof obj === "object") {
            for (var o in obj) {
                this.prototype[o] = obj[o];
            }
        }
    };
    element.support = support;

    $.nameSpace.pack("Mallan.dom.element", element);
    if (!$.stardard$) {
        $.stardard$ = element;
    }
})(Mallan);
