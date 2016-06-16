<?php
/*
 *
 * http://editablegrid.net
 *
 * Copyright (c) 2011 Webismymind SPRL
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://editablegrid.net/license
 */
require_once 'includes/main.php';
require_once 'config.php';
$user = new User();

$email = $_POST['email'];
$avatar =$_POST['avatar'];
$tok = $user->makeToken($email,$avatar);

$message = '';
$subject = "Thank You For Registering!";
$message = "Thank you for registering at our site!\n\n";
$message .= "You can login from this URL:\n";

$message .= $indexPage. "?tkn=" . $tok;
$message .= "\n\nThe link is going expire automatically after 10 minutes.\n\n";
$return=false;
$message .= "Patients email is  ".$email;
$result = send_email($fromEmail, $joeEmail, $subject, $message);

/*

// Database connection
$mysqli = mysqli_init();
$mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
$mysqli->real_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);

// Get all parameter provided by the javascript
$email = $mysqli->real_escape_string(strip_tags($_POST['email']));
$avatar = $mysqli->real_escape_string(strip_tags($_POST['avatar']));


$return=false;
if ( $stmt = $mysqli->prepare("INSERT INTO reg_users (email,avatar) VALUES (  ?,?)")) {

	$stmt->bind_param("ss", $email,$avatar);
    $return = $stmt->execute();
	$stmt->close();
}
$mysqli->close();*/

echo $result ? "ok" : "error";



