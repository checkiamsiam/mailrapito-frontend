import { Button } from "@ui/components/button";
import SectionHeading from "../Section/SectionHeading";

const NewsLetter = () => {
  return (
    <section
      className="h-[400px] w-full"
      style={{
        background: `url(${"/images/newsletter_bg.svg"}) no-repeat center center / cover`,
      }}
    >
      <div className="container flex h-full flex-col items-center justify-between gap-6 py-12 md:flex-row">
        <div className="w-1/2">
          <SectionHeading
            title="Subscribe to our Newsletters"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Phasellus malesuada nisi tellus, non imperdiet nisi tempor at."
            leftAlign
          />
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            className="bg-primary-gradient none block w-full rounded-full border-none py-4 pl-6 pr-20 text-white outline-none placeholder:text-white md:w-[522px]"
            placeholder="Enter your email"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Button className="text-primary rounded-full bg-white py-2 hover:bg-white/80">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
