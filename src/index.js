/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import example from "./example";
import attributes from "./attributes";
import "./style.scss";
import featureListIcon from "./icon";

registerBlockType("feature-list/feature-list", {
	title: __("Feature List", "feature-list"),
	description: __(
		"Make your website interactive with feature list.",
		"feature-list"
	),
	icon: featureListIcon,
	keywords: [
		__("Feature list", "feature-list"),
		__("Feature box", "feature-list"),
		__("eb feature", "feature-list"),
	],
	category: "widgets",
	supports: {
		align: ["full", "wide"],
	},
	attributes,
	edit: Edit,
	save: Save,
	example,
});
