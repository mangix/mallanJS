/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require Mallan.js
//@require Mallan.dom.mallan.js
//@require Mallan.event.KeyCode.js
//@require Mallan.event.Event.js
//@require Mallan.event.EventBind.js
(function($, undefined){
    var allow = function(str, el){
        el.keypress(function(e){
            if (str.indexOf(e.key) == -1) {
                e.preventDefault();
				return false;
            }
        });
    }, upperCase = function(el){
        el.css("text-transform", "uppercase");
    }, lowerCase = function(el){
        el.css("text-transform", "lowercase");
    }, defaultValue = function(str, el, style){
        el.each(function(){
            this.value = str;
            if (style) {
                $(this).css(style);
            }
        }).focus(function(e){
            e.stop();
            if (this.value === str) {
                this.value = "";
                if (style) {
                    for (var o in style) {
						
                    }
                }
            }
        }).blur(function(){
            if (this.value.replace(/\s/g, '') === '') {
                this.value = str;
                if (style) {
                    $(this).css(style);
                }
            }
        });
    };
    //Class Inputs
    //<param>el Element Or mallan</param>
    //<param>opt Objec</param>
    var Inputs = function(el, opt){
        this.el = $(el);
        this.opt = {
            defaultValue: "",
            style: {},
            allow: "",
            upperCase: false,
            lowerCase: false
        };
        $.tools.merge(this.opt, opt);
        //init
        var opt = this.opt;
        if (opt.defaultValue) {
            this.defaultValue(opt.defaultValue, opt.style);
        }
        if (opt.allow) {
            this.allow(opt.allow);
        }
        if (opt.upperCase) {
            this.upperCase();
        }
        if (opt.lowerCase) {
            this.lowerCase();
        }
    };
    Inputs.prototype = {
        constructor: Inputs,
        mallantype: "Inputs",
        allow: function(str){
            allow(str, this.el);
        },
        upperCase: function(){
            upperCase(this.el);
        },
        lowerCase: function(){
            lowerCase(this.el);
        },
        defaultValue: function(str){
            defaultValue(str, this.el, this.opt.style);
        }
    };
    
    //extend mallan methods to provide another way to call 
    $.dom.mallan.extend({
        allow: function(str){
            allow(str, this);
        },
        upperCase: function(){
            upperCase(this);
        },
        lowerCase: function(){
            lowerCase(this);
        },
        defaultValue: function(str, style){
            defaultValue(str, this, style);
        }
    });
	
	$.nameSpace.pack("Mallan.plugin.Inputs",Inputs);
})(Mallan);
