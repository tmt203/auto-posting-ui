import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../services/locale";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();
	
	const common = await import(`./locales/${locale}/common.json`);
	const components = await import(`./locales/${locale}/components.json`);
	const post = await import(`./locales/${locale}/post.json`);
	const auth = await import(`./locales/${locale}/auth.json`);

	return {
		locale,
		messages: {
			...common,
			...components,
			...post,
			...auth,
		},
	};
});
