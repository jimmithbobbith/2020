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
$message = $_POST["q1"];

$headers = 'From: d@example.com';
mail('redrawmedia@gmail.com', 'Test email using PHP', $message, $headers, '-fwebmaster@example.com'); ?>
