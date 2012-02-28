/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * lazyload.js
 */

//@require util.page
//@require dom.element
//@require dom.element.attr
//@require dom.element.offset
//@require events.eventbind

(function ($, undefined) {
    var pager = $.util.page.getInstance(), lazyLoad;

    lazyLoad = function (target) {
        //lazyload images in target
        //@param target:HTMLDomElement or window
        var isWin = (target === undefined || target === window);
        target = target || window;
        var container, unLoad, i, l, img, realUrl, x, y, scrollX, scrollY, winWidth, winHeight, self = this;
        container = $(target);
        unLoad = isWin ? document.images : target.getElementsByTagName('img');
        this.load = function () {
            winWidth = isWin ? pager.windowWidth() : target.clientWidth;
            winHeight = isWin ? pager.windowHeight() : target.clientHeight;
            for (i = 0, l = unLoad.length; i < l; i++) {
                img = $(unLoad[i]);
                realUrl = img.attr('data-lazyload');
                if (!realUrl || img.src === realUrl) {
                    unLoad.splice(i, 1);
                    i--;
                    l--
                } else {
                    x = isWin ? img.offsetLeft() : (img.offsetLeft() - container.offsetLeft());
                    y = isWin ? img.offsetTop() : (img.offsetTop() - container.offsetTop());
                    scrollY = isWin ? pager.scrollY() : target.scrollTop;
                    scrollX = isWin ? pager.scrollX() : target.scrollLeft;
                    if (y >= scrollY && x >= scrollX && y <= scrollY + winHeight && x <= scrollX + winWidth && img.css('display') !== 'none') {
                        img[0].src = realUrl;
                        unLoad.splice(i, 1);
                        i--;
                        l--;
                    }
                }
            }
        };
        container.bind('scroll', function () {
            self.load();
            if (unLoad.length === 0) {
                container.unbind(arguments.callee);
            }
        });
        this.load();
    };


    $.nameSpace.pack('Mallan.plugin.lazyLoad', lazyLoad);
    $.dom.element.extend({
        'lazyLoad':function () {
            this.each(function () {
                if (this._lazyLoad_) {
                    this._lazyLoad_.load();
                } else {
                    this._lazyLoad_ = new lazyLoad(this);
                }
            });
        }
    });
})(Mallan);