/*--------------------------------------------------------------------------------

@script:        sporeRating
@date:          02/12/2012
@updated: 		30/06/2013
@author:        Sean Bullock
@url:           http://bluespore.com               
@twitter:       bluespore

@description:
An incremental rating selection script.

@usage:
$('.selector').sporeRating({
	activeClass: 'someClassName',
	pointElement: 'li',
	callback: {
		onRatingChange: function(){
			console.log(this);
		}
	}
});

The script will populate the rating on window load given the element has
a data-attribute of 'data-spore-rating' equal to a numeric value within the 
range of the number of child elements (as declared by 'pointElement').
In addition, you can choose to add 'data-spore-rating-id' to delegate the id
of an input element who's value will change on update of the rating.

A callback method is also available for the update of the rating 'onRatingChange'.
This is within the callback object when instantiating the plugin and returns
the rating element that was affected.

@recognise:
Tweet me, bro! - @bluespore

--------------------------------------------------------------------------------*/
(function($){

    $.fn.sporeRating = function( options ){

    	/*
		Defaults
		*/
		var config 	= $.extend({
						activeClass: 'active',
						pointElement: 'li',
						callback: {
							onRatingChange: function(){}
						}
					}, options );

		/*
		Initiate a permanent change in rating
		*/
		function changeRating(e){
			
			var count = $(e).attr('data-spore-rating') ? $(e).attr('data-spore-rating')-1 : 0;

			$(e).find( config.pointElement )
				.removeClass( config.activeClass )
				.eq(count)
				.addClass( config.activeClass )
				.prevAll()
				.addClass( config.activeClass );

			//If there is a matching input field, change that value too
			if( $(e).attr('data-spore-rating-id') != undefined ){
				$('input#' + $(e).attr('data-spore-rating-id')).val( $(e).attr('data-spore-rating') );
			}
		}

		/*
		Define actions for the collection
		*/
    	this.each(function(){

    		var _self = $(this);
		    
		    /*
		    On hover
		    */
			_self.find( config.pointElement ).on('hover', function(){
				//Fill Points
				$(this).addClass( config.activeClass ).prevAll().addClass( config.activeClass );
				//Clear current
				$(this).nextAll().removeClass( config.activeClass );
			});

			/*
			On click
			*/
			_self.find( config.pointElement ).on('click', function(){
				_self.attr('data-spore-rating', $(this).index()+1);
				changeRating(this);

				config.callback.onRatingChange.call( _self );
			});

			/*
			Ensure rating rolls back on exit if no new selection
			*/
			_self.on('mouseleave', function(){
				changeRating(this);
			});
		});

		changeRating(this);

		return this;
    };

})(jQuery);