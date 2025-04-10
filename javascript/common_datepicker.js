$(function() {
	//init_datepicker();
});

function init_datepicker() {
	//
	$(".datepicker").datepicker({
		changeMonth: true,
		yearRange : "-100:+10",
	    changeYear: true
	});
	
	// mask date input
	
	$(".datepicker").mask("9999/99/99", {
		placeholder : "yyyy/mm/dd"
	});
	
	
	$(".datepicker_button").datepicker({
		showOn : "both",
		buttonImage : "../html/images/icon02.gif",
		buttonImageOnly : false,
		buttonText : "隢�����",
		onSelect : function() {
		}
	});
	
	$(".datepicker_button").mask("9999/99/99", {
		placeholder : "yyyy/mm/dd"
	});
	
	$(".multiDatepicker").multiDatesPicker({
		showOn : "both",
		buttonImage : "../html/images/icon02.gif"
	});
	
	
	$('.datetimepicker').datetimepicker({
		stepMinute: 5,
		controlType: 'select',
		oneLine: true,
		timeFormat: 'HH:mm',
	}); 
	
	$('.timepicker').timepicker({
		stepMinute: 5,
		controlType: 'select',
		oneLine: true,
		defaultValue:'08:00',
	}); 
	
}