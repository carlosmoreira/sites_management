<?php

require_once './login.php';
require_once './sanitization.php';

if(isset($_POST['updateSite'])) {

    if (isset($_POST['id'])) $id = sanitizeString($_POST['id']);
    if (isset($_POST['name'])) $name = sanitizeString($_POST['name']);
    if (isset($_POST['description'])) $description = sanitizeString($_POST['description']);
    if (isset($_POST['cms'])) $cms = sanitizeString($_POST['cms']);

    if ($id && $name && $description && $cms) {

        $query = "UPDATE sites
              SET name='$name', description='$description', cms='$cms'
              WHERE id='$id'";

        if (!$result = $db->query($query)) {
            die('There was an error running the query [' . $db->error . ']');
        }

        $db->close();
    }
}



if(isset($_POST['updateNotes'])) {

    if(isset($_POST['id'])) $id = sanitizeString($_POST['id']);
    if(isset($_POST['notes'])) $notes = sanitizeString($_POST['notes']);

    $query = "UPDATE sites
          SET notes='$notes'
          WHERE id='$id'";

    if (!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
    }


    $db->close();
}

/*if(isset($_POST['updateDescription'])) {
    if (isset($_POST['id'])) $id = sanitizeString($_POST['id']);
    if (isset($_POST['description'])) $description = sanitizeString($_POST['description']);

    $query = "UPDATE sites
              SET description='$description'
              WHERE id='$id'";

    if (!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
    }

    $db->close();
}

if(isset($_POST['updateCMS'])) {
    if (isset($_POST['id'])) $id = sanitizeString($_POST['id']);
    if (isset($_POST['cms'])) $cms = sanitizeString($_POST['cms']);

    $query = "UPDATE sites
              SET cms='$cms'
              WHERE id='$id'";

    if (!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
    }

    $db->close();
}


if(isset($_POST['updateSiteName'])) {
    if (isset($_POST['id'])) $id = sanitizeString($_POST['id']);
    if (isset($_POST['siteName'])) $name = sanitizeString($_POST['siteName']);

    $query = "UPDATE sites
              SET name='$name'
              WHERE id='$id'";

    if (!$result = $db->query($query)) {
        die('There was an error running the query [' . $db->error . ']');
    }

    $db->close();
}*/

?>