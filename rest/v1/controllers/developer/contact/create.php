<?php

// check database
$conn = null;
$conn = checkDatabaseConnection();
// use models
$contact = new Contact($conn);

if (array_key_exists('id', $_GET)) {
    checkEndpoint();
}

checkPayload($data);
$contact->contact_is_active = 1;
$contact->contact_fullname = checkIndex($data, 'contact_fullname'); // IS REQUIRED
$contact->contact_email = checkIndex($data, 'contact_email'); // IS REQUIRED
$contact->contact_message = checkIndex($data, 'contact_message'); // IS REQUIRED
$contact->contact_created = date('Y-m-d H:i:s'); // 2025-07-23 (year-day) 08:16:23 (hr-seconds)
$contact->contact_updated = date('Y-m-d H:i:s');

// VALIDATION OF EMAIL
isEmailExist($contact, $contact->contact_email);

$query = checkCreate($contact);
returnSuccess($contact, 'contact create', $query);
