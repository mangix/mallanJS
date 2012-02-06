/**
 * @author Mangix
 * @mail maqh1988@gmail.com
 */
//@require Mallan.js
(function($, undefined){
    var getCss = function(url){
        var style = document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href = url;
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(style);
    };
    
    $.nameSpace.pack('Mallan.util.GetCss', getCss);
    $.extend({
        'getCss': getCss
    });
})(Mallan);
