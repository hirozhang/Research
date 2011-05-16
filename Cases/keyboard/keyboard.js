$(document).ready(function() {
				
	var $writeBox = $('#write'),
		shift = false,
		capslock = false;
		
	$('#keyboard li').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	}).click(function() {
		var $this = $(this),
			charater = $this.html();
		
		// 一键两意
		if($this.hasClass('symbol')) charater = $('span:visible', $this).html();
		
		// Button detele 
		if($this.hasClass('delete')) {
			var html = $writeBox.html();
			$writeBox.html(html.substring(0, html.length-1));
			return false;
		};
		
		// Button tab
		if($this.hasClass('tab')) charater = '\t';
		
		// Button capslock
		if($this.hasClass('capslock')) {
			$('.letter').toggleClass('uppercase');
			capslock = true;
			return false;
		};
		
		// Button enter
		if($this.hasClass('enter')) charater = '\n';
		
		// Button shift
		if($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
			$('.letter').toggleClass('uppercase');
			$('.symbol span').toggle();
			
			shift = (shift === true) ? false : true;
			capslock = false;
			return false;
		};
		
		// Button space
		if($this.hasClass('space')) charater = ' ';
		
		// 转换为大写
		if($this.hasClass('uppercase')) charater = charater.toUpperCase();
		
		// 输出所按的键值
		$writeBox.html($writeBox.html() + charater);
		
	});
	
});