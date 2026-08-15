import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../services/services";

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders
  });
};