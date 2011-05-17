;(function($) {
    $.fn.popbox = function(title, html, config, callback) {
        var options = {
            scrollSpeed : '500',
            fadeSpeed: '500',
            opacity : '0.3',
            width : '400px',
            backgroundColor : '#fff',
            titleShow : 'true',
            borderWidth : 8
        };
        $.extend(options, config);
        _t.config = options;

        _t.shadow.create(options.opacity);

        var $borderbox = $('<div id="borderbox"></div>'),
            $popbox = $('<div id="popbox" class="popbox"></div>'),
            ie6 = _t.IE6;
        _t.popbox = $popbox;
        
        $popbox.appendTo('body').css({
            'position': ie6 ? 'absolute' : 'fixed',
            'z-index': '10000',
            'background-color': options.backgroundColor,
            'width': options.width
        });
        if(options.titleShow) {
            $popbox.append('<h3><span>'+ title +'</span><a href="#close_box" class="closePB">Close</a></h3>');
        };

        $popbox.append('<div id="box_con">'+ html +'</div>');

        var outerW = $popbox.outerWidth(),
            outerH = $popbox.outerHeight(),
            w = _t.page.width(),
            h = _t.page.height(),
            sTop = _t.page.sTop(),
            sLeft = _t.page.sLeft();
        $popbox.css({
                    'top': (h - outerH)/2 + (ie6 ? sTop : 0),
                    'left': (w - outerW)/2 + (ie6 ? sLeft : 0)
                });

        $borderbox.appendTo('body').css({
            'position': ie6 ? 'absolute' : 'fixed',
            'z-index': '9999',
            'background-color': '#000',
            'width': outerW + options.borderWidth*2,
            'height': outerH + options.borderWidth*2,
            'top': (h - outerH - options.borderWidth*2)/2 + (ie6 ? sTop : 0),
            'left': (w - outerW - options.borderWidth*2)/2 + (ie6 ? sLeft : 0),
            'opacity' : '0.4',
            '-moz-border-radius' : '5px',
            '-webkit-border-radius' : '5px'
        });

        ie6 ? _t.boxScroll($popbox) : false;
        ie6 ? _t.boxScroll($borderbox) : false;

        $('.closePB', $popbox).bind('click', function(e) {
            e.preventDefault();
            $popbox.fadeOut(options.fadeSpeed, function() {
                $(this).remove();
            });
            $borderbox.fadeOut(options.fadeSpeed, function() {
                $(this).remove();
            });
            _t.shadow.close(options.fadeSpeed);
            
            if(callback) callback();
        });
    };

	_t = {
        win : $(window),
		IE6 : ($.browser.msie && $.browser.version == '6.0'),
        config : {},

        page : {
            sTop : function() {
                        return _t.win.scrollTop();
                    },
            sLeft : function() {
                        return _t.win.scrollLeft();
                    },
            width : function() {
                        return _t.win.width();
                    },
            height : function() {
                        return _t.win.height();
                    }
        },

		boxScroll : function(box, duration) {
            var sTop = _t.page.sTop(),
                top = box.offset().top;
            top -= sTop;
            top = top >= 0 ? top : 0;
            
            _t.win.scroll(function (){
                var offsetTop = top + _t.page.sTop();
                if(duration) {
                    box.animate({'top' : offsetTop}, _t.config.scrollSpeed);
                } else {
                    box.css({'top' : offsetTop});
                };
            });
		},

        popbox : null,

		shadow : {
            mask : null,
			create : function(opacity) {
				var $shadow = $('<div id="shadow"></div>'),
                    ie6 = _t.IE6,
                    page = _t.page;

                _t.shadow.mask = $shadow;

				$shadow.appendTo('body').css({
					'background': '#000',
					'position': ie6 ? 'absolute' : 'fixed',
                    'z-index': '9998',
					'top': ie6 ? page.sTop() : 0,
					'left': ie6 ? page.sLeft() : 0,
					'width': page.width(),
					'height': page.height(),
					'opacity': opacity ? opacity : 0
				});

				ie6 ? _t.boxScroll($shadow) : false;

				$shadow.click(function() {
					$('.closePB', _t.popbox).trigger('click');
				});
			},

			close : function(timer) {
				if(!timer) {
					timer = _t.config.fadeSpeed;
				};
				_t.shadow.mask.fadeOut(timer, function() {
					$(this).remove();
				});
			}
		}
	};

	$(window).resize(function() {
		if(_t.shadow.mask.is(':visible')) {
            var $popbox = _t.popbox,
                outerW = $popbox.outerWidth(),
                outerH = $popbox.outerHeight(),
                w = _t.page.width(),
                h = _t.page.height(),
                sLeft = _t.page.sLeft(),
                sTop = _t.page.sTop(),
                ie6 = _t.IE6;
            
			_t.shadow.mask.css({
				'width': w,
				'height': h
			});

			$popbox.css({
				'top': h >= outerH ? (h - outerH)/2 + (ie6 ? sTop : 0) : (ie6 ? sTop : 0),
				'left': w >= outerW ? (w - outerW)/2 + (ie6 ? sLeft : 0) : (ie6 ? sLeft : 0)
			});
		};
	});
})(jQuery);