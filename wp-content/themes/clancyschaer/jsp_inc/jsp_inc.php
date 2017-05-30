<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', '0');

function cs_theme_setup()
{
    register_nav_menus(
        array(
            'primary' => __( 'Flyout', 'cs' ),
            )
        );

}
add_action( 'after_setup_theme', 'cs_theme_setup' );

if ( function_exists( 'add_image_size' ) ) {
    add_image_size( 'square', 200, 200, true);
    add_image_size( 'tablet-thumb', 600, 600);
    add_image_size( 'thumb-400', 400, 400);
    add_image_size( 'desktop', 2560, 1600);
    add_image_size( 'tablet', 2048, 1536);
    add_image_size( 'phone', 1280, 720);
}

function jsp_the_post_thumbnail($size = "default" , $type="jsp_featured") {
    global $post;

    if ( get_post_meta($post->ID, $type, true) ) {
        $thumbsize = $size;
        $images = get_post_meta( $post->ID, $type, false );
        $src = wp_get_attachment_image_src( $images[0], $thumbsize );
        echo $src[0]; //returns URL
    }
}

function jsp_the_background_image($size = "default" , $type="jsp_backgroundImg") {
    global $post;

    if ( get_post_meta($post->ID, $type, true) ) {
        $thumbsize = $size;
        $images = get_post_meta( $post->ID, $type, false );
        $src = wp_get_attachment_image_src( $images[0], $thumbsize );
        echo $src[0];
    }
}

function jsp_get_the_date()
{
    global $post;

    if ( get_post_meta( $post->ID, 'jsp_postdate', true) ) {
        $dateFormat = get_option('date_format');
        $postDate = get_post_meta( $post->ID, 'jsp_postdate', true);
        $formattedDate = date( $dateFormat, strtotime($postDate) );

        return $formattedDate;

    } else {
        return get_the_date();
    }
}

function jsp_get_the_author()
{
    global $post;

    if ( get_post_meta( $post->ID, 'jsp_author', true) ) {
        $author = get_post_meta( $post->ID, 'jsp_author', true);

        return $author;

    } else {
        return get_the_author();
    }
}

function jsp_get_the_video($single = true, $args='')
{
    global $post;

    if ( get_post_meta( $post->ID, 'jsp_oembed_post_videos') ) {
        if ($args) {
            $args = str_replace(',','&',$args);
            parse_str($args,$args);
        } else {
            $args = array();
        }

        $video = get_post_meta( $post->ID, 'jsp_oembed_post_videos', $single);

        if ($single) {
            if (is_array($video)) {
                return wp_oembed_get($video[0],$args);
            } else {
                return wp_oembed_get($video,$args);
            }
        } else {
            $vids = array();
            foreach ($video[0] as $vid) {
                array_push($vids,wp_oembed_get($vid,$args));
            }

            return implode($vids);
        }

    } else {
        return false;
    }
}

function jsp_get_product_video($single = true, $args='')
{
    global $post;

    if ( get_post_meta( $post->ID, 'jsp_oembed_videos') ) {
        if ($args) {
            $args = str_replace(',','&',$args);
            parse_str($args,$args);
        } else {
            $args = array();
        }

        $video = get_post_meta( $post->ID, 'jsp_oembed_videos', $single);

        if ($single) {
            if (is_array($video)) {
                return wp_oembed_get($video[0],$args);
            } else {
                return wp_oembed_get($video,$args);
            }
        } else {
            $vids = array();
            foreach ($video[0] as $vid) {
                array_push($vids,wp_oembed_get($vid,$args));
            }

            return implode($vids);
        }

    } else {
        return false;
    }
}

function jsp_get_cats_inc($slugs)
{
    if ($slugs) {
        $slug_ids = array();
        $slugs = explode(',',trim($slugs));
        foreach ($slugs as $slug) {
            $slugID = get_category_by_slug($slug);
            if ($slugID) {
                $slugID = $slugID->term_id;
                array_push($slug_ids,$slugID);
            } else {
                continue;
            }
        }

        return implode(',',$slug_ids);
    }
}

function jsp_get_cats_ex($slugs)
{
    if ($slugs) {
        $slug_ids = array();
        $slugs = explode(',',trim($slugs));
        foreach ($slugs as $slug) {
            $slugID = get_category_by_slug($slug);
            if ($slugID) {
                $slugID = -$slugID->term_id;
                array_push($slug_ids,$slugID);
            } else {
                continue;
            }
        }

        return implode(',',$slug_ids);
    }
}

function jsp_get_cats_inex($include,$exclude)
{
    $cats = array();
    array_push($cats,jsp_get_cats_inc($include));
    array_push($cats,jsp_get_cats_ex($exclude));
    $cats = array_filter($cats);
    $catIDs = implode(',',$cats);

    return $catIDs;
}

