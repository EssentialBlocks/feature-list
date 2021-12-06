<?php

/**
 * Plugin Name:     Feature List
 * Plugin URI: 		https://essential-blocks.com
 * Description:     Instantly create beautiful feature list for your website
 * Version:         1.0.0
 * Author:          WPDeveloper
 * Author URI: 		https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     feature-list
 *
 * @package         feature-list
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

require_once __DIR__ . '/includes/font-loader.php';
require_once __DIR__ . '/includes/post-meta.php';
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function create_block_feature_list_block_init()
{
	$dir = dirname(__FILE__);

	$script_asset_path = "$dir/build/index.asset.php";
	if (!file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/pricing-table" block first.'
		);
	}
	$index_js     = 'build/index.js';
	// $script_asset = require($script_asset_path);
	wp_register_script(
		'essential-blocks-feature-list-editor',
		plugins_url($index_js, __FILE__),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-block-editor',
		),
		filemtime("$dir/$index_js")
	);
	$fontpicker_theme = 'assets/css/fonticonpicker.base-theme.react.css';
	wp_register_style(
			'fontpicker-default-theme',
			plugins_url($fontpicker_theme, __FILE__),
			array()
	);

	$fontpicker_material_theme = 'assets/css/fonticonpicker.material-theme.react.css';
	wp_register_style(
			'fontpicker-matetial-theme',
			plugins_url($fontpicker_material_theme, __FILE__),
			array()
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'essential-blocks-feature-list-editor',
		plugins_url($editor_css, __FILE__),
		array('fontpicker-default-theme','fontpicker-matetial-theme'),
		filemtime("$dir/$editor_css")
	);

	$fontawesome_css = 'assets/css/font-awesome5.css';
	wp_register_style(
			'fontawesome-frontend-css',
			plugins_url($fontawesome_css, __FILE__),
			array()
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'essential-blocks-feature-list',
		plugins_url($style_css, __FILE__),
		array('fontawesome-frontend-css'),
		filemtime("$dir/$style_css")
	);

	if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/feature-list')) {
		register_block_type('feature-list/featurel-list', array(
			'editor_script' => 'essential-blocks-feature-list-editor',
			'editor_style' => 'essential-blocks-feature-list-editor',
			'style'         => 'essential-blocks-feature-list',
		));
	}
}
add_action('init', 'create_block_feature_list_block_init');
