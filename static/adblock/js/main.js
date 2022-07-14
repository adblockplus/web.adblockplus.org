// general functionality

jQuery(function($){

	$(document).ready( function() {
		var viewportHeight = document.documentElement.clientHeight;
		//console.log('viewportHeight: '+viewportHeight);
		var bodyPadding = parseInt($('body').css('padding-top'));
		//console.log('bodyPadding: '+bodyPadding);
		
		var banner = $('.banner');
		var bannerHeight = banner.outerHeight();
		//console.log('bannerHeight: '+bannerHeight);

		//var bannerPosition = banner.position();
		//var bannerOffset = parseInt($("body").css('padding-top'));//bannerPosition.top;
		//console.log('bannerOffset: '+bannerOffset);

		var feature = $(".feature:first");
		var featureHeight = feature.height();
		//console.log('featureHeight: '+featureHeight);

		var minWhiteSpace = 40;
		//console.log('minwhispace: '+minWhiteSpace);

		var superlative = $(".superlative");

		var superText = superlative.outerHeight(true);
		//console.log('sprlativeheight: '+superText);

		var introHeight = bannerHeight+superText+featureHeight+bodyPadding;
		//console.log('introHeight: '+introHeight);

		var trimmedHeight = introHeight - superText;
		//console.log('trimHeight: '+trimmedHeight);
		if ( (introHeight + minWhiteSpace) <= viewportHeight ) {
			superlative.hide().css({'opacity':'0','position':'relative', 'visibility':'visible'}).stop(true, true).animate({ opacity: 1},{queue: false, duration: 600}).slideDown(400);
		}
		
		function featurePersistence() {
			var viewportHeight = document.documentElement.clientHeight;

			if ( (introHeight + minWhiteSpace) <= viewportHeight ) {
				//banner.css({'margin-bottom':featureMargin});
				if ( !superlative.is(':visible') ) {
					superlative.hide().css({'opacity':'0','position':'relative', 'visibility':'visible'}).stop(true, true).animate({ opacity: 1},{queue: false, duration: 300}).slideDown(200);
				}
				var remainder = viewportHeight - introHeight;
				//console.log('Remaineder: '+remainder);
				var whiteSpace = Math.max(45, Math.min(remainder / 2, 70)); // Minimum 45, Maximum of 70.
				//console.log('whiteSpace: '+whiteSpace);
				banner.css({'margin-bottom': whiteSpace});
				//console.log('We doing full height');
				//$('.superlative').
			} else if ( ( trimmedHeight ) <= viewportHeight ) {
				//superlative.hide();
				if ( superlative.is(':visible') ) {
					superlative.show().css({'opacity':'1','position':'relative', 'visibility':'visible'}).stop(true, true).animate({ opacity: 0},{queue: false, duration: 200}).slideUp(300);
				}
				var remainder = viewportHeight - trimmedHeight;
				//console.log('Remainder: '+remainder);
				var whiteSpace = Math.max(45, Math.min(remainder / 2, 70)); // Minimum 45, Maximum of 70.
				//console.log('whiteSpace: '+whiteSpace);
				banner.css({'margin-bottom': whiteSpace});
				//console.log('We doing trimmed height');
			}
		}
		
		featurePersistence();
		
		$(window).resize(function() {
			featurePersistence();
		});
	});

// Cache the Window object
$window = $(window);

$(".mobile_nav_toggle").on("click", function(){
    var tempWidth = $window.width();
    if (tempWidth > 739) {
    }
    else
    {
		$(this).toggleClass("open");
		$("#main_nav ul").slideToggle(250);
    }
 });
	
		$.fn.scrollView = function () {
		  return this.each(function () {
			$('html, body').animate({
			  scrollTop: $(this).offset().top - 100
			}, 1000);
		  });
		}


		$("#main_nav ul a").on("click", function(event) {
			if ($(this).hasClass('no_transition')){

			}
			else {
				event.preventDefault();
				if ( !$(this).hasClass('active') ){
					$("#main_nav ul a.active").removeClass('active');
					$(this).addClass('active');
					$(".mobile_nav_toggle").trigger("click");
				}

				$('html, body').clearQueue();
				var target = $(this).attr("href");
			    $(target).scrollView();
				//console.log($("#header").height());
			}
		});
		
		// Reveal Amazon payment
		$('#more').click( function(){
			$(this).toggleClass('active');
			$('#alt-methods').slideToggle('fast');
			return false;
		});



	// To do: Consolidate this onresize function with the one above.
    window.onresize = function(event) {
        
            var tempWidth = $window.width();
            if (tempWidth > 739) {
               $("#main_nav_list").css("display","list-item");
	  			
	  			var $main_nav_ul = $('#main_nav ul');
		  		$tempString = $main_nav_ul.css('display');
		  		if ($tempString === 'none') {
		  			$main_nav_ul.css('display','block')
		  		}

            }
            else
            {
            	if(!($('.mobile_nav_toggle').hasClass('open')))
            	{
            		$("#main_nav_list").css("display","none");
            	}
            }
        
	}

});//end jQuery

