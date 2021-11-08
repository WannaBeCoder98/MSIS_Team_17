<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = "SELECT * FROM referee";
$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$referees = $stmt->fetchAll();

if(isset($_GET['format']) && $_GET['format'] == 'csv'){
    header('Content-Type: text/csv');
    echo "rid,name,age,grade,rating\r\n";
    foreach($referees as $r){
        echo "\"" . $r['rid'] ."\","
        . $r['name'] . ','
        . $r['age'] . ','
        . $r['age'] . ','
        . $r['rating'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($referees, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
