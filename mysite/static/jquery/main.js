$(function() {
    $('input[type="checkbox"].check-change').change(function(event) {
    var value = $(this).is(':checked') ? '1' : '0';
    	$(this).val(value)
    });

 	var nowTemp = new Date();
 	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

 	// datepickers
 	var checkin = $('#booking_date_from').datepicker({
		format: 'yyyy-mm-dd',
		onRender: function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(event) {
		if ( event.date.valueOf() > checkout.date.valueOf() ) {
			var newDate = new Date(event.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.setValue(newDate);
		}
		checkin.hide();
		if( $('#booking_date_to').is(':visible') ) {
			$('#booking_date_to')[0].focus();
		}
	}).data('datepicker');
	var checkout = $('#booking_date_to').datepicker({
		format: 'yyyy-mm-dd',
		onRender: function(date) {
	    	return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
	    }
	}).on('changeDate', function(event) {
		checkout.hide();
	}).data('datepicker');

    // disable keyoard on mobile devices
    $('#booking_date_from').focus( function(event) {
    	$(this).attr('readonly', 'readonly');
    	$(this).attr('disabled', 'true');

    	setTimeout( function() {
    		$('#booking_date_from').blur();
	        $('#booking_date_from').removeAttr('readonly');
	        $('#booking_date_from').removeAttr('disabled');
	    }, 100);

    	$('#booking_date_from').datepicker('place');
    } );
    $('#booking_date_to').focus( function(event) {
    	$(this).attr('readonly', 'readonly');
    	$(this).attr('disabled', 'true');

    	setTimeout( function() {
    		$('#booking_date_to').blur();
	        $('#booking_date_to').removeAttr('readonly');
	        $('#booking_date_to').removeAttr('disabled');
	    }, 100);

    	$('#booking_date_to').datepicker('place');
    } );
 });
$('#booking_date_to').datepicker('hide');
$('#booking_date_from').datepicker('hide');

function showMenu(obj) {
	var menu = $('#main_menu');
	if( menu.is(':visible') ) {
		menu.hide();
	} else {
		menu.show();
	}
	return false;
}

function checkBus(obj) {
	var table = $(obj).closest('table');
	var checker = $(obj);
	var row = checker.closest('tr');
	table.find('tr').removeClass('selected');
	row.addClass('selected');
	return false;
}



function modalPosition() {
	var modalMain = $('#modal_main');
	var modalOverlay = $('#modal_overlay');
	var _clientWidth = (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);
	var _clientHeight = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);
	var _scrollHeight = (document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight);
	var _scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	var _overlayHeight = (_scrollHeight < _clientHeight ? _clientHeight : _scrollHeight);
	var _top = (_clientHeight - modalMain.height())/2 + _scrollTop;
	if( _top < 0 ){ _top = 12 }
	modalMain.css({'top': _top+'px'});
	modalOverlay.css({'height': _overlayHeight+'px'});
}
function modal(visible) {
	if( visible == true ) {
		$('#modal').show();
		modalPosition();
	} else {
		$('#modal').hide();
	}
	return false;
}

$('#scheduletable tr').click(function() {
    $(this).find('td input:radio').prop('checked', true);
})
