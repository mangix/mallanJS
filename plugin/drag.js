/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * drag.js
 */

//@require events.customevent
//@require dom.element
//@require dom.element.style
//@require events.eventbind

(function ($, undefined) {
    var maxZIndex = 1000,
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
            }, el, dragbar;

            //merge the options
            _options = $.tools.merge(_options, options);

            //bind custom events
            events.onActive.on(_options.onActive);
            events.onDrag.on(_options.onDrag);
            events.onComplete.on(_options.onComplete);

            //bind events
            el = $(dom);
            dragbar = $(_options.dragbar);
            

        }
})(Mallan);