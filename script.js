$(document).ready(function() {
	$('.project-list li').click(function() {
		$(this).find('.project-details').slideToggle();
	});
});