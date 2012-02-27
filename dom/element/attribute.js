/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * attribute.js
 */
//@require dom.element

(function ($, undefined) {
    if (!$.dom.element) {
        return;
    }
    var attrExcept = {
        "disabled" : true,
        "checked" : true,
        "readOnly" : true
    }, attribute = {
        attr : function (key, value) {
            if (value === undefined) {
                //get
                if (typeof key == "string") {
                    return this[0] ? this[0].getAttribute(key) : null;
                }
                else {
                    for (var o in key) {
                        this.attr(o, key[o]);
                    }
                }
            }
            else {
                this.each(function () {
                    if (attrExcept[key]) {
                        this[key] = !!value;
                    }
                    else {
                        this.setAttribute(key, value);
                    }
                });
            }
            return this;
        },
        cache : function (name, value) {
            if (value) {
                this.cache[name] = value;
                return this;
            }
            else {
                return this.cache[name];
            }
        },
        val : function (value) {
            if (value !== undefined) {
                this.each(function(){
                    this.value = value;
                });
                return this;
            }
            if(this[0]){
                return this.value ;
            }
            return "";

        }
    };
    $.dom.element.extend(attribute);
    $.nameSpace.pack("Mallan.dom.element.attribute", attribute);

})(Mallan);