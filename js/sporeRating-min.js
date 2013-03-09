/*--------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------*/function run_sporeRating(){$("ul[data-spore-rating]").each(function(){$(this).sporeRating()})}function changeRating(e){var t=e,n=e.attr("data-count")?e.attr("data-count")-1:0;t.find("li").removeClass("active").eq(n).addClass("active").prevAll().addClass("active");e.attr("data-id")!=undefined&&$("input#"+e.attr("data-id")).val(e.attr("data-count"))}(function(e){e.fn.sporeRating=function(){var t=e(this),n=t.find("a");n.on("hover",function(){var t=e(this);t.parent().addClass("active").prevAll().addClass("active");t.parent().nextAll().removeClass("active")});n.on("click",function(){var t=e(this).closest("ul[data-spore-rating]");t.attr("data-count",e(this).parent().index()+1);changeRating(t)});e(window).load(function(){changeRating(t)});t.on("mouseleave",function(){changeRating(t)})}})(jQuery);$(function(){run_sporeRating()});