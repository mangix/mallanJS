/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * mallan.js
 */
//@require Mallan
//@require Mallan.dom.Selector
(function($, undefined) {
	//Class mallan
	//pack the result of a selector to the mallan object
	//and the mallan object provides couple of usefull method to operate the DOM
	var support = (function() {
		var testee = document.createElement('div'), id = '_jui_' + (new Date()).getTime(), testee_a;
		testee.innerHTML = '   <link/><table></table><a name="' + id + '" class="€ b" href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select>';
		//support.opacity = (typeof testee.style.opacity) !== 'undefined' ? 1 : ((typeof
		// testee.filters === 'object') || (typeof testee.filter === 'string')) ? 2 : 0;
		// do not support any other old browsers
		support = {
			// IE don't support opacity
			// but use filter instead
			opacity : ( typeof testee.style.opacity) !== 'undefined' ? true : false,

			// FF use textContent instead of innerText
			innerText : ( typeof testee.innerText) !== 'undefined' ? true : false,

			// IE strips leading whitespace when .innerHTML is used
			leadingWhitespace : testee.firstChild && testee.firstChild.nodeType == 3,

			// Verify style float existence
			// (IE uses styleFloat instead of cssFloat)
			cssFloat : !(testee.style.cssFloat === undefined),

			// these will be specified later
			cloneEvent : false,

			// Make sure that tbody elements aren't automatically inserted
			// IE will insert them into empty tables
			tbody : false,

			// Make sure that link elements get serialized correctly by innerHTML
			// This requires a wrapper element in IE
			htmlSerialize : false
		}

		if(testee.getElementsByTagName) {
			support.tbody = !!testee.getElementsByTagName("tbody").length;
			support.htmlSerialize = !!testee.getElementsByTagName("link").length;
		}

		// clone event test
		if(testee.attachEvent && testee.fireEvent) {
			testee.attachEvent("onclick", function click() {
				// Cloning a node shouldn't copy over any
				// bound event handlers (IE does this)
				support.cloneEvent = true;
				testee.detachEvent("onclick", click);
			});
			testee.cloneNode(true).fireEvent("onclick");
		}
		return support;
	})();

	var mallan = function(selector, context) {
		//<param>selector String , mallan , DOM Element , array of DOM Element</param>
		//<param>context DOM Element</param>
		this.length = 0;
		this.selector = "";
		if(!selector) {
			return this;
		}
		if(selector.mallantype === "mallan") {
			return selector;
		}
		if(selector.nodeType) {
			this.join(selector);
			return this;
		}
		if($.tools.isArray(selector) || (selector.length && selector.item )) {
			this.join(selector);
		}
		if( typeof selector === "string") {
			//use Selector
			if(!$.dom.Selector) {
				return;
			}
			var selectorResult = $.select(selector, context);
			this.join(selectorResult);
		}
	};
	//the mallan object is the return object of '$' selecotr
	mallan.prototype = {
		constructor : mallan,
		mallantype : "mallan",
		join : function(domElements) {
			if($.tools.isArray(domElements) || (domElements.length && domElements.item) ) {
				for(var i = 0, l = domElements.length; i < l; i++) {
					var item = domElements[i];
					if(item && item.nodeType) {
						this[this.length++] = item;
					}
				}
			}
			else if(domElements.nodeType) {
				this[this.length++] = domElements;
			}
		},
		each : function(fn) {
			for(var i = 0, l = this.length; i < l; i++) {
				if(fn.call(this[i], i) === false) {
					break;
				}
			}
			return this;
		},
		indexOf : function(el) {
			for(var i = 0, l = this.length; i < l; i++) {
				if(this[i] === el) {
					return i;
				}
			}
			return -1;
		}
	};
	mallan.extend = function(obj) {
		if( typeof obj === "object") {
			for(var o in obj) {
				this.prototype[o] = obj[o];
			}
		}
	};
	mallan.support = support;

	$.nameSpace.pack("Mallan.dom.mallan", mallan);
	if(!$.stardard$) {
		$.stardard$ = mallan;
	}
})(Mallan);
