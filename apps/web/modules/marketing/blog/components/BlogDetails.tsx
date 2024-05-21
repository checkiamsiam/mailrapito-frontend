import moment from "moment";
import Image from "next/image";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import "react-quill/dist/quill.snow.css";
import "./style.css";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  slug: string;
  description: string;
  keywords: string;
  category: string | null;
  content: string | null;
  thumbnail: string | null;
  language: string | null;
  status: string | null;
  views: number | null;
  createdAt: Date;
  published: boolean;
}
interface IProps {
  data: BlogPost;
}

const BlogDetails = ({ data }: IProps) => {
  const { title, description, content, author, createdAt } = data;

  function createMarkup() {
    const stringContent = data?.content;
    const parsedContent = JSON.parse(stringContent as string);
    if (stringContent) {
      const deltaOps = parsedContent?.ops as any[];
      const converter = new QuillDeltaToHtmlConverter(deltaOps);
      const html = converter.convert();
      return { __html: html };
    }
  }

  return (
    <div>
      <h2 className="text-primary-dark text-xl font-semibold capitalize md:text-3xl">
        {title}
      </h2>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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

        <p className="text-grayText text-base">
          {moment(createdAt).format("MMMM DD, YYYY")}
        </p>
      </div>

      <div className="my-8 h-[1px] w-full bg-gray-200 md:my-14"></div>

      {/* Description */}
      <div className="text-title">
        <div>{description}</div>
        {content && (
          <div
            className="ql-editor mt-10 !p-0"
            dangerouslySetInnerHTML={createMarkup()}
          ></div>
        )}

        {/*<div className="my-10 flex gap-4">
          <div className="bg-primary-dark h-20 w-1.5"></div>
          <p className="max-w-lg text-lg font-semibold italic">
            Fermentum pellentesque ornare mauris, dolor ut porttitor. Ac
            molestie ut ut diam dictum arcu etiam. Nulla enim in ut sit. Id
            lacus ut amet quam fermentum ultrices accumsan.
          </p>
        </div>

        <div className="relative h-[602px] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/blogs/blog-single-1.png"
            alt="Blog Thumbnail"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="my-10">
          Vestibulum purus semper rhoncus. Pretium turpis cursus porttitor massa
          enim tempus in aliquet lectus. Arcu sem praesent egestas commodo
          facilisi auctor diam gravida ac. Risus id eget vitae senectus elit
          enim. Eu ut turpis et tortor arcu. Turpis amet amet risus morbi metus,
          tellus eu molestie pretium. Adipiscing ullamcorper eget ut auctor
          tempus. Felis netus amet, dis nunc lectus aliquam leo, malesuada sed.
          Amet scelerisque elit egestas rhoncus justo nec consectetur id. Ut
          magna condimentum tellus integer convallis sed vel, faucibus.
          Hendrerit elementum quisque varius varius lectus neque, gravida at
          senectus. Luctus sed ullamcorper placerat placerat neque et quam
          mauris morbi. Odio ut eget at sollicitudin sodales augue. Morbi urna
          eget scelerisque id.Ridiculus gravida arcu eu amet, amet dignissim
          sed. Nunc eu, nibh odio odio mauris mollis aliquam in sed. Hendrerit
          at pellentesque molestie mollis amet nulla turpis et. Habitant sit
          arcu eget etiam sociis tincidunt platea a hendrerit. Fermentum at
          tristique elit luctus. Amet nibh fermentum neque sed tristique
          fringilla diam massa. Augue pulvinar sagittis morbi laoreet congue.
          Praesent vestibulum sed turpis sed quis. Aliquet viverra lorem
          venenatis, sit pulvinar ut at eget. At malesuada metus blandit
          sagittis non egestas eget quis. Risus, porta vestibulum vulputate sit
          massa aliquam diam. Quam vel, ultrices ultricies ipsum, risus in quis
          pulvinar leo. Bibendum sociis cursus nascetur suspendisse. Et sit odio
          pellentesque amet congue nunc, montes, tortor. Tincidunt viverra in eu
          ut aliquam. Enim bibendum pharetra, massa posuere. Arcu rhoncus,
          viverra facilisis ipsum duis nulla vitae. Blandit nisi, lobortis felis
          cum tincidunt aliquet. Mi dui adipiscing varius nunc amet, aenean.
          Donec lorem dui aliquet arcu eu. Etiam sit pulvinar est, at lectus
          mattis.
        </p>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/blogs/blog-single-2.png"
            alt="Blog Thumbnail"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="my-10">
          Vestibulum purus semper rhoncus. Pretium turpis cursus porttitor massa
          enim tempus in aliquet lectus. Arcu sem praesent egestas commodo
          facilisi auctor diam gravida ac. Risus id eget vitae senectus elit
          enim. Eu ut turpis et tortor arcu. Turpis amet amet risus morbi metus,
          tellus eu molestie pretium. Adipiscing ullamcorper eget ut auctor
          tempus. Felis netus amet, dis nunc lectus aliquam leo, malesuada sed.
          Amet scelerisque elit egestas rhoncus justo nec consectetur id. Ut
          magna condimentum tellus integer convallis sed vel, faucibus.
          Hendrerit elementum quisque varius varius lectus neque, gravida at
          senectus. Luctus sed ullamcorper placerat placerat neque et quam
          mauris morbi. Odio ut eget at sollicitudin sodales augue. Morbi urna
          eget scelerisque id.Ridiculus gravida arcu eu amet, amet dignissim
          sed. Nunc eu, nibh odio odio mauris mollis aliquam in sed. Hendrerit
          at pellentesque molestie mollis amet nulla turpis et. Habitant sit
          arcu eget etiam sociis tincidunt platea a hendrerit. Fermentum at
          tristique elit luctus. Amet nibh fermentum neque sed tristique
          fringilla diam massa. Augue pulvinar sagittis morbi laoreet congue.
          Praesent vestibulum sed turpis sed quis. Aliquet viverra lorem
          venenatis, sit pulvinar ut at eget. At malesuada metus blandit
          sagittis non egestas eget quis. Risus, porta vestibulum vulputate sit
          massa aliquam diam. Quam vel, ultrices ultricies ipsum, risus in quis
          pulvinar leo. Bibendum sociis cursus nascetur suspendisse. Et sit odio
          pellentesque amet congue nunc, montes, tortor. Tincidunt viverra in eu
          ut aliquam. Enim bibendum pharetra, massa posuere. Arcu rhoncus,
          viverra facilisis ipsum duis nulla vitae. Blandit nisi, lobortis felis
          cum tincidunt aliquet. Mi dui adipiscing varius nunc amet, aenean.
          Donec lorem dui aliquet arcu eu. Etiam sit pulvinar est, at lectus
          mattis.
        </p> */}
      </div>
    </div>
  );
};

export default BlogDetails;
