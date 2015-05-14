<?php
require('config.inc.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//create user row and set all data

$user = R::dispense('users');
//
$user->user_name = $request->username;
$user->user_pass = $request->password;
$user->status = $request->status;


try {
    $id = R::store($user);
} catch (Exception $e) {
    echo $e;
    return;
}

echo json_encode(R::exportAll($user));