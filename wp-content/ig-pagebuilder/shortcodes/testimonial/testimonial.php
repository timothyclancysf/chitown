<?php
/**
 * @version    $Id$
 * @package    IG PageBuilder
 * @author     InnoGears Team <support@innogears.com>
 * @copyright  Copyright (C) 2012 innogears.com. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Websites: http://www.innogears.com
 * Technical Support:  Feedback - http://www.innogears.com
 */

if ( ! class_exists( 'IG_Testimonial' ) ) :

/**
 * Create Testimonial element
 *
 * @package  IG PageBuilder Shortcodes
 * @since    1.0.0
 */
class IG_Testimonial extends IG_Pb_Shortcode_Element {
	/**
	 * Constructor
	 *
	 * @return  void
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Configure shortcode.
	 *
	 * @return  void
	 */
	public function element_config() {
		$this->config['shortcode'] = strtolower( __CLASS__ );
		$this->config['name']      = __( 'Testimonial', IGPBL );
		$this->config['cat']       = __( 'Typography', IGPBL );
		$this->config['icon']      = 'icon-paragraph-text';

		// Define exception for this shortcode
		$this->config['exception'] = array(
			'default_content'  => __( 'Testimonial', IGPBL ),
			'data-modal-title' => __( 'Testimonial', IGPBL ),

			'admin_assets' => array(
				// jQuery Text Editor
				'ig-pb-jquery-te-css',
				'ig-pb-jquery-te-js',

				// Color Picker
				'ig-pb-colorpicker-css',
				'ig-pb-colorpicker-js',

				// Font Selector
				'ig-pb-joomlashine-fontselector-js',

				// Shortcode initialization
				'ig-popover.js',
				'ig-colorpicker.js',
				'ig-linktype.js',
				'testimonial.js',
			),

			'frontend_assets' => array(
				// Bootstrap 3
				'ig-pb-bootstrap-css',
				'ig-pb-bootstrap-js',

				// Fancy Box
				'ig-pb-jquery-fancybox-css',
				'ig-pb-jquery-fancybox-js',

				// Shortcode style and script initialization
				'testimonial_frontend.css',
				'testimonial_frontend.js',
			),
		);

		// Use Ajax to speed up element settings modal loading speed
		$this->config['edit_using_ajax'] = false;
	}

	/**
	 * Define shortcode settings.
	 *
	 * @return  void
	 */
	public function element_items() {
		$this->items = array(
			'content' => array(
				array(
					'name'    => __( 'Element Title', IGPBL ),
					'id'      => 'el_title',
					'type'    => 'text_field',
					'class'   => 'input-sm',
					'std'     => __( '', IGPBL ),
					'role'    => 'title',
					'tooltip' => __( 'Set title for current element for identifying easily', IGPBL )
				),
				array(
					'id'      => 'testi_content',
					'role'    => 'content',
					'name'    => __( 'Testimonial Content', IGPBL ),
					'type'    => 'editor',
					'rows'    => '12',
					'std'     => IG_Pb_Helper_Type::lorem_text(),
					'tooltip' => __( 'Set Testimonial Content', IGPBL )
				),

			),
			'styling' => array(
				array(
					'type' => 'preview',
				),
				array(
					'name' => __( 'Background Color', IGPBL ),
					'type' => array(
						array(
							'id'           => 'testi_bg_value',
							'type'         => 'text_field',
							'class'        => 'input-small',
							'std'          => '#666666',
							'parent_class' => 'combo-item',
						),
						array(
							'id'           => 'testi_bg_color',
							'type'         => 'color_picker',
							'std'          => '#666666',
							'parent_class' => 'combo-item',
						),
					),
					'tooltip' => __( 'Choose the background color', IGPBL ),
					'container_class' => 'combo-group',
				),
				array(
					'name' => __( 'Text Color', IGPBL ),
					'type' => array(
						array(
							'id'           => 'testi_text_value',
							'type'         => 'text_field',
							'class'        => 'input-small',
							'std'          => '#FFFFFF',
							'parent_class' => 'combo-item',
						),
						array(
							'id'           => 'testi_text_color',
							'type'         => 'color_picker',
							'std'          => '#FFFFFF',
							'parent_class' => 'combo-item',
						),
					),
					'tooltip' => __( 'Choose the text color', IGPBL ),
					'container_class' => 'combo-group',
				),
			)
		);
	}

	/**
	 * Generate HTML code from shortcode content.
	 *
	 * @param   array   $atts     Shortcode attributes.
	 * @param   string  $content  Current content.
	 *
	 * @return  string
	 */
	public function element_shortcode_full( $atts = null, $content = null ) {
		$html_element = '';
		$arr_params   = shortcode_atts( $this->config['params'], $atts );
		extract( $arr_params );
		$styles       = array();
		if ( $testi_bg_color ) {
			$styles[] = 'background-color:' . $testi_bg_color;
		}
		if ( $testi_text_color ) {
			$styles[] = 'color:' . $testi_text_color;
		}

		$styles = implode( ';', $styles );
		$styles = ( $styles ) ? "style='{$styles}'" : '';
		$html_element .= "<div class='ig-testimonial'>";
		$html_element .= "<section class='{$class}' {$styles}>";

		$content = ( ! $content ) ? '' : $content;

		$html_element .= "<p>{$content}</p>";
		$html_element .= '</section>';
		$html_element .= '</div>';

		return $this->element_wrapper( $html_element . $script, $arr_params );
	}
}

endif;
