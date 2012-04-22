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
//@require dom.element.offset
//@require events.eventbind
(function ($, undefinded) {
    var dropDownList = function (container, opt) {
        //class dropDownList
        //@param container : HTMLDOMElement
        //@param opt :Object
        if (!container) {
            return;
        }
        this._container = $(container);
        this._options = {
            onChange:function (index, text, value) {
                //callback function when selectedIndex changed
                //@param index:Number selectedIndex
                //@param text:String selectedText
                //@param value:String selectedValue
            },
            defaultSelect:0,
            options:[] // content {text:'',value:''}
        };
        opt = opt || {};
        this.selectedIndex = null;
        this.selectedText = null;
        this.selectedValue = null;
        this.onChange = new $.events.CustomEvent();
        $.tools.merge(this._options, opt);
        this.onChange.on('change',this._options.onChange);
        this.init();
    };
    dropDownList.prototype = {
        init:function () {
            var self = this,
                container, list , i , l , options, item , html = [];
            container = this._container;
            options = this._options.options;
            list = $.element.create('ul');

            //init list
            for (i = 0; i < options.length; i++) {
                item = options[i];
                html.push('<li>' + item.text + '</li>');
            }
            list.html(html.join(''));
            $('body').append(list);
            list.hide();

            //init default value
            this.select(this._options.defaultSelect);

            //bind events
            container.bind('click', function (e) {
                e.stop();
                list.show();
                list.css({
                    'position':'absolute',
                    'left': container.offsetLeft(),
                    'top':container.offsetBottom()
                });
            });

            list.query('li').bind('click', function (e, i) {
                e.stop();
                self.select(i);
                list.hide();
            });

            $(document).bind('click', function () {
                list.hide();
            });

        },
        select:function (i) {
            if (this.selectedIndex === i) {
                return;
            }
            var container = this._container , options = this._options.options , text , value;
            this.selectedIndex = i;
            this.selectedText = text = options[i].text;
            this.selectedValue = value = options[i].value;
            container.html(text);
            this.onChange.fire('change',i, text, value);
        }
    }
})(Mallan);
