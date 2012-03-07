/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * full.js
 */

//@require dom.element
//@require dom.element.style
//@require util.page
(function ($, undefined) {
    var pager, full;
    pager = $.util.page.getInstance();
    full = {
        'full':function (changeOnResize) {
            //summary change the element to full screen
            //summary usually used to make DIV cover the whole page
            //@param changeOnResize:Bool whether change the element size when window size changes,defualt: true
            var self = this;
            this.css({
                'width':pager.width(),
                'height':pager.height()
            });
            if (changeOnResize !== false) {
                $(window).bind('resize', function () {
                    self.css({
                        'width':pager.width(),
                        'height':pager.height()
                    });
                });
            }
        }
    };

    $.dom.element.extend(full);
    $.nameSpace.pack('Mallan.dom.element.full', full);
})(Mallan);