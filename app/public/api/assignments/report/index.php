<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignment';
$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assignments = $stmt->fetchAll();

if(isset($_GET['format']) && $_GET['format'] == 'csv'){
    header('Content-Type: text/csv');
    echo "gid,location,gdate,gtime\r\n";
    foreach($assignments as $a){
        echo "\"" . $a['gid'] ."\","
        . $a['location'] . ','
        . $a['gdate'] . ','
        . $a['gtime'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($assignments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
