/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * fix.js
 */

//@require dom.element
//@require dom.element.style
//@require util.browser
//@require util.page


(function ($, undefined) {
    var browser = $.util.browser.getInstance(), pager = $.util.page.getInstance(),
        fix = {
            'fix':function (style) {
                //@summary fixed the dom at some postion of the screen
                //@summary when in IE6, set the dom 'absolute' and change the position when window scrolls
                //@param style:Object this param define the top,right,bottom,left postion,use Number
                var self = this;
                self.css('position', 'fixed');
                self.css(style);

                if (browser.isIE6) {
                    //change style 'postion' to 'absolute', move the element when scroll
                    self.css('postion', 'absolute');
                    function move() {
                        var scrollX, scrollY;
                        scrollX = pager.scrollX();
                        scrollY = pager.scrollY();
                        if (style.left !== undefined) {
                            this.css('left', style.left + scrollX);
                        }
                        if (style.right !== undefined) {
                            this.css('right', style.right + scrollX);
                        }
                        if (style.top !== undefined) {
                            this.css('top', style.top + scrollY);
                        }
                        if (style.bottom !== undefined) {
                            this.css('bottom', style.bottom + scrollY);
                        }
                    }

                    move();
                    $(window).bind('scroll', function () {
                        move();
                    });
                }
            }
        }
    $.dom.element.extend(fix);
    $.nameSpace.pack('Mallan.dom.element.fix', fix);
})(Mallan);