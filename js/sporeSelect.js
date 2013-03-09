/*--------------------------------------------------------------------------------

@script:        sporeCheck
@date:          05/08/2012
@author:        Sean Bullock
@url:           http://bluespore.com               
@twitter:       bluespore

@description:
Replaces native <select> dropdowns with a fully stylable unordered list appended 
to the body to ensure it'll never ruin your beautiful layouts.

@usage:
Just execute 'run_sporeSelect' on document ready.
Change the default text by adding an option with the value of 'label'.
Add 'data-spore="0"' to any elements you do not want affected by the script.
Style to your hearts content. Why not throw some CSS3 animations on that badboy's
active state?

@recognise:
It'd be rad if you tweeted at me to show appreciation.

--------------------------------------------------------------------------------*/
(function($){

    $.fn.sporeSelect = function(){

    	//Leave alone if data-spore is set to 0
        if($(this).attr('data-spore') == 0) return false;
        
        var     me      = $(this),
                id      = me.attr('id'),
                title   = me.attr('title') ? me.attr('title') : '',
                styles  = me.attr('style') ? me.attr('style')+';' : '',
                width   = me.width();
                options = me.find('option'),
                label   = me.find('option[value="label"]') ? me.find('option[value="label"]').text() : '&#151;Please Select&#151;',
                arr     = [];
                
        //If custom element already exists - do not run
        if( $('.sporeSelect' + id).length>0 ) return false;
        
        //Build array
        options.each(function(i){

    		arr[i] = new Array();
            arr[i]['text'] = $(this).text();
            arr[i]['value'] = $(this).val();
	        i++;

        });
        
        //Build anchor & list
        var html_label      = '<a href="javascript:;" data-id="' + id 
                            + '" title="' + title + '" style="' + styles 
                            + 'width:' + width + 'px;" class="sporeSelect select">' 
                            + label + '</a>',

            html_list       = '<ul class="sporeSelect options-list" data-id="' + id 
                            + '" style="display:none;position:absolute;width:' + width 
                            + 'px;top:0;left:0;z-index:9000;">';
    
        //Spit it out
        for(i=0;i<arr.length;i++){

        	//We don't want the label selectable
            if(arr[i].value != 'label'){

	            html_list   += '<li><a href="javascript:;" data-value="' + arr[i].value 
	                        + '">' + arr[i].text + '</a></li>';
			}
        }
        
        //Finish
        html_list           += ('</ul>');
        
        //Hide native and add trigger in place
        me.css('opacity',0).hide().before(html_label);

        //Then add custom list to body
        $('body').prepend(html_list);

        //Show selected option on load
	    $(window).load(function(){

	        options.filter(':selected').each(function(){

	            var 	val 		= $(this).val(),
	            		id      	= $(this).closest('select').attr('id');

	            $('.options-list[data-id="' + id + '"]').find('a[data-value="' + val + '"]').click();

	            //Trigger change
			    // $(this).trigger('change');

	        });
	    });

    }

})(jQuery);

/*--------------------------------------------------------------------------------

Run sporeSelect
Call this explicitly if you're dynamically adding new form elements to the DOM.

--------------------------------------------------------------------------------*/
function run_sporeSelect(){

    //Create elements
    $('select').each(function(){$(this).sporeSelect();});

    //Change event
    $('select').live('change', function(){

	 	var id 				= $(this).attr('id'),
	 		val 			= $(this).text(),
	  		custom 			= $('.options-list[data-id="' + id + '"]');

 		//Change label text
 		$('.select[data-id="' +id+ '"]').text(val);

	});
    
    /* =====
    Click events
    ===== */
    $('.select').on('click', function(e){

        //Prevent closing based on document click
	    e.stopPropagation();
            
        var me      		= $(this),
            id      		= me.attr('data-id'),
            target  		= $('.options-list[data-id="' + id + '"]'),
            active  		= target.hasClass('active'),
            pos_x   		= me.offset().left,
            pos_y   		= me.offset().top + me.height();
        
        //Close list if open
        if(active){

            target.removeClass('active').hide();

        }
        else{

            //Close others already active
            $('.options-list.active').removeClass('active').hide();

            //Move in place
            target.css({top:pos_y,left:pos_x});
            target.addClass('active').show();

        }
    });

    //Set new selected value & close
    $('.options-list').find('a').on('click', function(e){

        //Prevent closing based on document click
        e.stopPropagation();
        
        //Find list id
        var id = $(this).closest('.options-list').attr('data-id');

        //Set matching select element's new value
        $('select#' + id).val($(this).attr('data-value')).trigger('change');
        
        //Update label
        $('.sporeSelect.select[data-id="' + id + '"]').text($(this).text());
        
        //Trigger close by clicking document
    	$(document).click();    
    });

    //Close options-list if click anywhere but
    $(document).on('click', function()
    {
        $('.options-list.active').removeClass('active').hide();
    });

}
$(function(){
	run_sporeSelect();
});