/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * getscript.js
 */
//@require Mallan.js
(function($, undefined){
    var getScript = function(url, callback){
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
        
        if (callback) {
	        if (script.readyState) {
	            script.onreadystatechange = function(){
	                var rs = script.readyState;
	                if (rs === "loaded" || rs === "complete") 
	                    callback();
	            };
	        }
        else {
            script.onload = callback;
        }
    }
    };
    
    $.nameSpace.pack('Mallan.util.getScript', getScript);
    
})(Mallan);
