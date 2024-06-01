"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Modal = dynamic(() => import("react-responsive-modal"), {
  ssr: false,
});

const ForwardingModal = () => {
  const [open, setOpen] = useState(true);
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
              <Image
                src="/images/icons/close-icon.svg"
                alt="close"
                width={10.61}
                height={10.61}
              />
            </div>
          </div>
        }
        closeOnOverlayClick={false}
        onOverlayClick={() => setOpen(false)}
        classNames={{
          modal:
            "z-[100]  m-0  my-auto  p-10 xl:min-w-[1107px] mx-auto rounded-3xl",
        }}
      >
        <div>
          <h5 className="mb-2 text-[28px] font-semibold">Forwarding</h5>
          <p className="text-[#868E96] max-sm:hidden">Forwarding service redirects incoming emails to your email address, making it easier to stay organized and not miss important messages.</p>
          <p className="text-[#868E96] sm:hidden">Input your real email and choose duration</p>
        </div>
      </Modal>
    </div>
  );
};

export default ForwardingModal;
