/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useEffect } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { select } = wp.data;
const {
	PanelBody,
	ToggleControl,
	SelectControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
} = wp.components;

/**
 * Internal dependencies
 */
import {
	TITLE_TAG,
	ICON_SHAPE,
	SHAPE_VIEW,
	ICON_POSITION,
	listSpace,
	iconBackgroundType,
	iconBackgroundSize,
	iconSize,
	iconPadding,
	iconSpace,
	titleSpace,
	iconBorder,
	wrapperMargin,
	wrapperPadding,
} from "./constants";

import {
	typoPrefix_title,
	typoPrefix_content,
} from "./constants/typographyPrefixConstants";

import objAttributes from "./attributes";
import SortableFeatures from "./sortable-features";

import ColorControl from "../util/color-control";
import ResponsiveRangeController from "../util/responsive-range-control";
import ResponsiveDimensionsControl from "../util/dimensions-control-v2";
import TypographyDropdown from "../util/typography-control-v2";
import BackgroundControl from "../util/background-control";
import BorderShadowControl from "../util/border-shadow-control";
import {
	mimmikCssForResBtns,
	mimmikCssOnPreviewBtnClickWhileBlockSelected,
} from "../util/helpers";

// const {
// 	ColorControl,
// 	ResponsiveRangeController,
// 	ResponsiveDimensionsControl,
// 	TypographyDropdown,
// 	BackgroundControl,
// 	BorderShadowControl,
// 	// helpers
// 	mimmikCssForResBtns,
// 	mimmikCssOnPreviewBtnClickWhileBlockSelected,
// } = eb_controls;

