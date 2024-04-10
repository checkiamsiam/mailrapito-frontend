import { useQuery } from "@tanstack/react-query";
import {
  fetchDomains,
  fetchEmailToken,
  fetchMessages,
} from "../services/services";

export const useMessages = ({ email }) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    enabled: !!email,
  });
};

export const useEmailToken = ({ enabled }) => {
  return useQuery({
    queryKey: ["emailToken"],
    queryFn: fetchEmailToken,
    enabled,
  });
};

export const useEmailDomain = () => {
  return useQuery({
    queryKey: ["emailDomain"],
    queryFn: fetchDomains,
  });
};
