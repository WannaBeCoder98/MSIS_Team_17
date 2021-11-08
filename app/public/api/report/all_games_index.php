<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = "SELECT * FROM game";
$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

if(isset($_GET['format']) && $_GET['format'] == 'csv'){
    header('Content-Type: text/csv');
    echo "gid, location, gdate, gtime\r\n";
    foreach($games as $g){
        echo "\"" . $g['gid'] ."\","
        . $g['location'] . ','
        . $g['gdate'] . ','
        . $g['gtime'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
