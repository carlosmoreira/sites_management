<?php

require_once './login.php';
require_once './sanitization.php';

if (isset($_GET['search'])) $search = sanitizeString($_GET['search']);

    if($search) {

        $query = "SELECT sites.id, sites.category, sites.description, sites.url, sites.dev_url, sites.notes, sites.name AS site_name, cms_types.name, cms_types.id AS cms_id, categories.name AS category, categories.id AS cats_id
                FROM sites
                LEFT JOIN cms_types
                ON sites.cms=cms_types.id
                INNER JOIN categories
                ON sites.category=categories.id
                WHERE sites.name
                LIKE '%$search%'
                ORDER BY sites.id ASC";

        if (!$result = $db->query($query)) {
            die('There was an error running the query [' . $db->error . ']');
        }

        echo retrieveData($result);
    }
    else {

        $query = "SELECT sites.id, sites.category, sites.description, sites.url, sites.dev_url, sites.notes, sites.name AS site_name, cms_types.name, cms_types.id AS cms_id, categories.name AS category, categories.id AS cats_id
                FROM sites
                LEFT JOIN cms_types
                ON sites.cms=cms_types.id
                INNER JOIN categories
                ON sites.category=categories.id
                ORDER BY sites.id ASC";

        if (!$result = $db->query($query)) {
            die('There was an error running the query [' . $db->error . ']');
        }

        echo retrieveData($result);
    }

    $db->close();

    function retrieveData($result) {

        $found = '';

        while ($row = $result->fetch_assoc()) {

            $found = $found . '<tr class="primary_info">
                            <td>
                                <span class="site_name">' . $row['site_name'] . '</span>
                                <input type="hidden" name="id" value="' . $row['id'] . '">
                            </td>'
                . '<td>
                                <span class="description">' . $row['description'] . '</span>
                                <input type="hidden" name="id" value="' . $row['id'] . '">
                            </td>'
                . '<td>
                                <span class="cms">' . $row['name'] . '</span>
                                <input type="hidden" name="cmsId" value="' . $row['cms_id'] . '">
                            </td>
                        </tr>
                        <tr class="hide additional_info_row">
                            <td colspan="3">
                                <div class="additional_info">
                                    <div class="col-lg-4 col-md-4 col-sm-6 details">
                                        <span class="category"><span class="bold">Type : </span>' . $row['category'] . '</span>
                                        <input type="hidden" name="typeId" value="' . $row['cats_id'] . '"">
                                        <br>
                                        <span class="site_url"><span class="bold">URL : </span><a href="' . $row['url'] . '" target="_blank">' . $row['url'] . '</a></span>
                                        <br>
                                        <span class="dev_url"><span class="bold">Dev URL : </span><a href="' . $row['dev_url'] . '" target="_blank">' . $row['dev_url'] . '</a></span>
                                        <hr>
                                    </div>
                                    <div class="col-lg-8 col-md-8 col-sm-6 site_notes">
                                        <div class="form-group">
                                          <label class="bold" for="textArea" control-label">Notes</label>
                                          <div>
                                            <textarea class="form-control" rows="3">' . $row['notes'] . '</textarea>
                                          </div>
                                          <div class="pull-left">
                                            <button class="btn btn-primary btn-sm update_notes" type="button">Update</button>
                                          </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="row"><hr></div>
                                        <div class="edit_delete">
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <button class="btn btn-block btn-default edit_site_btn" type="button">
                                                    <span class="fa fa-pencil-square-o text-warning"></span>
                                                    <span class="bold">Edit</span>
                                                </button>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <button class="btn btn-block btn-default delete_site_btn" type="button">
                                                    <span class="fa fa-trash-o text-danger"></span>
                                                    <span class="bold">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>';
        }

        return $found;
    }

?>