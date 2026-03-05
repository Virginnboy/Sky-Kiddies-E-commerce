import HomePage from "../components/Home";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../auth";
import Spinner from "../components/Spinner";

export default function AuthRedirect() {
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth
  })

  if (isLoading) return <Spinner/>;

  if (data?.user && data?.authenticated) {
    return <Navigate to="/admin-dashboard" replace />
  }
  return <HomePage/>
}