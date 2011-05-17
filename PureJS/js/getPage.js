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
