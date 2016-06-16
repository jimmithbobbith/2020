var Footer = {};

(function() {

	this.InitFooter = function () {
		this.positionFooter();
		this.objContainer = $('#FooterNav');
		this.overlayHtml = $('<div class="overlay" />');
		this.footerControl(this.objContainer);


	};

	this.positionFooter = function () {
		var self = this,
			obj= $('body > .footer');
			docHeight=$(window).height(),
			footerHeight = obj.offset().top+obj.height();

		if(docHeight > footerHeight) {
			// obj.css('position','absolute');
		}

	};

	this.footerControl = function(obj) {
		var self = this,
			items = obj.children('.has-subnav');

		items.children('a').on('click', function(e) {
			var item=$(this).parent();

			if(item.hasClass('active')) {
				self.removeSubNav(item);
			} else {
				if(items.hasClass('active')) {

					self.removeSubNav(items);
				}
				self.placeSubNav(item);
			}

			e.preventDefault();
		});
	};

	this.placeSubNav = function(obj) {
		var self=this;

		obj
			.append(self.overlayHtml)
			.addClass('active')
			.children('.overlay')
			.bind('click',function(){
				var obj = $(this).parent();

				self.removeSubNav(obj);
			});

		$('body > section, body > div, body > header, body > article').addClass('blur'); //set blur effect
		$('body > footer.footer').addClass('fixed'); //make footer fixed better for detailpage
	}

	this.removeSubNav = function(obj) {
		obj.removeClass('active').children('.overlay').remove();
		$('.blur').removeClass('blur'); //remove blur effect
		$('body > footer.footer').removeClass('fixed'); //remove fixed position
	}

}).apply(Footer);

$(document).ready(function($) {
	Footer.InitFooter();
});
