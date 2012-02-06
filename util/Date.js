/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require Mallan.js

(function($, undefined){
    var date = $.single(function(){
        return {
            parseDate: function(str, format){
                format = format ? format : "yyyy-MM-dd hh:mm:ss";
            },
            formatDate: function(format){
            }
        };
    });
	
	
})(Mallan);
