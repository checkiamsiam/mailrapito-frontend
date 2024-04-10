import SectionHeading from "@shared/components/Section/SectionHeading";
import { useTranslations } from "next-intl";

const WorkProcess = () => {
  const t = useTranslations();
  return (
    <section
      id="work-process"
      className="relative py-12 md:py-28"
      data-aos="fade-up"
    >
      <div className="container">
        <SectionHeading
          subtitle={t("workProcess.subtitle")}
          title={t("workProcess.title")}
          description={t("workProcess.description")}
        />

        <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row lg:justify-between">
          {/* Step 01 */}

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="bg-primary-gradient grid h-[60px] w-[60px] place-items-center rounded-full text-3xl font-semibold text-white lg:h-[86px] lg:w-[86px]">
              01
            </div>
            <div className="mx-auto max-w-[310px] text-center text-xl font-semibold">
              {t("workProcess.step1")}
            </div>
          </div>

          <div className="relative lg:mt-12">
            {/* Step 02 */}
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="bg-primary-gradient grid h-[60px] w-[60px] place-items-center rounded-full text-3xl font-semibold text-white lg:h-[86px] lg:w-[86px]">
                02
              </div>
              <div className="mx-auto max-w-[310px] text-center text-xl font-semibold">
                {t("workProcess.step2")}
              </div>
            </div>
            <svg
              className="absolute right-[calc(50%+80px)] top-0 hidden max-w-[150px] md:block lg:right-[calc(50%+120px)] lg:max-w-[212px]"
              width="212"
              height="44"
              viewBox="0 0 212 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5C32.1667 22.5 117.8 58.5 211 34.5"
                stroke="#4E6AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
            </svg>
            <svg
              className="absolute left-[calc(50%+80px)] top-0 hidden max-w-[150px] md:block lg:left-[calc(50%+120px)] lg:max-w-[212px]"
              width="212"
              height="44"
              viewBox="0 0 212 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 42.4531C32.1667 21.4531 117.8 -14.5469 211 9.45312"
                stroke="#4E6AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          <div className="">
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="bg-primary-gradient grid h-[60px] w-[60px] place-items-center rounded-full text-3xl font-semibold text-white lg:h-[86px] lg:w-[86px]">
                03
              </div>
              <div className="mx-auto max-w-[310px] text-center text-xl font-semibold">
                {t("workProcess.step3")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bg Element */}

      <div className="bg-primary-gradient blur_element absolute right-0 top-0 z-[-1] h-[370px] w-[370px] blur-[340px]"></div>
    </section>
  );
};

export default WorkProcess;
