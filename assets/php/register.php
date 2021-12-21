<?php

include("../../../data/configuration.php");

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
    // get the form information
    $txtFName = $_POST["fName"];
    $txtLName = $_POST["lName"];
    $txtCCenter = $_POST["cCenter"];
    $txtCompany = $_POST["company"];
    $txtJTitle = $_POST["jTitle"];
    $txtPhone = $_POST["phone"];
    $txtEmail = $_POST["email"];
    $txtPassword = MD5($_POST["psw"]);

//insert into database SQL
    $sql = "INSERT INTO accounts (id_client, first_name, last_name, job_title, cultivation_center, company, email, phone, password) VALUES ('0','$txtFName', '$txtLName', '$txtJTitle', '$txtCCenter', '$txtCompany', '$txtEmail', '$txtPhone', '$txtPassword')";

if (mysqli_query($conn, $sql)) {
  //echo "New record created successfully";
  //include "../../index.html";
  header("Location: http://www.peak.cl/"); 
    exit();
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

?>