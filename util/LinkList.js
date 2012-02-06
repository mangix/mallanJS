/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require Mallan
//@require Mallan.util.ListItem
(function($, undefined){
    var LinkList = function(){
        this._length = 0;
        this.header = new ListItem();
    };
    LinkList.prototype = {
        constructor: LinkList,
        length: function(){
            return this._length;
        },
        add: function(el, index){
            if (!(el instanceof ListItem)) {
                throw "the first param must be an instance of ListItem";
            }
            if (index === undefined || index >= this._length) {
                //insert at the last
                this.get(this._length - 1).next = el;
                this._length++;
            }
            else {
                el.next = this.get(index);
                this.get(index - 1).next = el;
                this._length++;
            }
            
        },
        remove: function(indexOrObj){
            var prev = this.header, item = prev, i = 0;
            while (item = item.next) {
                if (i == indexOrObj || item === indexOrObj) {
                    prev.next = item.next;
                    this._length--;
                    return;
                }
                i++;
                prev = item;
            }
        },
        get: function(index){
            var item = this.header, i = -1;
            while (item) {
                if (i == index) {
                    return item;
                }
                i++;
                item = item.next;
            }
            return null;
        },
        clear: function(){
            this._length = 0;
            this.header.next = null;
        },
        toArray: function(){
            var arr = [], item = this.header;
            while (item = item.next) {
                arr.push(item.value);
            }
			return arr;
        }
    };
    $.nameSpace.pack("Mallan.util.LinkList", LinkList);
   
})(Mallan);
