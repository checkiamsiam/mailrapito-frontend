"use client";

import PrimaryButton from "@shared/components/Button/PrimaryButton";
import SectionHeading from "@shared/components/Section/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/accordion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState("1");
  const t = useTranslations();

  const data = [
    {
      id: "1",
      ques: t("faq.ques1"),
      ans: t("faq.ans1"),
    },
    {
      id: "2",
      ques: t("faq.ques2"),
      ans: t("faq.ans2"),
    },
    {
      id: "3",
      ques: t("faq.ques3"),
      ans: t("faq.ans3"),
    },
    {
      id: "4",
      ques: t("faq.ques4"),
      ans: t("faq.ans4"),
    },
    {
      id: "5",
      ques: t("faq.ques5"),
      ans: t("faq.ans5"),
    },
    {
      id: "6",
      ques: t("faq.ques6"),
      ans: t("faq.ans6"),
    },
  ];
  return (
    <section id="faq" className="relative overflow-hidden py-16">
      <div className="container relative z-10">
        <SectionHeading title={t("faq.title")} />

        <div className="mt-12" data-aos="fade-up">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={activeAccordion}
            onValueChange={(value) => setActiveAccordion(value)}
          >
            {data.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={`px-4 py-4 ${item.id === activeAccordion ? "mt-2 rounded-lg border-b-0 bg-white shadow-lg" : ""}`}
              >
                <AccordionTrigger
                  className={`text-base font-semibold sm:text-xl ${item.id === activeAccordion ? "!text-primary" : "text-gray-800"}`}
                  style={{ textDecoration: "none" }}
                >
                  <span>{item.ques}</span>
                  <Image
                    src={
                      item.id === activeAccordion
                        ? "/images/icons/minus-circle.svg"
                        : "/images/icons/plus-circle.svg"
                    }
                    alt="icon"
                    width={24}
                    height={24}
                  />
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.ans}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-center gap-6 rounded-xl bg-[#F9FAFB] py-8 text-center shadow"
          data-aos="fade-up"
        >
          <div className="flex items-center">
            <Image
              src={"/images/avatar/avatar2.png"}
              alt="Avatar Image"
              width={48}
              height={48}
              className="translate-x-4"
            />
            <Image
              src={"/images/avatar/avatar1.png"}
              alt="Avatar Image"
              width={56}
              height={56}
              className="z-10 rounded-full border-2 border-white"
            />
            <Image
              src={"/images/avatar/avatar3.png"}
              alt="Avatar Image"
              width={48}
              height={48}
              className="-translate-x-4"
            />
          </div>
          <div>
            <h5 className="text-title text-xl font-bold ">
              {t("faq.extraQues")}
            </h5>
            <p className="text-lg font-medium">{t("faq.extraDesc")}</p>
          </div>
          <Link href="/contact">
            <PrimaryButton className="py-6">{t("faq.btnText")}</PrimaryButton>
          </Link>
        </div>
      </div>

      {/* Bg Element */}
      <div className="bg-primary-gradient blur_element absolute left-[-250px] top-[-40px] z-0 h-[435px] w-[435px]  rounded-3xl blur-[335px]"></div>
    </section>
  );
};

export default FAQ;
