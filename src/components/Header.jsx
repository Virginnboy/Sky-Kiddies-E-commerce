import "../components/Header.css";
import { Link } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { checkAuth } from "../auth";


export default function Header() {
  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData(["auth"])

  // const user = data?.user

  const { data } = useQuery({
    queryKey: ["auth"], 
    queryFn: checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000
});

  const user = data?.user;


  return (
    <nav className="nav-bar">
      <h1>Sky Kiddies</h1>

      <ul>
        <li><Link to={user ? "/admin-dashboard" : "/"} id="navbar-home">Home</Link></li>  
        |
        {user? (
        <li><Link>Hello {user.firstName}</Link></li> 
        ) : (
            <li>Profile</li>
      )}
      
        {!user && <li><Link to="/login">Login</Link> / <Link to="/signup">Signup</Link></li>}

      </ul>
    </nav>
  )
}