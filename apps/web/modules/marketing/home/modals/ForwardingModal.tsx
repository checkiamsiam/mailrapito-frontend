"use client";
import CloseIcon from "@shared/icons/CloseIcon";
import DeleteIcon from "@shared/icons/DeleteIcon";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});

const ForwardingModal = () => {
  const [open, setOpen] = useState(false);
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
            "z-[100]  m-0  my-auto  p-10 xl:min-w-[1107px] md:min-w-[90vw] mx-auto rounded-3xl",
        }}
      >
        <div>
          <h5 className="mb-2 text-[28px] font-semibold">Forwarding</h5>
          <p className="text-[#868E96] max-sm:hidden">
            Forwarding service redirects incoming emails to your email address,
            making it easier to stay organized and not miss important messages.
          </p>
          <p className="text-[#868E96] sm:hidden">
            Input your real email and choose duration
          </p>
          <div className="mt-6 overflow-hidden rounded-md border  ">
            <div className="grid grid-cols-12 ">
              {/* header part */}
              <div className="col-span-4">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[20px] text-[#7C7D81]">
                  From
                </p>
              </div>
              <div className="col-span-4">
                <p className="bg-[#F8F9FA] px-7 py-2  text-[20px] text-[#7C7D81]">
                  Redirected to
                </p>
              </div>
              <div className="col-span-3">
                <p className="bg-[#F8F9FA] px-7 py-2 text-[20px] text-[#7C7D81] ">
                  Expire in
                </p>
              </div>
              <div className="col-span-1 bg-[#F8F9FA]" />
              {/* items loop  */}
              {[1].map((item) => (
                <>
                  <div className="col-span-4 border-b ">
                    <p className=" px-7 py-4 text-[20px] ">
                      randomjack123@domain1.com
                    </p>
                  </div>
                  <div className="col-span-4 border-b">
                    <p className=" px-7 py-4 text-[20px] ">
                      randomjack123@gmail.com
                    </p>
                  </div>
                  <div className="col-span-3 border-b">
                    <p className=" px-7 py-4 text-[20px] font-semibold">
                      3 month
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center border-b">
                    <button className="flex items-center justify-center">
                      <DeleteIcon width={20} height={20} color="#7C7D81" />
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div>
              <div className="flex justify-between">
                <p className="text-[#7C7D81]">Email From</p>
                <div className="flex gap-2">
                  <button className="bg-primary rounded-sm px-2 py-1 text-[12px] text-white">
                    Random
                  </button>
                  <button className="rounded-sm bg-[#F1F3F5] px-2 py-1 text-[12px] text-[#868E96]">
                    Current
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForwardingModal;
