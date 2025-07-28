<?php
// declare db variable
$conn = null;
// use database
$conn = checkDatabaseConnection();
// use model
$testimonials = new Testimonials($conn);

// get the "id=" in the url
if (array_key_exists('id', $_GET)) {
    checkPayload($data);

    $testimonials->testimonials_aid = $_GET['id'];
    $testimonials->testimonials_image = checkIndex($data, 'testimonials_image');
    $testimonials->testimonials_description = checkIndex($data, 'testimonials_description');
    $testimonials->testimonials_name = checkIndex($data, 'testimonials_name');
    $testimonials->testimonials_position = checkIndex($data, 'testimonials_position');
    $testimonials->testimonials_updated = date("Y-m-d H:i:s");

    $query = checkUpdate($testimonials);
    returnSuccess($testimonials, 'testimonials update', $query);
}

checkEndpoint();
