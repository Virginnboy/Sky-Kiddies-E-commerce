import api from "../api/axios";
import ProductForm from "./ProductForm"
import { useNavigate } from "react-router-dom";
import "../pages/EditProduct.css"
import { useLoaderData } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { editProductMutation } from "../services/product.service";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: editProductMutation,

    onSuccess: ()=> {
      navigate("/admin-dashboard/products")
    },

    onError: (err)=> err.response?.data?.message

  });

  const id = params.productId;

  const handleEditProduct =(formData)=> {
    mutation.mutate({id, formData});
  }



  return (
    <div className="edit-product-container">
      <div className="edit-product-content-box">
        <h1>Edit Product</h1>
        <ProductForm 
          method= "PATCH" 
          product={data} 
          onSubmit={handleEditProduct}
          isPending={mutation.isPending}
        />

        <div className="cancel-save-btn">
        </div>

      </div>
    </div>
  )
}

export default EditProduct; 


export const loader = async({params}) => {
  const id = params.productId
  console.log(id)
  try {
    const response = await api.get(`/admin/product/product-details/${id}`, {withCredentials: true});

    return response.data;

  } catch (err) {
    console.log(err);
    throw new Response("Failed to load product", {status: 500})
  }
};