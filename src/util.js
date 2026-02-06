import api from "./axios";


export const editProductMutation = async ({id, formData}) => {
  try {
    const response = await api.patch(`/edit-product/${id}`, formData)

    return response.data
    
  } catch (err) {
    console.log(err);
    return err.response.data
  }
}

export const uploadProductMutation = async (formData) => {
  try {
    const response = await api.post("uploadProduct", formData);

    return response.data

  }catch (err) {
    console.log(err)
    throw err
  }
};

