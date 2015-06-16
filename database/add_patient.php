<?php
require('config.inc.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//create user row and set all data

$patient = R::dispense('patienthistory');


$patient->patient_id = $request->id;
$patient->sex = $request->sex;
$patient->name = $request->name;
$patient->surname = $request->surname;
$patient->age = $request->age;
$patient->telephone_num = $request->telno;
$patient->congi_disease = $request->congi_disease;
$patient->min_heartrate = $request->min;
$patient->max_heartrate = $request->max;


try {
    $id = R::store($patient);
} catch (Exception $e) {
    echo "failed";
    return;
}

echo "successful";