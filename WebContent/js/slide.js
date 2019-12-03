$(document).ready(function()
{
	var owl = $('.index_slide .owl-carousel');
	
	owl.owlCarousel(
	{
	    loop:true,
	    margin:0,
	    nav:true,
	    responsive:
	    {
	        0:
	        {
	            items:1
	        },
	        2000:
	        {
	            items:1
	        }
	    },
	    autoplay:true,
	    autoplayTimeout:5000,
	    autoplayHoverPause:true
	});
	

	owl.on('mouseleave', function()
	{
		setTimeout(function()
		{
			$('.index_slide .owl-carousel .owl-next').click();
		}, 5000);
	});
	
	$('.index_slide .owl-carousel .owl-nav').hide();
	$('.index_slide .owl-carousel .owl-dots').hide();
	
	owl.trigger('refresh.owl.carousel');
});