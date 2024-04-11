import SectionHeading from "@shared/components/Section/SectionHeading";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Features = () => {
  const t = useTranslations();
  const featureItems = [
    {
      title: t("features.feature1.title"),
      desc: t("features.feature1.desc"),
      icon: "/images/feature/1.svg",
    },
    {
      title: t("features.feature2.title"),
      desc: t("features.feature2.desc"),
      icon: "/images/feature/2.svg",
    },
    {
      title: t("features.feature3.title"),
      desc: t("features.feature3.desc"),
      icon: "/images/feature/3.svg",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-12 md:py-28"
      data-aos="fade-up"
    >
      <div className="container">
        <SectionHeading
          subtitle={t("features.subtitle")}
          title={t("features.title")}
          description={t("features.description")}
        />

        <div className="mt-20 flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex flex-col items-start gap-8">
            {featureItems.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-9 rounded-3xl p-4 w-full"
                style={{ boxShadow: "0px 4px 40px 0px #2B2E4A33" }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={49}
                />
                <div>
                  <h3 className="text-primary text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-grayText mt-4 max-w-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Image
              src={"/images/feature/feature.svg"}
              className="rounded-3xl"
              alt="Feature Image"
              width={574}
              height={385}
              // style={{ boxShadow: "0px 4px 40px 0px #2B2E4A33" }}
            />
          </div>
        </div>
      </div>

      {/* Bg Element */}
      <div className="bg-primary blur_element absolute left-[-192px] top-36 z-[-1] h-[434px] w-[434px] rounded-full blur-[340px]"></div>
    </section>
  );
};

export default Features;
