/**
 * @author allanma
 * @mail maqh1988@gmail.com 
 * fade.js
 */

// @require dom.element.style
// @require animation.animate

(function($,undefined){
	var defaultTime = 200;
	var fade = {
		fadeIn:function(time){
			this.css('opacity','0');
			this.show();
			var self = this;
			this.animate('opacity','100',(time||defaultTime));
		},
		fadeOut:function(time){
			var self =this;
			this.animate('opacity','0',(time||defaultTime),function(){
				self.hide();
			});
		}
	}
	
	$.dom.element.extend(fade);
	$.nameSpace.pack("Mallan.animation.fade", fade);
})(Mallan);