import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import type { IBlog } from "../../../../interface/commonInterface";

interface IProps {
  data: IBlog;
}

const BlogCard = ({ data }: IProps) => {
  const { title, description, thumbnail, author, published_date, views, slug } =
    data;
  return (
    <div
      className="group relative cursor-pointer rounded-xl bg-white p-3 pb-16"
      style={{ boxShadow: "0px 8px 20px 0px #4A4EDC26" }}
      data-aos="fade-up"
    >
      <Link href={`/blog/${slug}`} className="h-full">
        <div className="relative h-[218px] w-full overflow-hidden rounded-2xl">
          <Image
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            src={thumbnail}
            alt="Blog Thumbnail"
            fill
          />
        </div>

        <div className="flex flex-col gap-3 px-2 py-4">
          <h5 className="text-lg font-semibold">
            {title?.length >= 60 ? title?.slice(0, 60) + "..." : title}
          </h5>
          <h5 className="text-base">
            {description?.length >= 100
              ? description?.slice(0, 100) + "..."
              : description}
          </h5>
        </div>

        <div className="absolute bottom-2 flex w-[93%] items-center justify-between border-t pb-2 pt-4">
          <div className="flex items-center gap-2">
            <Image
              className="avatar"
              src="/images/avatar2.png"
              alt="Author Avatar"
              width={24}
              height={24}
            />
            <h5 className="font-semibold">{author}</h5>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <p>{moment(published_date).format("MMMM DD, YYYY")}</p>
            <span>-</span>
            <p>{views} views</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
