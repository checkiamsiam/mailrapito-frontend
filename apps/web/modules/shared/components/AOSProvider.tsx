"use client";

import Aos from "aos";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

const AOSProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    Aos.init({
      easing: "ease-in-cubic",
      once: true,
      offset: 0,
    });
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
