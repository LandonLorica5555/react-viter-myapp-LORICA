<?php
// check database
$conn = null;
$conn = checkDatabaseConnection();
// use models
$header = new Header($conn);

if (array_key_exists('id', $_GET)) {
    $header->header_aid = $_GET['id'];

    checkId($header->header_aid);
    $query = checkDelete($header);
    http_response_code(200);
    returnSuccess($header, 'header delete', $query);
}

checkEndpoint();
