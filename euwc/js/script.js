$(document).ready(function() {

	/*   START Search field   */

	$('#search').click(function() {
		if ($(this).html() == '<img src="img/search.png" alt="search">') {
			$(this).html('<img src="img/x.png" alt="close">');
		} else {
			$(this).html('<img src="img/search.png" alt="search">');
		}
		$('#act').fadeToggle(500);
	});

	/*   END Search field   */
	
	/*   START Show menu button   */


	$('#show_menu').click(function(){
		$('header nav ul').slideToggle(500);
	});
	$(window).resize(function(){
		$('header nav ul').removeAttr('style');
	});

	/*   END Show menu button   */

	/*   START resizing some elements */ 

	$('#act input').css('width', $(window).width());
	$('#controls').css('width', $(window).width());
	$('#controls .wrapper').css('width', $(window).width());
	$(window).resize(function() {
		$('#act input').css('width', $(window).width());
		$('#controls').css('width', $(window).width());
		$('#controls .wrapper').css('width', $(window).width());
		$('#fb').css('width', $(window).width() - 5);
		$('#fb .wrapper').css('width', $(window).width());
	});
	
	/*   END resizing some elements */ 

	/*   START slider carousel */ 

	$("#slider").owlCarousel({
        items: 1,
        pagination: false,
        autoplay: false,
        loop: true
    });

    var owl = $(".owl-carousel").data('owlCarousel');
    $('#controls .wrapper #arrow-right').click(function() {
    	owl.next(500); 
    });
    $('#controls .wrapper #arrow-left').click(function() {
   		owl.prev(500); 
    });

    /*   END slider carousel */ 

    /*   START steps calousel */ 

	var i = 1;
	$('#content-right #step-next').click(function(){
		$(this).parent().parent().children('#step'+i).fadeOut(300, function() {
			if (i >= 3) {
				i = 0;
			}
			$(this).parent().children('#step'+(i+1)).fadeIn(300);
			i++;
		});
	});
	i = 1;
	$('#content-right #step-prev').click(function(){
		$(this).parent().parent().children('#step'+i).fadeOut(300, function() {
			if (i <= 1) {
				i = 4;
			}
			$(this).parent().children('#step'+(i-1)).fadeIn(300);
			i--;
		});
	});

	/*   END steps calousel */ 

	/*   START placeholder changing */ 

	if (($(window).width()) < 370) {
		$('input[type="email"]').attr('placeholder', 'Sign up for news, type in your email');
	}
	$(window).resize(function() {
		if (($(window).width()) < 370) {
			$('input[type="email"]').attr('placeholder', 'Sign up for news, type in your email');
		}
	});

	/*   START placeholder changing */ 
});
