<?php

require_once 'includes/main.php';


/*--------------------------------------------------
	Handle visits with a login token. If it is
	valid, log the person in.
---------------------------------------------------*/


if (isset($_GET['tkn'])) {
    $user = new User();

    // Is this a valid login token?
    $user = User::findByToken($_GET['tkn']);

    if ($user) {
        if ($user->isAdmin()) {
            redirect('addpatients.html');
        } else {
            // Yes! Login the user and redirect to the protected page.

            $user->login();
            redirect('seoapp2.php');
        }
    }


    // Invalid token. Redirect back to the login form.
    redirect('index.php');
}


/*--------------------------------------------------
	Handle logging out of the system. The logout
	link in protected.php leads here.
---------------------------------------------------*/




if (isset($_GET['logout'])) {

    $user = new User();

    if ($user->loggedIn()) {
        $user->logout();
    }

    redirect('index.php');
}


if (isset($_GET['adm'])) {
    $user = new User();
    if ($user->isAdmin()) {
        redirect('addpatients.html');
    }

}


/*--------------------------------------------------
	Don't show the login page to already
	logged-in users.
---------------------------------------------------*/


$user = new User();

if ($user->loggedIn()) {

    if ($user->isAdmin()) {
        redirect('addpatients.html');
    } else {


        // Yes! Login the user and redirect to the protected page.

        redirect('seoapp2.php');

    }


}


/*--------------------------------------------------
	Handle submitting the login form via AJAX
---------------------------------------------------*/


try {

    if (!empty($_POST) && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {

        // Output a JSON header

        header('Content-type: application/json');

        // Is the email address valid?

        if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Please enter a valid email.');
        }

        // This will throw an exception if the person is above
        // the allowed login attempt limits (see functions.php for more):
        rate_limit($_SERVER['REMOTE_ADDR']);

        // Record this login attempt
        rate_limit_tick($_SERVER['REMOTE_ADDR'], $_POST['email']);

        // Send the message to the user

        $message = '';
        $email = $_POST['email'];
        $subject = 'Your Login Link';
        $ava= 'nono.jpg';

        if (!User::exists($email)) {

            $subject = "Thank You For Registering!";
            $message = "Thank you for registering at our site!\n\n";
            throw new Exception('Not registered. Please contact your Doctor to access this Counselling.');
        } else {

        }

        // Attempt to login or register the person
        $user = User::loginOrRegister3($_POST['email'],$ava,$tok);
        $tok = $user->generateToken();

        $message .= "You can login from this URL:\n";



        $linky = "<p><a href='".get_page_url() . "?tkn=" . $tok . "'>Demo Skip Email Check</a>
</p>";

        $message .= $linky;





        $message .= "The link is going expire automatically after 10 minutes.";

        $result = send_email($fromEmail, $_POST['email'], $subject, $message);

        if (!$result) {
            throw new Exception("There was an error sending your email. Please try again.");
        }

        die(json_encode(array(
            'message' => $linky.'This is the link we\'ve also sent to your inbox, clickable here for Demo purposes. Check your spam folder as well.'
        )));
    }
} catch (Exception $e) {

    die(json_encode(array(
        'error' => 1,
        'message' => $e->getMessage()
    )));
}

/*--------------------------------------------------
	Output the login form
---------------------------------------------------*/

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/>
    <title>Diak Login</title>

    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">

    <!-- The main CSS file -->
    <link href="assets/css/style.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="css/elastislide.css" />
    <link rel="stylesheet" href="css/responsive.css" type="text/css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/demo1.css" />
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

    <script src="assets/js/scriptz2.js"></script>
    <script src="js/mailcheck.js"></script>
    <script src="js/demo.js" ></script>
    <![endif]-->
</head>

<body>


