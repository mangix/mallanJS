/*
 * ajax.js
 *
 * */

(function ($, undefined) {
    var newXHR = (function () {
        try {
            new XMLHttpRequest();
            return function () {
                return new XMLHttpRequest();
            }
        } catch (e) {
            try {
                new ActiveXObject("Microsoft.XMLHTTP");
                return function () {
                    new ActiveXObject("Microsoft.XMLHTTP");
                }
            } catch (e) {
                return function () {
                    throw "Ajax not surpported";
                }
            }
        }
    })();

    var Ajax = function (options) {
        this.options = $.tools.merge({
            url:'',
            async:true, //是否异步
            method:'post', //可以用 'get'
            timeout:0,
            onTimeout:null
        }, options || {});
        this.xhr = newXHR();
    };

})(Mallan);