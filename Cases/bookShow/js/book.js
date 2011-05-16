$(document).ready(function() {
	
	var perNum = 4;		//ÿҳ��ʾ���鱾��Ŀ
	var currentPage = 1;		//Ĭ����ʾ��һҳ
	var startPos = 0;		//Ĭ�ϴӵ�һ���鿪ʼ��ʾ
	var endPos = 4;			//��ʾ4����
	
	//��xml�л����ݣ�����html���
	$.get('books.xml', function(data){
		
		$('div.inner ul').empty();
		
		var length = $('book', data).length;	
		
		$('book', data).each(function(index) {
			
			var $book = $(this);
			var link = $book.find('href').text();
			var title = $book.find('title').text();
			var author = $book.find('author').text();
			var imageSrc = $book.find('src').text();
			var total = $book.find('total').text();
			var average_rating = $book.find('average_rating').text();
			
			var html = '<li class="book">';
			html += '<a class="info" href="' + link + '">';
			html += '<img src="images/books_info.gif" alt="more info" />';
			html += '</a>';			
			html += '<a class="thumb" href="' + link + '" title="' + title + '">';
			html += '<img src="' + imageSrc + '" alt="' +  title + '" />';
			html += '</a>';
			html += '</li>';
			
			$('#books ul').append($(html));
			
			var bookToolTip = '<div id="books_ToolTip' + index + '" class="books-tooltip">';
			bookToolTip += '<div class="books_pointer_left"></div>';
			bookToolTip += '<div class="books-info">';
			bookToolTip += '<p>' + title + '(by<em>' + author + '</em>)</p>';
			bookToolTip += '<p><img src="images/stars_' + average_rating + '.gif" />(' + total + ')</p>';
			bookToolTip += '</div>';
			bookToolTip += '</div>';
			$('body').append($(bookToolTip));
						
		});
		
		//��ʾÿҳ���鱾
		var show =function(start, end) { 
			
			if(end >= length) {
				end = length;
			}
			
			$('div.showing').empty();
			$('<p>Viewing ' + (start+1) + ' - '+ end + ' of ' + length + '</p>').appendTo($('div.showing'));
		
			$('#books ul li').hide().slice(start, end).fadeIn();
			
			if(currentPage <= 1) {
				$('.prev').fadeOut('fast');
			} else {
				$('.prev').fadeIn('fast');
			}
			if(currentPage >= length / perNum) {
				$('.next').fadeOut('fast');
			} else {
				$('.next').fadeIn('fast');
			}
		};
		show(startPos, endPos);
		
		//��ʾǰһҳ
		$('.prev').click(function() {
			currentPage --;
			startPos = perNum * (currentPage - 1);
			endPos = perNum * currentPage;
			show(startPos, endPos);
		});
		
		//��ʾ��һҳ
		$('.next').click(function() {
			currentPage ++;
			startPos = perNum * (currentPage - 1);
			endPos = perNum * currentPage;
			show(startPos, endPos);
		});
		
		//����ƶ���Infoͼ����ʱ����ʾ�鱾��������Ϣ
		$('.info').css({'opacity': '0.9'}).hover(function() {
			offset = $(this).offset();
			var left = offset.left + 20;
			var top = offset.top + 20;
			$('#books_ToolTip' + $('a.info').index(this)).css({'opacity': '0.7', 'left': left, 'top': top}).fadeIn();
		}, function() {
			$('#books_ToolTip' + $('a.info').index(this)).fadeOut('fast');
		});
		
	});
	
});
