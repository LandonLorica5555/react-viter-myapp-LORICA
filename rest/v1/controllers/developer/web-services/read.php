<?php
// check database connection
$conn = null;
$conn = checkDatabaseConnection();
// use models
$webServices = new WebServices($conn);

if (empty($_GET)) {
    $query = checkReadAll($webServices);
    http_response_code(200);
    getQueriedData($query);
}
