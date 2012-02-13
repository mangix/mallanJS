/**
 * @author allanma
 * @mail maqh1988@gmail.com Mallan.js
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
            for ( var p in o2) {
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
            if (typeof obj === "object") {
                for ( var o in obj) {
                    if (obj[o] === item) {
                        return true;
                    }
                }
                return false;
            } else {
                for ( var i = 0, l = obj.length; i < l; i++) {
                    if (obj[i] === item) {
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
        if (customs[selector]) {
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
        if ($.stardard$) {
            return new $.stardard$(selector, context);
        }
        return null;
    };

    Mallan.extend = function(obj) {
        if (typeof obj === "object") {
            for ( var o in obj) {
                this[o] = obj[o];
            }
        }
    };
    //basic properties of Mallan
    Mallan.extend({
        "custom" : customs,
        extendCustom : function(customObj) {
            var name = customObj.name, cls = customObj.cls, constructType = customObj.constructType || "fn";
            if (!name || !cls) {
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
            if (obj.mallantype) {
                return obj.mallantype;
            }
            if (type !== "function" && type !== "object") {
                return type;
            }
            //try customs
            for (o in customs) {
                var custom = customs[o], cstType = custom.constructType, cls = custom.cls, name = custom.name;
                if ((cstType == "new" && obj instanceof custom) || (cstType === "obj" && obj === cls) || (cstType === "single" && obj === cls.getInstance())) {
                    return name;
                }
            }
            return type;
        },
        nameSpace : {
            root : $,
            pack : function(location, obj) {
                if (typeof location !== "string") {
                    throw "first param of $.nameSpace.pack must be a string";
                }
                var path = location.split('.'), i, l, cPath = $, item;
                if (path[0] !== "Mallan") {
                    throw "The root must be Mallan";
                }
                for (i = 1, l = path.length - 1; i < l; i++) {
                    item = path[i];
                    cPath = cPath[item] = (cPath[item] ? cPath[item] : {});
                }
                cPath[path[l]] = obj;
                this.moduleLoaded[location.replace('Mallan.','')] = {
                    time : (new Date()).toUTCString()
                };
            }
        },
        singleton : function(init) {
            var unique = null;
            return {
                getInstance : function() {
                    if (!unique) {
                        unique = init();
                    }
                    return unique;
                }
            }
        },
        getScript : function(url, callback) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
            if (callback) {
                if (script.readyState) {
                    script.onreadystatechange = function() {
                        var rs = script.readyState;
                        if (rs === "loaded" || rs === "complete")
                            callback();
                    };
                } else {
                    script.onload = callback;
                }
            }
        },
        requireQueue : [],
        callbackQueue : [],
        onRequire : "",
        require : function(module, callback) {
            var rq = this.requireQueue, cq = this.callbackQueue, self = this;
            callback = callback || function() {
            };
            if (self.moduleLoaded) {
                //check if the module is loaded
                callback();
                return;
            } else if (self.onRequire && module !== self.onRequire) {
                //some module is onRequire but different ,put the request in put the requireQueue
                rq.push({
                    request : module,
                    callback : callback
                });
                return;
            } else if (self.onRequire && module === self.onRequire) {
                //the same module is onRequire,put the callback in to the callbackQueue if exists
                cq.push(callback);
            } else {
                //no module onRequire, send the request
                var targetUrl = "http://", param = [], o;
                self.onRequire = module;
                for (o in self.moduleLoaded) {
                    param.push(o);
                }
                param = encodeURIComponent(param.join(','));
                cq.push(callback);
                self.getScript(targetUrl + "?require=" + module + "&loaded=" + param, function() {
                    var i, l, next;
                    //callback, call all the methods in the callbackQueue
                    for (i = 0, l = cq.length; i < l; i++) {
                        cq[i]();
                    }
                    //clear the callbackQueue and onRequest
                    cq = [];
                    self.onRequire = "";
                    //if there's requests in requireQueue, require next
                    if (next = rq.shift()) {
                        self.require(next.request, next.callback);
                    }
                });
            }
        },
        moduleLoaded : {},
        hasLoaded : function(module) {
            return !!this.moduleLoaded[module];
        },
        tools : tools

    });

})(window);
