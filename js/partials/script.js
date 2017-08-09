$(document).ready(function () {
	loadData();
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
	});

});

var modalContent = '';

showModal = function(that) {
	var title = that.data('title');
	var descr = that.data('descr');
	var imgs = that.data('img');

	modalContent = '<div class="popup__close"><i class="fa fa-times" aria-hidden="true"></i></div><div class="popup__wrapper"><div class="popup__nav popup__nav--left"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div class="popup__nav popup__nav--right"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>';
	modalContent += '<div class="popup__slider" style="background-image:url(' + imgs + ')">';
	modalContent += '</div>';
	modalContent += '<div class="popup__content">';
	modalContent += '<h3 class="popup__title">' + title + '</h3>';
	modalContent += '<p class="popup__descr">' + descr + '</p>';
	modalContent += '</div>';
	modalContent += '</div>';

	$('.popup').html(modalContent);

	$('.popup').addClass('popup--active');
	$('.overlay').addClass('overlay--active');

	$('.popup__close').click(function() {
		$(this).parent().removeClass('popup--active');
		$('.overlay').removeClass('overlay--active');
	});
}




function loadData() {
	$.ajax({
		type: 'get',
		async: false,
		cache: false,
		url: './data/images.json',
		dataType: 'json',
		success: function (response, status) {
			$.each(response, function (i) {
				$('.grid').append(
					'<div class="grid__unit grid__unit--30" data-img="' 
						+ response[i].img + 
					'" data-title="' 
						+ response[i].profile_name + 
					'" data-descr="' 
						+ response[i].location + 
					'" data-index="' 
						+ response[i].id + 
					'" style="background-image: url(' 
						+ response[i].img + 
					')"><img class="visuallyhidden" src="' 
						+  response[i].img + 
					'"/></div>'
				);
			});
		}
	});
}