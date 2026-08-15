import { useQuery } from "@tanstack/react-query"
import { fetchUserChats } from "../services/services";

export const useAdminChats = () => {
  return useQuery({
    queryKey: ["adminChats"],
    queryFn: fetchUserChats
  });
};