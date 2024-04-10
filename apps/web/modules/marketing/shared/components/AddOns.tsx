import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../../app/styles/home.module.css";

const data = [
  {
    img: "/images/temp-email/1.svg",
    link: "#",
  },
  {
    img: "/images/temp-email/2.svg",
    link: "#",
  },
  {
    img: "/images/temp-email/3.svg",
    link: "#",
  },
  {
    img: "/images/temp-email/4.svg",
    link: "#",
  },
  {
    img: "/images/temp-email/5.svg",
    link: "#",
  },
];

const AddOns = () => {
  const t = useTranslations();
  return (
    <>
      <section
        className="overflow-hidden py-12 md:py-20"
        id="addons"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="grid grid-cols-12 items-center justify-between gap-y-12 lg:gap-x-4 lg:gap-y-0">
            <div className="col-span-12 text-center lg:col-span-5 lg:text-left">
              <h2 className="text-title text-3xl font-bold md:text-5xl lg:!leading-[62px]">
                {t("addons.title")}
              </h2>
            </div>
            <div className="col-span-12 text-right lg:col-span-7">
              <div className={`${styles.addons_images}`}>
                {data?.map(({ img, link }, i) => (
                  <Link
                    href={link}
                    key={i}
                    className="block w-[264px] animate-pulse"
                  >
                    <div>
                      <Image
                        src={img}
                        alt="Add-Ons Image"
                        width={264}
                        height={93}
                        className="image"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddOns;
