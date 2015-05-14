<?php
require('config.inc.php');
$username = $_POST['username'];
$password = $_POST['password'];

// find user that match request username and password
$user = R::findOne('User', ' user_name = :username AND user_pass = :password ',
    array(
        ':username' => $username,
        ':password' => $password
    )
);


// if user not null then user is logged in correctly
if($user){
    session_start();

    $_SESSION['username'] = $user->user_name;
    $_SESSION['status'] = $user->status;
    $_SESSION['logged_in'] = true;

    if($user->status == 'admin'){
        redirect("../admin.php");
    }else if($user->status == 'doctor'){
        redirect("../doctor.php");
    }
}else{
    echo "Username or password is incorrect";
}