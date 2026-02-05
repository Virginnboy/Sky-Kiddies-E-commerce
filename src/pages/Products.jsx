import ProductList from "./ProductList";
import axios from "axios";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import "../pages/Products.css";

const Products = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useLoaderData();

  if (navigation.state === "loading") {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="add-product-btn"> 
        <button onClick={()=>navigate("/admin-dashboard/add-product") }
          >Add Product</button>
      </div>

      <div>
        <ProductList products = {data}/>
      </div>
    </div>
  )
}

export default Products;

export const loader = async ()=> {
  try {
    const response = await axios.get("http://localhost:5000/admin/products", {withCredentials: true});

    return response.data
  } catch (err) {
    throw err
  }
};