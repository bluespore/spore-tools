(function(a){a.fn.sporeInput=function(){if(a(this).attr("data-spore")==0){return false}var f=a(this),g=f.attr("id"),e=f.is(":checked"),b=a('label[for="'+g+'"]'),d=f.attr("type");if(a(".sporeInput#"+g).length>0){return false}if(!a('label[for="'+g+'"]').length>0){alert('sporeInput Error:\n<input type="'+d+'" id="'+g+'"> has no matching label tag');return false}var c='<a href="javascript:;" id="'+g+'" class="sporeInput '+d;c+=(e)?" checked":"";c+='">';if(d=="checkbox"){c+="&#10003;"}else{c+="&bull;"}c+="</a>";f.hide().after(c);b.addClass("sporeInput-label");if(d=="radio"){b.attr("data-name",a(this).attr("name"))}}})(jQuery);function run_sporeInput(){$('input[type="checkbox"], input[type="radio"]').each(function(){$(this).sporeInput()});$(".sporeInput").on("click",function(){$('label[for="'+$(this).attr("id")+'"]').click()});var a=false;$(".sporeInput-label").on("click",function(){if(a){return false}a=true;var b=$("input#"+$(this).attr("for")).attr("type");switch(b){case"radio":$('input[name="'+$(this).attr("data-name")+'"]').each(function(){$(".sporeInput#"+$(this).attr("id")+".checked").removeClass("checked")});$(".sporeInput#"+$(this).attr("for")).addClass("checked");break;case"checkbox":$(".sporeInput#"+$(this).attr("for")).toggleClass("checked");break}setTimeout(function(){a=false},250)})};