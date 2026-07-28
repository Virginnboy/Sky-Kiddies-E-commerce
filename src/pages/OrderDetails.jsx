import { useQuery, useMutation } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner";
import { confirmOrder, fetchOrderDetails, declineOrder } from "../services/services";
import "../pages/OrderDetails.css";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../components/Modal";


const OrderDetails = () => {
  const [ orderReceipt, setOrderReceipt ] = useState(false);
  const [ previewImage, setPreviewImage ] = useState(null);
  const [ orderModal, setOrderModal ] = useState(false);
  const [ reasonToDecline, setReasonTodecline ] = useState("");
  const [ proceed, setProceed ] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const orderId = params.orderId;

  const queryClient = useQueryClient();

// FETCHING ORDER DETAILS
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: ()=>fetchOrderDetails(orderId),
    retry: false,
    enabled: !!orderId
  });

// CONFIRM ORDER
  const { mutate, isPending } = useMutation({
    mutationFn: confirmOrder,

    onSuccess: (res)=> {
      toast.success(res?.message);
      queryClient.invalidateQueries({
        queryKey: [
          "order-detail", 
          orderId
        ],
      });
      
      navigate("/admin-dashboard/orders");
    },

    onError: (err)=> {
      toast.error(err.response?.data?.message || err.data?.message || "Failed to confirm order")
    }
  });

  const closeDeclineModal = () => {
    setReasonTodecline("");
    setProceed(false);
    setOrderModal(false);
}

// DECLINE ORDER
  const {mutate:declineMutation, isPending:isPendingDecline} = useMutation({
    mutationFn: declineOrder,

    onSuccess: (res)=> {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: [
          "order-detail", 
          orderId
        ],
      });

      closeDeclineModal();

      navigate("/admin-dashboard/orders");
    },

    onError: (err)=> {
      toast.error(err.response?.data?.message || err.data?.message || "Failed to decline order")
    }
  })

// IF ORDER DETAILS IS FETCHING
  if (isLoading) {
    return (
    <div style={{width:"100%", height: "70vh", margin: "auto"}}><Spinner/></div>
    )
  }

// IF ERROR OCCUR WHEN FETCHING ORDER DETAILS
  if (isError) {
    return <p>{error?.response?.data?.message || error?.message || "Failed to load order details"}</p>
  }

// PENDING CONFIRMING ORDER
  if (isPending) return <div style={{width:"100%", height: "70vh", margin: "auto"}}><Spinner/></div>


  const handleConfirmOrder = ()=> {
    mutate({
      orderId: orderId,
      status: "Confirmed"
    });
  }

  const handleDeclineOrder = () => {
    declineMutation({
      orderId,
      status: "Declined",
      reason: reasonToDecline
    });

    closeDeclineModal();
  }


  return (
    <div className="order-details-container">
      <main>
      {/* DECLINING MESSAGE MODAL */}
      {orderModal && 
        <Modal open={true} className="order-details-modal">
          {proceed ? (
            <div>
              <h2>Are you sure you want to decline this order?</h2>

                <span><b>Reason: </b>{reasonToDecline}</span>

                <div className="edit-decline-container">
                  <button 
                    onClick={()=>setProceed(false)}
                    className="edit-decline-btn"
                    >
                    Edit
                  </button>

                  <button disabled={isPendingDecline} onClick={handleDeclineOrder}
                  className={isPendingDecline ? "pending-declining-btn" : "final-decline-btn"}
                  >
                    {isPendingDecline? "Declining..." : "Decline Order"}
                  </button>
                </div>
            </div>
          ) : (
          <div>
            <h1>Decline Order</h1>

            <h4>Why are you declining this order?</h4>
            <textarea
              autoFocus
              id="reason"
              value={reasonToDecline}
              onChange={(e)=>setReasonTodecline(e.target.value)}
            />

            <div className="prodeed-cancel-container">
              <button onClick={()=>{
                setOrderModal(false), 
                setReasonTodecline("")
              }}
                className="cancel-proceed-btn">Cancel</button>
              <button 
                onClick={()=>setProceed(true)}
                className="proceed-btn"
                disabled={!reasonToDecline.trim()}
                >
                  Proceed
              </button>
            </div>
          </div>)}
        </Modal>
      }

      {/* PROCEED DECLINING MODAL */}

        <section>
          <header>
            <h1>Order details</h1>
          </header>
        </section>

      {/* ORDER DETAILS SECTION */}
        <section>
          <header>
            <h2>Order Info</h2>
          </header>
            <p>Order #: {data?.order?.orderNumber}</p>
            <p>Total Amount: {formattedCurrency.format(data?.order?.totalPrice)}</p>
            <p className={`status ${data?.order.status.toLowerCase()}`}>Status: {data?.order?.status}</p>
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

        {/* CONFIRM/DECLINE BUTTONS */}
        {data.order.status === "Pending" && <section className="last-section-btn-container">
          <button 
            disabled={isPending || data?.order?.status === "Confirmed"}
            className="order-confirm-btn"
            onClick={handleConfirmOrder}>
              {isPending? "Confirming order..." : "Confirm"}
          </button>

          <button 
            disabled= {isPending || data?.order?.status === "Declined"}
            className="order-confirm-cancel" 
            onClick={()=> setOrderModal(true)}>
            Decline
          </button>
        </section>}

        {/* NAVIGATE BACK TO ORDERS PAGE */}
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