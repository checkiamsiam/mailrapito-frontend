"use client";

import SectionHeading from "@shared/components/Section/SectionHeading";
import LoadingIcon from "@shared/icons/LoadingIcon";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useBlogs } from "../../../../hooks/useBlogs";

const LatestBlogs = () => {
  const t = useTranslations();
  const { data: blogs, isLoading } = useBlogs();
  const firstBlog = blogs?.allBlogs?.[0];

  return (
    <section
      id="blog"
      className="relative overflow-x-hidden overflow-y-visible py-12 md:py-20"
    >
      <div className="container">
        <SectionHeading title={t("blog.title")} subtitle={t("blog.subtitle")} />

        {isLoading ? (
          <div className="grid h-96 w-full place-items-center">
            <LoadingIcon size={32} />
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-12 items-center gap-4">
            {firstBlog ? (
              <div
                className="relative col-span-12 max-lg:mx-auto lg:col-span-7"
                data-aos="fade-up"
              >
                <Link href={`/blog/${firstBlog?.slug}`} data-aos="fade-up">
                  <div className="">
                    <Image
                      // src={firstBlog?.thumbnail}
                      src="/images/blogs/blog.png"
                      alt="Thumbnail"
                      width={558}
                      height={732}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-[cac(100%-20px)] max-w-[420px] bg-white bg-opacity-90 p-6">
                    <h5 className="text-primary text-base font-semibold md:text-2xl">
                      {firstBlog?.title?.length >= 60
                        ? firstBlog?.title?.slice(0, 60) + "..."
                        : firstBlog?.title}
                    </h5>
                    <p className="my-2 text-sm font-medium md:my-5 md:text-base">
                      {firstBlog?.description?.length >= 100
                        ? firstBlog?.description?.slice(0, 100) + "..."
                        : firstBlog?.description}
                    </p>
                    <div className="text-xs">
                      {moment(firstBlog?.published_date).format(
                        "MMMM DD, YYYY",
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ) : null}
            <div className="col-span-12 py-5 lg:col-span-5">
              <div className="flex flex-col gap-8" data-aos="fade-up">
                {blogs?.allBlogs
                  ?.slice(1, 5)
                  ?.map(
                    (
                      { thumbnail, title, description, published_date, slug },
                      i,
                    ) => (
                      <Link
                        className="mx-auto flex w-full items-center gap-4 sm:w-[80%] md:w-[558px] lg:w-full"
                        href={`/blog/${slug}`}
                        key={i}
                      >
                        <div className="relative h-[135px] w-full basis-5/12">
                          <Image
                            src={thumbnail}
                            alt="Thumbnail Image"
                            layout="fill"
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="basis-7/12">
                          <h5 className="text-primary text-sm font-semibold md:text-lg">
                            {title?.length >= 50
                              ? title?.slice(0, 50) + "..."
                              : title}
                          </h5>
                          <div className="py-1 text-xs sm:py-2 md:text-sm">
                            {description?.length >= 70
                              ? description?.slice(0, 70) + "..."
                              : description}
                          </div>
                          {published_date && (
                            <span className="text-[10px] md:text-xs">
                              {moment(published_date).format("MMMM DD, YYYY")}
                            </span>
                          )}
                        </div>
                      </Link>
                    ),
                  )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bg Element */}
      <div className="bg-primary-gradient blur_element absolute right-[-250px] top-0 z-0 h-[435px] w-[435px] rounded-3xl blur-[340px]"></div>
    </section>
  );
};

export default LatestBlogs;
