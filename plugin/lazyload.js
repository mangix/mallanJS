/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * lazyload.js
 */

//@require util.page
//@require dom.element
//@require dom.element.attribute
//@require dom.element.offset
//@require dom.element.style
//@require events.eventbind

(function ($, undefined) {
    var pager = $.util.page.getInstance(), lazyLoad;

    lazyLoad = function (target) {
        //lazyload images in target
        //@param target:HTMLDomElement or window
        var isWin = (target === undefined || target === window);
        target = target || window;
        var container, unLoad, i, l, img, realUrl, x, y, compareX1, compareX2, compareY1, compareY2, winWidth, winHeight, self = this;
        container = $(target);
        unLoad = [].slice.call(isWin ? document.images : target.getElementsByTagName('img'));
        this.load = function () {
            winWidth = pager.windowWidth();
            winHeight = pager.windowHeight();
            for (i = 0, l = unLoad.length; i < l; i++) {
                img = $(unLoad[i]);
                realUrl = img.attr('data-lazyload');
                if (!realUrl || img.attr('src') === realUrl) {
                    unLoad.splice(i, 1);
                    i--;
                    l--;
                } else {
                    x = img.offsetLeft();
                    y = img.offsetTop();
                    if (isWin) {
                        compareX1 = pager.scrollX();
                        compareX2 = compareX1 + winWidth;
                        compareY1 = pager.scrollY();
                        compareY2 = compareY1 + winHeight;
                    } else {
                        compareX1 = container.offsetLeft();
                        compareX2 = compareX1 + container[0].clientWidth;
                        compareY1 = container.offsetTop();
                        compareY2 = compareY1 + container[0].clientHeight;
                    }
                    if (y >= compareY1 && x >= compareX1 && y <= compareY2 && x <= compareX2 && img.css('display') !== 'none') {
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