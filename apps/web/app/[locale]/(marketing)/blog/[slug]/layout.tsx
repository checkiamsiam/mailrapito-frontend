import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { fetchSinglePost } from "../../../../../hooks/use-singleBlog-query";

export async function generateMetadata({ params: { slug } }) {
  const post = await fetchSinglePost(slug as string, false);

  const metadata: Metadata = {
    title: post?.singlePost?.title,
    description: post?.singlePost?.description,
    keywords: post?.singlePost?.keywords.split(" ").join(", "),
    openGraph: {
      title: post?.singlePost?.title,
      description: post?.singlePost?.description,
      siteName: "Mail Rapido",
      type: "article",
      url: `https://mailrapido.com/${post?.singlePost?.slug}`,
      images: [
        {
          url: post?.singlePost?.thumbnail ?? "",
          width: 800,
          height: 600,
          alt: post?.singlePost?.title,
        },
      ],
    },
    metadataBase: new URL(`https://mailrapido.com/${post?.singlePost?.slug}`),
  };
  return metadata;
}

const SingleBlogLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default SingleBlogLayout;
