/*
 * 时间关系，未修复IE6下图像透明的问题。
 */

// currId->当前显示页， clickId->点击页面的标记
var currId = 0, clickId = 0;

$(document).ready(function() {
	
	//修复IE6的：hover
	$('.movList ul li a.playpic').hover(function() {
		$(this).children('em').css({'display': 'block'});
	}, function() {
		$(this).children('em').css({'display': 'none'});
	})
	
	var lenght = $('#div_hp_content ul').size();
	// 获得需滑动的整体对象
	var $box = $('#div_hp_content ul');
	
	if(currId <= 0) {
		currId = 0;
	} else if (currId >= lenght - 1) {
		currId = lenght;
	}
		
	$('.pager-num a').click(function(event) {
		//获得当前点击对象的id值
		var index = $(this).attr('id');
		checkIndex(index);
		
		//判断当前点击页数，若当前点击页数大于当前显示页，向左滑动
		//若当前点击页数小于当前显示页，向右滑动
		//否则不进行任何操作
		if(clickId > currId) {
			$box.eq(currId).animate({'left':'-480px'}, 'slow')
						   .end().eq(clickId).animate({'left':'10px'}, 'slow');
			
		} else if(clickId < currId) {
			$box.eq(currId).animate({'left':'480px'}, 'slow')
						   .end().eq(clickId).animate({'left':'10px'}, 'slow');
			
		} else {
			return false;
		};
		
		//设置当前显示页标记等于点击的页数
		currId = clickId;
		changeSelected();
		
		event.preventDefault();
	});
	
	//上一页
	$('.page-up').click(function(event) {
		if(currId <= 0) {
			return false;
		};
		prev();
		currId--;
		changeSelected();
		
		event.preventDefault();
	});
	//下一页
	$('.page-down').click(function(event) {
		if(currId >= lenght - 1) {
			return false;
		};
		next();
		currId++;
		changeSelected();
		
		event.preventDefault();
	});
		
	//点击页数按钮检查index
	var checkIndex = function(index) {
		switch(index) {
			case 'a_hp_0':
				clickId = 0;
				break;
			case 'a_hp_1':
				clickId = 1;
				break;
			case 'a_hp_2':
				clickId = 2;
				break;
		};
	};
	
	// 上一页
	var prev = function() {
		$box.eq(currId).animate({'left':'480px'}, 'slow')
					   .end().eq(currId - 1).animate({'left':'10px'}, 'slow');
	};
	
	// 下一页
	var next = function() {
		$box.eq(currId).animate({'left':'-480px'}, 'slow')
						.end().eq(currId + 1).animate({'left':'10px'}, 'slow');
	};
	
	//改变当前所选择的页数
	var changeSelected = function() {
		$('.pager-num a').removeClass('currentNum').eq(currId).addClass('currentNum');
	};
});
