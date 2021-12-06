<?php

// database parameters
$hostname = getenv('DBA_PEAK_HOSTNAME');
$username = getenv('DBA_PEAK_USERNAME');
$password = getenv('DBA_PEAK_PASSWORD');
$database = getenv('DBA_PEAK_DATABASE');

// database connection
try {
    $pdo = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'Connected successfully!';

    // get the form information
    $txtFName = $_POST["fName"];
    $txtLName = $_POST["lName"];
    $txtCCenter = $_POST["cCenter"];
    $txtCompany = $_POST["company"];
    $txtJTitle = $_POST["jTitle"];
    $txtPhone = $_POST["phone"];
    $txtEmail = $_POST["email"];
    $txtPassword = $_POST["psw"];

//insert into database SQL
    $sql = "INSERT INTO clients (id_client, first_name, last_name, job_title, cultivation_center, company, email, phone, password) VALUES ('0', $txtFName, $txtLName, $txtJTitle, $txtCCenter, $txtCompany, $txtPhone, $txtEmail, $txtPassword)";

// use exec() because no results are returned
    $pdo->exec($sql);
    echo "New record created successfully";
} catch(PDOException $e) {
    die('Error ' . $e->getMessage());
} 

$pdo = null;

?>