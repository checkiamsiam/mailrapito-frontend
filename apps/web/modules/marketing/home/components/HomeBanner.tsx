/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-const */
"use client";

import SecondaryButton from "@shared/components/Button/SecondaryButton";
import TsParticles from "@shared/components/TsParticle/TsParticle";
import DeleteIcon from "@shared/icons/DeleteIcon";
import LoadingIcon from "@shared/icons/LoadingIcon";
import RefreshIcon from "@shared/icons/RefreshIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Icon } from "@ui/components/icon";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useEmailToken, useMessages } from "../../../../hooks/useEmails";
import type { IMessage } from "../../../../interface/commonInterface";
import { deleteEmail } from "../../../../services/services";
import BannerTable2 from "./BannerTable2";
import CreateEmailModal from "./CreateEmailModal";

export default function HomeBanner() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [copy, setCopy] = useState(false);
  const router = useRouter();
  const email = getCookie("email") ?? "";

  // ----------- Data Fetching ----------
  const { data: emailToken, refetch: refetchEmailToken } = useEmailToken({
    enabled: email ? false : true,
  });
  const {
    data: messages,
    isFetching: messageLoading,
    refetch: refetchMessages,
  } = useMessages({ email });

  const { mutate: deleteAPI, isPending: deleteLoading } = useMutation({
    mutationKey: ["deleteEmail"],
    mutationFn: deleteEmail,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleCopy = () => {
    setCopy(true);
    console.log(email);
    void navigator.clipboard.writeText(messages?.data?.mailbox as string);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  // -------------- Socket IO ------------
  useEffect(() => {
    let socket;
    socket = io("https://web.mailrapido.com/", {
      forceNew: true,
      secure: true,
    });

    function getCookie(cookieName) {
      const cookie = {};
      document.cookie.split(";").forEach(function (el) {
        const [key, value] = el.split("=");
        cookie[key.trim()] = value;
      });
      return cookie[cookieName];
    }

    function joinSocketRoom(room) {
      const message = { room: room };
      socket.emit("joinRoom", message);
    }

    function leaveSocketRoom(room) {
      const message = { room: room };
      socket.emit("leaveRoom", message);
    }

    const room = getCookie("email");

    joinSocketRoom(room);

    socket.on("check", async function (data) {
      // console.log(JSON.parse(data));
      // var data = JSON.parse(data);
      // const messagesData = [...messages.messages];
      // messagesData?.unshift(data);
      // setMessages((prev) => ({ ...prev, messages: messagesData }));
      // // here append your own message structure on the page user previous d variable info

      await refetchMessages();
    });
    return () => {
      socket.off("check");
    };
  }, [messages, refetchMessages]);

  // -------------- Fake Data ------------
  const fakeMessages: IMessage[] = [
    {
      _id: "1asdfasd",
      is_seen: true,
      is_favorite: false,
      from: "John Doe",
      from_email: "john@example.com",
      subject: "Meeting Reminder dasff adsf asdf asdf asdf asdf asdf asdfasd fasdf asdf df asdf df adf dsf d adf asdf asdf sadf asdfsad fasdf ",
      content: "Don't forget about the meeting tomorrow at 10 AM. asdf asdf asdf sadf ",
      receivedAt: new Date(),
      attachments: [],
    },
    {
      _id: "2asdfasd",
      is_seen: false,
      is_favorite: true,
      from: "Alice Smith",
      from_email: "alice@example.com",
      subject: "Project Update",
      content: "Attached is the latest progress report.",
      receivedAt: new Date(),
      attachments: [{ filename: "progress_report.pdf", size: "1.5MB" }],
    },
    // Add more messages as needed
    {
      _id: "3klklkllkk",
      is_seen: true,
      is_favorite: true,
      from: "Bob Johnson",
      from_email: "bob@example.com",
      subject: "Important Announcement",
      content: "Please review the attached document.",
      receivedAt: new Date(),
      attachments: [{ filename: "announcement.docx", size: "800KB" }],
    },
    {
      _id: "4aghgsdf",
      is_seen: false,
      is_favorite: false,
      from: "Sarah Lee",
      from_email: "sarah@example.com",
      subject: "Weekly Newsletter",
      content: "Check out the latest news and updates.",
      receivedAt: new Date(),
      attachments: [],
    },
    {
      _id: "5hgdgsdd",
      is_seen: true,
      is_favorite: false,
      from: "Michael Brown",
      from_email: "michael@example.com",
      subject: "Upcoming Event",
      content: "Join us for the event this weekend.",
      receivedAt: new Date(),
      attachments: [{ filename: "event_details.pdf", size: "2MB" }],
    },
    {
      _id: "6asdeerer",
      is_seen: true,
      is_favorite: true,
      from: "Emily Wang",
      from_email: "emily@example.com",
      subject: "Vacation Request",
      content: "Please approve my vacation request for next month.",
      receivedAt: new Date(),
      attachments: [],
    },
    {
      _id: "7eterere",
      is_seen: false,
      is_favorite: false,
      from: "David Kim",
      from_email: "david@example.com",
      subject: "Meeting Agenda",
      content: "Here's the agenda for tomorrow's meeting.",
      receivedAt: new Date(),
      attachments: [],
    },
    {
      _id: "8nfghdger",
      is_seen: true,
      is_favorite: false,
      from: "Jennifer Lopez",
      from_email: "jennifer@example.com",
      subject: "Task Assignment",
      content: "Assigning tasks for the upcoming project.",
      receivedAt: new Date(),
      attachments: [{ filename: "task_list.xlsx", size: "500KB" }],
    },
    {
      _id: "9adaeregsaer",
      is_seen: false,
      is_favorite: true,
      from: "Kevin Garcia",
      from_email: "kevin@example.com",
      subject: "Feedback Request",
      content: "Please provide feedback on the latest proposal.",
      receivedAt: new Date(),
      attachments: [],
    },
    {
      _id: "10aeterasdfadsfwera",
      is_seen: true,
      is_favorite: true,
      from: "Emma Thompson",
      from_email: "emma@example.com",
      subject: "Holiday Greetings",
      content: "Wishing you a happy holiday season!",
      receivedAt: new Date(),
      attachments: [],
    },
  ];

  return (
    <div>
      <div className="before:bg-primary-gradient relative h-full pb-[365px] before:absolute before:h-full before:w-full">
        <TsParticles />

        <div
          className="container relative md:py-[82px] py-[42px] text-center text-white"
          data-aos="fade-up"
        >
          <h2 className="text-xl font-bold capitalize md:text-5xl">
            {t("banner.title")}
          </h2>
          <p className="text-md mx-auto mt-6 max-w-2xl font-medium md:text-xl">
            {t("banner.subtitle")}
          </p>
        </div>
      </div>

      <section className="px-2">
        <div
          className="relative z-10 mx-auto mt-[-346px] max-w-[874px] rounded-lg bg-white shadow-xl"
          data-aos="fade-up"
        >
          <div>
            <div className="absolute left-0 top-8 z-0 hidden md:block">
              <Image
                src={"/images/banner/banner-top-shape.svg"}
                className="mail-shape"
                alt="Mail Shape"
                width={296}
                height={271}
                priority
              />
            </div>
            {/* Email Top */}
            <div className="relative flex flex-col items-center pb-6 pt-10">
              <div className="bg-blue-600 rounded-md mb-4 text-center">
                <p className="text-xs	py-1 text-center text-white min-w-[18rem] md:w-[23rem]" onClick={handleCopy} aria-hidden="true">
                  <span className="pl-6">{"Your Temporary Email Address"}</span>
                  <span className="pr-2 pl-0 px-4" style={{float: 'right'}} >
                    {!copy ? (
                      <>
                        <Icon.copy size={16} />
                      </>
                    ) : (
                      `Copied`
                    )}
                  </span>
                </p>
                <div className="bg-primary-dark flex items-center gap-2 rounded-md p-2 text-white">
                  <p className="p-2 w-full text-sm font-semibold md:w-80 md:text-base">
                    {messageLoading ? "Loading..." : messages?.data?.mailbox}
                  </p>

                  {/* <button
                    type="button"
                    className="bg-secondary flex items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-semibold sm:py-2 md:px-4 md:text-base"
                    onClick={handleCopy}
                  >
                    {!copy ? (
                      <>
                        {"Copy"} <Icon.copy size={20} />
                      </>
                    ) : (
                      `Copied`
                    )}
                  </button> */}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SecondaryButton
                  className="px-2 md:px-6"
                  onClick={() => deleteAPI()}
                >
                  {messageLoading || deleteLoading ? (
                    <LoadingIcon />
                  ) : (
                    <DeleteIcon size={16} />
                  )}
                  {"Delete"}
                </SecondaryButton>

                <SecondaryButton
                  className="px-2 md:px-6"
                  onClick={() => refetchMessages()}
                >
                  {messageLoading ? <LoadingIcon /> : <RefreshIcon size={16} />}
                  {"Refresh"}
                </SecondaryButton>
                <CreateEmailModal refetchMessages={refetchMessages} />

                {/* <SecondaryButton className="px-2 md:px-6">
                  <PenIcon size={16} />
                  {"Create"}
                </SecondaryButton> */}
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="relative">
                  <Image
                    src={"/images/banner/mail-icon.svg"}
                    alt="Mail Icon"
                    width={41}
                    height={40}
                  />
                  <div className="bg-secondary absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                    <span className="text-white">
                      {messages?.data?.messages?.length}
                    </span>
                  </div>
                </div>
                <p className="text-primary text-lg font-medium">
                  {"You have"} {messages?.data?.messages?.length}{" "}
                  {"new messages"}
                </p>
              </div>
            </div>

            {/* Message List Table */}

            <BannerTable2
              // messages={fakeMessages}
              messages={messages?.data?.messages ?? []}
              refetchMessages={refetchMessages}
            />
            {/* <BannerTable /> */}
          </div>
        </div>
      </section>
    </div>
  );
}
