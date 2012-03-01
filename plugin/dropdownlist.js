/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * dropdownlist.js
 */

//@require events.customevent
//@require dom.element
//@require dom.element.attribute
//@require dom.element.node
//@require dom.element.style
//@require dom.element.create
//@require events.eventbind
(function ($, undefinded) {
    var dropDownList = function (container, opt) {
        //class dropDownList
        //@param container : HTMLDOMElement
        //@param opt :Object
        if (!container) {
            return;
        }
        this._container = container;
        this._options = {
            onChange:function () {
            },
            selectedIndex:0,
            options:[] // content {text:'',value:''}
        };
        opt = opt || {};
        $.tools.merge(this._options, opt);
        this.init();
    };
    dropDownList.prototype = {
        init:function () {
            var container, list , i , l , options, item , html = [];
            container = this._container;
            options = this._options.options;
            list = $.element.create('ul');
            //init the options
            for (i = 0; i < options.length; i++) {
                item = options[i];
                html.push('<li>' + item.text + '</li>');
            }
            list.html(html.join(''));
            //init default value

            //加入到container
            this._container.append(select).append(ul);
            //事件绑定
            select.addEvent("click", function () {
            });
        }
    }
})(Mallan);
