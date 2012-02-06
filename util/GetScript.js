/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require Mallan.js
(function($, undefined){
    var getScript = function(url, callback){
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
        if (callback) {
            script.onload = function(){
                callback();
            };
        }
    };
    
    $.nameSpace.pack('Mallan.util.GetScript', getScript);
    $.extend({
        'getScript': getScript
    });
    
})(Mallan);
