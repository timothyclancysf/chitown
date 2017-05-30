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

/**
 * Custom script for Testimonial element
 */
( function ($) {
	"use strict";

	$.IGSelectFonts	= $.IGSelectFonts || {};

    $.IGColorPicker = $.IGColorPicker || {};

    $.IG_Testimonial = $.IG_Testimonial || {};

	$.IG_Testimonial = function () {
		new $.IGSelectFonts();
        new $.IGColorPicker();
	};

	$(document).ready(function () {
		$('body').bind('ig_after_popover', function (e) {
			$.IG_Testimonial();
		});
	});

})(jQuery);