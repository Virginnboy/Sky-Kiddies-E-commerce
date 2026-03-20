import "../components/Header.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../auth";
import { FaBars, FaChevronDown} from "react-icons/fa";


export default function Header({isOpen, setIsOpen}) {
  const location = useLocation();
  const path = location.pathname

  const [ showDropdown, setShowDropDown ] = useState(false);

  const { data } = useQuery({
    queryKey: ["adminAuth"], 
    queryFn: checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000
});

  const user = data?.user;


  return (
    <nav className="nav-bar">
      <div className="fa-bars-container">
        <FaBars 
          size={24}
          className={`faBars ${user? "faBars" : "fagba"}`}
          onClick={()=>setIsOpen(prev=> !prev)}
        />
        <h1>Sky Kiddies</h1>
      </div>

      <ul>
        <li><Link to={user ? "/admin-dashboard" : "/"} id="navbar-home">Home</Link></li>  
        |
        {user? (
        <li><Link>Hello {user.firstName}</Link></li> 
        ) : (
            <li className="profile-menu" onMouseEnter={()=>setShowDropDown(true)} onMouseLeave={()=>setShowDropDown(false)}>
              <span onClick={()=>setShowDropDown(!showDropdown)}>Profile</span> 
              <span onClick={()=>setShowDropDown(!showDropdown)}><FaChevronDown className="fa-chevron-down"/></span>
                <ul className={`login-signup-dropdown ${showDropdown ? "open" : ""}`}>
                  <li><Link to="/login" className="login-link">Login</Link></li>
                  <li><Link to="/signup" className="signup-link">Signup</Link></li>
                </ul>
            </li>
      )}
      
        {/* {!user && <li>
          {path === "/signup" && <Link to="/login">Login</Link>}
          {path === "/login" && <Link to="/signup">Signup</Link>}
          </li>} */}
      </ul>
    </nav>
  )
}