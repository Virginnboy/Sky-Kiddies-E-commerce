import api from "../api/axios";
import ProductList from "./ProductList";
import { useNavigate, useNavigation } from "react-router-dom";
import "../pages/Products.css";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/services";
import Loader from "../components/Loader";
import { useFetchProducts } from "../hooks/useFetchProducts";

const Products = () => {
  const navigate = useNavigate();

  const {data, isLoading, isError, error } = useFetchProducts();

  if (isLoading) {
    return <Loader/>
  }

  if (isError) {
    return <p>{error?.response?.data?.message}</p>
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