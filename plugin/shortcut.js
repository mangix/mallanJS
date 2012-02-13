/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * shortcut.js
 */
//@require dom.element
//@require events.keycode
//@require events.event
//@require events.eventbind
(function($, undefined){
    // Class Shortcut
    // keyboard shortcuts
    var addShortcut = function(el, keys, handle){
        keys = keys.toUpperCase().split('+');
        el.keypress(function(e){
            var key = e.key.toUpperCase(), pressedKey = {}, l = 0, hit = true;
            e.altKey && (pressedKey["ALT"] = true) && l++;
            e.ctrlKey && (pressedKey["CTRL"] = true) && l++;
            e.shiftKey && (pressedKey["SHIFT"] = true) && l++;
            pressedKey[key] = true;
            l++;
            if (keys.length === l) {
                for (var i = 0, l = keys.length; i < l; i++) {
                    if (keys[i] in pressedKey) {
                        continue;
                    }
                    else {
                        hit = false;
                        break
                    }
                }
            }
            else {
                hit = false;
            }
            if (hit) {
                handle.call(this);
                return false;
            }
        });
    };
    
    var Shortcut = function(el, keys, handle){
        this.el = $(el);
        this.keys = keys || "";
        this.handle = handle ||
        function(){
        };
        if (this.keys) {
            addShortcut(this.el, keys, this.handle);
        }
    };
    Shortcut.prototype = {
        constructor: Shortcut,
        mallantype: "Shortcut",
        addShortcut: function(keys, handle){
            addShortcut(this.el, keys, handle);
        }
    };
    
    $.dom.element.extend({
        addShortcut: function(keys, handle){
            addShortcut(this, keys || "", handle ||
            function(){
            });
        }
    });
    
    $.nameSpace.pack("Mallan.plugin.shortcut", Shortcut);
})(Mallan);
