var scrolltotop={
	//startline: ������¹�����100px�����#topcontrol
	//scrollto: ���ֵ����������Ҳ������һ��id��ǡ���Ϊ�������Ϊn�����򻬶�������top��n���ش�����Ϊid��ǣ��򻬶�����id������ڵ�ͬ�ȸߴ�
	//scrollduration:�������ٶ�
	//fadeduration:#topcontrol���div�ĵ��뵭���ٶȣ���һ������Ϊ�����ٶȣ��ڶ�������Ϊ�����ٶ�
	//controlHTML:�������ϻ�����htmlԴ�룬Ĭ��Ϊ<img src="up.png" style="width:48px; height:48px" />���������и�ġ��ô���html����ᱻ����һ��id���Ϊ#topcontrol��div�С�
	//controlattrs:����#topcontrol���div�������½ǵ����ؾ���
	//anchorkeyword:��������id��ǩ
	/*state: isvisible:�Ƿ�#topcontrol���divΪ�ɼ�
			shouldvisible:�Ƿ�#topcontrol���div�ó���
	*/
	
	setting: {startline:100, scrollto: 0, scrollduration:500, fadeduration:[500, 100]},
	controlHTML: '<a href="#top">back-to-top</a>',
	controlattrs: {offsetx:5, offsety:5}, 
	anchorkeyword: '#top', 

	state: {isvisible:false, shouldvisible:false},

	scrollup:function(){
		if (!this.cssfixedsupport) {
			this.$control.css({opacity:0}) 
		};//���������#topcontrol���div
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto);
		if (typeof dest=="string" && jQuery('#'+dest).length==1) { //�����scrollto��ֵ��һ��id��ǵĻ�
			dest=jQuery('#'+dest).offset().top;
		} else { //�����scrollto��ֵ��һ������
			dest=this.setting.scrollto;
		};
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		//���������Ĵ��ڶ���
		var $window=jQuery(window);
		//���#topcontrol���div��x�����
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
		//���#topcontrol���div��y�����
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
		//���Ż�����Ļ���#topcontrol���div�����Ż���
		this.$control.css({left:controlx+'px', top:controly+'px'});
	},

	togglecontrol:function(){
		//��ǰ���ڵĻ�����ĸ߶�
		var scrolltop=jQuery(window).scrollTop();
		if (!this.cssfixedsupport) {
			this.keepfixed();
		};
		//��������startline���������shouldvisibleΪtrue
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false;
		//��shouldvisibleΪtrue����!isvisibleΪtrue
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0]);
			this.state.isvisible=true;
		} //��shouldvisibleΪfalse����isvisibleΪfalse
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1]);
			this.state.isvisible=false;
		}
	},
	
	init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop;
			var iebrws=document.all;
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest; //not IE or IE7+ browsers in standards mode
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
			
			//��#topcontrol���div
			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.attr({title:'Scroll Back to Top'})
				.click(function(){mainobj.scrollup(); return false;})
				.appendTo('body');
				
			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') {//loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({width:mainobj.$control.width()}); //IE6- seems to require an explicit width on a DIV containing text
			};
			
			mainobj.togglecontrol();
			
			//�������
			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup();
				return false;
			});
			
			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol();
			});
		});
	}
};

scrolltotop.init();