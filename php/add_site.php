<?php

require_once './login.php';
require_once './sanitization.php';

if (isset($_POST['siteName'])) $siteName = sanitizeString($_POST['siteName']);
if (isset($_POST['description'])) $description = sanitizeString($_POST['description']);
if (isset($_POST['cms'])) $cms = sanitizeString($_POST['cms']);

if ($siteName && $description && $cms) {

    $query = "INSERT INTO sites(category,description, name, cms)
          VALUES ('2','$description','$siteName','$cms')";

    if (!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
    }

    $query = "SELECT
        LAST_INSERT_ID() AS id";

    if (!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
    }
    $id = $result->fetch_assoc();
    $lastId = $id['id'];

    echo $lastId;

    $db->close();
}

?>