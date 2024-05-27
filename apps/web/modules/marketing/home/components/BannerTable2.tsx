/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "@ui/components/button";
import { Checkbox } from "@ui/components/checkbox";
import Image from "next/image";
import { useState } from "react";
import type { IMessage } from "../../../../interface/commonInterface";
import TableRow2 from "./TableRow2";

interface IProps {
  messages?: IMessage[];
  refetchMessages?: () => void;
}

const BannerTable2 = ({ messages, refetchMessages }: IProps) => {
  const [selected, setSelected] = useState(false);
  const [openItem, setOpenItem] = useState<string | false>(false);

  return (
    <>
      <div className="table-responsive w-full">
        <div className="grid w-full grid-cols-12">
          {/* <div className="bg-primary-dark col-span-12 text-white">
            <div className="grid grid-cols-12 font-semibold">
              <p className="col-span-4 py-4 pl-3 text-left text-base md:py-6 md:text-2xl">
                From
              </p>
              <p className="col-span-5 py-4 text-left text-base md:py-6 md:text-2xl">
                Subject
              </p>
              <p className="col-span-3 py-4 pr-3 text-end text-base md:py-6 md:text-2xl">
                Action
              </p>
            </div>
          </div> */}

          {/* First Table Data which contains search & refresh icon */}
          <div className="hover:bg-primary/10 col-span-12 flex items-center justify-between border-b duration-200">
            <div className="flex items-center py-2">
              <div
                className="grid place-items-center rounded-full px-2"
                onClick={() => setSelected(!selected)}
              >
                <Checkbox style={{ boxShadow: "0px 1px 2px 0px #1018280D" }} />
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={refetchMessages}
              >
                <Image
                  src={"/images/banner/refresh.svg"}
                  alt="Refresh Icon"
                  width={14}
                  height={14}
                />
              </Button>

              <Button size="icon" variant="ghost" className="rounded-full">
                <Image
                  src={"/images/banner/dots.svg"}
                  alt="Dots Icon"
                  width={16}
                  height={16}
                />
              </Button>
            </div>

            <div className="text-end">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Image
                  src={"/images/banner/search.svg"}
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
          {/* Other Data */}
          {messages?.map((item: IMessage, i: number) => (
            <TableRow2
              key={i}
              message={item}
              refetchMessages={refetchMessages as any}
              openItem={openItem}
              setOpenItem={setOpenItem}
            />
          ))}
        </div>
        {!messages?.length && (
          <div className="col-span-12 mx-auto w-full py-12 text-center">
            <Image
              src={"/images/0_emails.svg"}
              alt="no Email Image"
              width={437}
              height={303}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </>
  );
};

// --------- Table Row -----------

export default BannerTable2;
