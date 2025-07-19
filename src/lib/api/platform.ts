import { ApiResponse } from "@type/api.type";
import { Platform, PlatformQueryParams } from "@type/api/platform.type";
import { apiGet } from "@utils/config-api";

const SUB_PATH = "/v1/platforms";

/**
 * Api get platforms
 */
export const apiGetPlatforms = async (params: PlatformQueryParams) => {
	return await apiGet<ApiResponse<Platform[]>>({
		params,
		token: "",
		url: SUB_PATH,
	});
};
