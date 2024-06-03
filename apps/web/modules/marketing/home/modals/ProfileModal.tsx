"use client";
import PrimaryButton from "@shared/components/Button/PrimaryButton";
import CloseIcon from "@shared/icons/CloseIcon";
import EditIcon from "@shared/icons/EditIcon";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});

const ProfileModal = ({
  open,
  setOpen,
  handleOpenForwardModal,
  handleOpenCustomModal
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenForwardModal: Dispatch<SetStateAction<boolean>>;
  handleOpenCustomModal: Dispatch<SetStateAction<boolean>>;
}) => {
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
            "z-[100]  m-0  my-auto  p-10 lg:min-w-[900px] mx-auto rounded-3xl",
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
            <div className="col-span-12 ">
              <div className="bg-primary-light-gradient rounded-3xl p-6">
                <p className="text-[24px] font-semibold">Subscription</p>
                <div className="mt-4 grid grid-cols-12  max-md:mb-2">
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
            <div className="col-span-12 lg:col-span-4">
              <button onClick={handleOpenCustom} className="gradient-border relative rounded-3xl border p-6 w-full">
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
                    <p className="text-[24px] ">Custom Domains</p>
                    <p className="text-[14px] text-[#56565B]">
                      Add your domains and generate emails with them
                    </p>
                  </div>
                </div>
                <div>
                  <PrimaryButton className="absolute right-5 top-5 text-[16px]">
                    New
                  </PrimaryButton>
                </div>
              </button>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <button
                onClick={handleOpenFroward}
                className="rounded-3xl border bg-[#FCFEFF] p-6 cursor-pointer w-full"
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
                    <p className="text-[24px] ">Forwarding</p>
                    <p className="text-[14px] text-[#56565B]">
                      Drive all messages between different emails
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <button className="rounded-3xl border bg-[#FCFEFF] p-6 w-full">
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
                    <p className="text-[24px] ">Manage Team</p>
                    <p className="text-[14px] text-[#56565B]">
                      Manage members to streamline your team&apos;s workflow.
                    </p>
                  </div>
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
