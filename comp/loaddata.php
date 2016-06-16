<?php


/*
 * examples/mysql/loaddata.php
 *
 * This file is part of EditableGrid.
 * http://editablegrid.net
 *
 * Copyright (c) 2011 Webismymind SPRL
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://editablegrid.net/license
 */



/**
 * This script loads data from the database and returns it to the js
 *
 */

require_once('config.php');
require_once('EditableGrid.php');

/**
 * fetch_pairs is a simple method that transforms a mysqli_result object in an array.
 * It will be used to generate possible values for some columns.
*/
function fetch_pairs($mysqli,$query){
	if (!($res = $mysqli->query($query)))return FALSE;
	$rows = array();
	while ($row = $res->fetch_assoc()) {
		$first = true;
		$key = $value = null;
		foreach ($row as $val) {
			if ($first) { $key = $val; $first = false; }
			else { $value = $val; break; }
		}
		$rows[$key] = $value;
	}
	return $rows;
}


// Database connection
$mysqli = mysqli_init();
$mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
$mysqli->real_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);

// create a new EditableGrid object
$grid = new EditableGrid();

/*
*  Add columns. The first argument of addColumn is the name of the field in the databse.
*  The second argument is the label that will be displayed in the header
*/
$grid->addColumn('id', 'id', 'integer', NULL, false);
$grid->addColumn('avatar', 'avatar', 'string');
$grid->addColumn('email', 'email', 'email');
$grid->addColumn('rank', 'rank', 'integer',NULL,true,NULL,0,1);
$grid->addColumn('readall', 'readall', 'integer',NULL,false,NULL,false,true);
$grid->addColumn('signed', 'signed', 'integer',NULL,false,NULL,false,true);
$grid->addColumn('registered', 'registered', 'date',NULL,false,NULL,true,false);
$grid->addColumn('last_login', 'last_login', 'date',NULL,false,NULL,true,true);
$grid->addColumn('token', 'token', 'string',NULL,false,NULL,0,1);
$grid->addColumn('token_validity', 'token_validity', 'date',NULL,false,NULL,0,1);
$grid->addColumn('action', 'Action', 'html', NULL, false, 'id');
$grid->addColumn('pg0', 'pg0', 'decimal_point');
$grid->addColumn('pg1', 'pg1', 'decimal_point');
$grid->addColumn('pg2', 'pg2', 'decimal_point');
$grid->addColumn('pg3', 'pg3', 'decimal_point');
$grid->addColumn('pg4', 'pg4', 'decimal_point');
$grid->addColumn('pg5', 'pg5', 'decimal_point');
$grid->addColumn('pg6', 'pg6', 'decimal_point');
$grid->addColumn('pg7', 'pg7', 'decimal_point');
$grid->addColumn('pg8', 'pg8', 'decimal_point');
$grid->addColumn('pg9', 'pg9', 'decimal_point');
$grid->addColumn('pg10', 'pg10', 'decimal_point');
$grid->addColumn('pg11', 'pg11', 'decimal_point');
$grid->addColumn('pg12', 'pg12', 'decimal_point');
$grid->addColumn('pg13', 'pg13', 'decimal_point');
$grid->addColumn('pg14', 'pg14', 'decimal_point');
$grid->addColumn('pg15', 'pg15', 'decimal_point');
$grid->addColumn('pg16', 'pg16', 'decimal_point');
$grid->addColumn('pg17', 'pg17', 'decimal_point');
$grid->addColumn('pg18', 'pg18', 'decimal_point');
$grid->addColumn('pg19', 'pg19', 'decimal_point');
$grid->addColumn('pg20', 'pg20', 'decimal_point');
//$grid->addColumn('pgavg', 'pgavg', 'decimal_point', null, true, null, false,'hidden');


$mydb_tablename = (isset($_GET['db_tablename'])) ? stripslashes($_GET['db_tablename']) : 'reg_users';

$result = $mysqli->query('SELECT *, date_format(last_login, "%d/%m/%Y") as last_login FROM '.$mydb_tablename );
$mysqli->close();

// send data to the browser
$grid->renderJSON($result);
