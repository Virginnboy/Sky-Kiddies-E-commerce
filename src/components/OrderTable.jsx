import "../pages/Orders.css";
import { Link } from "react-router-dom";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";


const OrderTable = ({order, }) => {
  return (
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
  )
}

export default OrderTable