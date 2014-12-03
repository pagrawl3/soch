$(document).ready(function() {
	$('input.cta-input').focus();

	$('button.cta-button').on('click', subscribeUser);
	$('button.close-modal').on('click', hideModal);
	$('input.cta-input').on('keyup', function(e) {
		if (e.which == 13) subscribeUser();
	});

	$('html').on('keyup', function(e) {
		if (e.which == 27) hideModal();
	});
});

function subscribeUser() {
	var email = $('input.cta-input').val();
	$.post('/subscribe', {email : email}, function(data) {
		if (data.success === true)
			showModal(true, null);
		else
			showModal(false, data.error);
	});
	$('input.cta-input').val('');
}

function showModal(isSuccess, error) {
	if (isSuccess) {
		$('section.modal-window article.message.success').css('display', 'block');
		$('section.modal-window article.message.failure').css('display', 'none');
	} else {
		$('section.modal-window article.message.success').css('display', 'none');
		$('section.modal-window article.message.failure').css('display', 'block');
		$('section.modal-window article.message.failure p').html(error);
	}
	$('section.overlay').addClass('block');
	$('section.modal-window').addClass('visible');
}

function hideModal() {
	$('section.overlay').removeClass('block');
	$('section.modal-window').removeClass('visible');
	$('input.cta-input').focus();
}
window.typekitLoad('qis8mmx', function() {
	console.log('Typekit Loaded');
}, function() {
	console.log('Typekit could not be loaded');
})