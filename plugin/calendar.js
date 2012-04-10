/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * calendar.js
 */

//@require util.date
//@require util.page
//@require events.customevent
//@require dom.element
//@require dom.element.attribute
//@require dom.element.node
//@require dom.element.style
//@require dom.element.create
//@require events.eventbind
(function ($, undefined) {
    var dater = $.util.date.getInstance(), element = $.dom.element;
    var container, controler, tableDiv, yearPicker, monthPicker, hourPicker, minutePicker, secondPicker, calendarInited, yearBtn, monthBtn, hourBtn, minuteBtn, secondeBtn;

    var Calendar = function (options) {
        this._options = {
            dateField : null,
            monthArr : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            weekArr : ["日", "一", "二", "三", "四", "五", "六"],
            dateFormat : "yyyy-MM-dd hh:mm:ss",
            maxDate : "2050-12-30",
            minDate : "1970-01-01",
            onSelect : function () {
            },
            onShow : function () {
            },
            onHide : function () {
            },
            onChange : function () {
            },
            activeDate : null,
            pos : {},
            activeButton : null
        };
        $.tools.merge(this._options, options);
        this._options.maxDate = dater.parse(this._options.maxDate);
        this._options.minDate = dater.parse(this._options.minDate);

        //selected date
        var now = new Date(), self = this;
        this._date = {
            year : now.getFullYear(),
            month : now.getMonth(),
            day : now.getDate(),
            hour : now.getHours(),
            minute : now.getMinutes(),
            second : now.getSeconds()
        };
        this.event = new $.events.CustomEvent();
//        this.events = {
//            onSelect : new $.events.customEvent("onselect"),
//            onShow : new $.events.customEvent("onshow"),
//            onHide : new $.events.customEvent("onhide"),
//            onChange : new $.events.customEvent("onchange")
//        };

        if (!calendarInited) {
            this.init();
        }
        //bind events
        $(this._options.dateField).bind("click", function (e) {
            e.stop();
            self.show();
        });
        $(this._options.activeButton).bind('click', function (e) {
            e.stop();
            self.show();
        });

        this.event.on('onselect',this._options.onSelect);
        this.event.on('onshow',this._options.onShow);
        this.event.on('onhide',this._options.onHide);
        this.event.on('onchange',this._options.onChange);
    };

    Calendar.prototype = {
        isInRange : function (y, m, d) {
            var date = +new Date(y, m, d),
                min = +(this._options.minDate),
                max = +(this._options.maxDate);
            return (date >= min && date <= max);
        },
        isInActiveDate : function (y, m, d) {
            for (var i = 0, l = this._options.activeDate.length; i < l; i++) {
                if (+dater.parse(this._options.activeDate[i]) == +dater.parse(y, 1 + m, d)) {
                    return true;
                }
            }
            return false;
        },
        appendCalendar : function (year, month) {
            var table, i, l, option;
            option = this._options;
            yearBtn.html(year + "年");
            monthBtn.html(option.monthArr[month]);
            table = document.createElement('table');

            var firstDay = dater.firstDay(year, month + 1),
                lastDay = dater.lastDay(year, month + 1) ,
                weekOfFirstDay = firstDay.getDay(),
                currentRow, self = this, th, td, a , realDate;
            currentRow = table.insertRow(table.rows.length);
            //create days
            for (i = 0; i < 7; i++) {
                th = document.createElement('th');
                th.innerHTML = option.weekArr[i];
                currentRow.appendChild(th);
            }
            for (i = 0, l = weekOfFirstDay + lastDay.getDate(); i < l; i++) {
                realDate = i - weekOfFirstDay + 1;
                if (i % 7 == 0) {
                    currentRow = table.insertRow(table.rows.length);
                }
                td = currentRow.insertCell(currentRow.cells.length);
                if (i < weekOfFirstDay) {
                    td.innerHTML = "";
                    continue;
                }
                a = element.create('<a href="javascript:void(0);">' + realDate + '</a>');
                td.appendChild(a[0]);
                if (this.isInRange(this._date.year, this._date.month, realDate) && (option.activeDate ? this.isInActiveDate(this._date.year, this._date.month, realDate) : true )) {
                    a.bind("click", function (e) {
                        e.stop();
                        self.selectDate(self._date.year, self._date.month + 1, parseInt(this.innerHTML), self._date.hour, self._date.minute, self._date.second);
                        self.hide();
                    });
                }
                else {
                    a.addClass("calendar_disable");
                }
                if (realDate == (this._date.day)) {
                    a.addClass("calendar_selected");
                }
            }
            //补齐最后一行
            for (i = currentRow.cells.length; i < 7; i++) {
                currentRow.insertCell(i);
            }

            tableDiv.html("").append(table);
        },
        init : function () {
            //页面中加载日历html代码
            //日历最外层容器
            container = element.create('<div class="calender_container" style="position:absolute;display:none;"></div>');

            //顶部控制条
            controler = element.create('<div class="calendar_controler"><a href="javascript:void(0);" class="calendar_pre"><</a><a href="javascript:void(0));" class="calendar_year"></a><a href="javascript:void(0));" class="calendar_month"></a><a href="javascript:void(0));" class="calendar_hour" title="小时">0时</a><a href="javascript:void(0);" class="calendar_minute" title="分钟">0分</a><a href="javascript:void(0);" class="calendar_second" title="秒">0秒</a><a href="javascript:void(0);" class="calendar_next">></a><a href="javascript:void(0);" class="calendar_close">X</a></div>');
            container.append(controler);

            //日历table
            tableDiv = element.create('<div class="calendar_datecontainer"></div>');
            container.append(tableDiv);

            //year选择列表
            yearPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(yearPicker);

            //月份选择列表
            monthPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(monthPicker);

            //小时选择列表
            hourPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(hourPicker);

            //分钟选择列表
            minutePicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(minutePicker);

            //秒钟选择列表
            secondPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(minutePicker);

            document.body.appendChild(container[0]);

            //bind events
            container.bind('click', function () {
                yearPicker.hide();
                monthPicker.hide();
                hourPicker.hide();
                minutePicker.hide();
                secondPicker.hide();
            });

            $(document).bind('click', function () {
                container.hide();
            });

            controler.query('.calendar_pre').bind("click", function (e) {
                e.stop();
                Calendar.controler.prevMonth();
            }, this, false);
            controler.query('.calendar_next').bind("click", function (e) {
                e.stop();
                Calendar.controler.nextMonth();
            }, this, false);
            yearBtn = controler.query('.calendar_year');
            yearBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showYearPicker();
            });
            monthBtn = controler.query('.calendar_month');
            monthBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showMonthPicker();
            });
            hourBtn = controler.query('.calendar_hour');
            hourBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showHourPicker();
            });
            minuteBtn = controler.query('.calendar_minute');
            minuteBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showMinutePicker();
            });
            secondeBtn = controler.query('.calendar_second');
            secondeBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showSecondPicker();
            });
            controler.query('.calendar_close').bind("click", function (e) {
                e.stop();
                container.hide();
            });

            yearPicker.bind('click', function (e) {
                e.stop();
                var y = parseInt(e.target.innerHTML),
                    owner = Calendar.controler;
                yearBtn.innerHTML = y;
                owner.set_date(y, owner._date.month, owner._date.day, owner._date.hour, owner._date.minute, owner._date.second);
                owner.appendCalendar(y, owner._date.month);
                yearPicker.hide();
            });

            monthPicker.bind('click', function (e) {
                e.stop();
                var m = e.target.getAttribute('_value'),
                    owner = Calendar.controler;
                monthBtn.innerHTML = owner._options.weekArr[m];
                owner.set_date(owner._date.year, m, owner._date.day, owner._date.hour, owner._date.minute, owner._date.second);
                owner.appendCalendar(owner._date.year, m);
                monthPicker.hide();
            });

            hourPicker.bind('click', function (e) {
                e.stop();
                var h = e.target.innerHTML,
                    owner = Calendar.controler;
                hourBtn.innerHTML = h;
                owner.selectDate(owner._date.year, owner._date.month + 1, owner._date.day, h, owner._date.minute, owner._date.second);
                hourPicker.hide();
            });

            minutePicker.bind('click', function (e) {
                e.stop();
                var m = e.target.innerHTML,
                    owner = Calendar.controler;
                minuteBtn.innerHTML = m;
                owner.selectDate(owner._date.year, owner._date.month + 1, owner._date.day, owner._date.hour, m, owner._date.second);
                minutePicker.hide();
            });
            secondPicker.bind('click', function (e) {
                e.stop();
                var s = e.target.innerHTML,
                    owner = Calendar.controler;
                secondeBtn.innerHTML = s;
                owner.selectDate(owner._date.year, owner._date.month + 1, owner._date.day, owner._date.hour, owner._date.minute, s);
                secondPicker.hide();
            });


            calendarInited = true;
        },
        set_date : function (year, month, day, hour, minute, second) {
            //month 0-11
            var date = this._date;
            date.year = parseInt(year);
            date.month = parseInt(month);
            date.day = parseInt(day);
            hour && (date.hour = parseInt(hour));
            minute && (date.minute = parseInt(minute));
            second && (date.second = parseInt(second));
        },
        show : function () {
            Calendar.controler = this;
            var option = this._options, field = $(option.dateField), df = this._options.dateFormat;
            df.indexOf('ss') == -1 ? (secondeBtn.hide()) : (secondeBtn.show());
            df.indexOf('mm') == -1 ? (minuteBtn.hide()) : (minuteBtn.show());
            df.indexOf('hh') == -1 ? (hourBtn.hide()) : (hourBtn.show());

            if (field[0]) {
                container.css({
                    left : field.offsetLeft()+"px",
                    top : field.offsetBottom()+"px",
                    display : "block",
                    "z-index" : 1000
                });
            }
            else {
                container.css({
                    left : option.pos.x +"px",
                    top : option.pos.y +"px",
                    display : "block",
                    "z-index" : 1000
                });
            }
            this.appendCalendar(this._date.year, this._date.month);
            hourBtn.html(this._date.hour + "时");
            minuteBtn.html(this._date.minute + "分");
            secondeBtn.html(this._date.second + "秒");
            this.event.emit('onshow');
        },
        hide : function () {
            container.hide();
            this.event.emit('onhide');
        },
        selectDate : function (y, m, d, h, mnt, s) {
            var target = $(this._options.dateField),
                date = this.formatDate(y, m, d, h, mnt, s);
            target.val(date);
            this.event.emit('onselect',date);
            this.set_date(y, m - 1, d, h, mnt, s);
        },
        nextMonth : function () {
            var month = this._date.month, year = this._date.year;
            month = month == 11 ? 0 : (month + 1);
            year = month == 0 ? (year + 1) : year;
            if (this.isInRange(year, month, 1)) {
                yearBtn.html(year);
                monthBtn.html(this._options.monthArr[month]);
                this.set_date(year, month, this._date.day, this._date.hour, this._date.minute, this._date.second);
                this.appendCalendar(year, month);
            }
        },
        prevMonth : function () {
            var month = this._date.month, year = this._date.year;
            month = month == 0 ? 11 : (month - 1);
            year = month == 11 ? (year - 1) : year;
            if (this.isInRange(year, month, (new Date(year, month + 1, 0)).getDate())) {
                yearBtn.html(year);
                monthBtn.html(this._options.monthArr[month]);
                this.set_date(year, month, this._date.day, this._date.hour, this._date.minute, this._date.second);
                this.appendCalendar(year, month);
            }
        },
        strToDate : function (dateStr) {
            var d = dateStr.split(/-|\//);
            var a = parseInt(d[0]), b = parseInt(d[1], 10) - 1, c = parseInt(d[2], 10);
            return new Date(a, b, c);
        },
        //接口函数，在constructor之后设置option的值，赞不支持showMiniBtn，minBtnUrl
        set : function (name, value) {
            this._options[name] = value;
            if (name == "minDate" || name == "maxDate") {
                this._options[name] = this.strToDate(value);
            }
            else if (name.indexOf("on") == 0) {
                this.events[name].on(value);
            }
        },
        formatDate : function (y, m, d, h, mnt, s) {
            return dater.format(this._options.dateFormat, new Date(y, m - 1, d, h, mnt, s));
        },
        showYearPicker : function () {
            this.hidePickers();
            var maxYear = this._options.maxDate.getFullYear(),
                minYear = this._options.minDate.getFullYear(),
                i, html = [];
            for (i = minYear; i <= maxYear; i++) {
                html.push('<a href="javascript:void(0);">' + i + '</a>');
            }
            yearPicker.html(html.join(''));
            yearPicker.css({
                "position" : "absolute",
                "display" : "block",
                "left" : yearBtn.offsetLeft(),
                "top" : yearBtn.offsetBottom(),
                "z-index" : (parseInt(container.css("z-index")) + 1)
            });
        },
        showMonthPicker : function () {
            this.hidePickers();
            var self = this, i, html = [];
            monthPicker.html();
            for (i = 0; i <= 11; i++) {
                if (self.isInRange(self._date.year, i, 1)) {
                    html.push('<a href="javascript:void(0);" _value="' + i + '">' + self._options.monthArr[i] + '</a>');
                }
            }
            monthPicker.html(html.join(''));
            monthPicker.css({
                position : "absolute",
                display : "block",
                left : monthBtn.offsetLeft(),
                top : monthBtn.offsetBottom() + 18,
                "z-index" : parseInt(container.css("z-index")) + 1
            });
        },
        showHourPicker : function () {
            this.hidePickers();
            var html = [], i;
            for (i = 0; i <= 23; i++) {
                html.push('<a href="javascript:void(0);">' + (i + 1) + '</a>');
            }
            hourPicker.html(html.join(''));
            hourPicker.css({
                position : "absolute",
                display : "block",
                left : hourPicker.offsetLeft(),
                top : hourPicker.offsetBottom(),
                "z-index" : parseInt(container.css("z-index")) + 1
            });
        },
        showMinutePicker : function () {
            this.hidePickers();
            var html = [], i;
            for (i = 0; i <= 59; i++) {
                html.push('<a href="javascript:void(0);">' + (i + 1) + '</a>');
            }
            minutePicker.html(html.join(''));
            minutePicker.css({
                position : "absolute",
                display : "block",
                left : minuteBtn.offsetLeft(),
                top : minuteBtn.offsetBottom(),
                "z-index" : parseInt(container.css("z-index")) + 1
            });
        },
        showSecondPicker : function () {
            this.hidePickers();
            var html = [], i;
            for (i = 0; i <= 59; i++) {
                html.push('<a href="javascript:void(0);">' + (i + 1) + '</a>');
            }
            secondPicker.html(html.join(''));
            secondPicker.css({
                position : "absolute",
                display : "block",
                left : secondeBtn.offsetLeft(),
                top : secondeBtn.offsetBottom(),
                "z-index" : parseInt(container.css("z-index")) + 1
            });
        },
        getDate : function () {
            return this.formatDate(this._date.year, this._date.month + 1, this._date.day, this._date.hour, this._date.minute, this._date.second);
        },
        hidePickers : function () {
            yearPicker.hide();
            monthPicker.hide();
            hourPicker.hide();
            minutePicker.hide();
            secondPicker.hide();
        }
    };

    $.nameSpace.pack("Mallan.plugin.calendar", Calendar);

})(Mallan);