<div id="wrap">
<div id="addform">
<form id="login-register" method="post" action="index.php">

    <h1>Login or Register</h1>

    <input id="email" name="email" type="email" placeholder="your@email.com"  onkeyup="keyupFunction()" autofocus/>
    <p id="suggestion"></p>
    <p>Enter your email address above and we will send <br/>you a new login link.</p>

    <input type="hidden" id="avatar" name="avatar" placeholder="avatar" />

    <div class="container demo-4">
        <!--/ Codrops top bar -->

        <div class="main">
            <div class="gallery">
                <!-- Elastislide Carousel -->
                <ul id="carousel" class="elastislide-list">
                    <li data-preview="avatar_04.png"><a href="#"><img src="img/avatars/avatar_04.png" alt="avatar_04" /></a></li>
                    <li data-preview="avatar_05.png"><a href="#"><img src="img/avatars/avatar_05.png" alt="avatar_05" /></a></li>
                    <li data-preview="avatar_06.png"><a href="#"><img src="img/avatars/avatar_06.png" alt="avatar_06" /></a></li>
                    <li data-preview="avatar_07.png"><a href="#"><img src="img/avatars/avatar_07.png" alt="avatar_07" /></a></li>
                    <li data-preview="avatar_11.png"><a href="#"><img src="img/avatars/avatar_11.png" alt="avatar_11" /></a></li>
                    <li data-preview="avatar_12.png"><a href="#"><img src="img/avatars/avatar_12.png" alt="avatar_12" /></a></li>
                    <li data-preview="avatar_13.png"><a href="#"><img src="img/avatars/avatar_13.png" alt="avatar_13" /></a></li>
                    <li data-preview="avatar_14.png"><a href="#"><img src="img/avatars/avatar_14.png" alt="avatar_14" /></a></li>
                    <li data-preview="avatar_15.png"><a href="#"><img src="img/avatars/avatar_15.png" alt="avatar_15" /></a></li>
                    <li data-preview="avatar_16.png"><a href="#"><img src="img/avatars/avatar_16.png" alt="avatar_16" /></a></li>
                    <li data-preview="avatar_17.png"><a href="#"><img src="img/avatars/avatar_17.png" alt="avatar_17" /></a></li>
                    <li data-preview="avatar_18.png"><a href="#"><img src="img/avatars/avatar_18.png" alt="avatar_18" /></a></li>
                    <li data-preview="avatar_19.png"><a href="#"><img src="img/avatars/avatar_19.png" alt="avatar_19" /></a></li>
                    <li data-preview="avatar_20.png"><a href="#"><img src="img/avatars/avatar_20.png" alt="avatar_20" /></a></li>
                    <li data-preview="avatar_01.png"><a href="#"><img src="img/avatars/avatar_01.png" alt="avatar_01" /></a></li>
                    <li data-preview="avatar_02.png"><a href="#"><img src="img/avatars/avatar_02.png" alt="avatar_02" /></a></li>
                    <li data-preview="avatar_03.png"><a href="#"><img src="img/avatars/avatar_03.png" alt="avatar_03" /></a></li>
                    <li data-preview="avatar_08.png"><a href="#"><img src="img/avatars/avatar_08.png" alt="avatar_08" /></a></li>
                    <li data-preview="avatar_09.png"><a href="#"><img src="img/avatars/avatar_09.png" alt="avatar_09" /></a></li>
                    <li data-preview="avatar_10.png"><a href="#"><img src="img/avatars/avatar_10.png" alt="avatar_10" /></a></li>
                </ul>
                <!-- End Elastislide Carousel -->
            </div>
        </div>
    </div>
    <script type="text/javascript" src="js/modernizr.custom.17475.js"></script>

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquerypp.custom.js"></script>
    <script type="text/javascript" src="js/jquery.elastislide.js"></script>

    <button type="submit">Login / Register</button>

    <div class="demoLogin" id="patientLogin">Login as Demo Patient</div>
    <div class="demoLogin" id="doctorLogin">Login as Demo Doctor</div>
    <span></span>

</form>
</div></div>
<!-- JavaScript Includes -->


<div id="footer" class="lower footer"><img src="assets/footerz.png" alt="footer"></div>

<script>

    var current = 0,
        $preview = $( '#preview' ),
        $carouselEl = $( '#carousel' ),
        $carouselItems = $carouselEl.children(),
        carousel = $carouselEl.elastislide( {
            current : current,
            minItems : 4,

            onClick : function( el, pos, evt ) {

                changeImage( el, pos );
                evt.preventDefault();


            },
            onReady : function() {

                changeImage( $carouselItems.eq( current ), current );

            }
        } );

    function changeImage( el, pos ) {
        $('.elastislide-next').css("display", "block");
        $preview.attr( 'src', el.data( 'preview' ) );
        $carouselItems.removeClass( 'current-img' );
        el.addClass( 'current-img' );
        carousel.setCurrent( pos );
        $('#avatar').val( el.data( 'preview' ) );



    }

</script>
</body>
</html>
