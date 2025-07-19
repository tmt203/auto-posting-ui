import { AuditInfo, Param } from "@type/common.type";
import { Platform } from "./platform.type";

export type PostStatus = "pending" | "shared" | "error";

export type PostQueryParams = {
	title?: string;
	share_times_per_day?: number;
	is_scheduled?: boolean;
	status?: PostStatus;
	platforms?: Platform[];
	share_date?: string;
	first_share_time?: string;
} & Param;

export type PostBody = {
	title: string;
	image_url?: string;
	share_times_per_day: number;
	is_scheduled: boolean;
	status: PostStatus;
	platforms: Platform[];
	share_date: string;
	first_share_time: string;
};

export type Post = PostBody & AuditInfo;
