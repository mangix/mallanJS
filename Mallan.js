/**
 * @author allanma
 * @mail maqh1988@gmail.com Mallan.js
 */
(function (window, undefined) {
    var customs = {}, //custom object { cookie:
        tools = {
            trim:function (str) {
                return str.replace(/^\s+|\s+$/g, '');
            },
            merge:function (o1, o2) {
                for (var p in o2) {
                    o1[p] = o2[p];
                }
                return o1;
            },
            toCamel:function (str) {
                return str.replace(/-[a-z]/ig, function (w) {
                    return w.charAt(1).toUpperCase();
                });
            },
            isArray:function (obj) {
                return (obj && Object.prototype.toString.call(obj) === "[object Array]");
            },
            contain:function (obj, item) {
                if (typeof obj === "object") {
                    for (var o in obj) {
                        if (obj[o] === item) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    for (var i = 0, l = obj.length; i < l; i++) {
                        if (obj[i] === item) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        };

    //Mallan function,main entry
    window.$ = window.Mallan = Mallan = function (selector, context) {
        //  try to select the custom object
        if (customs[selector]) {
            var args, custom = customs[selector], cstCls = custom.cls, cstType = custom.constructType;
            args = [].slice.call(arguments, 1);
            switch (cstType) {
                case "new":
                    return new cstCls();
                case "fn":
                    return cstCls.apply(this, args);
                case "single":
                    return cstCls.getInstance();
                case "obj":
                    return cstCls;
            }
        }
        if ($.stardard$) {
            return new $.stardard$(selector, context);
        }
        return null;
    };

    Mallan.extend = function (obj) {
        if (typeof obj === "object") {
            for (var o in obj) {
                this[o] = obj[o];
            }
        }
    };
    //output by server side begin
    var _modules = { Mallan:{ rely:[] },
        'dom.element':{ rely:[ 'dom.selector' ] },
        'dom.selector':{ rely:[] },
        'plugin.lazyload':{ rely:[ 'util.page',
            'dom.selector',
            'dom.element',
            'dom.element.attribute',
            'dom.element.offset',
            'dom.element.style',
            'events.keycode',
            'events.event',
            'events.eventbind' ] },
        'plugin.shortcut':{ rely:[ 'dom.selector',
            'dom.element',
            'events.keycode',
            'events.event',
            'events.eventbind' ] },
        'plugin.calendar':{ rely:[ 'util.date',
            'util.page',
            'events.customevent',
            'dom.selector',
            'dom.element',
            'dom.element.attribute',
            'dom.element.node',
            'dom.element.style',
            'dom.element.create',
            'events.keycode',
            'events.event',
            'events.eventbind' ] },
        'plugin.photoslide':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'dom.element.node',
            'events.customevent',
            'events.keycode',
            'events.event',
            'events.eventbind',
            'lang.array',
            'animation.animate' ] },
        'plugin.placeholder':{ rely:[ 'dom.selector',
            'dom.element',
            'events.keycode',
            'events.event',
            'events.eventbind',
            'dom.element.create',
            'dom.element.node',
            'dom.element.style' ] },
        'plugin.tabview':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'events.customevent',
            'events.keycode',
            'events.event',
            'events.eventbind' ] },
        'plugin.treeview':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'events.keycode',
            'events.event',
            'events.eventbind',
            'events.customevent',
            'util.loader',
            'lang.array' ] },
        'plugin.dropdownlist':{ rely:[ 'events.customevent',
            'dom.selector',
            'dom.element',
            'dom.element.attribute',
            'dom.element.node',
            'dom.element.style',
            'dom.element.create',
            'util.page',
            'dom.element.offset',
            'events.keycode',
            'events.event',
            'events.eventbind' ] },
        'plugin.drag':{ rely:[ 'events.customevent',
            'dom.selector',
            'dom.element',
            'dom.element.style',
            'events.keycode',
            'events.event',
            'events.eventbind',
            'util.page',
            'dom.element.offset',
            'dom.element.create',
            'dom.element.node' ] },
        'util.date':{ rely:[] },
        'util.templete':{ rely:[] },
        'util.getcss':{ rely:[] },
        'util.linklist':{ rely:[ 'util.listitem' ] },
        'util.page':{ rely:[] },
        'util.querystring':{ rely:[] },
        'util.listitem':{ rely:[] },
        'util.browser':{ rely:[] },
        'util.cookie':{ rely:[] },
        'util.loader':{ rely:[] },
        'util.getscript':{ rely:[] },
        'animation.fade':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'events.customevent',
            'lang.array',
            'animation.animate' ] },
        'animation.animate':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'events.customevent',
            'lang.array' ] },
        'animation.slide':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'events.customevent',
            'lang.array',
            'animation.animate' ] },
        'events.eventbind':{ rely:[ 'dom.selector',
            'dom.element',
            'events.keycode',
            'events.event' ] },
        'events.customevent':{ rely:[] },
        'events.hover':{ rely:[ 'dom.selector',
            'dom.element',
            'events.keycode',
            'events.event',
            'events.eventbind' ] },
        'events.keycode':{ rely:[] },
        'events.event':{ rely:[ 'events.keycode' ] },
        'langon.js':{ rely:[] },
        'lang.array':{ rely:[] },
        'lang.inheritance':{ rely:[] },
        'lang.interface':{ rely:[] },
        'dom.element.fix':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'util.browser',
            'util.page' ] },
        'dom.element.offset':{ rely:[ 'dom.selector', 'dom.element', 'util.page' ] },
        'dom.element.create':{ rely:[ 'dom.selector', 'dom.element' ] },
        'dom.element.style':{ rely:[ 'dom.selector', 'dom.element' ] },
        'dom.element.full':{ rely:[ 'dom.selector',
            'dom.element',
            'dom.element.style',
            'util.page' ] },
        'dom.element.node':{ rely:[ 'dom.selector', 'dom.element' ] },
        'dom.element.attribute':{ rely:[ 'dom.selector', 'dom.element' ] } }

        , requireUrl = "http://192.168.26.200:8000/require";
    //output end

    //basic properties of Mallan
    Mallan.extend({
        "custom":customs,
        extendCustom:function (customObj) {
            var name = customObj.name, cls = customObj.cls, constructType = customObj.constructType || "fn";
            if (!name || !cls) {
                return;
            }
            customs[name] = {
                cls:cls,
                constructType:constructType
            };
        },
        typeOf:function (obj) {
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
        nameSpace:{
            pack:function (location, obj) {
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
                var module = _modules[location.replace('Mallan.', '').toLowerCase()];
                if (module) {
                    module.loaded = true;
                    module.time = +new Date();
                }
            }
        },
        singleton:function (init) {
            var unique = null;
            return {
                getInstance:function () {
                    if (!unique) {
                        unique = init();
                    }
                    return unique;
                }
            }
        },
        getScript:function (url, callback) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
            if (callback) {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        var rs = script.readyState;
                        if (rs === "loaded" || rs === "complete") {
                            callback();
                        }
                    };
                }
                else {
                    script.onload = callback;
                }
            }
        },
        tools:tools
    });

    //require module
    (function () {
        var requireQueue, callbackQueue, onRequire, require;
        requireQueue = [];
        callbackQueue = [];
        onRequire = null;
        require = function (modules, callback) {
            var module, i, l, j, len, requestModules = [], rely, relyModule;
            modules = modules.toLowerCase().split(',');
            callback = callback ||
                function () {
                };

            for (i = 0, l = modules.length; i < l; i++) {
                //put the rely modules into requestModules array
                module = modules[i];
                if (!_modules[module]) {
                    throw "unknow module " + module;
                }
                else if (_modules[module].loaded || $.tools.contain(requestModules, module)) {
                }
                else {
                    rely = _modules[module].rely;
                    for (j = 0, len = rely.length; j < len; j++) {
                        relyModule = rely[j];
                        if (!_modules[relyModule].loaded && !$.tools.contain(requestModules, relyModule)) {
                            requestModules.push(rely[j]);
                        }
                    }
                    requestModules.push(module);
                }
            }
            if (requestModules.length === 0) {
                //all the require modules are loaded
                callback();
            }
            else if (onRequire) {
                //some modules are onRequire
                //check these required modules are all in the onRequire array
                for (i = 0, l = requestModules.length; i < l; i++) {
                    var thisIn = false;
                    for (j = 0, len = onRequire.length; j < len; j++) {
                        if (requestModules[i] === onRequire[j]) {
                            thisIn = true;
                            break;
                        }
                    }
                    if (!thisIn) {
                        requireQueue.push({
                            request:requestModules,
                            callback:callback
                        });
                        return;
                    }
                }
                callbackQueue.push(callback);
            }
            else {
                //no module onRequire, send the request
                onRequire = requestModules;
                callbackQueue.push(callback);
                $.getScript(requireUrl + "?request=" + encodeURIComponent(requestModules.join(',')), function () {
                    var i, l, next = [], nextcbs = [];
                    //callback, call all the methods in the callbackQueue
                    for (i = 0, l = callbackQueue.length; i < l; i++) {
                        callbackQueue[i]();
                    }
                    //clear the callbackQueue and onRequest
                    callbackQueue = [];
                    onRequire = null;
                    //if there's requests in requireQueue, require next
                    if (requireQueue.length) {
                        for (i = 0, l = requireQueue.length; i < l; i++) {
                            next.push(requireQueue[i].request.join(','));
                            nextcbs.push(requireQueue[i].callback);
                        }
                        requireQueue = [];
                        require(next.join(','), function () {
                            for (var i = 0, l = nextcbs.length; i < l; i++) {
                                nextcbs[i]();
                            }
                        });
                    }
                });
            }
        };

        Mallan.extend({
            require:require,
            getLoadedModule:function () {
                var loaded = [], o;
                for (o in _modules) {
                    if (_modules[o].loaded) {
                        loaded.push({
                            module:o,
                            time:_modules[o].time
                        });
                    }
                }
                loaded.sort(function (a, b) {
                    return (a.time - b.time);
                });
                return loaded;
            }
        });
    })();

})(window);
