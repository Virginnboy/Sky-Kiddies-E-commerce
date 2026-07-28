import HomePage from "../components/Home";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../auth/auth";
import Spinner from "../components/Spinner";

export default function AuthRedirect() {
const { data, isLoading } = useQuery({
  queryKey: ["adminAuth"],
  queryFn: checkAuth,
  retry: false,
});

  console.log(data)

  if (isLoading) return <Spinner/>;

  if (data?.user && data?.authenticated) {
    return <Navigate to="/admin-dashboard" replace />
  }
  return <HomePage/>
}