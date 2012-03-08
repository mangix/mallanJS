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
                dragbar:dom, //HTMLDOMElement or $.dom.element ,default:dom, which can be draged
                onActive:function () {
                    //called when dom can be draged
                },
                onDrag:function () {
                    //called when dom is moving
                },
                onComplete:function () {
                    //called when drag finished
                }
            }, events = {
                onActive:new $.events.customEvent('onActive'),
                onDrag:new $.events.customEvent('onDrag'),
                onComplete:new $.events.customEvent('onComplete')
            }, el,
                dragbar,
                active = false,
                offsetx,
                offsety,
                targetx,
                targety,
                previewBox,
                doc;

            //merge the options
            _options = $.tools.merge(_options, options);

            //bind custom events
            events.onActive.on(_options.onActive);
            events.onDrag.on(_options.onDrag);
            events.onComplete.on(_options.onComplete);


            el = $(dom);
            dragbar = $(_options.dragbar);
            doc = $(document);

            //bind events
            function move(e) {
                if (!active) {
                    return;
                }
                e.stop();
                targetx = e.pageX - offsetx;
                targety = e.pageY - offsety;
                previewBox.css({
                    'left':targetx + 'px',
                    'top':targety + 'px'
                });
            }

            dragbar.bind('mousedown', function (e) {
                e.stop();
                active = true;
                offsetx = e.pageX - el.offsetLeft();
                offsety = e.pageY - el.offsetTop();
                //create a preview box
                previewBox = $.dom.element.create("div");
                previewBox.css({
                    'border':'solid 2px gray',
                    'position':'absolute',
                    'z-index':++maxZIndex,
                    'width':dom.offsetWidth + "px",
                    'height':dom.offsetHeight + "px",
                    'left':el.offsetLeft() + "px",
                    'top':el.offsetTop() + "px",
                    'cursor':'move'
                });
                $('body').append(previewBox);
                doc.bind('mousemove', move);
                doc.bindOnce('mouseup', function (e) {
                    //finish draging
                    e.stop();
                    doc.unbind(move);
                    el.css({
                        'left':targetx + 'px',
                        'top':targety + 'px',
                        'position':'absolute',
                        'z-index':++maxZIndex
                    });
                    active = false;
                    previewBox.remove();
                    events.onComplete.fire();
                });
                events.onActive.fire();
            });
        };
    $.dom.element.extend({
        'drag':function (options) {
            this.each(function () {
                this._drag_cache_ = this._drag_cache_ || new drag(this, options);
            });
        }
    });
    $.nameSpace.pack("Mallan.plugin.drag", drag);
})(Mallan);