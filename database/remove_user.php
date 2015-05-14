<?php
require('config.inc.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$user = R::load('users', $request->id);

$name = $user->user_name;
try{
    R::trash($user);
}catch(Exception $e){
    echo "Error on delete " . $name;
}

echo $name . " has been deleted successfully";