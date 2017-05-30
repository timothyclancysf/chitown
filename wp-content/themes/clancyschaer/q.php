<?php
$seconds = 3600;
header("Cache-Control: private, max-age=$seconds");
header("Expires: ".gmdate('r', time()+$seconds));
header("Pragma: cache");

$host = $_SERVER['HTTP_HOST'];

if ($host == 'localhost') {
	$path = $_SERVER['DOCUMENT_ROOT'].'/clancyschaer';
} elseif ($host == 'clancyschaer.wideumbrella.com') {
	$path = $_SERVER['DOCUMENT_ROOT'].'/clancyschaer';
} else {
	$path = $_SERVER['DOCUMENT_ROOT'].'/';
}

define('WP_USE_THEMES', false);
require($path .'/wp-load.php');

$id = intval($_GET["pid"]);

global $post;

$post = get_post( $id );

include 'templates/modal-item.php';