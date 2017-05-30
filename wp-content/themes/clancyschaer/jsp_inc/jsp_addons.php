<?php

function twentyfourteen_wp_title( $title, $sep ) {
    global $paged, $page;

    if ( is_feed() ) {
        return $title;
    }

    // Add the site name.
    $title .= get_bloginfo( 'name' );

    // Add the site description for the home/front page.
    $site_description = get_bloginfo( 'description', 'display' );
    if ( $site_description && ( is_home() || is_front_page() ) ) {
        $title = "$title $sep $site_description";
    }

    // Add a page number if necessary.
    if ( $paged >= 2 || $page >= 2 ) {
        $title = "$title $sep " . sprintf( __( 'Page %s', 'twentyfourteen' ), max( $paged, $page ) );
    }

    return $title;
}
add_filter( 'wp_title', 'twentyfourteen_wp_title', 10, 2 );

// Re-define meta box path and URL
define( 'RWMB_URL', trailingslashit( get_stylesheet_directory_uri() . '/jsp_inc/meta-box' ) );
define( 'RWMB_DIR', trailingslashit( STYLESHEETPATH . '/jsp_inc/meta-box' ) );
// Include the meta box script
require_once RWMB_DIR . 'meta-box.php';
// Include the meta box definition (the file where you define meta boxes, see `demo/demo.php`)
include get_template_directory() . '/jsp_inc/metaboxes.php';

//Require taxonomy-meta
require_once get_template_directory() . '/jsp_inc/taxonomy-meta/taxonomy-meta.php';
//Include taxonomy-meta definitions
include get_template_directory() . '/jsp_inc/metasections.php';


if (class_exists('Nav_Menu_Images')) {

    function md_nmi_custom_content( $content, $item_id, $original_content ) {
      $content = $content . '<span class="link-title">' . $original_content . '</span>';

      return $content;
  }
  add_filter( 'nmi_menu_item_content', 'md_nmi_custom_content', 10, 3 );
}

function filter_ptags_on_images($content){
   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}

add_filter('the_content', 'filter_ptags_on_images');

// Disables filters on textareas (e.g. category description)
foreach (array('pre_term_description', 'pre_link_description', 'pre_link_notes', 'pre_user_description') as $filter) {
    remove_filter($filter, 'wp_filter_kses');
}

foreach (array('term_description', 'link_description', 'link_notes', 'user_description') as $filter) {
    remove_filter($filter, 'wp_kses_data');
}

/**
 * Add to extended_valid_elements for TinyMCE
 *
 * @param $init assoc. array of TinyMCE options
 * @return $init the changed assoc. array
 */
function change_mce_options( $init ) {
 //code that adds additional attributes to the pre tag
 $ext = 'div[*],section[*],article[*],header[*],footer[*],nav[*]';

 //if extended_valid_elements alreay exists, add to it
 //otherwise, set the extended_valid_elements to $ext
 if ( isset( $init['extended_valid_elements'] ) ) {
  $init['extended_valid_elements'] .= ',' . $ext;
 } else {
  $init['extended_valid_elements'] = $ext;
 }

 //important: return $init!
 return $init;
}
add_filter('tiny_mce_before_init', 'change_mce_options');

function remove_empty_p($content){
    $content = force_balance_tags($content);
    return preg_replace('#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $content);
}
add_filter('the_content', 'remove_empty_p', 20, 1);

function dashesToCamelCase($string, $capitalizeFirstCharacter = false) {
    $str = str_replace(' ', '', ucwords(str_replace('-', ' ', $string)));

    if (!$capitalizeFirstCharacter) {
        $str[0] = strtolower($str[0]);
    }

    return $str;
}


function load_template_part($template_name, $part_name=null) {
    ob_start();
    get_template_part($template_name, $part_name);
    $var = ob_get_contents();
    ob_end_clean();
    return $var;
}

?>