import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import "../components/AdminDashboardLayout.css";

const AdminDashboardLayout = () => {
  return (
    <div className="dashbaord-layout">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashboardLayout