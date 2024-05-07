"use client";

import ArticleCard from "./ArticleCard";

interface IProps {
  data: any[];
}

const MostReadedArticle = ({ data }: IProps) => {
  return (
    <div>
      <h5 className="text-title mt-20 text-3xl font-semibold">
        More Readed Articles
      </h5>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data
          ?.sort((a, b) => b.views - a.views)
          .slice(0, 4)
          .map((item, i) => (
            <ArticleCard
              key={i}
              data={{
                title: item.title,
                description: item?.description,
                thumbnail: item.thumbnail,
                date: item.createdAt,
                slug: item.slug,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default MostReadedArticle;
