<?php

//require_once 'db.php';
include("../../../data/configuration.php");
require_once 'jwt_utils.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// get posted data
	$data = json_decode(file_get_contents("php://input", true));
	$protectedPassword = MD5($data->password);
	
	// Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
	
    //Select from database MySQL
    $sql = "SELECT * FROM users WHERE username = '$data->username' AND password = '$protectedPassword';";

    $result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	
	if(mysqli_num_rows($result) < 1) {
		echo json_encode(array('status' => 'error', 'message' => 'Invalid Username or Password'));
	} else {
		$row = mysqli_fetch_assoc($result);
		
		$username = $row['username'];
		
		$headers = array('alg'=>'HS256','typ'=>'JWT');
		$payload = array('username'=>$username, 'exp'=>(time() + 3600));

		$jwt = generate_jwt($headers, $payload);
		
		echo json_encode(array('status' => 'ok', 'message' => 'Logged in', 'accessToken' => $jwt));
	}
}

mysqli_close($conn);

?>