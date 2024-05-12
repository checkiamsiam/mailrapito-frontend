"use client";
import BlogCard from "@marketing/blog/components/BlogCard";
import MostReadedArticle from "@marketing/blog/components/MostReadedArticle";
import PageBanner from "@marketing/shared/components/PageBanner";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import NewsLetter from "@shared/components/NewsLetter/NewsLetter";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { apiClient } from "@shared/lib/api-client";
import { useState } from "react";

export default function BlogListPage() {
  const [numBlogsToShow, setNumBlogsToShow] = useState(6);

  const { data, isLoading } = apiClient.posts.publishedPosts.useQuery({
    enabled: false,
  });

  const handleLoadMore = () => {
    setNumBlogsToShow(numBlogsToShow + 3);
  };

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
            {data
              ?.slice(0, numBlogsToShow)
              .map((blog, i) => <BlogCard key={blog?.slug} data={blog} />)}
          </div>
        )}

        {data && data?.length === numBlogsToShow && (
          <div className="mt-10 flex justify-center">
            <PrimaryButton onClick={handleLoadMore}>Load More</PrimaryButton>
          </div>
        )}

        {/* More Readed Articles */}
        <MostReadedArticle data={data ?? []} />
      </div>

      <NewsLetter />
    </>
  );
}
