import { useQuery } from "@tanstack/react-query"
import { fetchUserChats } from "../services/message.service";

export const useAdminChats = () => {
  return useQuery({
    queryKey: ["adminChats"],
    queryFn: fetchUserChats
  });
};