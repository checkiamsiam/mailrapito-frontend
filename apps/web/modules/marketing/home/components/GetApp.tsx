import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const GetApp = () => {
  const t = useTranslations();
  return (
    <section className="relative mt-12 bg-[#f4cfde] pt-12 md:mt-20 md:pt-20">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="max-w-[412px]" data-aos="fade-up">
            <h2 className="text-title text-3xl font-bold !leading-[62px] md:text-5xl">
              {t("getApp.title")}
            </h2>
            <div className="text-grayText mb-12 mt-6">{t("getApp.desc")}</div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src={"/images/apps/1.svg"}
                  alt="Google Play Store Image"
                  width={189}
                  height={57}
                />
              </Link>
              <Link href="/">
                <Image
                  src={"/images/apps/2.svg"}
                  alt="Apple Store Image"
                  width={168}
                  height={57}
                />
              </Link>
            </div>
          </div>
          <div className="relative bottom-0 max-w-[550px]">
            <Image
              src={"/images/apps/mobile-app.png"}
              className="mobile-app image"
              data-aos="fade-up"
              alt=""
              width={550}
              height={420}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