function jsp_switch_to_child_template() {
    global $post;

    if (is_page() && !get_page_template_slug( $post->ID )) {
    $ancestors = $post->ancestors;
    $appender = '_child';

    if ($ancestors) {
        $templatePath = TEMPLATEPATH . '/';
            $parent_id = get_post( end($ancestors) );
            $parent_slug = $parent_id->post_name;

            $parent_page_template = 'page-'.$parent_slug.'.php';
            $parent_page_child_template = 'page-'.$parent_slug.$appender.'.php';

            $template = file_exists($templatePath.$parent_page_child_template) ? $templatePath.$parent_page_child_template : $templatePath.$parent_page_template;

            if (file_exists($template)) {
                load_template($template);
                exit;
            }
        } else {
            return true;
        }
    }
}
add_action('template_redirect','jsp_switch_to_child_template');

function jsp_switch_to_tax_template() {
    global $post;

    if ( is_post_type_archive() && is_tax() ) {

        $tax = get_query_var('taxonomy');
        $term = get_query_var('term');

        $templatePath = TEMPLATEPATH . '/';

        $tax_template = $templatePath.'taxonomy-'.$tax.'.php';
        $term_template = $templatePath.'taxonomy-'.$tax.'-'.$term.'.php';

        if ( file_exists($term_template) ) {
            load_template($term_template);
            exit;
        } elseif ( file_exists($tax_template) ) {
            load_template($tax_template);
            exit;
        } else {
            return true;
        }
    }
}
add_action('template_redirect','jsp_switch_to_tax_template');

function jsp_get_the_slug()
{
    global $post;

    $post_data = get_post($post->ID, ARRAY_A);
    $slug = $post_data['post_name'];

    return $slug;
}

function jsp_get_meta($metaboxID, $single = false)
{
    global $post;

    $meta = get_post_meta( $post->ID, $metaboxID, $single ) ?: '';

    return $meta;

}

function jsp_mcekit_editor_style($url)
{
    if ( !empty($url) )
        $url .= ',';

    $url .= trailingslashit( get_stylesheet_directory_uri() ) . '/style-editor.css';

    return $url;
}
add_filter('mce_css', 'jsp_mcekit_editor_style');

function jsp_mce_editor_buttons($buttons)
{
    array_unshift( $buttons, 'styleselect' );

    return $buttons;
}
add_filter( 'mce_buttons_2', 'jsp_mce_editor_buttons' );

function jsp_mce_before_init($settings)
{
    $style_formats = array(

        array(
            'title' => 'Pull Left',
            'selector' => 'div',
            'classes' => 'pull-left',
            'wrapper' => false
            ),
        array(
            'title' => 'Pull Right',
            'selector' => 'div',
            'classes' => 'pull-right',
            'wrapper' => false
            ),
        array(
            'title' => 'Clearfix',
            'block' => 'div',
            'classes' => 'clearfix',
            'wrapper' => true
            )
);

$settings['style_formats'] = json_encode( $style_formats );

return $settings;

}
add_filter( 'tiny_mce_before_init', 'jsp_mce_before_init' );

function add_my_editor_style() {
    add_editor_style('style-editor.css');
}
add_action( 'admin_init', 'add_my_editor_style' );

function jsp_admin_styles()
{
    wp_register_style( 'jsp_admin_stylesheet', get_stylesheet_directory_uri(). '/style-admin.css' );
    wp_enqueue_style( 'jsp_admin_stylesheet' );
}
add_action( 'admin_enqueue_scripts', 'jsp_admin_styles' );

// get taxonomies terms links
function jsp_get_the_terms()
{
  // get post by post id
  $post = get_post( $post->ID );

  // get post type by post
  $post_type = $post->post_type;

  // get post type taxonomies
  $taxonomies = get_object_taxonomies( $post_type, 'objects' );

  $out = array();
  foreach ($taxonomies as $taxonomy_slug => $taxonomy) {

    // get the terms related to post
    $terms = get_the_terms( $post->ID, $taxonomy_slug );

    if ( !empty( $terms ) ) {
      foreach ($terms as $term) {
        $out[] =
          '  <a href="'
        .    get_term_link( $term->slug, $taxonomy_slug ) .'">'
        .    $term->name
        . "</a>";
      }
    }
  }

  return implode(',', $out );
}

function link_to_plain( $id , $type = 1 ) {
    global $post;
    $postID = $id ?: $post->ID;
    $procFile = 'q.php';
    echo get_template_directory_uri().'/'.$procFile.'?m='.$type.'&q='.$postID;
}

$sns_url_setting = new sns_url_setting();

class sns_url_setting {
    function __construct( ) {
        add_filter( 'admin_init' , array( &$this , 'register_flyout_blurb' ) );
        add_filter( 'admin_init' , array( &$this , 'register_phone_field' ) );
        add_filter( 'admin_init' , array( &$this , 'register_sns_fb_field' ) );
        add_filter( 'admin_init' , array( &$this , 'register_sns_tw_field' ) );
        add_filter( 'admin_init' , array( &$this , 'register_sns_in_field' ) );
        add_filter( 'admin_init' , array( &$this , 'register_sns_gp_field' ) );
        add_filter( 'admin_init' , array( &$this , 'register_sns_pin_field' ) );
    }