const Inspector = ({ attributes, setAttributes }) => {
	const {
		resOption,
		features,
		titleTag,
		iconShape,
		shapeView,
		iconPosition,
		iconGlobalColor,
		titleTextColor,
		descTextColor,
		showContentVertical,
	} = attributes;

	useEffect(() => {
		// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
		// this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
		const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
			domObj: document,
			select,
			setAttributes,
		});
		return () => {
			cleanUp();
		};
	}, []);

	// this useEffect is for mimmiking css for all the eb blocks on resOption changing
	useEffect(() => {
		mimmikCssForResBtns({
			domObj: document,
			resOption,
		});
	}, [resOption]);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	const onFeatureAdd = () => {
		const count = attributes.features.length + 1;
		const features = [
			...attributes.features,
			{
				iconType: "icon",
				featuresImage: "",
				featuresImageId: "",
				icon: "fas fa-check",
				title: `Feature Item ${count}`,
				content:
					"Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
				iconColor: "",
				iconBackgroundColor: "",
				link: "",
			},
		];

		setAttributes({ features });
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: "general",
							title: __("General", "essential-blocks"),
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: __("Style", "essential-blocks"),
							className: "eb-tab styles",
						},
						{
							name: "advance",
							title: "Advanced",
							className: "eb-tab advance",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody
										title={__("Content Settings", "essential-blocks")}
										initialOpen={true}
									>
										<SortableFeatures
											features={attributes.features}
											setAttributes={setAttributes}
										/>
										<Button
											className="eb-pricebox-feature-button"
											label={__("Add feature")}
											icon="plus-alt"
											onClick={onFeatureAdd}
										>
											<span className="eb-pricebox-add-button-label">
												{__("Add Feature", "price-table-box")}
											</span>
										</Button>
										<hr />
										<SelectControl
											label={__("Title HTML Tag", "essential-blocks")}
											value={titleTag}
											options={TITLE_TAG}
											onChange={(newTitleTag) =>
												setAttributes({ titleTag: newTitleTag })
											}
										/>
										<SelectControl
											label={__("Icon Shape", "essential-blocks")}
											value={iconShape}
											options={ICON_SHAPE}
											onChange={(newIconShape) =>
												setAttributes({ iconShape: newIconShape })
											}
										/>
										{iconShape !== "none" && (
											<SelectControl
												label={__("Shape View", "essential-blocks")}
												value={shapeView}
												options={SHAPE_VIEW}
												onChange={(newShapeView) =>
													setAttributes({ shapeView: newShapeView })
												}
											/>
										)}
										<BaseControl label={__("Icon Position")}>
											<ButtonGroup className="eb-featurelist-icon-align">
												{ICON_POSITION.map((item) => (
													<Button
														isLarge
														isPrimary={iconPosition === item.value}
														isSecondary={iconPosition !== item.value}
														onClick={() =>
															setAttributes({
																iconPosition: item.value,
															})
														}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>
										<ToggleControl
											label={__(
												"Content Vertically Center",
												"essentail-blocks"
											)}
											checked={showContentVertical}
											onChange={() => {
												setAttributes({
													showContentVertical: !showContentVertical,
												});
											}}
										/>
									</PanelBody>
								</>
							)}
							{tab.name === "styles" && (
								<>
									<PanelBody
										title={__("List", "essential-blocks")}
										initialOpen={true}
									>
										<ResponsiveRangeController
											baseLabel={__("Space Between", "essentail-blocks")}
											controlName={listSpace}
											resRequiredProps={resRequiredProps}
											min={0}
											max={50}
											step={1}
											noUnits
										/>
									</PanelBody>
									<PanelBody
										title={__("Icon", "essential-blocks")}
										initialOpen={false}
									>
										{iconShape !== "none" && (
											<>
												<BaseControl>
													<h3 className="eb-control-title">
														{__("Background", "essential-blocks")}
													</h3>
												</BaseControl>
												<BackgroundControl
													controlName={iconBackgroundType}
													resRequiredProps={resRequiredProps}
													noOverlay={true}
													noMainBgi={true}
												/>
												<hr />
											</>
										)}
										<ColorControl
											label={__("Color")}
											color={iconGlobalColor}
											onChange={(iconGlobalColor) =>
												setAttributes({ iconGlobalColor })
											}
										/>
										{iconShape !== "none" && (
											<ResponsiveRangeController
												baseLabel={__("Size", "essentail-blocks")}
												controlName={iconBackgroundSize}
												resRequiredProps={resRequiredProps}
												min={0}
												max={300}
												step={1}
												noUnits
											/>
										)}
										<ResponsiveRangeController
											baseLabel={__("Icon Size", "essentail-blocks")}
											controlName={iconSize}
											resRequiredProps={resRequiredProps}
											min={6}
											max={150}
											step={1}
											noUnits
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={iconPadding}
											baseLabel={__("Padding")}
										/>
										{/* <ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={wrapperMargin}
											baseLabel={__("Margin")}
										/> */}
										<ResponsiveRangeController
											baseLabel={__("Spacing", "essentail-blocks")}
											controlName={iconSpace}
											resRequiredProps={resRequiredProps}
											min={0}
											max={100}
											step={1}
											noUnits
										/>
										{iconShape !== "none" && shapeView === "framed" && (
											<BorderShadowControl
												controlName={iconBorder}
												resRequiredProps={resRequiredProps}
												noShadow={true}
											/>
										)}
									</PanelBody>
									<PanelBody
										title={__("Content", "essential-block")}
										initialOpen={false}
									>
										<BaseControl>
											<h3 className="eb-control-title">{__("Title")}</h3>
										</BaseControl>
										<ResponsiveRangeController
											baseLabel={__("Title Bottom Space", "essentail-blocks")}
											controlName={titleSpace}
											resRequiredProps={resRequiredProps}
											min={0}
											max={100}
											step={1}
											noUnits
										/>
										<ColorControl
											label={__("Color")}
											color={titleTextColor}
											onChange={(titleTextColor) =>
												setAttributes({ titleTextColor })
											}
										/>
										<TypographyDropdown
											baseLabel={__("Typography")}
											typographyPrefixConstant={typoPrefix_title}
											resRequiredProps={resRequiredProps}
											defaultFontSize={32}
										/>
										<hr />
										<BaseControl>
											<h3 className="eb-control-title">
												{__("Description", "essential-blocks")}
											</h3>
										</BaseControl>
										<ColorControl
											label={__("Color")}
											color={descTextColor}
											onChange={(descTextColor) =>
												setAttributes({ descTextColor })
											}
										/>
										<TypographyDropdown
											baseLabel={__("Typography")}
											typographyPrefixConstant={typoPrefix_content}
											resRequiredProps={resRequiredProps}
										/>
									</PanelBody>
								</>
							)}
							{tab.name === "advance" && (
								<>
									<PanelBody>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={wrapperMargin}
											baseLabel={__("Margin", "essential-blocks")}
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={wrapperPadding}
											baseLabel={__("Padding", "essential-blocks")}
										/>
									</PanelBody>
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
};

export default Inspector;
