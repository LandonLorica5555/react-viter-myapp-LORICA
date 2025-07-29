<?php
// declare db variable
$conn = null;
// use database
$conn = checkDatabaseConnection();
// use model
$contact = new Contact($conn);

// get the "id=" in the url
if (array_key_exists('id', $_GET)) {
    checkPayload($data);

    $contact->contact_aid = $_GET['id'];
    $contact->contact_fullname = checkIndex($data, 'contact_fullname');
    $contact->contact_email = checkIndex($data, 'contact_email');
    $contact->contact_message = checkIndex($data, 'contact_message');
    $contact->contact_updated = date("Y-m-d H:i:s");

    $query = checkUpdate($contact);
    returnSuccess($contact, 'contact update', $query);
}

checkEndpoint();
