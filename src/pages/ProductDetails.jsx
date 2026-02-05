import api from "../axios";
import { useLoaderData, useNavigation, useNavigate, useSubmit, redirect } from "react-router-dom";
import "../pages/ProductDetails.css";

const ProductDetails = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const product = useLoaderData();

  const isLoading = navigation.state === "loading";
  const isDeleting = navigation.state === "submitting"

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  };

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(product.price);

  const handleDeleteEvent = () => {
    const proceed = window.confirm("Are you sure you want to delete this product!?")

    if(!proceed) {
      return;
    }

    if (proceed) {
      submit(null, {method: "DELETE"})
    }
  }


  return (
    <div className="product-details-container">
      <h1>Product Details</h1>
      <div className="product-details-items">
        <div id="product-details-img-container">
          <img src={product.images} alt={product.title} />
        </div>

        <div id="product-des-title-container">
          <h2 id="product-title">{product.title}</h2>
          <div  id="product-description">
          <p>{product.description}</p>
          </div>
        </div>

        <div id="price-quantity">
          <span>{formattedPrice}</span> |
          <span style={{marginLeft: "10px", }}>Quantity: {product.quantity}</span>
        </div>

        <div id="edit-delete-btn">
          <button onClick={()=> navigate(`/admin-dashboard/edit-product/${product._id}`)} id="product-details-editBtn">Edit</button>
          <button id="product-details-deleteBtn" onClick={handleDeleteEvent} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    </div>
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