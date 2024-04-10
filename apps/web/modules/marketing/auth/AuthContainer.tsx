"use client";

import Image from "next/image";
import type { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className="relative grid min-h-[80vh] place-items-center"
      data-aos="fade-up"
    >
      <div className="container py-16 md:py-28">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {children}
        </div>
      </div>

      {/* Right Side */}
      <div className="absolute left-1/2 top-1/2 hidden -translate-y-1/2 md:block">
        <Image
          className="mw-100"
          data-aos="fade-up"
          src={"/images/auth/auth-img.svg"}
          alt="Auth Image"
          width={777}
          height={527}
        />
      </div>

      {/* Bg Element */}
      <div className="bg-primary blur_element absolute bottom-36 left-[-192px] z-[-1] h-[434px] w-[434px] rounded-full blur-[340px] "></div>
    </section>
  );
};

export default AuthContainer;
