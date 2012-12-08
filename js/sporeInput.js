/* --------------------------------------------------

@script:        sporeInput
@date:          05/08/2012
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
It'd be rad if you tweeted at me to show appreciation.

-------------------------------------------------- */
(function($){

    $.fn.sporeInput = function()
    {

        //Leave alone if data-spore is set to 0
        if($(this).attr('data-spore') == 0) return false;

        var     me = $(this),
                id = me.attr('id'),
                checked = me.is(':checked'),
                label = $('label[for="'+id+'"]'),
                type = me.attr('type');

        //If custom element already exists - do not run
        if( $('.sporeInput#'+id).length>0 ) return false;
        
        //Check if matching label exists
        if( !$('label[for="'+id+'"]').length>0 )
        {
            alert('sporeInput Error:\n<input type="' + type + '" id="' + id + '"> has no matching label tag');
            return false;
        }
        
        //Build HTML
        var     html = '<a href="javascript:;" id="' + id + '" class="sporeInput ' + type;
                html += (checked) ? ' checked' : '';
                html += '">';
                if(type=='checkbox') { html += '&#10003;'; } else { html += '&bull;' }
                html += '</a>';
        
        //Append HTML & Hide Input
        me.hide().after(html);
        label.addClass('sporeInput-label');
        if(type == "radio") label.attr('data-name', $(this).attr('name'));
    };

})(jQuery);

/* ==========

Run sporeInput
Call this explicitly if you're dynamically adding new form elements to the DOM.

========== */
function run_sporeInput()
{

    //Create elements
    $('input[type="checkbox"], input[type="radio"]').each(function(){$(this).sporeInput();});
    
    //Click Checkbox/Radio
    $('.sporeInput').on('click', function()
    {
        $('label[for="' + $(this).attr('id') + '"]').click();
    });

    //In progress ensures rapid clicking will not bug the states out.
    var in_progress = false;
    
    //Label Click
    $('.sporeInput-label').on('click', function()
    {
        //Cancel if already running
        if(in_progress) return false;

        //We are running
        in_progress = true;
        
        //Find type of input
        var my_type = $('input#' + $(this).attr('for')).attr('type');
        
        //Act depending on type
        switch(my_type)
        {
            //Radio input
            case "radio":

                //Uncheck sporeInput from same data series
                $('input[name="' + $(this).attr('data-name') + '"]').each(function()
                {
                        $('.sporeInput#' + $(this).attr('id') + '.checked').removeClass('checked');
                });
                
                //Then add class to clicked
                $('.sporeInput#' + $(this).attr('for')).addClass('checked');

                break;
            
            //Checkbox input
            case "checkbox":

                $('.sporeInput#' + $(this).attr('for')).toggleClass('checked');                       

                break;
        }

        //Wait set time before indicating process has completed.
        //Number is arbitray and simply what I found to work well.
        setTimeout( function(){ in_progress = false; }, 250 );
    });
}
$(function(){
	run_sporeInput();
});