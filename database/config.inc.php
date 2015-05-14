<?php
require("../library/php/rb.php");


// config file for redbeanphp
R::setup('mysql:host=localhost;dbname=arnonkee127;port=8889;','root','root');

function redirect($url){
    header("Location: ". $url);
    exit();
}