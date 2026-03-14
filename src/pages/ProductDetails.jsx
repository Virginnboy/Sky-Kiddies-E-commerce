import api from "../axios";
import Loader from "../components/Loader.jsx";
import { useLoaderData, useNavigation, useNavigate, useSubmit, redirect } from "react-router-dom";
import "../pages/ProductDetails.css";
import Modal from "../components/Modal";
import { useContext } from "react";
import UserProgressContext from "../store/ProgressContext";
import { formattedCurrency } from "../formattedPrice.js";
import { FaArrowLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductDetails = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const product = useLoaderData();

  const {deleteProgress, showModal, hideModal} = useContext(UserProgressContext)

  const isLoading = navigation.state === "loading";
  const isDeleting = navigation.state === "submitting"

  if (isLoading) {
    return <Loader/>
  };


  const handleShowModal = () => {
    showModal()
  }

  const handleConfirmDelete = () => {
    hideModal();
    submit(null, {method: "DELETE"});
  }


  return (
    <>
      {deleteProgress === true && <Modal open className="modal">
        <h3>Are you sure you want to delete this product?</h3>

        <div className="confirm-btn-container">
          <button onClick={hideModal} className="cancel-delete">Cancel</button>
          <button onClick={handleConfirmDelete} className="confirm-delete">Yes, Delete</button>
        </div>
      </Modal>}


      <div className="product-details-container">
        <section>
          <button onClick={()=>navigate(-1)} className="back-btn">
            <FaArrowLeft size={30} className="back-icon"/>
          </button>
        </section>

        <h1>Product Details</h1>
        <div className="product-details-items">

        <Swiper modules={[Pagination, Navigation]} pagination={{ clickable: true}} navigation spaceBetween={20} slidesPerView={1}>
          {(product?.images || []).map((img)=> (
            <SwiperSlide key={img}>
              <img src={img} alt="product" />
            </SwiperSlide>
          ))}
        </Swiper>

          <div id="product-des-title-container">
            <h2 id="product-title">{product.title}</h2>
            <div  id="product-description">
            <p>{product.description}</p>
            </div>
          </div>

          <div id="price-quantity">
            <span>{formattedCurrency.format(product.price)}</span> |
            <span style={{marginLeft: "10px", }}>Quantity: {product.quantity}</span>
          </div>

          <div id="edit-delete-btn">
            <button onClick={()=> navigate(`/admin-dashboard/edit-product/${product._id}`)} id="product-details-editBtn">Edit</button>
            <button id="product-details-deleteBtn" onClick={handleShowModal} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails

export const loader = async ({params}) => {
  const id = params.productId
  try {
    const response = await api.get("/product-details/" + id);

    if (!response.data) {
      throw new Response("Product not found", { status: 404 });
    }
    
    return response.data
  } catch (err) {
    console.log(err)
    throw new Response("Fetching Product failed", {status: 500})
  }
};

export const action = async ({params})=> {
  const id = params.productId
    console.log(id)
  try { 
    await api.delete("/delete-product/" + id);
    
    return redirect("/admin-dashboard/products")

  }catch (err) {
    console.log(err)
    throw new Response("Server error", {status: 500})
  }
};