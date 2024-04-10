/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "@ui/components/button";
import { Checkbox } from "@ui/components/checkbox";
import Image from "next/image";
import { useState } from "react";
import type { IMessage } from "../../../../interface/commonInterface";
import TableRow from "./TableRow";

interface IProps {
  messages?: IMessage[];
  refetchMessages?: () => void;
}

const BannerTable = ({ messages, refetchMessages }: IProps) => {
  const [selected, setSelected] = useState(false);
  const [openItem, setOpenItem] = useState<string | false>(false);

  return (
    <>
      <div className="table-responsive w-full">
        <table className="table w-full">
          <thead className="bg-primary-dark text-white">
            <tr>
              <th className="py-4 pl-3 text-left text-base md:py-6 md:text-2xl">
                From
              </th>
              <th className="py-4 text-left text-base md:py-6 md:text-2xl">
                Subject
              </th>
              <th className="py-4 pr-3 text-end text-base md:py-6 md:text-2xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* First Table Data which contains search & refresh icon */}
            <tr className="hover:bg-primary/10 border-b duration-200">
              <td>
                <div className="flex items-center py-2">
                  <div
                    className="grid place-items-center rounded-full px-2"
                    onClick={() => setSelected(!selected)}
                  >
                    <Checkbox
                      style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
                    />
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
              </td>
              <td></td>
              <td className="text-end">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Image
                    src={"/images/banner/search.svg"}
                    alt="Search Icon"
                    width={24}
                    height={24}
                  />
                </Button>
              </td>
            </tr>
            {/* Other Data */}
            {messages?.map((item: IMessage, i: number) => (
              <TableRow
                key={i}
                message={item}
                refetchMessages={refetchMessages as any}
                openItem={openItem}
                setOpenItem={setOpenItem}
              />
            ))}
          </tbody>
        </table>
        {!messages?.length && (
          <div className="mx-auto w-full py-12 text-center">
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

export default BannerTable;
