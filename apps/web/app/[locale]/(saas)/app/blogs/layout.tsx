import { SideMenu } from "@saas/admin/component/SideMenu";
import { createApiCaller } from "api/trpc/caller";
import { UserRoleSchema } from "database";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const t = await getTranslations();
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  if (user?.role !== UserRoleSchema.Values.ADMIN) {
    redirect("/");
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="align-start flex flex-col gap-8 md:flex-row">
        <div className="w-full md:max-w-[200px]">
          <SideMenu
            menuItems={[
              {
                title: t("admin.menu.allBlogs"),
                href: `published-posts`,
                icon: "newspaper",
              },
              {
                title: "Publish Blog",
                href: `create-post`,
                icon: "pencilLine",
              },
              {
                title: "Categories",
                href: `category`,
                icon: "component",
              },
            ]}
          />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
