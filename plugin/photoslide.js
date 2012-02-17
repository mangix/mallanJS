/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * photoslide.js
 */
//@require dom.element
//@require dom.element.style
//@require events.customevent
//@require animation.animate

(function($,undefined){
	var photoSlide = function(slide,options){
		if(!slide){
			return ;
		}
		this.slide = $($(slide)[0]);
		var _options = {
			autoSwitchTime:0,
			autoLoop:false,
			defaultPage:0,
			fade:false,
			direction: 'horizontal',
			perTime:1,
			fillPages:false,
			onChanged:function(){}
		}
		this._options = $.tools.merge(_options,options);
		this.onChangePage = new $.events.customEvent('pageChange');
		this.onChangePage.on(this._options.onChange);
		this.init();
	}
	photoSlide.prototype = {
		constructor: photoSlide,
		mallantype:'photoslide',
		init:function(){
			var slide = this.slide,option = this._options;
			this.btns = slide.query('.btn');
			this.pre = slide.query('.ps_pre');
			this.next  = slide.query('.ps_next');
			this.picsMove = slide.query('.picsMove');
			this.pics = this.picsMove.children();
			this.key = "";
			if(option.direction==="vertical"){
				this.key = 'margin-top';
				
			}else{
				this.w = (parseInt(this.pics.css('width'))||0) +(parseInt(this.pics.css('margin-left'))||0)+(parseInt(this.pics.css('margin-right'))||0)+(parseInt(this.pics.css('border-left-width'))||0)+(parseInt(this.pics.css('border-right-width'))||0)
				this.picsMove.css('width',this.w*this.pics.length);
				this.key = "margin-left";
				this.picsMove.css('float','left');
			}
			this.changePage(option.defaultPage ||0);
		},
		changePage:function(i){
			var self = this;
			this.picsMove.animate(this.key,(-this.w * i)+"px",500,function(){
				self.onChangePage.fire(i);
				self.selectedPage = i;
			});
		}
	}
})(Mallan);