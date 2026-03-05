import { Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../auth";
import Spinner from "../components/Spinner";


export default function ProtectedRoute({children}) {

const { data, isLoading } = useQuery({
  queryKey: ["auth"],
  queryFn: checkAuth
})

const auth = data?.user 

if (isLoading) return <Spinner/>;

  if (!auth) {
    return <Navigate to="/login" replace/>
  }

  return (
    <>
      {children}
    </>
  )
}