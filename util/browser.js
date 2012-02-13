/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * browser.js
 */
(function($, undefined){
    var init = function(){
        var userAgent = window.navigator.userAgent, result = {}, browsers = ["Opera", "Chrome", "Safari", "Firefox", "MSIE"], browser;
        for (var i = 0, l = browsers.length; i < l; i++) {
            browser = browsers[i];
            if (userAgent.indexOf(browser) > -1) {
                result["is" + browser] = true;
                result.type = browser;
                break;
            }
        }
        if (result.isMSIE) {
            result.isIE = true;
            if (!window.XMLHttpRequest) {
                result.isIE6 = true;
            }
        }
        else {
            if (userAgent.indexOf("WebKit") > -1) {
                result.isWebkit = true;
            }
        }
        result.isQuirks = document.compatMode == "BackCompact";
        return result;
    }, Browser = $.singleton(init);
    $.nameSpace.pack("Mallan.util.browser", Browser);
    $.extendCustom({
        name: "browser",
        cls: Browser,
        constructType: "single"
    })
})(Mallan);
