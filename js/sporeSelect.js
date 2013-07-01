/*--------------------------------------------------------------------------------
@script:        sporeCheck
@date:          05/08/2012
@updated: 		01/07/2013
@author:        Sean Bullock
@url:           http://bluespore.com               
@twitter:       bluespore

@description:
Replaces native <select> dropdowns with a fully stylable unordered list appended 
to the body to ensure it'll never ruin your beautiful layouts.

@usage:


@recognise:
Tweet me, bro! - @bluespore
--------------------------------------------------------------------------------*/
(function($){

    $.fn.sporeSelect = function( options ){

    	/*
		Defaults
		*/
		var config 	= $.extend({
						activeClass: 			'active',
						listContainer: 			'ul',
						listClass: 				'options-list',
						optionElement: 			'li',
						optionHighlightClass: 	'highlighted',
						triggerElement: 		'span',
						triggerElementClass: 	'select',
						promptText: 			'&mdash;Please Select&mdash;',
						zIndex: 				9999,
						// keyboardMode: 			true,
						callback: {
							onValueChange: function(){}
						}
					}, options );

    	/*
    	Initialise
    	*/
    	function init(){

		    /*
		    On change event
		    */
		    $('select').on('change', function(){

			 	var id 		= $(this).attr('id'),
			 		my_v 	= $(this).val(),
			 		v 		= $(this).find('option[value="' + my_v + '"]').text(),
			  		$custom	= $('.' + config.listClass + '[data-spore-select-id="' + id + '"]');

		 		//Change label text
		 		$('.' + config.triggerElementClass + '[data-spore-select-id="' +id+ '"]').text( v );

		 		config.callback.onValueChange.call( $(this) );

			});
		    
		    /*
		    Click
		    */
		    $('.' + config.triggerElementClass ).on('click', function(e){

		        //Prevent closing based on document click
			    e.stopPropagation();
		            
		        var _self	= $(this),
		            id     	= _self.attr('data-spore-select-id'),
		            pos_x   = _self.offset().left,
		            pos_y   = _self.offset().top + _self.outerHeight(),
		            $target = $('.' + config.listClass + '[data-spore-select-id="' + id + '"]');
		            active  = $target.hasClass( config.activeClass );
		        
		        /*
		        If already open, close
		        */
		        if(active){
		        	$target.removeClass( config.activeClass );
		        }

		        /*
		        Otherwise, close others, move into place and open
		        */
		        else{
		            $('.' + config.listClass + '.' + config.activeClass ).removeClass( config.activeClass );
		            $target.css({ top:pos_y, left:pos_x });
		            $target.addClass( config.activeClass );
		        }
		    });

		    /*
		    Set new selected value and close
		    */
		    $('.' + config.listClass ).find( config.optionElement ).on('click', function(e){

		        e.stopPropagation();
		        
		        /*
		        Find list with matching id  and set the new value
		        */
		        var id = $(this).closest('.' + config.listClass ).attr('data-spore-select-id');
		        $('select#' + id).val( $(this).attr('data-value') ).trigger('change');

		        $('.sporeSelect.' + config.triggerElementClass + '[data-id="' + id + '"]')
		        	.text( $(this).text() );
		        
		        /*
		        Trigger close by clicking document
		        */
		    	$(document).click();    
		    });

		    /*
		    Focus & Blur
		    */
		    $('.' + config.triggerElementClass ).on('focus', function(){
		    	$(this).addClass('focused');
		    });
		    $('.' + config.triggerElementClass ).on('blur', function(){
		    	$(this).removeClass('focused');
		    });

		    /*
		    Closing the list
		    */
		    $(document).on('click', function(){
		        $('.' + config.listClass + '.' + config.activeClass ).removeClass( config.activeClass );
		    });

		    /*
		    Keyboard presses
		    */
		    if( config.keyboardMode ){
		    	$(document).keypress(function (e) {

		    		var f 		= $('.focused'),
		    			id 		= f.attr('data-spore-select-id'),
		    			list 	= $('.' + config.listClass + '[data-spore-select-id="' + id + '"]' ),
		    			h 		= list.find('.' + config.optionHighlightClass );

		    		if(f.length>0){
			    		switch(e.keyCode){

			    			//Enter key
			    			case 13:
			    				h.click();
			    			break;

			    			//Up arrow
			    			case 38:
			    				e.preventDefault();

			    				if(!list.hasClass( config.activeClass )){
			    					f.click();
			    					list.children().eq(0).addClass( config.optionHighlightClass );
			    				}

			    				//If not first option
			    				if( !h.is(':first-child') ){
			    					h.removeClass( config.optionHighlightClass )
			    					.prev()
			    					.addClass( config.optionHighlightClass );
			    				}

			    				//If first option
			    				else if( h.is(':first-child') ){
			    					h.removeClass( config.optionHighlightClass )
			    					.siblings()
			    					.filter(':last')
			    					.addClass( config.optionHighlightClass );
			    				}

			    				list.scrollTop( Math.ceil(h.offset().top - list.offset().top) );
		    				break;

		    				//Down arrow
		    				case 40:
		    					e.preventDefault();
		    					
		    					if(!list.hasClass( config.activeClass )){
			    					f.click();
			    					list.children().eq(0).addClass( config.optionHighlightClass );
			    				}

			    				//If not last option
			    				if( !h.is(':last-child') ){
			    					h.removeClass( config.optionHighlightClass )
			    					.next()
			    					.addClass( config.optionHighlightClass );
			    				}

			    				//If last option
			    				else if( h.is(':last-child') ){
			    					h.removeClass( config.optionHighlightClass )
			    					.siblings()
			    					.filter(':first')
			    					.addClass( config.optionHighlightClass );
			    				}

			    				list.scrollTop( Math.ceil(h.offset().top - list.offset().top) );
		    				break;

		    				//ESC
		    				case 27:
		    					e.preventDefault();
		    					f.removeClass('focused').blur();
		    					$(document).click();
		    				break;

		    				//Tab key
		    				case 9:
		    					$(document).click();
		    				break;
			    		}
			    	}

		    	});
	    	}
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

			var _self      	= $(this),
                id      	= _self.attr('id'),
                title   	= _self.attr('title') ? _self.attr('title') : '',
                styles  	= _self.attr('style') ? _self.attr('style')+';' : '',
                width   	= _self.outerWidth();
                label   	= _self.find('option[value="label"]') ? _self.find('option[value="label"]').text() : config.promptText,
                arr     	= [],
                $options 	= _self.find('option');

			/*
			If this element is already configured, ignore
			*/
			if( $('.sporeSelect' + id).length>0 ) return;                

			/*
			Build options array
			*/
	        $options.each(function(i){
	    		arr[i] = new Array();
	            arr[i]['text'] = $(this).text();
	            arr[i]['value'] = $(this).val();
		        i++;
	        });

	        /*
	        Create HTML string
	        */
	        var html_label  = '<' + config.triggerElement + ' data-spore-select-id="' 
	        				+ id + '" title="' + title + '" style="' + styles 
                            + 'width:' + width + 'px;" class="sporeSelect ' 
                            + config.triggerElementClass + '" tabindex="0">' + label + '</a>',

            	html_list   = '<' + config.listContainer + ' class="sporeSelect ' 
            				+ config.listClass + '" data-spore-select-id="' + id 
                            + '" style="width:' + width + 'px;top:0;left:0;z-index:' 
                            + config.zIndex + ';">';
    
	        /*
	        Create mark up for new element
	        */
	        for(i=0;i<arr.length;i++){

	        	/*
	        	Option with value "label" should only be used for
	        	the initial text value of the element if nothing is 
	        	selected and should not be selectable itself.
	        	*/
	            if(arr[i].value !== 'label'){
		            html_list += '<' + config.optionElement + ' data-value="' 
		            + arr[i].value + '">' + arr[i].text + '</' + config.optionElement + '>';
				}
	        }
	        
	        /*
	        Close off mark up
	        */
	        html_list += ('</' + config.listContainer + '>');
	        
	        /*
	        Hide native and insert custom element
	        */
	        _self.css('opacity',0)
	        	.hide()
	        	.before( html_label );

	        /*
	        Add the option list to the body so as it
	        sits above all other elements to act as 
	        close as possible to the native input.
	        */
	        $('body').prepend(html_list);

	        /*
	        Show selected option on load, if already has value
	        */
		    $(window).load(function(){
		        $options.filter(':selected').each(function(){

		            var val = $(this).val(),
		            	id  = $(this).closest('select').attr('id');

		            $('.' + config.listContainer + '[data-spore-select-id="' + id + '"]')
		            .find('a[data-value="' + val + '"]')
		            .click();

		            /*
		            Change
		            */
				    $(this).trigger('change');

		        });
		    });
	    });

		init();

		return this;

    }

})(jQuery);