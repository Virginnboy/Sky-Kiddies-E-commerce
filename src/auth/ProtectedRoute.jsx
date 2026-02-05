import { Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../auth";


export default function ProtectedRoute({children}) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth
  });

  if (isLoading) {
    return <p>Loading...</p>
  }

  console.log(data)

  if (!data?.authenticated || isError) {
    return <Navigate to="/login" replace/>
  }

  return (
    <>
      {children}
    </>
  )
}