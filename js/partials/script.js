$(document).ready(function () {
	var navState = function() {
		$('.popup__nav--left').removeClass('popup__nav--disable');
		$('.popup__nav--right').removeClass('popup__nav--disable');

		var curIndex = $('.grid__unit--active').data('index');
		navState.totalUnits = $('.grid__unit').length;


		if (curIndex == 1) {
			$('.popup__nav--left').addClass('popup__nav--disable');
		} else {
			$('.popup__nav--left').removeClass('popup__nav--disable');
		}

		if (curIndex == navState.totalUnits) {
			$('.popup__nav--right').addClass('popup__nav--disable');
		} else {
			$('.popup__nav--right').removeClass('popup__nav--disable');
		}
		// curIndex === navState.totalUnits && $('.popup__nav--right').addClass('popup__nav--disable');
		// curIndex === 0 && $('.popup__nav--left').addClass('popup__nav--disable');
	}

	$('.grid__unit').click(function() {
		$('.grid__unit').removeClass('grid__unit--active');
		$(this).addClass('grid__unit--active');
		showModal($(this));
		navState();
	});

	$('body').on('click', '.popup__nav--right, .popup__nav--left', function() {
		if ($(this).hasClass('popup__nav--disable')) {
			return;
		}
		var curIndex = $('.grid__unit--active').data('index');
		var nextUnitIndex = parseInt(curIndex + 1);

		if ($(this).hasClass('popup__nav--left')) {
			nextUnitIndex -= 2;
		}
		var nextUnit = $('.grid__unit[data-index=' + nextUnitIndex + ']');

		if(nextUnit.length > 0) {
			$('.grid__unit').removeClass('grid__unit--active');
			showModal($(nextUnit));
			nextUnit.first().addClass('grid__unit--active');
		}
		navState();
	})
});

var modalContent = '';

showModal = function(that) {
	var title = that.data('title');
	var descr = that.data('descr');
	var imgs = that.data('img');
	var imgsReplace = imgs.replace('/>', "/>,");
	var imgSplit = imgsReplace.split(',');

	// modalContent = '<div class="popup__wrapper"><div class="popup__nav popup__nav--left"></div><div class="popup__nav popup__nav--right"></div>';
	// modalContent += '<div class="popup__slider">' + imgs;
	// modalContent += '</div>';
	// modalContent += '<div class="popup__content">';
	// modalContent += '<h3 class="popup__title">' + title + '</h3>';
	// modalContent += '<p class="popup__descr">' + descr + '</p>';
	// modalContent += '</div>';
	// modalContent += '</div>';

	$('.popup__slider').html(imgSplit);
	$('.popup__title').html(title);
	$('.popup__descr').html(descr);

	$('.popup').addClass('popup--active');
	$('.overlay').addClass('overlay--active');

	$('.popup__close').click(function() {
		$(this).parent().removeClass('popup--active');
		$('.overlay').removeClass('overlay--active');
	});
}