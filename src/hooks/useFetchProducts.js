import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/services";


export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });
};