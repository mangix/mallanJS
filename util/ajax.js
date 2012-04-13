/*
 * ajax.js
 *
 * */

//@require events.customevent
//@require util.json
(function ($, undefined) {
    var newXHR = (function () {
        if (window.ActiveXObject) {
            return function () {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            }
        } else if (window.XMLHttpRequest) {
            return function () {
                return new XMLHttpRequest();
            }
        }
        else {
            return function () {
                throw "Ajax not surpported";
            }
        }
    })(),
        slice = Array.prototype.slice;

    var Ajax = function (options) {
        var ajax = this,
            opt = this.options = $.tools.merge({
                url:'',
                async:true, //是否异步
                method:'POST', //可以用 'GET'
                type:'text', // 可以用xml
                timeout:0,
                headers:{
                },
                param:null,
                parseJSON:true //是否把responseText转换成JSON对象
            }, options || {});
        this.event = new $.events.CustomEvent();
        this.timer = null;
    };
    Ajax.prototype = {
        constructor:Ajax,
        parseJSON:function () {
            return $.lang.json.parse(this.xhr.responseText);
        },
        parseParam:function () {
            var param,
                params = this.options.param,
                res = [];
            for (var param in params) {
                res.push(param + "=" + params[param]);
            }
            return res.join('&') || null;
        },
        load:function () {
            var ajax = this,
                opt = this.options,
                xhr = this.xhr = newXHR();

            xhr.onreadystatechange = function () {
                var state = xhr.readyState,
                    res;//服务器返回值
                switch (state) {
                    //global event emit的时候显示的传this对象
                    case 1:
                        //on open
                        Ajax.global.event.emit('open', ajax);
                        ajax.event.emit('open');
                        break;
                    case 2:
                        //on send
                        Ajax.global.event.emit('send', ajax);
                        ajax.event.emit('send');
                        break;
                    case 4:
                        //on success
                        clearTimeout(ajax.timer);
                        if (xhr.status === 200) {
                            if (opt.type === "text") {
                                res = xhr.responseText;
                                opt.parseJSON && (res = ajax.parseJSON());
                            } else if (opt.type === "xml") {
                                res = xhr.responseXML;
                            }
                            Ajax.global.event.emit('success', ajax, res);
                            ajax.event.emit('success', res);
                        } else {
                            Ajax.global.event.emit('error', ajax, xhr.status, xhr.statusText);
                            ajax.event.emit('error', xhr.status, xhr.statusText);
                        }
                        break;
                }
            }
            xhr.open(opt.method, opt.url, opt.async);
            for (var head in opt.headers) {
                xhr.setRequestHeader(head, opt.headers[head]);
            }
            xhr.send(opt.param);
            if (opt.timeout) {
                ajax.timer = setTimeout(function () {
                    ajax.abort();
                    Ajax.global.event.emit('timeout', ajax);
                    ajax.event.emit('timeout');
                }, opt.timeout);
            }
            return ajax;
        },
        abort:function () {
            this.xhr.abort();
            return this;
        },
        setOption:function (obj) {
            //set options
            this.options = $.tools.merge(this.options, obj || {});
            return this;
        },
        getHeaders:function (key) {
            //获取response的headers属性
            //如果有key就返回相应值 string，如果没有则返回完整的header object
            if (key) {
                return this.xhr.getResponseHeader(key);
            }
            return this.xhr.getAllResponseHeaders();
        }

    };
    //全局定义Ajax的行为,各种event事件
    Ajax.global = {
        event:new $.events.CustomEvent()
    };
    var _events = ['Open', 'Send', 'Timeout', 'Success', 'Error'], //可以绑定的自定义事件
        _event;
    while (_event = _events.shift()) {
        (function (e) {
            //为Ajax的prototype扩展event方法，外部可以调用ajax.onTimeout(fn)来listener,listener中的this指向ajax对象
            //闭包避免_event混乱
            Ajax.prototype['on' + e] = function (fn) {
                var ajax = this;
                this.event.on(e.toLowerCase(), function () {
                    fn.apply(ajax, slice.call(arguments, 0));
                });
                return ajax;
            };

            //为Ajax.global扩展event方法，外部可以调用Ajax.global.onTimeout(fn)来listener,listener中的this指向ajax对象
            Ajax.global['on' + e] = function (fn) {
                Ajax.global.event.on(e.toLowerCase(), function () {
                    var ajax = arguments[0];
                    fn.apply(ajax, slice.call(arguments, 1));
                });
                return this;
            };
        })(_event);
    }

    $.nameSpace.pack('Mallan.util.Ajax', Ajax);
})(Mallan);