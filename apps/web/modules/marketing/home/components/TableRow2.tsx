/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useWindowWidth } from "@react-hook/window-size";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import { Button } from "@ui/components/button";
import { Checkbox } from "@ui/components/checkbox";
import { Icon } from "@ui/components/icon";
import { saveAs } from "file-saver";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { IMessage } from "../../../../interface/commonInterface";
import {
  addToFavorites,
  deleteMessage,
  downloadDocument,
  readMessage,
} from "../../../../services/services";

const TableRow2 = ({
  message,
  refetchMessages,
  openItem,
  setOpenItem,
}: {
  message: IMessage;
  refetchMessages: () => void;
  openItem: string | false;
  setOpenItem: (index: string | false) => void;
}) => {
  const t = useTranslations();
  const windowWidth = useWindowWidth();

  const handleClick = (id: string) => {
    if (openItem === id) {
      setOpenItem(false);
    } else {
      setOpenItem(id);
    }
  };

  const handleDownloadMessage = (content) => {
    try {
      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "mail.html");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadAttachments = async (attachment) => {
    const extractFilename =
      attachment.url.split("/")[attachment.url.split("/").length - 1];
    try {
      await downloadDocument(extractFilename);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={`group col-span-12 ${openItem === message?._id ? "bg-primary/10" : ""} hover:bg-primary/10 relative border-b duration-200`}
        onClick={async () => {
          if (!message?.is_seen) {
            await readMessage(message?._id);
            refetchMessages();
          }
        }}
      >
        <div className="grid grid-cols-12 items-center">
          <button
            className="absolute left-0 top-0 z-0 block h-full w-full"
            onClick={() => handleClick(message?._id)}
          />

          <div
            className={`py-6 ${openItem === message?._id ? "col-span-9" : "col-span-3 sm:col-span-4"}`}
          >
            {/* Left Actions & Info */}
            <div className="flex w-full items-center pl-2 md:gap-2">
              <div className="z-10 grid place-items-center rounded-full">
                <Checkbox style={{ boxShadow: "0px 1px 2px 0px #1018280D" }} />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="z-10 rounded-full"
                onClick={async () => {
                  await addToFavorites(message?._id);
                  refetchMessages();
                }}
              >
                {message.is_favorite ? (
                  <Image
                    src={"/images/banner/star.svg"}
                    alt="Star Icon"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src={"/images/banner/false-star.svg"}
                    alt="False Star Icon"
                    width={16}
                    height={16}
                  />
                )}
              </Button>

              {/* From Information */}
              <div className="flex items-center gap-2">
                <Image
                  src={"/images/avatar.png"}
                  alt="Avatar Icon"
                  width={30}
                  height={30}
                  className="rounded-full border border-white"
                />
                <div className="flex items-center">
                  <h6
                    className={`hidden text-xs font-semibold sm:block sm:min-w-20 md:text-sm`}
                  >
                    {message?.from}
                  </h6>
                  {openItem === message?._id && (
                    <span className="text-primary text-xs font-semibold sm:text-base">
                      {"<"}
                      {message?.from_email}
                      {">"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Email Subject & Body */}
          {openItem !== message?._id && (
            <div className="col-span-6 sm:col-span-5">
              <div>
                <h6 className="text-title max-h-4 overflow-hidden text-[10px] font-semibold md:text-xs">
                  {windowWidth > 768
                    ? message?.subject?.length > 50
                      ? message?.subject?.slice(0, 50) + "..."
                      : message?.subject
                    : message?.subject?.length > 25
                      ? message?.subject?.slice(0, 25) + "..."
                      : message?.subject}
                </h6>
                <p
                  className="max-h-4 max-w-40 overflow-hidden text-xs text-[#303133] md:max-w-80"
                  dangerouslySetInnerHTML={{
                    __html:
                      windowWidth > 768
                        ? message?.subject?.length > 50
                          ? message?.subject?.substring(0, 50) + "..."
                          : message?.subject
                        : message?.subject?.length > 25
                          ? message?.subject?.substring(0, 25) + "..."
                          : message?.subject,
                  }}
                />
              </div>
            </div>
          )}

          {/* Right Side */}
          <div className="col-span-3">
            <div>
              <div className="flex items-center justify-end gap-1 pr-1 md:pr-4">
                {!message?.is_seen && (
                  <span className="bg-primary h-4 w-4 rounded-full"></span>
                )}
                <span className="text-[8px] text-[#636E72] sm:text-xs">
                  {openItem === message?._id
                    ? moment(message?.receivedAt).format("llll")
                    : moment(message?.receivedAt).fromNow()}
                </span>
                {message?.attachments?.length ? (
                  <Image
                    src={"/images/banner/file.svg"}
                    alt="File Icon"
                    width={16}
                    height={16}
                  />
                ) : null}
              </div>
              <div
                className={`absolute right-2 top-1/2 hidden -translate-y-1/2 items-center rounded-full border border-[#DFE6E9] bg-white transition-all duration-300 md:right-6 group-hover:md:flex`}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => handleDownloadMessage(message?.content)}
                >
                  <Image
                    src={"/images/banner/download.svg"}
                    alt="Download Icon"
                    width={16}
                    height={16}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={async () => {
                    await deleteMessage(message?._id);
                    refetchMessages();
                  }}
                >
                  <Image
                    src={"/images/banner/trash.svg"}
                    alt="Trash Icon"
                    width={16}
                    height={16}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {openItem === message?._id ? ( */}
      <div key={message?._id} className={`col-span-12 !border-none bg-blue-50`}>
        <div className="overflow-hidden border-none">
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openItem === message?._id
                ? "active min-h-[220px]"
                : "h-0 min-h-0 translate-y-[-50px] opacity-0"
            }`}
          >
            <div className="p-4 font-medium text-[#303133] md:p-6">
              <div className="border-b-2 pb-4">
                <div className="text-title text-base font-medium">Subject</div>
                <div>{message?.subject}</div>
              </div>
              <div className="py-4">
                <div className="text-title text-base font-medium">Body</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: message?.content,
                  }}
                />
                <div style={{ marginTop: "30px" }}>
                  {message?.attachments?.map((item, i) => (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      key={i}
                      onClick={() => handleDownloadAttachments(item)}
                    >
                      <Image
                        src={"/images/banner/file.svg"}
                        alt="File Icon"
                        width={16}
                        height={16}
                      />
                      {item?.file}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleClick(message?._id)}
                  className="border-primary"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="flex gap-1 border-red-500 text-red-500"
                  onClick={async () => {
                    await deleteMessage(message?._id);
                    refetchMessages();
                  }}
                >
                  <Icon.delete size={16} color="#FF0000" />
                  <span>Delete</span>
                </Button>

                <PrimaryButton
                  onClick={() => handleDownloadMessage(message?.content)}
                >
                  Download
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
};

export default TableRow2;
