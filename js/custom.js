//global
var winWidth;
var winHeight;
var $container = $('.list-thumbnails');
function checkWidthSize(){
    winWidth = $(window).width();
    winHeight = $(window).height();
}

$(".nav-toggle").click(function() {
	if($(".layer-1").hasClass("active")) {
		setTimeout(function(){
			$("body > .nav, .layer-1, .nav-menu.sub, .layer-2, #content, .nav-toggle").removeClass("active");
			gallery_list();
			isotope();
		}, 100)
	} else {
		$("body > .nav, .layer-1, #content, .nav-toggle").addClass("active");
		gallery_list();
		isotope();
	}
});


$(".nav-menu .dropdown").click(function() {
	if($(".nav-menu.sub, .layer-2").hasClass("active")) {
		$(".nav-menu.sub, .layer-2").removeClass("active");
	} else {
		$(".nav-menu.sub, .layer-2").addClass("active");
	}
});


$(".overlay").click(function() {
	if($(this).hasClass("active")) {
		$(this).removeClass("active");
	} else {	
		$(".overlay").removeClass("active");
		$(this).addClass("active");
	}
}); 


$(".item > .detail i").click(function() {
	if($(this).parent().hasClass("active")) {
		$(this).parent().removeClass("active");
	} else {
		$('.item > .detail').removeClass("active");
		$(this).parent().addClass("active");
	}
});


$('.nav-menu li a').on('touchend', function(e) {
    var el = $(this);
    var link = el.scrollTop('href');
    window.location.hash.substring(1) = link;
});


$(".overlay a.inlink").click(function() {
	setTimeout(function() {
		$('.img-portfolio').isotope();
	}, 100);	
});

$('.panel-heading').click(function() {
	if ($(this).parent().hasClass('active')) {
		$(this).parent().removeClass('active');
	} else {
		$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');
	}
});

function check_device() {
	if (winWidth < 768) {
		$('body').addClass('mobile-device');
		$('.mobile-device .nav-menu li:not(.dropdown)').click(function(){
			$('body > .nav, .layer-1, #content, .nav-toggle').removeClass('active');
		});
	} else if (winWidth > 769) {
		$('body').removeClass('mobile-device');
		$('.nav-menu li:not(.dropdown)').click(function(){
			$('body > .nav, .layer-1, #content, .nav-toggle').addClass('active');
		});
	}
}

$("#content").addClass("active");

function initBackToTop() {
	var backToTop = $('<a>', { id: 'back-to-top', href: '#top' });
	var icon = $('<i>', { 'class': 'fa fa-angle-up' });

	backToTop.appendTo ('body');
	icon.appendTo (backToTop);
	
    backToTop.hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn ();
        } else {
            backToTop.fadeOut ();
        }
    });

    backToTop.click (function (e) {
    	e.preventDefault ();

        $('body, html').animate({
            scrollTop: 0
        }, 600);
    });
}

function pageWidth() {
	if(winWidth > 768) {
		$("body > .nav, .layer-1, #content, .nav-toggle").addClass("active");
	} else if(winWidth < 769) {
		$("body > .nav, .layer-1, .nav-menu.sub, .layer-2, #content, .nav-toggle").removeClass("active");
	}
}

function sectionCheck() {		
	$(window).scroll(function() {
		var winscroll = $(window).scrollTop();
		if (winscroll >= 0) {
			if(winWidth > 768) {
				$(".layer-2.active, .nav-menu.sub.active").removeClass("active");
			}
			$('.section').each(function(i) {
				if ($(this).position().top <= winscroll + 250) {
					$('.layer-1 > .nav-menu > li.active').removeClass('active');
					$('.layer-1 > .nav-menu > li').eq(i).addClass('active');
				}
			});
			if ($('.nav-menu > li').hasClass("fix-active")) {
				$('.nav-menu > li').each(function() {
					$('.nav-menu > li.active').removeClass("active");
				});
			}
		}
	}).scroll();
}

function navScroll() {
	$('.content-section-inner').slimScroll({
		position: 'right',
		height: '100%',
		size: '3px',
		wheelStep: 20
	});
}

