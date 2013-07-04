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
$('input[type="radio"],input[type="checkbox"]').sporeInput({
	checkedClass: 		'checked',
	tag: 				'span',
	checkboxCharacter: 	'&#10003;',
	radioCharacter: 	'&bull;',
	callback: {
		onCheck: function(){}
	}
});

@recognise:
Tweet me, bro! - @bluespore
--------------------------------------------------------------------------------*/
(function($){

    $.fn.sporeInput = function( options ){

    	/*
		Defaults
		*/
		var config 	= $.extend({
						checkedClass: 		'checked',
						tag: 				'span',
						checkboxCharacter: 	'&#10003;',
						radioCharacter: 	'&bull;',
						callback: {
							onCheck: function(){}
						}
					}, options );

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
		                    $('.sporeInput#' + $(this).attr('id') + '.' + config.checkedClass).removeClass(config.checkedClass);
		                });
		                
		                /*
		                Then activate the one targetted
		                */
		                $('.sporeInput#' + $(this).attr('for')).addClass(config.checkedClass);
		                break;
		            
		            case "checkbox":
		                $('.sporeInput#' + $(this).attr('for')).toggleClass(config.checkedClass);
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
	        if( $('.sporeInput#' + id).length>0 ) return;
	        
	        /*
			Spit error if no matching label element
			*/
	        if( !$('label[for="' + id + '"]').length>0 ){
	            console.error('sporeInput Error:\n<input type="' + type + '" id="' + id + '"> has no matching label tag');
	            return;
	        }
	        
	        /*
	        Build HTML
	        */
	        var checked = (checked) ? config.checkedClass : '',
	        	ascii 	= (type=='checkbox') ? config.checkboxCharacter : config.radioCharacter,
				html 	= '<' + config.tag + ' id="' + id + '" class="sporeInput ' + type
	            		+ ' ' + checked
	            		+ '">'
	                	+ ascii
	                	+ '</' + config.tag + '>';
	        
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