import { useTranslations } from "next-intl";

/**
 * Sign in page
 * @path /signin
 */
const SignIn = () => {
	const t = useTranslations("auth");

	return (
		<div className="flex h-screen items-center justify-center bg-gray-100">
			<div className="flex w-4/12 flex-col gap-3 rounded-lg bg-white p-4 shadow-lg">
				<span className="text-center text-lg font-semibold">{t("signin")}</span>

                {/* Area: Facebook Auth */}
                <div className="flex items-center justify-center">
                    <a href="#" className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100">
                        {/* <span>{t("")}</span> */}
                    </a>
                </div>
			</div>
		</div>
	);
};

export default SignIn;
