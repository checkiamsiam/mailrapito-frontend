"use client";

import TsParticles from "../../../shared/components/TsParticle/TsParticle";

interface IProps {
  title: string;
  description?: string;
}

const PageBanner = ({ title, description }: IProps) => {
  return (
    <div className="before:bg-primary-gradient relative h-full before:absolute before:h-full before:w-full">
      <TsParticles />
      <div className="container relative flex h-[300px] flex-col items-center justify-center py-[92px] text-center text-white">
        <h2 className="text-xl font-bold capitalize sm:text-2xl md:text-3xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium md:text-xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
