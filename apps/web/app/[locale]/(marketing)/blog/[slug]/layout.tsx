import type { PropsWithChildren } from "react";
import { fetchSinglePost } from "../../../../../hooks/use-singleBlog-query";

export async function generateMetadata({ params: { slug } }) {
  const post = await fetchSinglePost(slug as string, false);
  return {
    title: post?.singlePost?.title,
    description: post?.singlePost?.description,
  };
}

const SingleBlogLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default SingleBlogLayout;
