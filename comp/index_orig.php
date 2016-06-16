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
            redirect('addpatientz.php');
        } else {
            // Yes! Login the user and redirect to the protected page.

            $user->login();
            redirect('20weken.php');
        }
        $user->login();
        redirect('20weken.php');
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
        redirect('addpatientz.php');
    }

}


/*--------------------------------------------------
	Don't show the login page to already
	logged-in users.
---------------------------------------------------*/


$user = new User();

if ($user->loggedIn()) {

    if ($user->isAdmin()) {
        redirect('addpatientz.php');
    } else {


        // Yes! Login the user and redirect to the protected page.

        redirect('20weken.php');

   // }


}}


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
        }

        // Attempt to login or register the person
        $user = User::loginOrRegister2($_POST['email'],$ava);


        $message .= "You can login from this URL:\n";



        $linky = "<p><a href='".get_page_url() . "?tkn=" . $user->generateToken() . "'>Demo Skip Email Check</a>
</p>";

        $message .= $linky;





        $message .= "The link is going expire automatically after 10 minutes.";

        $result = send_email($fromEmail, $_POST['email'], $subject, $message);

        if (!$result) {
            throw new Exception("There was an error sending your email. Please try again.");
        }

        die(json_encode(array(
           // 'message' => $linky.'This is the link we\'ve also sent to your inbox, clickable here for Demo purposes. Check your spam folder as well.'
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
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="js/mailcheck.js"></script>
<script src="assets/js/scriptz.js"></script>
<form id="login-register" method="post" action="index.php">

    <h1>Inloggen op twintigwekenecho.nl</h1>

    <input id="email" name="email" type="email" placeholder="voorbeeld@emailadres.com"  onkeyup="keyupFunction()" autofocus/>
    <p id="suggestion"></p>
    <p>Vul uw emailadres in dat u hebt opgegeven <br/>in het ziekenhuis.</p>
    <button type="submit">Start</button>

<!--    <div class="demoLogin" id="patientLogin">Login as Demo Patient</div>-->
<!--    <div class="demoLogin" id="doctorLogin">Login as Demo Doctor</div>-->
    <span></span>

</form>

<!-- JavaScript Includes -->


<div id="footer" class="lower footer"><img src="assets/footerz.png" alt="footer"></div>


</body>
</html>
