<?php
function sanitizeString($var) {
	
	$var = stripslashes($var);
	$var = strip_tags($var);
	$var = htmlentities($var);
	$var = addslashes($var);
	return $var;
}

function sanitizeMySQL($connection, $var) {
	
	$var = mysqli_real_escape_string($connection, $var);
	$var = sanitizeString($var);
	return $var;
}
?>