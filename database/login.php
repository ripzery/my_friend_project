<?php
require('config.inc.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//$username = $_POST['username'];
//$password = $_POST['password'];

// find user that match request username and password
$user = R::findOne('users', ' user_name = :username AND user_pass = :password ',
    array(
        ':username' => $request->username,
        ':password' => $request->password
    )
);


// if user not null then user is logged in correctly
if($user){
    session_start();
    $_SESSION['username'] = $user->user_name;
    $_SESSION['status'] = $user->status;
    $_SESSION['logged_in'] = true;
    if($user->status == 'admin'){
//        redirect("../admin.php");
        echo "admin";
    }else if($user->status == 'doctor'){
//        redirect("../doctor.php");
        echo "doctor";
    }
}else{
    echo "Username or password is incorrect";
}