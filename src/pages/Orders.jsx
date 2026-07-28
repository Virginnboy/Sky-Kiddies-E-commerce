import { useQuery } from "@tanstack/react-query"
import { fetchOrders } from "../services/services"
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";
import { Link } from "react-router-dom";
import "../pages/Orders.css";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const {data, isLoading} = useQuery({
    queryKey: ["order"],
    queryFn: fetchOrders
  });
console.log(data)
  const orders = data?.order || [];
  // console.log(orders)

  if (isLoading) {
    return (
      <Loader/>
    )
  }

  if (orders.length === 0) {
    return <h3 style={{color: "red", textAlign: "center",}}>Order is empty</h3>
  }

  return (
    <div className="order-container">
      <h2 className="order-title">Orders</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Order #</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index)=> (
            <tr key={order._id}>
              <td>{index + 1}</td>

              <td>
                <Link 
                  to={`/admin-dashboard/order-details/${order._id}`}
                  className="order-link"
                >
                  {order?.orderNumber}
                </Link>
              </td>

              <td>{order?.user?.firstName}</td>

              <td>{formattedCurrency.format(order.totalPrice)}</td>

              <td>
                <span className={`status ${order?.status?.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>

              <td>{formattedDate(order.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Card For Mobile */}
      <section>
        <div className="order-card">
          {orders?.map((order)=> (
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
    </div>
  )
}

export default Orders