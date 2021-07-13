$(document).ready(function() {
	
	/* scroll */
	
	$("a[href^='#']").click(function(){
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	/* timer */

	function update() {
		var Now = new Date(), Finish = new Date();
		Finish.setHours( 23);
		Finish.setMinutes( 59);
		Finish.setSeconds( 59);
		if( Now.getHours() === 23  &&  Now.getMinutes() === 59  &&  Now.getSeconds === 59) {
			Finish.setDate( Finish.getDate() + 1);
		}
		var sec = Math.floor( ( Finish.getTime() - Now.getTime()) / 1000);
		var hrs = Math.floor( sec / 3600);
		sec -= hrs * 3600;
		var min = Math.floor( sec / 60);
		sec -= min * 60;
		$(".timer .hours").html( pad(hrs));
		$(".timer .minutes").html( pad(min));
		$(".timer .seconds").html( pad(sec));
		setTimeout( update, 200);
	}
	function pad(s) {
		s = ("00"+s).substr(-2);
		return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
	}
	update();

	/* sliders */

	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		smartSpeed: 300,
		mouseDrag: false,
		pullDrag: false,
		dots: false,
		nav: true,
		navText: ""
	});


	/* validate form */

	$(".order_form").submit(function(){
		if ($(this).find("input[name='name']").val() == "" && $(this).find("input[name='phone']").val() == "") {
			alert("Введите Ваши имя и телефон");
			$(this).find("input[name='name']").focus();
			return false;
		}
		else if ($(this).find("input[name='name']").val() == "") {
			alert("Введите Ваше имя");
			$(this).find("input[name='name']").focus();
			return false;
		}
		else if ($(this).find("input[name='phone']").val() == "") {
			alert("Введите Ваш телефон");
			$(this).find("input[name='phone']").focus();
			return false;
		}
		return true;
	});

	/* popup cart */ 


	$('.js-button-order').click(function(event) {
		var selectedRole = $(this).parents('.my_row').data('role').replace(' ', '_');
		$('#selected-role').val(selectedRole);
		$('#selected-role option').removeAttr( "selected" )
		$('#selected-role option[value='+selectedRole+']').prop('selected', true);
		$("html, body").animate({scrollTop: $('#selected-role').offset().top+"px"});
		
	})

	$(".js-button-add").click(function() {
		var name = $(this).parent().find("input[name='name']").val();
		var phone = $(this).parent().find("input[name='phone']").val();
		var selectedRole = $(this).parents('.wrapper-row').data('role');
		var dop = $(this).parent().find("input[name='dop']").val();
		var zena = $(this).parent().find("input[name='zena']").val();
        if(dop!=null){selectedRole=dop}
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: {name: name, phone: phone, dop: selectedRole, zena: zena}
		}).done(function() {
			$.magnificPopup.open({
				items: {
					src: $('#add-basket1'),
				},
				type: 'inline'
			});
		});
		return false;
	});
});
