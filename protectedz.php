<?php
// To protect any php page on your site, include main.php
// and create a new User object. It's that simple!

require_once 'includes/main.php';

$user = new User();

if(!$user->loggedIn()){
	redirect('index.php');
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!DOCTYPE html>
<html visibility="hidden" lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

    <title>Diak 2016</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="assets/css/opentip.css">
    <link rel="stylesheet" type="text/css" href="css/normalize1.css" />
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/component.css" />

    <script src="js/modernizr.custom.js"></script>


    <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
    <script src="js/jquery-2.0.3.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/jquery-migrate-1.2.1.js"></script>
    <script src="js/jquery.ba-throttle-debounce.js"></script>
    <script src="assets/js/opentip-jquery.js"></script>
    <script src="assets/js/jquery.magnific-popup.js"></script>

    <?php include("phpPG.php");

    echo "<script> window.userEmail='",$user->email,"'</script>";
    ?>


    <script src="js/ifvisible.js"></script>
    <script type='text/javascript'>
        <?php
        $js_array = $user->getpg();
        $js_pgID =$user->getID();
        echo "var pgID=  ". $js_pgID . ";window.javascript_array=javascript_array = ". $js_array . ";\n";
        ?>
    </script>
    <script src="js/timeme.js"></script">
    <script type="text/javascript">
        TimeMe.setIdleDurationInSeconds(30);
        TimeMe.setCurrentPageName(0);
        TimeMe.initialize();
    </script>
    <script src="jsfb/three.js"></script>
    <script src="js/OrbitControls.js"></script>
    <script src="jsfb/mod3.bundle.js"></script>
    <script src="jsfb/Tween.js"></script>

    <script src="jsfb/FlipBook3D.js"></script>
    <script src="jsfb/FlipBook3DApplication.js"></script>
    <script src="js/ifvisible.js"></script>
    <script src="js/editablegrid-2.1.0-b25.js"></script>
    <script src="js/jquery-1.11.1.min.js" ></script>
    <!-- EditableGrid test if jQuery UI is present. If present, a datepicker is automatically used for date type -->
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
    <script src="js/demo.js" ></script>



</head>

<body>
<div id="covermain" >

    <p>Loading <?php echo $user->email ?></p>

</div>
<!--
Alternative markup with data-mfp-src attribute:
<a href="mobile-friendly-page.html" data-mfp-src="#test-popup" class="open-popup-link">Show inline popup</a>
-->

<!-- Popup itself -->


<div style="display:none">
    <!-- load images here -->
    <img src="assets/img/nu_01.jpg" id="1f" />
    <img src="assets/img/nu_02.jpg" id="1b" />
    <img src="assets/img/nu_03.jpg" id="2f" />
    <img src="assets/img/nu_04.jpg" id="2b" />
    <img src="assets/img/nu_05.jpg" id="3f" />
    <img src="assets/img/nu_06.jpg" id="3b" />
    <img src="assets/img/nu_07.jpg" id="4f" />
    <img src="assets/img/nu_08.jpg" id="4b" />
    <img src="assets/img/nu_09.jpg" id="5f" />
    <img src="assets/img/nu_10.jpg" id="5b" />
    <img src="assets/img/nu_11.jpg" id="6f" />
    <img src="assets/img/nu_12.jpg" id="6b" />
    <img src="assets/img/nu_13.jpg" id="7f" />
    <img src="assets/img/nu_14.jpg" id="7b" />
    <img src="assets/img/nu_15.jpg" id="8f" />
    <img src="assets/img/nu_16.jpg" id="8b" />
    <img src="assets/img/nu_17.jpg" id="9f" />
    <img src="assets/img/nu_18.jpg" id="9b" />
    <img src="assets/img/nu_19.jpg" id="10f" />
    <img src="assets/img/nu_20.jpg" id="10b" />
    <img src="assets/img/nu_19.jpg" id="11f" />
    <img src="assets/img/nu_20.jpg" id="11b" />
</div>

<div id="controls" style="position:absolute;z-index:1000">
    <div id="langEN" class="lang langEN"><img src="assets/langEN.jpg" alt="langEN"></div>
    <div id="langNL" class="lang langNL"><img src="assets/langNL.jpg" alt="langNL"></div>
    <div id="addpatient" class="lang logout logout-button">
        <a href="index.php?adm=1"><img src="assets/addpatient.jpg" alt="addpatient"></a></div>
    <div id="feedback" class="lang feedback feedback-button"><img src="assets/feedback.jpg" alt="feedback"></a></div>
    <div id="help" class="lang feedback help-button"><img src="assets/help.jpg" alt="help"></a></div>
    <div id="tech" class="technicalEl  feedback-btn"><img src="assets/blank.jpg" alt="help"></a></div>

<div id="logout" class="lang logout logout-button"><a href="index.php?logout=1"><img src="assets/logout.jpg" alt="logout"></a></div></div>
<div id="arrowLeft" class="arrow arrowLeft"><img src="assets/arrowLeft.png" alt="arrowLeft"></div>
<div id="arrowRight" class="arrow arrowRight"><img src="assets/arrowRight.png" alt="arrowRight"></div>

<div id="container" style="position:relative;margin:0 auto;padding:0;z-index:0;cursor:pointer;"></div>

<script>//<![CDATA[

    var baseUrl = location.href.split(/#|\?/)[ 0 ];


    FlipBook3DApplication.init([
        {f:document.getElementById('1f').src, b:document.getElementById('1b').src, hard:1},
        {f:document.getElementById('2f').src, b:document.getElementById('2b').src,hard:0},
        {f:document.getElementById('3f').src, b:document.getElementById('3b').src ,hard:0},
        {f:document.getElementById('4f').src, b:document.getElementById('4b').src ,hard:0},
        {f:document.getElementById('5f').src, b:document.getElementById('5b').src ,hard:0},
        {f:document.getElementById('6f').src, b:document.getElementById('6b').src ,hard:0},
        {f:document.getElementById('7f').src, b:document.getElementById('7b').src ,hard:0},
        {f:document.getElementById('8f').src, b:document.getElementById('8b').src ,hard:0},
        {f:document.getElementById('9f').src, b:document.getElementById('9b').src ,hard:0},
        {f:document.getElementById('10f').src, b:document.getElementById('10b').src ,hard:0},
        {f:document.getElementById('11f').src, b:document.getElementById('11b').src ,hard:1}

    ]);

    //]]></script>

<div id="maintext" class="g-artboard ">


    <div id="g-ai0-1" class="mt_area">
        <table width="100%" border="0">
            <tbody><tr>
                <td width="50%" valign="top"><p id="mt_title" class="mt_header">....LOADING....</p></td>
                <td width="50%" valign="top"><table width="100%" border="0">
                        <tbody>
                        <tr>
                            <td width="50%" valign="top"><p id="mt_subheader" class="mt_sub"></p></td>
                        </tr>
                        <tr>
                            <td><table width="100%" border="0">
                                    <tbody>
                                    <tr>
                                        <td width="50%" valign="top"><span id="mt_paragraph1" class="mt_body"></span></td>
                                        <td></td><td valign="top"><span id="mt_paragraph2" class="mt_body"></span></td>
                                    </tr>
                                    </tbody></table></td>
                        </tr>
                        </tbody></table></td>
            </tr>
            </tbody></table>
    </div>


</div>

<section id="formm">
    <form id="theForm" class="simform" autocomplete="off">
        <div class="simform-inner">
            <ol class="questions">
                <li>
                    <span><label for="q1">Any comments about this page?</label></span>
                    <input id="q1" name="q1" type="text" placeholder="please first describe the problem"/>
                </li>
                <li>
                    <span><label for="q2">What can be done about this?</label></span>
                    <input id="q2" name="q2" type="text" placeholder="suggest a solution"/>
                </li>
                <li>
                    <span><label for="q3">How severe is this issue?</label></span>
                    <input id="q3" name="q3" type="text" placeholder="e.g. Urgent, Worrying, Not"/>
                </li>
                <li>
                    <span><label for="q4">Would you like someone to reply to you?</label></span>
                    <input id="q4" name="q4" type="text" placeholder="Typical response time is 3 days"/>
                </li>
                <li>
                    <span><label for="q5">Something Something?</label></span>
                    <input id="q5" name="q5" type="text"/>
                </li>
                <li>
                    <span><label for="q6">Six is surrrely too many Questi zzzzzz</label></span>
                    <input id="q6" name="q6" type="text"/>
                </li>
            </ol><!-- /questions -->
            <button class="submit" type="submit">Send answers</button>
            <div class="controls">
                <button class="next"></button>
                <div class="progress"></div>
							<span class="number">
								<span class="number-current"></span>
								<span class="number-total"></span>
							</span>
                <span class="error-message"></span>
            </div><!-- / controls -->
        </div><!-- /simform-inner -->
        <span class="final-message"></span>
    </form><!-- /simform -->
</section>
<script src="assets/js/feedback.js"></script>
<link rel="stylesheet" href="assets/css/feedback.css" />
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded',
        function () {
            $.feedback({
                ajaxURL: 'example-listener.php',
                html2canvasURL: 'assets/js/html2canvas.js',
                onClose: function() { window.location.reload(); }
            });
        }, false);



</script>
<script src="js/classie.js"></script>
<script src="assets/js/stepsForm.js"></script>
<script>



    //////*TIPS
/*    Opentip.styles.tag = {
        ajax: true, // The URL to download will be taken from the href attribute
        showOn: 'click', // this will disable the default <a /> link behaviour.
        target: true, // Takes the <a /> element as target
        tipJoint: "bottom", // So the tooltip floats above the link
        group: "tags" // Ensures that only one tag Opentip is visible
    };

    // Now create an Opentip for each tag element
    $("#tags a.tag").each(function(tagElement) {
        new Opentip(tagElement, { style: "tag" });
    });
*/








    $("#feedback").click( function()  {
        showFeedback();
    });
    var theForm = document.getElementById( 'theForm' );

    new stepsForm( theForm, {
        onSubmit : function( form ) {
            // hide form
            classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

            /*
             form.submit()
             or
             AJAX request (maybe show loading indicator while we don't have an answer..)
             */

            // let's just simulate something...
            var messageEl = theForm.querySelector( '.final-message' );
            messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
            classie.addClass( messageEl, 'show' );
            window.setTimeout( showFeedback, 2000);
        }
    } );
    $("#formm").hide();

</script>
<div id="footer" class="lower footer"><img src="assets/footerz.png" alt="footer"></div>

<script src="js/charts.js"></script>
<main>

    <?php
    if (isset($data)) :
        ?>

        <img src="<?php echo $data->img; ?>"/>
        <?php
    endif;
    ?>
</main>


<script type="text/javascript">
    $(document).ready(function() {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
    });


    $(window).on('load', function() {
        $("#covermain").fadeOut("slow");
    });
</script>

</body>
</html>
