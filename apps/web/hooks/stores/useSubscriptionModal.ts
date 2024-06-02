import { create  } from "zustand";

interface ModalStore {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const useSubscriptionModalStore = create<ModalStore>((set) => ({
  open: false,
  setOpen: (data: boolean) => set({ open: data }),
}));

export default useSubscriptionModalStore;
