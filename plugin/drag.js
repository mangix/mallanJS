/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * drag.js
 */

//@require events.customevent
//@require dom.element
//@require dom.element.style
//@require events.eventbind
//@require dom.element.offset
//@require dom.element.create
//@require dom.element.node

(function ($, undefined) {
    var maxZIndex = 10000,
        drag = function (dom, options) {
            //@summary drag the element
            //@param dom:HTMLDOMElement
            //@param options:Object
            var _options = {
                dragbar : dom, //HTMLDOMElement or $.dom.element ,default:dom, which can be draged
                onActive : function () {
                    //called when dom can be draged
                },
                onDrag : function () {
                    //called when dom is moving
                },
                onComplete : function () {
                    //called when drag finished
                }
            }, events = {
                onActive : new $.events.customEvent('onActive'),
                onDrag : new $.events.customEvent('onDrag'),
                onComplete : new $.events.customEvent('onComplete')
            }, el,
                dragbar,
                active = false,
                offsetx,
                offsety,
                targetx,
                targety,
                previewBox;

            //merge the options
            _options = $.tools.merge(_options, options);

            //bind custom events
            events.onActive.on(_options.onActive);
            events.onDrag.on(_options.onDrag);
            events.onComplete.on(_options.onComplete);

            //bind events
            el = $(dom);
            dragbar = $(_options.dragbar);
            dragbar.bind('keydown', function (e) {
                active = true;
                offsetx = e.pageX -  el.offsetLeft();
                offsety = e.pageY - el.offsetTop();
                //create a preview box
                previewBox = $.dom.element.create("div");
                previewBox.css({
                    'border' : 'solid 1px gray',
                    'position' : 'absolute',
                    'z-index' : ++maxZIndex,
                    'width' : dom.offsetWidth,
                    'height' : dom.offsetHeight,
                    'left' : el.offsetLeft(),
                    'top' : el.offsetTop()
                });
                $('body').append(previewBox);

                events.onActive.fire();
            }).bind('keyup',function(e){
                //finish draging
                el.css({
                    'left':targetx,
                    'top':targety,
                    'position':'absolute',
                    'z-index':++maxZIndex
                });
                previewBox.remove();
                active = false;

                events.onComplete.fire();
            }).bind('mousemove',function(e){
                if(!active){
                    return;
                }
                targetx = e.pageX - offsetx;
                targety = e.pageY - offsety;
                previewBox.css({
                    'left': targetx +'px',
                    'top': targety +'px'
                });
            });
        };
    $.dom.element.extend({
        'drag':function(options){
            this.each(function(){
                this._drag_cache_ = this._drag_cache_ || new drag(this,options);
            });
        }
    })
    $.nameSpace.pack("Mallan.plugin.drag",drag);
})(Mallan);