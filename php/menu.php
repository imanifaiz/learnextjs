<?php
require("db.php"); // #1
session_start(); // #2
$username = $_SESSION['username']; // #3
$queryString = "SELECT p.menu_id menuId FROM User u "; // #4
$queryString .= "INNER JOIN permissions p ON u.group_id = p.group_id ";
$queryString .= "INNER JOIN menu m ON p.menu_id = m.id ";
$queryString .= "WHERE u.username = '$username' ";
$folder = array(); // #5

if ($resultdb = $mysqli->query($queryString)) { // #6
	$in = '('; // #7

	while($user = $resultdb->fetch_assoc()) {
		$in .= $user['menuId'] . ","; // #8
	}

	$in = substr($in, 0, -1) . ")"; // #9

	$resultdb->free(); // #10

	$sql = "SELECT * FROM MENU WHERE parent_id IS NULL ";

	$sql .= "AND id in $in"; // #11

	if ($resultdb = $mysqli->query($sql)) { // #12
		while($r = $resultdb->fetch_assoc()) { // #13
			$sqlquery = "SELECT * FROM MENU WHERE parent_id = '";
			$sqlquery .= $r['id'] ."' AND id in $in"; // #14

			if ($nodes = $mysqli->query($sqlquery)) { // #15
				$count = $nodes->num_rows; // #16

				if ($count > 0){ // #17
					$r['leaf'] = false; // #18
					$r['items'] = array(); // #19

					while ($item = $nodes->fetch_assoc()) {
						$item['leaf'] = true; // #20
						$r['items'][] = $item; // #21
					}
				}
				$folder[] = $r; // #22
			}
		}
	}
	$resultdb->close(); // #23
}

$mysqli->close(); // #24

echo json_encode(array( // #25
	"items" => $folder
));