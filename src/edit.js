/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useBlockProps, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { useEffect } = wp.element;
const { select } = wp.data;

/**
 * External depencencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import "./editor.scss";
import Inspector from "./inspector";

import {
	titleSpace,
	iconSize,
	listSpace,
	iconBackgroundSize,
	iconPadding,
	iconSpace,
	iconBackgroundType,
	iconBorder,
	wrapperMargin,
	wrapperPadding,
} from "./constants";

import {
	typoPrefix_title,
	typoPrefix_content,
} from "./constants/typographyPrefixConstants";

import {
	softMinifyCssStrings,
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
} from "../util/helpers";

// const {
// 	softMinifyCssStrings,
// 	// isCssExists,
// 	mimmikCssForPreviewBtnClick,
// 	duplicateBlockIdFix,
// 	generateDimensionsControlStyles,
// 	generateBackgroundControlStyles,
// 	generateBorderShadowStyles,
// 	generateTypographyStyles,
// 	generateResponsiveRangeStyles,
// } = eb_controls;

const edit = (props) => {
	const { attributes, isSelected, setAttributes, clientId, className } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		featureListAlign,
		features,
		iconPosition,
		iconShape,
		shapeView,
		titleTag,
		titleTextColor = "#414247",
		descTextColor = "#7A7A7A",
		iconGlobalColor = "#ffffff",
		showContentVertical,
	} = attributes;

	const featureListAlignClass =
		featureListAlign === "center"
			? " eb-feature-list-center"
			: featureListAlign === "right"
			? " eb-feature-list-right"
			: " eb-feature-list-left";

	// title bottom space
	const {
		rangeStylesDesktop: titleBottomMarginDesktop,
		rangeStylesTab: titleBottomMarginTab,
		rangeStylesMobile: titleBottomMarginMobile,
	} = generateResponsiveRangeStyles({
		controlName: titleSpace,
		property: "margin-bottom",
		attributes,
		customUnit: "px",
	});

	// icon font-size
	const {
		rangeStylesDesktop: iconFontSizeDesktop,
		rangeStylesTab: iconFontSizeTab,
		rangeStylesMobile: iconFontSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: iconSize,
		property: "font-size",
		attributes,
		customUnit: "px",
	});

	// list space between
	const {
		rangeStylesDesktop: listSpaceDesktop,
		rangeStylesTab: listSpaceTab,
		rangeStylesMobile: listSpaceMobile,
	} = generateResponsiveRangeStyles({
		controlName: listSpace,
		property: "padding-bottom",
		attributes,
		customUnit: "px",
	});

	// icon area size
	const {
		rangeStylesDesktop: iconAreaSizeDesktop,
		rangeStylesTab: iconAreaSizeTab,
		rangeStylesMobile: iconAreaSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: iconBackgroundSize,
		property: "",
		attributes,
		customUnit: "px",
	});

	// icon padding
	const {
		dimensionStylesDesktop: iconPaddingDesktop,
		dimensionStylesTab: iconPaddingTab,
		dimensionStylesMobile: iconPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: iconPadding,
		styleFor: "padding",
		attributes,
	});

	// icon space
	const {
		rangeStylesDesktop: iconAreaSpaceDesktop,
		rangeStylesTab: iconAreaSpaceTab,
		rangeStylesMobile: iconAreaSpaceMobile,
	} = generateResponsiveRangeStyles({
		controlName: iconSpace,
		property: "",
		attributes,
		customUnit: "px",
	});

	// title typography
	const {
		typoStylesDesktop: titleTypoStylesDesktop,
		typoStylesTab: titleTypoStylesTab,
		typoStylesMobile: titleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_title,
		defaultFontSize: 32,
	});

	// content typography
	const {
		typoStylesDesktop: contentTypoStylesDesktop,
		typoStylesTab: contentTypoStylesTab,
		typoStylesMobile: contentTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_content,
	});

	// icon background
	const {
		backgroundStylesDesktop: iconBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: iconHoverBackgroundStylesDesktop,
		bgTransitionStyle: iconBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: iconBackgroundType,
		noOverlay: true,
		noMainBgi: true,
	});

	// icon area border
	const {
		styesDesktop: iconBorderStyesDesktop,
		styesTab: iconBorderStyesTab,
		styesMobile: iconBorderStyesMobile,
		stylesHoverDesktop: iconBorderStylesHoverDesktop,
		stylesHoverTab: iconBorderStylesHoverTab,
		stylesHoverMobile: iconBorderStylesHoverMobile,
		transitionStyle: iconBorderTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: iconBorder,
		attributes,
	});

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperMarginDesktop,
		dimensionStylesTab: wrapperMarginTab,
		dimensionStylesMobile: wrapperMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperMargin,
		styleFor: "margin",
		attributes,
	});

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperPaddingDesktop,
		dimensionStylesTab: wrapperPaddingTab,
		dimensionStylesMobile: wrapperPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperPadding,
		styleFor: "padding",
		attributes,
	});

	const desktopStyles = `
		.${blockId}.eb-feature-list-wrapper {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
		}

		${
			showContentVertical
				? `
		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item {
			align-items: center;
		}
		`
				: ""
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item .eb-feature-list-title {
			${titleBottomMarginDesktop}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon {
			${
				iconShape !== "none"
					? `
				height: ${iconAreaSizeDesktop.replace(/\D/g, "")}px;
				width:${iconAreaSizeDesktop.replace(/\D/g, "")}px;
				`
					: ""
			}
			${iconFontSizeDesktop}
			${iconPaddingDesktop}
			color: ${iconGlobalColor};
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon img {
			height: ${iconFontSizeDesktop.replace(/\D/g, "")}px;
			width: ${iconFontSizeDesktop.replace(/\D/g, "")}px;
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-items .eb-feature-list-icon svg {
			color: ${iconGlobalColor};
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:last-child) {
			padding-bottom: calc(${listSpaceDesktop.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:first-child) {
			padding-top: calc(${listSpaceDesktop.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper.-icon-position-left .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-right .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper.-icon-position-top .eb-feature-list-items .eb-feature-list-content-box {
			margin: ${iconAreaSpaceDesktop.replace(/\D/g, "")}px;
		}

		.${blockId}.eb-feature-list-wrapper.-mobile-icon-position-left .eb-feature-list-items .eb-feature-list-content-box {
			margin: 0 0 0 ${iconAreaSpaceDesktop.replace(/\D/g, "")}px !important;
		}

		.${blockId}.eb-feature-list-wrapper.-mobile-icon-position-right .eb-feature-list-items .eb-feature-list-content-box {
			margin: 0 ${iconAreaSpaceDesktop.replace(/\D/g, "")}px 0 0 !important;
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title > a, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title:visited {
			color: ${titleTextColor};
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title a {
			${titleTypoStylesDesktop}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-content {
			color: ${descTextColor};
			${contentTypoStylesDesktop}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			${iconBackgroundStylesDesktop}
			${shapeView === "framed" ? iconBorderStyesDesktop : ""}
			transition: ${(iconBgTransitionStyle, iconBorderTransitionStyle)};
		}

		.${blockId}.eb-feature-list-wrapper:hover .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			${iconHoverBackgroundStylesDesktop}
			${shapeView === "framed" ? iconBorderStylesHoverDesktop : ""}
		}
	`;

	const tabStyles = `
		.${blockId}.eb-feature-list-wrapper {
			${wrapperMarginTab}
			${wrapperPaddingTab}
		}
		
		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item .eb-feature-list-title {
			${titleBottomMarginTab}
			${shapeView === "framed" ? iconBorderStyesDesktop : ""}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon {
			${
				iconShape !== "none"
					? `
				height: ${iconAreaSizeTab.replace(/\D/g, "")}px;
				width:${iconAreaSizeTab.replace(/\D/g, "")}px;
				`
					: ""
			}
			${iconFontSizeTab}
			${iconPaddingTab}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon img {
			height: ${iconFontSizeTab.replace(/\D/g, "")}px;
			width: ${iconFontSizeTab.replace(/\D/g, "")}px;
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:last-child) {
			padding-bottom: calc(${listSpaceTab.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:first-child) {
			padding-top: calc(${listSpaceTab.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .-icon-position-left .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .-icon-position-right .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .-icon-position-top .eb-feature-list-content-box {
			margin: ${iconAreaSpaceTab.replace(/\D/g, "")}px;
		}

		.${blockId}.eb-feature-list-wrapper .-mobile-icon-position-left .eb-feature-list-items .eb-feature-list-content-box {
			margin: 0 0 0 ${iconAreaSpaceTab.replace(/\D/g, "")}px !important;
		}

		.${blockId}.eb-feature-list-wrapper .-mobile-icon-position-right .eb-feature-list-items .eb-feature-list-content-box {
			margin: 0 ${iconAreaSpaceTab.replace(/\D/g, "")}px 0 0 !important;
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title a {
			${titleTypoStylesTab}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-content {
			${contentTypoStylesTab}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			${shapeView === "framed" ? iconBorderStyesTab : ""}
		}

		.${blockId}.eb-feature-list-wrapper:hover .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			${shapeView === "framed" ? iconBorderStylesHoverTab : ""}
		}
 	`;

	const mobileStyles = `
		.${blockId}.eb-feature-list-wrapper {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
		}
		
		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item .eb-feature-list-title {
			${titleBottomMarginMobile}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon {
			${
				iconShape !== "none"
					? `
				height: ${iconAreaSizeMobile.replace(/\D/g, "")}px;
				width:${iconAreaSizeMobile.replace(/\D/g, "")}px;
				`
					: ""
			}
			${iconFontSizeMobile}
			${iconPaddingMobile}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon img {
			height: ${iconFontSizeMobile.replace(/\D/g, "")}px;
			width: ${iconFontSizeMobile.replace(/\D/g, "")}px;
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:last-child) {
			padding-bottom: calc(${listSpaceMobile.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-item:not(:first-child) {
			padding-top: calc(${listSpaceMobile.replace(/\D/g, "") / 2}px);
		}

		.${blockId}.eb-feature-list-wrapper .-icon-position-left .eb-feature-list-items .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .-icon-position-right .eb-feature-list-content-box, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .-icon-position-top .eb-feature-list-content-box {
			margin: ${iconAreaSpaceMobile.replace(/\D/g, "")}px;
		}

		.${blockId}.eb-feature-list-wrapper .-mobile-icon-position-left .eb-feature-list-items .eb-feature-list-content-box {
			margin: 0 0 0 ${iconAreaSpaceMobile.replace(/\D/g, "")}px !important;
		}

		.${blockId}.eb-feature-list-wrapper .-mobile-icon-position-right .eb-feature-list-items .eb-feature-list-content-box {
			margin: 0 ${iconAreaSpaceMobile.replace(/\D/g, "")}px 0 0 !important;
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title, .${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-title a {
			${titleTypoStylesMobile}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-content-box .eb-feature-list-content {
			${contentTypoStylesMobile}
		}

		.${blockId}.eb-feature-list-wrapper .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			${shapeView === "framed" ? iconBorderStyesMobile : ""}
		}

		.${blockId}.eb-feature-list-wrapper:hover .eb-feature-list-items .eb-feature-list-icon-box .eb-feature-list-icon-inner {
			${shapeView === "framed" ? iconBorderStylesHoverMobile : ""}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		  ${desktopStyles}
	  `);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		  ${tabStyles}
	  `);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		  ${mobileStyles}
	  `);

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	useEffect(() => {
		// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
		// this useEffect is for creating an unique id for each block's unique className by a random unique number
		const BLOCK_PREFIX = "eb-feature-list";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
		// this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
		mimmikCssForPreviewBtnClick({
			domObj: document,
			select,
		});
	}, []);

	const blockProps = useBlockProps({
		className: classnames(className, "eb-guten-block-main-parent-wrapper"),
	});

	const featureListWrapperClass =
		iconShape !== "none" ? ` ${iconShape} ${shapeView}` : " none";

	useEffect(() => {
		if (features.length > 0) return;

		const defaultFeatures = [
			{
				iconType: "icon",
				icon: "fas fa-check",
				title: "Feature Item 1",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				link: "",
				iconBackgroundColor: "",
			},
			{
				iconType: "icon",
				icon: "fas fa-times",
				title: "Feature Item 2",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				link: "",
				iconBackgroundColor: "",
			},
			{
				iconType: "icon",
				icon: "fas fa-anchor",
				title: "Feature Item 3",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				link: "",
				iconBackgroundColor: "",
			},
		];

		setAttributes({ features: defaultFeatures });
	}, []);

	let iconStyle = {};

	return [
		<BlockControls>
			<AlignmentToolbar
				value={featureListAlign}
				onChange={(newFeatureListAlign) =>
					setAttributes({ featureListAlign: newFeatureListAlign })
				}
			/>
		</BlockControls>,
		isSelected && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),
		<div {...blockProps}>
			<style>
				{`
				   ${desktopAllStyles}
   
				   /* mimmikcssStart */
   
				   ${resOption === "Tablet" ? tabAllStyles : " "}
				   ${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}
   
				   /* mimmikcssEnd */
   
				   @media all and (max-width: 1024px) {	
   
					   /* tabcssStart */			
					   ${softMinifyCssStrings(tabAllStyles)}
					   /* tabcssEnd */			
				   
				   }
				   
				   @media all and (max-width: 767px) {
					   
					   /* mobcssStart */			
					   ${softMinifyCssStrings(mobileAllStyles)}
					   /* mobcssEnd */			
				   
				   }
				   `}
			</style>
			<div
				className={`${blockId} eb-feature-list-wrapper -icon-position-${iconPosition} -tablet-icon-position-${iconPosition} -mobile-icon-position-${iconPosition}${featureListAlignClass}`}
			>
				<ul className={`eb-feature-list-items${featureListWrapperClass}`}>
					{features.map(
						(
							{
								title,
								iconType,
								featureImage,
								featureImageId,
								icon,
								iconColor,
								iconBackgroundColor,
								content,
								link,
							},
							index
						) => {
							{
								iconStyle = {
									color: iconColor,
									backgroundColor: iconBackgroundColor,
								};
							}
							return (
								<li
									key={index}
									className="eb-feature-list-item"
									data-icon-type={iconType}
									data-image={featureImage}
									data-image-id={featureImageId}
									data-icon={icon}
									data-icon-color={iconColor}
									data-icon-background-color={iconBackgroundColor}
									data-link={link}
								>
									<div className="eb-feature-list-icon-box">
										<div className="eb-feature-list-icon-inner">
											<span className="eb-feature-list-icon" style={iconStyle}>
												{iconType === "icon" && (
													<i aria-hidden="true" className={icon}></i>
												)}
												{iconType === "image" && (
													<img
														className="eb-feature-list-img"
														src={featureImage}
													/>
												)}
											</span>
										</div>
									</div>
									<div className="eb-feature-list-content-box">
										{link ? (
											<attributes.titleTag className="eb-feature-list-title">
												<a href={link}>{title}</a>
											</attributes.titleTag>
										) : (
											<attributes.titleTag className="eb-feature-list-title">
												{title}
											</attributes.titleTag>
										)}
										<p className="eb-feature-list-content">{content}</p>
									</div>
								</li>
							);
						}
					)}
				</ul>
			</div>
		</div>,
		// edit view end
	];
};

export default edit;
