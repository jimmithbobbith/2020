var Avrotros = {},
	mobile = 769,
	addthis_config = '';

(function () {

	this.Init = function () {
		var self = this;
		this.ModalEffects(); // Fire lightbox
		this.initMobile(); //init mobile scripts
		this.sharekit();
//		this.npoBtn();
		this.externalLinkTheDirtyFix(); // init a external link fixer
		this.autoPlayCheck();
	};

	this.getCookie = function (name) {
		var a_all_cookies = document.cookie.split(';');
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false;

		for (i = 0; i < a_all_cookies.length; i++) {
			a_temp_cookie = a_all_cookies[i].split('=');
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			if (cookie_name == name) {
				b_cookie_found = true;
				if (a_temp_cookie.length > 1)
					cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));

				return cookie_value;
				break;
			}

			a_temp_cookie = null;
			cookie_name = '';
		}

		if (!b_cookie_found)
			return null;
	};


	this.setCookie = function (name, value, expiredays) {
		var exdate = new Date();

		if (expiredays != null)
			exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : '; expires=' + exdate.toGMTString()) + '; path=/';
	};

	this.autoPlayCheck = function () {
		if (window.location.hash == "#play" && typeof PlayMedia == 'function')PlayMedia();
	}

	// This is a dirty fix for the time being, to add target blank to a external link
	// Have to be fixed in the second fase !!!
	this.externalLinkTheDirtyFix = function () {
		$('a[data-htmlarea-external="1"]').each(function () {
			$(this).attr('target', '_blank');
		});
	}

	$('li.searchBox input[type=submit]').click(function (e) {
		if ($('li.searchBox input[type=search]').val() != "") {
			location.href = "/site/gemist/?search=" + $('li.searchBox input[type=search]').val().replace(/\W /g, '');
			e.preventDefault();
		}
	});

    // membership fix for items with extra contribution
    if ($("#membership").length > 0 && $("#membership input[name=extraContribution]").val() != "") {
        $(".extraContribution").replaceWith($("#membership input[name=extraContribution]").val());
        $(".titleShort").replaceWith($("#membership input[name=titleShort]").val());
        $(".extraprice").show();
        $(".normalprice").hide();
    }


	/* TO DO: autocomplete
	 $("li.searchBox .generalsearch input[type=search]").autocomplete({
	 source: function (request, response) {
	 $.getJSON("/typo3conf/ext/at_resources/Resources/Public/Php/AutoComplete.php", { search: $('li.searchBox .generalsearch :input').val() }
	 , function(result){
	 response(result);
	 });
	 },
	 minLength: 1,
	 delay: 100,
	 select: function(event, ui) {
	 }
	 });
	 */

	//load npo btn
	this.npoBtn = function () {
		var self = this,
			url = '//assets.www.npo.nl/assets/widget.js';

		// widget.js checks for https protocol
		if (window.location.protocol == "https:") {
			url = 'https:' + url;
		}

		$.getScript(url, function () {

		}).done(function (script, textStatus) {
			//do something with s
		}).fail(function (jqxhr, settings, exception) {
			//something wrong
		});
	};

	//sharekit
	this.sharekit = function () {
		var self = this,
			objShareKit = $('.sharekit');

		//exist sharekit
		if (objShareKit.length > 0) {
			addthis_config = {
				"ui_use_css": false,
				"data_track_clickback": false,
				"data_track_addressbar": false,
				ui_language: "nl"
			};

			//check cookie allowed sharekit
			if (self.allowCoockieFor('social')) {
				$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=avro', function () {
					var url = "http://api-public.addthis.com/url/shares.json?url=" + window.location.href + "&callback=?";

					$.getJSON(url, function (data) {
						//show count shares
						objShareKit.children('h1').append('<span class="count">' + data.shares + '</span>');

					});
				});

			} else {
				objShareKit
					.addClass('cookiefalse')
					.html('<p class="npo_cc_header">Sociale media geblokkeerd</p><a class="npo_cc_settings btn" href="http://cookiesv2.publiekeomroep.nl">Ga naar de cookie-instellingen</a>');
			}
		}
	};

	//Cookie check
	this.allowCoockieFor = function (type) {
		if (typeof (npo_cookies) == "undefined")
			return true;

		return typeof (npo_cookies) == "object" && npo_cookies.has_permission(type);
	};

	//mobileInit
	this.initMobile = function () {
		var self = this;
		//screenWidth = $('body').width();

		if ($('#AvrotrosNav .navigation>h1:visible').length) {
			//if(screenWidth < mobile) {
			this.getFooterItems();
			this.getPipNavItems();
			this.setMobileNav();
		}

		//activate search
		//if($('#AvrotrosNav .searchBox > h2:visible').length) {
		$('#AvrotrosNav .searchBox h2').on('touchend, click', function (e) {
			$('#AvrotrosNav .searchBox form, #AvrotrosNav .searchBox h2 ').toggleClass('active');
		});
		//}

	}


	this.getPipNavItems = function () {
		var self = this,
			obj = $('#PipNav');

		if (obj.length) {
			$('#AvrotrosNav').addClass('menu--pipFirst');

			$('#PipNav .navigation>h1').on('touchend, click', function () {
				$(this).toggleClass('active');
				$('#PipNav .navigation > ul').toggleClass('active');
			});
		}
	};

	//get PipNav items
	/*
	 this.getPipNavItems = function() {
	 var self = this,
	 obj = $('#PipNav nav > ul');

	 if(obj.length > 0) {
	 $('#AvrotrosNav .navigation > ul > li.current')
	 .addClass('has-subnav active')
	 .append(obj)
	 .children('ul')
	 .addClass('subnav');
	 }
	 }
	 */

	//get Footer items and place in mobileNav
	this.getFooterItems = function () {
		var self = this,
			obj = $('#FooterNav');

		$('#AvrotrosNav .navigation')
			.children('ul')
			.append('<li class="footerMenu" />')
			.children('.footerMenu')
			.html(obj);
	};

	//activate mobile navigation
	this.setMobileNav = function () {
		var self = this,
			navMenu = $('#AvrotrosNav .navigation');

		//place navigation
		$('<nav class="navigation central--nav" />').append(navMenu.children('ul')).appendTo('body');

		navMenu.children('h1').on('touchend, click', function () {
			var obj = $(this);
			obj.toggleClass('active');
			$('body').toggleClass('nav--active');
		});
	};

	// MD Modal
	this.ModalEffects = function () {
		var $overlay = $('.md-overlay'),
			$container = $('.page'),
			$trigger = $('.md-trigger');

		$trigger.each(function () {
			var self = $(this),
				$modal = $('#' + self.data('modal')),
				$close = $modal.find('.md-close');

			function removeModal() {
				$modal.removeClass('md-show');
				$overlay.unbind('click', removeModal);
			}

			self.bind('click', function (ev) {
				$modal.addClass('md-show');
				$overlay.unbind('click', removeModal);
				$overlay.bind('click', removeModal);
				$(document).unbind('keyup', removeModal);
				ev.preventDefault();
			});

			$close.bind('click', function (ev) {
				ev.stopPropagation();
				removeModal();
			});

			// Press esc to close modal
			$(document).keyup(function (ev) {
				if (ev.keyCode == 27) removeModal();
			});
		});
	};

	this.showModal = function (id) {
		var $modal = $('#' + id),
			$close = $modal.find('.md-close'),
			$overlay = $('.md-overlay');

		$modal.addClass('md-show');
		$overlay.unbind('click', removeModal);
		$overlay.bind('click', removeModal);
		$(document).unbind('keyup', removeModal);

		function removeModal() {
			$modal.removeClass('md-show');
			$overlay.unbind('click', removeModal);
		}

		$close.bind('click', function (ev) {
			ev.stopPropagation();
			removeModal();
		});

		// Press esc to close modal
		$(document).keyup(function (ev) {
			if (ev.keyCode == 27) removeModal();
		});
	};

	this.closeModal = function (id) {
		var $modal = $('#' + id),
			$close = $modal.find('.md-close'),
			$overlay = $('.md-overlay');

		$modal.addClass('md-show');
		$overlay.unbind('click', removeModal);
		$overlay.bind('click', removeModal);
		$(document).unbind('keyup', removeModal);

		function removeModal() {
			$modal.removeClass('md-show');
			$overlay.unbind('click', removeModal);
		}

		$close.bind('click', function (ev) {
			ev.stopPropagation();
			removeModal();
		});

		// Press esc to close modal
		$(document).keyup(function (ev) {
			if (ev.keyCode == 27) removeModal();
		});

		removeModal();
	};

	/*
	 this.unCryptMail = function() {
	 function UnCryptMailto(s) {
	 var n = 0;
	 var r = "";
	 for(var i = 0; i < s.length; i++) {
	 n = s.charCodeAt( i );
	 if( n >= 8364 ) {
	 n = 128;
	 }
	 r += String.fromCharCode( n - 1 );
	 }
	 return r;
	 }
	 function linkTo_UnCryptMailto(s) {
	 location.href = UnCryptMailto(s);
	 }
	 };
	 */
}).apply(Avrotros);


