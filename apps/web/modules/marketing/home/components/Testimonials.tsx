"use client";

import {
  CustomNextArrow,
  CustomPrevArrow,
} from "@shared/components/Button/SliderButton";
import SectionHeading from "@shared/components/Section/SectionHeading";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Slider from "react-slick";

const Testimonials = () => {
  const t = useTranslations();

  const data = [
    {
      quote: `${t("testimonials.quote1")}`,
      name: `rona rania`,
      designation: `Apple Store Review`,
      img: "/images/customer/1.png",
    },
    {
      quote: `${t("testimonials.quote2")}`,
      name: `TsunWai Wong`,
      designation: `Play Store Review`,
      img: "/images/customer/2.png",
    },
    {
      quote: `${t("testimonials.quote3")}`,
      name: `Mang Oleh`,
      designation: `Chrome store Review`,
      img: "/images/customer/3.png",
    },
    {
      quote: `${t("testimonials.quote1")}`,
      name: `rona rania`,
      designation: `Apple Store Review`,
      img: "/images/customer/1.png",
    },
    {
      quote: `${t("testimonials.quote2")}`,
      name: `TsunWai Wong`,
      designation: `Play Store Review`,
      img: "/images/customer/2.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    customPaging: () => (
      <div className={`custom-dot h-2 w-2 rounded-full bg-[#c4c4c4]`}></div>
    ),
  };

  return (
    <>
      <section
        className="relative overflow-x-hidden pb-12 pt-20 md:pb-20 md:pt-36"
        id="testimonials"
      >
        <div className="relative">
          <SectionHeading title={t("testimonials.title")} />
          <div className="relative mx-auto mt-8 sm:mt-20">
            <Slider {...settings}>
              {data.map(({ quote, name, img, designation }, i) => (
                <div key={i} className="px-2 pt-20 md:px-4">
                  <div className="testimonial-item translate-y-0 text-center transition-transform duration-300">
                    <blockquote className="w-[300px] rounded-lg bg-[#f2f6ff] px-2 pb-20 pt-10 text-sm font-semibold italic duration-500 sm:w-[450px] sm:px-6 sm:text-lg md:w-[608px] md:px-10">
                      {quote}
                    </blockquote>
                    <Image
                      src={img}
                      className="mx-auto -mt-12 mb-4 h-24 rounded-full border-2 border-transparent object-cover"
                      alt="Customer Avatar"
                      width={92}
                      height={92}
                    />
                    <h5 className="text-xl font-semibold capitalize">{name}</h5>
                    <span className="text-grayText mt-2 text-sm">
                      {designation}
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Bg Element */}
        <div className="bg-primary blur_element absolute right-0 top-36 z-[-1] h-[434px] w-[434px] rounded-full blur-[340px]"></div>
      </section>
    </>
  );
};

export default Testimonials;
