/**
 * @author Mangix
 * @mail maqh1988@gmail.com\
 * querystring.js
 */
(function ($, undefined) {
    var queryString = $.singleton(function () {
        var query = window.location.href, params = query.split(/[?&#]/), param, obj = {}, i, l, kv;
        for (i = 1, l = params.length; i < l; i++) {
            param = params[i];
            if (!param) {
                continue;
            }
            kv = param.split('=');
            obj[kv[0]] = kv[1] || '';
        }
        return obj;
    });

    $.nameSpace.pack("Mallan.util.queryString", queryString);
    $.extendCustom({
        name:"querystring",
        cls:queryString,
        constructType:"single"
    });
})(Mallan);
