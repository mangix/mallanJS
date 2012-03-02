/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * @page.js
 */

(function ($, undefined) {
    var page = $.singleton(function () {
        var doc = document, win = window;

        function ___getPageSize() {
            var xScroll, yScroll, winWidth, winHeight, pageHeight, pageWidth, doc = document, win = window;
            xScroll = doc.documentElement.scrollWidth || Math.max(doc.body.scrollHeight, doc.body.offsetWidth);
            yScroll = doc.documentElement.scrollHeight || Math.max(doc.body.scrollHeight, doc.body.offsetWidth);
            winWidth = doc.documentElement.clientWidth || doc.body.clientWidth;
            winHeight = doc.documentElement.clientHeight || doc.body.clientHeight;

            pageHeight = Math.max(yScroll, winHeight);
            pageWidth = Math.max(xScroll, winWidth);
            return [pageWidth, pageHeight, winWidth, winHeight];
        }

        return {
            height:function () {
                //page height
                return ___getPageSize()[1];
            },
            width:function () {
                //page width
                return ___getPageSize()[0];
            },
            screenHeight:function () {
                //screen height
                return (win.screen || screen).height;
            },
            screenWidth:function () {
                //screen width
                return (win.screen || screen).width;
            },
            windowHeight:function () {
                // window height
                return ___getPageSize()[3];
            },
            windowWidth:function () {
                //window width
                return ___getPageSize()[2];
            },
            scrollX:function (value) {
                if (typeof value === 'number') {
                    win.scrollTo(value, win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop);
                }
                else {
                    return win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
                }
            },
            scrollY:function (value) {
                if (typeof value === 'number') {
                    win.scrollTo(win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft, value);
                }
                else {
                    return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
                }
            }
        }
    });

    $.nameSpace.pack("Mallan.util.page", page);
    $.extendCustom({
        name:'page',
        cls:page,
        constructType:'single'
    });
})(Mallan);
