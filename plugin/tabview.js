/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * tabView.js
 */
//@require dom.element
//@require dom.element.style
//@require events.customevent
//@require events.eventbind

<<<<<<< HEAD
(function ($, undefined) {
    var tabView = new function (tabs, contents, options) {
        var _options = {
            event:"mouseover",
            highLightClass:"now",
            onChanged:function () {
            },
            defaultTab:0
        };
        this.options = $.tools.merge(_options, options);
        this.tabs = $(tabs);
        this.contents = $(contents);
        this.onChanged = new $.events.customEvent("onChange");
    };
    tabView.prototype = {
        constructor:tabView,
        init:function () {
            var self = this, option = self.options;
            this.tabs.bind(this.options.event, function (e, i) {
                self.changePage(i);
            });
            this.changeTab(option.defaultTab);
        },
        changeTab:function (i) {
            var cls = this.options.highLightClass;
            this.tabs.removeClass(cls);
            $(this.tabs[i]).addClass(cls);
            this.contents.hide();
            $(this.contents[i]).show();
            this.onChanged.fire(i);
        }
    };
    $.nameSpace.pack("Mallan.plugin.tabView", tabView);

=======
(function($,undefined){
	var tabView = function(tabs,contents,options){
		var _options = {
			event:"mouseover",
			highLightClass:"now",
			onChanged:function(){
			},
			defaultTab:0
		};
		this.options = $.tools.merge(_options,options);
		this.tabs = $(tabs);
		this.contents = $(contents);
		this.onChanged = new $.events.customEvent("onChange");
		var self = this;
		this.tabs.bind(this.options.event,function(e,i){
			e.stop();
			self.changeTab(i);
		});
		this.changeTab(this.options.defaultTab);
	};
	tabView.prototype = {
		constructor:tabView,
		changeTab:function(i){
			var cls = this.options.highLightClass;
			this.tabs.removeClass(cls);
			$(this.tabs[i]).addClass(cls);
			this.contents.hide();
			$(this.contents[i]).show();
			this.onChanged.fire(i);
		}
	}
	$.nameSpace.pack("Mallan.plugin.tabView",tabView);
	
>>>>>>> 58502b368068a835e84a8ede5fcf7c83894b3d7a
})(Mallan);