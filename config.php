<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// ExpressionEngine Config Items
// Find more configs and overrides at
// https://docs.expressionengine.com/latest/general/system-configuration-overrides.html

$config['app_version'] = '6.0.3';
$config['encryption_key'] = '898b2a3132e56dce2b50b9f28603473fc7ee1b94';
$config['session_crypt_key'] = '5b5d92bcd192b8966c1d0273778dd514a71bf2d1';
$config['database'] = array(
	'expressionengine' => array(
		'hostname' => 'mysql.res-extensa.com',
		'database' => 'resextensa',
		'username' => 'resextensa',
		'password' => 'Admin13579',
		'dbprefix' => 'exp_',
		'char_set' => 'utf8mb4',
		'dbcollat' => 'utf8mb4_unicode_ci',
		'port'     => ''
	),
);
$config['show_ee_news'] = 'y';
$config['allow_php'] = 'y';

$config['mime_whitelist_additions'] = array(
	'application/octet-stream',
	'text/plain',
  );

// EOF