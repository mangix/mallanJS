/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@reqiure Mallan.js
//@require Mallan.dom.mallan.js

(function($, mallan) {
	if(!$.dom.mallan) {
		return;
	}
	var attrExcept = {
		"disabled" : true,
		"checked" : true,
		"readOnly" : true
	}, attribute = {
		attr : function(key, value) {
			if(value === undefined) {
				//get
				if( typeof key == "string") {
					return this[0] ? this[0].getAttribute(key) : null;
				}
				else {
					for(var o in key) {
						this.attr(o, key[o]);
					}
				}
			}
			else {
				this.each(function() {
					if(attrExcept[key]) {
						this[key] = !!value;
					}
					else {
						this.setAttribute(key, value);
					}
				});
			}
			return this;
		},
		cache : function(name, value) {
			if(value) {
				this.cache[name] = value;
				return this;
			}
			else {
				return this.cache[name];
			}
		}
	};
	$.dom.mallan.extend(attribute);
	$.nameSpace.pack("Mallan.dom.mallan.attribute", attribute);

})(Mallan)