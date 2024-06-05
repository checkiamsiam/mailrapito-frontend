"use client";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import CloseIcon from "@shared/icons/CloseIcon";
import EditIcon from "@shared/icons/EditIcon";
import { cn } from "@ui/lib";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});

const ProfileModal = ({
  open,
  setOpen,
  handleOpenForwardModal,
  handleOpenCustomModal,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenForwardModal: Dispatch<SetStateAction<boolean>>;
  handleOpenCustomModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const handleOpenFroward = () => {
    setOpen(false);
    handleOpenForwardModal(true);
  };
  const handleOpenCustom = () => {
    setOpen(false);
    handleOpenCustomModal(true);
  };
  const remainJSX = (
    <p className="text-[#56565B] max-md:text-[14px]">
      Remain 20 days before expire.{" "}
      <span className="text-primary-dark cursor-pointer underline">
        Extend your subscription
      </span>{" "}
      to keep it active.
    </p>
  );
  return (
    <div>
      <Modal
        role="dialog"
        center
        open={open}
        blockScroll={false}
        onClose={() => setOpen(false)}
        closeIcon={
          <div>
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#DEE2E6]">
              <CloseIcon />
            </div>
          </div>
        }
        closeOnOverlayClick={false}
        onOverlayClick={() => setOpen(false)}
        classNames={{
          modal:
            "z-[100]  m-0  my-auto  p-10 lg:min-w-[1002px] mx-auto rounded-3xl",
        }}
      >
        <div>
          <h5 className="mb-5 text-[28px] font-semibold">My Profile</h5>
          <div className="mb-5 flex items-center gap-6">
            <div className="relative h-14 w-14 sm:h-20 sm:w-20 ">
              <Image
                src="/images/avatar/avatar3.png"
                alt="close"
                layout="fill"
              />
            </div>
            <div>
              <div className="flex  gap-3">
                <p className="text-[18px] font-semibold sm:text-[24px]">
                  John Smith
                </p>
                <button>
                  <EditIcon />
                </button>
              </div>
              <p className="text-[12px] text-[#7C7D81] sm:text-[20px]">
                johnsmith22@gmail.com
              </p>
              <div className="flex gap-3 ">
                <p className="mt-1 text-[12px] font-semibold sm:text-[20px]">
                  ***********
                </p>
                <button>
                  <EditIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="order-2 col-span-12 md:order-1">
              <div className="rounded-3xl bg-[#F8F9FA] p-6">
                <div className="flex justify-between ">
                  <p className="text-[24px] font-semibold">Plan</p>
                  <div className="flex">
                    <button className="bg-primary-dark  w-20 rounded-s-md px-3 py-2 text-center text-white md:w-24 hover:bg-black transition-all duration-300">
                      Premium
                    </button>
                    <button className=" w-20 rounded-e-md border-b-2  border-e-2 border-t-2 border-[#C4C5CA] px-3 py-2 text-center text-[#C4C5CA] md:w-24">
                      Privet
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-12   max-md:mb-2">
                  <div className="col-span-3">
                    <Image
                      src="/images/icons/paid-envolop.svg"
                      alt="close"
                      width={142}
                      height={142}
                    />
                  </div>
                  <div className="col-span-9">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[14px] text-[#56565B] sm:text-[18px]">
                          Active Until
                        </p>
                        <p className=" font-semibold sm:text-[26px]">
                          27 June, 2024
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        {/* progress will go there */}
                        <CircularProgressbarWithChildren
                          value={66}
                          className="h-14 w-14 sm:h-20 sm:w-20"
                          styles={{
                            path: { stroke: `#323FD4` },
                          }}
                        >
                          <p className="text-[14px] font-semibold sm:text-[18px]">
                            26
                          </p>
                          <p className="text-[8px] font-semibold sm:text-[10px]">
                            Day Left
                          </p>
                        </CircularProgressbarWithChildren>
                      </div>
                    </div>
                    <div className="max-md:hidden">{remainJSX}</div>
                  </div>
                  <div className="col-span-12 md:hidden">{remainJSX}</div>
                </div>
              </div>
            </div>
            <div className="order-1 col-span-12 md:order-2 ">
              <div className="rounded-3xl bg-[#F8F9FA] p-6">
                <div className="flex justify-between ">
                  <p className="text-[24px] font-semibold">Plan</p>
                  <p className="text-[24px] font-bold">Free</p>
                </div>
                <div className="mt-4 grid grid-cols-12  max-md:mb-2">
                  <div className="col-span-12 md:col-span-4">
                    <Image
                      src="/images/icons/free-plan.svg"
                      alt="close"
                      width={224.14}
                      height={141}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <div>
                      <div>
                        <p className=" text-[18px] font-semibold max-md:mt-5 md:text-[24px]">
                          Upgrade your plan to unlock powerfull features
                        </p>
                        <p className="text-[14px] text-[#56565B] sm:text-[18px]">
                          We applied 20% discount to your account on yearly
                          subscription
                        </p>
                      </div>
                      <div className="mt-4 flex gap-6">
                        <button className="hover:bg-primary-dark rounded-lg border border-black px-6 py-4 text-2xl font-semibold transition-all duration-300 hover:text-white">
                          Premium
                        </button>
                        <div className="flex">
                          <button
                            className={cn(
                              "hover:bg-primary-dark  text-primary-gradient gradient-border  rounded-md  px-6 py-4 text-2xl font-semibold  transition-all duration-300",
                              "rounded-md",
                            )}
                          >
                            Private
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-3 col-span-12 md:col-span-6 lg:col-span-3">
              <button
                onClick={handleOpenCustom}
                className={`relative h-full w-full rounded-3xl border bg-[#F8F9FA] p-6 ${hovered1 && "gradient-border"} `}
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
              >
                <div>
                  <div className="mb-4">
                    <Image
                      src="/images/icons/Domain.svg"
                      alt="close"
                      width={96.4}
                      height={90}
                    />
                  </div>
                  <div>
                    <p className="text-left text-[24px]">Custom Domains</p>
                    <p className="text-left text-[14px] text-[#56565B]">
                      Add your domains and generate emails with them
                    </p>
                  </div>
                </div>
                <div>
                  <PrimaryButton className="absolute right-2 top-2 px-3 py-2 text-[12px] ">
                    New
                  </PrimaryButton>
                </div>
              </button>
            </div>
            <div className="order-4 col-span-12 md:col-span-6 lg:col-span-3">
              <button
                onClick={handleOpenFroward}
                className={`relative h-full w-full rounded-3xl border bg-[#F8F9FA] p-6 ${hovered2 && "gradient-border"} `}
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
              >
                <div>
                  <div className="mb-4">
                    <Image
                      src="/images/icons/forward-mail.svg"
                      alt="close"
                      width={90}
                      height={90}
                    />
                  </div>
                  <div>
                    <p className="text-left text-[24px]">Forwarding</p>
                    <p className="text-left text-[14px] text-[#56565B]">
                      Drive all messages between different emails
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="order-5 col-span-12 md:col-span-6 lg:col-span-3">
              <button
                className={`relative h-full w-full rounded-3xl border bg-[#F8F9FA] p-6 ${hovered3 && "gradient-border"} `}
                onMouseEnter={() => setHovered3(true)}
                onMouseLeave={() => setHovered3(false)}
              >
                <div>
                  <div className="mb-4">
                    <Image
                      src="/images/icons/Domain.svg"
                      alt="close"
                      width={94.7}
                      height={90}
                    />
                  </div>
                  <div>
                    <p className="text-left text-[24px]">Manage Team</p>
                    <p className="text-left text-[14px] text-[#56565B]">
                      Manage members to streamline your team&apos;s workflow.
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="order-6 col-span-12 md:col-span-6 lg:col-span-3">
              <button
                className={`relative h-full w-full rounded-3xl border bg-[#F8F9FA] p-6 ${hovered4 && "gradient-border"} `}
                onMouseEnter={() => setHovered4(true)}
                onMouseLeave={() => setHovered4(false)}
              >
                <div>
                  <div className="mb-4">
                    <Image
                      src="/images/icons/api-keys.svg"
                      alt="close"
                      width={90}
                      height={90}
                    />
                  </div>
                  <div>
                    <p className="text-left text-[24px]">API Keys</p>
                    <p className="text-left text-[14px] text-[#56565B]">
                      Generate API keys to use on your project, you can also
                      check the{" "}
                      <span className="font-semibold underline">
                        API Documentation
                      </span>
                      .
                    </p>
                  </div>
                </div>
                <div>
                  <PrimaryButton className="absolute right-2 top-2 px-3 py-2 text-[12px] ">
                    New
                  </PrimaryButton>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
