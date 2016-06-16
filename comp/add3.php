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

$answer1 = $_POST['answer1'];
$answer2 = $_POST['answer2'];
$answer3 = $_POST['answer3'];
$email = $_POST['email'];

$message = '';
$subject = "feedback ".$email;
$message = "user ".$email."\n\n";
$message .= "Gave these answers\n";
$message .= "answer1 ".$answer1."\n\n";
$message .= "answer2 ".$answer2."\n\n";
$message .= "answer3 ".$answer3."\n\n";
$result = send_email("anne@broadbentmedical.com", "joe@broadbentmedical.com", $subject, $message);

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

if ($result) {
    echo "ok";
} else {
    echo "error";
}



