import { create } from "zustand";
import type { IEmail } from "../../interface/commonInterface";

interface ModalStore {
  selectedEmail: string;
  setSelectedEmail: (data: string) => void;
  generatedEmails: IEmail[];
  setGeneratedEmails: (data: IEmail[]) => void;
}

const useEmailHistoryStore = create<ModalStore>((set) => ({
  selectedEmail: "",
  setSelectedEmail: (data: string) =>
    set((state) => ({ ...state, selectedEmail: data })),
  generatedEmails: [],
  setGeneratedEmails: (data: IEmail[]) =>
    set((state) => ({ ...state, generatedEmails: data })),
}));

export default useEmailHistoryStore;
