<?php
function jsp_register_taxonomy_meta_boxes()
{
	// Make sure there's no errors when the plugin is deactivated or during upgrade
	if ( !class_exists( 'RW_Taxonomy_Meta' ) )
		return;

	$meta_sections = array();

	$prefix = 'jsp_ms_';


	foreach ( $meta_sections as $meta_section )
	{
		new RW_Taxonomy_Meta( $meta_section );
	}
}
add_action( 'admin_init', 'jsp_register_taxonomy_meta_boxes' );