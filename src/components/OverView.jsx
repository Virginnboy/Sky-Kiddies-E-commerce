import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "../components/OverView.css";
import { fetchOrders, fetchProducts } from "../services/services";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { useFetchOrders } from "../hooks/useFetchOrder";
import Loader from "./Loader";
import { useOverViewStats } from "../hooks/useOverView";


const OverView = () => {
  const admin = JSON.parse(localStorage.getItem("adminData"));

  const { data, isLoading, isError, error } = useOverViewStats();
  console.log(data);

  const recentOrders = data?.stats?.recentOrders;


  return (
    <div className="overview-container">

      {/* WELCOME */}
      <section className="overview-header">
        <h1>Overview</h1>

        <h4>
          Good morning, {admin?.firstName}
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
            <div className="info-length">
              {isLoading ? (
                <small>...</small> ) : (
                <span>{data?.stats?.totalProducts}</span>
                )}
            </div>
          </Link>
        </div>

        <div>
          <Link to="/admin-dashboard/orders">
            <p>Orders</p>
            <div className="info-length">
              {isLoading ? (
                <small>...</small> 
              ) : (
                <span>{data?.stats?.totalOrders}</span>
                )}
            </div>
            
          </Link>
        </div>

        <div>
          <Link to="/admin-dashboard/chats">
            <p>Unread Messages</p>
            <div className="info-length">
              {isLoading ? (
                <small>...</small> ) : (
                <span>{data?.stats?.unreadCount}</span>
                )}
            </div>
            
          </Link>
        </div>

      </section>


      {/* RECENT ORDERS */}
      <section className="overview-section">

        <header>
          <h2>Recent Orders</h2>
        </header>

        <div className="overview-section-content">
          {recentOrders?.map(item => <ul key={item._id}>
            <li>
              <p>{item.totalPrice}</p>
            </li>
          </ul>)}
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
