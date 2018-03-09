(function($){

	$.fadePage = function(param) {
		// Tablica asocjacyjna zawierajaca rozne wartosci
		var defaults = {

			action:'fadein',
			opacity:0.6,
			color:'#000',
			zindex:200,
			speed:200,
			effect:'linear',
			onclick:function(){},
			complete:function(){}
		};

		// Extend to metoda globalna jquery
		var options = $.extend(defaults, param);
		// Warunek jaka akcje wykonukemy - jezeli fadein to:
		if(options.action=='fadein') {
			var $fader = $('<div>')
				.attr('class', 'MyPageFaderLayer')
				.css({

					'opacity': options.opacity,
					'width':$(document).width(),
					'height': $(document).height(),
					'background-color': options.color,
					'position': 'fixed',
					'left': '0px',
					'top': '0px',
					'z-index': options.zindex,
					'cursor': 'pointer',
					'display': 'none'
				})
					.click(options.onclick)
						.appendTo($('body'))
						.fadeIn(options.speed, options.effect, options.complete);
		}else if (options.action=='fadeout') {
			$('div.MyPageFaderLayer')
				.fadeOut(options.speed, options.effect, function(){
					$(this).unbind('click').remove();
				});
		}

	};
	
})(jQuery);