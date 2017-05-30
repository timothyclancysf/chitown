<?php
/**
 * @version    $Id$
 * @package    IG PageBuilder
 * @author     InnoGears Team <support@www.innogears.com>
 * @copyright  Copyright (C) 2012 www.innogears.com. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Websites: http://www.www.innogears.com
 * Technical Support:  Feedback - http://www.www.innogears.com
 */

/**
 * @todo : Ig PageBuilder Meta box content
 */

wp_nonce_field( 'ig_builder', IGNONCE . '_builder' );
?>
<!-- Buttons bar -->
<div class="jsn-form-bar">
	<div id="status-switcher" class="btn-group" data-toggle="buttons-radio">
		<button type="button" class="switchmode-button btn btn-default active" id="status-on" data-title="<?php _e( 'Active Page Builder', IGPBL ) ?>"><?php _e( 'On', IGPBL ) ?></button>
		<button type="button" class="switchmode-button btn btn-default" id="status-off" data-title="<?php _e( 'Deactivate Page Builder', IGPBL ) ?>"><?php _e( 'Off', IGPBL ) ?></button>
	</div>
	<div id="mode-switcher" class="btn-group" data-toggle="buttons-radio">
		<button type="button" class="switchmode-button btn btn-default active" id="switchmode-compact"><?php _e( 'Compact', IGPBL ) ?></button>
		<button type="button" class="switchmode-button btn btn-default" id="switchmode-full"><?php _e( 'Full', IGPBL ) ?></button>
	</div>

	<!-- Page Templates -->
	<div class="pull-right" id="top-btn-actions">
		<div class="pull-left" id="page-custom-css">
			<button class="btn btn-default" onclick="return false;"><?php _e( 'Custom CSS', IGPBL ) ?></button>
		</div>
		<div class="btn-group dropdown pull-left" id="page-template">
			<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#">
				<?php _e( 'Page template', IGPBL ) ?>
				<span class="caret"></span>
			</a>
			<ul class="dropdown-menu pull-right">
				<li><a href="#" id="save-as-new" data-toggle="modal"><?php _e( 'Save as new template', IGPBL ); ?></a></li>
				<li><a  id="apply-page" href="#"><?php _e( 'Load template', IGPBL ); ?></a></li>
			</ul>
		</div>		
	</div>

	<!-- Save as new template modal -->
	<div id="save-as-new-dialog" role="dialog" aria-hidden="true" tabindex="-1" >
	 	<div class="modal-dialog">
		 	<div class="modal-content">
				<div class="modal-header ui-dialog-title">
				<h3><?php _e( 'Save as new template', IGPBL ); ?></h3>
				</div>
				<div class="modal-body form-horizontal">
					<div class="form-group">
						<label class="control-label" for="template-name"><?php _e( 'Template name:' );?></label>
						<div class="controls">
							<input type="text" id="template-name" class="input form-control">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-primary template-save"><?php _e( 'Save', IGPBL ); ?></a>
					<a href="#" class="btn template-cancel"><?php _e( 'Cancel', IGPBL ); ?></a>
				</div>
			</div>
		</div>
	</div>
	<!-- END Save as new template modal -->
	<?php if ( @count( $converters ) ) : ?>
	<!-- Data conversion modal -->
	<div id="data-conversion-modal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header ui-dialog-title">
					<h3 data-title="<?php _e( 'Convert %NAME% Data', IGPBL ); ?>">
						<?php _e( 'Convert Data', IGPBL ); ?>
					</h3>
				</div>
				<div class="modal-body form-horizontal">
					<div class="alert alert-info">
						<i class="icon-warning"></i>
						&nbsp;&nbsp;&nbsp;
						<?php
						global $post;

						// Get current post type's singular_name
						$post_type = get_post_type_object( get_post_type() );
						$post_type = strtolower( $post_type->labels->singular_name );

						_e(
							str_replace(
								'%TYPE%',
								$post_type,
								__(
									'Copy current %TYPE% to new %TYPE% then convert all %NAME% data to IG PageBuilder.',
									IGPBL
								)
							)
						);
						?>
					</div>
					<div class="form-group">
						<label class="control-label" for="post-title"><?php _e( sprintf( __( 'Title for new %s:', IGPBL ), $post_type ) ); ?></label>
						<div class="controls">
							<input type="text" id="post-title" class="input form-control" name="post_title" value="<?php _e( $post->post_title ); ?>" />
						</div>
					</div>
					<div class="form-group">
						<label class="control-label"><?php _e( 'I also want to:', IGPBL ); ?></label>
						<div class="controls">
							<div class="checkbox">
								<label>
									<input type="checkbox" name="unpublish_current" value="1" onclick="var depend = jQuery(this).closest('.checkbox').next().find('input'); if (this.checked) depend.removeAttr('disabled'); else depend.attr('disabled', 'disabled');" />
									<?php printf( __( 'Unpublish current %s and publish new %s after converting', IGPBL ), $post_type, $post_type ); ?>
								</label>
							</div>
							<div class="checkbox">
								<label>
									<input type="checkbox" name="trash_current" value="1" disabled="disabled" />
									<?php printf( __( 'Trash current %s after converting', IGPBL ), $post_type ); ?>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a href="javascript:void(0)" class="btn btn-default" id="data-conversion-cancel"><?php _e( 'Cancel', IGPBL ); ?></a>
					<a href="javascript:void(0)" class="btn btn-primary" id="data-conversion-convert">
						<span data-working-text="<?php _e( 'Converting Data', IGPBL ); ?>" data-complete-text="<?php _e( 'Completed. Reloading Page...', IGPBL ); ?>">
							<?php _e( 'Copy And Convert Data', IGPBL ); ?>
						</span>
					</a>
				</div>
			</div>
		</div>
	</div>
	<?php endif; ?>