// decrypt helper function
function decryptCharcode(n, start, end, offset) {
	n = n + offset;
	if (offset > 0 && n > end) {
		n = start + (n - end - 1);
	} else if (offset < 0 && n < start) {
		n = end - (start - n - 1);
	}
	return String.fromCharCode(n);
}
// decrypt string
function decryptString(enc, offset) {
	var dec = "";
	var len = enc.length;
	for (var i = 0; i < len; i++) {
		var n = enc.charCodeAt(i);
		if (n >= 0x2B && n <= 0x3A) {
			dec += decryptCharcode(n, 0x2B, 0x3A, offset);	// 0-9 . , - + / :
		} else if (n >= 0x40 && n <= 0x5A) {
			dec += decryptCharcode(n, 0x40, 0x5A, offset);	// A-Z @
		} else if (n >= 0x61 && n <= 0x7A) {
			dec += decryptCharcode(n, 0x61, 0x7A, offset);	// a-z
		} else {
			dec += enc.charAt(i);
		}
	}
	return dec;
}
// decrypt spam-protected emails
function linkTo_UnCryptMailto(s) {
	location.href = decryptString(s, 2);
}

function getParameters(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function ($) {
	Avrotros.Init();

	//var date = new Date();
	//if( !(date.getFullYear() == 2014 && date.getMonth() == 10 && date.getDate() == 28 ) )
	//	return;
	//var giro555popup = Avrotros.getCookie('AT-giro555');
	//if (giro555popup < 3) {
	//	giro555popup++;
	//	Avrotros.setCookie('AT-giro555', giro555popup, {path: '/'});
	//	Avrotros.showModal('modal-ebola');
	//}
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth()+1;
    /*
     AAN: 15-10-2015
     UIT: 16-10-2015
     */
    if (day == 15 && month == 10) {
        $('.logo').css("background","url('//static.avrotros.nl/Graphics/Avrotros/2014/AvrotrosNav/logo--v-GOUD.png') left center no-repeat");
        $('.logo').css("background-size", "100% auto");
    }




// DMD subscribe
	$('.dmd').submit(function(e) {
		//console.log( $(this) );

		var $sFormClass = $(this).attr('class');
		//console.log($sFormClass);

		var $aInputFields = $(this).children(":input");
		var aForm = {};
		$aInputFields.each(function() {
			aForm[this.name] = $(this).val();
		});
		var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (aForm['dmdemail'] != '' && filter.test(aForm['dmdemail']) != false && aForm['cid'] != '') {
			//console.log('in the IF');

			var sDMDparams = {
				cid: aForm['cid'],
				dmdemail: aForm['dmdemail'],
				action: aForm['action']
			};

			$.ajax({
				url: "/index.php?eID=dmd_inject",
				data: sDMDparams
			})
				.done(function(status) {
					//console.log( status );
					switch(status) {
						case "success":
							$("#NewsletterThanksModal h1").text("Bedankt!");
							$("#NewsletterThanksModal .block-text").text("We hebben een mail gestuurd om je abonnement op deze nieuwsbrief te bevestigen.");
							Avrotros.showModal('NewsletterThanksModal');
							if ($sFormClass == 'dmd-footer') {
								Avrotros.closeModal('NewsletterSignupModal');
							}
							$("#NewsletterThanksModal h1").text("Bedankt!");
							$("#NewsletterThanksModal .block-text").text("We hebben een mail gestuurd om je abonnement op deze nieuwsbrief te bevestigen.");
							Avrotros.showModal('NewsletterThanksModal');
							$("#NewsletterThanksModal h1").text("Bedankt!");
							$("#NewsletterThanksModal .block-text").text("We hebben een mail gestuurd waarmee je je inschrijving op de AVROTROS nieuwsbrief kunt bevestigen. Let op: indien je geen bevestigingsmail in jouw inbox ontvangt, is deze misschien in de junk/spambox terechtgekomen.");
							Avrotros.showModal('NewsletterThanksModal');
							break;
						case "duplicate":
							if ($sFormClass == 'dmd') {
								$("#NewsletterThanksModal h1").text("Oeps...");
								$("#NewsletterThanksModal .block-text").text("Met dit e-mailadres ben je al op deze nieuwsbrief geabonneerd.");
								Avrotros.showModal('NewsletterThanksModal');
							} else if ($sFormClass == 'dmd-footer') {
								//console.log('dmd footer duplicate');
								$('.dmd-footer')
									.before("<p class=\"block-text error\">Met dit e-mailadres ben je al op deze nieuwsbrief geabonneerd.</p>");
							}
							break;
						case "error":
							if ($sFormClass == 'dmd') {
								$("#NewsletterThanksModal h1").text("Helaas...");
								$("#NewsletterThanksModal .block-text").text("Er is iets foutgegaan. Controleer je e-mailadres en probeer het nogmaals.");
								Avrotros.showModal('NewsletterThanksModal');
							} else if ($sFormClass == 'dmd-footer') {
								//console.log('dmd footer error');
								$('.dmd-footer')
									.before("<p class=\"block-text error\">Er is iets foutgegaan. Controleer je e-mailadres en probeer het nogmaals.</p>");
							}
							break;
					}
				});
		}
		e.preventDefault();
	});

	// DMD subscribe
	$('.dmd-footer').children('input[type="submit"]').click(function(e) {
		//console.log( $(this) );

		var $sFormClass = $(this).parent().attr('class');
		//console.log($sFormClass);

		var $aInputFields = $(this).parent().children(":input");
		var aForm = {};
		$aInputFields.each(function() {
			aForm[this.name] = $(this).val();
		});
		var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (aForm['dmdemail'] != '' && filter.test(aForm['dmdemail']) != false && aForm['cid'] != '') {
			//console.log('in the IF');

			var sDMDparams = {
				cid: aForm['cid'],
				dmdemail: aForm['dmdemail'],
				action: aForm['action']
			};

			$.ajax({
				url: "/index.php?eID=dmd_inject",
				data: sDMDparams
			})
				.done(function(status) {
					//console.log( status );
					switch(status) {
						case "success":
							$("#NewsletterThanksModal h1").text("Bedankt!");
							$("#NewsletterThanksModal .block-text").text("We hebben een mail gestuurd om je abonnement op deze nieuwsbrief te bevestigen.");
							Avrotros.showModal('NewsletterThanksModal');
							if ($sFormClass == 'dmd-footer') {
								Avrotros.closeModal('NewsletterSignupModal');
							}
							$("#NewsletterThanksModal h1").text("Bedankt!");
							$("#NewsletterThanksModal .block-text").text("We hebben een mail gestuurd om je abonnement op deze nieuwsbrief te bevestigen.");
							Avrotros.showModal('NewsletterThanksModal');
							$("#NewsletterThanksModal h1").text("Bedankt!");
                            $("#NewsletterThanksModal .block-text").text("We hebben een mail gestuurd waarmee je je inschrijving op de AVROTROS nieuwsbrief kunt bevestigen. Let op: indien je geen bevestigingsmail in jouw inbox ontvangt, is deze misschien in de junk/spambox terechtgekomen.");
							Avrotros.showModal('NewsletterThanksModal');
							break;
						case "duplicate":
							if ($sFormClass == 'dmd') {
								$("#NewsletterThanksModal h1").text("Oeps...");
								$("#NewsletterThanksModal .block-text").text("Met dit e-mailadres ben je al op deze nieuwsbrief geabonneerd.");
								Avrotros.showModal('NewsletterThanksModal');
							} else if ($sFormClass == 'dmd-footer') {
								//console.log('dmd footer duplicate');
								$('.dmd-footer')
									.before("<p class=\"block-text error\">Met dit e-mailadres ben je al op deze nieuwsbrief geabonneerd.</p>");
							}
							break;
						case "error":
							if ($sFormClass == 'dmd') {
								$("#NewsletterThanksModal h1").text("Helaas...");
								$("#NewsletterThanksModal .block-text").text("Er is iets foutgegaan. Controleer je e-mailadres en probeer het nogmaals.");
								Avrotros.showModal('NewsletterThanksModal');
							} else if ($sFormClass == 'dmd-footer') {
								//console.log('dmd footer error');
								$('.dmd-footer')
									.before("<p class=\"block-text error\">Er is iets foutgegaan. Controleer je e-mailadres en probeer het nogmaals.</p>");
							}
							break;
					}
				});
		}
		e.preventDefault();
	});

});