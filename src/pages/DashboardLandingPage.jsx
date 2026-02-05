import { Link } from "react-router-dom";
import "../pages/DashboardLandingPage.css";

const DashboardLandingPage = () => {
  return (
    <>
      <div className="dashboard-landing-page-addproduct">
        <Link className="dash-land-add-link" to="/admin-dashboard/add-product">ADD PRODUCT</Link>
      </div>
    </>
  )
}

export default DashboardLandingPage