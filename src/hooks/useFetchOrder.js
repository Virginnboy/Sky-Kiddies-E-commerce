import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../services/order.service";

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders
  });
};