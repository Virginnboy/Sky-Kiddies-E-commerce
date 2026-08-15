import { useQuery } from "@tanstack/react-query";
import { getOverViewStats } from "../services/services";

export const useOverViewStats = () => {
  return useQuery({
    queryKey: ["overView"],
    queryFn: getOverViewStats
  });
}