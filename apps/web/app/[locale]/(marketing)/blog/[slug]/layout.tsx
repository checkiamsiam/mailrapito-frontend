import type { PropsWithChildren } from "react";
import { getSingleBlog } from "../../../../../services/services";

export async function generateMetadata({ params: { slug } }) {
  const blog = await getSingleBlog(slug as string);
  return {
    title: blog?.singleBlog?.title,
    description: blog?.singleBlog?.description,
  };
}

const SingleBlogLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default SingleBlogLayout;
