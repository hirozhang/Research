(function($) {
    $.fn.fixPNG = function() {		//修复IE6PNG图片不透明问题，不支持position、repeat
        if(!($.browser.msie && $.browser.version == '6.0')) {
            return false;
        };
        var _this = this;
        _this.each(function() {
            var $this = $(this),
                image = $this.css('background-image').match(/^url\(["']?(.*\.png)["']?\)$/i),
                bgimg = RegExp.$1;

            if (bgimg) {
                $this.css({
                    'background-image': 'none',
                    'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true", sizingMethod="crop", src="' + bgimg + '")'
                });
            };
        });
    }
})(jQuery);