$("#form-contact").validate({
	submitHandler: function(form) {
		$.ajax({
			type: "post",
			url: "contact-send.php",
			data: $("#form-contact").serialize(),
			success: function(data) {
				$('#form-contact').html('Edit text "custom.js"');
			}
		})
	}
});

function loadCol() {
	if(winWidth < 991) {
		col = 3
	} else if(winWidth < 1280) {
		col = 4;
	} else {
		col = 5;
	}	
	var data = new Array()
	data["col"] = col;
	return data;
}

function gallery_list() {
	var data = loadCol();
	/*for (var i = 0; i < 3; i++ ) {
		var paras = $('.grid');
		var rand = Math.floor(Math.random() * paras.length);
		paras.eq(rand).attr('data-size', '2');
	}*/
	$('.gallery-list').BlocksIt({
		numOfCol: data['col'],
		offsetX: 0,
		offsetY: 0,
		blockElement: '.grid'
	});
}

$('.gallery-list > li').hoverdir();
$('.gallery-list, .img-portfolio').magnificPopup({
	delegate: 'a',
	type: 'image',
	gallery:{
		enabled:true
	}
});

$("#owl-carousel").owlCarousel({
	autoPlay: 7000,
	pagination: true,
	responsive: true,
	items: 3,
	itemsDesktop: [1280, 3],
	itemsDesktopSmall: [991, 2],
	itemsTablet: [768, 2],
	itemsMobile: [480, 1],
	stopOnHover: true
});

$(".carousel-icon-list").owlCarousel({
	autoPlay: 7000,
	pagination: true,
	responsive: true,
	items: 5,
	itemsDesktop: [1280, 5],
	itemsDesktopSmall: [991, 4],
	itemsTablet: [768, 3],
	itemsMobile: [480, 2],
	stopOnHover: true
});

function loadProgress() {	
	$(".progress").each(function() {
	    $(this).waypoint(function() {
		    $(this).find(".progress-bar").animate({
				width:$(this).attr("data-percent")
			}, 2000);
		}, {
		    triggerOnce: true,
		    offset: "90%"
		});		
	});	
}

function isotope() {
	$container.isotope();
}

$('.list-horizontal a').click(function(){
    $('.list-horizontal > li.active').removeClass('active');
    $(this).parent().parent().addClass('active');

    var selector = $(this).attr('data-filter');
    $container.isotope({
        filter: selector
     });
     return false;
});

function parallax() {
	$('#section-one').parallax("50%", 0.4);
}

function heightFirstSection() {
	$('#section-one').removeAttr('height').css('min-height', winHeight + 'px');
}

$('body > .nav').localScroll(500);
$(window).load(function() {
	$('body').PreLoader({}, function() {
		checkWidthSize();
		pageWidth();
		sectionCheck();
		loadProgress();
		navScroll();
		initBackToTop();
		isotope();
		gallery_list();
		check_device();
		parallax();
		heightFirstSection();
		
		/* Waypoint */
		$(function(){
            function onScrollInit( items, trigger ) {
                items.each( function() {
                var osElement = $(this),
                    osAnimationClass = osElement.attr('data-os-animation'),
                    osAnimationDelay = osElement.attr('data-os-animation-delay');
                  
                    osElement.css({
                        '-webkit-animation-delay':  osAnimationDelay,
                        '-moz-animation-delay':     osAnimationDelay,
                        'animation-delay':          osAnimationDelay
                    });

                    var osTrigger = ( trigger ) ? trigger : osElement;
                    
                    osTrigger.waypoint(function() {
                        osElement.addClass('animated').addClass(osAnimationClass);
                        },{
                            triggerOnce: true,
                            offset: '90%'
                    });
                });
            }

            onScrollInit( $('.os-animation') );
            onScrollInit( $('.staggered-animation'), $('.section') );
		});//]]>
	});
});

$(window).resize(function() {
	checkWidthSize();
	pageWidth();
	gallery_list();
	check_device();
	parallax();
	heightFirstSection();
});