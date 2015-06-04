<?php

require_once './login.php';
require_once './sanitization.php';

if(isset($_POST['id'])) $id = sanitizeString($_POST['id']);
if(isset($_POST['notes'])) $notes = sanitizeString($_POST['notes']);

$query = "UPDATE sites
          SET notes='$notes'
          WHERE id='$id'";

if (!$result = $db->query($query)) {
    die('There was an error running the query [' . $db->error . ']');
}


    $db->close();
?>