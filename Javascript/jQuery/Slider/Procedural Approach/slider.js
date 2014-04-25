// the procedural method
(function($) {
									//because it will always return the jQuery 
									//object we cantake advantage of that by calling css function
	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'),
		imgs = sliderUL.find('img'),//collect all the images in the UL
		imgWidth = imgs[0].width, // 600
		imgsLen = imgs.length, // 4
		current = 1,//represents current position, or image
		totalImgsWidth = imgsLen * imgWidth; // 2400 multiply the number * the width


					//take advantage to show the hidden buttons while
					//we make the event listners
	$('#slider-nav').show().find('button').on('click', function() {
								//Make your own attributes by prepending them with data-
		var direction = $(this).data('dir'),//.data("dir") = .attr("data-dir")
			loc = imgWidth; // 600 set it to 600 because if it passed through both if statements we use it later in line 44
			//value of image width because we are moving relativly
			//this means wherever we are +=600 will take us to next image

		// update current value
		( direction === 'next' ) ? ++current : --current;

		// if first image
		if ( current === 0 ) {
			current = imgsLen;//set current to represent last image
			loc = totalImgsWidth - imgWidth; // 2400 - 600 = 1800
			direction = 'next';
		} else if ( current - 1 === imgsLen ) { // Are we at end? Should we reset?
			current = 1;
			loc = 0;
		}

		transition(sliderUL, loc, direction);
	});

	function transition( container, loc, direction ) {
		var unit; // -= +=

		if ( direction && loc !== 0 ) {
			unit = ( direction === 'next' ) ? '-=' : '+=';//if prev set it to += if next then set to -=
		}

		container.animate({
			'margin-left': unit ? (unit + loc) : loc
		});
		//negative margin will move the images to the left therefore showing the next one in line.
		//images are floating right
	}

})(jQuery);