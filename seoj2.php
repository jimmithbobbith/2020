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
    <script src="temp/js/app.js"></script>

    <title>Diak 2016</title>
    <link rel="stylesheet" href="css/main2.css">
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="assets/css/opentip.css">
    <link rel="stylesheet" type="text/css" href="css/normalize1.css" />
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    <link rel="stylesheet" type="text/css" href="temp/css/style.css" />

    <script src="js/modernizr.custom.js"></script>

    <script src="js/prefixfree.min.js"></script>

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
        $js_fbck = $user->getfbck();
        $js_pgID =$user->getID();
        echo "var pgID=   ". $js_pgID . ";window.pgIDx =pgID; window.oldfbck ='". $js_fbck . "'; window.javascript_array=javascript_array = ". $js_array . ";\n";
        ?>
    </script>
    <script src="js/timeme.js"></script">
    <script type="text/javascript">
        TimeMe.setIdleDurationInSeconds(30);
        TimeMe.setCurrentPageName(0);
        TimeMe.initialize();
    </script>





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

</div>
<nav>
    <ul>
        <li>
            <div  id="langEN" class="item-container">
                <div class="item-top"><img src="USA.png" alt="arrowLeft" style="
    margin-right: 1px;
    width: 15px;
">EN</div>
                <div class="item-bottom"><img src="USA.png" alt="arrowLeft" style="
    margin-right: 1px;
    width: 15px;
">EN</div>
            </div>
        </li>
        <li class="langNL">
            <div id="langNL" class="item-container">
                <div class="item-top"><img src="NL.png" alt="arrowLeft" style="
    margin-right: 1px;
    width: 15px;
">NL</div>
                <div class="item-bottom"><img src="NL.png" alt="arrowLeft" style="
    margin-right: 1px;
    width: 15px;
">NL</div>
            </div>
        </li>
        <li class="langPO">
            <div id="langPO" class="item-container">
                <div class="item-top"><img src="PL.png" alt="arrowLeft" style="
    margin-right: 1px;
    width: 15px;
">PL</div>
                <div class="item-bottom"><img src="PL.png" alt="arrowLeft" style="
    margin-right: 1px;
    width: 15px;
">PL</div>
            </div>
        </li>
        <li>
            <div id="feedback" class="item-container">
                <div class="item-top">Feedback</div>
                <div class="item-bottom">Feedback</div>
            </div>
        </li>
        <li>
            <div  id="help" class="item-container">
                <div class="item-top">Help</div>
                <div class="item-bottom">Help</div>
            </div>
        </li>
        <li>
            <div  id="emailz" class="item-container" onclick="location.href='mailto:anne@broadbentmedical.com';">
                <div class="item-top">Email ons</div>
                <div class="item-bottom"><a href="mailto:anne@broadbentmedical.com?Subject=Email%20from%20App" target="_blank">Email ons</a></div>
            </div>
        </li>
        <li class="closec">
            <div  id="logout" class="item-container"><a href="index.php?logout=1">
                    <div class="item-top">Uitloggen <?php echo $user->email ?></div>
                    <div class="item-bottom">Uitloggen <?php echo $user->email ?></div>
            </div>
        </li>
    </ul>
</nav>
<div id="controls" style="position:absolute;z-index:1000">
    <div id="tech" class="technicalEl  feedback-btn"><img src="assets/blank.jpg" alt="help" style="
    opacity: 0;
"></a></div>
</div>
<div id="arrowLeft" class="arrow arrowLeft"><img src="assets/arrowLeft.png" alt="arrowLeft"></div>
<div id="arrowRight" class="arrow arrowRight"><img src="assets/arrowRight.png" alt="arrowRight"></div>
<div id="footer" class="lower footer"><img src="assets/footerz.png" alt="footer"></div>

