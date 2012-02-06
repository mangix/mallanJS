/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require Mallan.js
(function($, undefined) {
	var array = $.singleton(function() {
		return {
			each : function(arr, fn) {
				if($.tools.isArray(arr)) {
					for(var i = 0, l = arr.length; i < l; i++) {
						if(fn.call(arr[i], i) === false) {
							break;
						}
					}
				}
			},
			indexOf : function(arr, item) {
				if($.tools.isArray(arr)) {
					for(var i = 0, l = arr.length; i < l; i++) {
						if(arr[i] === item) {
							return i;
						}
					}
				}
				return -1;
			},
			contain : function(arr, item) {
				//check if the array contains the item
				if($.tools.isArray(arr)) {
					for(var i = 0, l = arr.length; i < l; i++) {
						if(arr[i] === item) {
							return true;
						}
					}
				}
				return false;
			}
		}
	});
	$.nameSpace.pack("Mallan.util.Array", array);
	$.extendCustom({
		name : "array",
		cls : array,
		constructType : "single"
	});
})(Mallan);
