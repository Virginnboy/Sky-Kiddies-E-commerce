import { Link } from "react-router-dom";
import "../components/OverView.css";

const OverView = () => {
  const admin = JSON.parse(localStorage.getItem("adminData"));

  return (
    <div className="overview-container">

      {/* WELCOME */}
      <section className="overview-header">
        <h1>Overview</h1>

        <h4>
          Good morning, {admin.firstName}
        </h4>

        <p>
          Here's what's happening in your store.
        </p>
      </section>


      {/* QUICK STATS */}
      <section className="overview-stats">

        <div>
          <Link to="/admin-dashboard/products">
            <p>Products</p>
            <small>#</small>
          </Link>
        </div>

        <div>
          <Link to="/admin-dashboard/orders">
            <p>Orders</p>
            <small>#</small>
          </Link>
        </div>

        <div>
          <Link to="/admin-dashboard/chats">
            <p>Messages</p>
            <small>#</small>
          </Link>
        </div>

      </section>


      {/* RECENT ORDERS */}
      <section className="overview-section">

        <header>
          <h2>Recent Orders</h2>
        </header>

        <div className="overview-section-content">
          List of orders.....
        </div>

      </section>


      {/* RECENT MESSAGES */}
      <section className="overview-section">

        <header>
          <h2>Recent Messages</h2>
        </header>

        <div className="overview-section-content">
          List of users and their messages.....
        </div>

      </section>

    </div>
  );
};

export default OverView;
