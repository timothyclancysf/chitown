<?php

$jsp_slideType = '';
function jsp_register_meta_boxes( $meta_boxes )
{
    global $jsp_slideType;
    $meta_boxes = array();

    $prefix = 'jsp_';

    if ( isset( $_GET['post'] ) ) {
        $post_id = $_GET['post'];
    }
    elseif ( isset( $_POST['post_ID'] ) ) {
        $post_id = $_POST['post_ID'];
    }
    else {
        $post_id = false;
    }

    if ($post_id) {
        $jsp_slideType = explode(' ', get_post_meta($post_id, $prefix.'slide_type', true) )[0];
    }

    $meta_boxes[] = array(
        'title' => __( 'Slide Type', 'rwmb' ),
        'pages' => array( 'page' ),
        'context' => 'side',
        'priority' => 'high',
        'fields' => array(
            array(
                'name'     => __( '', 'rwmb' ),
                'id'       => "{$prefix}slide_type",
                'type'     => 'select_advanced',
                'options'  => array(
                    'home' => __( 'Home', 'rwmb' ),
                    'intro-text' => __( 'Intro Text', 'rwmb' ),
                    'testimonial' => __( 'Testimonial', 'rwmb' ),
                    'type-boxed' => __( 'Boxed', 'rwmb' ),
                    'video' => __( 'Video', 'rwmb' ),
                    'adpage type1' => __( 'Ad Page 1', 'rwmb' ),
                    'adpage type2' => __( 'Ad Page 2', 'rwmb' ),
                    'adpage type3' => __( 'Ad Page 3', 'rwmb' ),
                    'adpage type4' => __( 'Ad Page 4', 'rwmb' ),
                ),
                'multiple'    => false,
                'placeholder' => __( 'Select an Item', 'rwmb' ),
            )
        )
    );

    $meta_boxes[] = array(
        'title' => __( 'Featured Image', 'rwmb' ),
        'pages' => array( 'post', 'page' ),
        'context' => 'side',
        'priority' => 'low',
        'fields' => array(
            array(
                'name'             => __( '', 'rwmb' ),
                'id'               => "{$prefix}featured",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
        )
    );

    $meta_boxes[] = array(
        'title' => __( 'Background Image', 'rwmb' ),
        'pages' => array( 'post', 'page' ),
        'context' => 'side',
        'priority' => 'low',
        'only_on'    => array(
            'slide' => 'adpage'
        ),
        'fields' => array(
            array(
                'name'             => __( 'Desktop', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Tablet', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_tab",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Tablet Portrait', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_tab_p",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Phone', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_phone",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Phone Portrait', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_phone_p",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
        )
    );

    $meta_boxes[] = array(
        'title' => __( 'Background Video', 'rwmb' ),
        'pages' => array( 'page' ),
        'context' => 'side',
        'priority' => 'low',
        'only_on'    => array(
            'slide' => ['home', 'video']
        ),
        'fields' => array(
            array(
                'name' => __( 'Video', 'rwmb' ),
                'id'   => "{$prefix}backgroundVid",
                'type' => 'file_advanced',
                'max_file_uploads' => 4,
                'mime_type' => 'video',
            ),
            array(
                'name'             => __( 'Video still to preload', 'rwmb' ),
                'id'               => "{$prefix}backgroundVidPreload",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
             array(
                'name'             => __( 'Image to overlay video', 'rwmb' ),
                'id'               => "{$prefix}backgroundVidOverlay",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            )
        )
    );


    $meta_boxes[] = array(
        'title' => __( 'Mobile Background Image', 'rwmb' ),
        'pages' => array( 'page' ),
        'context' => 'side',
        'priority' => 'low',
        'only_on'    => array(
            'slide' => 'video'
        ),
        'fields' => array(
           array(
                'name'             => __( 'Tablet', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_tab",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Tablet Portrait', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_tab_p",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Phone', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_phone",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            ),
            array(
                'name'             => __( 'Phone Portrait', 'rwmb' ),
                'id'               => "{$prefix}backgroundImg_phone_p",
                'type'             => 'image_advanced',
                'max_file_uploads' => 1,
            )
        )
    );

    $meta_boxes[] = array(
        'title' => __( 'Background Color', 'rwmb' ),
        'pages' => array( 'post', 'page' ),
        'context' => 'side',
        'priority' => 'low',
        'only_on'    => array(
            'slide' => 'testimonial'
        ),
        'fields' => array(
            array(
                'name' => __( 'Color picker', 'rwmb' ),
                'id'   => "{$prefix}bgcolor",
                'type' => 'color',
            ),
        )
    );

    $meta_boxes[] = array(
        'title' => __( 'About Slider', 'rwmb' ),
        'pages' => array( 'page' ),
        'context' => 'normal',
        'priority' => 'low',
        'only_on'    => array(
            'slug' => 'about-clancy-schaer'
        ),
        'fields' => array(
            array(
                'name'             => __( '', 'rwmb' ),
                'id'               => "{$prefix}aboutSlider",
                'type'             => 'image_advanced',
                'max_file_uploads' => 100,
            ),
        )
    );

    $meta_boxes[] = array(
        'title' => __( 'Case Study', 'rwmb' ),
        'pages' => array( 'post', 'page' ),
        'context' => 'side',
        'priority' => 'low',
        'only_on'    => array(
            'category' => ['clients','news']
        ),
        'autosave' => true,
        'fields' => array(
            array(
                'name'    => __( '', 'rwmb' ),
                'id'      => "{$prefix}caseStudy",
                'type'    => 'post',
                'post_type' => 'post',

                'field_type' => 'select_advanced',
                'query_args' => array(
                    'post_status' => 'publish',
                    'posts_per_page' => '-1',
                    'category_name' => 'projects'
                ),
                'placeholder' => __( 'Select an Item', 'rwmb' ),
            ),
        )
    );

	if ( class_exists( 'RW_Meta_Box' ) ) {
		foreach ( $meta_boxes as $meta_box ) {
			if ( isset( $meta_box['only_on'] ) && ! rw_maybe_include( $meta_box['only_on'] ) ) {
				continue;
			}

			new RW_Meta_Box( $meta_box );
		}
	}
}

add_action( 'admin_init', 'jsp_register_meta_boxes' );


/**
 * Check if meta boxes is included
 *
 * @return bool
 */
function rw_maybe_include( $conditions ) {
    global $jsp_slideType;

	if ( ! defined( 'WP_ADMIN' ) || ! WP_ADMIN ) {
		return false;
	}

	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
		return true;
	}

	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	}
	elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}
	else {
		$post_id = false;
	}

	$post_id = (int) $post_id;
	$post    = get_post( $post_id );

	if ($post) {
		foreach ( $conditions as $cond => $v ) {
			if ( ! is_array( $v ) ) {
				$v = array( $v );
			}

			switch ( $cond ) {
				case 'id':
					if ( in_array( $post_id, $v ) ) {
						return true;
					}
				break;
				case 'parent':
					$post_parent = $post->post_parent;
					if ( in_array( $post_parent, $v ) ) {
						return true;
					}
				break;
				case 'slug':
					$post_slug = $post->post_name;
					if ( in_array( $post_slug, $v ) ) {
						return true;
					}
				break;
                case 'slide':
                    if ( in_array( $jsp_slideType, $v ) ) {
                        return true;
                    }
                break;
                case 'category':
                    $categories = get_the_category( $post->ID );
                    $catslugs = array();
                    foreach ($categories as $category) {
                        array_push($catslugs, $category->slug);
                    }
                    if ( array_intersect( $catslugs, $v ) ) {
                        return true;
                    }
                break;
				case 'template':
					$template = get_post_meta( $post_id, '_wp_page_template', true );
					if ( in_array( $template, $v ) ) {
						return true;
					}
				break;
			}
		}
	}

	return false;
}

?>