import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import "../components/AdminDashboardLayout.css";
import { useOutletContext } from "react-router-dom";

const AdminDashboardLayout = () => {
  const { isOpen, setIsOpen } = useOutletContext();

  return (
    <div className="dashbaord-layout">
      <Sidebar 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="dashboard-content">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboardLayout