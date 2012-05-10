//@require lang.inherit
//@require util.isequal

(function ($, undefined) {
    var isEqual = $.util.isEqual;

    var Model = $.lang.Class.inherit({
        init:function () {
            this.data = arguments[0] || {};
        },
        set:function (key, value, changeLater) {
            /*
             * 设置数据
             *
             * @param key:String or Object 如果key是字符串，第二个参数就被当成value,第三个当成changeLater
             * @param value:Any 如果key是字符串这个参数就是value，如果是Object 这个参数就是changeLater
             * @param changeLater:Bool 如果true，怎不触发change事件，缓存此数据，直到调用change方法的时候才触发该change事件
             *
             * */
            if (typeof key === "string") {
                if (!isEqual(this.data[key], value)) {
                    this.data[key] = value;
                    if (!changeLater) {
                        this.event.emit('change:' + key, value);
                    } else {
                        this._changedObj[key] = value;
                    }
                }
            } else {
                for (var attr in key) {
                    this.set(attr, key[attr], !!changeLater);
                }
            }
        },
        get:function (key) {
            return this.data[key];
        },
        has:function (key) {
            return this.data[key] !== undefined;
        },
        save:function (type) {
            /*
             * 把数据存入server，cookie，localstorage等等
             *
             * */
        },
        fetch:function (type) {
            /*
             * 从sever，cookie,localstorage等获取数据
             * */

        }
    }, {
        event:new $.events.CustomEvent(),
        _changed:false,
        _changedObj:{}
    });

    $.nameSpace.pack('Mallan.mvc.Model', Model);
})
    (Mallan);