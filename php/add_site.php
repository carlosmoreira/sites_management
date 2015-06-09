<?php

require_once './login.php';
require_once './sanitization.php';

if (isset($_POST['siteName'])) $siteName = sanitizeString($_POST['siteName']);
if (isset($_POST['description'])) $description = sanitizeString($_POST['description']);
if (isset($_POST['cms'])) $cms = sanitizeString($_POST['cms']);
if (isset($_POST['url'])) $url = sanitizeString($_POST['url']);
if (isset($_POST['devUrl'])) $devUrl = sanitizeString($_POST['devUrl']);
if (isset($_POST['type'])) $type = sanitizeString($_POST['type']);

if ($siteName && $description && $cms) {

    $query = "INSERT INTO sites(category,description, name, url, dev_url, cms)
          VALUES ('$type','$description','$siteName', '$url', '$devUrl', '$cms')";

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