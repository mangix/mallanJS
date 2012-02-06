/**
 * @author allanma
 * @mail maqh1988@gmail.com
 */
//@require Mallan
(function($,undefined){
	var ListItem = function(value){
        this.value = value;
        this.next = null;
    };
	 $.nameSpace.pack("Mallan.util.ListItem", ListItem);
})(Mallan);
