/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * eventbind.js
 */
//@require Mallan.js
//@require Mallan.dom.element.js
//@require Mallan.events.event.js
(function($, undefined) {
	var addEvent = dltEvent = function() {
	}, events = ["abort", "blur", "change", "click", "contextmenu", "dbclick", "error", "focus", "keydown", "keypress", "keyup", "load", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "select", "submit", "unload"], setFns = function(el, type, wrapFn, fn) {
		wrapFn.originalFn = fn;
		if(!el["$mallan" + type]) {
			el["$mallan" + type] = [wrapFn];
		}
		else {
			el["$mallan" + type].push(wrapFn);
		}
	};
	if(document.addEventListener) {
		//starnd mothod
		addEvent = function(el, type, fn) {
			el.addEventListener(type, fn, false);
		};
		dltEvent = function(el, type, fn) {
			el.removeEventListener(type, fn, false);
		};
	}
	else if(document.attachEvent) {
		//ie mothod
		addEvent = function(el, type, fn) {
			el.attachEvent("on" + type, fn);
		};
		dltEvent = function(el, type, fn) {
			el.detachEvent("on" + type, fn);
		};
	}
	var eventBind = {
		bind : function(type, fn) {
			this.each(function(i) {
				var el = this;
				if(type.mallantype && type.mallantype === "CustomEvent") {
					type.addListener(fn, el, el);
				}
				else {
					var wrapFn = function(e) {
						var event = new $.event.Event(e || window.event);
						return fn.call(el, event, i);
					};
					addEvent(el, type, wrapFn);
					setFns(el, type, wrapFn, fn);
				}
			});
			return this;
		},
		unbind : function(type, fn) {
			this.each(function() {
				var el = this;
				if(type.mallantype && type.mallantype === "CustomEvent") {
					type.removeListener(fn, el);
				}
				else {
					var fns = this["$mallan" + type], i, l;
					if(fns) {
						for( i = 0, l = fns.length; i < l; i++) {
							if(fn) {
								if(fns[i].originalFn === fn) {
									dltEvent(el, type, fns[i]);
									break;
								}
							}
							else {
								dltEvent(el, type, fns[i]);
							}
						}
					}
				}
			});
			return this;
		},
		bindOnce : function(type, fn) {
			this.each(function(i) {
				var el = this;
				var wrapFn = function(e) {
					var event = new $.event.Event(e || window.event);
					fn.call(el, event, i);
					$(el).unbind(type, fn);
				};
				addEvent(el, type, wrapFn);
				setFns(el, type, wrapFn, fn);
			});
			return this;
		},
		fire : function(type) {
			this.each(function() {
				var el = this;
				if(type.mallantype && type.mallantype === "CustomEvent") {
					type.fire();
				}
				else {
					var fns = this["$mallan" + type], i, l;
					if(fns) {
						for( i = 0, l = fns.length; i < l; i++) {
							fns[i].call(el, new $.event.Event());
						}
					}
				}
			});
			return this;
		}
	};
	var obj = {}, i, l;
	for( i = 0, l = events.length; i < l; i++) {
		var _event = events[i];
		obj[_event] = (function(i) {
			return function(fn) {
				return this.bind.call(this, _event, fn);
			}
		})(i);
	}
	$.dom.element.extend(obj);
	$.nameSpace.pack("Mallan.events.eventBind",eventBind);

})(Mallan);
