$(document).ready(funtion(){
	$(window).scroll(funtion(){
		if( $(this).scrollTop() > 0 ) {
			$('header').addClass('header2');
		} else {
			$('header').removeClass('header2');
		}
	});
});