<?php

$server = 'localhost';
$user = 'root';
$pass = '123456';
$db = 'sakila';

$mysqli = new mysqli($server, $user, $pass, $db);

// Check connection
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", msqli_connect_error());
	exit();
}