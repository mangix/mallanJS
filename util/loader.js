/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * loader.js
 */
(function ($, undefined) {
    var index = 0, pre = "Mallan.util.loader.cb_", Loader;
    Loader = function (opt) {
        //<param>opt object</param>
        var _opt = {
            url:"",
            param:{},
            callback:null,
            timeout:null,
            onTimeout:null,
            cache:true
        }, script, o, src, params = [], cur;
        if (opt) {
            $.tools.merge(_opt, opt);
        }
        src = _opt.url;
        if (!src) {
            //url is required
            return;
        }

        for (o in _opt.param) {
            params.push(o + '=' + _opt.param[o]);
        }
        if (!_opt.cache) {
            params.push('decache=' + Math.random() * 100);
        }
        if (_opt.callback) {
            //set $.util.Loader.cb_index a callback function
            //server side must output the param 'cb' like $.util.Loader.cb_0(data)
            var callback = _opt.callback;
            if (typeof callback === 'string') {
                //callback is name of a function
                params.push('cb=' + callback);
            }
            else if (typeof callback === 'function') {
                //callback is a function
                params.push('cb=' + pre + index);
                //a copy of global 'index'
                cur = index;
                if (_opt.timeout) {
                    //get a timer here
                    $.util.Loader['timeout_' + cur] = setTimeout(function () {
                        // if timeout, set the callback function  an empty function
                        $.util.Loader['cb_' + cur] = function () {
                        };
                        //if get a timeout  then call
                        _opt.onTimeout && _opt.onTimeout();
                    }, _opt.timeout);
                }
                $.util.Loader['cb_' + cur] = function () {
                    //claerTimeout and call the callback function
                    clearTimeout($.util.Loader['timeout_' + cur]);
                    callback.apply(this, arguments);
                };
                index++;
            }
        }
        if (params[0]) {
            src += (src.indexOf('?') == -1 ? ('?' + params.join('&')) : (params.join('&')));
        }
        //append a script tag to do the 'ajax' request
        $.getScript(src)
    };

    $.nameSpace.pack('Mallan.util.loader', Loader);
})(Mallan);