<div class="container">



    <header class="clearfix">

        <h1>SLIDING<span>NOT NOT not not turning. Cos everyone knew it sucked. Deep in their hearts</span></h1>
        <p>Best viewed with some sympathy!</p>
        <div class="support-note">
            <span class="note-ie">Sorry, only modern browsers</span>
        </div>

    </header>

    <section class="main">

        <ul id="st-stack" class="st-stack-raw">
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Welcome</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>How does it work?</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2># 1</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>What is SEO</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>100% safe for mother and child</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2># 2</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>97% of all babies are perfectly healthy</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Baby's checkup</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Here you can see the baby</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>Side effects of the 20 week ultrasound</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>solving together</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>soft markers</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>More than just an echo</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2># 3</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>100% safe for mother and child</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2># 2</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>97% of all babies are perfectly healthy</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Baby's checkup</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Here you can see the baby</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>Side effects of the 20 week ultrasound</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>solving together</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>soft markers</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2>More than just an echo</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title"> <h2># 3</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>100% safe for mother and child</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2># 2</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>97% of all babies are perfectly healthy</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Baby's checkup</h2></div></li>
            <li><div class="st-item"><img src="images/a.jpg"/></a></div><div class="st-title">  <h2>Here you can see the baby</h2></div></li>




        </ul>
        <p>Tip: to see a continuous flow, keep your mouse pressed on the navigation arrows.</p>
    </section>

</div><!-- /container -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="temp/js/jquery.stackslider.js"></script>
<script type="text/javascript">

    $( function() {

        $( '#st-stack' ).stackslider();

    });

</script>







<script src="js/ifvisible.js"></script>
<script src="js/editablegrid-2.1.0-b25.js"></script>
<script src="js/jquery-1.11.1.min.js" ></script>
<!-- EditableGrid test if jQuery UI is present. If present, a datepicker is automatically used for date type -->
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<script src="js/demo.js" ></script>

<div id="maintext" class="g-artboard ">


    <div id="g-ai0-1" class="mt_area">
        <table width="100%" border="0">
            <tbody><tr>
                <td width="35%" valign="top"><p id="mt_title" class="mt_header">....LOADING....</p></td>
                <td width="65%" valign="top"><table width="100%" border="0">
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
                    <span><label for="q1">We horen graag wat u wilt toevoegen, is het een technisch probleem?</label></span>
                    <input id="q1" name="q1" type="text" placeholder="kunt u het probleem omschrijven?"/>
                </li>
                <li>
                    <span><label for="q2">Wat is er mis met deze pagina?</label></span>
                    <input id="q2" name="q2" type="text" placeholder="wat kan er volgens u beter"/>
                </li>
                <li>
                    <span><label for="q3">Kunt u dat iets verder verklaren?</label></span>
                    <input id="q3" name="q3" type="text" placeholder="is het wat u betreft een urgent probleem?"/>
                </li>
            </ol><!-- /questions -->
            <button class="submit" type="submit">Send answers</button>
            <div class="controls">
                <button  id="checkbox2" class="checkbox2" style="
                                      font-size: 0.5em;
                                      right: -26px;
                                      position: absolute;
                                      top: -70px;
                                  ">X</button>
                <button class="next"></button>
                <div class="progress"></div>
							<span class="number">
								<span class="number-current"></span>
								<span class="number-total"></span>
							</span>
                <span class="error-message"></span>
            </div><!-- / controls --> <?php include "secure_email_code.php"?>
        </div><!-- /simform-inner -->
        <span class="final-message"></span>
    </form><!-- /simform -->
</section>
<section id="formmz">

    <div class="smaller"><h7>Voor de kwaliteit van de echo is het belangrijk dat u ons laat weten of u alles heeft gelezen en begrepen.</h7>
        <br>
        <br>


        <input id="checkbox" name="q1" type="checkbox" placeholder="asd"/>
        Hierbij verklaar ik dat ik de informatie heb gelezen en begrepen

    </div>

</section>
<!--<script src="assets/js/feedback.js"></script>
--><link rel="stylesheet" href="assets/css/feedback.css" />
<script type="text/javascript">
    $('#checkbox').change(function(){
        updatePgValue(1,"signed",pgID);
        $("#formmz").fadeOut("slow")
    });

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

            //sendj($( "#q1" ).html);
            // form.submit()
            /* or
             AJAX request (maybe show loading indicator while we don't have an answer..)
             */

            // let's just simulate something...
            var messageEl = theForm.querySelector( '.final-message' );
            messageEl.innerHTML = 'We hebben uw feedback ontvangen en nemen het graag mee in onze volgende update.';
            classie.addClass( messageEl, 'show' );
            $( "#checkbox2  " ).trigger( "click" );
            window.setTimeout( showFeedback, 2000);

        }
    } );
    $("#formm").hide();




    $("#formmz").hide();


</script>

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
       // videoArr[0].play()
    });
</script>

</body>
</html>