    function register_flyout_blurb() {
        register_setting( 'general', 'flyout_blurb', 'esc_attr' );
        add_settings_field('flyout_blurb', '<label for="flyout_blurb">'.__('Flyout Blurb' , 'flyout_blurb' ).'</label>' , array(&$this, 'fields_flyout_blurb_html') , 'general' );
    }
    function fields_flyout_blurb_html() {
        $value = get_option( 'flyout_blurb', '' );
        echo '<input type="text" id="flyout_blurb" name="flyout_blurb" value="' . $value . '" />';
    }

    function register_phone_field() {
        register_setting( 'general', 'phone_num', 'esc_attr' );
        add_settings_field('phone_num', '<label for="phone_num">'.__('Phone Number' , 'phone_num' ).'</label>' , array(&$this, 'fields_phone_html') , 'general' );
    }
    function fields_phone_html() {
        $value = get_option( 'phone_num', '' );
        echo '<input type="text" id="phone_num" name="phone_num" value="' . $value . '" />';
    }

    function register_sns_fb_field() {
        register_setting( 'general', 'sns_url_fb', 'esc_attr' );
        add_settings_field('sns_url_fb', '<label for="sns_url_fb">'.__('Facebook URL' , 'sns_url_fb' ).'</label>' , array(&$this, 'fields_fb_html') , 'general' );
    }
    function fields_fb_html() {
        $value = get_option( 'sns_url_fb', '' );
        echo '<input type="text" id="sns_url_fb" name="sns_url_fb" value="' . $value . '" />';
    }

    function register_sns_tw_field() {
        register_setting( 'general', 'sns_url_tw', 'esc_attr' );
        add_settings_field('sns_url_tw', '<label for="sns_url_tw">'.__('Twitter URL' , 'sns_url_tw' ).'</label>' , array(&$this, 'fields_tw_html') , 'general' );
    }
    function fields_tw_html() {
        $value = get_option( 'sns_url_tw', '' );
        echo '<input type="text" id="sns_url_tw" name="sns_url_tw" value="' . $value . '" />';
    }

    function register_sns_gp_field() {
        register_setting( 'general', 'sns_url_gp', 'esc_attr' );
        add_settings_field('sns_url_gp', '<label for="sns_url_gp">'.__('Google+ URL' , 'sns_url_gp' ).'</label>' , array(&$this, 'fields_gp_html') , 'general' );
    }
    function fields_gp_html() {
        $value = get_option( 'sns_url_gp', '' );
        echo '<input type="text" id="sns_url_gp" name="sns_url_gp" value="' . $value . '" />';
    }

    function register_sns_in_field() {
        register_setting( 'general', 'sns_url_in', 'esc_attr' );
        add_settings_field('sns_url_in', '<label for="sns_url_in">'.__('LinkedIn URL' , 'sns_url_in' ).'</label>' , array(&$this, 'fields_in_html') , 'general' );
    }
    function fields_in_html() {
        $value = get_option( 'sns_url_in', '' );
        echo '<input type="text" id="sns_url_in" name="sns_url_in" value="' . $value . '" />';
    }

    function register_sns_pin_field() {
        register_setting( 'general', 'sns_url_pin', 'esc_attr' );
        add_settings_field('sns_url_pin', '<label for="sns_url_pin">'.__('Pinterest URL' , 'sns_url_pin' ).'</label>' , array(&$this, 'fields_pin_html') , 'general' );
    }
    function fields_pin_html() {
        $value = get_option( 'sns_url_pin', '' );
        echo '<input type="text" id="sns_url_pin" name="sns_url_pin" value="' . $value . '" />';
    }

}

function add_deferred_img($content) {
    $dom = new DOMDocument();
    $content = mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8");
    @$dom->loadHTML($content);

    foreach ($dom->getElementsByTagName('img') as $node) {
        $oldsrc = $node->getAttribute('src');
        $oldclass = $node->getAttribute('class');
        $node->setAttribute("data-deferred-img", $oldsrc );
        $node->setAttribute("class", $oldclass . ' deferred' );
        $newsrc = '';
        $node->setAttribute("src", $newsrc);
    }

    $newHtml = preg_replace('~<(?:!DOCTYPE|/?(?:html|body))[^>]*>\s*~i', '', $dom->saveHTML());
    return $newHtml;
}

function print_filters_for( $hook = '' ) {
    global $wp_filter;
    if( empty( $hook ) || !isset( $wp_filter[$hook] ) )
        return;

    print '<pre>';
    print_r( $wp_filter[$hook] );
    print '</pre>';
}

include get_template_directory() . '/jsp_inc/jsp_shortcodes.php';
include get_template_directory() . '/jsp_inc/jsp_addons.php';
include_once get_template_directory() . '/jsp_inc/mobile-detect/Mobile_Detect.php';
$detect = new Mobile_Detect;
$isMobile = $detect->isMobile();
$isTablet = $detect->isTablet();
