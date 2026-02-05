import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import "../pages/ProductForm.css";


export default function ProductForm ({method, onSubmit, isPending, product}) {

  const navigate = useNavigate();

  const handleSubmit = (e)=> {
    e.preventDefault();
    const formData = new FormData(e.target)
    onSubmit(formData)
  }

  return (
    <>
      <form method={method} encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="product-form-container">
          <Input 
            label="Title"
            id="title"
            name="title"
            type="text"
            defaultValue={product?.title}
            />

          <Input 
          label="Description"
          name="description"
          type="text"
          textarea
            defaultValue={product?.description}

          />

          <Input 
            label="Price"
            id="price"
            name="price"
            type="number"
            defaultValue={product?.price}

            />

          <Input 
            label="quantity"
            id="quantity"
            name="quantity"
            type="number"
            defaultValue={product?.quantity}
            />

          <Input 
            label="images"
            id="images"
            name="images"
            type="file"
            multiple
            />
        </div>

        <div className="product-form-btn">
          <button type="button" className="product-form-cancel-btn" onClick={()=> navigate(-1)}>Cancel</button>
          <button 
            type="submit" 
            disabled={isPending}
          >{isPending? "Saving..." : "Save"}</button>
        </div>
      </form>
    </>
  )
};
