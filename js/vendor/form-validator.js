(function(){

	//Serialize plugin
	$.fn.serializeForm = function(){
		//Za pomoca filtra find, znajdujemy wszystkie kontrolki
		var inputs = this.find(':input');
		var serializedData = {};//pusta tablica

		//Funkcja each
		inputs.each(function(index,item){
			var item = $(item),
				type = item.attr('type'),
				name = item.attr('name');

			if(typeof name =='undefined') {
				return;
			}

			if('checkbox'==type) {
				if(typeof serializedData[name]=='undefined') {
					serializedData[name]=[];
				}

				if(item.is(':checked')) {
					serializedData[name].push(item.val());
				}
			}else if('radio'==type){
				if(item.is(':checked')) {
					serializedData[name] = item.val();
				}else {
					serializedData[name] = null;
				}
			}else {
				serializedData[name] = item.val();
			}
		});

		return serializedData;
	};

	/*Clear fields after submission plugin*/
	$.fn.clearForm = function(){
		this.find('[type="text"],[type="email"],textarea').val('');
		this.find('option').removeAttr('selected');
		this.find('[type="checkbox"]').removeAttr('checked');
	};

	//Form validation
	var contactForm = $("#contact-form"),
		contactFormValidator = contactForm.validate({

			rules:{
				FirstName:{
					required:true,
					/*alphanumeric:true,*/
					rangelength:[2,50]
				},

				email:{
					required:true,
					email:true
				},

				tel:{
					required:true,
					phoneUK:true
				},

				message:{
					required:true,
					rangelength:[10,1000]
				}
			},

			messages:{
				FirstName:{
					required:"Upps, You forgot your name pal",
					rangelength:"I am sure your name is longer :)"
				},


				email:{
					required:"I need to know your email!",
					email:"Oh no!, Wrong format ;)"
				},

				tel:{
					required:"Let me call you please"
				},

				message:{
					required:"Tell me your story",
					rangelength:"You have lots of characters starting from 2 ending on 1000"
				}
			},

			submitHandler: function(form){

				var $preloader = $("#contact-form-preloader"),
					sendBtn = $("#contact-form .btn-send");

					if ($preloader.is(':visible')) return;

			        $preloader.show();
			        //zmiana stylu przycisku na zablokowany
			        sendBtn.addClass('disable-state');

        			var $form = $(form);

				var data = $(form).serializeForm(),
					url = $(form).attr("action"),
					method = $(form).attr("method");

					var successFn = function(response) {
						//Uruchamiamy funkcje gdy serwer zwroci odp

						$preloader.hide();
			          	//zmiana stylu przycisku na domyslny (aktywny)
			          	sendBtn.removeClass('disable-state');

						//Obsluga odpowiedzi z serwera w zaleznosci czy sa bledy czy sukces
						if(response.status=="validation-error") {
							contactFormValidator.showErrors(response.errors);
						}else if(response.status=="success") {
							$form.clearForm();//jezeli nie ma bledow "czysc forma"

							 $.magnificPopup.open({
							 	 items:{
							 	 	src: '<div class="message-popup"><h2>You message has been sent!</h2></div>',
					                type: 'inline',
					                removalDelay: 160,
					                preloader: true,
							 	 }
							 });
						}
					};

					//Wysylanie zadania do serwera
					$.ajax({
						type:method,
						url:url,
						data:data,
						success:successFn,
						dataType:'json'
					});

					return false;
			},

			errorPlacement:function(error,element) {
				if(element.is(":radio") || element.is(":checkbox")) {
					error.appendTo(element.parent());
				}else {
					error.insertAfter(element);
				}
			}

		});//end of falidate function



	//Custom validation function
	jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^\w+$/i.test(value);
}, "What a weird character pal ;)");

    jQuery.validator.addMethod('phoneUK', function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, '');

        return this.optional(element) || phone_number.match(/^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/);
           }, 'Please make sure you are using UKs numbers'
        );
	
})();