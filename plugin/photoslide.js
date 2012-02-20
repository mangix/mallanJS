/**
 * @author allanma
 * @mail maqh1988@gmail.com photoslide.js
 */
//@require dom.element
//@require dom.element.style
//@require dom.element.node
//@require events.customevent
//@require events.eventbind
//@require animation.animate
(function($, undefined) {
    var photoSlide = function(slide, options) {
        if (!slide) {
            return;
        }
        this.slide = $($(slide)[0]);
        var _options = {
            autoSwitchTime : 0,
            autoLoop : false,
            defaultPage : 0,
            fade : false,
            direction : 'horizontal',
            perTime : 1,
            fillPages : false,
            onChanged : function() {
            },
            time : 100,
            event : 'mouseover'
        }
        this._options = $.tools.merge(_options, options);
        this.onChangePage = new $.events.customEvent('pageChange');
        this.onChangePage.on(this._options.onChanged);
        this.init();
    }
    photoSlide.prototype = {
        constructor : photoSlide,
        mallantype : 'photoslide',
        init : function() {
            var slide = this.slide, option = this._options, self = this;
            this.btns = slide.query('.btn');
            this.pre = slide.query('.ps_pre');
            this.next = slide.query('.ps_next');
            this.picsMove = slide.query('.picsMove');
            this.pics = this.picsMove.children();
            this.key = "";

            this.pages = Math.ceil(this.pics.length / option.perTime);

            if (option.direction === "vertical") {
                this.w = (parseInt(this.pics.css('height')) || 0) + (parseInt(this.pics.css('margin-top')) || 0) + (parseInt(this.pics.css('margin-bottom')) || 0) + (parseInt(this.pics.css('border-top-width')) || 0) + (parseInt(this.pics.css('border-bottom-width')) || 0);
                this.picsMove.css('height', this.w * this.pics.length + 'px');
                this.key = "margin-top";

            } else {
                this.w = (parseInt(this.pics.css('width')) || 0) + (parseInt(this.pics.css('margin-left')) || 0) + (parseInt(this.pics.css('margin-right')) || 0) + (parseInt(this.pics.css('border-left-width')) || 0) + (parseInt(this.pics.css('border-right-width')) || 0);
                this.picsMove.css('width', this.w * this.pics.length + 'px');
                this.key = "margin-left";
                this.pics.css('float', 'left');
            }
            this.changePage(option.defaultPage || 0);
            this.beginLoop();
            this.pre.bind(option.event, function(e) {
                e.stop();
                self.changePage(self.selectedPage - 1);
            });
            this.next.bind(option.event, function(e) {
                e.stop();
                self.changePage(self.selectedPage + 1);
            });
            this.btns.bind(option.event,function(e,i){
                e.stop();
                self.stopLoop();
                self.changePage(i);
            });
            this.btns.bind('mouseout',function(){
                self.beginLoop();
            });
        },
        changePage : function(i) {
            var self = this;
            i = i % this.pages;
            this.picsMove.animate(this.key, -(this.w * i * this._options.perTime) + "px", this._options.time, function() {
                self.onChangePage.fire(i);
                self.selectedPage = i;
            });
            this.btns.removeClass('now');
            $(this.btns[i]).addClass('now');
        },
        beginLoop : function() {
            var option = this._options,self =this;
            if (option.autoSwitchTime != 0) {
                this.loop = setInterval(function() {
                    self.changePage(self.selectedPage + 1);
                }, option.autoSwitchTime);
            }
        },
        stopLoop:function(){
            clearInterval(this.loop);
        }
    };
    
    $.dom.element.extend({
        'photoSlide':function(option){
            this.each(function(){
                new photoSlide(this,option);
            });
        }
    })
    
    $.nameSpace.pack('Mallan.plugin.photoSlide', photoSlide);
    
    
})(Mallan);