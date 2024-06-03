/* eslint-disable @next/next/no-img-element */
"use client";

import SMSIcon from "@shared/icons/SMSIcon";
import { useTranslations } from "next-intl";
import HomeBannerCard from "./HomeBannerCard";

export default function HomeBanner() {
  const t = useTranslations();

  return (
    <div>
      <div className="bg-primary-light-gradient gradient-border-light relative mx-4 h-full rounded-[40px] pb-2 before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:rounded-[40px] md:mx-8 md:pb-[284px]">
        {/* <TsParticles /> */}

        <div
          className="container relative flex flex-col items-center gap-4 py-[42px] text-center text-white md:py-[82px]"
          data-aos="fade-up"
        >
          {/* Button */}
          <div className="gradient-border-primary rounded-full bg-white/70 before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:rounded-full">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background:
                  "linear-gradient(142deg, rgba(50, 63, 212, 0.1) 6.03%, rgba(245, 91, 122, 0.1) 100.27%)",
              }}
            >
              <SMSIcon />
              <span className="text-primary">Temporary Email Services</span>
            </div>
          </div>

          {/* title */}
          <h2 className="mt-6 text-xl font-bold capitalize text-black md:text-5xl">
            {t("banner.title")}
          </h2>
          {/* description */}
          <p className="mx-auto max-w-2xl font-medium text-[#7C7D81]">
            {t("banner.subtitle")}
          </p>
        </div>
        {/* Bg Element:: Left SMS */}
        <div className="absolute left-5 top-[220px] hidden md:block">
          <img
            src="/images/banner/sms_1.svg"
            width={183}
            height={157}
            alt="sms"
          />
        </div>

        {/* Bg Element:: Bottom Left Line */}
        <div className="absolute bottom-8 left-0 hidden md:block">
          <img
            src="/images/banner/banner_line_bottom.svg"
            width={449}
            height={270}
            alt="line"
          />
        </div>

        {/* Bg Element:: Top Right Line */}
        <div className="absolute right-0 top-0 hidden md:block">
          <img
            src="/images/banner/banner_line_top.svg"
            width={314}
            height={189}
            alt="line"
          />
        </div>

        {/* Bg Element:: Bottom Right SMS */}
        <div className="absolute bottom-[-80px] right-32 hidden md:block">
          <img
            src="/images/banner/sms_2.svg"
            width={181}
            height={165}
            alt="sms"
          />
        </div>

        <div className="block md:hidden">
          <HomeBannerCard />
        </div>
      </div>

      <div className="mt-[-322px] hidden md:block">
        <HomeBannerCard />
      </div>
    </div>
  );
}
