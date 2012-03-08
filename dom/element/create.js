/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * create.js
 */

//@require dom.element

(function ($, undefined) {
    var element = $.dom.element, create;
    create = function (html) {
        var dom , el;
        if (html.charAt(0) === "<") {
            //regard as html code
            dom = document.createElement("div");
            dom.innerHTML = html;
            el = new element(dom.childNodes);
        } else {
            //regard as tag name
            dom = document.createElement(html);
            el = new element(dom);
        }
        return el;
    };

    $.nameSpace.pack("Mallan.dom.element.create", create);
})(Mallan);