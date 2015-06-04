  <?php
require_once './php/login.php';

$query="SELECT sites.id, sites.category, sites.description, sites.url, sites.name AS site_name, cms_types.name, cms_types.id AS cms_id
		FROM sites
		LEFT JOIN cms_types
		ON sites.cms=cms_types.id
		ORDER BY sites.id ASC";
			
if(!$result = $db->query($query))
{
    die('There was an error running the query [' . $db->error . ']');
}

$output = '';

while($row = $result->fetch_assoc()){
  	
  	$output = $output . ' <tr class="primary_info">
  	                        <td>
      						    <span class="site_name">' . $row['site_name'] . '</span>
      						    <input type="hidden" name="id" value="' . $row['id'] . '">
      						</td>'
      					.	'<td>
      						    <span class="description">' . $row['description'] . '</span>
      						    <input type="hidden" name="id" value="' . $row['id'] . '">
      						   </td>'
                        .   '<td>
      						    <span class="cms">' . $row['name'] . '</span>
      						    <input type="hidden" name="cmsId" value="' . $row['cms_id'] . '">
                            </td>
    					</tr>
                        <tr class="additonal_info">
                            <td colspan="1">
                                <span class="category"><strong>Type:</strong> ' . $row['category'] . '</span>
                            </td>
                            <td colspan="2">
                                <span class="site_url"><strong>URL:</strong> ' . $row['url'] . '</span>
                            </td>
                        </tr> ';
}
	
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Database Manager</title>

    <!-- Bootstrap -->
    <link href="./css/bootstrap.css" rel="stylesheet">
    <link href="./css/tweaks.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="./font-awesome-4.3.0/css/font-awesome.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  
  <div class="container-fluid">

    <div class="row text-center">
        <div class="heading">
            <div class="panel panel-default">
                <div class="panel-body">
                    <h1>Database Manager</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="add_site">
            <div>
                <span class="label label-primary">+ Add New Site</span>
            </div>
            <div style="display:none">
                <span class="label label-primary">- Add New Site</span>
            </div>
        </div>
    </div>

    <form class="form-horizontal add_site_form" method="post">
        <div class="add_item_panel panel panel-default col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1" style="display:none">
            <div class="panel-body">
                <fieldset>
                    <legend>Add New Site <span class="close_panel" ><span class="fa fa-times pull-right"></span></span></legend>
                    <div class="form-group">
                        <label for="inputSiteName" class="col-lg-2 col-md-2 col-sm-2 col-xs-12 control-label">Name</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                            <input type="text" class="form-control" id="inputSiteName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputDescription" class="col-lg-2 col-md-2 col-sm-2 col-xs-12 control-label">Description</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                            <input type="text" class="form-control" id="inputDescription">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 col-xs-12 control-label">CMS</label>
                        <div class="col-lg-2 col-md-2 col-sm-3">
                            <div class="radio">
                                <label>
                                    <input type="radio" name="optionsRadios" id="rawphp" value="1" checked="">
                                    Raw PHP
                                </label>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-3">
                            <div class="radio">
                                <label>
                                    <input type="radio" name="optionsRadios" id="wordpress" value="2">
                                    Wordpress
                                </label>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-3">
                            <div class="radio">
                                <label>
                                    <input type="radio" name="optionsRadios" id="joomla" value="3">
                                    Joomla
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2">
                            <button type="reset" class="btn btn-default add_site_clear">Clear</button>
                            <button type="button" class="btn btn-primary add_site_button">Add</button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </form>

    <div class="container">
        <div class="row">

            <div class="outer-table col-lg-12">

                <div class="sites text-center col-lg-12">

                    <div class="sites_search">
                        <form role="search">
                            <div class="form-group">
                                <div class="input-group col-lg-4 col-med-4 col-lg-offset-8 col-md-offset-8">
                                    <span class="input-group-addon"><span class="fa fa-search"></span></span>
                                    <input type="text" class="form-control" placeholder="Search">
                                </div>
                            </div>
                        </form>
                    </div>

                    <form class="form edit_item">
                        <table class="sites_table table table-hover table-striped table-responsive">
                            <thead>
                                <tr>
                                    <th class="col-lg-4">Name</th>
                                    <th class="col-lg-4">Description</th>
                                    <th class="col-lg-4">CMS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php echo $output; ?>
                            </tbody>
                        </table>
                    </form

                </div>

            </div>

        </div>
    </div>

    <div class="row">
        <div class="modal fade" id="edit_site_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Edit Site</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal edit_site_form" method="post">
                            <fieldset>
                                <div class="form-group">
                                    <label for="inputSiteName" class="control-label">Name</label>
                                    <div>
                                        <input type="text" class="form-control" id="editSiteName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputDescription" class="control-label">Description</label>
                                    <div>
                                        <input type="text" class="form-control" id="editDescription">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">CMS</label>
                                     <select class="form-control" id="selectCMS">
                                         <option value="1">Raw PHP</option>
                                         <option value="2">Wordpress</option>
                                         <option value="3">Joomla</option>
                                     </select>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" name="site_id" value="" id="modalId">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary edit_modal_save">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>


    </footer>

  </div>
  				
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/functionality.js"></script>

  </body>
</html>

<?php

	$db->close();
?>