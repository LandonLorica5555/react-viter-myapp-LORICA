<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use models
require '../../../models/developer/web-services/WebServices.php';
$conn = null;
$conn = checkDatabaseConnection();

// get payload

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$webServices = new WebServices($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (array_key_exists('start', $_GET)) {
        $webServices->web_services_start = $_GET['start'];
        $webServices->web_services_total = 5;

        checkLimitId($webServices->web_services_start, $webServices->web_services_total);

        $query = checkReadLimit($webServices);
        $total_result = checkReadAll($webServices);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $webServices->web_services_total,
            $webServices->web_services_start,
        );
    }
}

checkEndpoint();
