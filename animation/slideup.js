/**
 * @author allanma
 */

//@require Mallan.js
//@require Mallan.dom.mallan.js
//@require Mallan.dom.mallan.Style.js

(function($, undefined) {

	var speedMap = {
		fast : 20, //0.2s内完成
		slow : 100//1s内完成
	};

	$.dom.mallan.extend({
		slideup : function(speed) {
			speed = speed || "fast";
			this.each(function() {
				var self = $(this), oHeight, dec, oStyle;
				if(self.css("display") === "none") {
					return;
				}
				oHeight = self.css("height");
				dec = parseInt(parseInt(oHeight) / (speedMap[speed] || 20));
				oStyle = this.style.cssText;
				self.css("overflow", "hidden");
				var loop = setInterval(function() {
					var h = parseInt(self.css("height"));
					if(h >= dec) {
						self.css("height", h - dec + "px");
					}
					else {
						clearInterval(loop);
						self[0].style.cssText = oStyle;
						self.hide();
					}
				}, 1);
			});
			return this;
		},
		slidedown : function(speed) {
			speed = speed || "fast";
			this.each(function() {
				var self = $(this), oHeight, dec, oStyle;
				if(self.css("display") !== "none") {
					return;
				}
				self.show();
				oHeight = parseInt(self.css("height"));
				dec = parseInt(parseInt(oHeight) / (speedMap[speed] || 20));
				oStyle = this.style.cssText;
				self.css({
					overflow : "hidden",
					height : "0px"
				});
				var loop = setInterval(function() {
					var h = parseInt(self.css("height"));
					if(h < oHeight) {
						self.css("height", h + Math.min(dec, oHeight - h) + "px");
					}
					else {
						clearInterval(loop);
						self[0].style.cssText = oStyle;
					}
				}, 1);
			});
			return this;
		}
	});
})(Mallan);
