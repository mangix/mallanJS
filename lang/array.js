/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * array.js
 */
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
			},
			unique:function(arr){
				//delete the repeated items
				for(var i=0,l = arr.length;i<l;i++){
					var item = arr[i];
					for(var j=i+1,len = arr.length;j<len;j++){
						if(item===arr[j]){
							arr.splice(j,1);
							j--;
							len--;
							l--;
						}
					}
				}
			}
		};
	});
	
	$.namepace.pack("Mallan.util.array", array);
	$.extendCustom({
		name : "array",
		cls : array,
		constructType : "single"
	});
})(Mallan);
