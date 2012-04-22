//@require lang.inherit

(function ($, undefined) {
    var Model = $.lang.Class.inherit({
        init : function () {
            this.data = arguments[0] || {};
        },
        set : function (obj) {
            for (var name in obj) {
                this.data[name] = obj[name];
            }

            //TODO emit
        },
        get : function (key) {
            return this.data[key];
        },
        has : function (key) {
            return this.data[key] !== undefined;
        },
        equal : function (key, value) {
            return this.data[key] === value;
        },
        on : function (type) {
        }
    });

    $.nameSpace.pack('Mallan.mvc.Model', Model);
})(Mallan);