import ProductForm from "./ProductForm"
import { uploadProductMutation } from "../services/services"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";


const AddProducts = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: uploadProductMutation,
    onSuccess: (res)=> {
      toast.success(res?.message)
      navigate("/admin-dashboard/products")
    },
    onError: (err)=> {
      toast.error(err.response?.data?.message);
    }
  })

  const handleAddProduct = (formData) => {
    mutation.mutate(formData);
  }


  return (
    <main className="add-product-container">
      <div style={{display: "flex", margin: "auto", boxShadow: "0px 0px 4px -1px", width: "80%", marginTop: "150px", padding: "20px", borderRadius: "10px"}}>
        <ProductForm  
        method="POST" 
        onSubmit={handleAddProduct}
        isPending = {mutation.isPending}
        defaultValue={mutation.data}
        />
      </div>
    </main>
  )
}

export default AddProducts;