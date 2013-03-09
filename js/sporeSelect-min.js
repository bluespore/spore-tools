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

--------------------------------------------------------------------------------*/function run_sporeSelect(){$("select").each(function(){$(this).sporeSelect()});$("select").live("change",function(){var e=$(this).attr("id"),t=$(this).text(),n=$('.options-list[data-id="'+e+'"]');$('.select[data-id="'+e+'"]').text(t)});$(".select").on("click",function(e){e.stopPropagation();var t=$(this),n=t.attr("data-id"),r=$('.options-list[data-id="'+n+'"]'),i=r.hasClass("active"),s=t.offset().left,o=t.offset().top+t.height();if(i)r.removeClass("active").hide();else{$(".options-list.active").removeClass("active").hide();r.css({top:o,left:s});r.addClass("active").show()}});$(".options-list").find("a").on("click",function(e){e.stopPropagation();var t=$(this).closest(".options-list").attr("data-id");$("select#"+t).val($(this).attr("data-value")).trigger("change");$('.sporeSelect.select[data-id="'+t+'"]').text($(this).text());$(document).click()});$(document).on("click",function(){$(".options-list.active").removeClass("active").hide()})}(function(e){e.fn.sporeSelect=function(){if(e(this).attr("data-spore")==0)return!1;var t=e(this),n=t.attr("id"),r=t.attr("title")?t.attr("title"):"",s=t.attr("style")?t.attr("style")+";":"",o=t.width();options=t.find("option"),label=t.find('option[value="label"]')?t.find('option[value="label"]').text():"&#151;Please Select&#151;",arr=[];if(e(".sporeSelect"+n).length>0)return!1;options.each(function(t){arr[t]=new Array;arr[t].text=e(this).text();arr[t].value=e(this).val();t++});var u='<a href="javascript:;" data-id="'+n+'" title="'+r+'" style="'+s+"width:"+o+'px;" class="sporeSelect select">'+label+"</a>",a='<ul class="sporeSelect options-list" data-id="'+n+'" style="display:none;position:absolute;width:'+o+'px;top:0;left:0;z-index:9000;">';for(i=0;i<arr.length;i++)arr[i].value!="label"&&(a+='<li><a href="javascript:;" data-value="'+arr[i].value+'">'+arr[i].text+"</a></li>");a+="</ul>";t.css("opacity",0).hide().before(u);e("body").prepend(a);e(window).load(function(){options.filter(":selected").each(function(){var t=e(this).val(),n=e(this).closest("select").attr("id");e('.options-list[data-id="'+n+'"]').find('a[data-value="'+t+'"]').click()})})}})(jQuery);$(function(){run_sporeSelect()});