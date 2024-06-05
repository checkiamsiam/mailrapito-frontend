"use client";

import PrimaryButton from "@shared/components/Button/PrimaryButton";
import LoadingIcon from "@shared/icons/LoadingIcon";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import { useState } from "react";
import { useEmailDomain } from "../../../../hooks/useEmails";
import { createNewEmail } from "../../../../services/services";

const CreateEmailModal = ({ refetchMessages, children }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<{ name: string; domain: string }>({
    name: "",
    domain: "",
  });

  // Fetch email domains
  const { data: domainData, isLoading: domainLoading } = useEmailDomain();

  // Create email api
  const { mutate, isPending: createLoading } = useMutation({
    mutationKey: ["createEmail"],
    mutationFn: async () => await createNewEmail(formData),
    onSuccess: () => {
      refetchMessages();
      // refetchEmailToken();
      setOpen(false);
      setError("");
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Something went wrong");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <SecondaryButton className="px-2 md:px-6">
          <PenIcon size={16} />
          {"Create"}
        </SecondaryButton> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Email</DialogTitle>
        </DialogHeader>
        <div className="mt-1">
          <p className="text-sm">
            To change or recover the email address, please enter the desired
            E-mail address prefix and choose a domain from the list bellow.
          </p>

          <div className="mt-4">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              className="border-primary block w-full rounded-md border px-2 py-3 outline-none"
              placeholder="Enter an email prefix"
              autoComplete="off"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label htmlFor="name" className="font-semibold">
              Domain
            </label>
            <select
              multiple
              className="border-primary block w-full rounded-md border px-2 py-3 outline-none overflow-y-auto"
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
            >
              <option value="" disabled>
                {domainLoading ? "Loading..." : "Select Domain"}
              </option>
              {domainData?.data?.map((domain) => (
                <option key={domain.domain} value={domain.domain}>
                  {domain.domain}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="mt-2 text-base font-semibold text-red-500">{error}</p>
          )}

          <PrimaryButton
            disabled={!formData.name || !formData.domain || createLoading}
            className="mt-6 w-full py-6"
            onClick={() => mutate()}
          >
            {createLoading ? <LoadingIcon color="#ffffff" /> : "Create"}
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmailModal;
