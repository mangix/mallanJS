/**
 * @author Mangix
 * @mail maqh1988@gmail.com
 * getcss.js
 */
(function($, undefined){
    var getCss = function(url){
        var style = document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href = url;
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(style);
    };
    
    $.nameSpace.pack('Mallan.util.getCss', getCss);
})(Mallan);
