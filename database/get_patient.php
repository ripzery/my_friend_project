<?php
require('config.inc.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$patient = R::findOne('patienthistory', 'patient_id = ?', [$request->id]);
echo json_encode(R::exportAll($patient));