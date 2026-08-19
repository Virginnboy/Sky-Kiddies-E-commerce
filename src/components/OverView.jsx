import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "../components/OverView.css";
import { fetchOrders} from "../services/order.service";
import { fetchProducts } from "../services/product.service"
import { useFetchProducts } from "../hooks/useFetchProducts";
import { useFetchOrders } from "../hooks/useFetchOrder";
import Loader from "./Loader";
import { useOverViewStats } from "../hooks/useOverView";
import { formattedDate } from "../utils/formattedDate";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedTime } from "../utils/formattedTime";
import { useNavigate } from "react-router-dom";
import { useAdminChats } from "../hooks/useAdminChats";


const OverView = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminData"));

  const { data, isLoading, isError, error } = useOverViewStats();
    const {data:messageData, isLoading:isMessageLoading, isError:isMessageError, error:messageError } = useAdminChats();

  if (isError) {
  return (
    <p>
      {error?.response?.data?.message ||
        "Failed to load dashboard"}
    </p>
  );
}

const recentOrders = data?.stats?.recentOrders;
console.log(messageData);


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

        <table className="order-table">
          <thead>
            <tr>
              <th>order#</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders?.map(order=> <tr key={order._id}>
                <td>
                  <Link 
                    to={`/admin-dashboard/order-details/${order._id}`}
                    className="order-link"
                  >
                    {order?.orderNumber}
                  </Link>
                </td>
                <td>{order?.user?.firstName}</td>
                <td>{formattedCurrency.format(order?.totalPrice)}</td>
                <td>{order?.status}</td>
                <td>{formattedDate(order?.createdAt)}</td>
              </tr>
            )}
          </tbody>
        </table>

              {/* Card For Mobile */}
        <div className="order-card">
          {recentOrders?.map((order)=> (
            <div key={order._id} className="card">
              <p><b>Order No: </b><Link to={`/admin-dashboard/order-details/${order._id}`} className="order-link">{order?.orderNumber}</Link></p>
              <p><b>Customer: </b>{order?.user?.firstName}</p>
              <p><b>Amount: </b>{formattedCurrency.format(order?.totalPrice)}</p>
              <p className={`status ${order?.status?.toLowerCase()}`}><b>Status: </b>{order.status}</p>
              <p><b>Date: </b>{formattedDate(order?.updatedAt)}</p>
              <p className="view-order-btn"><button onClick={()=>navigate(`/admin-dashboard/order-details/${order._id}`)}>View Order</button></p>
            </div>
          ))}
        </div>
      </section>


      {/* RECENT MESSAGES */}
      <section className="overview-section">

        <header>
          <h2>Recent Messages</h2>
        </header>

        <div className="overview-section-content">
          <div className="users-list">
            {messageData?.users?.map((data) => (
              <div
                key={data.user._id}
                className="chat-user"
                onClick={() =>
                  navigate(`/admin-dashboard/message/${data.user._id}`)
                }
              >
                <div className="chat-avatar">
                  {data.user.firstName.charAt(0).toUpperCase()}
                </div>

                <div className="chat-info">
                  <h3>{data.user.firstName}</h3>
                  <small>{data.lastMessage}</small>
                </div>

                <div className="chat-arrow">
                  {formattedTime(data.lastTime)}
                  <div className="chat-unread">
                    {data.unreadCount > 0 && <small>{data.unreadCount}</small>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};

export default OverView;
