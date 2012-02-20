/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * customevent.js
 */
(function($, undefined) {
	var CustomEvent = function(name, options) {
		//<param>name String</param>
		//<param>options Object</param>
		this.name = name;
		this.handles = [];
		//add custom properties to this CustomEvent Object
		$.tools.merge(this, options || {});
	};
	CustomEvent.prototype = {
		constructor : CustomEvent,
		mallantype : "CustomEvent",
		addListener : function(fn, referToThis, el) {
			this.handles.push([fn, referToThis, el]);
		},
		removeListener : function(fn, el) {
			if(fn || el) {
				for(var i = 0, l = this.handles.length; i < l; i++) {
					var handle = this.handles[i];
					if(( fn ? handle[0] === fn : true) && ( el ? handle[2] === el : true)) {
						this.handles.splice(i--, 1);
						l--;
					}
				}
			}
			else {
				this.handles = [];
			}
		},
		fire : function() {
			var args, i, l;
			args = [].slice.call(arguments, 0)
			for( i = 0, l = this.handles.length; i < l; i++) {
				var handle = this.handles[i];
				handle[0].apply(handle[1] || this, args);
			}
		},
		bindOnce:function(fn,referToThis,el){
			var self = this,newFn;
			newFn = function(){
				fn.apply((referToThis|| self),[].slice.call(arguments,0));
				self.removeListener(newFn,el);
			}
			self.addListener(newFn,referToThis,el);
		}
	};
	CustomEvent.prototype.on = CustomEvent.prototype.bind = CustomEvent.prototype.addListener;
	CustomEvent.prototype.unbind = CustomEvent.prototype.removeListener;
	CustomEvent.prototype.emit = CustomEvent.prototype.fire;

	$.nameSpace.pack("Mallan.events.customEvent", CustomEvent);
})(Mallan);
