/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * listitem.js
 */
(function($,undefined){
	var ListItem = function(value){
        this.value = value;
        this.next = null;
    };
	 $.nameSpace.pack("Mallan.util.listItem", ListItem);
})(Mallan);
