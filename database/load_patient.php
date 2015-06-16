<?php
require('config.inc.php');
$patients = R::find('patienthistory');
echo json_encode(R::exportAll($patients));