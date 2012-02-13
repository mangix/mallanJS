/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * cookie.js
 */
(function($, undefined){
    var init = function(){
        return {
            get: function(key){
                var reg = new RegExp("(?:^|;)\\s*" + key + "\\s*=([^;]*)(;|$)");
                var match = document.cookie.match(reg);
                if (match) {
                    return match[1];
                }
                return "";
            },
            set: function(key, value, opt){
                var options = {
                    path: false,
                    domain: false,
                    maxAge: false,
                    secure: false,
                };
                $.tools.merge(options, opt);
                value = encodeURIComponent(value);
                if (options.path) {
                    value = value + ";path=" + options.path;
                }
                if (options.domain) {
                    value = value + ";domain=" + options.domain;
                }
                if (options.maxAge) {
                    value = value + ";max-age=" + options.maxAge;
                }
                if (options.secure) {
                    value = value + ";secure=" + options.secure;
                }
                document.cookie = key + "=" + value;
            }
        };
    }, Cookie = $.singleton(init);
    
    $.nameSpace.pack("Mallan.util.cookie", Cookie);
    $.extendCustom({
        name: "cookie",
        cls: Cookie,
        constructType: "single"
    });
})(Mallan);
