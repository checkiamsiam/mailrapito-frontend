/* eslint-disable @next/next/no-img-element */
"use client";

import { useWindowWidth } from "@react-hook/window-size";
import SMSIcon from "@shared/icons/SMSIcon";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import HomeBannerCard from "./HomeBannerCard";

export default function HomeBanner() {
  const t = useTranslations();
  const windowWidth = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(windowWidth < 768);
  }, [windowWidth]);

  return (
    <div>
      <div className="bg-primary-light-gradient gradient-border-light relative mx-4 h-full rounded-[20px] pb-2 before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:rounded-[20px] md:mx-8 md:rounded-[40px] md:pb-[284px] md:before:rounded-[40px]">
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
        <div className="m:top-[220px] absolute -left-4 top-[34px] md:left-5">
          <img
            src="/images/banner/sms_1.svg"
            width={isMobile ? 70 : 183}
            height={isMobile ? 60 : 157}
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
        <div className="absolute right-0 top-0">
          <img
            src="/images/banner/banner_line_top.svg"
            width={isMobile ? 130 : 314}
            height={isMobile ? 80 : 189}
            alt="line"
          />
        </div>

        {/* Bg Element:: Bottom Right SMS */}
        <div className="absolute bottom-[-30px] right-[-20px] md:bottom-[-80px] md:right-32">
          <img
            src="/images/banner/sms_2.svg"
            width={isMobile ? 53 : 181}
            height={isMobile ? 45 : 165}
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