</div>

<!-- IG PageBuilder elements -->
<div class="jsn-section-content jsn-style-light" id="form-design-content">
	<div id="ig-pbd-loading" class="text-center"><i class="jsn-icon32 jsn-icon-loading"></i></div>
	<div class="ig-pb-form-container jsn-layout">
<?php
global $post;
$pagebuilder_content = get_post_meta( $post->ID, '_ig_page_builder_content', true );
if ( ! empty( $pagebuilder_content ) ) {
	$builder = new IG_Pb_Helper_Shortcode();
	echo balanceTags( $builder->do_shortcode_admin( $pagebuilder_content ) );
}
?>

		<a href="javascript:void(0);" id="jsn-add-container" class="jsn-add-more"><i class="icon-plus"></i><?php _e( 'Add Row', IGPBL ) ?></a>
		<input type="hidden" id="ig-select-media" value="" />
	</div>
	<div id="deactivate-msg" class="jsn-section-empty hidden">
		<p class="jsn-bglabel">
			<span class="jsn-icon64 jsn-icon-remove"></span>
			<?php _e( 'PageBuilder for this page is currently off.', IGPBL ); ?>
		</p>
		<p class="jsn-bglabel">
			<a href="javascript:void(0)" class="btn btn-success" id="status-on-link"><?php _e( 'Turn PageBuilder on', IGPBL )?></a>
		</p>

	</div>
</div>

<!-- Link to website -->
<div id="branding">
	<div class="pull-left">
		<a href="http://www.innogears.com/wordpress-plugins/ig-pagebuilder-on-wporg.html" target="_blank"><?php _e( 'PageBuilder', IGPBL ); ?></a> <?php _e( 'by', IGPBL )?> <a href="http://www.innogears.com" target="_blank">InnoGears.com</a>
	</div>
	<div class="pull-right">
		<a href="http://www.innogears.com/wordpress-plugins/ig-pagebuilder-docs.html" target="_blank"><?php _e( 'Documentation', IGPBL ); ?></a>&nbsp;&nbsp;|&nbsp;&nbsp;
		<a href="http://www.innogears.com/wordpress-plugins/ig-pagebuilder-support.html" target="_blank"><?php _e( 'Support', IGPBL ); ?></a>&nbsp;&nbsp;|&nbsp;&nbsp;
		<a href="http://www.innogears.com/wordpress-plugins/ig-pagebuilder-review.html" target="_blank"><?php _e( 'Review', IGPBL ); ?></a>
	</div>
	<div class="clearbreak"></div>
</div>

<?php

// Page Template
include 'layout/template.php';

// Insert Post ID as hidden field
global $post;
?>
<div id="ig-pb-css-value">
	<input type="hidden" name="ig_pb_post_id" value="<?php echo esc_attr( isset ( $post->ID ) ? $post->ID : '' ); ?>">
</div>

<!--[if IE]>
<style>
	.jsn-quicksearch-field{
		height: 28px;
	}
</style>
<![endif]-->