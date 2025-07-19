import { AuditInfo, Param } from "@type/common.type";

export type Platform = {
	name: string;
	icon: string;
	access_token?: string;
	page_id?: string;
} & AuditInfo;

export type PlatformQueryParams = {
	name?: string;
	page_id?: string;
} & Param;