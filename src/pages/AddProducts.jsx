import ProductForm from "./ProductForm"
import { uploadProductMutation } from "../util"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"


const AddProducts = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: uploadProductMutation,
    onSuccess: (res)=> {
      console.log(res.message)
      navigate("/admin-dashboard/products")
    }
  })

  const handleAddProduct = (formData) => {
    mutation.mutate(formData);
  }


  return (
    <div style={{display: "flex", margin: "auto"}}>
      <ProductForm  
      method="POST" 
      onSubmit={handleAddProduct}
      isPending = {mutation.isPending}
      defaultValue={mutation.data}
      />
    </div>
  )
}

export default AddProducts;