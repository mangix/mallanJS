(function ($) {
    var Class = function () {},
        initializing = false;

    Class.inherit = function (protoProp, nativeProp) {
        //@param protoProp:Object 加到prototype上的属性
        //@param nativeProp:Object 加到this上的属性

        protoProp || (protoProp = {});
        nativeProp || (nativeProp = {});

        var _super, proto, name,
            subClass;//子类
        _super = this.prototype;//父类的prototype
        initializing = true;//不调用init方法 只创建对象
        proto = new this();//子类的prototype，继承父类的属性
        initializing = false;

        //把属性附加到子类的prototype上,如果overwrite了父类的方法，就用super方法指向父类的方法
        for (name in protoProp) {
            proto[name] = (typeof  proto[name] === "function" && typeof protoProp[name] === "function") ? (function (name, fn) {
                //overwrite父类的方法
                return function () {
                    var tmp = this.super, //缓存父类的super方法
                        res;
                    this.super = _super[name];//把子类的super方法指向父类的方法
                    res = fn.apply(this, arguments);
                    this.super = tmp;//还原super方法
                    return res;
                };
            })(name, protoProp[name]) : protoProp[name];
        }

        subClass = function () {
            //用init函数来初始化
            if (!initializing && this.init) {
                //把属性附加到this上
                for (var name in nativeProp) {
                    if (name !== 'super' && name !== 'inherit') {
                        this[name] = nativeProp[name];
                    }
                }
                this.init.apply(this, arguments);
            }
        };
        subClass.prototype = proto;
        subClass.prototype.constructor = subClass;
        subClass.inherit = arguments.callee;
        return subClass;

    };

    $.Class = Class;
})(Mallan);