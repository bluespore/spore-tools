/* --------------------------------------------------

@script:        sporeRating
@date:          02/12/2012
@author:        Sean Bullock
@url:           http://bluespore.com               
@twitter:       bluespore

@description:
An incremental rating selection script.

@usage:
Add the the data-attribute of 'data-spore-rating' to an unordered list to enable
its functionality. If you'd like to take that same data and apply it to a hidden 
form element for capture, simply add a 'data-id' attribute that matches the 
hidden fields id. This way, the value of that field will be updated at the same 
time as the sporeRating count.

@recognise:
It'd be rad if you tweeted at me to show appreciation.

-------------------------------------------------- */
(function($){

    $.fn.sporeRating = function()
    {

    	var me 				= $(this),
    		anchors 		= me.find('a');
	    
		anchors.on('hover', function()
		{
			var anchor 		= $(this);

			//Fill ratings
			anchor.parent()
				.addClass('active')
				.prevAll()
				.addClass('active');

			//Clear any after the current
			anchor.parent()
				.nextAll()
				.removeClass('active');
		});

		//Update on click
		anchors.on('click', function()
		{
			var sporeRating = $(this).closest('ul[data-spore-rating]');
			
			//Set the rating
			sporeRating.attr('data-count', $(this).parent().index()+1);

			//Ensure change is met
			changeRating(sporeRating);
		});

		//Set rating on page load if count already exists
		$(window).load(function()
		{
			changeRating(me);
		});
		//Also ensure it rolls back after mouse exit
		me.on('mouseleave', function()
		{
			changeRating(me);
		});
    }

})(jQuery);

/* ==========

Run sporeRating
Call this explicitly if you've added new elements to the DOM.

========== */
function run_sporeSelect()
{
    //Initiate sporeRating
    $('ul[data-spore-rating]').each(function(){$(this).sporeRating();});
}

/* ==========

changeRating
Initiates the permanent change in rating

========== */
function changeRating(sporeRatingElement)
{
	var me 				= sporeRatingElement,
		count 			= sporeRatingElement.attr('data-count') ? sporeRatingElement.attr('data-count')-1 : 0;

	me.find('li')
		.removeClass('active')
		.eq(count)
		.addClass('active')
		.prevAll()
		.addClass('active');

	//If there is a matching input field, change that value too
	if(sporeRatingElement.attr('data-id') != undefined)
	{
		$('input#' + sporeRatingElement.attr('data-id')).val(sporeRatingElement.attr('data-count'));
	}
}