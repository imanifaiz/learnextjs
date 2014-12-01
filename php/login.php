<?php

require("db.php");

session_start();

$username = $_POST['user'];
$pass = $_POST['password'];

$username = stripslashes($username);
$pass = stripslashes($pass);

$username = $mysqli->real_escape_string($username);
$pass = $mysqli->real_escape_string($pass);

$sql = "SELECT * FROM USER WHERE username='$username' and password='$pass'";

$result = array(); // #10

if ($resultdb = $mysqli->query($sql)) { // #11
	$count = $resultdb->num_rows; // #12
	if($count==1){
		$_SESSION['authenticated'] = "yes"; // #13
		$_SESSION['username'] = $username; // #14
		$result['success'] = true; // #15
		$result['msg'] = 'User authenticated!'; // #16
	} else {
		$result['success'] = false; // #17
		$result['msg'] = 'Incorrect user or password.'; // #18
	}
	$resultdb->close(); // #19
}

$mysqli->close(); // #20
echo json_encode($result); // #21