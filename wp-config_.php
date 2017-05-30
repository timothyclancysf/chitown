<?php
/** Enable W3 Total Cache */
 // Added by W3 Total Cache

/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'db157924_cs_wp');

/** MySQL database username */
define('DB_USER', 'db157924_cs_wu');

/** MySQL database password */
define('DB_PASSWORD', '8fab5e2e');

/** MySQL hostname */
define('DB_HOST', 'internal-db.s157924.gridserver.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Kwxh8J0S=VH,/ML7Nk9P6RrzQ[]}#I&T_deI2o^|n3v5Y@4f+F:x>wCtluAC)25x');
define('SECURE_AUTH_KEY',  'Md?Ppy&#_DtFDrq{3Bb}.2:6L[zneTs`p:G5(sBd+Z{-7(GT+7(/II9f(r3i~-<W');
define('LOGGED_IN_KEY',    'J~;o4;tYaWc8,H/mK~^ACI]pc=rrUl:KJI-HisU%lnG-!`;#uFJm]|Stx+io5|e_');
define('NONCE_KEY',        '-r2Nt3P+2s+kOSKOC1aL1s%_Cg9Sf[&,duu;gj`-I`!IAr-;nfW.fRrXp<n?cP-r');
define('AUTH_SALT',        'b^</so>w6f9A!~zQ}aH![<p^D3[iGKv2*2v)b+1y$`@(5<8|Fz3o^tBrU|GIyhRc');
define('SECURE_AUTH_SALT', 'IJLq9xmI9M#)yd;DsB.-PL?g]R$Krxh5+U<#&8-Jfghr=|h>M|jLWCwA+hU<DQh&');
define('LOGGED_IN_SALT',   ',p&MG6Q3(LO0+@Y:*8Xz3./i.$ph_4wd,D%4` @LbZ<N`ma?KQX5BaUsJB,Cu^F9');
define('NONCE_SALT',       'CMW|W#a#;ML!yc}|HJpbI(-e:2lRsS%Bf@*a#b{v|cu`yhUP$EMY(=htUnR/WC(3');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
