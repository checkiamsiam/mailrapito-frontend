"use server";

import BlogCard from "@marketing/blog/components/BlogCard";
import BlogDetails from "@marketing/blog/components/BlogDetails";
import MostReadedArticle from "@marketing/blog/components/MostReadedArticle";
import PageBanner from "@marketing/shared/components/PageBanner";
import LoadingIcon from "@shared/icons/LoadingIcon";
import {
  fetchMostLikedBlogs,
  fetchMostReadBlogs,
  fetchSinglePost,
} from "../../../../../hooks/use-singleBlog-query";

export default async function BlogPostPage({ params }) {
  const slug = params.slug;
  const post = await fetchSinglePost(slug as string, true);
  const mostReadBlogs = await fetchMostReadBlogs();
  const alsoLikeBlogs = await fetchMostLikedBlogs();

  return (
    <>
      {post.success ? (
        <>
          <PageBanner title={post.singlePost.title} />
          <div className="container py-20 md:py-28">
            <BlogDetails data={post.singlePost} />
          </div>
        </>
      ) : (
        <div className="container py-20 md:py-28">
          <div className="grid h-96 w-full place-items-center">
            <LoadingIcon size={32} />
          </div>

          {mostReadBlogs.success && mostReadBlogs?.mostReadBlogs?.length > 0 ? (
            <MostReadedArticle data={mostReadBlogs?.mostReadBlogs ?? []} />
          ) : null}
          {/* Blog List */}
          {alsoLikeBlogs?.mostLikedBlogs?.length ? (
            <div>
              <h5 className="text-title mt-20 text-3xl font-semibold">
                You may also like
              </h5>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {alsoLikeBlogs?.mostLikedBlogs?.map((item, i) => (
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
