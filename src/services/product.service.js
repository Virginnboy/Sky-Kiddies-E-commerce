import api from "../api/axios";

export const fetchProducts = async () => {
  const response = await api.get("/admin/product/products");
  return response.data;
}

export const editProductMutation = async ({id, formData}) => {
  const response = await api.patch(`/admin/product/edit-product/${id}`, formData);
  return response.data;
};

export const uploadProductMutation = async (formData) => {
  const response = await api.post("/admin/uploadProduct", formData);
  return response.data;
};

