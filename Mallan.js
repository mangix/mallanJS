/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * Mallan.js
 */
(function(window, undefined) {
	var customs = {}, //custom object { cookie:
	// {cls:mallan.Cookie,constructType:"new" or "fn" or "obj"}}
	stardard$ = null, //stardard $ selector
	domCache = [], //dom cache
	tools = {
		trim : function(str) {
			return str.replace(/^\s+|\s+$/g, '');
		},
		merge : function(o1, o2) {
			for(var p in o2) {
				o1[p] = o2[p];
			}
			return o1;
		},
		toCamel : function(str) {
			return str.replace(/-[a-z]/ig, function(w) {
				return w.charAt(1).toUpperCase();
			});
		},
		isArray : function(obj) {
			return (obj && Object.prototype.toString.call(obj) === "[object Array]");
		},
		contain : function(obj, item) {
			if( typeof obj === "object") {
				for(var o in obj) {
					if(obj[o] === item) {
						return true;
					}
				}
				return false;
			}
			else {
				for(var i = 0, l = obj.length; i < l; i++) {
					if(obj[i] === item) {
						return true;
					}
				}
				return false;
			}
		}
	};

	//Mallan function,main entry
	$ = window.$ = window.Mallan = Mallan = function(selector, context) {
		//  try to select the custom object
		if(customs[selector]) {
			var args, custom = customs[selector], cstName = custom.name, cstCls = custom.cls, cstType = custom.constructType;
			args = [].slice.call(arguments, 1);
			switch (cstType) {
				case "new":
					return new cstCls();
				case "fn":
					return cstCls.apply(this, args);
				case "single":
					return cstCls.getInstance();
				case "obj":
					return customCls;
			}
		}
		if($.stardard$) {
			return new $.stardard$(selector, context);
		}
		return null;
	};

	Mallan.extend = function(obj) {
		if( typeof obj === "object") {
			for(var o in obj) {
				this[o] = obj[o];
			}
		}
	};
	//basic properties of Mallan
	Mallan.extend({
		"custom" : customs,
		extendCustom : function(customObj) {
			var name = customObj.name, cls = customObj.cls, constructType = customObj.constructType || "fn";
			if(!name || !cls) {
				return;
			}
			customs[name] = {
				cls : cls,
				constructType : constructType
			};
		},
		typeOf : function(obj) {
			var type = typeof obj, o;
			type = type.toLowerCase();
			if(obj.mallantype) {
				return obj.mallantype;
			}
			if(type !== "function" && type !== "object") {
				return type;
			}
			//try customs
			for(o in customs) {
				var custom = customs[o], cstType = custom.constructType, cls = custom.cls, name = custom.name;
				if((cstType == "new" && obj instanceof custom) || (cstType === "obj" && obj === cls) || (cstType === "single" && obj === cls.getInstance())) {
					return name;
				}
			}
			return type;
		},
		nameSpace : {
			root : $,
			pack : function(location, obj) {
				if( typeof location !== "string") {
					throw "first param of NameSpace.pack must be a string";
				}
				var path = location.split('.'), i, l, cPath = $, item;
				if(path[0] !== "Mallan") {
					throw "The root must be Mallan";
				}
				for( i = 1, l = path.length - 1; i < l; i++) {
					item = path[i];
					cPath = cPath[item] = (cPath[item] ? cPath[item] : {});
				}
				cPath[path[l]] = obj;
			}
		},
		singleton : function(init) {
			var unique = null;
			return {
				getInstance : function() {
					if(!unique) {
						unique = init();
					}
					return unique;
				}
			}
		},
		tools : tools
	});

})(window);
