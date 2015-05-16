function Main() {
	
    this.init = function(){
    	(function($) {
    		self.registerEvents();
    	})(jQuery);
    }
    
    this.registerEvents = function() {
    	(function($) {
    		$('nav').hover(function() {
    			$('nav > ul > li').hover(function(){self.navigationMouseOver(this);},function(){self.navigationMouseOut(this);});
    		},
    		function() {
    			$('nav ul li.current ul, nav ul li.section ul').fadeIn();
    		});
    		
    		$('input#postal_code').click(function(){
    			$(this).val('');
    		});
    		
    	})(jQuery);
    }
    
    this.navigationMouseOver = function(ele) {
		(function($) {
			if(!$(ele).hasClass('current') || !$(ele).hasClass('section'))
				$('nav > ul > li.current ul, nav > ul > li.section ul').stop(true,true).fadeOut();
			$(ele).not('.current, .section').children('a').attr('title','').stop().animate({'color':'#0C5FA6'},400)
			$(ele).children('ul').stop(true,true).fadeIn();
    	})(jQuery);
    }
    
    this.navigationMouseOut = function(ele) {
		(function($) {
			$(ele).not('.current, .section').children('a').stop().animate({'color':'#fff'},400).parent().children('ul').stop(true,true).fadeOut();
		})(jQuery);
    }
    
    this.scrollTo = function(pos) {
    	(function($){
    		$('html,body').animate({'scrollTop':pos});
    	})(jQuery);
    }
    
    this.redirectToMercedesBenzForm = function() {
    	(function($) {
    		var postalCodeValue = $('input#postal_code').val();
    		if(postalCodeValue)
    			window.open("http://www.mbvd.mercedes-benz.de/haendlersuche/klimaanlagenreinigung/map?postal_code="+$('input#postal_code').val());
    		else 
    			window.open("http://www.mbvd.mercedes-benz.de/haendlersuche/klimaanlagenreinigung/map");
    	})(jQuery);
    }
    
    var self = this;

}

var main = new Main();

(function($) {
	$(window).load(function(){
		main.init();
	});
})(jQuery);