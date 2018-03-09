(function($){

	var mainHeader = $('.main-header');
	var switcher = $(".switcher-wrapper #mob-nav");
	var sections = $(".section");
	var sectionH = $('.section-h');
	var footerHeight = $('.button-scroll').outerHeight() + $('.main-footer').outerHeight();
	var winH = $(window).height();
    var winW = $(window).width();
	var mainSection = $('.section-main');
	var intro = $('#intro');
	var body = $('body');
	var mainLinks = $('.left-nav li a');
	var mainNav = $("#nav");
	var mainContainer = $("#main-container");
	var leftPanel = $("#nav .nav-inside ");
	var headerHeight = $('.main-header').outerHeight();
	var ON_POP_STATE_SAFARI_BUG_TIME = 100;
	var pageFader = $('.MyPageFaderLayer');
	var eventFired = false;//variable for counter
	var eventStart = false;




	function socialHover() {
		var socialLinks = $('.social-icons a').parent();

		socialLinks.hover(

			function() {
				var that = $(this);
				that.siblings().addClass('fade-me');
			},

			function() {
				var that = $(this);
				that.siblings().removeClass('fade-me');
			}
		);
	}



	var scrollMe = function() {
        var sections = $(".section"),
        	button = $(".button-scroll");
        
        	offset = sections.last().position().top - headerHeight;//position to odległość danej sekcji od góry okna przeglądarki

            //Math.floor zaokrągla wartość w dół np 1.2 będzie się równało 1 Match.ceil w górę
            //(offset - 50) - moge regulowac offset ostatniej sekcji 
            if (Math.floor(offset) - $(window).scrollTop() > 0) {
                button.removeClass('scroll-top');

            }else {
                 button.addClass('scroll-top');
			}
       };

       $(window).on("scroll", scrollMe);



/*MATCHING HEIGHTS PLUGIN*/
var byRow = $('body').hasClass('home');

 $('.row-grid').each(function() {
         $(this).children('.service-grid').matchHeight({
           byRow: byRow
     });
  });



var social = new TimelineMax();

	social.staggerFrom(".social-ico", 0.8, {
        opacity: 0,
        repeat:0,
        left: -100,
        rotation: 180,
        delay: 2.0,
        ease: Back.easeOut
    },
    0.5);



var tween = new TimelineMax();
tween.staggerFrom(".link", 0.6, {
		      opacity: 0,
		      left: -300,
		      delay: 0.7,
		      ease: Back.easeOut		      
		    },
		    0.2);

 // Open navigation on click
	function openNavigation() {
		switcher.off('click').on("click", function(){
			var that = $(this);
			that.toggleClass('open-menu');
			mainNav.toggleClass("show-menu");
			mainContainer.toggleClass("move-canvas");
			

			/*Calling menu and social animation on click*/	
			tween.play(-1);
			social.play(-3);


			if(!$('#mob-nav').hasClass('open-menu')) {
				$.fadePage({
					action: 'fadeout'
					});
				
				return false;
			}

			$.fadePage({
				onclick: function(){
					$.fadePage({
					action: 'fadeout'
				});

					mainNav.removeClass('show-menu');
					mainContainer.removeClass("move-canvas");
					$('#mob-nav').removeClass('open-menu');
	
				}
			});

			$('.switcher').on('click', function(){
				mainNav.removeClass('show-menu');
				mainContainer.removeClass("move-canvas");
				$('#mob-nav').removeClass('open-menu');

				$.fadePage({
					action: 'fadeout'
				});

			});

		});
	}


	


	// Function for scroll down button
	function scrollDown() {
		$(".button-scroll").on("click", function(e){
			e.preventDefault();


			var button = $(this);
			var current = $(".section").filter(".current-section");
			var sections = $("#main-container > .section");
			var offset = null;
			var section = null;

			current.removeClass('current-section');

			sections.each(function(i){
				offset = $(this).position().top - headerHeight;
				if(Math.floor(offset) - $(window).scrollTop() > 0) {
					section = $(this);
					section.addClass("current-section");
					return false;
				}
			});


			if(button.hasClass("scroll-top")) {
				$('html,body').animate({
					scrollTop:0
				}, {
					complete: function() {
						button.removeClass("scroll-top");
						sections.filter(":first").addClass("current-section");
					}
				});
			}

			if(section!==undefined && !button.hasClass("scroll-top")) {
				$(window).off("scroll", scrollMe);//po kliku wyłączam scrollowanie aby było płynne przejście między strzałkami
				$('html,body').animate({
					scrollTop:offset
				}, {
					complete:function(){
						$(window).on("scroll", scrollMe);
					}
				});

				if(sections.index(section) + 1 ===sections.length) {
					button.addClass("scroll-top");
				}
			}
		});
	}


	function findHash() {
		$(mainLinks).filter(function(){
			return $(this).attr("href")===window.location.hash;
		}).trigger("click");
	}


	function homeScroll() {
		var mouseMove = $(window).scrollTop();
		var fullSection = $('#home');
		var intro = $('#intro');
		var translateX = -50 + '%';

		if(mouseMove < 600) {
			fullSection.css('opacity', 1-mouseMove/600);
			intro.css('opacity', 1-mouseMove/400);

			intro.css({
				'-webkit-transform' : 'translateY(' + mouseMove/-5 + '%)',
            	'-ms-transform' : 'translateY(' + mouseMove/-5 + '%)',
            	transform : 'translateY(' + mouseMove/-5 + '%)'
					});
		}
	}

	$.fn.minsectionHeight = function() {
		return this.css("min-height", Math.floor($(window).height() - $('.main-header').outerHeight() - $(".main-footer").outerHeight() + $(".button-scroll").outerHeight()));
	}

	$.fn.sectionHeight = function() {
		return this.css("height", Math.floor($(window).height() - $('.main-header').outerHeight() - $(".main-footer").outerHeight() + $(".button-scroll").outerHeight()));
	}

	$.fn.sectionMinHeight = function() {
		return this.css("min-height", Math.floor($(window).height() - $('.main-header').outerHeight() - $(".main-footer").outerHeight() + $(".button-scroll").outerHeight()));

	}

	$.fn.setNavHeight = function(){
		this.css("height", $(window).height() - $('.main-footer').outerHeight());
		return this;
	};

	/*function contactHeight() {
		$('#contact').css("height", Math.floor($(window).height() - $('.main-header').outerHeight() - $(".main-footer").outerHeight() + $(".button-scroll").outerHeight()));
	}

	contactHeight();*/

	// Min-height for sections
	/*var setMinSectionHeight = function() {
		$('.section-h').each(function(i){
			var that = $(this), 
				winH = $(window).height(),
				headerH = $('.main-header').outerHeight(),
				footerH = $(".main-footer").outerHeight(),
				buttonH = $(".button-scroll").outerHeight();

				that.removeAttr('style');
				that.css("min-height", Math.floor($(window).height() - $('.main-header').outerHeight() - $(".main-footer").outerHeight() + $(".button-scroll").outerHeight()));


		});
	}*/

	$('.footer-content ul a').parent().filter(':first').addClass('active-footer');

	// Scroll between sections plugin
	$.fn.scrollToSection = function() {
		this.first().parent().addClass('current');

		return this.on('click', function(e){
			e.preventDefault();

			var $this = $(this);
			var targetId = $this.attr('href') || $(this).data("sectionLink");
			if(!targetId) return;
			var target = $(targetId);
			var offset = target.offset().top - $('.main-header').outerHeight();

			if(target.attr("id")==="home") offset = 0;


			$('html, body')
				.stop()
				.animate({

					scrollTop:offset

				}, {
					duration:800,
					easing: "easeInOutExpo"
				});

				/*if (typeof history.pushState !== "undefined") {
				 	var id = target.attr('id');
				 	history.pushState({id: id}, '', "#" + id);
				 }*/

				$(this).parent().siblings(".current").removeClass("current");
            	$(this).parent().addClass("current");

		});

	};
	

	$(function(){
		openNavigation();
		findHash();
		mainLinks.scrollToSection();
		$('.footer-content ul a').scrollToSection();
		$('[data-section-link]').scrollToSection();
		scrollDown();
		socialHover();

		

		setTimeout(function(){

			$('.inner-section').flexVerticalCenter({ cssAttribute: 'margin-top', verticalOffset: '-10px' });

		},100);

		var byRow = $('body').hasClass('home');

 			$('.content-row').each(function() {
         		$(this).children('.block-w').matchHeight({
           		byRow: byRow
     		});
  		});

 			/*$('.block-w').matchHeight({
        		target: $('.block-w.contact-block')
    		});*/


 			/*function contactBlockH() {
			
			if(winW > 992) {
				var blockH = winH - 266;
				$('.block-w').css('height', blockH + "px");
			}else {
				$('.block-w').css('height',"initial");
			}
		}

		contactBlockH();*/

		

		// Hammer options
		var options = {
	  		dragLockToAxis: true,
	  		dragBlockHorizontal: true
		};


		// Enable hammer text selection
		delete Hammer.defaults.cssProps.userSelect;

		var hammertime = new Hammer(document.querySelector('body'));

		hammertime.on('swiperight', function(ev) {
			$('#mob-nav').toggleClass('open-menu');
			mainNav.toggleClass("show-menu");
			mainContainer.toggleClass("move-canvas");
			tweenNav();
			socialTween();


			$('.switcher').on('click', function(){
				mainNav.removeClass('show-menu');
				mainContainer.removeClass("move-canvas");
				$('#mob-nav').removeClass('open-menu');

				$.fadePage({
					action: 'fadeout'
				});

			});

				$.fadePage({
				onclick: function(){
					$.fadePage({
					action: 'fadeout'
				});

					mainNav.removeClass('show-menu');
					mainContainer.removeClass("move-canvas");
					$('#mob-nav').removeClass('open-menu');
	
				}
			});
		});

		hammertime.on('swipeleft', function(ev) {
			mainNav.removeClass('show-menu');
				mainContainer.removeClass("move-canvas");
				$('#mob-nav').removeClass('open-menu');

				$.fadePage({
					action: 'fadeout'
				});
		});



		// Adding viewportchecker plugin to init svg animation
       $('*[data-draw]').addClass('no-animation').each(function(){

       		$(this).viewportChecker({
       			classToAdd: 'do-animation' + $(this).data('draw'),
       			classToRemove: 'no-animation',
       			offset: '30%'
       		});

       });

			
     // Calling function which draws svg icons according to the plugin
      function svg__idea() {
        new DrawFillSVG({
            elementId: "ico-1"
        	})
    	}


    	function svg__design() {
        new DrawFillSVG({
            elementId: "icon-2"
        	})
    	}


    	function svg__responsive() {
        new DrawFillSVG({
            elementId: "icon-3"
        	})
    	}


    	function svg__technology() {
        new DrawFillSVG({
            elementId: "icon-4"
        	})
    	}


    //Functions for headers and text animations
    function ideaBox() {
    	$('.sklill-header').delay(0).animate({
    		opacity:1,
    		marginTop:"0px"
    	},500);

    	$('.text-skills').delay(200).animate({
    		opacity:1,
    		marginTop:"0px"
    	},700)
    }


    function designBox() {
    	$('.design-header').delay(0).animate({
    		opacity:1,
    		marginTop:"0px"
    	},500);

    	$('.text-design').delay(200).animate({
    		opacity:1,
    		marginTop:"0px"
    	},700)
    }


    function responsiveBox() {
    	$('.responsive-header').delay(0).animate({
    		opacity:1,
    		marginTop:"0px"
    	},500);

    	$('.text-responsive').delay(200).animate({
    		opacity:1,
    		marginTop:"0px"
    	},700)
    }


    function technologyBox() {
    	$('.technology-header').delay(0).animate({
    		opacity:1,
    		marginTop:"0px"
    	},500);

    	$('.text-technology').delay(200).animate({
    		opacity:1,
    		marginTop:"0px"
    	},700)
    }

    function mobileTop() {
    	var winPos = $(window).scrollTop();
    	var windowHeight = $(window).height();
    	var scrollBottom = winPos + windowHeight;
    	var mobileHeight = $('.mobile-wrapper').outerHeight();
    	var mobileOffset = $('.mobile-wrapper').offset().top;

    	if((scrollBottom - mobileHeight) >  mobileOffset) {
    		$('.mobile-inner').addClass('start-counting');
    	}
    }

   
    // Start function in view plugin
    $('.row-grid').one('inview', function (event, visible, topOrBottomOrBoth) {
    	if (visible == true) {
    		
    			setTimeout(svg__idea, 1500);
  				setTimeout(svg__design, 2000);
  				setTimeout(ideaBox, 3000);
  				setTimeout(designBox, 4000);
  				//setTimeout(svg__responsive, 1000);
  				//setTimeout(svg__technology, 1500);
    	}
    });

    $('.row-grid-second').one('inview', function (event, visible, topOrBottomOrBoth) {
    	if (visible == true) {
    		
    			//setTimeout(svg__idea, 500);
  				//setTimeout(svg__design, 600);
  				setTimeout(svg__responsive, 3000);
  				setTimeout(svg__technology, 4000);
  				setTimeout(responsiveBox, 5000);
  				setTimeout(technologyBox, 6000);
    	}
    });   

}); // End of document ready

	

	$(window).on('scroll', function(){

			var HEADER_SCROLL = 30;
			var winPos = $(window).scrollTop();
    		var windowHeight = $(window).height();
    		var scrollBottom = winPos + windowHeight;
    		var mobileHeight = $('.mobile-wrapper').outerHeight();
    		var mobileOffset = $('.mobile-wrapper').offset().top;
    		var chartOffset = $('.skill-chart').offset().top;
    		var rowMHeight = $('.row-header').outerHeight();
    		var rowDHeight = $('.row-description').outerHeight();
    		var scrollPi = $(window).scrollTop() % Math.PI;

    		
    		$('.cog1').css({ transform: 'rotate(' + scrollPi + 'rad)' });
    		$('.cog2').css({ transform: 'rotate(-' + scrollPi + 'rad)' });

    		var rowHeight = rowMHeight + rowDHeight;
    		var offsetTop = 200;

		if($(window).scrollTop() > HEADER_SCROLL) {
			mainHeader.addClass('animate-header');
		}else {
			mainHeader.removeClass('animate-header');
		}

		function chartTop() {
			if((scrollBottom - rowHeight) > chartOffset) {
				$('.skill-chart').addClass('show-chart');
			}
		}

		 function mobileTop() {

	    	if((scrollBottom - mobileHeight + 250) >  mobileOffset) {
	    		$('.mobile-wrapper').addClass('start-counting');
	    	}
    	}

		mobileTop();
		chartTop();

		if($('.skill-chart').hasClass('show-chart')) {

			 $('.progress-bar').each(function(){

			 	$(this).find('.css-bar').delay(0).animate({
			 		height:$('.css-bar').attr('data-percent')
			 	},1000)


			 	$(this).find('.js-bar').delay(500).animate({
			 		height:$('.js-bar').attr('data-percent')
			 	},1000)

			 	$(this).find('.less-bar').delay(1000).animate({
			 		height:$('.less-bar').attr('data-percent')
			 	},1000)

			 	$(this).find('.photo-bar').delay(1500).animate({
			 		height:$('.photo-bar').attr('data-percent')
			 	},1000)

			 	$(this).find('.boot-bar').delay(2000).animate({
			 		height:$('.boot-bar').attr('data-percent')
			 	},1000)

			 	$(this).find('.word-bar').delay(2500).animate({
			 		height:$('.word-bar').attr('data-percent')
			 	},1000)


			 }); 

		}


		 if ($('.mobile-wrapper').hasClass('start-counting') && eventFired === false) {
            eventFired = true;
            $('.timer').countTo();
        }


         if ($('.skill-chart').hasClass('show-chart') && eventStart === false) {
            eventStart = true;
            $('.percent-loaded').countTo();

            $('.percent-wrapper').stop(true).animate({
			 	opacity:1
			 },1000);

            $('.skill-desc p').delay(500).animate({
				opacity:1
            },1500);
        }


        //Parallax functionality for elements
        function parallaxShape() {
        	if($(window).width() > 1168) {
        	var hT = $('#portfolio').offset().top,
        		hH = $('#portfolio').outerHeight(),
        		wH = $(window).height(),
        		wS = $(this).scrollTop(),
        		ratio = wS - (hT + hH - wH),
        		main = wH - ratio + 100,
        		left_1 = -main * .5,
        		left_2 = -main * .8,
        		right_1 = -main * .5,
        		right_2 = -main * .9;

	        	if (left_1 > -900) {
	                $(".left-shape-1").css({
	                    "-webkit-transform": "translateY(" + left_1 + "px)",
	                    "-moz-transform": "translateY(" + left_1 + "px)",
	                    "-o-transform": "translateY(" + left_1 + "px)",
	                    transform: "translateY(" + left_1 + "px)"
	                });
            	}

            	if (left_2 > -800) {
                	$(".left-shape-2").css({
                    	"-webkit-transform": "translateY(" + left_2 + "px)",
                    	"-moz-transform": "translateY(" + left_2 + "px)",
                    	"-o-transform": "translateY(" + left_2 + "px)",
                    	transform: "translateY(" + left_2 + "px)"
                	})
            	}

            	if (right_1 > -1000) {
	                $(".right-shape-4").css({
	                    "-webkit-transform": "translateY(" + right_1 + "px)",
	                    "-moz-transform": "translateY(" + right_1 + "px)",
	                    "-o-transform": "translateY(" + right_1 + "px)",
	                    transform: "translateY(" + right_1 + "px)"
	                })
            	}

            	if (right_2 > -950) {
	                $(".right-shape-3").css({
	                    "-webkit-transform": "translateY(" + right_2 + "px)",
	                    "-moz-transform": "translateY(" + right_2 + "px)",
	                    "-o-transform": "translateY(" + right_2 + "px)",
	                    transform: "translateY(" + right_2 + "px)"
	                })
            	}
        	}
        }



		homeScroll();
		parallaxShape();

		// Add active section to each on scroll
		$('.section').each(function(i) {
			offset = $(this).offset().top - headerHeight;
			if(Math.floor(offset) - $(window).scrollTop() <= 0) {
				var current = $(".section").filter(".current-section");
				current.removeClass("current-section");
				sections = $(this);
				sections.addClass("current-section");
			}
		});



		/*ADDING #id TO EACH SECTION ON SCROLL*/
		setTimeout(function () {
           
  			if (typeof history.pushState !== "undefined") {
				var id = $(".section").filter(".current-section").attr("id");
			history.pushState({id: id}, '', "#" + id);
		}

        }, ON_POP_STATE_SAFARI_BUG_TIME);


     // Highlight main navigation links on scroll.
		$('.section').each(function(index){
			var that = $(this),
			offset = $(this).position().top - headerHeight;
			

			if(Math.floor(offset) - $(window).scrollTop() <= 0) {
				$('.left-nav li').siblings().removeClass('current');
				$(".left-nav li").eq(index).addClass('current');
				$('.left-nav ul li').siblings().removeClass('active-footer');
				$('.left-nav ul li').eq(index).addClass('active-footer');
			}
		});
	}); // End of on scroll

	
	sectionH.sectionMinHeight();
	mainSection.minsectionHeight();
	mainSection.sectionHeight();
	

	//$('.section').not('.section-portfolio').sectionMinHeight();

	leftPanel.setNavHeight();
	mainLinks.scrollToSection();
	$('[data-section-link]').scrollToSection();

	$(window).on('load', function(){
		body.addClass('loaded');
		$('.loaded')
			.append('<div class="loader"></div>');
		setTimeout(function(){

			$(".loader").fadeOut("medium", function(){
				$(".loader").remove();
			});

		}, 400);

		findHash();
		leftPanel.setNavHeight();

	});

	$(window).on('resize', function(){
		

		setTimeout(function(){

			$('.inner-section').flexVerticalCenter({ cssAttribute: 'margin-top', verticalOffset: '-10px' });

		},100);


		sectionH.sectionMinHeight();
		mainSection.minsectionHeight();
		mainSection.sectionHeight();
		leftPanel.setNavHeight();

		//setMinSectionHeight();
		//$('.section').not('.section-portfolio').sectionMinHeight();
		$(".MyPageFaderLayer").width($(document).width()).height($(document).height());
	});

})(jQuery);
