"use client";

import Sidebar, { SidebarMenu } from "@/src/components/shared/organisms/Sidebar";

export interface AppLayoutTemplateProps {
	children: React.ReactNode;
}

/**
 * App Layout Template Component
 * @Props AppLayoutTemplateProps
 */
const AppLayoutTemplate = ({ children }: AppLayoutTemplateProps) => {
	const menu: SidebarMenu[] = [
	];

	return (
		<div className="flex h-[100vh] overflow-hidden">
			{/* Sidebar */}
			<Sidebar variant="v2" menu={menu} />

			{/* Content area */}
			<div className="relative flex h-full w-full flex-col overflow-hidden">
				<main className="h-full grow [&>*:first-child]:scroll-mt-16">
					<div className="relative h-full w-full animate-[app-template-animate_300ms_ease-in-out] pl-1 lg:pl-2">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AppLayoutTemplate;
