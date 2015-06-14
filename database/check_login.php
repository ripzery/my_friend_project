<?php
require('config.inc.php');

session_start();

// check if user is currently logged in
if (isset($_SESSION['logged_in'])) {
    if ($_SESSION['status'] == "admin") { // admin
        echo "admin";
        return;
    } else if ($_SESSION['status'] == "doctor") { // doctor
        echo "doctor";
        return;
    }
}
echo "fail";

