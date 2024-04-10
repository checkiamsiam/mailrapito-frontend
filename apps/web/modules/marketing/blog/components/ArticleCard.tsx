import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  data: {
    title: string;
    description: string;
    thumbnail: string;
    date: string | Date;
    slug: string;
  };
}

const ArticleCard = ({ data }: IProps) => {
  const { title, description, thumbnail, date, slug } = data;
  return (
    <div
      className="group cursor-pointer rounded-2xl bg-white p-3"
      style={{ boxShadow: "0px 8px 20px 0px #4A4EDC26" }}
      data-aos="fade-up"
    >
      <Link className="flex items-center gap-4" href={`/blog/${slug}`}>
        <div className="relative h-[124px] w-[184px] overflow-hidden rounded-2xl">
          <Image
            src={thumbnail}
            alt="Thumbnail Image"
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="relative">
          <h5 className="text-primary text-lg font-semibold">
            {title?.length >= 40 ? title?.slice(0, 40) + "..." : title}
          </h5>
          <div className="py-2 text-sm">
            {description?.length >= 60
              ? description?.slice(0, 60) + "..."
              : description}
          </div>
          {date && (
            <span className="text-xs">
              {moment(date).format("MMMM DD, YYYY")}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
