import { useQuery } from "@tanstack/react-query";
import { getOverViewStats } from "../services/overView.service";

export const useOverViewStats = () => {
  return useQuery({
    queryKey: ["overView"],
    queryFn: getOverViewStats
  });
}