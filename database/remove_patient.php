<?php
require('config.inc.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$patient = R::load('patienthistory', $request->id);

$name = $patient->name;
try{
    R::trash($patient);
}catch(Exception $e){
    echo "Error on delete " . $name;
}

echo $name . " has been deleted successfully";