import "../components/Sidebar.css";
import { FaBars, FaBox, FaShoppingCart, FaUniversity, FaSignOutAlt, FaComments } from "react-icons/fa";
import { logOut } from "../auth/auth";
import { useNavigate, useLocation, replace } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

const Sidebar = ({isOpen, setIsOpen}) => {
  const location = useLocation();
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const sidebarRef = useRef(null)


const handleLogout = async () => {
  try {
    await logOut();

    queryClient.setQueryData(["adminAuth"], {
      authenticated: false,
      user: null,
    });

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    queryClient.invalidateQueries(["adminAuth"]);

    navigate("/login", {replace: false});

  } catch (err) {
    console.error("Logout failed", err);
  }
};

useEffect(()=> {
  const handleClickOutside = (event) => {

    if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return ()=> document.removeEventListener("click", handleClickOutside)
}, [isOpen]);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`} ref={sidebarRef}>
      {/* Top Section */}
        <section className="sidebar-top">
          <div>
            <button onClick={(e)=>{
              e.stopPropagation();
              setIsOpen(!isOpen)}} 
              className="toggle-btn"><FaBars size={24}/>{isOpen && <span style={{ marginLeft: "8px", fontSize: "17px", }} >MENU</span>}</button>
          </div>

          <main className="ord-pro-bank">
            <div className="sidebar-products">
              <button 
                onClick={()=> {
                  navigate("/admin-dashboard/orders")
                  // setIsOpen(false);
                }}
                className={location.pathname === "/admin-dashboard/orders" ? "btn-active" : ""}><FaShoppingCart size={20}/> {isOpen && <span style={{marginLeft: "5px"}}>Orders</span>}</button>
            </div>

            <div className="sidebar-products">
              <button 
              onClick={()=> navigate("/admin-dashboard/products")}
              className={location.pathname === "/admin-dashboard/products" ? "btn-active" : ""}><FaBox size={20}/>{isOpen && <span style={{marginLeft: "8px"}}>Products</span>}</button>
            </div>

            <div className="sidebar-products">
              <button 
              onClick={()=> navigate("/admin-dashboard/bank-account")}
              className={location.pathname === "/admin-dashboard/bank-account" ? "btn-active" : ""}><FaUniversity size={20}/>{isOpen && <span style={{marginLeft: "8px"}}>Bank-Details</span>}</button>
            </div>

            <div className="sidebar-products">
              <button 
              onClick={()=> navigate("/admin-dashboard/chats")}
              className={location.pathname === "/admin-dashboard/chats" ? "btn-active" : ""}><FaComments size={20}/>{isOpen && <span style={{marginLeft: "8px"}}>Chats</span>}</button>
            </div>
          </main>
        </section>

      <section className="sidebar-bottom">
        <button onClick={handleLogout}><FaSignOutAlt size={22}/> {isOpen && <span>Logout</span>}</button>
      </section>
    </aside>
  );
};

export default Sidebar;
