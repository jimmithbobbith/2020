window.signPage = 14;
window.currPgNum = 0;
window.nlnl = true;
window.language = "nl";
mt_title = document.getElementById('mt_title');
mt_subheader = document.getElementById('mt_subheader');
mt_paragraph1 = document.getElementById('mt_paragraph1');
mt_paragraph2 = document.getElementById('mt_paragraph2');
function fillstuff(pindexx) {
    console.log(pindexx);

    if (!pindexx) {
        pindexx = window.currPgNum;
    }

    var fl = document.getElementById('arrowRight');

    var fr = document.getElementById('arrowLeft');

    if (pindexx == window.totalpages - 1) {
        $(fl).hide();
    }
    if (pindexx == 0) {
        $(fr).hide();

    }
    if ((pindexx != window.totalpages - 1) && (pindexx != 0)) {
        $(fr).show();

        $(fl).show();
    }


    if (pindexx == window.signPage) {
        if (window.signed != 1) {

            window.signed = 1
            showSign()
        }


    }

    console.log(pindexx);
    var language = window.language;
    $(mt_title).html(pgs[pindexx].lang_title[language]);
    $(mt_subheader).html(pgs[pindexx].lang_subheader[language]);
    $(mt_paragraph1).html(pgs[pindexx].lang_paragraph1[language]);
    $(mt_paragraph2).html(pgs[pindexx].lang_paragraph2[language]);
}
// add flip controls

nlnl = document.getElementById('langNL');
nlnl.addEventListener('click', function () {
    window.language = "nl";
    fillstuff();
});

enen = document.getElementById('langEN');
enen.addEventListener('click', function () {
    window.language = "en";
    fillstuff();
});

