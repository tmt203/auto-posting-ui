import { PostQueryParams } from "@type/api/post.type";
import { apiGet } from "@utils/config-api";

const SUB_PATH = "/v1/posts";

/**
 * Api get posts
 */
export const apiGetPosts = async (params: PostQueryParams) => {
	return await apiGet({
		params,
		token: "",
		url: SUB_PATH,
	});
};
