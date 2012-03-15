/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require dom.element
//@require events.keycode
//@require events.event
//@require events.eventbind
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
    //<param>el HTMLDOMElement Or element</param>
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
        mallantype: "inputs",
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
    
    //extend element methods to provide another way to call 
    $.dom.element.extend({
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
	
	$.nameSpace.pack("Mallan.plugin.inputs",Inputs);
    'placeHolder':function (value) {
        var self = this;
        if (this.placeholder === undefined) {
            //不支持placeholder
            this._cache_holder = value;
            var isPassword = this.attr('type') === "password";
            if (isPassword) {
                //替换成增加一个text focus的时候换回原来的password
                var mask = document.createElement('input');
                mask.type = "text";
                mask.className = this.className;
                this.after(mask);
                mask.value = value;
                this.css('display', 'none');
                //绑定事件
                $(mask).addEvent('focus', function () {
                    this.css('display', 'none');
                    self.css('display', '');
                    self.focus();
                });
                this.addEvent('blur', function () {
                    if (this.value === '') {
                        this.css('display', 'none');
                        mask.css('display', '');
                    }
                });
            } else {
                this.value = value;
                this.addEvent('focus',
                    function () {
                        if (this.value === value) {
                            this.value = '';
                        }
                        if (isPassword) {
                        }
                    }).addEvent('blur', function () {
                        if (this.value === '') {
                            this.value = value;
                        }
                    });
            }
        } else {
            this.placeholder = value;
        }
    }
})(Mallan);
