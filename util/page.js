/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * @page.js
 */
 
(function($, undefined) {
	var page = $.singleton(function() {
        var doc = document, win = window;
        function ___getPageSize() {
            var xScroll, yScroll;
			if(win.innerHeight && win.scrollMaxY) {
				xScroll = win.innerWidth + win.scrollMaxX;
				yScroll = win.innerHeight + win.scrollMaxY;
			}
			else if(doc.body.scrollHeight > doc.body.offsetHeight) {// all but
				// Explorer Mac
				xScroll = doc.body.scrollWidth;
				yScroll = doc.body.scrollHeight;
			}
			else {// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = doc.body.offsetWidth;
				yScroll = doc.body.offsetHeight;
			}
			var winWidth, winHeight;
			if(win.innerHeight) {// all except Explorer
				if(doc.documentElement.clientWidth) {
					winWidth = doc.documentElement.clientWidth;
				}
				else {
					winWidth = win.innerWidth;
				}
				winHeight = win.innerHeight;
			}
			else if(doc.documentElement && doc.documentElement.clientHeight) {//
				// Explorer 6 Strict Mode
				winWidth = doc.documentElement.clientWidth;
				winHeight = doc.documentElement.clientHeight;
			}
			else if(doc.body) {// other Explorers
				winWidth = doc.body.clientWidth;
				winHeight = doc.body.clientHeight;
			}
			// for small pages with total height less then height of the viewport
			if(yScroll < winHeight) {
				pageHeight = winHeight;
			}
			else {
				pageHeight = yScroll;
			}
			// for small pages with total width less then width of the viewport
			if(xScroll < winWidth) {
				pageWidth = xScroll;
			}
			else {
				pageWidth = winWidth;
			}
			return [pageWidth, pageHeight, winWidth, winHeight];

		};

		return {
			height : function() {
				//page height
				return ___getPageSize()[1];
			},
			width : function() {
				//page width
				return ___getPageSize()[0];
			},
			screenHeight : function() {
				//screen height
				return (win.screen || screen).height;
			},
			screenWidth : function() {
				//screen width
				return (win.screen || screen).width;
			},
			windowHeight : function() {
				// window height
				return ___getPageSize()[3];
			},
			windowWidth : function() {
				//window width
				return ___getPageSize()[2];
			},
			scrollX : function(value) {
				if( typeof value === 'number') {
					win.scrollTo(value, doc.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop);
				}
				else {
					return doc.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
				}
			},
			scrollY : function(value) {
				if( typeof value === 'number') {
					win.scrollTo(doc.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft, value);
				}
				else {
					return doc.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
				}
			}
		}
	});

	$.nameSpace.pack("Mallan.util.page", page);
	$.extendCustom({
		name : 'page',
		cls : page,
		constructType : 'single'
	});
})(Mallan);
