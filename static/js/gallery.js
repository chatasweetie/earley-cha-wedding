'use strict';
/* 1. Loader */
$(window).on('load', function() {$('.loader').delay(600).fadeOut('slow');});
/* 2. init Masonry */
var $grid = $('.grid').masonry({
	itemSelector: '.grid-item',
	percentPosition: true,
	columnWidth: '.grid-sizer'
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
	$grid.masonry('layout');
});
//Isotope
var $gridIs = $('.grid').isotope({
	itemSelector: '.grid-item',
	layoutMode: 'masonry',
});
// bind filter button click
$('.filters-button-group').on( 'click', 'button', function() {
	var filterValue = $( this ).attr('data-filter');
	$gridIs.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
	var $buttonGroup = $( buttonGroup );
	$buttonGroup.on( 'click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
	});
});