var currPg;
currPg = 0;
var  fl = document.getElementById('arrowRight');

var   fr = document.getElementById('arrowLeft');

window.totalpages
var logoutEl = document.getElementById('logout');
var helpEl = document.getElementById('help');
var feedbackEl = document.getElementById('feedback');
var tech = document.getElementById('tech');
var emailz = document.getElementById('emailz');


    TimeMe.setCurrentPageName(0);
    TimeMe.startTimer();
    window.ttdd ^= true;
    //window.controls.panUp(-25);




lastPg =oldLastPg= currPg;


// TimeMe.resetRecordedPageTime(lastPg);
// ... Now might be a good time to upload the time spent on the page to your server!
// ... load up new page
oldLastPg = lastPg;

TimeMe.setCurrentPageName(lastPg);
TimeMe.startTimer();
//fillstuff(window.lastPg)
window.setTimeout(window.checkit, 60);
maintext = document.getElementById('maintext');

$("#maintext").fadeIn("slow", function () {
});


window.setTimeout(fillstart, 2000);
makeToolTips();
window.onbeforeunload = function (event) { currPg = "pg" + window.bkbk.flippedleft;
    updatePgValue(TimeMe.getTimeOnCurrentPageInSeconds(), currPg, pgID);


}

window.setTimeout(window.startit, 6000);

function vidGrab(currPgNumNum,currVidNumNum) {
    window.videoshowing=0;

        app.hh=app.ww/2;



    if(!currPgNumNum){
        currPgNumNum=window.currPgNum;
    }

    currPg = "pg" + currPgNumNum;

    TimeMe.stopTimer();


    updatePgValue(TimeMe.getTimeOnCurrentPageInSeconds(), currPg, pgID);

    console.log("GRAB+++++++++"+currPgNumNum)
    var video  = document.getElementById("video");
//    var asd  = document.getElementById("img1");
    var canvas1 = document.createElement('canvas');
    var $canvas1=$(canvas1);
    canvas1.width  =  app.ww;   canvas1.height = app.hh;
    var ctx = canvas1.getContext('2d');
    $canvas1.css({
        height: app.hh+"px",
        width: app.ww+"px"
    });

    ctx.drawImage(video, 0, 0,app.ww,app.hh);

    var dataURL = canvas1.toDataURL();
    var iimmgg="img"+(currPgNumNum);

    //create img
    //var img = $nextItem;
    document.getElementById(iimmgg).setAttribute('src', dataURL);
    var	$video  = $(document.getElementById("video"));

    $($video).fadeOut(50, function () {
    })
    $("#maintext").fadeOut("slow", function () {
    })
}



function fillstart() {
    console.log("gpgp");
    $("#covermain").fadeOut("slow");
    fillstuff(0);
}
function makeToolTips() {
    new Opentip(helpEl, "klik hier voor de volgende pagina", {
        style: "dark",
        style: "dark",
        target: fl,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true




    });
    new Opentip(helpEl, "klik hier voor de vorige pagina", {
        style: "dark",
        target: fr,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true

    });
    new Opentip(helpEl, "Kies Nederlands", {
        style: "dark",
        target: nlnl,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true

    });
    new Opentip(helpEl, "Email jouw Dokter", {
        style: "dark",
        target: emailz,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true

    });
    new Opentip(helpEl, "Change Language to English", {
        style: "dark",
        target: enen,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true

    });
    new Opentip(helpEl, "Uitloggen", {
        style: "dark",
        target: logoutEl,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true

    });
    new Opentip(helpEl, "Ideeenbus, alles wat er beter kan aan deze app", {
        style: "dark",
        target: feedbackEl,
        tipJoint: "top",
        targetJoint: "bottom",
        containInViewport: true

    });
    /*new Opentip(helpEl, "Medewerker", {
     style: "dark",
     target: addPatientsEl,
     tipJoint: "right",
     targetJoint: "left",
     containInViewport: false

     });*/
    new Opentip(helpEl, "Werkt de app niet goed? Laat het ons weten!", {

        style: "dark",
        target: tech,
        tipJoint: "bottom",
        targetJoint: "top",
        containInViewport: true
    });


}

// add flip controls

// start rendering
emailz = document.getElementById('emailz');
var email = 'anne@broadbentmedical.com';
var subject = 'js email';
var body_message = 'js email';





emailz.addEventListener('click', function () {
    var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

    win = window.open(mailto_link, 'emailWindow');
    if (win && win.open && !win.closed) win.close();
});
