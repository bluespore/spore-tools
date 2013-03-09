/*--------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------*/function run_sporeInput(){$('input[type="checkbox"], input[type="radio"]').each(function(){$(this).sporeInput()});$(".sporeInput").on("click",function(){$('label[for="'+$(this).attr("id")+'"]').click()});var e=!1;$(".sporeInput-label").on("click",function(){if(e)return!1;e=!0;var t=$("input#"+$(this).attr("for")).attr("type");switch(t){case"radio":$('input[name="'+$(this).attr("data-name")+'"]').each(function(){$(".sporeInput#"+$(this).attr("id")+".checked").removeClass("checked")});$(".sporeInput#"+$(this).attr("for")).addClass("checked");break;case"checkbox":$(".sporeInput#"+$(this).attr("for")).toggleClass("checked")}setTimeout(function(){e=!1},250)})}(function(e){e.fn.sporeInput=function(){if(e(this).attr("data-spore")==0)return!1;var t=e(this),n=t.attr("id"),r=t.is(":checked"),i=e('label[for="'+n+'"]'),s=t.attr("type");if(e(".sporeInput#"+n).length>0)return!1;if(!e('label[for="'+n+'"]').length>0){alert('sporeInput Error:\n<input type="'+s+'" id="'+n+'"> has no matching label tag');return!1}var o='<a href="javascript:;" id="'+n+'" class="sporeInput '+s;o+=r?" checked":"";o+='">';s=="checkbox"?o+="&#10003;":o+="&bull;";o+="</a>";t.hide().after(o);i.addClass("sporeInput-label");s=="radio"&&i.attr("data-name",e(this).attr("name"))}})(jQuery);$(function(){run_sporeInput()});