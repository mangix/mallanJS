/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * animate.js
 */

//@require Mallan.js
//@require Mallan.dom.element.js
//@require Mallan.dom.element.Style.js
//@require Mallan.events.customevent.js
//@require Mallan.lang.array.js
 
(function($,undefined){
	var animate = function(element,opt){
		//<param>key String or Array : such as margin-left,top</param>
		//<param>value String or Array : value of key ,when animation completed, dom.style[key] will be value</param>
		//<param>time Number : second </param>
		
		var ce = $.events.customEvent;
		this.events = {
			onStart:new ce("onstart"),
			onComplete : new ce('oncomplete')
		}
		
		//init
		this.element = $(element);
		this.opt = opt;
		this.timer = null;
	};
	animate.prototype = {
		constructor:animate,
		mallantype:"animate",
		start:function(keys,values,time){
			if(!$.tools.isArray(keys)){
				keys = [keys];
			}
			if(!$.tools.isArray(values)){
				values = [values];
			}
			this.timer = setInterval(function(){
				var _each = [];
				$("array").each(keys,function(i){
					_each.push(keys[i]/time);
				});
				element.each(function(){
					
				});
			});				
			
		},
		stop:function(){
			clearInterval(this.timer);
		}
	}
	
	$.dom.element.extend({
		
	});
	
	
	$.nameSpace.pack("Mallan.animation.animate",animate);
})(Mallan);