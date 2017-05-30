<?php
/* shortcodes */
function jsp_dcs_shortcode_name($atts) {
	extract( shortcode_atts( array(
		'type' => '2',
		'req' => 'news',
		'lang' => 'en',
	), $atts ) );

}
add_shortcode('shortcode_name', 'jsp_dcs_shortcode_name');

function jsp_getoption($atts,$content = null){
    extract( shortcode_atts( array(
        'option' => '',
    ), $atts, 'getlink' ) );

    return get_option( $option );
 }
 add_shortcode('getoption', 'jsp_getoption');


function jsp_getLink( $atts, $content = null ) {
	extract( shortcode_atts( array(
		'slug' => '',
		'class' => ''
	), $atts, 'getlink' ) );

	$custompost['slug'] = $atts['slug'];
    $custompost['args'] = array(
      'name' => $custompost['slug'],
      'post_status' => 'publish'
    );

    $custompost = get_posts($custompost['args']);

    $class = $atts['class'];
    if ( in_category('projects',$custompost[0]->ID) ) {
        $cat = 'project';
    } else {
        $cat = 'news';
    }

    $permalink = get_permalink( $custompost[0]->ID);
    $pid =  $custompost[0]->ID;

	return '<a href="'.$permalink.'" class="manual-modal link-project'.$class.'" data-target="#SiteModal" data-modal-type="mtype-'.$cat.'" data-pid="'.$pid.'">' . $content . '</a>';
}
add_shortcode( 'getlink', 'jsp_getLink' );

function jsp_get_posts( $atts, $content = null ) {
    extract( shortcode_atts( array(
        'slug' => '',
        'class' => '',
        'container' => true
    ), $atts, 'getposts' ) );

    $cat = get_category_by_slug( $slug );
    $posts = get_posts ("cat=$cat->term_id&posts_per_page=-1");
    if ($posts) {
        global $post;
        $content = '';
        if($container) {
            $content .= '<ul class="row list-unstyled '.$class.'">';
        }

        foreach ($posts as $post_data) {
            $post = $post_data;
            setup_postdata($post);
            $content .= load_template_part("templates/{$slug}",'item');
        }
        if($container) {
        $content .= '</ul>';
        }
        wp_reset_postdata();
    }
    return $content;
}
add_shortcode( 'getposts', 'jsp_get_posts' );

function jsp_sc_aboutSlider( $atts, $content = null ) {
    extract( shortcode_atts( array(
        'slug' => '',
        'type' => 'page'
    ), $atts, 'aboutslider' ) );

    $post = get_page_by_path($slug,OBJECT,$type);

    $imgs = rwmb_meta( 'jsp_aboutSlider', 'type=image', $post->ID );
    $content = '';

    foreach ($imgs as $img) {
        //$content .= '<li class="item"><img src="'.get_template_directory_uri().'/img/ib_.png" data-deferred-img="'.$img['full_url'].'" class="deferred"></li>';
        $content .= '<li class="item"><img src="'.$img['full_url'].'"></li>';
    }

    return $content;
}
add_shortcode( 'aboutslider', 'jsp_sc_aboutSlider' );

function jsp_sc_tplpart( $atts ) {
    extract( shortcode_atts( array(
        'name' => ''
    ), $atts, 'gettemplate' ) );
    ob_start();
    get_template_part( $atts['name'] );
    return ob_get_clean();
}
add_shortcode( 'gettemplate', 'jsp_sc_tplpart' );

?>