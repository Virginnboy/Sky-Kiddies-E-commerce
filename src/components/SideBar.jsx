import "../components/Sidebar.css";
import { useState } from "react";
import { FaBars, FaBox, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { logOut } from "../auth.js";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const [ isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const toggleSidebar =()=> {
    setIsOpen(!isOpen)
  }

const handleLogout = async () => {
  try {
    await logOut();

    queryClient.setQueryData(["auth"], {
      authenticated: false,
      user: null,
    });

    navigate("/login");
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
      {/* Top Section */}
        <div className="sidebar-top">
          <button onClick={toggleSidebar}><FaBars/>{isOpen && <span style={{}}>MENU</span>}</button>
        </div>

        <div className="sidebar-middle">
          <div className="sidebar-orders">
            <button onClick={()=> navigate("/admin-dashboard/orders")}><FaShoppingCart/> {isOpen && <span style={{marginLeft: "5px"}}>Orders</span>}</button>
          </div>

          <div className="sidebar-products">
            <button onClick={()=> navigate("/admin-dashboard/products")}><FaBox/>{isOpen && <span style={{marginLeft: "8px"}}>Products</span>}</button>
          </div>
        </div>


      <div className="sidebar-bottom">
        <button onClick={handleLogout}><FaSignOutAlt/> {isOpen && <span>Logout</span>}</button>
      </div>
    </aside>
  );
};

export default Sidebar;
