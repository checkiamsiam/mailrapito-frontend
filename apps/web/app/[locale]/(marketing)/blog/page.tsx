"use client";

import BlogCard from "@marketing/blog/components/BlogCard";
import MostReadedArticle from "@marketing/blog/components/MostReadedArticle";
import PageBanner from "@marketing/shared/components/PageBanner";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import NewsLetter from "@shared/components/NewsLetter/NewsLetter";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { useBlogs } from "../../../../hooks/useBlogs";

export default function BlogListPage() {
  const { data, isLoading } = useBlogs();
  return (
    <>
      <PageBanner title="Blog" />
      <div className="container py-20 md:py-28">
        {/* Blog List */}
        {isLoading ? (
          <div className="grid h-96 w-full place-items-center">
            <LoadingIcon size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {data?.allBlogs?.map((blog, i) => (
              <BlogCard key={blog?._id} data={blog} />
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <PrimaryButton className="p-6">More articles</PrimaryButton>
        </div>

        {/* More Readed Articles */}
        <MostReadedArticle data={data?.allBlogs ?? []} />
      </div>

      <NewsLetter />
    </>
  );
}
