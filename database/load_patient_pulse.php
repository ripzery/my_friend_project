<?php
require('config.inc.php');
//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
//$allLastestPulse = [];
$patients = R::find('patienthistory');
//foreach($patients as $patient){
//
//    $last = end ($patient->ownPatientstatusList);
////    array_push($allLastestPulse, $last);
////    echo json_encode(R::exportAll($last,true));
//}

//echo $allLastestPulse;
echo json_encode(R::exportAll($patients));