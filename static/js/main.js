/*
Title: Main JS File
Theme Name: Wedding
Author Name: FairyTheme
Author URI: http://themeforest.net/user/fairytheme
====================*/
/*
Table of Contents:
------------------
1. Loader
2. Page scrolling
3. Countdown
4. OWL Gallery
5. Form
6. Select arrow
7. Map

/* 1. Loader
====================*/
'use strict';
$(window).on('load', function() {$('.loader').delay(600).fadeOut('slow');});
//jQuery to collapse the navbar on scroll
var newNav = $('nav.clone');
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 350) {
		newNav.removeClass('unstick').addClass('stick');
	} else {
		newNav.removeClass('stick').addClass('unstick');
	}
});
if($('.wedding-date').length != 0){
	$('.wedding-date').arctext({radius: 360});
}
/* 2. Page scrolling
=====================*/
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').on('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top-76
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});
$('nav li').on('click', 'a', function () {
	$('.navbar-collapse.in').collapse('hide');
});
/* 3. Countdown
=======================*/
function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	var newChild;

	function updateClock() {
		var t = getTimeRemaining(endtime);
		var daysArr = String(t.days).split('');
		daysSpan.innerHTML = '';
		for (var i = 0; i < daysArr.length; i++){
			newChild = document.createElement('span');
			newChild.innerHTML = daysArr[i];
			daysSpan.appendChild(newChild);
		}
		var hoursArr = String(('0' + t.hours).slice(-2)).split('');
		hoursSpan.innerHTML = '';
		for (var i = 0; i < hoursArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = hoursArr[i];
			hoursSpan.appendChild(newChild);
		}
		var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
		minutesSpan.innerHTML = '';
		for (var i = 0; i < minuteArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = minuteArr[i];
			minutesSpan.appendChild(newChild);
		}
		var secondArr = String(('0' + t.seconds).slice(-2)).split('');
		secondsSpan.innerHTML = '';
		for (var i = 0; i < secondArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = secondArr[i];
			secondsSpan.appendChild(newChild);
		}
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
// set your wedding date here
var deadline = 'March 18 2017 17:30:00 GMT+0300';
initializeClock('timer', deadline);
/* 4. Owl Gallery
==================================*/
$('.owl-carousel').owlCarousel({
	loop:true,
	autoplay:true,
	responsiveClass:true,
	nav:true,
	margin:2,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:3
		},
	}
});
/* 5. Form
===================================*/
(function ($, window, document, undefined) {
	var $form = $('#contact-form');
	$form.submit(function (e) {
		// remove the error class
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		// get the form data
		var formData = {
			'name' : $('input[name="form-name"]').val(),
			'email' : $('input[name="form-email"]').val(),
			'number' : $('input[name="form-number"]').val(),
			'select' : $("#sel1 option:selected").val()
		};
		// process the form
		$.ajax({
			type : 'POST',
			url  : 'form.php',
			data : formData,
			dataType : 'json',
			encode : true
		}).done(function (data) {
			// handle errors
			if (!data.success) {
				if (data.errors.name) {
					$('#name-field').addClass('has-error');
					$('#name-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.name + '</span>');
				}
				if (data.errors.email) {
					$('#email-field').addClass('has-error');
					$('#email-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.email + '</span>');
				}
				if (data.errors.number) {
					$('#number-field').addClass('has-error');
					$('#number-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.subject + '</span>');
				}
			} else {
				// display success message
				$form.html('<div class="message-success">' + data.message + '</div>');
			}
		}).fail(function (data) {
			// for debug
			// console.log(data);
		});
		e.preventDefault();
	});
}(jQuery, window, document));
/* 6. Select arrow
=======================================*/
$(document).on('click', function(event) {
	if ($(event.target).closest('.select-wrap').length)
		return;
	$('.select-wrap').removeClass('active');
	event.stopPropagation();
});
$('.select-wrap').on('click', 'select', function() {
	$('.select-wrap').toggleClass('active');
	return false;
});
/* 7. Map
=========================================*/
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: {lat: 37.720155, lng: -122.2118086},
		zoom: 13,
		scrollwheel: false,
		mapTypeControl: false
	});
	var image = '/static/img/point.png';
	var hotel = 'http://maps.google.com/mapfiles/ms/micons/lodging.png';

	var ceremonyString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Ceremony & Reception:</h4>'+
      '<div id="bodyContent">'+
      '<p>Fairview Metropolitan at the Metropolitan Golf course <br>'+
      '<a href="https://www.google.com/maps/place/Fairview+Metropolitan/@37.720364,-122.193325,15z/data=!4m5!3m4!1s0x0:0x29c2a787b1a62845!8m2!3d37.720364!4d-122.193325">10051 Doolittle Dr., <br>Oakland, CA 94603</a>'+
      '</p>'+
      '</div>'+
      '</div>';

	  var cerermonyinfowindow = new google.maps.InfoWindow({
	    content: ceremonyString
	  });

	  var cerermonyMarker = new google.maps.Marker({
			position: {lat: 37.720364, lng: -122.193325},
			map: map,
			icon: image,
			title:"Fairview Metropolitan",
		});

	  cerermonyMarker.addListener('click', function() {
	    comfortinfowindow.close();
	    holidayinfowindow.close();
	    qualityinfowindow.close();
	    cerermonyinfowindow.open(map, cerermonyMarker);
	  });

	  // Comfort Inn & Suites
	  var comfortString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Comfort Inn & Suites</h4>'+
      '<div id="bodyContent">'+
      '<p>8452 Edes Ave., <br>Oakland, CA 94621</a>'+
      '</p>'+
      '</div>'+
      '</div>';

	  var comfortinfowindow = new google.maps.InfoWindow({
	    content: comfortString
	  });

	  var comfortMarker = new google.maps.Marker({
			position: {lat: 37.740942, lng: -122.1963012},
			map: map,
			icon: hotel,
			title:"Comfort Inn & Suites",
		});

	  comfortMarker.addListener('click', function() {
	  	cerermonyinfowindow.close();
	  	holidayinfowindow.close();
	  	qualityinfowindow.close();
	    comfortinfowindow.open(map, comfortMarker);
	  });

	  // Holiday Inn
	  var holidayString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Holiday Inn Hotel & Suites</h4>'+
      '<div id="bodyContent">'+
      '<p>77 Hegenberger Rd,<br>Oakland, CA 94621<p>'+
      '</p>'+
      '</div>'+
      '</div>';

	  var holidayinfowindow = new google.maps.InfoWindow({
	    content: holidayString
	  });

	  var holidayMarker = new google.maps.Marker({
			position: {lat: 37.7292139, lng: -122.2013193},
			map: map,
			icon: hotel,
			title:"Holiday Inn & Suites",
		});

	  holidayMarker.addListener('click', function() {
	  	comfortinfowindow.close();
	  	cerermonyinfowindow.close();
	  	qualityinfowindow.close();
	    holidayinfowindow.open(map, holidayMarker);
	  });

	  // Quality Inn
	  var qualityString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Quality Inn</h4>'+
      '<div id="bodyContent">'+
      '<p>8471 Enterprise Way,<br>Oakland, CA 94621</p>'+
      '</p>'+
      '</div>'+
      '</div>';

	  var qualityinfowindow = new google.maps.InfoWindow({
	    content: qualityString
	  });

	  var qualityMarker = new google.maps.Marker({
			position: {lat: 37.7420362, lng: -122.1933108},
			map: map,
			icon: hotel,
			title:"Quality Inn",
		});

	  qualityMarker.addListener('click', function() {
	  	comfortinfowindow.close();
	  	cerermonyinfowindow.close();
	  	holidayinfowindow.close();
	    qualityinfowindow.open(map, holidayMarker);
	  });
}



