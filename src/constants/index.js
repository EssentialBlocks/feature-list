const { __ } = wp.i18n;
const { Dashicon } = wp.components;

export const TITLE_TAG = [
	{ label: __("H1"), value: "h1" },
	{ label: __("H2"), value: "h2" },
	{ label: __("H3"), value: "h3" },
	{ label: __("H4"), value: "h4" },
	{ label: __("H5"), value: "h5" },
	{ label: __("H6"), value: "h6" },
	{ label: __("div"), value: "div" },
	{ label: __("span"), value: "span" },
	{ label: __("p"), value: "p" },
];

export const ICON_SHAPE = [
	{ label: __("None", "feature-list"), value: "none" },
	{ label: __("Circle", "feature-list"), value: "circle" },
	{ label: __("Square", "feature-list"), value: "square" },
	{ label: __("Rhombus", "feature-list"), value: "rhombus" },
];

export const SHAPE_VIEW = [
	{ label: __("Framed", "feature-list"), value: "framed" },
	{ label: __("Stacked", "feature-list"), value: "stacked" },
];

export const MEDIA_TYPES = [
	{ label: __("Icon", "feature-list"), value: "icon" },
	{ label: __("Image", "feature-list"), value: "image" },
];

export const ICON_POSITION = [
	{ label: <Dashicon icon={"editor-alignleft"} />, value: "left" },
	{ label: <Dashicon icon={"editor-aligncenter"} />, value: "top" },
	{ label: <Dashicon icon={"editor-alignright"} />, value: "right" },
];

// Responsive Range Controller
export const listSpace = "listSpace";
export const iconBackgroundSize = "iconBgSize";
export const iconSize = "iconSize";
export const iconSpace = "iconSpace";
export const titleSpace = "titleSpace";

// dimension controls
export const iconPadding = "iconPadding";
``;
export const wrapperMargin = "wrapperMargin";
export const wrapperPadding = "wrapperPadding";

// background controls
export const iconBackgroundType = "iconBg";

// border shadow controller
export const iconBorder = "iconBrdSdw";
