"use client";
import ArrowBackIcon2 from "@shared/icons/ArrowBackIcon2";
import CloseIcon from "@shared/icons/CloseIcon";
import DeleteIcon from "@shared/icons/DeleteIcon";
import PlusIconWithoutCircle from "@shared/icons/PlusWithoutCircle";
import QuestionCircleIcon from "@shared/icons/QuestionCircleIcon";
import RefreshIcon from "@shared/icons/RefreshIcon";
import SearchIcon from "@shared/icons/SearchIcon";
import { Input } from "@ui/components/input";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});

const CustomDomainModal = ({
  open,
  setOpen,
  handleProfileModal,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleBack = () => {
    setOpen(false);
    handleProfileModal(true);
  };
  return (
    <div>
      <Modal
        role="dialog"
        center
        open={open}
        blockScroll={false}
        onClose={() => setOpen(false)}
        showCloseIcon={false}
        closeOnOverlayClick={false}
        onOverlayClick={() => setOpen(false)}
        classNames={{
          modal:
            "z-[100]  m-0  my-auto  px-10 pb-10 pt-4 lg:min-w-[830px] mx-auto rounded-3xl",
        }}
      >
        <div>
          <div className="flex justify-between">
            <button onClick={handleBack}>
              <div className="flex items-center justify-center gap-1 rounded-md bg-[#DEE2E6] p-2">
                <ArrowBackIcon2 width={12} height={12} color="#56565B" />
                <span>Back</span>
              </div>
            </button>
            <button onClick={() => setOpen(false)}>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#DEE2E6]">
                <CloseIcon />
              </div>
            </button>
          </div>
          <div className="my-5 flex items-center justify-between">
            <h5 className="text-[28px] font-semibold">Custom Domains</h5>
            <button className="bg-primary-dark flex items-center justify-center gap-2 rounded-md px-[32px] py-[18px] text-white">
              <PlusIconWithoutCircle width={24} height={24} />
              <span>ADD</span>
              <span className="max-md:hidden">DOMAIN</span>
            </button>
          </div>
          <div className="grid grid-cols-12 place-content-center gap-1 max-md:gap-5">
            <div className=" col-span-12 rounded-lg bg-[#F8F9FA] px-4 py-2 md:col-span-8">
              <div className=" flex items-center justify-center py-2   ">
                <Input
                  type="text"
                  placeholder="Domain.com"
                  className="focus-visible::border-transparent w-full border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0 "
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="flex justify-center gap-3 max-md:mt-5">
                <button className="bg-primary-dark flex items-center justify-center gap-2 rounded-md px-[24px] py-[18px] text-white">
                  <PlusIconWithoutCircle width={24} height={24} />
                  <span>ADD</span>
                  <span className="md:hidden">DOMAIN</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md border  border-[#495057] px-[32px] py-[18px] text-[#495057]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-primary rounded-md bg-[#F5F7FF] px-6 py-4">
              If you don&apos;t have any domain, visit domain registrar website
              and buy a new domain. Then come back to this page.
            </p>
          </div>
          <div className="mt-5">
            <p className="text-primary rounded-md bg-[#F5F7FF] px-6 py-4">
              Log in to your domain name DNS manager for{" "}
              <span className="font-bold">domain.com</span>. And then add new
              DNS MX records with the data from the table below. If you Need
              help please read this article:{" "}
              <span className="cursor-pointer font-bold underline">
                How to Configure MX Record for Mailrapido.
              </span>
            </p>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border">
            <div className="grid grid-cols-7 md:grid-cols-12 ">
              {/* header part */}
              <div className="col-span-1 md:col-span-2">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[8px] text-[#7C7D81] md:text-[20px]">
                  Status
                </p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="bg-[#F8F9FA] px-7 py-2  text-[8px] text-[#7C7D81] md:text-[20px]">
                  Type
                </p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[8px] text-[#7C7D81] md:text-[20px] ">
                  Name
                </p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[8px] text-[#7C7D81] md:text-[20px] ">
                  Priority
                </p>
              </div>
              <div className="col-span-3 md:col-span-4">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[8px] text-[#7C7D81] md:text-[20px]">
                  Value
                </p>
              </div>
              {/* items loop  */}
              {[1, 2].map((item) => (
                <>
                  <div className="col-span-1 flex  items-center  justify-center py-4 md:col-span-2 md:px-7">
                    {item === 1 ? (
                      <div className="relative h-[22px] w-[25px] md:h-[33px] md:w-[41px]">
                        <Image
                          src="/images/icons/ErrorRadio.svg"
                          layout="fill"
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="relative h-[22px] w-[25px] md:h-[33px] md:w-[41px]">
                        <Image
                          src="/images/icons/SuccessRadio.svg"
                          layout="fill"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className=" px-8 py-4 text-[12px] md:px-7 md:text-[20px]">
                      MX
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className=" px-8 py-4 text-[12px] md:px-7 md:text-[20px]">
                      @
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className=" px-8 py-4 text-[12px] md:px-7 md:text-[20px]">
                      10
                    </p>
                  </div>
                  <div className="col-span-3 md:col-span-4 ">
                    <p className=" px-8 py-4 text-[12px] md:px-7 md:text-[20px]">
                      mx.mailrapido.com.
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <div className=" relative col-span-12 rounded-lg bg-[#F8F9FA] px-4 py-2 md:col-span-8">
              <div className=" ml-6 flex items-center justify-center  py-2 ">
                <Input
                  type="search"
                  placeholder="type domain to search"
                  className="focus-visible::border-transparent w-full border-none text-[16px] outline-none focus:outline-none focus-visible:ring-0 "
                />
              </div>
              <div className="absolute top-5">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="md:mt-5 overflow-hidden rounded-md md:border">
            <div className="grid grid-cols-12 max-md:hidden">
              {/* header part */}
              <div className="col-span-5 md:col-span-5">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[20px] text-[#7C7D81]">
                  Domain
                </p>
              </div>
              <div className="col-span-4 md:col-span-4">
                <p className="bg-[#F8F9FA] px-7 py-2  text-[20px] text-[#7C7D81]">
                  Status
                </p>
              </div>
              <div className="col-span-3 md:col-span-3">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[20px] text-[#7C7D81] ">
                  Action
                </p>
              </div>

              {/* items loop  */}
              {[1, 2].map((item) => (
                <>
                  <div  className="col-span-5 md:col-span-5">
                    <p className=" dm:text-[20px] px-7 py-4 ">
                      {item === 1 ? "domain.com" : "mylongdomain2024abc.com"}
                    </p>
                  </div>
                  <div className="col-span-4 md:col-span-4">
                    <div className=" px-7 py-4 ">
                      {item === 1 ? (
                        <span className="rounded-md bg-[#FFF5F5] px-3 py-2 text-[#E03131]">
                          Not configured
                        </span>
                      ) : (
                        <span className="rounded-md bg-[#EBFBEE] px-3 py-2 text-[#2F9E44]">
                          configured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center justify-center gap-2 px-7 py-4 md:col-span-3">
                    <button className="flex items-center justify-center">
                      <QuestionCircleIcon
                        width={24}
                        height={24}
                        color="#7C7D81"
                      />
                    </button>
                    <button className="flex items-center justify-center">
                      <RefreshIcon width={24} height={24} color="#7C7D81" />
                    </button>
                    <button className="flex items-center justify-center">
                      <DeleteIcon width={20} height={20} color="#7C7D81" />
                    </button>
                  </div>
                  {item === 1 && (
                    <div className="col-span-12 ">
                      <p className="bg-[#FFF5F5] px-7 py-4 text-[18px] text-[#E03131]">
                        Domain1.com isn&apos;t configured correctly. Please{" "}
                        <span className="cursor-pointer font-bold underline">
                          complete instruction.
                        </span>{" "}
                        And click to the &apos;Recheck Domain&apos; button.
                      </p>
                    </div>
                  )}
                </>
              ))}
            </div>
            <div className="md:hidden">
              {[1, 2].map((item , i) => (
                <div key={i} className="rounded-md bg-[#F8F9FA] p-4 mt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      {item === 1 ? (
                        <p className="rounded-md bg-[#FFF5F5] px-3 py-2 text-[#E03131]">
                          Not configured
                        </p>
                      ) : (
                        <p className="rounded-md bg-[#EBFBEE] px-3 py-2 text-[#2F9E44]">
                          configured
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center justify-center">
                        <QuestionCircleIcon
                          width={24}
                          height={24}
                          color="#7C7D81"
                        />
                      </button>
                      <button className="flex items-center justify-center">
                        <RefreshIcon width={24} height={24} color="#7C7D81" />
                      </button>
                      <button className="flex items-center justify-center">
                        <DeleteIcon width={20} height={20} color="#7C7D81" />
                      </button>
                    </div>
                  </div>
                  <p className=" text-[20px] py-4 ">
                    {item === 1 ? "domain.com" : "mylongdomain2024abc.com"}
                  </p>
                  {item === 1 && (
                    <div className="col-span-12 ">
                      <p className="bg-[#FFF5F5] px-7 py-4 text-[18px] text-[#E03131]">
                        Domain1.com isn&apos;t configured correctly. Please{" "}
                        <span className="cursor-pointer font-bold underline">
                          complete instruction.
                        </span>{" "}
                        And click to the &apos;Recheck Domain&apos; button.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomDomainModal;
