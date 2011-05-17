(function($) {
	$.Load = {
		IE6 : ($.browser.msie && $.browser.version == '6.0'),

		getPageScroll : function() {
			return [
				self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft,
				self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
			];
		},

		getPageWidth : function() {
			return self.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth;
		},

		getPageHeight : function() {
			return self.innerHeight ||  (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight;
		},

		/*
		 *	@param boxObj
		 *	@param duration
		 *
		*/
		boxScroll : function(boxObj, duration) {
			boxObj.each(function() {
				var box = $(this);
				var top = box.offset().top - $.Load.getPageScroll()[1] >= 0 ? box.offset().top - $.Load.getPageScroll()[1] : 0;
				$(window).scroll(function (){
					var offsetTop = top + $(window).scrollTop();
					if(duration) {
						box.animate({'top' : offsetTop}, {duration:500, queue:false});
					} else {
						box.css({'top' : offsetTop});
					};
				});
			});
		},

		/*
		 *	@param opacity
		 */
		shadowCreate: function(opacity) {
            var $shadow = $('<div id="shadow"></div>')

            $shadow.appendTo('body').css({
                'background': '#000',
                'position': $.Load.IE6 ? 'absolute' : 'fixed',
                'top': $.Load.IE6 ? $.Load.getPageScroll()[1] : 0,
                'left': $.Load.IE6 ? $.Load.getPageScroll()[0] : 0,
                'width': $.Load.getPageWidth(),
                'height': $.Load.getPageHeight(),
                'opacity': opacity ? opacity : 0
            });

            $.Load.IE6 ? $.Load.boxScroll($shadow) : false;
		},
        
        /*
		 *	@param title
		 *	@param html, html code
		 *	@param callback
		 */
		loadBox: function() {
			
			$.Load.shadowCreate(0.3);
			
			var $LoadBox = $('<div id="LoadBox"><table><tr><td><img src="5.gif"/></td><td>&nbsp;&nbsp;Searching...</td></tr></table></div>');

            var left = ($.Load.getPageWidth() - $LoadBox.outerWidth())/2 + ($.Load.IE6 ? $.Load.getPageScroll()[0] : 0),
                top = ($.Load.getPageHeight() - $LoadBox.outerHeight())/2 + ($.Load.IE6 ? $.Load.getPageScroll()[1] : 0);

			$LoadBox.appendTo('body').css({
				'position': $.Load.IE6 ? 'absolute' : 'fixed',
                'background': '#fff',
                'width': '120px',
                'height': '32px',
                'padding': '10px',
                'text-align': 'center',
                'line-height': '32px',
				'top': top,
				'left': left
			});
            
			$.Load.IE6 ? $.Load.boxScroll($LoadBox) : false;
		},

        loadRomove: function(timer) {
            if(!timer) {
                timer = 500;
            };
            $('#shadow, #LoadBox').fadeOut(timer, function() {
                $(this).remove();
            });
        }
    };
})(jQuery);

jQuery(function($) {
    $.Load.loadBox();

    //$.Load.loadRomove(300);
})