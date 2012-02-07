/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * node.js
 */

//@require Mallan.js
//@require Mallan.dom.element.js

(function($, undefined) {
	var fixAttr = function(target, clone) {
		var nodeName = target.nodeName.toLowerCase();
		clone.clearAttributes && clone.clearAttributes();
		clone.mergeAttributes && clone.mergeAttributes(target);

		if(nodeName === 'input' && (target.type === 'checkbox' || target.type === 'radio')) {
			clone.defaultChecked = clone.checked = target.checked;
			clone.value = target.value;
		}
		else if(nodeName === 'option') {
			clone.selected = target.defaultSelected;
		}
		else if(nodeName === "input" || nodeName === "textarea") {
			clone.defaultValue = target.defaultValue;
		}
	}, doc = document, element = $.dom.element, node = {
		parent : function() {
			var parents = new element();
			this.each(function() {
				if(!$.tools.contain(parents, this.parentNode)) {
					parents.join(this.parentNode);
				}
			});
			return parents;
		},
		clone : function(cloneChildren) {
			var clones = new element();
			cloneChildren = !!cloneChildren;
			this.each(function() {
				var cloned = this.cloneNode(cloneChildren);
				fixAttr(this, cloned);
				clones.join(cloned);
			});
			return clones;
		},
		next : function() {
			var nexts = new element();
			this.each(function() {
				var node = this;
				while( node = node.nextSibling) {
					if(node.nodeType === 1) {
						nexts.join(node);
						break;
					}
				}
			});
			return nexts;
		},
		prev : function() {
			var prevs = new element();
			this.each(function() {
				var node = this;
				while( node = node.previousSibling) {
					if(node.nodeType === 1) {
						prevs.join(node);
						break;
					}
				}
			});
			return prevs;
		},
		append : function(content) {
			if( typeof content === 'string') {
				var div = doc.createElement("div");
				div.innerHTML = content;
				this.append(new element(div.childNodes));
			}
			else if(content.nodeType && content.nodeType === 1) {
				//element
				this.each(function(i) {
					if(i === 0) {
						this.appendChild(content);
					}
					else {
						var cloned = content.cloneNode(true);
						fixAttr(content, cloned);
						this.appendChild(cloned);
					}
				});
			}
			else if(content.mallantype === "element") {
				//element object
				this.each(function(i) {
					var self = this;
					if(i === 0) {
						content.each(function() {
							self.appendChild(this);
						})
					}
					else {
						content.each(function() {
							var cloned = this.cloneNode(true);
							fixAttr(this, cloned);
							self.appendChild(cloned);
						});
					}
				});
			}
			return this;
		},
		insertBefore : function(el) {
			el = el.mallanType === 'element' ? (el[0] ? el[0] : null) : (el.nodeType ? el : null);
			if(el) {
				this.each(function() {
					el.parentNode.insertBefore(this, el);
				});
			}
			return this;
		},
		insertAfter : function(el) {
			el = el.mallanType === 'element' ? (el[0] ? el[0] : null) : (el.nodeType ? el : null);
			if(el) {
				var next = el.nextSibling;
				if(next) {
					this.each(function() {
						el.parentNode.insertBefore(this, next);
					});
				}
				else {
					this.each(function() {
						el.parentNode.appendChild(this);
					});
				}
			}
			return this;
		},
		appendTo : function(el) {
			el = el.mallanType === 'element' ? (el[0] ? el[0] : null) : (el.nodeType ? el : null);
			if(el) {
				this.each(function() {
					el.appendChild(this);
				});
			}
			return this;
		},
		html : function(html) {
			if(html !== undefined) {
				this.each(function() {
					this.innerHTML = html;
				});
				return this;
			}
			if(this[0]) {
				return this[0].innerHTML;
			}
			return '';
		}
	};
	$.dom.element.extend(node);
	$.nameSpace.pack("Mallan.dom.element.node", node);
})(Mallan);