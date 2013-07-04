# SporeTools by Sean Bullock
## CSS3 Custom Form Elements powered by jQuery

----------------------
Avoid cross browser form styling nightmares - Just drop it in and style the raw output.


### Scripts Included
----------        
1. sporeInput
2. sporeSelect
3. sporeRating



### Meta
----------
Date:			05/08/2012

Last updated: 	04/07/2013

Author:			Sean Bullock

Url:			[BlueSpore.com](http://bluespore.com)               

Twitter:		[@bluespore](http://twitter.com/bluespore)

Company:		[CarterDigital](http://carterdigital.com.au/)



### Description
----------
sporeInput:
Replaces native radio and checkbox inputs with anchor elements that can be
completely styled as needed and avoid browser specific form styling clashes
often present with creating custom form elements.

sporeSelect:
Replaces native select dropdowns with a fully stylable unordered list appended to the body to ensure it'll never ruin your beautiful layouts.

sporeRating:
The script will populate the rating on window load given the element has
a data-attribute of 'data-spore-rating' equal to a numeric value within the 
range of the number of child elements (as declared by 'pointElement').
In addition, you can choose to add 'data-spore-rating-id' to delegate the id
of an input element who's value will change on update of the rating.

A callback method is also available for the update of the rating 'onRatingChange'.
This is within the callback object when instantiating the plugin and returns
the rating element that was affected.



### Usage
----------

#### sporeInput
$('input[type="radio"],input[type="checkbox"]').sporeInput({
	checkedClass: 		'checked',
	tag: 				'span',
	checkboxCharacter: 	'&#10003;',
	radioCharacter: 	'&bull;',
	callback: {
		onCheck: function(){}
	}
});

#### sporeSelect
$('select').sporeSelect({

	//Class applied to list container when open
	activeClass: 			'active',

	//Container of list options
	listContainer: 			'ul',

	//Class for option list container
	listClass: 				'options-list',

	//Tag for each option equivilent 
	optionElement: 			'li',

	//Class for highlighted list item
	//when using keyboard mode
	optionHighlightClass: 	'highlighted',

	//Element you click
	triggerElement: 		'span',

	//Class on element you click
	triggerElementClass: 	'select',

	//Fallback text for initial prompt label
	//Can also be set as an <option value="label">label</option>
	//which would be excluded from the generated
	//sporeSelect element
	promptText: 			'&mdash;Please Select&mdash;',

	//Desired z-index level for the opened menu
	zIndex: 				9999,

	//Allow navigation with arrow keys, quit with ESC
	//and Enter key to make selection
	keyboardMode: 			true,

	//Define a function for successful selection
	callback: {
		onValueChange: function(){}
	}
});

#### sporeRating
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

Style to your hearts content. Why not throw some CSS3 animations on the active states of these badboys.



### Recognise
----------
It'd be rad if you [tweeted me](http://twitter.com/bluespore)!