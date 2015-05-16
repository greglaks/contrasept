function GoogleMap (){
	
	var map = null;
	var googleMarker = new Array();
	var googleMarkerWithoutHomeMarker = new Array();
	var ib = new Array();
	var marker = new Array();
	var infowindows = new Array();
	var homeMarker = null;
	var zoomchanged = 0;		
	

	this.init = function(){    
		
		self.getGETParameter();			
		self.initMap();			
	}
	
	this.initMap = function(){
    	(function($) {					   		
    	
    		
    		var myOptions = {
    			zoom: 8,    				
    			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};
    		
    		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);        		
    		
    		$(marker).each(function(i, v) { 
    			if(v){
		    		//if(i>0){    				
	    				var titles = v.title;
		    			//fetch marker with same position and update title	    				
	    				
	    				if(window.location.pathname.search(/addressSearchForm/) != -1){
		    				$(marker).each(function(i2, v2) {
			    				if(i2>0){	    					
				    				if(i2<i){
				    					if(v2){
					    					if(v2.position.toString() == v.position.toString()){		    						
					    						titles += ', '+v2.title;		    						
					    					}
				    					}
				    				}
			    				}
			    			});	
    					}
		    			
		    			var newMarker = new google.maps.Marker({
			      			position: v.position, 
			      			map: map,
							//icon: 'themes/contra-sept/images/maps/google_marker_blue.png',
			      			icon: v.icon,
							draggable: false,
							title: titles,
							//title: v.title,
							id: v.id
						});	
		    			
		    			//googleMarker.push(newMarker);	
		    			
		    			if(v.status != 'homeplacemark'){
		    				//var found=false;
		    				//for(j=0; j<googleMarker.length; j++){		    		
		    				//	if(googleMarker[j].position.toString() == newMarker.position.toString()){		
		    				//		found = true;		    							
		    				//	} 
		    				//}
		    				//if(!found){
		    					//googleMarkerWithoutHomeMarker.push(newMarker);		    		
		    				//}
		    				
		    				googleMarkerWithoutHomeMarker.push(newMarker);		    				
		    				
							google.maps.event.addListener(newMarker, 'mouseover', function() {
								newMarker.setIcon('/themes/contra-sept/images/maps/pin2.png');
							});
							
							google.maps.event.addListener(newMarker, 'mouseout', function() {							
								newMarker.setIcon('/themes/contra-sept/images/maps/pin1.png');
							});
		    			} else {
		    				
		    				var homeMarker = newMarker;
		    				
		    				// Add a Circle overlay to the map.
		    		        var circle = new google.maps.Circle({
		    		          map: map,
		    		          //radius: 3000000 // 3000 km
		    		          radius: v.radius,
		    		          fillColor: '#80B2F7',
		    		          fillOpacity: 0.2,
		    		          strokeColor: '#1F2F77',
		    		          strokeOpacity: 0.4,
		    		          strokeWeight: 1
		    		          
		    		        });

		    		        // Since Circle and Marker both extend MVCObject, you can bind them
		    		        // together using MVCObject's bindTo() method.  Here, we're binding
		    		        // the Circle's center to the Marker's position.
		    		        // http://code.google.com/apis/maps/documentation/v3/reference.html#MVCObject
		    		        circle.bindTo('center', homeMarker, 'position');

		    			}		    			
					   
						var contentString =  
						'<div class="infoboxContent">'+				    
					    '<span class="title">'+ v.title + '</span>' +		   
					    v.infotext +
					    '<div>';		
						
						if(window.location.pathname.search(/addressSearchForm/) != -1){
							$(marker).each(function(i2, v2) {
			    				if(i2>0){	    					
				    				if(i2>0 && i2<i){
				    					if(v2){			    						
					    					if(v2.position.toString() == v.position.toString()){		    						
					    						contentString +=    '<hr><div class="infoboxContent">'+				    
									    						    '<span class="title">'+ v2.title + '</span>' +		   
									    						    v2.infotext +
									    						    '<div>';	
					    						infowindows[i2] = new google.maps.InfoWindow({
					    							content: contentString,	
					    							maxWidth: 400
					    						});
					    					}				    					
				    					}
				    				}
			    				}
			    			});	   	
						}
					    				
						infowindows[i] = new google.maps.InfoWindow({
							content: contentString,	
							maxWidth: 400
						});								
						
						google.maps.event.addListener(newMarker, 'click', function() {
							
							//close all info boxes
							for(j=1; j<infowindows.length; j++){
								if(infowindows[j]) infowindows[j].close();
							}							
							infowindows[i].open(map, newMarker);
						});		
						
						googleMarker.push(newMarker);	
						//infowindows.push(infowindows[i]);						
					//}	 
    			}	    		
    		});
    		var mcOptions = {gridSize: 50, maxZoom: 10};
	 		markerCluster = new MarkerClusterer(map, googleMarkerWithoutHomeMarker, mcOptions);

		 	// google.maps.event.addListener(map, 'zoom_changed', function() {
		 	// });      		
    		
    		self.setCenter();  
    		
    	})(jQuery);
    }
    
    this.setMarker = function(m){
    	(function($) {    		
    		marker = m;		
    		self.initMap();
    	})(jQuery);
    }
    
    this.setCenter = function(){
    	(function($) {
    		
    		var lat_min = 90;
    		var lat_max = -90;
    		var lng_min = 180;
    		var lng_max = -180;
    		countVisible = 0;
    		
    		$(googleMarker).each(function(i, v) { 				
				
		    		if (v.position.lat() < lat_min) lat_min = v.position.lat();		    		
		    		if (v.position.lng() < lng_min) lng_min = v.position.lng();
		    		if (v.position.lat() > lat_max) lat_max = v.position.lat();
		    		if (v.position.lng() > lng_max) lng_max = v.position.lng();
		    		
		    		countVisible++;
    		});    	
    		
    		if(countVisible == 0) {    			
    			
    			//map.setCenter(new google.maps.LatLng(51.082822,10.371094)); //Germany
    			map.setCenter(new google.maps.LatLng(48.154177,11.657867)); //Oberbayern    			
    			//map.setZoom(5);
    			map.setZoom(8);
    			
    		} else if (countVisible == 1) {    			
    			/*map.setCenter(new google.maps.LatLng(
		    				((lat_max + lat_min) / 2.0),
		    				((lng_max + lng_min) / 2.0)
				));*///Germany
    			
    			map.setCenter(new google.maps.LatLng(48.154177,11.657867)); //Oberbayern
				map.setZoom(16);				
			
    		} else {
    			/*
    			//Germany
	   			map.setCenter(new google.maps.LatLng(
		    				((lat_max + lat_min) / 2.0),
		    				((lng_max + lng_min) / 2.0)
				));	   		
				
				if(zoomchanged == 1){
	   				
	   				//Germany
	   				map.fitBounds(new google.maps.LatLngBounds(
					//bottom left
					new google.maps.LatLng(lat_min+1.3, lng_min+1.3),
					//top right
					new google.maps.LatLng(lat_max-1.3, lng_max-1.3)				
					));	
	   				
	   			} else {  		
	   				
	   				map.fitBounds(new google.maps.LatLngBounds(
					//bottom left
					new google.maps.LatLng(lat_min, lng_min),
					//top right
					new google.maps.LatLng(lat_max, lng_max)				
					));	
	   			}
				*/    			
	   			
	   			//Oberbayern	   			  
	   			if(zoomchanged == 1 || window.location.pathname.search(/addressSearchForm/) == -1){	  	   				
	   			
	   				// Start: Oberbayern
		   			map.setCenter(new google.maps.LatLng(48.154177,11.657867));
		   			map.setZoom(8); 	
		   			// End: Oberbayern
	   				
	   			} else {
	   				map.setCenter(new google.maps.LatLng(
		    				((lat_max + lat_min) / 2.0),
		    				((lng_max + lng_min) / 2.0)
	   				));	   		
	   				
	   				map.fitBounds(new google.maps.LatLngBounds(
					//bottom left
					new google.maps.LatLng(lat_min, lng_min),
					//top right
					new google.maps.LatLng(lat_max, lng_max)				
					));	   				
	   			}
	   			
	   			//if(map.getZoom()<9){
	    		//	var markerCluster = new MarkerClusterer(map, googleMarkerWithoutHomeMarker);
	    		//}
				
				
    		}
    	})(jQuery);
	}
    
    this.getGETParameter = function(){
    	// get $_GET['zoomchanged']		
		(function(){			
		    var s = window.location.search.substring(1).split('&');

		    if(!s.length) return;

		    window.$_GET = {};

		    for(var i  = 0; i < s.length; i++) {
		        var parts = s[i].split('=');
		        window.$_GET[unescape(parts[0])] = unescape(parts[1]);
		    }
		    
		    if($_GET['zoomchanged'] == 1){
		    	zoomchanged = 1;
		    }		  
		})(jQuery);    	
    }
    
    this.showInfoWindow = function(id, position){
    	// get $_GET['zoomchanged']		
		(function(){
			var foundPosition = 0;
			//close all info boxes
			for(j=1; j<infowindows.length; j++){
				if(infowindows[j]) infowindows[j].close();
			}			
			//map.setZoom(16);		
			
			for(j=0; j<googleMarker.length; j++){
				if(googleMarker[j].id == id){
					
					map.setCenter(googleMarker[j].position); //Oberbayern		
					map.setZoom(16);	
					
					infowindows[position].open(map, googleMarker[j]);
				}
			}	
			//infowindows[position].open(map, googleMarker[position]);
		
		})(jQuery);    	
    }	
	var self = this;	
}
var googleMap = new GoogleMap();

(function($) {
	$(document).ready(function(){	
		
		googleMap.init();		
	});
})(jQuery);