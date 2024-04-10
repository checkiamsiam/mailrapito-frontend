"use client";

import BlogCard from "@marketing/blog/components/BlogCard";
import BlogDetails from "@marketing/blog/components/BlogDetails";
import MostReadedArticle from "@marketing/blog/components/MostReadedArticle";
import PageBanner from "@marketing/shared/components/PageBanner";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { useParams } from "next/navigation";
import {
  useAlsoLikeBlogs,
  useMostReadBlogs,
  useSingleBlog,
} from "../../../../../hooks/useBlogs";

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data: blog, isLoading } = useSingleBlog(slug as string);
  const { data: mostReadBlogs } = useMostReadBlogs(slug as string);
  const { data: alsoLikeBlogs } = useAlsoLikeBlogs(slug as string);

  return (
    <>
      <PageBanner title={blog?.singleBlog?.title as string} />
      {isLoading || !blog?.singleBlog ? (
        <div className="grid h-96 w-full place-items-center">
          <LoadingIcon size={32} />
        </div>
      ) : (
        <div className="container py-20 md:py-28">
          <BlogDetails data={blog?.singleBlog} />

          {mostReadBlogs?.mostReadBlogs?.length ? (
            <MostReadedArticle data={mostReadBlogs?.mostReadBlogs ?? []} />
          ) : null}
          {/* Blog List */}
          {alsoLikeBlogs?.likeBlogs?.length ? (
            <div>
              <h5 className="text-title mt-20 text-3xl font-semibold">
                You may also like
              </h5>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {alsoLikeBlogs?.likeBlogs?.map((item, i) => (
                  <BlogCard key={i} data={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
