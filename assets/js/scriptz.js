$(function () {
    var form = $('#login-register');

    window.checkfail = 0;

    window.emailz = form.find('input');

    var domains = ['hotmail.com', 'gmail.com', 'aol.com', "xs4all.nl", "ziggo.nl"];
    var topLevelDomains = ["com", "net", "org", "nl"];
    var patientLoginAddress = "patientLogin@demo.com";
    var doctorLoginAddress = "doctorLogin@demo.com";

    keyupFunction = function () {
        console.log("event ", event);
        console.log("this ", $(this));
        $('#email').mailcheck({
            domains: domains,                       // optional
            topLevelDomains: topLevelDomains,       // optional
            suggested: function (element, suggestion) {

                // callback code
                console.log("suggestion ", suggestion.full);
                $('#suggestion').html("Did you mean <b><i>" + suggestion.full + "</b></i>?");
                $('#suggestion').mousedown(function () {
                    $(window.emailz).val(suggestion.full)
                });
                $('#patientLogin').mousedown(function () {
                    $(window.emailz).val(patientLoginAddress)
                });
                $('#doctorLogin').mousedown(function () {
                    $(window.emailz).val(doctorLoginAddress)
                });
            },
            empty: function (element) {

                // callback code
                $('#suggestion').html('...');
            }
        });


    }
    $('#patientLogin').mousedown(function () {
        $(window.emailz).val(patientLoginAddress)
    });
    $('#doctorLogin').mousedown(function () {
        $(window.emailz).val(doctorLoginAddress)
    });
    form.on('submit', function (e) {


        if (form.is('.loading, .loggedIn')) {
            return false;
        }
        var email = form.find('input').val(),
            messageHolder = form.find('span');

        e.preventDefault();

        $.post(this.action, {email: email}, function (m) {

            if (m.error) {
                console.log("loging error ");
                form.addClass('error');
                messageHolder.html(m.message);
            }
            else {
                console.log("loging Good");

                form.removeClass('error').addClass('loggedIn');
                messageHolder.html(m.message);
            }
        })

    });
});


$(document).ajaxStart(function () {
    var form = $('#login-register');

    form.addClass('loading');
});

$(document).ajaxComplete(function () {
    var form = $('#login-register');

    form.removeClass('loading');
});
