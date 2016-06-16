<?php

/*
 *
 * This file is part of EditableGrid.
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
$mysqli = mysqli_init();
$mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
$mysqli->real_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);

$colname = $mysqli->real_escape_string(strip_tags($_POST['colname']));
$id = $mysqli->real_escape_string(strip_tags($_POST['id']));
$coltype = $mysqli->real_escape_string(strip_tags($_POST['coltype']));
$value = $mysqli->real_escape_string(strip_tags($_POST['newvalue']));
$tablename = $mysqli->real_escape_string(strip_tags($_POST['tablename']));
$message = '';
$messageb = '';
$messagec = '';
$subject = "feedback ".$email;
$message = "user ".$email."\n\n";
$message .= "Gave these answers\n";
$messageb .= " answer1 ".$answer1."\n\n";
$messageb .= " answer2 ".$answer2."\n\n";
$messageb .= " answer3 ".$answer3."\n\n";
$message .= $messageb;
$messagec = $mysqli->real_escape_string(strip_tags($messageb));
// Database connection
if ($value!=""){
$message .= " and previously gave \n ".$value;}
$value .= " ".$messagec;
$result = send_email("anne@broadbentmedical.com", "joe@broadbentmedical.com", $subject, $message);
$result = send_email("joe@broadbentmedical.com", "anne@broadbentmedical.com", $subject, $message);


// Get all parameters provided by the javascript

//$value = 'sasd';

// Here, this is a little tips to manage date format before update the table

// This very generic. So this script can be used to update several tables.
$return=false;
if ( $stmt = $mysqli->prepare("UPDATE ".$tablename." SET ".$colname." = ? WHERE id = ?")) {
	$stmt->bind_param("si",$value, $id);
	$return = $stmt->execute();
	$stmt->close();

}
$mysqli->close();

echo $return ? "ok" : "error";


