import "../components/Sidebar.css";
import { FaBars, FaBox, FaShoppingCart, FaUniversity, FaSignOutAlt } from "react-icons/fa";
import { logOut } from "../auth.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = ({isOpen, setIsOpen}) => {
  const location = useLocation();
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
        <section className="sidebar-top">
          <div>
            <button onClick={toggleSidebar} className="toggle-btn"><FaBars size={24}/>{isOpen && <span style={{ marginLeft: "8px", fontSize: "17px", }} >MENU</span>}</button>
          </div>

          <main className="ord-pro-bank">
            <div className="sidebar-products">
              <button 
                onClick={()=> navigate("/admin-dashboard/orders")}
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
          </main>
        </section>

      <section className="sidebar-bottom">
        <button onClick={handleLogout}><FaSignOutAlt size={22}/> {isOpen && <span>Logout</span>}</button>
      </section>
    </aside>
  );
};

export default Sidebar;
