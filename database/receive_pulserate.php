<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first
date_default_timezone_set('Asia/Bangkok');

$id = $_GET['p_id'];
$pulse = $_GET['p_pulse'];

//หา primary_key ของ patienthistory โดยใช้ p_id
$patient_history = R::findOne('patienthistory', 'patient_id  = ?', [$id]);
$p_id = $patient_history->getID();

// สร้าง row ใหม่เก็บ pulse rate ที่ sensor ส่งมา
$patient_pulse = R::dispense('patientstatus');
$patient_pulse->patienthistory_id = $p_id;
$patient_pulse->pulse_rate = $pulse;
$timestamp = date('Y-m-d H:i:s', time());
//$timestamp = time();
$patient_pulse->timestamp = $timestamp;

// เปิด exclusive mode ถ้า patient ถูกลบออก pulse rate ของ patient นั้นจะถูกลบด้วย
$patient_history->xownPatientstatusList[] = $patient_pulse;

try {
    R::store($patient_history);
    R::store($patient_pulse);
} catch (Exception $e) {
    echo $e;
}

//export added mobile object to ajax call
echo json_encode(R::exportAll($patient_history, true));

