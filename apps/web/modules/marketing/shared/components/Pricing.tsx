"use client";

import SubscriptionModal from "@marketing/home/components/SubscriptionModal";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import SectionHeading from "@shared/components/Section/SectionHeading";
import CheckIcon from "@shared/icons/CheckIcon";
import { Button } from "@ui/components/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const t = useTranslations();
  const router = useRouter();
  const data = [
    {
      id: 1,
      title: "Public",
      price: 0,
      features: [
        t("pricing.public._1"),
        t("pricing.public._2"),
        t("pricing.public._3"),
      ],
    },
    {
      id: 2,
      title: "Premium",
      price: 9,
      features: [
        t("pricing.premium._1"),
        t("pricing.premium._2"),
        t("pricing.premium._3"),
        t("pricing.premium._4"),
        t("pricing.premium._5"),
        t("pricing.premium._6"),
      ],
      label: "Most Popular",
    },
    {
      id: 3,
      title: "Private",
      price: 18,
      features: [
        t("pricing.private._1"),
        t("pricing.private._2"),
        t("pricing.private._3"),
      ],
    },
  ];

  // const apiCaller = await createApiCaller();
  // const plans = await apiCaller.billing.plans();

  return (
    <>
      <section
        className="bg-primary-gradient relative pb-20 pt-12 md:pb-40 md:pt-20"
        id="pricing"
      >
        <div
          className="absolute left-0 top-0 z-0 w-full md:h-[100%]" //md:h-[792px]
        ></div>
        <div className="container relative mt-5">
          <SectionHeading
            subtitle={t("pricing.subtitle")}
            title={t("pricing.title")}
            description={t("pricing.description")}
            color="text-white"
          />
          <div
            className="flex flex-col items-center justify-center gap-6 pt-10 md:pt-28 lg:flex-row lg:items-start lg:gap-0"
            data-aos="fade-up"
          >
            {data.map((item, i) => (
              <div
                key={item.id}
                className={`bg-gray-50 shadow-xl ${i === 0 ? "lg:min-h-[572px]" : data?.length === i + 1 ? "lg:min-h-[572px]" : "lg:min-h-[672px]"} relative inline-block rounded-2xl ${item?.label ? "border-primary-dark w-full border-2  sm:w-[505px]" : "w-full sm:w-[505px] lg:w-[335px] lg:translate-y-10"} ${i === 0 ? "lg:rounded-br-none" : data?.length === i + 1 ? "lg:rounded-bl-none" : ""}`}
              >
                {/* Badge */}
                {item?.label && (
                  <div className="bg-primary-dark absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-sm text-white">
                    {item.label}
                  </div>
                )}

                <div
                  className={`rounded-t-2xl border-b bg-white py-6 text-center shadow-xl sm:py-12 lg:shadow-none ${i === 0 ? "lg:rounded-tr-none" : data?.length === i + 1 ? "lg:rounded-tl-none" : ""}`}
                >
                  <h3 className="text-3xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-center gap-2 ">
                    <span className="text-3xl font-bold text-gray-900">$</span>
                    <span className="text-6xl font-bold text-gray-900">
                      {item.price}
                    </span>
                    <span className="text-base text-gray-500">/month</span>
                  </div>
                </div>

                <div
                  className={`lg:rounded-tr-none ${i === 0 ? "lg:rounded-br-none" : data?.length === i + 1 ? "lg:rounded-bl-none" : ""} rounded-b-2xl bg-gray-50 p-5 sm:p-10`}
                >
                  <ul className="flex flex-col gap-4">
                    {item.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-500"
                      >
                        <div>
                          <CheckIcon color="#10B981" />
                        </div>
                        <span className="text-base font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="m-6 flex flex-col items-center text-center">
                  {item?.label ? (
                    <PrimaryButton
                      className="w-full py-8"
                      onClick={() => router.push("/app/settings/team/billing")}
                    >
                      {t("pricing.btnText")}
                    </PrimaryButton>
                  ) : (
                    <Button
                      className="text-primary-dark hover:bg-primary-dark bottom-2 w-full bg-white py-8 shadow-xl hover:text-white"
                      onClick={() => router.push("/app/settings/team/billing")}
                    >
                      {t("pricing.btnText")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <SubscriptionModal /> */}
    </>
  );
};

export default Pricing;
