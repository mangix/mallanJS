/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * placeholder.js
 */
//@require dom.element
//@require events.event
//@require events.eventbind
//@require dom.element.create
//@require dom.element.node
//@require dom.element.style

(function ($, undefined) {
    var placeHolder = function (dom, value) {
        //@param dom:HTMLDOMElement
        //@param value:String
        var isPassword, mask, domELement = $(dom);
        if (dom.placeholder === undefined) {
            //html5 placeholder not supported
            dom._cache_holder = value;
            isPassword = dom.type === "password";
            if (isPassword) {
                //替换成增加一个text focus的时候换回原来的password
                mask = $.dom.element.create('<input type="text" style="' + dom.style.cssText + '" value="' + value + '" class="' + dom.className + '" />');
                mask.insertAfter(dom);
                domELement.hide();
                //绑定事件
                mask.bind('focus', function () {
                    mask.hide();
                    domELement.show();
                    dom.focus();
                });
                domELement.bind('blur', function () {
                    if (this.value === '') {
                        domELement.hide();
                        mask.show();
                    }
                });
            } else {
                dom.value = value;
                domELement.bind('focus',
                    function () {
                        if (dom.value === value) {
                            dom.value = '';
                        }
                    }).bind('blur', function () {
                        if (dom.value === '') {
                            dom.value = value;
                        }
                    });
            }
        } else {
            dom.placeholder = value;
        }
    }
    $.nameSpace.pack('Mallan.plugin.placeHoder', placeHolder);
    $.dom.element.extend({
        "placeHolder":function (value) {
            this.each(function () {
                placeHolder(this, value);
            });
        }
    });
})(Mallan);
