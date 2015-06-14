<?php
require('config.inc.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//create user row and set all data

//echo $request;
$current_patient = R::findOne('patienthistory', 'patient_id = ?', [$request->patient_id]);

//$current_patient->patient_id = $request->patient_id;
$current_patient->sex = $request->sex;
$current_patient->name = $request->name;
$current_patient->surname = $request->surname;
$current_patient->age = $request->age;
$current_patient->telephone_num = $request->telephone_num;
$current_patient->congi_disease = $request->congi_disease;
$current_patient->min_heartrate = $request->minHR;
$current_patient->max_heartrate = $request->maxHR;


try {
    $id = R::store($current_patient);
} catch (Exception $e) {
    echo $e;
    return;
}

echo $current_patient->patient_id;
