import ProductList from "./ProductList";
import api from "../axios";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import "../pages/Products.css";
import Loader from "../components/Loader";

const Products = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useLoaderData();

  if (navigation.state === "loading") {
    return <Loader/>
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
    const response = await api.get("/admin/products");

    return response.data
  } catch (err) {
    throw err
  }
};