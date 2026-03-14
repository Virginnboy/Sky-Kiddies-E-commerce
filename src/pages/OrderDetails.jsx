import { useQuery, useMutation } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner";
import { confirmOrder, fetchOrderdetails } from "../util";
import "../pages/OrderDetails.css";
import { formattedCurrency } from "../formattedPrice";
import { formattedDate } from "../formattedDate";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


const OrderDetails = () => {
  const [ orderReceipt, setOrderReceipt ] = useState(false);
  const [ previewImage, setPreviewImage ] = useState(null);

  const navigate = useNavigate()
  const params = useParams()
  const orderId = params.orderId;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: ()=>fetchOrderdetails(orderId),
    retry: false,
    enabled: !!orderId
  });

  console.log(data)

  const { mutate, isPending } = useMutation({
    mutationFn: confirmOrder,
    onSuccess: (res)=> {
      toast.success(res?.message)
      queryClient.invalidateQueries(["order-detail", orderId])
      navigate("/admin-dashboard/orders")
    },
    onError: (err)=> {
      toast.error(err.response?.data?.message || err.data?.message || "Failed to confirm order")
    }
  })

  if (isLoading) {
    return (
    <div style={{width:"100%", height: "70vh", margin: "auto"}}><Spinner/></div>
    )
  }

  if (isError) {
    return <p>{error?.response?.data?.message || error?.message || "Failed to load order details"}</p>
  }

  const handleConfirmOrder = ()=> {
    mutate({
      orderId: orderId,
      status: "Confirmed"
    })
  }

  return (
    <div className="order-details-container">
      <main>

        <section>
          <header>
            <h1>Order details</h1>
          </header>
        </section>

        <section>
          <header>
            <h2>Order Info</h2>
          </header>
            <p>Order #: {data?.order?.orderNumber}</p>
            <p>Total Amount: {formattedCurrency.format(data?.order?.totalPrice)}</p>
            <p>Status: {data?.order?.status}</p>
            <p>Date: {formattedDate(data?.order?.updatedAt)}</p>
            <p>Payment Method: {data?.order?.paymentMethod}</p>
        </section>

        <section>
          <header>
            <h2>Customer Info</h2>
          </header>
          <p>Name: {data?.order?.user?.firstName}</p>
          <p>Email: {data?.order?.user?.email}</p>
        </section>

        {/* Shipping Address */}
        <section>
          <header>
            <h2>Shipping Address</h2>
          </header>
          <p>Full Name: {data?.order?.shippingAddress?.fullName}</p>
          <p>Address: {data?.order?.shippingAddress?.address}</p>
          <p>Phone: {data?.order ?.shippingAddress?.phone}</p>
        </section>

        {/* Products Ordered */}
        <section className="order-table">
          <header>
            <h2>Products Ordered</h2>
          </header>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {data?.order?.items.map((item, index)=> (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title}  
                      className="order-thumb"
                      onClick={()=>setPreviewImage(item.product.images[0])}
                    />
                  </td>
                  <td>{item.product.title}</td>
                  <td>{item.quantity}</td>
                  <td>{formattedCurrency.format(item.product.price)}</td>
                  <td>{formattedCurrency.format(item.quantity * item.product.price)}</td>
                </tr>
              )) || []}
            </tbody>
          </table>
        </section>

        {/* Products orderd Mobile */}
        <section>
          <header>
            <h2>Products Ordered</h2>
          </header>
          <div className="order-card">
            {data.order.items.map((item)=>(
              <div className="order-card-item" key={item._id}>

                <div className="order-card-img">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.title}
                    onClick={()=>setPreviewImage(item.product.images[0])}
                  />
                </div>

                <div className="order-card-info">
                  <p><b>Product:</b> {item.product.title}</p>
                  <p><b>Price:</b> {formattedCurrency.format(item.product.price)}</p>
                  <p><b>Quantity:</b> {item.quantity}</p>
                  <p><b>Subtotal:</b> {formattedCurrency.format(item.quantity * item.product.price)}</p>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Payment Receipt */}
        <section>
          <header>
            <h2>Payment Receipt</h2>
          </header>
          <div className="receipt-container" onClick={()=>setOrderReceipt(!orderReceipt)}>
            <button  onClick={()=>setOrderReceipt(true)}>
              {orderReceipt ? (
                <img 
                  src={data.order.shippingAddress.receipt} 
                  alt="Payment receipt" 
                  className="receipt-thumb"
                  onClick={()=>setPreviewImage(data?.order?.shippingAddress.receipt)}
                />
                ) : "View Receipt"}
            </button>
          </div>
        </section>

        <section className="last-section-btn-container">
          <button 
            className="order-confirm-btn"
            onClick={handleConfirmOrder}
          >{isPending? "Confirming order..." : "Confirm"}</button>
          <button className="order-confirm-cancel">Decline</button>
        </section>

        <section>
          <button style={{width: "100%", padding: "5px 14px", fontSize: "25px", borderRadius: "10px", border: "1px solid grey"}} onClick={()=> navigate(-1)}>Back</button>
        </section>
      </main>

      {/* Preview image Modal */}

      {previewImage && (
        <div className="image-modal" onClick={()=>setPreviewImage(null)}>
          <button 
            className="close-modal"
            onClick={()=>setPreviewImage(null)}>x</button>

            <img 
              src={previewImage} 
              alt="preview" 
              onClick={(e)=>e.stopPropagation()}
            />
        </div>
      )}
    </div>
  )
}

export default OrderDetails