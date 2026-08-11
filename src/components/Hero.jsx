import { Link } from "react-router-dom";
import "../components/Hero.css";

const Hero = () => {
  return (
    <div className="admin-hero">
      <section className="header-section">
        <header>
          <h1>SKY KIDDIES</h1>
          <h3>ADMIN MANAGEMENT PORTAL</h3>
        </header>
      </section>

{/* STORE MANAGEMENT SECTION */}
      <section className="manage-section">
        <h4>Manage Your Store From One Place</h4>

        <div className="manage-section-cards">
          <div className="manage-items">
            <p>Products</p>
            <small>#</small>
          </div>

          <div className="manage-items">
            <p>Orders</p>
            <small>#</small>
          </div>

          <div className="manage-items">
            <p>Customers</p>
            <small>#</small>
          </div>

          <div className="manage-items">
            <p>Messages</p>
            <small># unread</small>
          </div>
        </div>
      </section>

      <p>
        <Link to="/login">Login to Admin</Link>
      </p>
    </div>
  )
}

export default Hero;