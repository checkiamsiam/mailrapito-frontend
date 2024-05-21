import FAQ from "@marketing/home/components/FAQ";
import Features from "@marketing/home/components/Features";
import GetApp from "@marketing/home/components/GetApp";
import LatestBlogs from "@marketing/home/components/LatestBlogs";
import Testimonials from "@marketing/home/components/Testimonials";
import WorkProcess from "@marketing/home/components/WorkProcess";
import AddOns from "@marketing/shared/components/AddOns";
import dynamic from "next/dynamic";

// ------ No SSR Components ------
const HomeBanner = dynamic(
  () => import("@marketing/home/components/HomeBanner"),
  { ssr: false },
);
const Pricing = dynamic(() => import("@marketing/shared/components/Pricing"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HomeBanner />
      <WorkProcess />
      <Features />
      <AddOns />
      <GetApp />
      <Testimonials />
      <Pricing />
      <FAQ />
      <LatestBlogs />
    </>
  );
}
