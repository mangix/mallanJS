/*
 * template.js
 * Thanks to John Resig http://ejohn.org/blog/javascript-micro-templating/
 * Thanks to Underscore.js
 * */
(function ($, undefined) {
    var cache = {},
        tags = {
            evaluate:/<%([\s\S]+?)%>/g,
            interpolate:/<%=([\s\S]+?)%>/g,
            escape:/<%-([\s\S]+?)%>/g,
            noMatch:/.^/
        },
        _escape = function (string) {
            return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
        },
        template = function (str, data) {
            // Figure out if we're getting a template, or if we need to
            // load the template - and be sure to cache the result.
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                    template(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).

                new Function("obj", 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
                    'with(obj||{}){__p.push(\'' +
                    str.replace(/\\/g, '\\\\')
                        .replace(/'/g, "\\'")
                        .replace(tags.escape || tags.noMatch, function (match, code) {
                            return "',_escape(" + unescape(code) + "),'";
                        })
                        .replace(tags.interpolate || tags.noMatch, function (match, code) {
                            return "'," + unescape( code )+ ",'";
                        })
                        .replace(tags.evaluate || tags.noMatch, function (match, code) {
                            return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
                        })
                        .replace(/\r/g, '\\r')
                        .replace(/\n/g, '\\n')
                        .replace(/\t/g, '\\t')
                    + "');}return __p.join('');");

            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        };
    $.nameSpace.pack('Mallan.util.template', template);
})(Mallan);