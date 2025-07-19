"use client";

import { apiGetPlatforms } from "@api/platform";
import { Card, DatePicker, TextArea, TimePicker } from "@components/shared/atoms";
import { Button, InputForm } from "@components/shared/molecules";
import { PlatformQueryParams } from "@type/api/platform.type";
import { SelectOption } from "@type/common.type";
import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { array, boolean, number, object, string } from "yup";

/**
 * Demo Page
 */
const DemoPage = () => {
	// Hooks
	const t = useTranslations();

	// States
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [platformOptions, setPlatformOptions] = useState<SelectOption[]>([
		{ label: "Facebook", value: "Facebook" },
		{ label: "Instagram", value: "Instagram" },
		{ label: "Tiktok", value: "Tiktok" },
	]);
	const [shareDate, setShareDate] = useState<string>("");

	// Memoized
	const initialValues = useMemo(() => {
		return {
			title: "",
			image_url: "",
			share_times_per_day: 1,
			is_scheduled: false,
			status: "pending",
			platforms: [],
			share_date: "",
			first_share_time: "",
		};
	}, []);

	const validationSchema = useMemo(() => {
		return object().shape({
			title: string().required("error_message.required"),
			share_times_per_day: number().min(1).required("error_message.required"),
			is_scheduled: boolean().required("error_message.required"),
			status: string().oneOf(["pending", "shared", "error"]).required("error_message.required"),
			platforms: array()
				.of(string())
				.min(1, "error_message.required")
				.required("error_message.required"),
			share_date: string().required("error_message.required"),
			first_share_time: string().required("error_message.required"),
		});
	}, []);

	// Formik
	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	/**
	 * Handle select share date
	 * @param date string
	 */
	const handleSelectShareDate = useCallback(
		(date: string) => {
			formik.setFieldTouched("share_date", true);
			formik.setFieldValue("share_date", date);
		},
		[formik]
	);

	/**
	 * Handle get platforms
	 */
	const handleGetPlatforms = useCallback(async () => {
		try {
			const params: PlatformQueryParams = {
				limit: 9999,
				offset: 0,
			};
			const response = await apiGetPlatforms(params);

			if (response.code !== "OK") {
				toast.error(t("api.get.failed", { data: t("post.platform_list").toLowerCase() }));
				return;
			}

			setPlatformOptions(
				response.data.map((item) => ({
					label: item.name,
					value: item.id,
				}))
			);
		} catch (error) {
			toast.error(t("api.get.failed", { data: t("post.platform_list").toLowerCase() }));
		}
	}, []);

	// Run when component on mount to the DOM
	useEffect(() => {
		setIsMounted(true);
		// handleGetPlatforms();
	}, []);

	useEffect(() => {
		console.log("formik.errors:", formik.errors);
	}, [formik.errors]);

	return (
		<div className="flex h-screen items-center justify-center">
			<Card title="post.schedule_post_form" className="w-6/12">
				<form className="flex w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
					{/* Area: Title */}
					<TextArea
						id="title"
						name="title"
						label="post.title"
						value={formik.values.title}
						rows={4}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMessage={
							(formik.touched.title || formik.submitCount > 0) && formik.errors.title
								? formik.errors.title
								: ""
						}
					/>

					{/* Area: Image URL */}
					<InputForm
						id="image_url"
						name="image_url"
						label="post.image_url"
						value={formik.values.image_url}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMessage={
							(formik.touched.image_url || formik.submitCount > 0) && formik.errors.image_url
								? formik.errors.image_url
								: ""
						}
					/>

					{/* Area: Platforms */}
					<div className="flex flex-col gap-2">
						{/* Area: Label */}
						<label htmlFor="platforms" className="flex whitespace-nowrap text-base font-semibold">
							{t("post.choose_shared_platform")}
						</label>
						{/* Area: Multi Select */}
						<div className="flex flex-col gap-1 pl-4">
							{isMounted && (
								<Select<SelectOption, true>
									id="platforms"
									name="platforms"
									isMulti
									options={platformOptions}
									className="text-md font-inter font-medium not-italic leading-[22px]"
									placeholder={t("select.placeholder", { data: t("post.platform").toLowerCase() })}
									value={formik.values.platforms.map((platform) => ({
										label: platformOptions.find((option) => option.value === platform)?.label || "",
										value: platform,
									}))}
									classNames={{
										control: () =>
											clsx(
												"w-full h-fit p-0 bg-white !border-gray-200 dark:bg-gray-900/30 dark:!disabled:bg-gray-700/30 dark:!disabled:border-gray-700 dark:!disabled:hover:border-gray-700 hover:!border-gray-300 focus:!border-gray-300 dark:!border-surface-400/30 dark:!hover:border-gray-600 dark:!focus:border-gray-600 !shadow-sm !rounded-lg",
												"[&>div]:-mt-[1px] [&_#react-select-3-placeholder]:!not-italic !min-h-9 text-base"
											),
										input: () =>
											"[&_input]:![box-shadow:none] [&>input]:!outline-none [&>input::placeholder]:!text-error-300 [&>input]:focus:!outline-none [&>input]:focus:!ring-0 [&>input]:focus:!border-transparent !text-gray-800 dark:!text-gray-100",
										menuList: () =>
											"!max-h-52 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface dark:bg-tertiary-500",
										option: ({ isFocused }) =>
											clsx("cursor-pointer", {
												"dark:bg-tertiary-600": isFocused,
											}),
									}}
									noOptionsMessage={() => t("filter_component.no_data")}
									onChange={(selectedOptions) => {
										const values = selectedOptions.map((option) => option.value);
										formik.setFieldTouched("platforms", true);
										formik.setFieldValue("platforms", values);
									}}
									onBlur={() => {
										formik.setFieldTouched("platforms", true);
									}}
								/>
							)}

							{/* Area: Error Message */}
							{(formik.touched.platforms || formik.submitCount > 0) && formik.errors.platforms ? (
								<div className="text-sm italic text-danger-500">{t(formik.errors.platforms)}</div>
							) : null}
						</div>
					</div>

					{/* Area: Share Date */}
					<div className="flex flex-col gap-2">
						{/* Area: Label */}
						<label className="flex whitespace-nowrap text-base font-semibold">
							{t("post.shared_date")}
						</label>
						{/* Area: Date Picker */}
						<div className="flex flex-col gap-1 pl-4">
							<DatePicker
								defaultDate={formik.values.share_date}
								onSelectDate={handleSelectShareDate}
							/>

							{/* Area: Error Message */}
							{(formik.touched.share_date || formik.submitCount > 0) && formik.errors.share_date ? (
								<div className="text-sm italic text-danger-500">{t(formik.errors.share_date)}</div>
							) : null}
						</div>
					</div>

					{/* Area: Share Times Per Day */}
					<InputForm
						id="share_times_per_day"
						name="share_times_per_day"
						label="post.number_of_shares_per_day"
						type="number"
						value={formik.values.share_times_per_day}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMessage={
							(formik.touched.share_times_per_day || formik.submitCount > 0) &&
							formik.errors.share_times_per_day
								? formik.errors.share_times_per_day
								: ""
						}
						min={1}
					/>

					{/* Area: First Share Time */}
					<TimePicker
						id="first_share_time"
						name="first_share_time"
						label="post.first_shared_hour"
						value={formik.values.first_share_time}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMessage={
							(formik.touched.first_share_time || formik.submitCount > 0) &&
							formik.errors.first_share_time
								? formik.errors.first_share_time
								: ""
						}
					/>

					{/* Area: Submit Button */}
					<Button
						type="submit"
						className="mt-4 w-1/6 self-center"
						variant="secondary"
						disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
					>
						{t("form.save")}
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default DemoPage;
