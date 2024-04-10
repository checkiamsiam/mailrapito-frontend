/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ArrowBackIcon from "@shared/icons/ArrowBackIcon";
import { Button } from "@ui/components/button";
import { useState } from "react";

export const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`absolute left-[calc(50%-450px)] top-0 z-40 hidden transform md:block`}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={onClick}
        className="h-16 w-16 rounded-full bg-[#F2F6FF] !p-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ArrowBackIcon color={isHovered ? "#062360" : "#9ba7bf"} />
      </Button>
    </div>
  );
};

export const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`absolute right-[calc(50%-450px)] top-0 z-40 hidden transform md:block`}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={onClick}
        className="h-16 w-16 rounded-full bg-[#F2F6FF] !p-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ArrowBackIcon
          className="rotate-180 transform"
          color={isHovered ? "#062360" : "#9ba7bf"}
        />
      </Button>
    </div>
  );
};
