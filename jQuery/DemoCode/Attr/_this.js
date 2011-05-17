
console.log('out');
jQuery(function($) {
console.log('in');
	$("<div />", {
		"class" : "sticky",
		'id' : 'data_id'
	 })
	.prepend($("<div />", { "class" : "sticky-header"} )
		.append($("<span />", {
			"class" : "status-sticky",
			text : "trash1",
			click : function() {}
		}))
		.append($("<span />", {
			"class" : "close-sticky",
			text : "trash2",
			click : function () {}
		}))
	)
	.append($("<div />", {
		html : 'data_text',
		contentEditable : true,
		"class" : "sticky-content",
		keypress : function () {}
	}))
	.appendTo(document.body);
});