$(document).ready(function () {
	loadData();
	var navState = function() {
		var leftNavBtn = $('.popup__nav--left');
		var rightNavBtn = $('.popup__nav--right');

		leftNavBtn.removeClass('popup__nav--disable');
		rightNavBtn.removeClass('popup__nav--disable');

		var curIndex = $('.grid__unit--active').data('index');
		navState.totalUnits = $('.grid__unit').length;


		if (curIndex == 1) {
			leftNavBtn.addClass('popup__nav--disable');
		} else {
			leftNavBtn.removeClass('popup__nav--disable');
		}

		if (curIndex == navState.totalUnits) {
			rightNavBtn.addClass('popup__nav--disable');
		} else {
			rightNavBtn.removeClass('popup__nav--disable');
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
	modalContent += '<div class="popup__img" style="background-image:url(' + imgs + ')">';
	modalContent += '</div>';
	modalContent += '<div class="popup__content">';
	modalContent += '<h3 class="popup__title">' + title + '</h3>';
	modalContent += '<p class="popup__descr">' + descr + '</p>';
	modalContent += '</div>';
	modalContent += '</div>';

	var popupBlock = $('.popup');
	var popupOverlay = $('.overlay');

	popupBlock.html(modalContent);

	popupBlock.addClass('popup--active');
	popupOverlay.addClass('overlay--active');

	$('.popup__close').click(function() {
		$(this).parent().removeClass('popup--active');
		popupOverlay.removeClass('overlay--active');
	});

	popupOverlay.click(function() {
		$(this).removeClass('overlay--active');
		popupBlock.removeClass('popup--active');
	});
}




function loadData() {
	var profilePosts;
	$.ajax({
		type: 'get',
		async: false,
		cache: false,
		url: './data/images.json',
		dataType: 'json',
		success: function (response, status) {
			$.each(response, function(i) {
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
						+ response[i].img + 
					'"/></div>'
				);
			});
			profilePosts = response.length;
			$('.js-profile-posts').html(profilePosts);
		}
	});
}


function profileInfo(profileImg, profileName) {
	$('.js-profile-photo').attr('src', profileImg);
	$('.js-profile-name').html(profileName);
}

profileInfo('http://fillmurray.com/600/600', 'Fill_Murray');