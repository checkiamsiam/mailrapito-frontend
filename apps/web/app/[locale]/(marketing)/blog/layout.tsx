import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("blog.title"),
    description: t("blog.description"),
  };
}

const BlogLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default BlogLayout;
