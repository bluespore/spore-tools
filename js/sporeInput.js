/*--------------------------------------------------------------------------------

@script:        sporeInput
@date:          05/08/2012
@updated: 		30/06/2013
@author:        Sean Bullock
@url:           http://bluespore.com               
@twitter:       bluespore

@description:
Replaces native radio and checkbox inputs with anchor elements that can be
completely styled as needed and avoid browser specific form styling clashes
often present with creating custom form elements.

@usage:
Just execute 'run_sporeInput' on document ready.
Add 'data-spore="0"' to any input elements you do not want affected by the script.
The main idea is that you'll be using sprite sheets and image replacement styling
to create custom elements, so the bullet point and tick will not appear afterward:
But it's nice to show the script has run pre-CSS.

@recognise:
Tweet me, bro! - @bluespore

--------------------------------------------------------------------------------*/
(function($){

    $.fn.sporeInput = function( options ){

    	/*var config 	= $.extend({

    				}, options);*/

		/*
        Initialise
        */
        function init(){

		    /*
		    In progress ensures rapid clicking will not bug the states out.
		    */
		    var in_progress = false;
		    
		    /*
		    Click faux element, triggers click on label - which is natively 
		    connected to the actual input element.
		    */
		    $('.sporeInput').on('click', function(){
		        $('label[for="' + $(this).attr('id') + '"]').click();
		    });

		    /*
		    Clicking labels runs browser native functionality as expected as 
		    we are not preventing the default behaviour, we're simply adding
		    extra steps over the top to affect our faux elements.
		    */
		    $('.sporeInput-label').on('click', function(){
		        
		        if(in_progress) return false;
		        
		        in_progress = true;
		        var input_type = $('input#' + $(this).attr('for')).attr('type');
		        
		        switch(input_type){
		            case "radio":
		                /*
		                Uncheck other sporeInput radios from the same series
		                */
		                $('input[name="' + $(this).attr('data-spore-group') + '"]').each(function(){
		                    $('.sporeInput#' + $(this).attr('id') + '.checked').removeClass('checked');
		                });
		                
		                /*
		                Then activate the one targetted
		                */
		                $('.sporeInput#' + $(this).attr('for')).addClass('checked');
		                break;
		            
		            case "checkbox":
		                $('.sporeInput#' + $(this).attr('for')).toggleClass('checked');
		                break;
		        }

		        /*
		        Wait set time before indicating process has completed.
		        Number is arbitray and simply what I found to work well.
		        */
		        setTimeout( function(){ in_progress = false; }, 250 );
		        
		    });
		}

        /*
		Define actions for the collection
		*/
    	this.each(function(){

	    	/*
	        Do not affect this element if
	        data-spore is set to false
	        */
	        if($(this).attr('data-spore') == "false") return;

	        var _self 		= $(this),
				id 			= _self.attr('id'),
				checked 	= _self.is(':checked'),
				type 		= _self.attr('type'),
				$label 		= $('label[for="' + id + '"]');

	        /*
	        If this element already configured, ignore
	        */
	        if( $('.sporeInput#' + id).length ) return;
	        
	        /*
			Spit error if no matching label element
			*/
	        if( !$('label[for="' + id + '"]').length ){
	            console.error('sporeInput Error:\n<input type="' + type + '" id="' + id + '"> has no matching label tag');
	            return;
	        }
	        
	        /*
	        Build HTML
	        */
	        var checked = (checked) ? ' checked' : '',
	        	ascii 	= (type=='checkbox') ? '&#10003;' : '&bull;'
				html 	= '<span id="' + id + '" class="sporeInput ' + type
	            		+ checked
	            		+ '">'
	                	+ ascii
	                	+ '</span>';
	        
	        /*
	        Append new HTML & hide native input
	        */
	        _self.hide().after( html );
	        $label.addClass('sporeInput-label');
	        if(type=="radio") $label.attr('data-spore-group', _self.attr('name'));

	    });

		/*
		Callback once custom elements are available
		*/
		this.promise().done( init() );

		return this;
    };

})(jQuery);