(function($) {
	
	var items = new Array(),
		errors = new Array(),
		onComplete = function() {},
		current = 0;
		
	var LoadOptions = {
	 	onetimeLoad: true
	}
	
	//cookie
	var getCookie = function() {
		if( PreLoader.onetimeLoad ) {
			var cookies = document.cookie.split('; ');
			for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
				if ((parts.shift()) === "PreLoader") {
					return (parts.join('='));
				}
			}
			return false;
		} else {
			return false;
		}	
	}
	
	var setCookie = function(expires) {
		if( LoadOptions.onetimeLoad ) {
			var exdate = new Date();
			exdate.setDate( exdate.getDate() + expires );
			var c_value = ((expires==null) ? "" : "expires=" + exdate.toUTCString());
			document.cookie="PreLoader=loaded; " + c_value;
		}
	}
	
	//get all images from css and <img> tag
	var getImages = function(element) {
		$(element).find('*:not(script)').each(function() {
			var url = "";

			if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
				url = $(this).css('background-image');
				if(url.indexOf('url') != -1) {
					var temp = url.match(/url\((.*?)\)/);
					url = temp[1].replace(/\"/g, '');
				}
			} else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
				url = $(this).attr('src');
			}
			
			if (url.length > 0) {
				items.push(url);
			}
		});
	}
		
	//create preloaded image
	var preloading = function() {
		for (var i = 0; i < items.length; i++) {
			if(loadImg(items[i]));
		}
	}
	var loadImg = function(url) {
		var imgLoad = new Image();
		$(imgLoad)
		.load(function() {
			completeLoading();
		})
		.error(function() {
			errors.push($(this).attr('src'));
			completeLoading();
		})
		.attr('src', url);
	}
	
	
	//update progress bar once image loaded
	var completeLoading = function() {
		current++;
		
		//if all images loaded
		if(current >= items.length) {
			current = items.length;
			setCookie();	//create cookie
			
			//fire debug mode
			if (LoadOptions.debugMode) {
				var error = debug();
			}	
			loadComplete();
		}	
	}
	
	//triggered when all images are loaded
	var loadComplete = function() {
		$('#PreLoader').addClass("active");
		if($('#PreLoader').hasClass("active")) {
			setTimeout(function() {
				$('#PreLoader').remove();
			}, 700);
		}
		if($("#PreLoader").length > 0) {
			setTimeout(function() {
				$('.layer-1, #content, .nav-toggle').addClass("active");
				onComplete();
			}, 700);
		}
	}
	
	//debug mode
	var debug = function() {
		if(errors.length > 0) {
			var str = 'ERROR - IMAGE FILES MISSING!!!\n\r'
			str	+= errors.length + ' image files cound not be found. \n\r';	
			str += 'Please check your image paths and filenames:\n\r';
			for (var i = 0; i < errors.length; i++) {
				str += '- ' + errors[i] + '\n\r';
			}
			return true;
		} else {
			return false;
		}
	}
	
	$.fn.PreLoader = function(options, callback) {
        if(options) {
            $.extend(PreLoader, options );
        }
		if(typeof callback == 'function') {
			onComplete = callback;
		}
		
		return this.each(function() {
			if( !(getCookie()) ) {
				getImages(this);
				preloading();
			}
			else {	//onetime load / cookie is set
				onComplete();
			}
		});
    };

})(jQuery);