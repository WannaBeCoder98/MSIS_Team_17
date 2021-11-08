<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = "SELECT name, position, rstatus from referee LEFT JOIN assignment ON referee.rid = assignment.rid AND assignment.rstatus = 'unassigned' ; 
";
$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$referees = $stmt->fetchAll();

if(isset($_GET['format']) && $_GET['format'] == 'csv'){
    header('Content-Type: text/csv');
    echo "name, position,rstatus\r\n";
    foreach($referees as $r){
        echo "\"" . $r['name'] ."\","
        . $r['position'] . ','
        . $r['rstatus'] ."\r\n";
    }
} else {
// Step 3: Convert to JSON
$json = json_encode($referees, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}
