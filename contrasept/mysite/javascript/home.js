function Home() {
	
	var totalSliderItems,
		currentSliderItem = 1;
	
    this.init = function(){
    	(function($) {
			self.count();
			self.registerEvents();
    	})(jQuery);
    }
    
    this.registerEvents = function() {
    	(function($) {
    		$('#slider-navigation a').hover(
    			function(){
	    			self.animateNavItem(this,'down');
	    		},
	    		function() {
	    			self.animateNavItem(this,'up');
	    		}
    		);
    		$('.teaser-item a.video').hover(
    			function() {
    				self.animatePlayButton(this,'in');
    			},
    			function() {
    				self.animatePlayButton(this,'out');	
    			}
    		);
    	})(jQuery);
    }
    
    this.animateNavItem = function(ele,direction) {
    	(function($){
    		if(direction == 'down')
    			$(ele).stop().animate({'background-position-y':'0px'},200,"linear");
    		else
    			$(ele).stop().animate({'background-position-y':'-29px'},200,"linear");
    	})(jQuery);
    }
    
    this.animatePlayButton = function(ele,direction) {
    	(function($){
    		if(direction == 'in')
    			$(ele).children('span.play-button-hover').stop(true,true).fadeIn();
    		else
    			$(ele).children('span.play-button-hover').stop(true,true).fadeOut();
    	})(jQuery);
    }
    
    this.count = function() {
    	(function($) {
    		totalSliderItems = $('#slider-items > .slider-item').size();
    		if(totalSliderItems > 0)
    			slideTimeout = setTimeout(function() {self.autoSlider();},10000);
    	})(jQuery);
    }
    
    this.autoSlider = function() {
		(function($) {
			if(currentSliderItem < totalSliderItems)
				self.slideTo(currentSliderItem+1, false)
			else
				self.slideTo(1, false);
    	})(jQuery);
    }
    
    this.slideTo = function(id,click) {
    	(function($){
    		if(id != currentSliderItem) {
    			$('#slider-items').animate({'left':-1215 * (id-1) + 75},500,"easeOutQuad");
    			self.setCurrent(currentSliderItem,id);
    			currentSliderItem = id;
    		}
    		if(click)
    			clearTimeout(slideTimeout);
    		slideTimeout = setTimeout(function() {self.autoSlider();},10000);
    	})(jQuery);
    }

    this.setCurrent = function(old_id,id) {
    	(function($){
    		$('#slider-navigation a#slide-to-'+old_id).removeClass('current');
    		$('#slider-navigation a#slide-to-'+id).addClass('current');
    	})(jQuery);
    }
    
    var self = this;

}

var home = new Home();

(function($) {
	$(window).load(function(){
		home.init();
	});
})(jQuery);