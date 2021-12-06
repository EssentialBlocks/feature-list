import * as typoPrefixs from "./constants/typographyPrefixConstants";
import {
	generateTypographyAttributes,
	generateResponsiveRangeAttributes,
	generateDimensionsAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
} from "../util/helpers";

// const {
// 	generateTypographyAttributes,
// 	generateResponsiveRangeAttributes,
// 	generateDimensionsAttributes,
// 	generateBackgroundAttributes,
// 	generateBorderShadowAttributes,
// } = eb_controls;

import {
	listSpace,
	iconBackgroundType,
	iconBackgroundSize,
	iconPadding,
	iconSize,
	iconSpace,
	titleSpace,
	iconBorder,
	wrapperMargin,
	wrapperPadding,
} from "./constants";

const attributes = {
	// the following 4 attributes is must required for responsive options and asset generation for frontend
	// responsive control attributes ⬇
	resOption: {
		type: "string",
		default: "Desktop",
	},
	// blockId attribute for making unique className and other uniqueness ⬇
	blockId: {
		type: "string",
	},
	blockRoot: {
		type: "string",
		default: "essential_block",
	},
	// blockMeta is for keeping all the styles ⬇
	blockMeta: {
		type: "object",
	},
	featureListAlign: {
		type: "string",
	},
	features: {
		type: "array",
		source: "query",
		selector: ".eb-feature-list-wrapper .eb-feature-list-items li",
		query: {
			title: {
				type: "string",
				source: "text",
				selector: ".eb-feature-list-title",
			},
			iconType: {
				type: "string",
				source: "attribute",
				attribute: "data-icon-type",
			},
			featureImageId: {
				type: "string",
				source: "attribute",
				attribute: "data-image-id",
			},
			featureImage: {
				type: "string",
				source: "attribute",
				attribute: "data-image",
			},
			icon: {
				type: "string",
				source: "attribute",
				attribute: "data-icon",
			},
			iconColor: {
				type: "string",
				source: "attribute",
				attribute: "data-icon-color",
			},
			iconBackgroundColor: {
				type: "string",
				source: "attribute",
				attribute: "data-icon-background-color",
			},
			content: {
				type: "string",
				source: "text",
				selector: ".eb-feature-list-content",
			},
			link: {
				type: "string",
				source: "attribute",
				attribute: "data-link",
			},
		},
		default: [],
	},
	iconGlobalColor: {
		type: "string",
	},
	titleTag: {
		type: "string",
		default: "h3",
	},
	iconShape: {
		type: "string",
		default: "circle",
	},
	shapeView: {
		type: "string",
		default: "stacked",
	},
	iconPosition: {
		type: "string",
		default: "left",
	},
	titleTextColor: {
		type: "string",
		default: "#414247",
	},
	descTextColor: {
		type: "string",
		default: "#7A7A7A",
	},
	showContentVertical: {
		type: "boolean",
		default: false,
	},
	...generateResponsiveRangeAttributes(listSpace, {
		defaultRange: 15,
		noUnits: true,
	}),
	...generateResponsiveRangeAttributes(iconBackgroundSize, {
		defaultRange: 70,
		noUnits: true,
	}),
	...generateResponsiveRangeAttributes(iconSize, {
		defaultRange: 21,
		noUnits: true,
	}),
	...generateResponsiveRangeAttributes(iconSpace, {
		defaultRange: 30,
		noUnits: true,
	}),
	...generateResponsiveRangeAttributes(titleSpace, {
		defaultRange: 10,
		noUnits: true,
	}),
	// typography attributes
	...generateTypographyAttributes(Object.values(typoPrefixs)),
	// background attributes
	...generateBackgroundAttributes(iconBackgroundType, {
		defaultFillColor: "#37368e",
		noOverlay: true,
		noMainBgi: true,
	}),
	// Dimension attributes
	...generateDimensionsAttributes(iconPadding, {
		top: 15,
		right: 15,
		bottom: 15,
		left: 15,
		isLinked: false,
	}),
	...generateDimensionsAttributes(wrapperMargin, {
		top: 28,
		right: 0,
		bottom: 28,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(wrapperPadding),
	// border
	...generateBorderShadowAttributes(iconBorder, {
		bdrDefaults: {
			top: 2,
			right: 2,
			bottom: 2,
			left: 2,
		},
		noShadow: true,
		defaultBdrColor: "#000000",
		defaultBdrStyle: "solid",
	}),
};

export default attributes;
