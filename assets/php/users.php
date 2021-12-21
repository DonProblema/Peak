<?php

include("../../../data/configuration.php");
require_once 'jwt_utils.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$bearer_token = get_bearer_token();

#echo $bearer_token;

$is_jwt_valid = is_jwt_valid($bearer_token);

if($is_jwt_valid) {
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
	$sql = "SELECT users.id, users.username, users.role_id, accounts.first_name, accounts.last_name, accounts.company, accounts.avatar
            FROM users 
            INNER JOIN accounts 
            ON accounts.id_account = users.id_account
            WHERE users.isEnabled = accounts.isEnabled = 1;";
	$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));

	$rows = array();

	while($row = mysqli_fetch_assoc($result)) {
		$rows[] = $row;
	}

	echo json_encode(array('status' => 'ok', 'user' => $rows));
} else {
	echo json_encode(array('error' => 'Access denied'));
}

mysqli_close($conn);

?>